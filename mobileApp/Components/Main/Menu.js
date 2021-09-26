import React, {Component} from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import admin from '../../media/appIcon/admin.png';
import back from '../../media/appIcon/back.png';
export default class Menu extends Component{
    constructor(props){
        super(props);
        this.state={isLogin: false}
    }
    render(){
        const logoutjs=(
            <View style={{flex: 1}}>
                    <TouchableOpacity style={styles.buttonUser} onPress={()=>
                     this.props.navigation.navigate("Authentication")}>
                        <Text style={styles.textButton}>Sign in</Text>
                    </TouchableOpacity>
            </View>
        );
        const loginJs=(
            <View style={{flex: 1, justifyContent: 'space-between', alignItems: 'center'}}>
                    <Text style={{color: '#FFF', fontFamily:'Avenir', fontSize: 20}}>bui thi phuong</Text>
                    <View>
                        <TouchableOpacity style={styles.buttonUserStyle} onPress={()=>
                    this.props.navigation.navigate("OrderHistory")}>
                            <Text style={styles.textButton}>OrderHistory</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.buttonUserStyle} onPress={()=>
                    this.props.navigation.navigate("ChangeInfo")}>
                            <Text style={styles.textButton}>ChangInfo</Text>
                        </TouchableOpacity>

                     
                    </View>
                    
                </View>
        )
        const mainUser= this.state.isLogin==false? logoutjs: loginJs
        return(
            <View style={styles.container}>
                <Image source={admin} size={28} style={styles.profileIcon} />
                { mainUser}
        
            </View>
        )
    
    }
}
var styles=StyleSheet.create({
    container:{flex: 1, backgroundColor: '#34B089', alignItems :'center' },
    profileIcon:{height: 100, width: 100, marginBottom: 30, marginVertical: 30},
    buttonUser:{height: 50,  justifyContent: 'center', alignItems: 'center', paddingHorizontal: 70, borderRadius:5, backgroundColor: '#FFF'},
    textButton:{color:'#34B089', marginLeft: 10 },
    buttonUserStyle:{height: 50, width: 250,justifyContent:'center', backgroundColor: '#FFF', marginBottom: 10, borderRadius: 5}

})
