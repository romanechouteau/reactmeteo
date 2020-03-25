import React from 'react';
import { StyleSheet, Image,  Text, View } from 'react-native';
import rain from '../assets/simple-rain.png';

export default function Home() {
    return (
      <View style={styles.jour}>
        
          <View style={styles.left}>
          <View style={styles.contourImage}>
        <Image
          style={styles.image}
          source={rain} resizeMode="contain"
        />
        </View>
        <View>
          <Text style={{ fontSize: 20, color: '#000' }}>Demain</Text>
          <Text style={{ fontSize: 16, color: '#000' }}>Pluie</Text>
          </View>
          
          </View>
          <Text style={{ fontSize: 48, color: '#000', fontWeight: '700' }}>16°C</Text>
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
      height: 80,
      width: 80,
      marginRight: 16,
      },
      image: {
        height: 80,
        width: 80
      }
  });
