import React, { useState } from 'react';
import { View, StyleSheet, Modal, TouchableOpacity, Image } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../HomeScreen';
import HomeScreenDetail from '../HomeScreenDetail';
// import Grammar from '../Grammer';
import GrammarScreenDetail from '../GrammarScreenDetail';
import Grammer from '../Grammer';
import ListGrammer from '../ListGrammer';
import ExplainScreen from '../ExplainScreen';

const Stack = createStackNavigator();

const HomeStack = () => {
    return (
        <Stack.Navigator
            initialRouteName="Home"
            screenOptions={{
                headerMode: 'screen',
                headerShown: false,
            }}
        >
            <Stack.Screen
                name='Home'
                component={HomeScreen}
            />

            {/* <Stack.Screen
                name='HomeDetail'
                component={HomeScreenDetail}
            /> */}

            <Stack.Screen
                name='GrammarScr'
                component={Grammer}
            />

            <Stack.Screen
                name='ExplainScreen'
                component={ExplainScreen}
            />
        </Stack.Navigator>
    )
}
export default HomeStack;