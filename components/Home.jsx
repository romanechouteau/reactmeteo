// PAGE HOME : AFFICHAGE DE LA METEO ACTUELLE

import React, { useState , useEffect}  from 'react';
import { StyleSheet, Image,  Text, View, TouchableOpacity } from 'react-native';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';

// Les images personnalisées de météo
const Clear = require('../assets/clear.png');
const Clouds = require('../assets/cloud.png');
const CloudSun = require('../assets/cloudSun.png');
const BrokenClouds = require('../assets/brokenClouds.png');
const ShowerRain = require('../assets/showerRain.png');
const Rain = require('../assets/rain.png');
const Thunderstorm = require('../assets/thunder.png');
const Snow = require('../assets/snow.png');
const Mist = require('../assets/mist.png');

// Correspondance avec les ID d'icônes de l'API
const meteo = {"01d": Clear, "02d": CloudSun, "03d": Clouds, "04d": BrokenClouds, "09d":ShowerRain, "10d":Rain, "11d":Thunderstorm, "13d":Snow, "50d":Mist,"01n": Clear, "02n": CloudSun, "03n": Clouds, "04n": BrokenClouds, "09n":ShowerRain, "10n":Rain, "11n":Thunderstorm, "13n":Snow, "50n":Mist};

// Tableau des correspondances des jours et mois pour les dates
const jours = ['Dimanche','Lundi','Mardi','Mercredi','Jeudi','Vendredi','Samedi'];
const mois = ['Janvier','Février','Mars','Avril','Mai','Juin','Juillet','Août','Septembre','Octobre','Novembre','Décembre'];


export default function Home({ navigation }) {
  const [ville, setVille] = useState('');
  const [temperature, setTemperature] = useState('');
  const [desc, setDesc] = useState('');
  const [icon, setIcon] = useState('');

  let dateToday = new Date();
  
  // Formattage personnalisé, les méthodes de la classe Date() ne me permettaient pas une personnalisations qui convenait
  let today = jours[dateToday.getDay()] + " " + dateToday.getDate() + " " + mois[dateToday.getMonth()];
  const [date, setDate] = useState(today);

  let hour = dateToday.getHours().toString().padStart(2, '0') + ":" + dateToday.getMinutes().toString().padStart(2, '0');
  const [heure, setHeure] = useState(hour);
  

  // Changement de l'heure toutes les secondes + changement de la date s'il est minuit
  setInterval(() => {
    let dateToday = new Date();
    let hour = dateToday.getHours().toString().padStart(2, '0') + ":" + dateToday.getMinutes().toString().padStart(2, '0');
    setHeure(hour);
    if (dateToday.getHours() == 0 && dateToday.getMinutes() == 0) {
      let today = jours[dateToday.getDay()] + " " + dateToday.getDate() + " " + mois[dateToday.getMonth()];
      setDate(today);
    }
   }, 1000);

  //  Permet d'avoir la permission d'utiliser la localisation puis renvoie la localisation si elle a été autorisée
  async function getLocationAsync() {
    const { status, permissions } = await Permissions.askAsync(Permissions.LOCATION);
    if (status === 'granted') {
      return Location.getCurrentPositionAsync({ enableHighAccuracy: true });
    } else {
      throw "La géolocalisation n'a pas été autorisée";
    }
  }

  // Au chargement de la page, on appelle la fonction qui récupère la localisation, puis on appelle la fonction qui récupère la météo en lui passant en paramètres la localisation (sinon on affiche une erreur)
  useEffect(() => {
    getLocationAsync()
    .then(location => {
      getMeteo(location);
    })
    .catch(erreur => {
      alert(erreur);
    })
  }, []);


  // Récupère la météo en fonction de la localisation passée en paramètres, puis stocke les informations dans des variables d'état
  function getMeteo(localisation) {
    fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${localisation["coords"]["latitude"]}&lon=${localisation["coords"]["longitude"]}&appid=9ee99ca097bcd7aad431d1d1d6452685&lang=fr&units=metric`)
    .then(res => res.json())
    .then(res => {
      setVille(res["name"]);
      setTemperature(Math.round(res["main"]["temp"]));
      let description = res["weather"][0]["description"].charAt(0).toUpperCase() + res["weather"][0]["description"].substring(1,res["weather"][0]["description"].length);
      setDesc(description);
      setIcon(meteo[res["weather"][0]["icon"]]);
    });
  }

  return (
    <View style={styles.container}>
      <View style={styles.top}>
        <View>
          <TouchableOpacity
          onPress={() => navigation.navigate('Previsions')}
          style={styles.button}>
            <Text style={{ fontSize: 16, color: '#fff' }}>Prévisions</Text>
          </TouchableOpacity>
        </View>
        <View>
          <Text style={styles.date}>
            {date}
          </Text>
          <Text style={styles.lieu}>
            {ville}
          </Text>
          <Text style={styles.heure}>
            {heure}
          </Text>
        </View>
      </View>
      <View style={styles.contourImage}>
        <Image
          style={styles.image}
          source={icon} resizeMode="contain"
        />
      </View>
      <View>
        <Text style={styles.temps}>
          {desc}
        </Text>
        <Text style={styles.temp}>
          {temperature}°C
        </Text>
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
  date: {
    fontSize: 24,
    textAlign: 'right',
    color: '#2f2e41'
  },
  lieu: {
    fontSize: 48,
    fontWeight: '700',
    textAlign: 'right',
    color: '#2f2e41'
  },
  heure: {
    textAlign: 'right',
    fontSize: 32,
    color: '#2f2e41'
  },
  contourImage: {
    backgroundColor: '#f5f5f5',
    height: 340,
    width: 340,
    alignSelf: 'center',
    borderRadius: 190,
    borderColor: '#fff',
    borderWidth: 8,
    overflow: 'hidden',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6
  },
  image: {
      flex:1,
      height: '100%',
      width: '100%',
      backgroundColor: 'transparent'
  },
  temps: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#2f2e41',
  },
  temp: {
      fontSize: 80,
      fontWeight: '700',
      color: '#2f2e41'
  }
});
