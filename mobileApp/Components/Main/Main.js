import React, {Component} from "react";
import {View, Text, Button, StyleSheet, TextInput, TouchableOpacity, ImageBackground, Dimensions} from "react-native";
import {createStackNavigator, CreateStackNavigator} from '@react-navigation/stack';
import Authentication from '../Authentication/Authentication.js';
import ChangeInfo from '../ChangeInfo/ChangeInfo.js';
// import OrderHistory from '../OrderHistory/OrderHistory.js';
// import { NavigationContainer } from "@react-navigation/native";
import {
    createDrawerNavigator,
    DrawerContentScrollView,
    DrawerItemList,
    DrawerItem,
  } from '@react-navigation/drawer';
  
import Menu from './Menu.js';
import Shop from './Shop/Shop.js';
import OrderHistory from "../OrderHistory/OrderHistory.js";

// function CustomDrawerContent(props) {
//     return (
//       <DrawerContentScrollView {...props}>
//         <DrawerItemList {...props} />
//         <DrawerItem
//           label="Close drawer"
//           onPress={() => props.navigation.closeDrawer()}
//         />
//         <DrawerItem
//           label="Toggle drawer"
//           onPress={() => props.navigation.toggleDrawer()}
//         />
//       </DrawerContentScrollView>
//     );
//   }

  const Drawer = createDrawerNavigator();
  export default class Main extends Component{
    render(){
        return(
           
           
             <Drawer.Navigator drawerContent={(props)=> <Menu navigation={this.props.navigation}/>}>
                 <Drawer.Screen name="Shop" initialRouteName 
                 component={Shop} 
                 />
                 
             </Drawer.Navigator>
        )
    } 
  }
