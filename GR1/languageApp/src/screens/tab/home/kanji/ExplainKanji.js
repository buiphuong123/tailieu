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
const WIDTH = Dimensions.get('window').width;
import Modal from 'react-native-modal'; // 2.4.0
import { cps } from 'redux-saga/effects';
import { element } from 'prop-types';
import SeeMore from 'react-native-see-more-inline';

export default ExplainKanji = ({ navigation, route }) => {
    const [isVisible, setisVisible] = useState(false);
    const { kanjiword } = route.params;
    const commentKanjiList = useSelector(state => state.commentReducer.commentKanjiList);
    // const [dataWordComment, setDataWordComment] = useState([]);
    const [comment, setComment] = useState("");
    const users = useSelector(state => state.userReducer.user);
    var last = new Date(); // ngày hiện tại
    const [dataKanjiComment, setDataKanjiComment] = useState([]);

    useEffect(() => {
        setDataKanjiComment(commentKanjiList);
    }, [commentKanjiList])

     const likeaction = (comment_id, user_id, username_friends) => {
        var index = 0;
        var checkdislike = false;
        const idx = dataKanjiComment.map(object => object._id).indexOf(comment_id);
        if(idx >= 0) {
            if(dataKanjiComment[idx].islike === true) {
                index =1;
                dataKanjiComment[idx].islike = false;
                dataKanjiComment[idx].like = dataKanjiComment[idx].like -1;
                setDataKanjiComment([...dataKanjiComment]);
            }
            else {
                if(dataKanjiComment[idx].isdislike === true) {
                    dataKanjiComment[idx].isdislike = false;
                    checkdislike = true;
                    dataKanjiComment[idx].dislike = dataKanjiComment[idx].dislike -1;
                    dataKanjiComment[idx].like = dataKanjiComment[idx].like+1;
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
        if(username_friends === users.username) {
            index =1;
        }

        if(index === 0) {
            axios.post('http://192.168.1.2:3002/language/sendNotiToDevice', {
                "username": users.username,
                "username_friends": username_friends,
                "action": "like",
                "comment_id": comment_id,
                "word": kanjiword,
                "noti": "kanji",
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
        axios.post('http://192.168.1.2:3002/language/createLikeKanjiComment', {
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
        const idx = dataKanjiComment.map(object => object._id).indexOf(comment_id);
        if(idx >= 0) {
            if(dataKanjiComment[idx].isdislike === true) {
                index =1;
                dataKanjiComment[idx].isdislike = false;
                dataKanjiComment[idx].dislike = dataKanjiComment[idx].dislike -1;
                setDataKanjiComment([...dataKanjiComment]);
            }
            else {
                if(dataKanjiComment[idx].islike === true) {
                    dataKanjiComment[idx].islike = false;
                    checkdislike = true;
                    dataKanjiComment[idx].like = dataKanjiComment[idx].like -1;
                    dataKanjiComment[idx].dislike = dataKanjiComment[idx].dislike+1;
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
        if(username_friends === users.username) {
            index =1;
        }

        if(index === 0) {
            axios.post('http://192.168.1.2:3002/language/sendNotiToDevice', {
                "username": users.username,
                "username_friends": username_friends,
                "action": "dislike",
                "comment_id": comment_id,
                "word": kanjiword,
                "noti": "kanji",
            }, {
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                }
            })
                .then((response) => {
                    console.log(response.data);
                    console.log('send notifi success');
                })
                .catch(function (error) {
                    throw error;
                })
        }
        axios.post('http://192.168.1.2:3002/language/createDisLikeKanjiComment', {
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
                            <Text style={{ marginLeft: 5, marginTop: -2 }}>{item.dislike}</Text>
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
         axios.post('http://192.168.1.2:3002/language/createKanjiComment', {
            "kanji_id": kanji_id,
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
                const kaka = { _id: newComment._id, kanji_id: newComment.kanji_id, user_id: newComment.user_id, content: newComment.content, time: newComment.time, islike: 0, isdislike: 0, like: 0, dislike: 0, review: newComment.review, username: users.username };
            setDataKanjiComment(dataKanjiComment.concat(kaka));
            })
            setComment('');
            console.log(dataKanjiComment);
            // console.log('so luong',dataKanjiComment.length);
     }

     const check = () => {
         console.log(dataKanjiComment);
     }
    
    return (
        <View style={{ flexGrow: 1, flex: 1 }}>
            <CustomHeader title={kanjiword.kanji} navigation={navigation} />
            <ScrollView>
                <View style={{ marginTop: 20, marginLeft: 15 }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{}}>Bộ:</Text>
                            <Text style={{ marginLeft: 10 }}>{kanjiword.kanji} - {kanjiword.mean} </Text>
                        </View>

                        <View >
                            <Icon
                                // onPress={() => sendComment(word._id)}
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
                            null:
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
                            <View style={{backgroundColor: '#e6e6ff'}}>
                            <Text style={{padding: 5}}>Kunyomi</Text>
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
                                                               <View key={key} style={{flexDirection: 'row', borderTopWidth: 1, borderLeftWidth: 1, borderRightWidth: 1, borderColor: '#e6e6e6', justifyContent: 'space-evenly'}}>
                                                                    <View style={{borderRightWidth: 1, borderRightColor: '#e6e6e6', width: '20%', paddingTop: 10, paddingRight: 10, paddingBottom: 10, paddingLeft: 5}}>
                                                                        <Text>{element.w}</Text>
                                                                        {/* {element.w.split("").filter((e) => e === kanjiword.kanji) ? <Text></Text>} */}
                                                                        <Text>{element.p}</Text>
                                                                    </View>
                                                                    <View style={{padding: 10, width: '70%'}}>
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
                            <View style={{backgroundColor: '#e6e6ff'}}>
                            <Text style={{padding: 5}}>Onyomi</Text>
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
                                                               <View key={key} style={{flexDirection: 'row', borderTopWidth: 1, borderLeftWidth: 1, borderRightWidth: 1, borderColor: '#e6e6e6', justifyContent: 'space-evenly'}}>
                                                                    <View style={{borderRightWidth: 1, borderRightColor: '#e6e6e6', width: '20%', paddingTop: 10, paddingRight: 10, paddingBottom: 10, paddingLeft: 5}}>
                                                                        <Text>{element.w}</Text>
                                                                        {/* {element.w.split("").filter((e) => e === kanjiword.kanji) ? <Text></Text>} */}
                                                                        <Text>{element.p}</Text>
                                                                    </View>
                                                                    <View style={{padding: 10, width: '70%'}}>
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
                            dataKanjiComment.length >  3 ?
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
                            data={dataKanjiComment.slice(0, 3)}
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
                    <TouchableOpacity onPress={() => check()}>
                        <Text>CHECK</Text>
                    </TouchableOpacity>
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
                                data={dataKanjiComment.slice(3, dataKanjiComment.length)}
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
});
