import React, {Component} from 'react';
import {ScrollView, Text} from 'react-native';
import Collection from './Collection';
import Category from './Category';
import TopProduct from './TopProduct';
export default class HomeView extends Component{
 
    render(){
        const {types, topProduct, navigation}= this.props ;
        return(
        <ScrollView style={{backgroundColor: 'gray', flex: 1}}>
            <Collection />
            <Category navigation={navigation} types={types} navigation={navigation}  />   
            <TopProduct navigation={navigation} topProduct={topProduct}/>
        </ScrollView>
        )
    }
}
