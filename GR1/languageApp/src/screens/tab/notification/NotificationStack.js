import React, { useState, useEffect } from 'react'
import { Text, View, Image, SafeAreaView, FlatList, Dimensions, TouchableOpacity, ScrollView } from 'react-native'
import en from '../../../assets/images/en.png';
import Icon from 'react-native-vector-icons/AntDesign';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useSelector, useDispatch } from 'react-redux';
import { getListNotifiRequest } from '../../../redux/actions/notifi.action';
import axios from 'axios';

const WIDTH = Dimensions.get('window').width;

const NotificationStack = ({ navigation }) => {
    const dispatch = useDispatch();
    const users = useSelector(state => state.userReducer.user);
    const notifiList = useSelector(state => state.notifiReducer.notifiList);
    const [dataNotifi, setdataNotifi] = useState(notifiList);
    var last = new Date();
    

    useEffect(() => {
        setdataNotifi(notifiList);
    }, [notifiList]);
    const likeaction = (
        <View style={{ borderWidth: 1, borderColor: 'blue', padding: 5, width: 35, borderRadius: 20, backgroundColor: 'blue', top: 30, right: 10, position: 'absolute', zIndex: 1 }}>
            <Icon
                style={{}}
                name="like1"
                color={'white'}
                size={23}
            />
        </View>
    )
    const dislikeaction = (
        <View style={{ borderWidth: 1, borderColor: 'blue', padding: 5, width: 35, borderRadius: 20, backgroundColor: 'blue', top: 30, right: 10, position: 'absolute', zIndex: 1 }}>
            <Icon
                name="dislike1"
                color={'white'}
                size={23}
            />
        </View>
    )

    const time = (dt) => {
        const result = (last.getTime() - dt.getTime())/1000;
        const minutes = (result-result%60)/60;
        const hours = (minutes-minutes%60)/60;
        const day = (result-result%86400)/86400;
        const month = (day-day%30)/30;
        const year = (month-month%12)/12;
        if(year !== 0) {
            return year + ' ' + 'nam';
        }
        else if(month !== 0) {
            return month + ' ' +'thang';
        }
        else if(day !== 0) {
            return day + ' ' +'ngay';
        }
        else if(hours !== 0) {
            return hours + ' ' +'gio';
        }
        else if(minutes !== 0) {
            return minutes + ' ' +'phut';
        }
        else {
            return 'vua xong';
        }
    }
    const showGamen = (item, index) => {
        if(dataNotifi[index].isRead === false) {
            dataNotifi[index].isRead = true;
            axios.post('http://192.168.1.7:3002/language/editReadNotifi', {
             "notification_id": item._id,
         }, {
             headers: {
                 "Accept": "application/json",
                 "Content-Type": "application/json"
             }
         })
             .then((response) => {
                 console.log(response.data);
             })
             .catch(function(error) {
                 throw error;
             });
             dispatch(getListNotifiRequest(users.username));

        }
        navigation.navigate("ExplainScreen", {word: item.data});
    }
    const renderNotifi = ({ item, index }) => {
        var dt = new Date(item.time);
        return (
            <TouchableOpacity style={{ backgroundColor: item.isRead === true ? 'white': '#e6ffff' }} onPress={() => showGamen(item, index)}>
                <View style={{marginTop: 20, flexDirection: 'row', width: WIDTH - 100 }}>
                    <View style={{ width: 80 }}>
                        <Image
                            style={{ width: 60, height: 65, zIndex: 0 }}
                            source={en}
                        />
                        {
                            item.action === 'like' ? likeaction: dislikeaction

                        }
                        {/* <View style={{borderWidth: 1, borderColor: 'blue', padding: 5, width: 35, borderRadius: 20, backgroundColor: 'blue',  top: 30, right: 10, position: 'absolute', zIndex: 1}}>
                                <Icon
                                    name="dislike1"
                                    color={'white'}
                                    size={23}
                                />
                            </View>

                                <View style={{borderWidth: 1, borderColor: '#33ff33', padding: 5, width: 35, borderRadius: 20, backgroundColor: '#33ff33',  top: 30, right: 10, position: 'absolute', zIndex: 1}}>
                                    <Icons
                                        name="comment"
                                        color={'white'}
                                        size={23}
                                    />
                                </View> */}
                    </View>
                    <View style={{ height: 80 }}>
                        <View style={{flexDirection: 'row', flexWrap: 'wrap', alignItems: 'flex-start' }}>
                            <Text numberOfLines={3}>{item.content} </Text>
                        </View>
                        <View style={{}}>
                            <Text style={{marginTop: 5, color: 'gray' }}>{time(dt)}</Text>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }
    return (
        <SafeAreaView style={{ flex: 1 }}>
            {/* <CustomHeader title="Home" isHome={true} navigation={navigation} /> */}
            <ScrollView>
                <Text style={{ fontSize: 21, fontWeight: 'bold', padding: 10 }}>Thông báo</Text>
                <View style={{ marginLeft: 10, marginBottom: 10 }}>
                    <FlatList
                        // style={{ marginTop: 15, marginLeft: 20 }}
                        inverted={true}
                        data={dataNotifi}
                        keyExtractor={( item, index) => index.toString()}
                        renderItem={renderNotifi}
                    />
                </View>
            </ScrollView>

        </SafeAreaView>
    )
}
export default NotificationStack;
{/* <View style={{ flex: 3, justifyContent: 'center', alignItems: 'center' }}>
                        <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' }}>
                            {listQues()}
                        </View>
                    </View> */}