import React, { Component, useEffect, useState } from 'react'
import { Text, View, Switch, SafeAreaView, ScrollView, TouchableOpacity, Alert, StyleSheet, Dimensions, TextInput } from 'react-native'
import { useDispatch, useSelector } from 'react-redux';
import { useTheme } from 'react-native-paper';
import Octicons from 'react-native-vector-icons/Octicons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/Ionicons';
import Iconss from 'react-native-vector-icons/MaterialCommunityIcons';
import { getAllcommentWord } from '../../../redux/actions/comment.action';
import axios from 'axios';
import { RemoteManage } from '../../../redux/actions/manage.action';

const ManageStack = ({ navigation }) => {
    const listPost = useSelector(state => state.postReducer.listPost);
    const allCommentWord = useSelector(state => state.commentReducer.allCommentWord);
    const users = useSelector(state => state.userReducer.user);
    const dispatch = useDispatch();
    const [asset, setAsset] = useState(true);
    const isManage = useSelector(state => state.manageReducer.isManage);
    useEffect(() => {
        console.log('vao day nhe, managa');
        if (users.role === 1) {
            axios.get('http://192.168.1.72:3002/language/getAllWordComment', {
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                }
            })
                .then((response) => {
                    dispatch(getAllcommentWord(response.data.comment));
                })
                .catch(function (error) {
                    throw error;
                })
        }
    }, []);
    const toggleSwitchAction = (value) => {
        if (isManage === true) {
            if (listPost.filter(e => e.review === 2).length !== 0 || allCommentWord.filter(e => e.review === 2).length !== 0) {
                Alert.alert(
                    "Alert",
                    "Hãy xác nhận các bài viết và comment trươc khi tắt kiểm duyệt ",
                    [
                        {
                            text: "OK",
                            onPress: () => {
                                console.log("Cancel Pressed");
                            },
                            style: "cancel"

                        }
                    ]
                )
            }
            else {
                Alert.alert(
                    "Alert",
                    "Bạn chắc chắn muốn tắt kiểm duyệt",
                    [
                        {
                            text: "Cacel",
                            onPress: () => {
                                console.log("Cancel Pressed");
                            },
                            style: "cancel"

                        },
                        {
                            text: "OK", onPress: () => {
                                dispatch(RemoteManage(value));
                            }
                        }
                    ]
                )
            }
        }
        else {
            Alert.alert(
                "Alert",
                "Bạn chắc chắn muốn bật kiểm duyệt",
                [
                    {
                        text: "Cacel",
                        onPress: () => {
                            console.log("Cancel Pressed");
                        },
                        style: "cancel"

                    },
                    {
                        text: "OK", onPress: () => {
                            dispatch(RemoteManage(value));
                        }
                    }
                ]
            )
        }

    }
    return (
        <View style={{ padding: 10, backgroundColor: '#f2f2f2', flex: 1 }}>
            <View style={{}}>
                {/* <View style={{ flexDirection: 'row', justifyContent: 'space-between', borderBottomWidth: 1, borderBottomColor: '#cccccc' }}>
                    <View style={{ marginBottom: 10 }}>
                        <Text style={{ fontWeight: 'bold', fontSize: 20 }}>Kiểm duyệt</Text>
                    </View>
                    <Switch
                        trackColor={{ false: "#767577", true: "#81b0ff" }}
                        thumbColor={asset ? "blue" : "white"}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={toggleSwitchAction}
                        value={asset}
                    />
                </View> */}
                <View style={{ backgroundColor: '#fff', marginLeft: 5 }}>
                    <View style={{ padding: 10, flexDirection: 'row', justifyContent: 'space-between', borderBottomWidth: 1, borderBottomColor: '#e6e6e6' }}>
                        <Text style={{ fontWeight: 'bold', fontSize: 18 }}>Phê duyệt bài viết</Text>
                        <Switch
                            trackColor={{ false: "#767577", true: "#81b0ff" }}
                            thumbColor={asset ? "blue" : "white"}
                            ios_backgroundColor="#3e3e3e"
                            onValueChange={toggleSwitchAction}
                            value={isManage}
                        />
                    </View>
                    <View style={{}}>
                        <TouchableOpacity
                            onPress={() => navigation.navigate("AssetsPost", { navigation: navigation })}
                            style={{ flexDirection: 'row', padding: 10 }}>
                            <Iconss name={'post-outline'} size={29} color={'black'} style={{ paddingTop: 10, paddingRight: 10 }} />
                            <View style={{ marginLeft: 5 }}>
                                <Text style={{ fontWeight: 'bold', fontSize: 18 }}>Bài viết đang chờ</Text>
                                <View style={{ flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: '#e6e6e6', paddingBottom: 5 }}>
                                    <Text style={{ fontWeight: 'bold', fontSize: 40, marginTop: -30, color: '#00bfff' }}>.</Text>
                                    <Text style={{ marginLeft: 3 }}>{listPost.filter(e => e.review === 2).length} new</Text>
                                </View>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity style={{ flexDirection: 'row', paddingRight: 10, paddingLeft: 10, paddingBottom: 10 }} onPress={() => navigation.navigate("AssetsComment", { navigation: navigation })}>
                            <Iconss name={'post-outline'} size={29} color={'black'} style={{ paddingTop: 10, paddingRight: 10 }} />
                            <View style={{ marginLeft: 5 }}>
                                <Text style={{ fontWeight: 'bold', fontSize: 18 }}>Kiểm duyệt comment từ vựng</Text>
                                <View style={{ flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: '#e6e6e6', paddingBottom: 5 }}>
                                    <Text style={{ fontWeight: 'bold', fontSize: 40, marginTop: -30, color: '#00bfff' }}>.</Text>
                                    <Text>{allCommentWord.filter(e => e.review === 2).length} comment</Text>
                                </View>
                            </View>
                        </TouchableOpacity>

                        <View style={{ flexDirection: 'row', paddingRight: 10, paddingLeft: 10, paddingBottom: 10 }}>
                            <Iconss name={'post-outline'} size={29} color={'black'} style={{ paddingTop: 10, paddingRight: 10 }} />
                            <View style={{ marginLeft: 5 }}>
                                <Text style={{ fontWeight: 'bold', fontSize: 18 }}>Kiểm duyệt comment ngữ pháp </Text>
                                <View style={{ flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: '#e6e6e6', paddingBottom: 5 }}>
                                    <Text style={{ fontWeight: 'bold', fontSize: 40, marginTop: -30, color: '#00bfff' }}>.</Text>
                                    <Text>1 new days</Text>
                                </View>
                            </View>
                        </View>

                        <View style={{ flexDirection: 'row', paddingRight: 10, paddingLeft: 10, paddingBottom: 10 }}>
                            <Iconss name={'post-outline'} size={29} color={'black'} style={{ paddingTop: 10, paddingRight: 10 }} />
                            <View style={{ marginLeft: 5 }}>
                                <Text style={{ fontWeight: 'bold', fontSize: 18 }}>Kiểm duyệt comment chữ hán </Text>
                                <View style={{ flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: '#e6e6e6', paddingBottom: 5 }}>
                                    <Text style={{ fontWeight: 'bold', fontSize: 40, marginTop: -30, color: '#00bfff' }}>.</Text>
                                    <Text>1 new days</Text>
                                </View>
                            </View>
                        </View>
                    </View>

                    <View style={{ flexDirection: 'row', paddingRight: 10, paddingLeft: 10, paddingBottom: 10 }}>
                        <Octicons name={'report'} size={29} color={'black'} style={{ paddingTop: 10, paddingRight: 10 }} />
                        <View style={{ marginLeft: 5 }}>
                            <Text style={{ fontWeight: 'bold', fontSize: 18 }}>Nội dung bị báo cáo</Text>
                            <View style={{ flexDirection: 'row', paddingBottom: 5, borderBottomWidth: 1, borderBottomColor: '#e6e6e6' }}>
                                <Text style={{ fontWeight: 'bold', fontSize: 40, marginTop: -30, color: '#00bfff' }}>.</Text>
                                <Text>1 new days</Text>
                            </View>
                        </View>
                    </View>


                </View>
            </View>
            <View style={{ borderBottomWidth: 1, borderBottomColor: '#d9d9d9ed', paddingTop: 30 }}></View>
            <View style={{ marginTop: 20 }}>
                <View style={{ marginBottom: 20 }}>
                    <Text style={{ fontWeight: 'bold', fontSize: 20 }}>Lối tắt đến công cụ</Text>
                </View>
                <View style={{ marginLeft: 5 }}>

                    <TouchableOpacity 
                    onPress={() => navigation.navigate("MemberScreen", { navigation: navigation })}
                    style={{ flexDirection: 'row', padding: 10, backgroundColor: '#fff' }}>
                        <Ionicons
                            name={'people-sharp'} size={29} color={'black'} style={{ paddingRight: 10 }} />
                        <Text style={{ fontWeight: 'bold', fontSize: 18, padding: 5 }}>Mọi người</Text>
                    </TouchableOpacity>

                    <View style={{ flexDirection: 'row', padding: 10, backgroundColor: '#fff', marginTop: 10 }}>
                        <Icon name={'time-sharp'} size={29} color={'black'} style={{ paddingRight: 10 }} />
                        <Text style={{ fontWeight: 'bold', fontSize: 18, padding: 5 }}>Nhật ký hoạt động</Text>
                    </View>


                </View>
            </View>
        </View>
    )
}

export default ManageStack;