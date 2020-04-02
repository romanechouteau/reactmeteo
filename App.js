import React from 'react';
import Home from './components/Home';
import Previsions from './components/Previsions';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen
          name="Home"
          component={Home}
        />
        <Stack.Screen name="Previsions" component={Previsions} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
