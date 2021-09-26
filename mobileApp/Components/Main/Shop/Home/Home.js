import React, {Component} from 'react';
import {ScrollView, Text} from 'react-native';
import Collection from './Collection';
import Category from './Category';
import TopProduct from './TopProduct';
import HomeView from './HomeView';
import ListProduct from '../ListProduct/ListProduct.js';
import ProductDetail from '../ProductDetail/ProductDetail.js';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createStackNavigator, CreateStackNavigator, TransitionPresets} from '@react-navigation/stack';
import { roundToNearestPixel } from 'react-native/Libraries/Utilities/PixelRatio';

const Stack = createStackNavigator();
export default class Home extends Component{
    render(){
        const {types, topProduct, navigation, route }=this.props;
        
        // console.log(this.props.route);
        return(
            // <NavigationContainer >
                <Stack.Navigator initialRouteName="HomeView"
                headerMode='none'
                >
                    
                    <Stack.Screen 
                        name='HomeView' 
                        // component={HomeView} 
                        children={()=><HomeView types={types} topProduct={topProduct} navigation={navigation}/> }
                        
                    >
                    </Stack.Screen>
                    <Stack.Screen name='ListProduct' 
                        component={ListProduct} 
                     ></Stack.Screen>
                    <Stack.Screen name='ProductDetail' 
                    component={ProductDetail}   
                     ></Stack.Screen> 
                    

                 </Stack.Navigator>
        // </NavigationContainer> 
        )
    }
}
