import React, {Component} from "react";
import {View, Text, StyleSheet, TextInput, TouchableOpacity, ImageBackground, Dimensions} from "react-native";
// import logo from '../images/logo.jpg';
import Icon from 'react-native-vector-icons/Ionicons';
const {width: WIDTH}= Dimensions.get('window');
export default class Loginpages extends Component{
    constructor(props){
        super(props);
        this.state={
            showPass: true,   
            press: false,
            username: "",
            password: "",
            token: "",
            kq: "",
        }    
    }
    showPasskq=()=>{
        console.log('vao day roi nhaa');
        if(this.state.press==false){
            this.setState({showPass: false, press: true})  
        }
        else{
            this.setState({showPass: true, press: false})
        }
    }

    LOGIN(){
        // fetch react-native fetch len server cai gi do va server tra ket qua
        fetch("http://192.168.1.21/Login/CreateToken.php",{
            method: "POST",  
            header:{
                "Accept":"application/json",
                "Content-Type":"application/json"
            },
            body: JSON.stringify({
                "USERNAME": this.state.username,
                "PASSWORD": this.state.password
            })
        })
        .then((response)=>response.json()) 
        .then((responseJson)=>{
            this.setState({
               kq: responseJson.token
            });
        })
        .catch((error)=>{console.log(error)});
      }

    render(){
        return(
            <ImageBackground source={logo} style={styles.backgourndContainer}>
                <View>
                    <Text style={styles.logoText}>LOGIN FORM</Text>
                </View>
                <View style={styles.boxinput}>
                    <Icon name={'person'} size= {28} color={'white'} style={styles.inputIcon}/>
                    <TextInput
                        style={styles.input}
                        placeholder={'Username'}
                        placeholderTextColor={'rgba(255,255,255, 0.7)'}
                        underlineColorAndroid='transparent'
                        onChangeText={(username)=>this.setState({username})}
                        value={this.state.username}
                    />
                </View>   

                <View style={styles.boxinput}>
                    <Icon name={'lock-open'} size= {28} color={'white'} style={styles.inputIcon}/>
                    <TextInput
                        style={styles.input}
                        placeholder={'Password'}
                        secureTextEntry={this.state.showPass}
                        placeholderTextColor={'rgba(255,255,255, 0.7)'}
                        underlineColorAndroid='transparent'
                        onChangeText={(password)=>this.setState({password})}
                        value={this.state.password}
                    />
                    <TouchableOpacity style={styles.eyess} 
                        onPress={this.showPasskq.bind()}
                        >
                        <Icon name={this.state.press == false ? 'eye-off' : 'eye'} size= {26} color={'white'} />
                    </TouchableOpacity>
                </View>

                <TouchableOpacity style={styles.login} onPress={()=>{this.LOGIN()}}>
                    <Text style={styles.textLogin}>Login</Text>
                </TouchableOpacity>
                <View>
                    <Text style={styles.textLogin}>{this.state.kq}</Text>
                </View>
                

            </ImageBackground>
        )
    }
}
var styles=StyleSheet.create({
    backgourndContainer:{flex: 1, width: null, height: null, justifyContent:"center", alignItems: "center"},
    input:{width: WIDTH-55,height: 45,borderRadius: 25, color: "white", fontSize: 16,paddingLeft: 45,  alignItems: "center", justifyContent: "center", backgroundColor: "rgba(0, 0, 0, 0.35)",marginHorizontal: 25},
    logoText: { color: "white", fontSize: 20,padding: 20, fontWeight:"500", marginTop: 10},
    inputIcon:{position: 'absolute', top: 4, left: 37},
    boxinput:{marginTop: 10},
    eyess:{position: 'absolute', top: 4, right: 37 },
    login:{width: 60,height: 45,borderRadius: 25, backgroundColor: 'rgba(0, 0, 0, 0.35)', justifyContent: "center", alignItems: "center", marginTop: 20 },
    textLogin:{color: "white", justifyContent: "center", alignItems: "center"}
     
})       