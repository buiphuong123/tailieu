import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator, CreateStackNavigator, TransitionPresets } from '@react-navigation/stack';
import CartView from './CartView';
import ProductDetail from '../ProductDetail/ProductDetail.js';
const Stack = createStackNavigator();
export default class Home extends Component {
    render() {
        return (

            <Stack.Navigator initialRouteName="CartView"
                headerMode='none'
            >
                <Stack.Screen
                    name='CartView'
                    component={CartView}
                >
                </Stack.Screen>

                <Stack.Screen name='ProductDetail' component={ProductDetail}
                ></Stack.Screen>


            </Stack.Navigator>
        )
    }
}
