import React, {Component} from 'react';
import {View, Text, Button, Dimensions, Imgae, StyleSheet,TextInput} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import {NavigationContainer} from '@react-navigation/native';
import Home from './Home/Home.js';
import Contact from './Contact/Contact.js';
import Cart from './Cart/Cart.js';
import Search from './Search/Search.js';

const {height}= Dimensions.get('window');

const Tab = createBottomTabNavigator();
    export default class Shop extends Component{
        constructor(props){
            super(props);
            this.state={
                types: [],
                topProduct: []
            };
        }
        componentDidMount(){
            fetch('http://192.168.1.20/api/')
            .then(res=> res.json())
            .then(resJSON =>{
                const {type, product}= resJSON;
                this.setState({types: type, topProduct: product});
             }
             )};// lay dc file json index
        
        render(){
            const {types, topProduct}= this.state;
        return(
            <View style={{flex: 1}}>
                 {/* <Button title="Open drawer" onPress={() => navigation.toggleDrawer()} /> */}
                <View style={styles.wrapper}>

                    <View style={{flexDirection: 'row', justifyContent: 'space-between', color: 'white', marginBottom: 10}}>
                        <TouchableOpacity onPress={() => this.props.navigation.toggleDrawer()}>
                            <Icon name={'menu'} size={29} style={{color: '#FFF'}} />
                        </TouchableOpacity>
                            <Text style={styles.title}>日本語</Text>
                        <Icon name={'menu'} size={28} style={{color: '#FFF'}} />
                    </View>
                       {/* <Image source={require('https://inlonggia.com/wp-content/uploads/Background-dep-vector.jpg')} /> */}
                       <TextInput style={styles.Textinput}
                                    placeholder='search'
                       ></TextInput> 
                </View>

                    <Tab.Navigator
                        screenOptions={({route})=>({
                            tabBarIcon: ({focused, color, size})=>{
                                let iconName;
                                if(route.name==="Home"){
                                    iconName= focused?'home' : 'home';
                                }else if (route.name === 'Contact') {
                                    iconName = focused ? 'home' : 'home';
                                }
                                else if(route.name=== 'Cart'){
                                    iconName= focused? 'home' : 'home';
                                }
                                else if(route.name==='Search'){
                                    iconName= focused? 'search': 'search';
                                }
                                return <Icon name={iconName} size={size} color={color} />;
                            },
                        })}
                        tabBarOptions={{
                            activeTintColor: 'tomato',
                            inactiveTintColor: 'gray',
                        }}
                    >
                        <Tab.Screen name="Home" 
                        // component={Home} 
                        children={()=><Home types={types} topProduct={topProduct} navigation={this.props.navigation} route={this.props.route}/> }
                        />
                        <Tab.Screen name="Contact" component={Contact} />
                        <Tab.Screen name="Cart" component={Cart} />
                        <Tab.Screen name="Search" component={Search} />

                    </Tab.Navigator>
            {/* </NavigationContainer> */}
                
             </View>
        )
   }
    
}
// export default Shop;
const styles=StyleSheet.create({
    wrapper:{height: height/8, backgroundColor: '#34B089', padding: 10, justifyContent: 'space-around', padding: 10},
    title:{color: '#FFF', fontFamily: 'Avenirs', fontSize: 20}, 
    Textinput:{height: height/17, backgroundColor: 'white', borderRadius: 10, fontSize: 15, alignItems:'center', justifyContent:'center', paddingLeft: 10 }
})
