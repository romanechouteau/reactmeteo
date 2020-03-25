import React from 'react';
import { StyleSheet, Image,  Text, View, TouchableOpacity } from 'react-native';
import rain from '../assets/rain.png';

export default function Home() {
    return (
      <View style={styles.container}>
        <View style={styles.top}>
        <View>
          <TouchableOpacity
          onPress={() => alert('Hello, world!')}
          style={styles.button}>
          <Text style={{ fontSize: 16, color: '#fff' }}>Prévisions</Text>
        </TouchableOpacity>
        </View>
          <View style={styles.dateLieu}>
          <Text style={styles.date}>
            Jeudi 19 Mars
          </Text>
          <Text style={styles.lieu}>
            Draveil
          </Text>
          <Text style={styles.heure}>
            10:00
          </Text>
          </View>
        </View>
        <View style={styles.contourImage}>
        <Image
          style={styles.image}
          source={rain} resizeMode="contain"
        />
        </View>
        <View>
        <Text style={styles.temps}>
          Pluie
        </Text>
        <Text style={styles.temp}>
          12°C
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
    temps: {
        fontSize: 40,
        fontWeight: 'bold',
        color: '#2f2e41'
    },
    temp: {
        fontSize: 80,
        fontWeight: '700',
        color: '#2f2e41'
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
    image: {
        flex:1,
        height: '100%',
        width: '100%',
        backgroundColor: 'transparent'
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
    }
  });
