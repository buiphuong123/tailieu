import React, {Component} from "react";
import {View, Text, StyleSheet} from "react-native";
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';

function HomeScreen() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Home!</Text>
      </View> 
    );
  }
  
  function SettingsScreen() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Settings!</Text>
      </View>
    );
  }
  
const Tab = createBottomTabNavigator();
export default class Layout extends Component{
    render(){
        return(
            <NavigationContainer>
                <Tab.Navigator
                    screenOptions={({route})=>({
                        tabBarIcon: ({focused, color, size})=>{
                            let iconName;
                            if(route.name==="Home"){
                                iconName= focused?'heart-circle-outline' : 'person-circle-outline';
                            }else if (route.name === 'Settings') {
                                iconName = focused ? 'ios-list-box' : 'ios-list';
                              }
                              return <Icon name={iconName} size={size} color={color} />;
                        },
                    })}
                    tabBarOptions={{
                        activeTintColor: 'tomato',
                        inactiveTintColor: 'gray',
                      }}
                >
                    <Tab.Screen name="Home" component={HomeScreen} />
                    <Tab.Screen name="Settings" component={SettingsScreen} />
                </Tab.Navigator>
            </NavigationContainer>
        )
    }
}
var styles=StyleSheet.create({
    wrapper:{backgroundColor: "yellow", flex: 1  }
})