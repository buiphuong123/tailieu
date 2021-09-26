/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,TextInput
} from 'react-native';

import { 
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import {createStackNavigator, CreateStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import Loginadmin from './Components/Loginadmin.js';
import Loginpages from './Components/Loginpages.js';
import Register from './Components/Register.js';
import Layout from './Components/Layout.js';
import Pages from './Components/Pages.js';
import Home from './Components/Home.js';
// const Stack = createStackNavigator();

const App: () => Node = () => {
  
  return (
    // <NavigationContainer>
    //             <Stack.Navigator>
    //                 <Stack.Screen name='Login' component={Loginpages} ></Stack.Screen>
    //                 <Stack.Screen name='Home' component={Home} ></Stack.Screen>
    //                 <Stack.Screen name='Detail' component={Detail} ></Stack.Screen> 

    //              </Stack.Navigator>
    //  </NavigationContainer>  
     <Home />
    
  )
};   



export default App;
