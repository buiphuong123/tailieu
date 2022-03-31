import React, {useEffect, useState} from "react";
import 'react-native-gesture-handler';
import { createStackNavigator } from '@react-navigation/stack';
import { 
    NavigationContainer, 
    DefaultTheme as NavigationDefaultTheme,
    DarkTheme as NavigationDarkTheme,
} from '@react-navigation/native';
import { 
    Provider as PaperProvider, 
    DefaultTheme as PaperDefaultTheme,
    DarkTheme as PaperDarkTheme 
} from 'react-native-paper';
import { AuthContext } from '../components/context';
import RootScreen from './RootScreen';
import { createDrawerNavigator } from '@react-navigation/drawer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { connect } from 'react-redux';
import * as actions from './../redux/actions/index';
import DrawerTab from './DrawerTab';
import { navigationRef } from './NavigationService';
import { useSelector, useDispatch } from 'react-redux';
import { loginUserSuccess } from '../redux/actions/index';
import messaging from '@react-native-firebase/messaging';
import axios from 'axios';

const Home = (props) => {
    const [isDarkTheme, setIsDarkTheme] = React.useState(false);
    const dispatch = useDispatch();
    // AsyncStorage.setItem('@language', isDarkTheme);
    const dataUser = useSelector(state => state.userReducer.user);
    const takeData = async () => {
        const value = await AsyncStorage.getItem("@language");
        user = await AsyncStorage.getItem("@user");
        if(user !== null) {
            dispatch(loginUserSuccess(JSON.parse(user)));
        }
        if (value !==null) {
            props.setLanguage(value)
        }
    }

    // const takeNotifi = () => {

    // } 

    useEffect(() => {
        console.log('vao take data');
        takeData();
    //     console.log('vao day');
    //     messaging().onMessage(async remoteMessage => {
    //         console.log('A new FCM message arrived!', JSON.stringify(remoteMessage));
    //         // setNotification({
    //         //   ...notification,
    //         //   title: remoteMessage.notification.title,
    //         //   body: remoteMessage.notification.body,
    //         //   time: remoteMessage.data.sentTime,
    //         //   action: remoteMessage.data.action,
    //         // });
    //         // console.log('body sau khi set', notification.body);
    //         // console.log(notification.body + 'at'+ notification.time);
    //       });
        
      
      
    //       messaging().onNotificationOpenedApp(remoteMessage => {
    //         console.log('onNotificationOpenedApp: ', JSON.stringify(remoteMessage));
    //         // setNotification({
    //         //   title: remoteMessage.notification.title,
    //         //   body: remoteMessage.notification.body
    //         // })
    //       });
      
    //       messaging().setBackgroundMessageHandler(async remoteMessage => {
    //         console.log('Message handled in the background!', remoteMessage);
    //         // setNotification({
    //         //   title: remoteMessage.notification.title,
    //         //   body: remoteMessage.notification.body
    //         // })
    //       });
      
    //       messaging()
    //       .getInitialNotification()
    //       .then(remoteMessage => {
    //         if (remoteMessage) {
    //           props.navigation.navigate("ExplainScreen", {word: remoteMessage.data.routedata})
    //           console.log(
    //             'Notification caused app to open from quit state:',
    //             (remoteMessage.data.routedata),
                
    //           );
    //         }
    //       });
    },[]);
    // useEffect(() => {
    //     console.log('LAY TRONG ASYNC LA ',dataUser);
    // }, [dataUser]);
   
    const CustomDefaultTheme = {
        ...NavigationDefaultTheme,
        ...PaperDefaultTheme,
        colors: {
          ...NavigationDefaultTheme.colors,
          ...PaperDefaultTheme.colors,
          background: '#ffffff',
          text: '#333333'
        }
      }
      
      const CustomDarkTheme = {
        ...NavigationDarkTheme,
        ...PaperDarkTheme,
        colors: {
          ...NavigationDarkTheme.colors,
          ...PaperDarkTheme.colors,
          background: '#333333',
          text: '#ffffff'
        }
      }
      const theme = isDarkTheme ? CustomDarkTheme : CustomDefaultTheme;

      const authContext = React.useMemo(() => ({
          toggleTheme: () => {
              setIsDarkTheme( isDarkTheme => !isDarkTheme);
          }
      }), []);
    return (
        <PaperProvider theme={theme}>
            <AuthContext.Provider value={authContext}>
                <NavigationContainer ref={navigationRef} theme={theme}>
                  {dataUser.token !== null && dataUser.token !== undefined?
                // <Drawer.Navigator drawerContent={props => <DrawerContent {...props} />}>
                //     <Drawer.Screen name="HomeDrawer" component={Main} />
                //     <Drawer.Screen name="Profile" component={Profile} />
                //     <Drawer.Screen name="Homepages" component={HomePages} />
                //     <Drawer.Screen name="Language" component={Language} />
                // </Drawer.Navigator>
                <DrawerTab /> 
                :
                    <RootScreen />
                }  
                {/* <RootScreen /> */}
                {/* <Drawer.Navigator drawerContent={props => <DrawerContent {...props} />}>
                    <Drawer.Screen name="Main" component={Main} />
                    <Drawer.Screen name="Profile" component={Profile} />
                    <Drawer.Screen name="Homepages" component={HomePages} />
                    <Drawer.Screen name="Language" component={Language} />
                </Drawer.Navigator>  */}
                </NavigationContainer>
            </AuthContext.Provider>
        </PaperProvider>
    )
    
}


const mapStateToProps = (state) => {        
    return {        
        user: state.userReducer.user,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        setLanguage: language => {
            dispatch(actions.changeLanguage(language));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
