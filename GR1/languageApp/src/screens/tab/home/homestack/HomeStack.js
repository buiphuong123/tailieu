import React, {useState} from 'react';
import { View, StyleSheet, Modal, TouchableOpacity, Image } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../HomeScreen';
import HomeScreenDetail from '../HomeScreenDetail';

const Stack = createStackNavigator();

const HomeStack = () => {
    return (
        <Stack.Navigator 
            initialRouteName="Home"
            screenOptions={{
                headerShown: false
            }}
        >
            <Stack.Screen
                name='Home'
                component={HomeScreen}
            />

            <Stack.Screen
                name='HomeDetail'
                component={HomeScreenDetail}
            />
        </Stack.Navigator>
    )
}
export default HomeStack;