import React, {Component} from 'react';
import {Text, View, StyleSheet, TouchableOpacity, Dimensions, Image} from 'react-native';
const {height, width} = Dimensions.get('window');
import banner from '../../../../media/temp/banner.jpg';
export default class Collection extends Component{
    render(){
        return(
            <View style={styles.wrapper}>
                <View style={{flex: 1, justifyContent: 'center'}}>
                    <Text style={styles.textHomeStyle}>SPRING COLLECTION</Text>
                </View>
                <TouchableOpacity style={{flex: 4}}>
                    <Image source={banner}  style={styles.imageStyle}  />
                </TouchableOpacity>
            </View>
        )
    }
}
// image
const imageWidth= width-40;
const imageHeight=(imageWidth/933)*465;
var styles= StyleSheet.create({
    wrapper: {height: height*0.33, paddingTop:0, padding: 10, backgroundColor: '#FFF', margin: 10, shadowColor:'#2E272B', shadowOffset: {width: 0, height: 3}, shadowOpacity: 0.2},
    textHomeStyle:{ fontSize: 15, color: '#AFAEAF'},
    imageStyle:{height: imageHeight, width: imageWidth}
})