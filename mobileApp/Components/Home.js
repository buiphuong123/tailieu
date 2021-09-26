import React, {Component} from "react";
import {View, Text, StyleSheet, TextInput, TouchableOpacity, ImageBackground, Dimensions, I18nManager}  from "react-native";
import {createStackNavigator, CreateStackNavigator, TransitionPresets} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import Authentication from './Authentication/Authentication.js';
import ChangeInfo from './ChangeInfo/ChangeInfo.js';
import Main from './Main/Main.js';
import OrderHistory from './OrderHistory/OrderHistory.js';
export const GESTURE_DIRECTION = 'horizontal';
const Stack = createStackNavigator();
export default class Home extends Component{
    render(){
        return(
    <NavigationContainer style={styles.init} >
                <Stack.Navigator initialRouteName="Main"
                headerMode='none'
                    screenOptions={{
                        gestureEnabled: true, 
                        gestureDirection: "horizontal"
                    //     ...TransitionPresets.SlideFromRightIOS
                    }}
                    
                >
                    
                    <Stack.Screen 
                        name='Main' 
                        component={Main} 
                        style={styles.init}
                        // options={{
                        //     ...TransitionPresets.SlideFromRightIOS,
                        // }}
                        
                    >
                    </Stack.Screen>
                    <Stack.Screen name='ChangeInfo' component={ChangeInfo}
                        options={{
                            ...TransitionPresets.SlideFromRightIOS,
                        }}
                     ></Stack.Screen>
                    <Stack.Screen name='Authentication' component={Authentication}
                        options={{
                            ...TransitionPresets.SlideFromRightIOS,
                        }}
                     ></Stack.Screen> 
                    <Stack.Screen name='OrderHistory' component={OrderHistory} ></Stack.Screen> 

                 </Stack.Navigator>
     </NavigationContainer> 

                           
        )
    }
}

var styles=StyleSheet.create({
    init: {backgroundColor: 'red'}
})