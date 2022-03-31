import React, { useState } from 'react'
import { Text, View, TextInput, StyleSheet, ScrollView, TouchableOpacity, Dimensions, FlatList } from 'react-native'
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

export default WordScreenDetail = ({ navigation, route }) => {
    const [isVisible, setisVisible] = useState(false);
    const { vocabulary } = route.params;
    return (
        <View style={{ flexGrow: 1, flex: 1 }}>
            <CustomHeader title={vocabulary.kanji} navigation={navigation} />
            <ScrollView>
                <View style={{ marginTop: 20, marginLeft: 15 }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        {/* <Text style={{ color: 'red', fontWeight: 'bold', fontSize: 25 }}> {vocabulary.kanji} </Text> */}
                        {vocabulary.kanji !== undefined ? <Text style={{ color: 'red', fontWeight: 'bold', fontSize: 25 }}> {vocabulary.kanji} </Text>
                            : vocabulary.hira !== undefined ? <Text style={{ color: 'red', fontWeight: 'bold', fontSize: 25 }}> {vocabulary.hira} </Text>
                                : vocabulary.kata !== undefined ? <Text style={{ color: 'red', fontWeight: 'bold', fontSize: 25 }}> {vocabulary.kata} </Text>
                                    : null
                        }
                        {/* <Text style={{ flexShrink: 1, marginLeft: 10, paddingRight: 10, color: 'red', fontWeight: 'bold' }}>nghia</Text> */}
                        <View style={{ flexDirection: 'row' }}>
                            <Entypo
                                // onPress={() => sendComment(word._id)}
                                style={{ marginRight: 20 }}
                                name="image"
                                // color={'#d9d9d9'}
                                size={25}
                            />
                            <Icon
                                // onPress={() => sendComment(word._id)}
                                style={{ marginRight: 20 }}
                                name="add-circle-outline"
                                // color={'#d9d9d9'}
                                size={25}
                            />
                        </View>
                    </View>
                    <View style={{ marginTop: 15, flexDirection: 'row' }}>
                        {vocabulary.hira !== undefined ? <Text style={{ fontWeight: 'bold', textDecorationLine: 'underline' }}>[ {vocabulary.hira} ]</Text>
                            : vocabulary.kata !== undefined ? <Text style={{ fontWeight: 'bold', textDecorationLine: 'underline' }}> {vocabulary.kata} </Text>
                                : null
                        }
                        {/* <Text style={{ fontWeight: 'bold', textDecorationLine: 'underline' }}>[ {vocabulary.hira} ]</Text>
                        <Text style={{ marginLeft: 15 }}>[ {vocabulary.amhan} ]</Text> */}
                        {vocabulary.amhan !== undefined ? <Text style={{ marginLeft: 15 }}>[ {vocabulary.amhan} ]</Text>
                            : null
                        }
                    </View>
                    <View style={{ marginTop: 10, flexDirection: 'row' }}>
                        {vocabulary.typeWord !== undefined ?
                            <IconsAnt
                                // onPress={() => sendComment(word._id)}
                                style={{ marginRight: 10, marginTop: 5 }}
                                name="staro"
                                color={'red'}
                                size={16}
                            />
                            : null}
                        {vocabulary.typeWord === 'N' ?
                            <Text style={{ color: 'red', fontSize: 18 }}>Danh từ</Text>
                        : vocabulary.typeWord === 'adj' && vocabulary.typeWord === 1 ?
                            <Text style={{ color: 'red', fontSize: 18 }}>Tính từ đuôi い</Text>
                        : vocabulary.typeWord === 'adj' && vocabulary.typeWord ===2 ?
                            <Text style={{ color: 'red', fontSize: 18 }}>Tính từ đuôi な</Text>
                        : vocabulary.typeWord === 'adj' ?
                            <Text style={{ color: 'red', fontSize: 18 }}>Tính từ </Text>
                        : vocabulary.typeWord === 'adv' ?
                            <Text style={{ color: 'red', fontSize: 18 }}>Trạng từ </Text>
                        : vocabulary.typeWord === 'V' && vocabulary.typeVerb === 1 && vocabulary.verbGround !== undefined?
                            <Text style={{ color: 'red', fontSize: 18 }}> Động từ nhóm {vocabulary.verbGround}, Tự động từ </Text>
                            : vocabulary.typeWord === 'V' && vocabulary.typeVerb === 2 && vocabulary.verbGround !== undefined?
                            <Text style={{ color: 'red', fontSize: 18 }}> Động từ nhóm {vocabulary.verbGround}, Tha động từ </Text>
                        : null
                        }
                    </View>

                    <View style={{ marginTop: 15, flexDirection: 'row' }}>
                        <Text>{vocabulary.vn}</Text>
                    </View>

                    <View style={{ marginTop: 15, marginBottom: 10 }}>
                        <Text style={{ color: 'red', fontSize: 18 }}>Ví dụtieengs nhaatj </Text>
                        <Text style={{ fontStyle: 'italic', color: 'gray' }}>nghia</Text>
                    </View>
                </View>
                <View style={{ padding: 10, borderTopWidth: 1, borderTopColor: '#d9d9d9' }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
                        <Text>Có  góp ý</Text>
                        {/* {
                            dataComment.length >  3 ? */}
                        <TouchableOpacity onPress={() => setisVisible(true)}>
                            <Text>Xem thêm góp ý</Text>
                        </TouchableOpacity>
                        {/* :
                                null
                        } */}
                    </View>
                    <View>
                        {/* <FlatList
                            style={{ padding: 5 }}
                            data={dataComment.slice(0, 3)}
                            keyExtractor={item => item.id}
                            renderItem={renderComment}
                        /> */}
                        <View style={{ marginTop: 10, borderBottomWidth: 1, borderBottomColor: '#d9d9d9' }}>
                            <Text>content</Text>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingTop: 15, paddingBottom: 8 }}>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                        {/* <Text>like</Text> */}
                                        <IconsAnt
                                            // onPress={() => likeaction(item._id, users._id, item.user_id.username)}
                                            name="like1"
                                            // color={item.islike ? 'blue' : '#d9d9d9'}
                                            size={17}
                                        />
                                        <Text style={{ marginLeft: 5, marginTop: -2 }}>like</Text>
                                    </View>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginLeft: 15 }}>
                                        <IconsAnt
                                            // onPress={() => dislikeaction(item._id, users._id, item.user_id.username)}
                                            name="dislike1"
                                            // color={item.isdislike ? 'blue' : '#d9d9d9'}
                                            size={17}
                                        />
                                        <Text style={{ marginLeft: 5, marginTop: -2 }}>dislike </Text>
                                    </View>

                                </View>
                                <View style={{ marginLeft: 20 }}>
                                    <Text>name</Text>
                                    {/* <Text>{item.user_id.username === undefined ? item.username : item.user_id.username} ({time(dt)})</Text> */}
                                </View>
                            </View>
                        </View>

                        <View style={{ marginTop: 20 }}>
                            <View>
                                <TextInput
                                    style={{ borderWidth: 1, padding: 5, borderColor: '#d9d9d9', height: 40, zIndex: 0, borderRadius: 5 }}
                                    placeholder={"thêm nghĩa hoặc ví dụ cho từ"}
                                    multiline={true}
                                    numberOfLines={1}
                                // onChangeText={text => setComment(text)}
                                // value={comment}

                                />
                            </View>
                            <Iconss
                                // onPress={() => sendComment(word._id)}
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
                            {/* <FlatList
                                style={{ padding: 5 }}
                                data={dataComment.slice(3, dataComment.length)}
                                keyExtractor={item => item.id}
                                renderItem={renderComment}
                            /> */}
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
});
