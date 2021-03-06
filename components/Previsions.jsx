// PAGE PREVISIONS : AFFICHAGE DES PREVISIONS : LES 5 PROCHAINS JOURS

import React, { useState , useEffect}  from 'react';
import { StyleSheet, Image,  Text, View, TouchableOpacity } from 'react-native';
import Prevision from './Prevision';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';

export default function Previsions({ navigation }) {
  const [previsions, setPrevisions] = useState([]);

  //  Permet d'avoir la permission d'utiliser la localisation puis renvoie la localisation si elle a été autorisée
  async function getLocationAsync() {
    const { status, permissions } = await Permissions.askAsync(Permissions.LOCATION);
    if (status === 'granted') {
      return Location.getCurrentPositionAsync({ enableHighAccuracy: true });
    } else {
      throw "La géolocalisation n'a pas été autorisée";
    }
  }

  // Au chargement de la page, on appelle la fonction qui récupère la localisation, puis on appelle la fonction qui récupère les prévisions en lui passant en paramètres la localisation (sinon on affiche une erreur)
  useEffect(() => {
    getLocationAsync()
    .then(location => {
      getPrevisions(location);
    })
    .catch(erreur => {
      alert(erreur);
    })
  }, []);

  // Récupère les prévisions en fonction de la localisation passée en paramètres, puis stocke les informations dans la variable d'état previsions
  function getPrevisions(localisation) {
    fetch(`http://api.openweathermap.org/data/2.5/forecast?lat=${localisation["coords"]["latitude"]}&lon=${localisation["coords"]["longitude"]}&appid=9ee99ca097bcd7aad431d1d1d6452685&lang=fr&units=metric`)
    .then(res => res.json())
    .then(res => {
      let data = res["list"];
      let meteo = [];

      // On récupère les prévisisons des 5 prochains jours dans la variable meteo
      for (let i = 0; i<5; i++) {
        let val = data[i*8];
        let date = new Date(val["dt"] * 1000);
        meteo.push({
          "date": date.getDate().toString().padStart(2,"0") + "/" + (parseInt(date.getMonth()) + 1).toString().padStart(2,"0") + "/"  + date.getFullYear().toString().substring(2,4),
          "heure": date.getHours().toString().padStart(2, '0') + ":" + date.getMinutes().toString().padStart(2, '0'),
          "description": val["weather"][0]["description"].charAt(0).toUpperCase() + val["weather"][0]["description"].substring(1,val["weather"][0]["description"].length),
          "température": Math.round(val["main"]["temp"])+"°C",
          "image": `http://openweathermap.org/img/wn/${val["weather"][0]["icon"]}@2x.png`
        });
      }
      setPrevisions(meteo);
    });
  }

  return (
    <View style={styles.container}>
      <View style={styles.top}>
        <TouchableOpacity
        onPress={() => navigation.navigate('Home')}
        style={styles.button}>
          <Text style={{ fontSize: 16, color: '#fff' }}>Aujourd'hui</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.prev}>
        {previsions.map((val,index) => {
          return (
          <Prevision meteo={val} key={index}/>
          );
        })}
      </View>
    </View>
  );

}
  
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: '#fff',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    padding: 24,
    paddingTop: 60,
  },
  top: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: "space-between"
  },
  button: {
    padding: 8,
    backgroundColor: '#2f2e41',
    borderRadius: 24,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6
  },
  prev: {
      width: '100%',
      flex: 1,
      marginTop: 16,
      justifyContent: "space-evenly"
  }
});
