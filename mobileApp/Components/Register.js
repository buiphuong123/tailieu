import React, {Component} from "react";
import {View, Text, StyleSheet, TextInput, TouchableOpacity, ImageBackground, Dimensions} from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';
export default class Register extends Component{
    constructor(props){
        super(props);
        this.state={
            showPass: true,   
            press: false,
            username: "",
            password: "",
            email: "",
            name: "",
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
    register(){
        fetch("http://192.168.1.21/Login/regis.php",{ // fetch gui du lieu ra ben ngoai 
        method: "POST",
        header: {
            "Accept":"application/json",
            "Content-Type":"application/json"
        },
        body: JSON.stringify({ // gia tri  
            "email": this.state.email,
            "username": this.state.username,
            "password": this.state.password,
            "name": this.state.name,
        })
    })
    .then((response)=>response.json())
    .then((responseJson)=>{ // boc tach json 
        this.setState({result: responseJson.id})  // ket qua tra ve 
    })
    .catch((error)=>{console.log(error)});
    }
    render(){
        return(
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.header_text}>REGISTER</Text>
                </View>

                <View style={styles.footer}>
                    <Text style={styles.footer_text}>Email</Text>
                    <View style={styles.boxinput}>
                       <Icon name={'mail'} size= {28} color={'black'} style={styles.inputIcon}/>
                       <TextInput
                            style={styles.input}
                            placeholder={'Your email'}
                            underlineColorAndroid='transparent'
                            onChangeText={(email)=>this.setState({email})}
                            value={this.state.email}
                            autoCapitalize= "none"
                        />

                        <Icon name={'checkbox'} size= {28} color={'black'} style={styles.inputIconcheck}/>
                    </View>

                    <Text style={styles.footer_text}>Username</Text>
                    <View style={styles.boxinput}>
                       <Icon name={'person'} size= {28} color={'black'} style={styles.inputIcon}/>
                       <TextInput
                            style={styles.input}
                            placeholder={'Your username'}
                            underlineColorAndroid='transparent'
                            onChangeText={(username)=>this.setState({username})}
                            value={this.state.username}
                            autoCapitalize= "none"
                        />
                    </View>


                    <Text style={styles.footer_text}>Password</Text>
                    <View style={styles.boxinput}>
                       <Icon name={'lock-open'} size= {28} color={'black'} style={styles.inputIcon}/>
                       <TextInput
                            style={styles.input}
                            placeholder={'Your password'}
                            secureTextEntry={this.state.showPass}
                            underlineColorAndroid='transparent'
                            onChangeText={(password)=>this.setState({password})}
                            value={this.state.password}
                            autoCapitalize= "none"
                        />
                    <TouchableOpacity style={styles.eyess} 
                        onPress={this.showPasskq.bind()}
                        >
                        <Icon name={this.state.press == false? 'eye-off': 'eye'} size= {26} color={'black'} />
                    </TouchableOpacity>
                    </View>

                    <Text style={styles.footer_text}>Name</Text>
                    <View style={styles.boxinput}>
                       <Icon name={'eye'} size= {28} color={'black'} style={styles.inputIcon}/>
                       <TextInput
                            style={styles.input}
                            placeholder={'Your name'}
                            underlineColorAndroid='transparent'
                            onChangeText={(name)=>this.setState({name})}
                            value={this.state.name}
                            autoCapitalize= "none"
                        />
                    </View>

                    <TouchableOpacity style={styles.register} onPress={()=>{this.register()}}>
                        <Text style={styles.textRegister}>Register</Text>
                    </TouchableOpacity>
                </View>

                
            </View>
        )
    }
}
var styles=StyleSheet.create({
    container:{flex: 1, backgroundColor: '#009387'},
    header:{flex: 1, justifyContent: "center", alignItems: "center", paddingBottom: 50},
    footer:{flex: 6, backgroundColor: '#fff', borderTopLeftRadius: 30, borderTopRightRadius: 30, paddingHorizontal: 10, paddingVertical: 30},
    header_text:{color: '#fff', fontWeight: 'bold', fontSize: 30, marginTop: 40},
    footer_text: {color: '#05375a', fontSize: 18, marginTop: 20},
    inputIcon:{position: 'absolute', top: 4},
    boxinput:{ borderBottomColor: '#f2f2f2', borderBottomWidth: 1},
    textLogin:{color: "black", justifyContent: "center", alignItems: "center"},
    input: {marginLeft: 30, color: 'black'},
    inputIconcheck:{position: 'absolute', top: 4, right: 10, color: '#008000'},
    eyess:{position: 'absolute', top: 4, right: 10 },
    register:{width: 60,height: 45, borderRadius: 20, backgroundColor: '#009387', justifyContent: "center", alignItems: "center", marginTop: 20, marginLeft: 130 },
    textRegister:{color: "white", justifyContent: "center", alignItems: "center"}
     
   
})