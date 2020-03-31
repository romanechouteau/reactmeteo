import React, { useState , useEffect}  from 'react';
import { StyleSheet, Image,  Text, View, TouchableOpacity } from 'react-native';
import Jour from './Jour';

export default function Previsions({ navigation }) {
  const [previsions, setPrevisions] = useState([]);

  useEffect(() => {
    getMeteo();
    }, []);

  function getMeteo() {
    fetch('http://api.openweathermap.org/data/2.5/forecast?id=3020832&appid=9ee99ca097bcd7aad431d1d1d6452685&lang=fr&units=metric')
    .then(res => res.json())
    .then(res => {
      let data = res["list"];
      let meteo = [];
      for (let i = 0; i<5; i++) {
        let val = data[i];
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
        <View style={styles.jours}>
          {previsions.map((val,index) => {
            return (
            <Jour meteo={val} key={index}/>
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
    jours: {
        width: '100%',
        flex: 1,
        marginTop: 16,
        justifyContent: "space-evenly"
    }
  });
