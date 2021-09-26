import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator, CreateStackNavigator, TransitionPresets } from '@react-navigation/stack';
import SearchView from './SearchView';
import ProductDetail from '../ProductDetail/ProductDetail.js';
const Stack = createStackNavigator();
export default class Search extends Component {
    render() {
        return (

            <Stack.Navigator initialRouteName="SearchView"
                headerMode='none'
            >
                <Stack.Screen
                    name='SearchView'
                    component={SearchView}
                >
                </Stack.Screen>

                <Stack.Screen name='ProductDetail' component={ProductDetail}
                ></Stack.Screen>


            </Stack.Navigator>
        )
    }
}
