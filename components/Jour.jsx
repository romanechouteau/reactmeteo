import React from 'react';
import { StyleSheet, Image,  Text, View } from 'react-native';

export default function Jour(props) {
  const meteo = props.meteo;
  
    return (
      <View style={styles.jour}>
        
          <View style={styles.left}>
          <View style={styles.contourImage}>
        <Image
          style={styles.image}
          source={{uri:meteo["image"]}} resizeMode="contain"
        />
        </View>
        <View>
          <Text style={{ fontSize: 20, color: '#000' }}>{meteo["date"]}</Text>
          <Text style={{ fontSize: 20, color: '#000' }}>{meteo["heure"]}</Text>
          <Text style={{ fontSize: 16, color: '#000' }}>{meteo["description"]}</Text>
          </View>
          
          </View>
          <Text style={{ fontSize: 48, color: '#000', fontWeight: '700' }}>{meteo["température"]}</Text>
      </View>
    );
  }
  
  const styles = StyleSheet.create({
    jour: {
        backgroundColor: '#f5f5f5',
        width: '100%',
        alignSelf: 'center',
        padding: 16,
        marginBottom: 16,
        borderRadius: 190,
        overflow: 'hidden',
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,

        elevation: 3,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    left: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    contourImage: {
      backgroundColor: '#fff',
      borderRadius: 40,
      height: 80,
      width: 80,
      marginRight: 16,
      },
      image: {
        height: 80,
        width: 80
      }
  });
