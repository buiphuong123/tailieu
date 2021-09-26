import React, {Component} from "react";
import {View, Text, StyleSheet, TextInput, Image, TouchableOpacity, ImageBackground, Dimensions} from "react-native";
import register from '../../api/register.js';

export default class SignUp extends Component{
    constructor(props){
        super(props);
        this.state={
            name: '',
            email: '',
            password: '',
            repassword: ''
        }
    }
    registerUser(){
        const {name, email, password} = this.state;
        register(email, name, password)
        .then(res=>{
            console.log(res);
        })// thanh cong hay khong thanh cong
    }
    render(){    
        return(
            <View>  
                    <TextInput 
                    style={styles.InputUser} 
                    placeholder="Enter your name"
                    value={this.state.name}
                    onChangeText={text=> this.setState({name: text})}
                    />  
                    <TextInput 
                    style={styles.InputUser} 
                    placeholder="Enter your email"
                    value={this.state.email}
                    onChangeText={text=> this.setState({email: text})}
                    />
                    <TextInput 
                    style={styles.InputUser} 
                    placeholder="Enter your password"
                    value={this.state.password}
                    secureTextEntry
                    onChangeText={text=> this.setState({password: text})}
                    />
                    <TextInput 
                    style={styles.InputUser} 
                    placeholder="Re-enter your password"
                    value={this.state.repassword}
                    secureTextEntry
                    onChangeText={text=> this.setState({repassword: text})}
                    />

                    <TouchableOpacity style={styles.buttonMain} onPress={this.registerUser.bind(this)}>
                        <Text style={styles.buttonText}>SIGN up NOW</Text>
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