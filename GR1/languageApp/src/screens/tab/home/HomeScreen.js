import React, { useState, useEffect } from 'react'
import { Text, View, SafeAreaView, TouchableOpacity } from 'react-native'
import CustomHeader from '../../CustomHeader';
import axios from "axios";
import { useSelector, useDispatch } from 'react-redux';
import { getGrammarRequest } from '../../../redux/actions/index';
import { getListWordRequest } from '../../../redux/actions/word.action';
import messaging from '@react-native-firebase/messaging';
import { getListNotifiRequest } from '../../../redux/actions/notifi.action';
const HomeScreen = ({ navigation }) => {
    const dispatch = useDispatch();
    const users = useSelector(state => state.userReducer.user);
    const GrammarRequest = () => dispatch(getGrammarRequest(users._id, navigation));
    const WordRequest = () => dispatch(getListWordRequest(users._id, navigation));
    useEffect(() => {
        dispatch(getListNotifiRequest(users.username));
        messaging().onMessage(async remoteMessage => {
            dispatch(getListNotifiRequest(users.username));
            console.log('A new FCM message arrived!', JSON.stringify(remoteMessage));
            // setNotification({
            //   ...notification,
            //   title: remoteMessage.notification.title,
            //   body: remoteMessage.notification.body,
            //   time: remoteMessage.data.sentTime,
            //   action: remoteMessage.data.action,
            // });
            // console.log('body sau khi set', notification.body);
            // console.log(notification.body + 'at'+ notification.time);
        });



        messaging().onNotificationOpenedApp(remoteMessage => {
            console.log('onNotificationOpenedApp: ', JSON.stringify(remoteMessage));
            // setNotification({
            //   title: remoteMessage.notification.title,
            //   body: remoteMessage.notification.body
            // })
        });

        messaging().setBackgroundMessageHandler(async remoteMessage => {
            console.log('Message handled in the background!', remoteMessage);
            // setNotification({
            //   title: remoteMessage.notification.title,
            //   body: remoteMessage.notification.body
            // })
        });

        messaging()
            .getInitialNotification()
            .then(remoteMessage => {
                if (remoteMessage) {
                    console.log('data chyten sang ben kia la ', remoteMessage.data);
                    axios.post('http://192.168.1.7:3002/language/editReadNotifi', {
                        "notification_id": remoteMessage.data.notification_id,
                    }, {
                        headers: {
                            "Accept": "application/json",
                            "Content-Type": "application/json"
                        }
                    })
                        .then((response) => {
                            console.log(response.data);
                        })
                        .catch(function (error) {
                            throw error;
                        });
                    navigation.navigate("ExplainScreen", { word: JSON.parse(remoteMessage.data.routedata) })

                }
            });
    }, []);
    return (
        <View style={{ flex: 1 }}>
            <CustomHeader title="Home" isHome={true} navigation={navigation} />
            <View style={{ backgroundColor: 'gray' }}>
                <Text>Grammar Screen</Text>
                <TouchableOpacity
                    style={{ marginTop: 20 }}
                    onPress={() => GrammarRequest()}
                >
                    <View>
                        <Text>Go to home Grammar</Text>
                    </View>
                </TouchableOpacity>
            </View>
            <View>
                <TouchableOpacity onPress={() => WordRequest()}>
                    <Text>Go to Word Screen</Text>
                </TouchableOpacity>
            </View>

        </View>
    )
}
export default HomeScreen;