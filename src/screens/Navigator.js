import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native';
import MyProducts from './MyProducts';

const Stack = createNativeStackNavigator();
const Navigator = () => {
  return (
    <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name="MyProducts" component={MyProducts} />
        </Stack.Navigator>
    </NavigationContainer>
  )
}

export default Navigator;

const styles = StyleSheet.create({})