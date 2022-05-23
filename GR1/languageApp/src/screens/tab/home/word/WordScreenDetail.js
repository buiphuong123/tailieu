import React, { useEffect, useState } from 'react'
import { Text, View, Image, TextInput, StyleSheet, ScrollView, TouchableOpacity, Dimensions, FlatList } from 'react-native'
import CustomHeader from '../../../CustomHeader';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon from 'react-native-vector-icons/Ionicons';
import IconsAnt from 'react-native-vector-icons/AntDesign';
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
import { cps } from 'redux-saga/effects';
import { element } from 'prop-types';

export default WordScreenDetail = ({ navigation, route }) => {
    const [isVisible, setisVisible] = useState(false);
    const [isVisibleImage, setisVisibleImage] = useState(false);
    const [isVisibleAdd, setisVisibleAdd] = useState(false);
    const { vocabulary } = route.params;
    const commentWordList = useSelector(state => state.commentReducer.commentWordList);
    const [dataWordComment, setDataWordComment] = useState([]);
    const [comment, setComment] = useState("");
    const [name, setName] = useState("");
    const users = useSelector(state => state.userReducer.user);
    var last = new Date(); // ngày hiện tại
    useEffect(() => {
        setDataWordComment(commentWordList);
    }, [commentWordList])
    const date = new Date();
    const likeaction = (comment_id, user_id, username_friends) => {
        var index = 0;
        var checkdislike = false;
        const idx = dataWordComment.map(object => object._id).indexOf(comment_id);
        console.log('gia tri idx la ', idx);
        if (idx >= 0) {
            if (dataWordComment[idx].islike === true) {
                index = 1;
                dataWordComment[idx].islike = false;
                commentWordList[idx].like = dataWordComment[idx].like - 1;
                setDataWordComment([...dataWordComment]);
            }
            else {
                if (dataWordComment[idx].isdislike === true) {
                    dataWordComment[idx].isdislike = false;
                    checkdislike = true;
                    dataWordComment[idx].dislike = dataWordComment[idx].dislike - 1;
                    dataWordComment[idx].like = dataWordComment[idx].like + 1;
                    dataWordComment[idx].islike = true;
                    setDataWordComment([...dataWordComment]);
                }
                else {
                    dataWordComment[idx].islike = true;
                    dataWordComment[idx].like = dataWordComment[idx].like + 1;
                    setDataWordComment([...dataWordComment]);
                }
            }
        }
        if (username_friends === users.username) {
            index = 1;
        }

        if (index === 0) {
            axios.post('http://192.168.1.2:3002/language/sendNotiToDevice', {
                "username": users.username,
                "username_friends": username_friends,
                "action": "like",
                "comment_id": comment_id,
                "word": vocabulary,
                "noti": "word",
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
        axios.post('http://192.168.1.2:3002/language/createLikeWordComment', {
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

    const dislikeaction = (comment_id, user_id, username_friends) => {
        var index = 0;
        var checkdislike = false;
        const idx = dataWordComment.map(object => object._id).indexOf(comment_id);
        if (idx >= 0) {
            if (dataWordComment[idx].isdislike === true) {
                index = 1;
                dataWordComment[idx].isdislike = false;
                commentWordList[idx].dislike = commentWordList[idx].dislike - 1;
                setDataWordComment([...dataWordComment]);
            }
            else {
                if (dataWordComment[idx].islike === true) {
                    dataWordComment[idx].islike = false;
                    checkdislike = true;
                    dataWordComment[idx].like = dataWordComment[idx].like - 1;
                    dataWordComment[idx].dislike = dataWordComment[idx].dislike + 1;
                    dataWordComment[idx].isdislike = true;
                    setDataWordComment([...dataWordComment]);
                }
                else {
                    dataWordComment[idx].isdislike = true;
                    dataWordComment[idx].dislike = dataWordComment[idx].dislike + 1;
                    setDataWordComment([...dataWordComment]);
                }
            }
        }
        if (username_friends === users.username) {
            index = 1;
        }

        if (index === 0) {
            axios.post('http://192.168.1.2:3002/language/sendNotiToDevice', {
                "username": users.username,
                "username_friends": username_friends,
                "action": "like",
                "comment_id": comment_id,
                "word": vocabulary,
                "noti": "word",
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
        axios.post('http://192.168.1.2:3002/language/createDisLikeWordComment', {
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
    }

    const sendWordComment = (word_id) => {
        //  console.log()
        if (comment.length === 0 || comment === '') {
            return;
        }
        axios.post('http://192.168.1.2:3002/language/createWordComment', {
            "word_id": word_id,
            "user_id": users._id,
            "content": comment
        }, {
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            }
        })
            .then((response) => {
                // console.log('gia tri nhan duowcj la', response.data.comment);
                const newComment = response.data.comment;
                const kaka = { _id: newComment._id, word_id: newComment.word_id, user_id: newComment.user_id, content: newComment.content, time: newComment.time, islike: 0, isdislike: 0, like: 0, dislike: 0, review: newComment.review, username: users.username };
                setDataWordComment(dataWordComment.concat(kaka));
            })
        setComment('');
        console.log(dataWordComment);
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
    const splitArray = (originArr) => {
        const arr = originArr.split(', ');
        for (var i = 0; i < arr.length; i++) {
            if (arr[i] === "adj-na") {
                arr[i] = "Tính từ đuôi な";
            }
            else if (arr[i] === "adj-no") {
                arr[i] = "Tính từ sở hữu の";
            }
            else if (arr[i] === "n") {
                arr[i] = "Danh từ";
            }
            else if (arr[i] === "n-suf") {
                arr[i] = "Danh từ làm hậu tố";
            }
            else if (arr[i] === "adv") {
                arr[i] = "Trạng từ";
            }
            else if (arr[i] === "n-adv") {
                arr[i] = "Danh tù làm phó từ";
            }
            else if (arr[i] === "n-t") {
                arr[i] = "Danh từ chỉ thời gian";
            }
            else if (arr[i] === "v5u") {
                arr[i] = "Động từ nhóm 1 -u";
            }
            else if (arr[i] === "v5k") {
                arr[i] = "Động từ nhóm 1 -ku";
            }
            else if (arr[i] === "vi") {
                arr[i] = "Tự động từ";
            }
            else if (arr[i] === "vt") {
                arr[i] = "Tha động từ";
            }
            else if (arr[i] === "v1") {
                arr[i] = "Động từ nhóm 2";
            }
        }
        return arr.toString();
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
                            <IconsAnt
                                onPress={() => likeaction(item._id, users._id, item.user_id.username)}
                                name="like1"
                                color={item.islike ? 'blue' : '#d9d9d9'}
                                size={17}
                            />
                            <Text style={{ marginLeft: 5, marginTop: -2 }}>{item.like}</Text>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginLeft: 15 }}>
                            <IconsAnt
                                onPress={() => dislikeaction(item._id, users._id, item.user_id.username)}
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
            </View>
        )
    }

    renderExample = ({ item, index }) => {
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

    const createVoca = () => {
        axios.post('http://192.168.1.2:3002/language/createVocabulary', {
            "user_id": users._id,
            "name": name,
            "dataElement": vocabulary,
            "date": date
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

    return (
        <View style={{ flexGrow: 1, flex: 1 }}>
            <CustomHeader title={vocabulary.word} navigation={navigation} />
            <ScrollView>
                <View style={{ marginTop: 20, marginLeft: 15 }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={{ color: 'red', fontWeight: 'bold', fontSize: 25 }}> {vocabulary.word} </Text>
                        <View style={{ flexDirection: 'row' }}>
                            <Entypo
                                onPress={() => setisVisibleImage(true)}
                                style={{ marginRight: 20 }}
                                name="image"
                                size={25}
                            />
                            <Icon
                                onPress={() => setisVisibleAdd(true)}
                                style={{ marginRight: 20 }}
                                name="add-circle-outline"
                                // color={'#d9d9d9'}
                                size={25}
                            />
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', marginTop: 15 }}>
                        {vocabulary.translate !== undefined ? <Text style={{}}>[ {vocabulary.translate} ] </Text> : null}
                        {vocabulary.amhan !== undefined ? <Text style={{}}>[ {vocabulary.amhan} ] </Text> : null}

                    </View>

                    <View style={{ marginTop: 10, flexDirection: 'row', paddingRight: 50, marginRight: 20 }}>
                        {/* {vocabulary.typeWord !== undefined ? */}
                        <IconsAnt
                            // onPress={() => sendComment(word._id)}
                            style={{ marginRight: 10, marginTop: 5 }}
                            name="staro"
                            color={'red'}
                            size={16}
                        />
                        {/* : null} */}
                        {
                            vocabulary.kind.length !== 0 ?
                                vocabulary.kind.map((element, key) => {
                                    return (
                                        <View style={{ marginTop: 5 }}>
                                            {element !== null ? <Text>{splitArray(element)}</Text> : null}

                                        </View>
                                    )
                                })
                                : null
                        }
                    </View>

                    {
                        vocabulary.means.map((element, key) => {
                            return (
                                <View key={key} style={{ marginTop: 15, flexDirection: 'row' }}>
                                    <Text style={{ fontSize: 20, color: 'blue', marginTop: -10 }}>.</Text>
                                    <Text style={{ color: 'blue', marginLeft: 3 }}>{element}</Text>
                                </View>
                            )
                        })
                    }
                    {/* <View style={{ marginTop: 15, flexDirection: 'row' }}>
                        <Text style={{fontSize: 20, color: 'blue'}}>.</Text>
                        <Text style={{color: 'blue'}}>{vocabulary.vn}</Text>
                    </View> */}

                    <View style={{ marginTop: 15, marginBottom: 10 }}>
                        {/* <Text style={{ color: 'red', fontSize: 18 }}>Ví dụtieengs nhaatj </Text>
                        <Text style={{ fontStyle: 'italic', color: 'gray' }}>nghia</Text> */}
                        <FlatList
                            style={{ padding: 5 }}
                            data={vocabulary.wordexample}
                            keyExtractor={item => item._id}
                            renderItem={renderExample}
                        />
                    </View>
                </View>
                <View style={{ padding: 10, borderTopWidth: 1, borderTopColor: '#d9d9d9' }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
                        <Text>Có {dataWordComment.length}  góp ý</Text>
                        {
                            dataWordComment.length > 3 ?
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
                            data={dataWordComment.slice(0, 3)}
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
                                onPress={() => sendWordComment(vocabulary._id)}
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
                                data={dataWordComment.slice(3, dataWordComment.length)}
                                keyExtractor={item => item._id}
                                renderItem={renderComment}
                            />
                            <Text>Flatlist comment</Text>
                        </ScrollView>

                        <TouchableOpacity onPress={() => setisVisible(false)}>
                            <View style={styles.button}>
                                <Text>Close</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </Modal>
            </View>
            {/* image */}
            <View style={styles.container}>
                <Modal
                    isVisible={isVisibleImage}
                    animationInTiming={1000}
                    animationOutTiming={1000}
                    backdropTransitionInTiming={1000}
                    backdropTransitionOutTiming={1000}
                    deviceWidth={WIDTH}
                >
                    <View style={[styles.modalContent, { marginTop: 50 }]}>
                        <ScrollView>
                            <View>
                                {
                                    vocabulary.images.map((element, key) => {
                                        return (
                                            <View key={key} style={{ borderWidth: 1 }}>
                                                <Image
                                                    style={{ width: '100%', minHeight: 200 }}
                                                    source={{
                                                        uri: element,
                                                    }}
                                                />
                                            </View>
                                        )
                                    })
                                }
                            </View>
                        </ScrollView>

                        <TouchableOpacity onPress={() => setisVisibleImage(false)}>
                            <View style={styles.button}>
                                <Text>Close</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </Modal>
            </View>

            {/* add vocabulary */}
            <View style={styles.container}>
                <Modal
                    isVisible={isVisibleAdd}
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
                                    onPress={() => setisVisibleAdd(false)}
                                    style={[styles.keepStyle, { backgroundColor: '#999999', marginRight: 110 }]}>
                                    <Text style={{ color: '#fff' }}>Đóng</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={[styles.keepStyle, { backgroundColor: '#1a75ff', }]}
                                    onPress={() => createVoca()}
                                >
                                    <Text style={{ color: '#fff' }}>Tạo</Text>
                                </TouchableOpacity>
                            </View>

                        </View>

                        {/* <TouchableOpacity onPress={() => setisVisibleAdd(false)}>
                            <View style={styles.button}>
                                <Text>Close</Text>
                            </View>
                        </TouchableOpacity> */}
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
    stylebutton: { flexDirection: 'row', justifyContent: 'space-around', flex: 4, marginTop: 20 },
    keepStyle: { height: 40, width: 100, alignItems: 'center', justifyContent: 'center', borderRadius: 5 },

});
