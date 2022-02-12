import React, { useState, useEffect } from 'react'
import { LogBox, Text, View, SafeAreaView, Dimensions, Image, TouchableOpacity, StyleSheet, Button, FlatList, ScrollView, TextInput, Platform, Alert } from 'react-native'
import CustomHeader from '../../CustomHeader';
import Icon from 'react-native-vector-icons/AntDesign';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import Iconss from 'react-native-vector-icons/Feather';
import Entypo from 'react-native-vector-icons/Entypo';
import Furi from 'react-native-furi';
import { useSelector, useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getListCommentRequest, getListCommentSuccess } from '../../../redux/actions/comment.action';
import io from 'socket.io-client';
import axios from 'axios';
import { socket } from '../../../../App';
const WIDTH = Dimensions.get('window').width;
import Modal from 'react-native-modal'; // 2.4.0
import { getListNotifiRequest } from '../../../redux/actions/notifi.action';
import { getListQuestionRequest } from '../../../redux/actions/grammarquestion.action';

LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs();//Ignore all log notifications
export default ExplainScreen = ({ navigation, route }) => {
    const dispatch = useDispatch();
    const commentList = useSelector(state => state.commentReducer.commentList);
    const users = useSelector(state => state.userReducer.user);
    const [dataUser, setDataUser] = useState({});
    const [comment, setComment] = useState("");
    var last = new Date(); // ngày hiện tại
    const [dataComment, setdataComment] = useState([]);
    const [isVisible, setisVisible] = useState(false);
    const { word } = route.params;


    // useEffect(() => {
    // takeComment(word._id);
    // takeCount();
    // });
    // const [filters, setFilters] = useState({
    //     page: 1,
    //     limit: 3
    // });
    // const [totalPages, settotalPages] = useState(0);
    // const totalPages = Math.ceil(totalRows/filters.limit);

    // const paramString = queryString.stringify(filters);
    // const getTokenApi = `${API_ENDPOINT}/getComment?${paramString}`;

    // module.exports.getTokenApi = getTokenApi;
    useEffect(() => {
        console.log('word truyen sang la', word);
        socket.on("SEVER-SEND-LIKE", (msg) => {
            likeactioncallagain(msg.comment_id, msg.islike, msg.isdislike);
        });
        socket.on("SEVER-SEND-DISLIKE", (msg) => {
            dislikeactioncallagain(msg.comment_id, msg.islike, msg.isdislike);
        });
        socket.on("SEVER-SEND-NEWCOMMENT", (msg) => {
            sendCommentResend(msg.comment, msg.username);
        });
        // }
    }, [dataComment.length !== 0]);
    useEffect(() => {
        // AsyncStorage.getItem('@user')
        //     .then((data) => {
        //         setDataUser(JSON.parse(data));
        //         dispatch(getListCommentRequest(word._id, JSON.parse(data)._id));
        //     });
        // setDataUser(users);
        dispatch(getListCommentRequest(word._id, users._id));
        // console.log('goi lại dispatch');

    }, []);

    useEffect(() => {
        setdataComment(commentList);
    }, [commentList]);

    const likeaction = (comment_id, user_id, username_friends) => {
        // const _isMounted = useRef(true);
        // useEffect(() => {
        //     return () => { // ComponentWillUnmount in Class Component
        //         _isMounted.current = false;
        //     }
        // }, []);
        var index = 0;
        var checkdislike = false;
        var i;
        for (i = 0; i < dataComment.length; i++) { // day nay lay comment tu redũ uk ncai d^^at nay uco k hiểu r
            if (dataComment[i]._id === comment_id) {
                if (dataComment[i].islike === true) {
                    index = 1;
                    dataComment[i].islike = false;
                    // commentList[i].like = commentList[i].like - 1;
                    setdataComment([...dataComment]);
                    break;
                }
                else {
                    if (dataComment[i].isdislike === true) {
                        console.log('isdislike laf true, chuyen nos sang false');
                        dataComment[i].isdislike = false;
                        checkdislike = true;
                        // commentList[i].dislike = commentList[i].dislike - 1;
                        dataComment[i].islike = true;
                        // commentList[i].like = commentList[i].like + 1;
                        setdataComment([...dataComment]);
                        break;
                    }
                    else {
                        console.log('isdislike laf false');
                        dataComment[i].islike = true;
                        // commentList[i].like = commentList[i].like + 1;
                        setdataComment([...dataComment]);
                        break;
                    }



                }

            }
        }
        if (username_friends === users.username) {
            index = 1;
        }

        if (index === 0) {
            axios.post('http://192.168.1.7:3002/language/sendNotiToDevice', {
                "username": users.username,
                "username_friends": username_friends,
                "action": "like",
                "comment_id": comment_id,
                "word": word,
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
                })
        }
        // else {
        //     if (username_friends !== users.username) {
        //         axios.post('http://192.168.1.7:3002/language/sendNotiToDevice', {
        //             "username": users.username,
        //             "username_friends": username_friends,
        //             "action": "like",
        //             "comment_id": comment_id,
        //             "screen": "Explainscreen",
        //             "word": word,
        //         }, {
        //             headers: {
        //                 "Accept": "application/json",
        //                 "Content-Type": "application/json"
        //             }
        //         })
        //             .then((response) => {
        //                 console.log(response.data);
        //             })
        //             .catch(function (error) {
        //                 throw error;
        //             })
        //     }
        // }

        axios.post('http://192.168.1.7:3002/language/createLikeComment', {
            "comment_id": comment_id,
            "user_id_like": user_id,
            "checkStatus": checkdislike
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
            })

    }

    const likeactioncallagain = (comment_id, islike, isdislike) => {
        console.log('ben LIKE ACTION islike va isdislike lan luotj la ', islike, isdislike);
        var i;
        for (i = 0; i < commentList.length; i++) {
            // if (commentList[i]._id === comment_id && islike === true) {
            //     commentList[i].like = commentList[i].like - 1;
            //     setdataComment([...commentList]);
            //     break;
            // }
            // else if (commentList[i]._id === comment_id && islike === false) {
            //     commentList[i].like = commentList[i].like + 1;
            //     setdataComment([...commentList]);
            //     break;
            // }
            if (commentList[i]._id === comment_id) {
                if (islike === true) {
                    console.log('vafo islike = true');
                    commentList[i].like = commentList[i].like - 1;
                    setdataComment([...commentList]);
                    break;
                }
                else if (islike === false && isdislike === true) {
                    console.log('vafo islike = false va isdislike = true');
                    commentList[i].like = commentList[i].like + 1;
                    commentList[i].dislike = commentList[i].dislike - 1;
                    setdataComment([...commentList]);
                    break;
                }
                else if (islike === false && isdislike === false) {
                    console.log('vafo islike = false vaf isdislike bang false');
                    commentList[i].like = commentList[i].like + 1;
                    setdataComment([...commentList]);
                    break;
                }
            }

        }

    }

    const dislikeaction = (comment_id, user_id, username_friends) => {
        console.log('vao dislike action');
        var checklike = false;
        var index = 0;
        var i;
        for (i = 0; i < commentList.length; i++) {
            if (commentList[i]._id === comment_id) {
                if (commentList[i].isdislike === true) {
                    index = 1;
                    commentList[i].isdislike = false;
                    // commentList[i].dislike = commentList[i].dislike - 1;
                    setdataComment([...commentList]);
                    break;
                }
                else {
                    if (commentList[i].islike === true) {
                        commentList[i].islike = false;
                        commentList[i].isdislike = true;
                        checklike = true;
                        // commentList[i].dislike = commentList[i].dislike + 1;
                        // commentList[i].like = commentList[i].like - 1;
                        setdataComment([...commentList]);
                        break;
                    }
                    else {
                        commentList[i].isdislike = true;
                        // commentList[i].dislike = commentList[i].dislike + 1;
                        setdataComment([...commentList]);
                        break;
                    }


                }

            }
        }

        if (username_friends === users.username) {
            index = 1;
        }

        if (index === 0) {
            axios.post('http://192.168.1.7:3002/language/sendNotiToDevice', {
                "username": users.username,
                "username_friends": username_friends,
                "action": "dislike",
                "comment_id": comment_id,
                "word": word,
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
                })
        }

        axios.post('http://192.168.1.7:3002/language/createDisLikeComment', {
            "comment_id": comment_id,
            "user_id_dislike": user_id,
            "checkStatus": checklike,
        }, {
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            }
        })
            .then((response) => {
                console.log(response.data);
            })

    }
    const dislikeactioncallagain = (comment_id, islike, isdislike) => {
        var i;
        console.log('ben DISLIKE ACTION islike va isdislike lan luotj la ', islike, isdislike);
        for (i = 0; i < commentList.length; i++) {
            // if (commentList[i]._id === comment_id && isdislike === true) {
            //     commentList[i].dislike = commentList[i].dislike - 1;
            //     setdataComment([...commentList]);
            //     break;
            // }
            // else if (commentList[i]._id === comment_id && isdislike === false) {
            //     commentList[i].dislike = commentList[i].dislike + 1;
            //     setdataComment([...commentList]);
            //     break;
            // }
            if (commentList[i]._id === comment_id) {
                if (isdislike === true) {
                    console.log('vafo isdislike = true');
                    commentList[i].dislike = commentList[i].dislike - 1;
                    setdataComment([...commentList]);
                    break;
                }
                else if (isdislike === false && islike === true) {
                    console.log('vafo isdislike = false va islike = true');
                    commentList[i].dislike = commentList[i].dislike + 1;
                    commentList[i].like = commentList[i].like - 1;
                    setdataComment([...commentList]);
                    break;
                }
                else if (islike === false && isdislike === false) {
                    console.log('vafo isdislike = false va islike = false');
                    commentList[i].dislike = commentList[i].dislike + 1;
                    setdataComment([...commentList]);
                    break;
                }
            }
        }
    }
    const sendCommentResend = (newComment, username) => {
        const kaka = { _id: newComment._id, grammar_id: newComment.grammar_id, user_id: newComment.user_id, content: newComment.content, time: newComment.time, islike: 0, isdislike: 0, like: 0, dislike: 0, review: newComment.review, username: username };
        setdataComment(dataComment.concat(kaka)); // cai kakaừ na_id dudau k đéo y lam gi co 
    }
    const sendComment = (grammar_id) => {
        if (comment.length === 0 || comment === '') {
            return;
        }
        // var date = new Date;
        // const kaka = {grammar_id: grammar_id, user_id: users._id, content: comment, time: date, islike: 0, isdislike: 0, like: 0, dislike: 0, review: "not approved" };
        // setdataComment(dataComment.concat(kaka));
        setComment('');
        axios.post('http://192.168.1.7:3002/language/createComment', {
            "grammar_id": grammar_id,
            "user_id": users._id,
            "content": comment
        }, {
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            }
        })
            .then((response) => {
                console.log(response.data);
            })

        // console.log('DATA DAY NHE', dataComment);
    }
    const renderItem = ({ item }) => {
        return (
            <View style={{ flexDirection: 'row' }}>
                <Text>😄</Text>
                <Text style={{ color: 'red', fontWeight: 'bold', marginLeft: 10 }}>[{item}]</Text>
                <Text style={{ marginLeft: 10, color: 'blue', fontWeight: 'bold' }}>+ {word.grammar}</Text>
            </View>
        )
    }
    const renderMean = ({ item }) => {
        return (
            <View style={{ flexDirection: 'row' }}>
                <Text style={{}}>・</Text>
                <Text style={{ fontWeight: 'bold', marginLeft: 5 }}>{item}</Text>
            </View>
        )
    }

    const time = (dt) => {
        const result = (last.getTime() - dt.getTime()) / 1000;
        const minutes = (result - result % 60) / 60;
        const hours = (minutes - minutes % 60) / 60;
        const day = (result - result % 86400) / 86400;
        const month = (day - day % 30) / 30;
        const year = (month - month % 12) / 12;
        if (year !== 0) {
            return year + ' ' + 'nam';
        }
        else if (month !== 0) {
            return month + ' ' + 'thang';
        }
        else if (day !== 0) {
            return day + ' ' + 'ngay';
        }
        else if (hours !== 0) {
            return hours + ' ' + 'gio';
        }
        else if (minutes !== 0) {
            return minutes + ' ' + 'phut';
        }
        else {
            return 'vua xong';
        }
    }

    const renderExample = ({ item, index }) => {
        // setdataComment(commentList);
        return (
            <View>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={{ marginRight: 10, marginTop: 8 }}>{index + 1}/</Text>
                    <View>

                        <Furi
                            style={{}}
                            value={item.jp}
                            valueStyle={{
                                color: 'black',
                                borderColor: 'black',
                                borderWidth: 0,
                            }}
                            furiStyle={{
                                borderColor: 'red',
                                borderWidth: 0,
                            }}
                            showFuri={true}
                            size={13}
                        />
                    </View>
                </View>
                <Text>{item.vn}</Text>
            </View>
        )
    }
    const renderComment = ({ item, index }) => {
        var dt = new Date(item.time);
        return (
            <View style={{ marginTop: 10, borderBottomWidth: 1, borderBottomColor: '#d9d9d9' }}>
                <Text>{item.content}</Text>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingTop: 15, paddingBottom: 8 }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            {/* <Text>like</Text> */}
                            <Icon
                                onPress={() => likeaction(item._id, users._id, item.user_id.username)}
                                name="like1"
                                color={item.islike ? 'blue' : '#d9d9d9'}
                                size={17}
                            />
                            <Text style={{ marginLeft: 5, marginTop: -2 }}>{item.like}</Text>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginLeft: 15 }}>
                            <Icon
                                onPress={() => dislikeaction(item._id, users._id, item.user_id.username)}
                                name="dislike1"
                                color={item.isdislike ? 'blue' : '#d9d9d9'}
                                size={17}
                            />
                            <Text style={{ marginLeft: 5, marginTop: -2 }}>{item.dislike}</Text>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginLeft: 15 }}>
                            <Icons
                                name="comment"
                                color={'#d9d9d9'}
                                size={17}
                            />
                            <Text style={{ marginLeft: 5, marginTop: -2 }}>7</Text>
                        </View>
                    </View>
                    <View style={{ marginLeft: 20 }}>
                        <Text>{item.user_id.username === undefined ? item.username : item.user_id.username} ({time(dt)})</Text>
                    </View>
                </View>
            </View>
        )
    }

    const quesSc = () => {
        dispatch(getListQuestionRequest(word._id, navigation));
    }
    return (
        <View style={{ flexGrow: 1, flex: 1 }}>
            <CustomHeader title={word.grammar} navigation={navigation} />
            <ScrollView>
                <View style={{ marginTop: 20, marginLeft: 15 }}>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={{ color: '#009387', fontWeight: 'bold' }}> {word.grammar} :</Text>
                        <Text style={{ flexShrink: 1, marginLeft: 10, paddingRight: 10, color: 'red', fontWeight: 'bold' }}>{word.translation}</Text>
                    </View>
                    <View style={{ marginTop: 20 }}>
                        <Text style={{ fontWeight: 'bold', color: 'blue', fontSize: 18, textDecorationLine: 'underline' }}>Cấu trúc: </Text>
                        <FlatList
                            style={{ marginTop: 15, marginLeft: 20 }}
                            data={word.structure}
                            keyExtractor={item => item.id}
                            renderItem={renderItem}
                        />
                    </View>
                    <View style={{ marginTop: 20 }}>
                        <Text style={{ fontWeight: 'bold', color: 'blue', fontSize: 18, textDecorationLine: 'underline' }}>Ý nghĩa: </Text>
                        <FlatList
                            style={{ marginTop: 15, marginLeft: 20 }}
                            data={word.mean}
                            keyExtractor={item => item.id}
                            renderItem={renderMean}
                        />
                    </View>
                    {typeof word.indication === 'undefined' || word.indication.length === 0 ? null :
                        <View style={{ marginTop: 20 }}>
                            <Text style={{ fontWeight: 'bold', color: 'blue', fontSize: 18, textDecorationLine: 'underline' }}>Dấu hiện nhận biết: </Text>
                            <FlatList
                                style={{ marginTop: 15, marginLeft: 20 }}
                                data={word.indication}
                                keyExtractor={item => item.id}
                                renderItem={renderMean}
                            />
                        </View>
                    }
                    <View style={{ marginTop: 20, marginBottom: 10 }}>
                        <Text style={{ fontWeight: 'bold', color: 'blue', fontSize: 18, textDecorationLine: 'underline' }}>Ví dụ: </Text>
                        <FlatList
                            style={{ padding: 5 }}
                            data={word.example}
                            keyExtractor={item => item.id}
                            renderItem={renderExample}
                        />
                    </View>
                </View>
                <View style={{ padding: 10, borderTopWidth: 1, borderTopColor: '#d9d9d9' }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
                        <Text>Có {dataComment.length} góp ý</Text>
                        {
                            dataComment.length >  3 ?
                                <TouchableOpacity onPress={() => setisVisible(true)}>
                                    <Text>Xem thêm góp ý</Text>
                                </TouchableOpacity>
                                :
                                null
                        }
                    </View>
                    <View>
                        <FlatList
                            style={{ padding: 5 }}
                            data={dataComment.slice(0, 3)}
                            keyExtractor={item => item.id}
                            renderItem={renderComment}
                        />

                        <View style={{ marginTop: 20 }}>
                            <View>
                                <TextInput
                                    style={{ borderWidth: 1, padding: 5, borderColor: '#d9d9d9', height: 40, zIndex: 0, borderRadius: 5 }}
                                    placeholder={"thêm nghĩa hoặc ví dụ cho từ"}
                                    multiline={true}
                                    numberOfLines={1}
                                    onChangeText={text => setComment(text)}
                                    value={comment}

                                />
                            </View>
                            <Iconss
                                onPress={() => sendComment(word._id)}
                                style={{ position: 'absolute', zIndex: 1, top: 10, right: 10 }}
                                name="send"
                                color={'#d9d9d9'}
                                size={17}
                            />
                        </View>
                    </View>
                </View>

            </ScrollView>
            <View style={styles.container}>
                <Modal
                    isVisible={isVisible}
                    animationInTiming={1000}
                    animationOutTiming={1000}
                    backdropTransitionInTiming={1000}
                    backdropTransitionOutTiming={1000}
                    deviceWidth={WIDTH}
                >
                    <View style={styles.modalContent}>
                        <ScrollView>
                            <FlatList
                                style={{ padding: 5 }}
                                data={dataComment.slice(3, dataComment.length)}
                                keyExtractor={item => item.id}
                                renderItem={renderComment}
                            />
                        </ScrollView>

                        <TouchableOpacity onPress={() => setisVisible(false)}>
                            <View style={styles.button}>
                                <Text>Close</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </Modal>
            </View>
            <TouchableOpacity
                style={{ borderWidth: 1, width: 50, borderRadius: 30, backgroundColor: '#009387', borderColor: '#009387', bottom: 60, right: 20, position: 'absolute', zIndex: 1 }}
                onPress={() => quesSc()}>
                <Entypo name={'triangle-right'} size={50} style={{ color: 'white' }} />
            </TouchableOpacity>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        width: WIDTH,
        flex: 1,
    },
    button: {
        backgroundColor: 'lightblue',
        padding: 12,
        margin: 16,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
        borderColor: 'rgba(0, 0, 0, 0.1)',
    },
    modalContent: {
        backgroundColor: 'white',
        borderRadius: 4,
        borderColor: 'rgba(0, 0, 0, 0.1)',
    },
    //   bottomModal: {
    //     justifyContent: 'flex-end',
    //     margin: 0,
    //   },
    text: {
        fontSize: 24,
        marginBottom: 30,
        padding: 40,
    }
})