import React, { Component, useEffect, useState } from 'react'
import { Text, View, SafeAreaView, ScrollView, TouchableOpacity, Image, Alert, StyleSheet, Dimensions, TextInput } from 'react-native'
import { useDispatch, useSelector } from 'react-redux';
import { useTheme } from 'react-native-paper';
import Octicons from 'react-native-vector-icons/Octicons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/Ionicons';
import Iconss from 'react-native-vector-icons/MaterialCommunityIcons';
import CustomHeader from '../../CustomHeader';
import CheckBox from '@react-native-community/checkbox';
import Modal from 'react-native-modal'; // 2.4.0
import { RadioButton } from 'react-native-paper';
import AntDesign from 'react-native-vector-icons/AntDesign';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import axios from 'axios';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

const AssetsComment = ({ navigation }) => {
    const [isVisibleSort, setisVisibleSort] = useState(false);
    const [chooseTab, setChooseTab] = useState(1);
    const [isNew, setisNew] = useState('unchecked');
    const [isOld, setisOld] = useState('checked');
    var last = new Date();
    const allCommentWord = useSelector(state => state.commentReducer.allCommentWord);
    const [dataCommentWord, setDataCommentWord] = useState(allCommentWord);
    const [checkAll, setCheckAll] = useState(false);
    const [searchName, setSearchName] = useState("");
    const [searchRequire, setSearchRequire] = useState(false);
    const [searching, setSearching] = useState(false);
    const [filtered, setFiltered] = useState(dataCommentWord)

    // useEffect(() => {
    //     setSearchName(false);
    //     setSearchRequire(false);
    //     setSearching(false);
    // }, []);
    useEffect(() => {
        
        // const data = chooseTab === 2 ? dataWordComment.filter(e => e.review === 1) :
        //     chooseTab === 3 ? dataPost.filter(e => e.review === 0) :
        //         dataPost.filter(e => e.review === 2);
        if (dataCommentWord.every(p => !p.checked)) {
            setCheckAll(false);
        }
        if (dataCommentWord.some(p => p.checked)) {
            setCheckAll(true);
        }
        if (searching === true)  {      
            if (filtered.every(p => !p.checked)) {
                setCheckAll(false);
            }
            if (filtered.some(p => p.checked)) {
                setCheckAll(true);
            }

        }

    }, [dataCommentWord, checkAll, filtered]);
    const toggleSwitchisNew = () => {
        if (isNew === 'unchecked') {
            dataCommentWord.sort(function (a, b) {
                return new Date(b.time) - new Date(a.time);
            })
            setisNew('checked');
            setisOld('unchecked');
        }
    }
    const toggleSwitchisOld = () => {
        if (isOld === 'unchecked') {
            dataCommentWord.sort(function (a, b) {
                return new Date(a.time) - new Date(b.time);
            })
            setisNew('unchecked');
            setisOld('checked');
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
    const onSearchComment = (text) => {
        setSearchName(text);
        if (text) {
            setSearching(true);
            const tempList = dataCommentWord.filter(item => {
                if (item.review === 2 && item.content.match(text.toLowerCase()))
                    return item
            })
            setFiltered(tempList)
        }
        else {
            setSearching(false)
            setFiltered(dataCommentWord.filter(e => e.review === 2));
        }
    }
    const acceptComment = (element) => {
        const list = [];
        if (element._id !== undefined) {
            const objIndex = dataCommentWord.findIndex(e => e._id === element._id);
            if (objIndex !== -1) {
                list.push(element._id);
                dataCommentWord[objIndex].review = 1;
                dataCommentWord[objIndex].checked = false;
                setDataCommentWord([...dataCommentWord]);

            }
        }
        else {

            const post = dataCommentWord.filter(e => e.checked === true);
            for (var i = 0; i < post.length; i++) {
                list.push(post[i]._id);
                dataCommentWord[dataCommentWord.map(function (e) { return e._id; }).indexOf(post[i]._id)].review = 1;
                dataCommentWord[dataCommentWord.map(function (e) { return e._id; }).indexOf(post[i]._id)].checked = false;
                setDataCommentWord([...dataCommentWord]);
            }

        }

        axios.post('http://192.168.1.72:3002/language/accpetComment', {
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

        axios.post('http://192.168.1.72:3002/language/sendNotiToDeviceAsset', {
            "list_user": list,
            "action": "phê duyệt",
            "noti": "comment",
            "type": "word",
            "username": "Quản trị viên"

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

    const refuseComment = (element) => {
        const list = [];
        if (element._id !== undefined) {
            const objIndex = dataCommentWord.findIndex(e => e._id === element._id);
            if (objIndex !== -1) {
                list.push(element._id);
                dataCommentWord[objIndex].review = 0;
                dataCommentWord[objIndex].checked = false;
                setDataCommentWord([...dataCommentWord]);

            }
        }
        else {

            const post = dataCommentWord.filter(e => e.checked === true);
            for (var i = 0; i < post.length; i++) {
                list.push(post[i]._id);
                dataCommentWord[dataCommentWord.map(function (e) { return e._id; }).indexOf(post[i]._id)].review = 0;
                dataCommentWord[dataCommentWord.map(function (e) { return e._id; }).indexOf(post[i]._id)].checked = false;
                setDataCommentWord([...dataCommentWord]);
            }

        }

        axios.post('http://192.168.1.72:3002/language/refuseComment', {
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
    return (
        <View style={{ flex: 1 }}>
            <CustomHeader title={"Xem xét"} navigation={navigation} />
            <View style={{ flex: 1 }}>
                <View style={{ padding: 10, borderBottomWidth: 1, borderBottomColor: '#e6e6e6' }}>

                    {
                        searchRequire === true ?
                            <View style={{ flexDirection: 'row' }}>
                                <TextInput
                                    style={{ borderWidth: 1, borderColor: '#e6e6e6', borderRadius: 40, width: '90%', paddingTop: 5, paddingBottom: 5, paddingLeft: 10 }}
                                    placeholder={"Tìm kiếm nội dung bài viết"}
                                    value={searchName}
                                    onChangeText={(text) => onSearchComment(text)}
                                />
                                <TouchableOpacity
                                    onPress={() => { setSearchRequire(false); setSearching(false) }}
                                    style={{ padding: 10, paddingTop: 15 }}>
                                    <Text style={{ color: '#3333ff' }}>HỦY</Text>
                                </TouchableOpacity>
                            </View>
                            :
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <View>
                                    <Text style={{ fontWeight: 'bold', fontSize: 20 }}>Comment đợi xác nhận: {dataCommentWord.filter(e => e.review === 2).length}</Text>
                                    <Text style={{ fontSize: 15, color: 'gray' }}>Đang xem theo cũ nhất trước</Text>
                                </View>
                                <EvilIcons name={'search'} size={29}
                                    onPress={() => setSearchRequire(true)
                                    }
                                // style={{ padding: 10 }}
                                />
                            </View>
                    }
                    <View style={{ flexDirection: 'row', paddingTop: 20, paddingBottom: 10 }}>
                        <CheckBox
                            // style={styles.checkbox}
                            value={checkAll}
                            onValueChange={() => {
                                setCheckAll(!checkAll);
                                setDataCommentWord(dataCommentWord.map(p => ({ ...p, checked: !checkAll })))
                            }}
                        />

                        <TouchableOpacity
                            onPress={() => setisVisibleSort(true)}
                            style={{ marginLeft: 20, flexDirection: 'row', backgroundColor: '#f2f2f2', padding: 5, paddingLeft: 10, paddingRight: 10 }}>
                            <Iconss name={'sort'} size={25} color={'black'} />
                            <Text style={{ marginTop: 5, marginLeft: 5 }}>Sắp xếp</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <ScrollView style={{ backgroundColor: '#f2f2f2' }}>
                    {
                        (searching === true ? filtered : dataCommentWord.filter(e => e.review === 2)).map((element, key) => {
                            return (
                                <View key={key} style={{ backgroundColor: '#fff', marginTop: 10, paddingTop: 10, paddingLeft: 10 }}>
                                    <View style={{ flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: '#e6e6e6' }}>
                                        <CheckBox
                                            value={element.checked}
                                            onValueChange={() => {
                                                if (searching === true && filtered.length !== 0) {
                                                    setFiltered(
                                                        filtered.map(p => {
                                                            if (p._id === element._id) {
                                                                return { ...p, checked: !p.checked }
                                                            }
                                                            return p;
                                                        })


                                                    );
                                                }
                                                else {
                                                    setDataCommentWord(
                                                        dataCommentWord.map(p => {
                                                            if (p._id === element._id) {
                                                                return { ...p, checked: !p.checked }
                                                            }
                                                            return p;
                                                        })


                                                    );
                                                }
                                            }}
                                        />
                                        <View style={{ marginLeft: 10, }}>
                                            <View style={{ justifyContent: 'center' }}>
                                                <Text>{element.word_id.word}</Text>
                                                <View style={{ flexDirection: 'row' }}>
                                                    {element.word_id.translate !== undefined ? <Text>[{element.word_id.translate}]</Text> : null}
                                                    {element.word_id.amhan !== undefined ? <Text>[{element.word_id.amhan}]</Text> : null}
                                                </View>
                                            </View>
                                            <View style={{ width: WIDTH - 50, marginTop: 10 }}>
                                                <View style={{}}>
                                                    <Text>{element.content}</Text>

                                                </View>
                                                <View style={{ flexDirection: 'row', justifyContent: 'flex-end', marginTop: 5, marginRight: 10, marginBottom: 20 }}>
                                                    <Text>{element.user_id.username}</Text>
                                                    <Text>({time(new Date(element.time))})</Text>
                                                </View>

                                            </View>
                                        </View>
                                        <View />

                                    </View>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 15, marginBottom: 15 }}>
                                        <TouchableOpacity
                                            onPress={() => acceptComment(element)}
                                            style={{ backgroundColor: '#e6f0ff', paddingTop: 5, paddingBottom: 5, paddingLeft: 20, paddingRight: 20 }}>
                                            <Text style={{ color: '#3333ff' }}>Phê duyệt</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            onPress={() => refuseComment(element)}
                                            style={{ backgroundColor: '#e6e6e6', paddingTop: 5, paddingBottom: 5, paddingLeft: 20, paddingRight: 20 }}>
                                            <Text style={{}}>Từ chối</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            )
                        })
                    }


                </ScrollView>
                {checkAll && <View style={{ borderTopWidth: 1, borderTopColor: '#e6e6e6' }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 15, marginBottom: 15 }}>
                        <TouchableOpacity
                            onPress={() => acceptComment({})}
                            style={{ backgroundColor: '#e6f0ff', paddingTop: 5, paddingBottom: 5, paddingLeft: 20, paddingRight: 20 }}>
                            <Text style={{ color: '#3333ff' }}>Phê duyệt</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => refuseComment({})}
                            style={{ backgroundColor: '#e6e6e6', paddingTop: 5, paddingBottom: 5, paddingLeft: 20, paddingRight: 20 }}>
                            <Text style={{}}>Từ chối</Text>
                        </TouchableOpacity>
                    </View>
                </View>}

            </View>
            <Modal
                isVisible={isVisibleSort}
                swipeDirection="down"
                style={{ justifyContent: 'flex-end', margin: 0, }}
                onRequestClose={() => setisVisibleShare(false)}
                deviceWidth={WIDTH}
                deviceHeight={HEIGHT}
            >
                <View style={styles.modalContent}>
                    <View style={{ borderBottomWidth: 1, borderBottomColor: '#e6e6e6', flexDirection: 'row', justifyContent: 'space-between', }}>
                        <AntDesign name={'close'} size={20}
                            onPress={() => setisVisibleSort(false)}
                            style={{ padding: 10 }} />
                        <View style={{ paddingTop: 10 }}>
                            <Text>Sắp xếp theo</Text>
                        </View>
                        <View />
                    </View>
                    <View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Text style={{ padding: 10 }}>Mới nhất trước</Text>
                            <RadioButton
                                status={isNew}
                                onPress={() => toggleSwitchisNew()}
                            />
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Text style={{ padding: 10 }}>Cũ nhất trước</Text>
                            <RadioButton
                                status={isOld}
                                onPress={() => toggleSwitchisOld()}
                            />
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    )
}

export default AssetsComment;
const styles = StyleSheet.create({
    container: {
        width: WIDTH,
    },
    modalContent: {
        backgroundColor: 'white',
        borderRadius: 4,
        borderColor: 'rgba(0, 0, 0, 0.1)',
    },
})