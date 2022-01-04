import React, { useState } from 'react';
import { View, StyleSheet, Modal, TouchableOpacity, Image, FlatList } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../HomeScreen';
import HomeScreenDetail from '../HomeScreenDetail';
// import Grammar from '../Grammer';
import GrammarScreenDetail from '../GrammarScreenDetail';
import Grammer from '../Grammer';
import ListGrammer from '../ListGrammer';
import ExplainScreen from '../ExplainScreen';
import WordScreen from '../word/WordScreen';
import WordInfo from '../word/WordInfo';
import ListWord from '../word/ListWord';

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



            <Stack.Screen
                name='GrammarScr'
                component={Grammer}
            />

            <Stack.Screen
                name='ExplainScreen'
                component={ExplainScreen}
            />

            <Stack.Screen
                name='WordScreen'
                component={WordScreen}
            />

            <Stack.Screen
                name='WordInfo'
                component={WordInfo}
            />

            <Stack.Screen
                name='ListWord'
                component={ListWord}
            />



        </Stack.Navigator>
    )
}
export default HomeStack;