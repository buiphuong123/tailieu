import React from 'react';
import {View, Text, Button, Dimensions, Imgae, StyleSheet,TextInput} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import HomeStack from '../screens/tab/home/homestack/HomeStack';
import SetStack from '../screens/tab/setting/setstack/SetStack';
import ContactStack from '../screens/tab/contact/ContactStack';
import NotificationStack from '../screens/tab/notification/NotificationStack';

const Tab = createBottomTabNavigator();
    const Main = () => {
        // const notifiList = useSelector(state => state.notifiReducer.notifiList);
        return(
           <Tab.Navigator
                screenOptions={({route})=>({
                    tabBarIcon: ({focused, color, size})=>{
                        let iconName;
                        if(route.name==="Home"){
                            iconName= focused?'home' : 'home';
                        }else if (route.name === 'Setting') {
                            iconName = focused ? 'settings-outline' : 'settings-outline';
                        }else if (route.name === 'Contact') {
                            iconName = focused ? 'people' : 'people';
                        }else if (route.name === 'JLPT') {
                            iconName = focused ? 'md-bookmarks-sharp' : 'md-bookmarks-sharp';
                        }
                        else if (route.name === 'Notification') {
                            iconName = focused ? 'notifications-outline' : 'notifications-outline';
                        }
                        return <Icon name={iconName} size={size} color={color} />;
                    },
                })}
                tabBarOptions={{
                    activeTintColor: 'tomato',
                    inactiveTintColor: 'gray',
                }}
            >
                <Tab.Screen 
                    name="Home" 
                    component={HomeStack} 
                />

                <Tab.Screen 
                    name="JLPT" 
                    component={ContactStack} 
                />

               <Tab.Screen 
                    name="Contact" 
                    component={ContactStack} 
                />
                
                 <Tab.Screen 
                    name="Setting" 
                    component={SetStack} 
                />

                <Tab.Screen 
                    name="Notification" 
                    component={NotificationStack} 
                    options={{ tabBarBadge: 1 }}
                />
                

            </Tab.Navigator>
           
        )
   
    
}
export default Main;



