import React, { Component } from 'react';
import { Text, View, TouchableOpacity, StyleSheet, Dimensions, Image, ImageBackground } from 'react-native';
import Swiper from 'react-native-swiper';
const { height, width } = Dimensions.get('window');
import banner from '../../../../media/temp/banner.jpg';
import little from '../../../../media/temp/little.jpg';
import maxi from '../../../../media/temp/maxi.jpg';
import party from '../../../../media/temp/party.jpg';  
const url='http://192.168.1.20/api/images/type/';
export default class Category extends Component {
    render() {
        const {types, navigation}= this.props;
        return (
            <View style={styles.wrapper}>
                <View style={{ flex: 1, justifyContent: 'center' }}>
                    <Text style={styles.textHomeStyle}>LIST OF CATEGORY</Text>
                </View>
                <View style={{ flex: 4, justifyContent: "flex-end" }}>   
                    <Swiper>
                         {types.map(e => (  
                            <TouchableOpacity key={e.id} onPress={()=>navigation.navigate("ListProduct")} >
                                <ImageBackground source={{uri: `${url}${e.image}`}} style={styles.imageStyle}  >
                                    <Text style={styles.cateTitle}>{e.name}</Text>
                                </ImageBackground>
                               
                            </TouchableOpacity>
                        ))}    
                        {/* <TouchableOpacity onPress={()=>this.props.navigation.navigate("ListProduct")}>
                            <ImageBackground source={little} style={styles.imageStyle} >
                                <Text style={styles.cateTitle}>Maxi dress</Text>
                            </ImageBackground>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={()=>this.props.navigation.navigate("ListProduct")}>
                            <ImageBackground source={maxi} style={styles.imageStyle} >
                                <Text style={styles.cateTitle}>Maxi dress</Text>
                           </ImageBackground>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>this.props.navigation.navigate("ListProduct")}>
                            <ImageBackground source={party} style={styles.imageStyle} >
                                <Text style={styles.cateTitle}>Maxi dress</Text>
                            </ImageBackground>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>this.props.navigation.navigate("ListProduct")}>
                            <ImageBackground source={party} style={styles.imageStyle} >
                                 <Text style={styles.cateTitle}>Maxi dress</Text>
                            </ImageBackground>
                        </TouchableOpacity> */}


                    </Swiper>
                </View>
            </View>
        )
    }
}
// image
const imageWidth = width - 40;
const imageHeight = (imageWidth / 933) * 465;
var styles = StyleSheet.create({
    wrapper: { height: height * 0.3, paddingTop: 0, padding: 10, backgroundColor: '#FFF', margin: 10, shadowColor: '#2E272B', shadowOffset: { width: 0, height: 3 }, shadowOpacity: 0.2 },
    textHomeStyle: { fontSize: 15, color: '#AFAEAF' },
    imageStyle: { height: imageHeight, width: imageWidth,justifyContent: 'center',
    alignItems: 'center' },
    cateTitle:{fontSize: 15,
        fontFamily: 'Avenir',
        color: '#9A9A9A'}
})