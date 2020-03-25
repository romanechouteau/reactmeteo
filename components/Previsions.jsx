import React from 'react';
import { StyleSheet, Image,  Text, View, TouchableOpacity } from 'react-native';
import rain from '../assets/rain.png';
import Jour from './Jour';

export default function Home({ navigation }) {
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
            <Jour />
            <Jour />
            <Jour />
            <Jour />
            <Jour />
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
