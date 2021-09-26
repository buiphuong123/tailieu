import React, {Component} from "react";
import {View, Text, StyleSheet, TextInput, Image, TouchableOpacity, ImageBackground, Dimensions} from "react-native";
export default class SignIn extends Component{
    render(){
        return(
            <View>
                <View>
                    <TextInput style={styles.InputUser} placeholder="Enter your email"/>
                </View>
                
                <TextInput style={styles.InputUser} placeholder="Enter your email"/>
                <TouchableOpacity style={styles.buttonMain}>
                    <Text style={styles.buttonText}>SIGN IN NOW</Text>
                </TouchableOpacity>
             </View>
        );
    }
}
const styles=StyleSheet.create({
    InputUser:{height: 50, backgroundColor: '#FFF', marginBottom: 10, borderRadius: 20, paddingLeft: 20},
    buttonMain:{height: 50, borderRadius: 20, borderWidth: 1, borderColor: '#FFF', alignItems: 'center', justifyContent: 'center'},
    buttonText:{color: '#FFF', fontFamily: 'Avenir', fontWeight: '400'}
});