import React, {Component} from "react";
import {View, Text, StyleSheet, TextInput, TouchableOpacity} from "react-native";
export default class Loginadmin extends Component{
    constructor(props){
        super(props);
        this.state={
          username: "",
          password: "",
          kq: "chua login",
          token: "..."
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
            <View style={styles.wrapper}>
                <View style={styles.box}>
                    <Text>LOGIN FORM</Text>
                </View>

                <View style={styles.box}>
                    <TextInput
                        style={styles.input}
                        onChangeText={(username)=>this.setState({username})}
                        placeholder="Username"
                        value={this.state.username}
                    />
                </View>

                <View style={styles.box}>
                    <TextInput
                        style={styles.input}
                        onChangeText={(password)=>this.setState({password})}
                        placeholder="password"
                        value={this.state.password}
                    />
                </View>

                <View style={styles.box}>
                    <TouchableOpacity onPress={()=>{this.LOGIN()}}>
                        <Text>Login</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.box}>
                    <Text>{this.state.kq}</Text>
                    <Text>{this.state.token}</Text>
                </View>
            
            </View>
        )
    }
}
var styles=StyleSheet.create({
    wrapper:{flex: 1, backgroundColor: "yellow", padding: 50},
    box: {flex: 1,  alignItems: "center", justifyContent: "center"},
    box2: {flex: 3,  alignItems: "center", justifyContent: "center"}, 
    input:{height: 40, borderColor: 'gray', borderWidth: 1, width: 300}
  }) 