import React, {Component} from 'react';
import {View, Text, StyleSheet, Button} from "react-native";
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import {createStackNavigator, CreateStackNavigator} from '@react-navigation/stack';
// import Loginpages from 'Loginpages.js';
const Stack = createStackNavigator();
const Login=({navigation})=>{
    return(
        <View style={styles.container}>
            <Button title='Go to Home' onPress={()=>{
                navigation.replace('Home');
            }} />
                {/* navigation.navigate('Detail'); */}
        </View>
    );
};

const Home=({navigation})=>{
    return(
        <View style={styles.container}>
            <Button title='Go to Detail' onPress={()=>{
                navigation.navigate('Detail');
            }} />
                {/* navigation.navigate('Detail'); */}
        </View>
    );
};

const Detail=({navigation})=>{
    return(
        <View style={styles.container}>
            <Button title='Go to Home again' onPress={()=>{
                navigation.navigate('Detail');
            }} />
                {/* navigation.navigate('Detail'); */}
            <Button title='Go back' onPress={()=>{
                navigation.goBack();
            }} />

            <Button title='pop to top' onPress={()=>{
                navigation.popToTop();
            }} />

            <Button title='Logout' onPress={()=>{
                navigation.replace('Login');
            }} />
        </View>
        // replace manf hinh 2 de len man hinh 1 va man hinh 1 bien mat
    );
};

export default class Pages extends Component{
    render(){
        return(   
            <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen name='Login' component={Login} ></Stack.Screen>
                    <Stack.Screen name='Home' component={Home} ></Stack.Screen>
                    <Stack.Screen name='Detail' component={Detail} ></Stack.Screen>

                </Stack.Navigator>
            </NavigationContainer>
        )
    }
} 
var styles=StyleSheet.create({
    container:{flex: 1, justifyContent: "center", alignItems: "center"},
})   