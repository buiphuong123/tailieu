import React, { useEffect, useState } from 'react'
import { Text, View, Image, TextInput, StyleSheet, ScrollView, TouchableOpacity, Dimensions, FlatList } from 'react-native'
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import CustomHeader from '../../../CustomHeader';
import Icon from 'react-native-vector-icons/Ionicons';
import IconsAnt from 'react-native-vector-icons/AntDesign';
import Iconss from 'react-native-vector-icons/Feather';
import Entypo from 'react-native-vector-icons/Entypo';
import Furi from 'react-native-furi';
import { useSelector, useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { getListKanjiCommentSuccess } from '../../../../redux/actions/comment.action';
import { socket } from '../../../../App';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Card, Avatar, Button } from 'react-native-paper';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

import Modal from 'react-native-modal'; // 2.4.0
import { cps } from 'redux-saga/effects';
import { element } from 'prop-types';
import SeeMore from 'react-native-see-more-inline';
import { getListVocaSuccess } from '../../../../redux/actions/vocabulary.action';

export default ExplainKanji = ({ navigation, route }) => {
    const [isVisible, setisVisible] = useState(false);
    const { kanjiword } = route.params;
    const commentKanjiList = useSelector(state => state.commentReducer.commentKanjiList);
    // const [dataWordComment, setDataWordComment] = useState([]);
    const [comment, setComment] = useState("");
    const users = useSelector(state => state.userReducer.user);
    var last = new Date(); // ngày hiện tại
    const [dataKanjiComment, setDataKanjiComment] = useState([]);
    const [isVisibleAddWord, setisVisibleAddWord] = useState(false);
    const [isVisibleAddWordVocu, setisVisibleAddWordVocu] = useState(false);
    const vocabulary = useSelector(state => state.vocabularyReducer.vocabularyList);
    const [dataList, setDataList] = useState(vocabulary);
    const colorBack = ["#0000b3", "#005ce6", "#ff9900", "#00b300", "#e67300"];
    const [name, setName] = useState("");
    const isManage = useSelector(state => state.manageReducer.isManage);
    const [isVisibleAction, setisVisibleAction] = useState(false);

    useEffect(() => {
        setDataKanjiComment(commentKanjiList.filter(e => e.review === 1).map(e => ({ ...e, checked: false })));
    }, [commentKanjiList])
    useEffect(() => {
        setDataList(vocabulary);
    }, []);
    const fixDigit = (val) => {
        return (val < 10 ? '0' : '') + val;
    }
    const likeaction = (comment_id, userlist) => {
        var index = 0;
        var checkdislike = false;
        const list = [];
        const idx = dataKanjiComment.map(object => object._id).indexOf(comment_id);
        if (idx >= 0) {
            if (dataKanjiComment[idx].islike === true) {
                index = 1;
                dataKanjiComment[idx].islike = false;
                dataKanjiComment[idx].like = dataKanjiComment[idx].like - 1;
                setDataKanjiComment([...dataKanjiComment]);
            }
            else {
                if (dataKanjiComment[idx].isdislike === true) {
                    dataKanjiComment[idx].isdislike = false;
                    checkdislike = true;
                    dataKanjiComment[idx].dislike = dataKanjiComment[idx].dislike - 1;
                    dataKanjiComment[idx].like = dataKanjiComment[idx].like + 1;
                    dataKanjiComment[idx].islike = true;
                    setDataKanjiComment([...dataKanjiComment]);
                }
                else {
                    dataKanjiComment[idx].islike = true;
                    dataKanjiComment[idx].like = dataKanjiComment[idx].like + 1;
                    setDataKanjiComment([...dataKanjiComment]);
                }
            }
        }
        if (userlist.username === users.username) {
            index = 1;
        }

        if (index === 0) {
            list.push(comment_id);
            axios.post('http://192.168.1.72:3002/language/createLikeKanjiComment', {
            "comment_id": comment_id,
            "user_id_like":  users._id,
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
                "type": "kanji",
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

    const dislikeaction = (comment_id, userlist) => {
        var index = 0;
        var checkdislike = false;
        const list = [];
        const idx = dataKanjiComment.map(object => object._id).indexOf(comment_id);
        if (idx >= 0) {
            if (dataKanjiComment[idx].isdislike === true) {
                index = 1;
                dataKanjiComment[idx].isdislike = false;
                dataKanjiComment[idx].dislike = dataKanjiComment[idx].dislike - 1;
                setDataKanjiComment([...dataKanjiComment]);
            }
            else {
                if (dataKanjiComment[idx].islike === true) {
                    dataKanjiComment[idx].islike = false;
                    checkdislike = true;
                    dataKanjiComment[idx].like = dataKanjiComment[idx].like - 1;
                    dataKanjiComment[idx].dislike = dataKanjiComment[idx].dislike + 1;
                    dataKanjiComment[idx].isdislike = true;
                    setDataKanjiComment([...dataKanjiComment]);
                }
                else {
                    dataKanjiComment[idx].isdislike = true;
                    dataKanjiComment[idx].dislike = dataKanjiComment[idx].dislike + 1;
                    setDataKanjiComment([...dataKanjiComment]);
                }
            }
        }
        if (userlist.username === users.username) {
            index = 1;
        }

        if (index === 0) {
            list.push(comment_id);
            axios.post('http://192.168.1.72:3002/language/createDisLikeKanjiComment', {
            "comment_id": comment_id,
            "user_id_dislike": user_id,
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
                "action": "dislike",
                "noti": "comment",
                "type": "kanji",
                "username": users.username
            }, {
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                }
            })
                .then((response) => {
                    console.log(response.data);
                    // console.log('send notifi success');
                })
                .catch(function (error) {
                    throw error;
                })
        }
        
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
        )
    }

    const test = () => {
        // console.log(kanjiword.kanji_kun.toString().split(" "));
        // const a = kanjiword.kanji_kun.toString().split(" ");
        // const b = a[0];
        // console.log(kanjiword.example_kun[b]);
        Object.keys(kanjiword.example_kun).forEach((key) => {
            console.log(key);
            kanjiword.example_kun[key].map((element, key) => {
                console.log(element.w);
            })
        });
    }
    const sendKanjiComment = (kanji_id) => {
        //  console.log()
        if (comment.length === 0 || comment === '') {
            return;
        }
        var requ = 2;

        if (isManage === false || users.role === 2) {
            requ = 1;
        }
        axios.post('http://192.168.1.72:3002/language/createKanjiComment', {
            "kanji_id": kanji_id,
            "user_id": users._id,
            "content": comment,
            "requ": requ,
        }, {
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            }
        })
            .then((response) => {
                console.log('gia tri nhan duowcj la', response.data.comment);
                const newComment = response.data.comment;
                const kaka = { _id: newComment._id, kanji_id: newComment.kanji_id, user_id: newComment.user_id, content: newComment.content, time: newComment.time, islike: 0, isdislike: 0, like: 0, dislike: 0, review: newComment.review, username: users.username };
                setDataKanjiComment([...dataKanjiComment.concat(kaka)]);
            })
        setComment('');
        // console.log('so luong',dataKanjiComment.length);
    }

    const check = () => {
        console.log(dataKanjiComment);
    }

    const addKanjiInVocu = () => {
        setisVisibleAddWord(true);
    }

    const AddWordInVocu = (element) => {
        const objIndex = dataList.findIndex(e => e._id === element._id);
        if (objIndex !== -1) {
            var d = {};
            d.word = kanjiword.kanji;
            d.vn = kanjiword.mean;
            d.type = "Hán tự";
            d.date = last;
            d.explain = kanjiword;
            dataList[objIndex].data.push(d);
            setDataList([...dataList]);
            getListVocaSuccess([...dataList]);
            setisVisibleAddWord(false);
            axios.post('http://192.168.1.72:3002/language/createWordInVoca', {
                "id": element._id,
                "word": kanjiword.kanji,
                "vn": kanjiword.mean,
                "type": "Hán tự",
                "date": last,
                "explain": kanjiword,
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

    const createVocaAndAddWord = () => {
        axios.post('http://192.168.1.72:3002/language/createVocabulary', {
            "user_id": users._id,
            "name": name,
            // "dataElement": vocabulary,
            "date": last
        }, {
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            }
        })
            .then((response) => {
                console.log(response.data);
                const listData = dataList.concat(response.data.vocabulary);
                // const voca 
                setDataList([...dataList.concat(response.data.vocabulary)]);
                const objIndex = listData.findIndex(e => e.name === name);
                setisVisibleAddWordVocu(false);
                var d = {};
                d.word = kanjiword.kanji;
                d.vn = kanjiword.mean;
                d.type = "Hán tự";
                d.explain = kanjiword;
                d.date = last;
                listData[objIndex].data.push(d);
                setDataList([...listData]);
                getListVocaSuccess([...listData]);
                setisVisibleAddWord(false);
                setName("");
                axios.post('http://192.168.1.72:3002/language/createWordInVoca', {
                    "id": listData[objIndex]._id,
                    "word": kanjiword.kanji,
                    "vn": kanjiword.mean,
                    "type": "Hán tự",
                    "date": last,
                    "explain": kanjiword,
                }, {
                    headers: {
                        "Accept": "application/json",
                        "Content-Type": "application/json"
                    }
                })
                    .then((response1) => {
                        console.log(response1.data);
                    })
                    .catch(function (error) {
                        throw error;
                    })
                // objIndex = dataList.concat(response.data.vocabulary).findIndex(e => e.name === name);
            })
            .catch(function (error) {
                throw error;
            })

    }
    const refuseComment = (item) => {
        const list = [];
        const objIndex = dataKanjiComment.findIndex(e => e._id === item._id);
        if (objIndex !== -1) {
            list.push(item._id);
            dataKanjiComment[objIndex].review = 0;
            setDataKanjiComment([...dataKanjiComment]);
            axios.post('http://192.168.1.72:3002/language/refuseCommentKanji', {
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
        const objindex = dataKanjiComment.findIndex(e => e._id === item._id);
        console.log(objindex);
        if (dataKanjiComment[objindex].checked === false) {
            dataKanjiComment[objindex].checked = true;
        }
        else {
            dataKanjiComment[objindex].checked = false;
        }
        setDataKanjiComment([...dataKanjiComment]);
    }
    return (
        <View style={{ flexGrow: 1, flex: 1 }}>
            {/* <CustomHeader title={kanjiword.kanji} navigation={navigation} /> */}
            <View style={{ flexDirection: 'row', height: 50, backgroundColor: '#009387', justifyContent: 'space-between' }}>
                <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }} onPress={() => navigation.goBack()}>
                    <Icon name={'arrow-back'} size={29} style={{ color: '#fff', marginLeft: 5 }} />
                </TouchableOpacity>
                <View style={{ justifyContent: 'center' }}>
                    <Text style={{ textAlign: 'center', color: '#fff', fontSize: 18 }}>{vocabulary.word}</Text>
                </View>
                {
                    users.role === 1 ?
                        <TouchableOpacity style={{ justifyContent: 'center', marginRight: 10 }} onPress={() => setisVisibleAction(true)}>
                            <Entypo name={'dots-three-vertical'} size={20} style={{ color: '#fff' }} />
                        </TouchableOpacity>
                        :
                        <View />
                }
            </View>
            <ScrollView>
                <View style={{ marginTop: 20, marginLeft: 15 }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{}}>Bộ:</Text>
                            <Text style={{ marginLeft: 10 }}>{kanjiword.kanji} - {kanjiword.mean} </Text>
                        </View>

                        <View >
                            <Icon
                                onPress={() => addKanjiInVocu()}
                                style={{ marginRight: 20 }}
                                name="add-circle-outline"
                                // color={'#d9d9d9'}
                                size={25}
                            />
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={{ fontWeight: 'bold' }}>訓: </Text>
                        <Text style={{ marginLeft: 10 }}>{kanjiword.kanji_kun}</Text>

                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={{}}>音:</Text>
                        <Text style={{ marginLeft: 10 }}>{kanjiword.kanji_on}</Text>

                    </View>

                    {/* <View style={{flexDirection: 'row' }}>
                        <Text style={{ }}>Bộ thành phần:</Text>
                        <Text style={{ marginLeft: 10 }}>{typeof kanjiword.compdetail}</Text>

                    </View> */}
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={{}}>Bộ thành phần:</Text>
                        {
                            kanjiword.compDetail === null ?
                                null :
                                kanjiword.compDetail.map((element, key) => {
                                    return (
                                        <View style={{ marginLeft: 10 }}>
                                            <Text>{element.w} {element.h}</Text>
                                        </View>
                                    )
                                })
                        }
                    </View>
                    <View style={{ marginRight: 10 }}>
                        <Text style={{}}>Nghĩa:</Text>
                        <View style={{ marginRight: 30 }}>
                            {/* <Text style={{ marginLeft: 10,  }}>{kanjiword.detail}</Text> */}
                            <SeeMore numberOfLines={2}>
                                {kanjiword.detail}
                            </SeeMore>
                        </View>
                    </View>
                    <View style={{}}>
                        <Text style={{}}>hình ảnh minh họa :</Text>
                        <View style={{ marginRight: 30 }}>
                            <Image
                                style={{ height: 70, width: '80%', marginBottom: 10, marginLeft: 20 }}
                                source={{
                                    uri: kanjiword.image,
                                }}
                            />
                        </View>
                        <Text>{kanjiword.explain}</Text>
                    </View>

                    <View>
                        <Text>Ví dụ phân loại theo cách đọc</Text>
                        <View>
                            <View style={{ backgroundColor: '#e6e6ff' }}>
                                <Text style={{ padding: 5 }}>Kunyomi</Text>
                            </View>
                            {
                                kanjiword.example_kun !== undefined ?
                                    Object.keys(kanjiword.example_kun).map((key) => {
                                        return (
                                            <View>
                                                <Text>{key}</Text>
                                                <View style={{ flexDirection: 'row' }}>
                                                    <View>
                                                        {
                                                            kanjiword.example_kun[key].map((element, key) => {
                                                                return (
                                                                    <View key={key} style={{ flexDirection: 'row', borderTopWidth: 1, borderLeftWidth: 1, borderRightWidth: 1, borderColor: '#e6e6e6', justifyContent: 'space-evenly' }}>
                                                                        <View style={{ borderRightWidth: 1, borderRightColor: '#e6e6e6', width: '20%', paddingTop: 10, paddingRight: 10, paddingBottom: 10, paddingLeft: 5 }}>
                                                                            <Text>{element.w}</Text>
                                                                            {/* {element.w.split("").filter((e) => e === kanjiword.kanji) ? <Text></Text>} */}
                                                                            <Text>{element.p}</Text>
                                                                        </View>
                                                                        <View style={{ padding: 10, width: '70%' }}>
                                                                            <Text>{element.m}</Text>
                                                                        </View>

                                                                    </View>
                                                                    //     <View>
                                                                    //     <Text>{element.w}</Text>
                                                                    // <Text>{element.p}</Text>
                                                                    // <Text>{element.m}</Text>
                                                                    // </View>
                                                                )
                                                            })
                                                        }
                                                        {/* <Text>{kanjiword.example_kun[key].w}</Text>
                                                    <Text>{kanjiword.example_kun[key].p}</Text>
                                                </View>
                                                <View>
                                                    <Text>{kanjiword.example_kun[key].m}</Text> */}
                                                    </View>

                                                </View>
                                            </View>
                                        )

                                    })
                                    :
                                    null
                            }

                        </View>

                        <View>
                            <View style={{ backgroundColor: '#e6e6ff' }}>
                                <Text style={{ padding: 5 }}>Onyomi</Text>
                            </View>
                            {
                                kanjiword.example_on !== undefined ?
                                    Object.keys(kanjiword.example_on).map((key) => {
                                        return (
                                            <View>
                                                <Text>{key}</Text>
                                                <View style={{ flexDirection: 'row' }}>
                                                    <View>
                                                        {
                                                            kanjiword.example_on[key].map((element, key) => {
                                                                return (
                                                                    <View key={key} style={{ flexDirection: 'row', borderTopWidth: 1, borderLeftWidth: 1, borderRightWidth: 1, borderColor: '#e6e6e6', justifyContent: 'space-evenly' }}>
                                                                        <View style={{ borderRightWidth: 1, borderRightColor: '#e6e6e6', width: '20%', paddingTop: 10, paddingRight: 10, paddingBottom: 10, paddingLeft: 5 }}>
                                                                            <Text>{element.w}</Text>
                                                                            {/* {element.w.split("").filter((e) => e === kanjiword.kanji) ? <Text></Text>} */}
                                                                            <Text>{element.p}</Text>
                                                                        </View>
                                                                        <View style={{ padding: 10, width: '70%' }}>
                                                                            <Text>{element.m}</Text>
                                                                        </View>

                                                                    </View>
                                                                    //     <View>
                                                                    //     <Text>{element.w}</Text>
                                                                    // <Text>{element.p}</Text>
                                                                    // <Text>{element.m}</Text>
                                                                    // </View>
                                                                )
                                                            })
                                                        }
                                                        {/* <Text>{kanjiword.example_kun[key].w}</Text>
                                                    <Text>{kanjiword.example_kun[key].p}</Text>
                                                </View>
                                                <View>
                                                    <Text>{kanjiword.example_kun[key].m}</Text> */}
                                                    </View>

                                                </View>
                                            </View>
                                        )

                                    })
                                    :
                                    null
                            }

                        </View>
                    </View>
                </View>
                <View style={{ padding: 10, borderTopWidth: 1, borderTopColor: '#d9d9d9' }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
                        <Text>Có {dataKanjiComment.length} góp ý</Text>
                        {
                            dataKanjiComment.length > 3 ?
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
                            data={dataKanjiComment.filter(e=>e.review===1 || e.review ===2).slice(0, 3)}
                            keyExtractor={item => item._id}
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
                                onPress={() => sendKanjiComment(kanjiword._id)}
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
                                data={dataKanjiComment.filter(e=>e.review===1|| e.review===2).slice(3, dataKanjiComment.length)}
                                keyExtractor={item => item._id}
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
            // onPress={() => quesSc()}
            >
                <Entypo name={'triangle-right'} size={50} style={{ color: 'white' }} />
            </TouchableOpacity>

            <View style={[styles.container]}>
                <Modal
                    isVisible={isVisibleAddWord}
                    swipeDirection="down"
                    style={{ justifyContent: 'flex-end', margin: 0 }}
                    onRequestClose={() => setisVisibleAddWord(false)}
                    deviceWidth={WIDTH}
                    deviceHeight={HEIGHT}
                >
                    <View style={styles.modalContentadd}>
                        <View style={{ flexDirection: 'row', height: 50, backgroundColor: '#009387', justifyContent: 'space-between' }}>
                            <AntDesign name={'close'} size={20} color={'#fff'}
                                onPress={() => setisVisibleAddWord(false)}
                                style={{ paddingTop: 15, paddingRight: 20, marginLeft: 10 }} />
                            <View style={{ paddingTop: 15 }}>
                                <Text style={{ color: '#fff', fontSize: 20 }}>Thêm từ "{kanjiword.kanji}"</Text>
                            </View>
                            <TouchableOpacity style={{ justifyContent: 'center', marginRight: 20 }} onPress={() => setisVisibleAddWordVocu(true)}>
                                <MaterialIcons name={"add-box"} size={29} style={{ color: '#fff' }} />
                            </TouchableOpacity>
                        </View>
                        <View>
                            {
                                dataList.length === 0 ?
                                    <View style={{ padding: 20 }}>
                                        <Text>Gợi ý </Text>
                                        <Text>- Nhấn nút dấu "+" góc trên bên phải để thêm nhóm từ mới.</Text>
                                        <Text>- Bên cạnh nhóm từ có nút đẻ sửa xóa nhóm từ
                                        </Text>
                                    </View>
                                    :
                                    <ScrollView style={{ marginBottom: 40 }}>
                                        {
                                            dataList.map((element, key) => {
                                                return (
                                                    <TouchableOpacity key={key} onPress={() => AddWordInVocu(element)}>
                                                        <Card style={{ marginTop: 10, margin: 10 }}>
                                                            <Card.Content>
                                                                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                                                    <View style={{ flexDirection: 'row' }}>
                                                                        <View style={{ backgroundColor: colorBack[Math.floor(Math.random() * colorBack.length)], borderRadius: 30 }}>
                                                                            <Text style={{ paddingTop: 15, paddingBottom: 15, paddingLeft: 20, paddingRight: 20, color: '#fff' }}>{element.name.charAt(0)}</Text>
                                                                        </View>
                                                                        {/* <Avatar.Image size={40} style={{padding: 10}} source={('https://www.google.com/url?sa=i&url=https%3A%2F%2Fvi.m.wikipedia.org%2Fwiki%2FT%25E1%25BA%25ADp_tin%3AImage_created_with_a_mobile_phone.png&psig=AOvVaw3T9sYalA9E5MRsYwkeGOWj&ust=1652583018117000&source=images&cd=vfe&ved=0CAwQjRxqFwoTCJDa-8_93fcCFQAAAAAdAAAAABAD')} /> */}
                                                                        <View
                                                                            style={{
                                                                                marginLeft: 10,
                                                                                height: 30,
                                                                                marginBottom: 10
                                                                            }}>

                                                                            <Text style={{ fontSize: 20 }}>{element.name}</Text>
                                                                            <Text>{element.data.length} items</Text>
                                                                        </View>
                                                                    </View>

                                                                </View>
                                                                <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                                                                    <Text>{new Date(element.date).getFullYear() + '/' + fixDigit(new Date(element.date).getMonth()) + '/' + fixDigit(new Date(element.date).getDate())}</Text>
                                                                </View>
                                                            </Card.Content>
                                                        </Card>
                                                    </TouchableOpacity>
                                                )
                                            })
                                        }
                                    </ScrollView>
                            }
                        </View>
                    </View>

                </Modal>
            </View>

            <View style={styles.container}>
                <Modal
                    isVisible={isVisibleAddWordVocu}
                    animationInTiming={1000}
                    animationOutTiming={1000}
                    backdropTransitionInTiming={1000}
                    backdropTransitionOutTiming={1000}
                    deviceWidth={WIDTH}
                >
                    <View style={[styles.modalContent, { marginTop: 50, minHeight: 170 }]}>
                        <View style={{ padding: 15 }}>
                            <Text style={{ fontWeight: 'bold', fontSize: 20 }}>Tạo nhóm từ</Text>
                            <TextInput
                                style={{ borderBottomWidth: 1, borderBottomColor: '#80b3ff', alignItems: 'center', justifyContent: 'center' }}
                                placeholder="Nhập nhóm từ cần lưu"
                                value={name}
                                onChangeText={text => setName(text)}
                            />
                            <View style={styles.stylebutton}>
                                <TouchableOpacity
                                    onPress={() => setisVisibleAddWordVocu(false)}
                                    style={[styles.keepStyle, { backgroundColor: '#999999', marginRight: 110 }]}>
                                    <Text style={{ color: '#fff' }}>Đóng</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={[styles.keepStyle, { backgroundColor: '#1a75ff', }]}
                                    onPress={() => createVocaAndAddWord()}
                                >
                                    <Text style={{ color: '#fff' }}>Tạo</Text>
                                </TouchableOpacity>
                            </View>

                        </View>

                    </View>
                </Modal>
            </View>
            <View style={styles.container}>
                <Modal
                    isVisible={isVisibleAction}
                    swipeDirection="down"
                    style={{ justifyContent: 'flex-end', margin: 0, }}
                    // onRequestClose={() => setisVisibleAction(false)}
                    deviceWidth={WIDTH}
                >
                    <View style={[styles.modalContent, { marginLeft: 10, marginRight: 10 }]}>

                        <TouchableOpacity
                            onPress={() => deleteAction(vocabulary)}
                            style={{ borderBottomWidth: 1, padding: 10, justifyContent: 'center', alignItems: 'center', borderBottomColor: '#e6e6e6' }}>
                            <Text style={{ color: 'red' }}>Xóa</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => navigation.navigate("EditWord", { vocabulary: vocabulary })}
                            style={{ borderBottomWidth: 1, padding: 10, justifyContent: 'center', alignItems: 'center', borderBottomColor: '#e6e6e6' }}>
                            <Text style={{ color: 'blue' }}>Chỉnh sửa</Text>
                        </TouchableOpacity>

                    </View>
                    <TouchableOpacity
                        onPress={() => setisVisibleAction(false)}
                        style={{ backgroundColor: '#fff', marginTop: 10, marginLeft: 10, marginRight: 10, marginBottom: 10, padding: 10, alignItems: 'center', justifyContent: 'center' }}
                    >
                        <Text style={{ color: 'blue' }}>Huỷ</Text>
                    </TouchableOpacity>

                </Modal>

            </View>
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
        // flex: 1,
        backgroundColor: 'white',
        borderRadius: 4,
        borderColor: 'rgba(0, 0, 0, 0.1)',
    },
    modalContentadd: {
        flex: 1,
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
    keepStyle: { height: 40, width: 100, alignItems: 'center', justifyContent: 'center', borderRadius: 5 },
    stylebutton: { flexDirection: 'row', justifyContent: 'space-around', flex: 4, marginTop: 20 },


});
