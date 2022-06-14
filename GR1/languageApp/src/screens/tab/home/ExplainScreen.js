import React, { useState, useEffect } from 'react'
import { LogBox, Text, View, SafeAreaView, Dimensions, Image, TouchableOpacity, StyleSheet, Button, FlatList, ScrollView, TextInput, Platform, Alert } from 'react-native'
import CustomHeader from '../../CustomHeader';
import Icon from 'react-native-vector-icons/AntDesign';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import Iconss from 'react-native-vector-icons/Feather';
import Entypo from 'react-native-vector-icons/Entypo';
import Iconsss from 'react-native-vector-icons/Ionicons';

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
import { element } from 'prop-types';

LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs();//Ignore all log notifications
export default ExplainScreen = ({ navigation, route }) => {
    const dispatch = useDispatch();
    const commentList = useSelector(state => state.commentReducer.commentList);
    const users = useSelector(state => state.userReducer.user);
    const [comment, setComment] = useState("");
    var last = new Date(); // ngày hiện tại
    const [dataComment, setdataComment] = useState([]);
    const [isVisible, setisVisible] = useState(false);
    const { word } = route.params;
    const isManage = useSelector(state => state.manageReducer.isManage);
    const [isVisibleAction, setisVisibleAction] = useState(false);

    // useEffect(() => {
    //     console.log('word truyen sang la', word);
    //     socket.on("SEVER-SEND-LIKE", (msg) => {
    //         likeactioncallagain(msg.comment_id, msg.islike, msg.isdislike);
    //     });
    //     socket.on("SEVER-SEND-DISLIKE", (msg) => {
    //         dislikeactioncallagain(msg.comment_id, msg.islike, msg.isdislike);
    //     });
    //     socket.on("SEVER-SEND-NEWCOMMENT", (msg) => {
    //         sendCommentResend(msg.comment, msg.username);
    //     });
    //     // }
    // }, [dataComment.length !== 0]);
    useEffect(() => {
        setdataComment(commentList.filter(e => e.review === 1).map(e => ({ ...e, checked: false })));
    }, [commentList]);

    const likeaction = (comment_id,userlist ) => {
        var index = 0;
        var checkdislike = false;
        const list = [];

        const idx = dataComment.map(object => object._id).indexOf(comment_id);
        if(idx >= 0) {
            if(dataComment[idx].islike === true) {
                index =1;
                dataComment[idx].islike = false;
                dataComment[idx].like = dataComment[idx].like -1;
                setdataComment([...dataComment]);
            }
            else {
                if(dataComment[idx].isdislike === true) {
                    dataComment[idx].isdislike = false;
                    checkdislike = true;
                    dataComment[idx].dislike = dataComment[idx].dislike -1;
                    dataComment[idx].like = dataComment[idx].like+1;
                    dataComment[idx].islike = true;
                    setdataComment([...dataComment]);
                }
                else {
                    dataComment[idx].islike = true;
                    dataComment[idx].like = dataComment[idx].like + 1;
                    setdataComment([...dataComment]);
                }
            }
        }
        // var i;
        // for (i = 0; i < dataComment.length; i++) { // day nay lay comment tu redũ uk ncai d^^at nay uco k hiểu r
        //     if (dataComment[i]._id === comment_id) {
        //         if (dataComment[i].islike === true) {
        //             index = 1;
        //             dataComment[i].islike = false;
        //             // commentList[i].like = commentList[i].like - 1;
        //             setdataComment([...dataComment]);
        //             break;
        //         }
        //         else {
        //             if (dataComment[i].isdislike === true) {
        //                 console.log('isdislike laf true, chuyen nos sang false');
        //                 dataComment[i].isdislike = false;
        //                 checkdislike = true;
        //                 // commentList[i].dislike = commentList[i].dislike - 1;
        //                 dataComment[i].islike = true;
        //                 // commentList[i].like = commentList[i].like + 1;
        //                 setdataComment([...dataComment]);
        //                 break;
        //             }
        //             else {
        //                 console.log('isdislike laf false');
        //                 dataComment[i].islike = true;
        //                 // commentList[i].like = commentList[i].like + 1;
        //                 setdataComment([...dataComment]);
        //                 break;
        //             }



        //         }

        //     }
        // }
       
        if (userlist.username === users.username) {
            index = 1;
        }

        if (index === 0) {
            list.push(comment_id);
            axios.post('http://192.168.1.72:3002/language/createLikeComment', {
            "comment_id": comment_id,
            "user_id_like": users._id,
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
            axios.post('http://192.168.1.72:3002/language/sendNotiToDeviceAsset', {
                "list_user": list,
                "action": "like",
                "noti": "comment",
                "type": "grammar",
                "username": users.username
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

        

    }


    const dislikeaction = (comment_id, user_id, username_friends) => {
        console.log('vao dislike action');
        var checklike = false;
        const list = [];
        const idx = dataComment.map(object => object._id).indexOf(comment_id);
        if(idx >= 0) {
            if(dataComment[idx].isdislike === true) {
                index =1;
                dataComment[idx].isdislike = false;
                dataComment[idx].dislike = dataComment[idx].dislike -1;
                setdataComment([...dataComment]);
            }
            else {
                if(dataComment[idx].islike === true) {
                    dataComment[idx].islike = false;
                    checkdislike = true;
                    dataComment[idx].like = dataComment[idx].like -1;
                    dataComment[idx].dislike = dataComment[idx].dislike+1;
                    dataComment[idx].isdislike = true;
                    setdataComment([...dataComment]);
                }
                else {
                    dataComment[idx].isdislike = true;
                    dataComment[idx].dislike = dataComment[idx].dislike + 1;
                    setdataComment([...dataComment]);
                }
            }
        }

        if (userlist.username === users.username) {
            index = 1;
        }

        if (index === 0) {
            list.push(comment_id);
            axios.post('http://192.168.1.72:3002/language/createDisLikeComment', {
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
    
            axios.post('http://192.168.1.72:3002/language/sendNotiToDeviceAsset', {
                "list_user": list,
                "action": "dislike",
                "noti": "comment",
                "type": "grammar",
                "username": users.username
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

       
    }

    const sendComment = (grammar_id) => {
        if (comment.length === 0 || comment === '') {
            return;
        }
        // var date = new Date;
        // const kaka = {grammar_id: grammar_id, user_id: users._id, content: comment, time: date, islike: 0, isdislike: 0, like: 0, dislike: 0, review: "not approved" };
        // setdataComment(dataComment.concat(kaka));
        // setComment('');
        axios.post('http://192.168.1.72:3002/language/createComment', {
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
                console.log('gia tri nhan duowcj la', response.data.comment);   
                const newComment = response.data.comment;
                const kaka = { _id: newComment._id, grammar_id: newComment.grammar_id, user_id: newComment.user_id, content: newComment.content, time: newComment.time, islike: 0, isdislike: 0, like: 0, dislike: 0, review: newComment.review, username: users.username };
            setdataComment([...dataComment.concat(kaka)]);
            })
            setComment('');
        // console.log('DATA DAY NHE', dataComment);
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

  
    const renderComment = ({ item, index }) => {
        var dt = new Date(item.time);
        return (
            <View key={index}>
                <View style={{ zIndex: 0, marginTop: 10, borderBottomWidth: 1, borderBottomColor: '#d9d9d9', backgroundColor: item.review === 2 ? '#f2f2f2' : 'white', padding: item.review === 2 ? 5 : 0 }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text>{item.content}</Text>
                        {
                            users.role === 1 || users.role === 2 ?
                                // bấm vào đây 
                                <TouchableOpacity style={{}} onPress={() => deletecomment(item)
                                }>
                                    <Entypo name={'dots-three-vertical'} size={20} />
                                </TouchableOpacity>


                                : null
                        }
                    </View>
                    {/* <View style={{flexDirection: 'row', backgroundColor: '#f2f2f2', padidng: 10, justifyContent: 'flex-end', }}>
                    <Text>xoa binh luan</Text>
                </View> */}
                    {item.review === 1 ?
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingTop: 15, paddingBottom: 8 }}>

                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                    {/* <Text>like</Text> */}
                                    <AntDesign
                                        onPress={() => likeaction(item._id, item.user_id)}
                                        name="like1"
                                        color={item.islike ? 'blue' : '#d9d9d9'}
                                        size={17}
                                    />
                                    <Text style={{ marginLeft: 5, marginTop: -2 }}>{item.like}</Text>
                                </View>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginLeft: 15 }}>
                                    <AntDesign
                                        onPress={() => dislikeaction(item._id, item.user_id)}
                                        name="dislike1"
                                        color={item.isdislike ? 'blue' : '#d9d9d9'}
                                        size={17}
                                    />
                                    <Text style={{ marginLeft: 5, marginTop: -2 }}>{item.dislike} </Text>
                                </View>

                            </View>


                            <View style={{ marginLeft: 20 }}>
                                {/* <Text>name</Text> */}
                                <Text>{item.user_id.username === undefined ? item.username : item.user_id.username} ({time(dt)})</Text>
                            </View>
                        </View>
                        :
                        <View>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', borderBottomWidth: 1, borderBottomColor: '#e6e6e6' }}>
                                <View style={{ flexDirection: 'row', paddingTop: 15, paddingBottom: 8 }}>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>
                                        {/* <Text>like</Text> */}
                                        <AntDesign
                                            // onPress={() => likeaction(item._id, users._id, item.user_id.username)}
                                            name="like1"
                                            color={item.islike ? 'blue' : '#d9d9d9'}
                                            size={17}
                                        />
                                        <Text style={{ marginLeft: 5, marginTop: -2 }}>{item.like}</Text>
                                    </View>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginLeft: 15 }}>
                                        <AntDesign
                                            // onPress={() => dislikeaction(item._id, users._id, item.user_id.username)}
                                            name="dislike1"
                                            color={item.isdislike ? 'blue' : '#d9d9d9'}
                                            size={17}
                                        />
                                        <Text style={{ marginLeft: 5, marginTop: -2 }}>{item.dislike} </Text>
                                    </View>
                                </View>
                                <View style={{ marginLeft: 20, flexDirection: 'row', justifyContent: 'flex-end', paddingTop: 15 }}>
                                    {/* <Text>name</Text> */}
                                    <Text>{item.user_id.username === undefined ? item.username : item.user_id.username} ({time(dt)})</Text>
                                </View>

                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingBottom: 8 }}>
                                <View style={{ fontSize: 16, width: '50%' }}>
                                    <Text>Cảm ơn bạn đã kiên nhẫn</Text>
                                    <Text>Quản trị viên xét duyệt xong thì bài viết của bạn mới hiển thị trong nhóm</Text>
                                </View>
                                <View style={{ width: '50%', alignItems: 'center', justifyContent: 'center' }}>
                                    <TouchableOpacity style={{ backgroundColor: '#e6f0ff', height: 30, minWidth: 60, paddingTop: 5, paddingBottom: 5, paddingLeft: 5, paddingRight: 5, justifyContent: 'center', alignContent: 'center' }}>
                                        <Text style={{ color: '#3333ff' }}>Quản lý bài viết</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>

                    }
                </View>
                {
                    // hien model day
                    item.checked === true ?
                        <TouchableOpacity
                            onPress={() => refuseComment(item)}
                            style={{ position: 'absolute', zIndex: 1, alignItems: 'center', justifyContent: 'center', padding: 10, width: '40%', top: 10, right: 15, backgroundColor: '#f2f2f2' }}>
                            <Text>Delete</Text>
                        </TouchableOpacity>
                        : null
                }
            </View>
            // <View style={{ marginTop: 10, borderBottomWidth: 1, borderBottomColor: '#d9d9d9' }}>
            //     <Text>{item.content}</Text>
            //     <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingTop: 15, paddingBottom: 8 }}>
            //         <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            //             <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            //                 {/* <Text>like</Text> */}
            //                 <Icon
            //                     onPress={() => likeaction(item._id, users._id, item.user_id.username)}
            //                     name="like1"
            //                     color={item.islike ? 'blue' : '#d9d9d9'}
            //                     size={17}
            //                 />
            //                 <Text style={{ marginLeft: 5, marginTop: -2 }}>{item.like}</Text>
            //             </View>
            //             <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginLeft: 15 }}>
            //                 <Icon
            //                     onPress={() => dislikeaction(item._id, users._id, item.user_id.username)}
            //                     name="dislike1"
            //                     color={item.isdislike ? 'blue' : '#d9d9d9'}
            //                     size={17}
            //                 />
            //                 <Text style={{ marginLeft: 5, marginTop: -2 }}>{item.dislike}</Text>
            //             </View>
            //             <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginLeft: 15 }}>
            //                 <Icons
            //                     name="comment"
            //                     color={'#d9d9d9'}
            //                     size={17}
            //                 />
            //                 <Text style={{ marginLeft: 5, marginTop: -2 }}>7</Text>
            //             </View>
            //         </View>
            //         <View style={{ marginLeft: 20 }}>
            //             <Text>{item.user_id.username === undefined ? item.username : item.user_id.username} ({time(dt)})</Text>
            //         </View>
            //     </View>
            // </View>
        )
    }

    const quesSc = () => {
        dispatch(getListQuestionRequest(word._id, navigation));
    }
    const refuseComment = (item) => {
        const list = [];
        const objIndex = dataComment.findIndex(e => e._id === item._id);
        if (objIndex !== -1) {
            list.push(item._id);
            dataComment[objIndex].review = 0;
            setdataComment([...dataComment]);
            axios.post('http://192.168.1.72:3002/language/refuseCommentGrammar', {
                "list": list,
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
        else {
            return;
        }
    }
    const deletecomment = (item) => {
        const objindex = dataComment.findIndex(e => e._id === item._id);
        console.log(objindex);
        if (dataComment[objindex].checked === false) {
            dataComment[objindex].checked = true;
        }
        else {
            dataComment[objindex].checked = false;
        }
        setdataComment([...dataComment]);
    }
    return (
        <View style={{ flexGrow: 1, flex: 1 }}>
            <CustomHeader title={word.grammar.split("=>")[0]} navigation={navigation} />
            <ScrollView>
                <View style={{ marginTop: 20, marginLeft: 15 }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                        <View />
                        <View>
                            <Text>Lưu cấu trúc ngữ pháp này</Text>
                        </View>
                        <Iconsss
                            // onPress={() => sendComment(word._id)}
                            style={{ marginRight: 10, marginLeft: 10 }}
                            name="add-circle-outline"
                            // color={'#d9d9d9'}
                            size={25}
                        />

                    </View>

                    <View style={{ width: '70%', justifyContent: 'center', borderWidth: 1, borderColor: '#d9d9d9', padding: 10, marginLeft: 40 }}>
                        <Text style={{ fontSize: 20, color: 'red', textAlign: 'center', justifyContent: 'center' }}>{word.grammar.split("=>")[0]}</Text>
                        <Text style={{ fontSize: 20, color: 'blue', textAlign: 'center', justifyContent: 'center' }}>{word.grammar.split("=>")[1]}</Text>
                    </View>

                    <View>
                        {word.uses.map((element, key) => {
                            return (
                                <View key={key}>
                                    <View style={{ marginTop: 10, marginBottom: 10 }}>
                                        <Text style={{ color: 'blue' }}>Cấu trúc: </Text>
                                        <Text style={{ marginLeft: 10 }}>{element.synopsis.replace(/<br>/g, "\n").trim()} </Text>
                                    </View>
                                    <View style={{ marginTop: 10, marginBottom: 10 }}>
                                        <Text style={{ color: 'blue' }}>Ý nghĩa: </Text>
                                        <Text style={{ marginLeft: 10 }}>{element.explain.trim().replace(/<br>/g, "\n")} </Text>
                                    </View>

                                    {element.note.trim() >= 2 ?
                                        <View style={{ marginTop: 10, marginBottom: 10 }}>
                                            <Text style={{ color: 'blue' }}>Chú ý: </Text>
                                            <Text style={{ marginLeft: 10 }}>{element.note} </Text>
                                        </View> : null
                                    }

                                    <View style={{ marginTop: 10, marginBottom: 10 }}>
                                        <Text style={{ color: 'blue', marginBottom: 10 }}>Ví dụ: </Text>
                                        {
                                            element.examples.map((item, key1) => {
                                                return (
                                                    <View key={key1}>
                                                        <View>
                                                            <Text>{key1 + 1}. {item.content.trim()}</Text>
                                                            <Text>{item.mean.trim()}</Text>
                                                        </View>
                                                    </View>
                                                )
                                            })
                                        }
                                    </View>
                                </View>
                            )
                        })}
                    </View>


                </View>
                <View style={{ padding: 10, borderTopWidth: 1, borderTopColor: '#d9d9d9' }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
                        <Text>Có {dataComment.length} góp ý</Text>
                        {
                            dataComment.length > 3 ?
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

                        <View style={{}}>
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
    },
    textTitle: {
        fontSize: 18,
        color: 'blue',
    },
    textt: {
        marginLeft: 10, marginTop: 5
    }
})