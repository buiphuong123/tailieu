import React, { useState, useEffect } from 'react'
import { Text, View, SafeAreaView, TouchableOpacity, StyleSheet, Dimensions } from 'react-native'
import CustomHeader from '../../CustomHeader';
import axios from "axios";
import { useSelector, useDispatch } from 'react-redux';
import { getGrammarRequest, getListGrammarLevel } from '../../../redux/actions/grammar.action';
import { getListWordRequest, getListWordLevel } from '../../../redux/actions/word.action';
import messaging from '@react-native-firebase/messaging';
import { getListNotifiRequest } from '../../../redux/actions/notifi.action';
import { RadioButton } from 'react-native-paper';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
const WIDTH = Dimensions.get('window').width;
import AntDesign from 'react-native-vector-icons/AntDesign';
import { RemoteN5, RemoteN4, RemoteN3, RemoteN2 } from '../../../redux/actions/word.action';
import { getListKanjiRequest, getListKanjiLevel } from '../../../redux/actions/kanji.action';
import { getListVocaRequest } from '../../../redux/actions/vocabulary.action';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { getPostRequest } from '../../../redux/actions/post.action';
import { getListUser } from '../../../redux/actions';
import { getAllcommentWord, getAllcommentGrammar, getAllcommentKanji } from '../../../redux/actions/comment.action';
import { getListWordSuccess } from '../../../redux/actions/word.action';
import { getListShareVocaRequest } from '../../../redux/actions/vocabulary.action';
import { getListCommentRequest, getListKanjiCommentRequest, getListWordCommentRequest } from '../../../redux/actions/comment.action';
const HomeScreen = ({ navigation }) => {
    const dispatch = useDispatch();
    const users = useSelector(state => state.userReducer.user);
    const isN5 = useSelector(state => state.wordReducer.isN5);
    const isN4 = useSelector(state => state.wordReducer.isN4);
    const isN3 = useSelector(state => state.wordReducer.isN3);
    const isN2 = useSelector(state => state.wordReducer.isN2);
    const kanjiList = useSelector(state => state.kanjiReducer.kanjiList);
    const wordList = useSelector(state => state.wordReducer.wordList);
    const grammarList = useSelector(state => state.grammarReducer.grammarList);
    const wordlevel = useSelector(state => state.wordReducer.wordlevel);

    // const GrammarRequest = () => dispatch(getGrammarRequest(users._id, navigation));
    // const WordRequest = () => dispatch(getListWordRequest(users._id, navigation));
    useEffect(() => {
        axios.get('http://192.168.1.72:3002/language/getListUser', {
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            }
        })
            .then((response) => {
                dispatch(getListUser(response.data.user));
            })
            .catch(function (error) {
                throw error;
            });
        
        dispatch(getListNotifiRequest(users.username));
        dispatch(getListKanjiRequest(users._id, navigation));
        dispatch(getListWordRequest(users._id));
        dispatch(getListVocaRequest(users._id));
        dispatch(getListShareVocaRequest(users._id));
        dispatch(getGrammarRequest(users._id));
        dispatch(getPostRequest(users._id));

        messaging().onMessage(async remoteMessage => {
            dispatch(getListNotifiRequest(users.username));
            console.log('A new FCM message arrived!', JSON.stringify(remoteMessage));
        });
        messaging().onNotificationOpenedApp(remoteMessage => {
            console.log('onNotificationOpenedApp: ', JSON.stringify(remoteMessage));
        });

        messaging().setBackgroundMessageHandler(async remoteMessage => {
            console.log('Message handled in the background!', remoteMessage);
        });
        toggleSwitchN5 = () => {
            dispatch(RemoteN5('checked'));
            dispatch(RemoteN4('unchecked'));
            dispatch(RemoteN3('unchecked'));
            dispatch(RemoteN2('unchecked'));

        }
        toggleSwitchN4 = () => {
            dispatch(RemoteN5('unchecked'));
            dispatch(RemoteN4('checked'));
            dispatch(RemoteN3('unchecked'));
            dispatch(RemoteN2('unchecked'));

        }
        toggleSwitchN3 = () => {
            dispatch(RemoteN5('unchecked'));
            dispatch(RemoteN4('unchecked'));
            dispatch(RemoteN3('checked'));
            dispatch(RemoteN2('unchecked'));

        }
        toggleSwitchN2 = () => {
            dispatch(RemoteN5('unchecked'));
            dispatch(RemoteN4('unchecked'));
            dispatch(RemoteN3('unchecked'));
            dispatch(RemoteN2('checked'));

        }


        messaging()
            .getInitialNotification()
            .then(remoteMessage => {
                if (remoteMessage) {
                    console.log('data chyten sang ben kia la ', remoteMessage.data);
                    axios.post('http://192.168.1.72:3002/language/editReadNotifi', {
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
                    const dataaa = JSON.parse(remoteMessage.data.routedata);
                    // navigation.navigate("ExplainScreen", { word: JSON.parse(remoteMessage.data.routedata) })
                    if(item.typeNoti === 'word') {
                        dispatch(getListWordCommentRequest(dataaa._id, users._id));
                        navigation.navigate("WordScreenDetail", {navigation: navigation, vocabulary: dataaa });
                    }
                    else if(item.typeNoti === 'kanji') {
                        dispatch(getListKanjiCommentRequest(dataaa._id, users._id));
                        navigation.navigate("ExplainKanji", { navigation: navigation, kanjiword: dataaa });
                    }
                    else if(item.typeNoti === 'grammar'){
                        dispatch(getListCommentRequest(dataaa._id, users._id));
                        navigation.navigate("ExplainScreen", { word: dataaa });
                    }
                    else {
                        navigation.navigate("PostUser", { navigation: navigation, dataOne: dataaa })
                    }
                }
            });
    }, []);

    const grammarRequest = () => {
        var level = 5;
        if (isN5 === 'checked') {
            level = 5;
        }
        else if (isN4 === 'checked') {
            level = 4;
        }
        else if (isN3 === 'checked') {
            level = 3;
        }
        else if (isN2 === 'checked') {
            level = 2;
        }

        console.log('grammar list day ne',grammarList.length, level);
        console.log('level day ne ', level);
        console.log('ben homscree la ',grammarList.filter((e) => e.level === level).length, level) ;
        // dispatch(getListKanjiRequest(users._id, level, navigation));
        dispatch(getListGrammarLevel(grammarList.filter((e) => e.level === level)));
        navigation.navigate("HomeGrammar", {level: level});
    }

    const kanjiRequest = () => {
        var level;
        if (isN5 === 'checked') {
            level = 5;
        }
        else if (isN4 === 'checked') {
            level = 4;
        }
        else if (isN3 === 'checked') {
            level = 3;
        }
        else if (isN2 === 'checked') {
            level = 2;
        }
        // dispatch(getListKanjiRequest(users._id, level, navigation));
        dispatch(getListKanjiLevel(kanjiList.filter((e) => parseInt(e.level, 10) === level)));
        navigation.navigate("KanjiLession");
    }
    const wordRequest = () => {
        var level;
        if (isN5 === 'checked') {
            level = 5;
        }
        else if (isN4 === 'checked') {
            level = 4;
        }
        else if (isN3 === 'checked') {
            level = 3;
        }
        else if (isN2 === 'checked') {
            level = 2;
        }
        // dispatch(getListKanjiRequest(users._id, level, navigation));
        dispatch(getListWordLevel(wordList.filter((e) => parseInt(e.level, 10) === level)));
        navigation.navigate("WordLession");
    }
    // useEffect(() => {
    //     const unsubscribe = navigation.addListener('focus', () => {
    //         let arr3 = wordList.map((item, i) => Object.assign({}, item, wordlevel[i]));
    //         dispatch(getListWordSuccess(arr3));
    //     });

    //     return unsubscribe;
    // }, [navigation]);
    return (
        <View style={{ flex: 1 }}>
            <CustomHeader title="Home" isHome={true} navigation={navigation} />
            <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 10, paddingBottom: 10, }}>
                <View style={styles.checkboxContainer}>
                    <RadioButton
                        status={isN5}
                        onPress={() => toggleSwitchN5()}
                    />
                    <Text style={{ marginTop: 8 }}>N5</Text>
                </View>

                <View style={[styles.checkboxContainer]}>
                    <RadioButton
                        status={isN4}
                        onPress={() => toggleSwitchN4()}
                    />
                    <Text style={{ marginTop: 8 }}>N4</Text>
                </View>

                <View style={styles.checkboxContainer}>
                    <RadioButton
                        status={isN3}
                        onPress={() => toggleSwitchN3()}
                    />
                    <Text style={{ marginTop: 8 }}>N3</Text>
                </View>

                <View style={styles.checkboxContainer}>
                    <RadioButton
                        status={isN2}
                        onPress={() => toggleSwitchN2()}
                    />
                    <Text style={{ marginTop: 8 }}>N2</Text>
                </View>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-around', paddingBottom: 10, backgroundColor: '#f2f2f2', padding: 10, marginLeft: -12 }}>
                <View style={{ alignItems: 'center', justifyContent: 'center', backgroundColor: 'white', padding: 10, width: WIDTH / 4 - 10, marginLeft: 10 }}>
                    <TouchableOpacity
                        // style={{ borderWidth: 1, borderRadius: 40, backgroundColor: '#009387', borderColor: '#009387', bottom: 30, right: 30, position: 'absolute' }}
                        onPress={() => wordRequest()}
                    >
                        <Entypo name={'book'} size={40} style={{ color: '#0000b3' }} />
                    </TouchableOpacity>
                    <Text>T??? v???ng</Text>
                </View>

                <View style={{ alignItems: 'center', justifyContent: 'center', backgroundColor: 'white', padding: 10, width: WIDTH / 4 - 10 }}>
                    <TouchableOpacity
                        // style={{ borderWidth: 1, borderRadius: 40, backgroundColor: '#009387', borderColor: '#009387', bottom: 30, right: 30, position: 'absolute' }}
                        onPress={() => grammarRequest()}
                    >
                        <Feather name={'book-open'} size={40} style={{ color: '#0000b3', }} />
                    </TouchableOpacity>
                    <Text>Ng??? ph??p</Text>
                </View>

                <View style={{ alignItems: 'center', justifyContent: 'center', backgroundColor: 'white', padding: 10, width: WIDTH / 4 - 10 }}>
                    <TouchableOpacity
                        // style={{ borderWidth: 1, borderRadius: 40, backgroundColor: '#009387', borderColor: '#009387', bottom: 30, right: 30, position: 'absolute' }}
                        onPress={() => kanjiRequest()}
                    >
                        <Entypo name={'newsletter'} size={40} style={{ color: '#0000b3' }} />
                    </TouchableOpacity>
                    <Text>Kanji</Text>
                </View>

                <View style={{ alignItems: 'center', justifyContent: 'center', backgroundColor: 'white', padding: 10, width: WIDTH / 4 - 10 }}>
                    <TouchableOpacity
                    // style={{ borderWidth: 1, borderRadius: 40, backgroundColor: '#009387', borderColor: '#009387', bottom: 30, right: 30, position: 'absolute' }}
                    // onPress={() => setisVisible(true)}
                    >
                        <Entypo name={'open-book'} size={40} style={{ color: '#0000b3' }} />
                    </TouchableOpacity>
                    <Text>Quiz</Text>
                </View>
            </View >

            <View style={{ flexDirection: 'row', justifyContent: 'space-around', paddingBottom: 10, backgroundColor: '#f2f2f2', padding: 10, }}>
                <View style={{ alignItems: 'center', justifyContent: 'center', backgroundColor: 'white', padding: 10, width: WIDTH / 3 - 10 }}>
                    <TouchableOpacity
                    // style={{ borderWidth: 1, borderRadius: 40, backgroundColor: '#009387', borderColor: '#009387', bottom: 30, right: 30, position: 'absolute' }}
                    // onPress={() => setisVisible(true)}
                    >
                        <Icons name={'ab-testing'} size={40} style={{ color: '#0000b3' }} />
                    </TouchableOpacity>
                    <Text>Luyen thi JLPT</Text>
                </View>

                <View style={{ alignItems: 'center', justifyContent: 'center', backgroundColor: 'white', padding: 10, width: WIDTH / 3 - 10 }}>
                    <TouchableOpacity
                    // style={{ borderWidth: 1, borderRadius: 40, backgroundColor: '#009387', borderColor: '#009387', bottom: 30, right: 30, position: 'absolute' }}
                    // onPress={() => setisVisible(true)}
                    >
                        <Feather name={'search'} size={40} style={{ color: '#0000b3' }} />
                    </TouchableOpacity>
                    <Text>Tra c???u</Text>
                </View>

                <View style={{ alignItems: 'center', justifyContent: 'center', backgroundColor: 'white', padding: 10, width: WIDTH / 3 - 10 }}>
                    <TouchableOpacity
                    // style={{ borderWidth: 1, borderRadius: 40, backgroundColor: '#009387', borderColor: '#009387', bottom: 30, right: 30, position: 'absolute' }}
                    // onPress={() => setisVisible(true)}
                    >
                        <AntDesign name={'star'} size={40} style={{ color: '#ffff00' }} />
                    </TouchableOpacity>
                    <Text>Y??u th??ch</Text>
                </View>
            </View>

            <View style={{ flexDirection: 'row', justifyContent: 'space-around', paddingBottom: 10, backgroundColor: '#f2f2f2' }}>
                <View style={{ alignItems: 'center', justifyContent: 'center', backgroundColor: 'white', paddingBottom: 10, paddingTop: 10, width: WIDTH / 3 - 10 }}>
                    <TouchableOpacity
                        onPress={() => navigation.navigate("WordLevel", { type: "T??? v???ng" })}
                    >
                        <FontAwesome name={'book'} size={40} style={{ color: '#0000b3' }} />
                    </TouchableOpacity>
                    <Text>T??? v???ng N5~N2</Text>
                </View>

                <View style={{ alignItems: 'center', justifyContent: 'center', backgroundColor: 'white', paddingBottom: 10, paddingTop: 10, width: WIDTH / 3 - 10 }}>
                    <TouchableOpacity
                        onPress={() => navigation.navigate("WordLevel", { type: "Ng??? ph??p" })}
                    >
                        <Ionicons name={'book-outline'} size={40} style={{ color: '#0000b3' }} />
                    </TouchableOpacity>
                    <Text>Ng??? ph??p N5~N2</Text>
                </View>

                <View style={{ alignItems: 'center', justifyContent: 'center', backgroundColor: 'white', paddingBottom: 10, paddingTop: 10, width: WIDTH / 3 - 10 }}>
                    <TouchableOpacity
                        onPress={() => navigation.navigate("WordLevel", { type: "H??n t???" })}
                    >
                        <FontAwesome5 name={'book-reader'} size={40} style={{ color: '#0000b3' }} />
                    </TouchableOpacity>
                    <Text>Kanji N5~N2</Text>
                </View>
            </View>
            {/* <View style={{ backgroundColor: 'gray' }}>
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
            </View> */}

        </View>
    )
}
const styles = StyleSheet.create({

    checkboxContainer: {
        flexDirection: "row",
        paddingTop: 0
    },


});
export default HomeScreen;