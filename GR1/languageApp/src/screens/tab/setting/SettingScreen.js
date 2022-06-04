import React, { useEffect, useState } from 'react'
import { Text, View, SafeAreaView, TouchableOpacity, Dimensions } from 'react-native'
import CustomHeader from '../../CustomHeader';
import { Kanji } from 'react-native-kanji-animation';
import { useDispatch, useSelector } from 'react-redux';
import { getListScheduleRequest } from '../../../redux/actions/schedule.action';
import { getListVocaRequest } from '../../../redux/actions/vocabulary.action';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Icon from 'react-native-vector-icons/Ionicons';
import Icons from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import Entypos from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const WIDTH = Dimensions.get('window').width;

const SettingScreen = ({ navigation }) => {
    const dispatch = useDispatch();
    const users = useSelector(state => state.userReducer.user);
    const moveCalendar = () => {
        dispatch(getListScheduleRequest(users._id));
        navigation.navigate("Calendar", { navigation: navigation });
    }
    const moveVocabulary = () => {
        dispatch(getListVocaRequest(users._id));
        navigation.navigate("VocabularyScreen", { navigation: navigation });
    }
    // useEffect(() => {
    //     const unsubscribe = navigation.addListener('focus', () => {
    //         dispatch(getListVocaRequest(users._id));
    //       //Put your Data loading function here instead of my loadData()
    //     });
    
    //     return unsubscribe;
    //   }, [navigation]);

    return (
        <View>
            <View>
                <Text style={{ fontSize: 20, color: 'blue', paddingTop: 20, paddingLeft: 20 }}>Tiện ích</Text>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                {/* <Text>Tiện ích</Text> */}
                <View style={{ alignItems: 'center', justifyContent: 'center', backgroundColor: 'white', padding: 20, width: WIDTH / 4 - 10 }}>
                    <TouchableOpacity
                        onPress={() => moveVocabulary()}
                    >
                        <SimpleLineIcons name={'notebook'} size={35} style={{ color: '#a6a6a6', }} />
                    </TouchableOpacity>
                    <Text>Sổ tay</Text>
                </View>

                <View style={{ alignItems: 'center', justifyContent: 'center', backgroundColor: 'white', padding: 10, width: WIDTH / 4 - 10 }}>
                    <TouchableOpacity
                        onPress={() => navigation.navigate("AddCalendar", { navigation: navigation })}
                    >
                        <Icon name={'ios-notifications-outline'} size={35} style={{ color: '#a6a6a6', }} />
                    </TouchableOpacity>
                    <Text>Nhắc nhở</Text>
                </View>

                <View style={{ alignItems: 'center', justifyContent: 'center', backgroundColor: 'white', padding: 10, width: WIDTH / 4 - 10 }}>
                    <TouchableOpacity
                        onPress={() => moveCalendar()}
                    >
                        <Icons name={'schedule'} size={35} style={{ color: '#a6a6a6', }} />
                    </TouchableOpacity>
                    <Text>Lịch trình</Text>
                </View>

                <View style={{ alignItems: 'center', justifyContent: 'center', backgroundColor: 'white', padding: 10, width: WIDTH / 4 - 10 }}>
                    <TouchableOpacity
                    >
                        <Entypo name={'share-alternative'} size={35} style={{ color: '#a6a6a6', }} />
                    </TouchableOpacity>
                    <Text>Chia sẻ</Text>
                </View>
            </View>
            {/* <TouchableOpacity onPress={() => navigation.navigate("AddCalendar", { navigation: navigation })}>
                <Text> Nhắc nhở luyện tập</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => moveCalendar()}>
                <Text> Xem schedule</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => moveVocabulary()}>
                <Text> Tạo sổ tay</Text>
            </TouchableOpacity> */}
            <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                <View style={{ alignItems: 'center', justifyContent: 'center', backgroundColor: 'white', padding: 10, width: WIDTH / 4 - 10 }}>
                    <TouchableOpacity
                    >
                        <Entypos name={'user-cog'} size={35} style={{ color: '#a6a6a6', }} />
                    </TouchableOpacity>
                    <Text>Thông tin tài khoản</Text>
                </View>

                <View style={{ alignItems: 'center', justifyContent: 'center', backgroundColor: 'white', padding: 10, width: WIDTH / 4 - 10 }}>
                    <TouchableOpacity
                    >
                        <MaterialCommunityIcons name={'google-translate'} size={35} style={{ color: '#a6a6a6', }} />
                    </TouchableOpacity>
                    <Text>Dịch</Text>
                </View>
            </View>
        </View>
    )
}
export default SettingScreen;