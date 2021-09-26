import React, {Component} from "react";
import {View, Text, StyleSheet, TextInput, Image, TouchableOpacity, ImageBackground, Dimensions} from "react-native";
import back_white from '../../media/appIcon/back_white.png';
import ic_logo from '../../media/appIcon/ic_logo.png';
import SignIn from './SignIn';
import SignUp from './SignUp';
export default class Authentication extends Component{
    constructor(props){
        super(props);
        this.state={isSignin: false}
    }
    // test
    // componentDidMount(){
    //     register('pho000', 'buiphuong','123')
    //     .then(res=> console.log(res));
    // }
    signIn(){
        this.setState({isSignin: true});
    }
    signUp(){
        this.setState({isSignin: false});
    }
    render(){
        // const signJS=(
        //     <View>
        //         <View>
        //             {/* <Icon name={'person'} size= {28} color={'white'} style={styles.inputIcon}/> */}
        //             <TextInput style={styles.InputUser} placeholder="Enter your email"/>
        //         </View>
                
        //         <TextInput style={styles.InputUser} placeholder="Enter your email"/>
        //         <TouchableOpacity style={styles.buttonMain}>
        //             <Text style={styles.buttonText}>SIGN IN NOW</Text>
        //         </TouchableOpacity>
        //  </View>
        // );
        // const signupJs=(
        //     <View>
        //             <TextInput style={styles.InputUser} placeholder="Enter your name"/>
        //             <TextInput style={styles.InputUser} placeholder="Enter your email"/>
        //             <TextInput style={styles.InputUser} placeholder="Enter your password"/>
        //             <TextInput style={styles.InputUser} placeholder="Re-enter your password"/>

        //             <TouchableOpacity style={styles.buttonMain}>
        //                 <Text style={styles.buttonText}>SIGN up NOW</Text>
        //             </TouchableOpacity>
        //          </View>
        // );
        const {isSignin} = this.state;
        // const statusSignin= isSignin? signJS: signupJs
        const statusSignin= isSignin? <SignIn />: <SignUp />
        return(
            <View style={styles.container}>
                <View style={styles.wrapper}>

                    <View style={{flexDirection: 'row', justifyContent: 'space-between', color: 'white', marginBottom: 10}}>
                        <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                            <Image source={back_white} style={styles.imageStyle} />
                        </TouchableOpacity>
                            <Text style={styles.title}>日本語</Text>
                        <Image source={ic_logo} style={styles.imageStyle}/>

                    </View>
                    {/* <Image source={require('https://inlonggia.com/wp-content/uploads/Background-dep-vector.jpg')} /> */}
                    
                 </View>
                {statusSignin}
                 

                 <View style={styles.controller_user} >
                     <TouchableOpacity style={styles.SignIn} onPress={this.signIn.bind(this)}>
                         <Text style={isSignin? styles.active: styles.inactive}>SIGN IN</Text>
                     </TouchableOpacity>
                     <TouchableOpacity style={styles.SignUp} onPress={this.signUp.bind(this)}>
                         <Text style={!isSignin? styles.active: styles.inactive}>SIGN UP</Text>
                     </TouchableOpacity>
                 </View>
            </View>
        )
    }
    
}
const styles=StyleSheet.create({
    container: {backgroundColor: '#34B089', padding: 10,  flex: 1, justifyContent: 'space-between'},
    wrapper:{  justifyContent: 'space-around'},
    title:{color: '#FFF', fontFamily: 'Avenirs', fontSize: 20}, 
    // Textinput:{ backgroundColor: 'white', borderRadius: 10, fontSize: 15, alignItems:'center', justifyContent:'center', paddingLeft: 10 },
    imageStyle:{height: 30, width: 30},
    controller_user:{flexDirection: 'row',alignSelf: 'stretch'},
    SignIn:{backgroundColor: '#FFF', flex: 1, alignItems: 'center', paddingVertical: 15, borderBottomLeftRadius: 20, borderTopLeftRadius: 20, marginRight:1},
    SignUp:{backgroundColor: '#FFF', flex: 1, alignItems: 'center', paddingVertical: 15, borderBottomRightRadius: 20, borderTopRightRadius: 20, marginLeft: 1},
    inactive: {color: 'gray'},
    active: {color: '#34B089'},
    // InputUser:{height: 50, backgroundColor: '#FFF', marginBottom: 10, borderRadius: 20, paddingLeft: 20},
    // buttonMain:{height: 50, borderRadius: 20, borderWidth: 1, borderColor: '#FFF', alignItems: 'center', justifyContent: 'center'},
    // buttonText:{color: '#FFF', fontFamily: 'Avenir', fontWeight: '400'}
})

                
