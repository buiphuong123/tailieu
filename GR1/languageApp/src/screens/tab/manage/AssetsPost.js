import React, { Component, useEffect, useState } from 'react'
import { Text, View, SafeAreaView, ScrollView, TouchableOpacity, Image, Alert, StyleSheet, Dimensions, TextInput } from 'react-native'
import { useDispatch, useSelector } from 'react-redux';
import { useTheme } from 'react-native-paper';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/Ionicons';
import Iconss from 'react-native-vector-icons/MaterialCommunityIcons';
import CustomHeader from '../../CustomHeader';
import CheckBox from '@react-native-community/checkbox';
import Modal from 'react-native-modal'; // 2.4.0
import AntDesign from 'react-native-vector-icons/AntDesign';
import { RadioButton } from 'react-native-paper';
import RenderHtml from 'react-native-render-html';
import axios from 'axios';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

const AssetPost = ({ navigation }) => {
    const [isVisibleSort, setisVisibleSort] = useState(false);
    const [chooseTab, setChooseTab] = useState(1);
    const [isNew, setisNew] = useState('unchecked');
    const [isOld, setisOld] = useState('checked');
    const [searchRequire1, setSearchRequire1] = useState(false);
    const [searchRequire2, setSearchRequire2] = useState(false);
    const [searchRequire3, setSearchRequire3] = useState(false);
    const [checkAll, setCheckAll] = useState(false);
    const [checked, setChecked] = useState(checkAll);
    const listPost = useSelector(state => state.postReducer.listPost);
    const [dataPost, setDataPost] = useState(listPost.map(p => ({ ...p, checked: false })));
    const last = new Date();
    const [filtered, setFiltered] = useState(dataPost)
    const [searchName, setSearchName] = useState("");
    const [searching, setSearching] = useState(false);
    const [searchNametab1, setSearchNametab1] = useState("");
    const [searchNametab2, setSearchNametab2] = useState("");
    const [searchNametab3, setSearchNametab3] = useState("");
    const [searching1, setSearching1] = useState(false);
    const [searching2, setSearching2] = useState(false);
    const [searching3, setSearching3] = useState(false);
    const toggleSwitchisNew = () => {
        if (isNew === 'unchecked') {
            dataPost.sort(function (a, b) {
                return new Date(b.time) - new Date(a.time);
            })
            setisNew('checked');
            setisOld('unchecked');
        }
    }
    const toggleSwitchisOld = () => {
        if (isOld === 'unchecked') {
            dataPost.sort(function (a, b) {
                return new Date(a.time) - new Date(b.time);
            })
            setisNew('unchecked');
            setisOld('checked');
        }
    }
    useEffect(() => {
        const data = chooseTab === 2 ? dataPost.filter(e => e.review === 1) :
            chooseTab === 3 ? dataPost.filter(e => e.review === 0) :
                dataPost.filter(e => e.review === 2);
        if (data.every(p => !p.checked)) {
            setCheckAll(false);
        }
        if (data.some(p => p.checked)) {
            setCheckAll(true);
        }

    }, [chooseTab, dataPost, checkAll]);
    const timeMath = (dt) => {
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
    const acceptPost = (element) => {
        const list = [];
        if (element._id !== undefined) {
            const objIndex = dataPost.findIndex(e => e._id === element._id);
            if (objIndex !== -1) {
                list.push(element._id);
                dataPost[objIndex].review = 1;
                dataPost[objIndex].checked = false;
                setDataPost([...dataPost]);

            }
        }
        else {

            const post = dataPost.filter(e => e.checked === true);
            console.log(post.length);
            for (var i = 0; i < post.length; i++) {
                list.push(post[i]._id);
                dataPost[dataPost.map(function (e) { return e._id; }).indexOf(post[i]._id)].review = 1;
                dataPost[dataPost.map(function (e) { return e._id; }).indexOf(post[i]._id)].checked = false;
                setDataPost([...dataPost]);
            }

        }
        // dataPost.map(function(x) { 
        //     x.checked = false; 
        //     return x
        //   });
        // setDataPost([...dataPost]);
        axios.post('http://192.168.1.72:3002/language/acceptPost', {
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
                "noti": "post",
                "type": "post",
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
    const refusePost = (element) => {
        const list = [];
        if (element._id !== undefined) {
            const objIndex = dataPost.findIndex(e => e._id === element._id);
            if (objIndex !== -1) {
                list.push(element._id);
                dataPost[objIndex].checked = false;
                dataPost[objIndex].review = 0;
                console.log(dataPost[objIndex]);
                setDataPost([...dataPost]);

            }
        }
        else {

            const post = dataPost.filter(e => e.checked === true);
            console.log(post.length);
            for (var i = 0; i < post.length; i++) {
                list.push(post[i]._id);
                dataPost[dataPost.map(function (e) { return e._id; }).indexOf(post[i]._id)].review = 0;
                dataPost[dataPost.map(function (e) { return e._id; }).indexOf(post[i]._id)].checked = false;
                setDataPost([...dataPost]);
            }

        }

        // setDataPost([...dataPost]);
        // dataPost.map(function(x) { 
        //     x.checked = false; 
        //     return x
        //   });
        axios.post('http://192.168.1.72:3002/language/refusePost', {
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

    const onSearchAccept = (text) => {
        setSearchNametab2(text);
        if (text) {
            setSearching2(true);

            const tempList = dataPost.filter(item => {
                if (item.review === 1 && item.content.html.match(text.toLowerCase()))
                    return item
            })
            setFiltered(tempList)
        }

        else {
            setSearching2(false)
            setFiltered(dataPost.filter(e => e.review ===1));
        }

    }
    const onSearchRefuse = (text) => {
        setSearchNametab3(text);
        if (text) {
            setSearching3(true);

            const tempList = dataPost.filter(item => {
                if (item.review === 0 && item.content.html.match(text.toLowerCase()))
                    return item
            })
            setFiltered(tempList)
        }

        else {
            setSearching3(false)
            setFiltered(dataPost.filter(e => e.review ===0));
        }

    }
    const onSearchPostNotReview = (text) => {
        setSearchNametab1(text);
        if (text) {
            setSearching1(true);
            const tempList = dataPost.filter(item => {
                if (item.review === 2 && item.content.html.match(text.toLowerCase()))
                    return item
            })
            setFiltered(tempList)
        }

        else {
            setSearching1(false)
            setFiltered(dataPost.filter(e => e.review ===2));
        }
    }
    const requireSearch = () => {
        if(chooseTab ===1) {
            setSearchRequire1(true);
        }
        else if(chooseTab ===2) {
            setSearchRequire2(true);
        }
        else {
            setSearchRequire3(true);
        }
    }
    const notrequireSearch = () => {
        if(chooseTab ===1) {
            setSearchRequire1(false);
        }
        else if(chooseTab ===2) {
            setSearchRequire2(false);
        }
        else {
            setSearchRequire3(false);
        }
    }
    return (
        <View style={{ flex: 1 }}>
            <CustomHeader title={"Bài viết cần xem xét"} navigation={navigation} />
            <View style={{ flex: 1 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-around', padding: 10, borderBottomWidth: 1, borderBottomColor: '#e6e6e6' }}>
                    <TouchableOpacity
                        onPress={() => setChooseTab(1)}
                        style={{ padding: 10, backgroundColor: chooseTab === 1 ? '#e6f0ff' : '#fff', borderRadius: 30 }}>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{ color: chooseTab === 1 ? '#3333ff' : 'gray' }}>Chưa duyệt</Text>
                            <Text style={{ marginLeft: 5, color: chooseTab === 1 ? '#3333ff' : 'gray' }}>{dataPost.filter(e => e.review === 2).length}</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => setChooseTab(2)}
                        style={{ padding: 10, backgroundColor: chooseTab === 2 ? '#e6f0ff' : '#fff', borderRadius: 30 }}>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{ color: chooseTab === 2 ? '#3333ff' : 'gray' }}>Chấp nhận</Text>
                            <Text style={{ marginLeft: 5, color: chooseTab === 2 ? '#3333ff' : 'gray' }}>{dataPost.filter(e => e.review === 1).length}</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => setChooseTab(3)}
                        style={{ padding: 10, backgroundColor: chooseTab === 3 ? '#e6f0ff' : '#fff', borderRadius: 30 }}>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{ color: chooseTab === 3 ? '#3333ff' : 'gray' }}>Từ chối</Text>
                            <Text style={{ marginLeft: 5, color: chooseTab === 3 ? '#3333ff' : 'gray' }}>{dataPost.filter(e => e.review === 0).length}</Text>
                        </View>
                    </TouchableOpacity>
                </View>


                <View style={{ padding: 10, borderBottomWidth: 1, borderBottomColor: '#e6e6e6' }}>
                    {
                        searchRequire1 === true && chooseTab ===1?
                            <View style={{ flexDirection: 'row' }}>
                                <TextInput
                                    style={{ borderWidth: 1, borderColor: '#e6e6e6', borderRadius: 40, width: '90%', paddingTop: 5, paddingBottom: 5, paddingLeft: 10 }}
                                    placeholder={"Tìm kiếm nội dung bài viết"}
                                    value={searchNametab1}
                                    onChangeText={(text) =>  onSearchPostNotReview(text) }
                                />
                                <TouchableOpacity
                                    onPress={() => setSearchRequire1(false)}
                                    style={{ padding: 10, paddingTop: 15 }}>
                                    <Text style={{ color: '#3333ff' }}>HỦY</Text>
                                </TouchableOpacity>
                            </View>
                            :
                            searchRequire2 === true && chooseTab ===2?
                            <View style={{ flexDirection: 'row' }}>
                                <TextInput
                                    style={{ borderWidth: 1, borderColor: '#e6e6e6', borderRadius: 40, width: '90%', paddingTop: 5, paddingBottom: 5, paddingLeft: 10 }}
                                    placeholder={"Tìm kiếm nội dung bài viết"}
                                    value={searchNametab2}
                                    onChangeText={(text) =>  onSearchAccept(text) }
                                />
                                <TouchableOpacity
                                    onPress={() => setSearchRequire2(false)}
                                    style={{ padding: 10, paddingTop: 15 }}>
                                    <Text style={{ color: '#3333ff' }}>HỦY</Text>
                                </TouchableOpacity>
                            </View>
                            :
                            searchRequire3 === true && chooseTab ===3?
                            <View style={{ flexDirection: 'row' }}>
                                <TextInput
                                    style={{ borderWidth: 1, borderColor: '#e6e6e6', borderRadius: 40, width: '90%', paddingTop: 5, paddingBottom: 5, paddingLeft: 10 }}
                                    placeholder={"Tìm kiếm nội dung bài viết"}
                                    value={searchNametab3}
                                    onChangeText={(text) =>  onSearchRefuse(text) }
                                />
                                <TouchableOpacity
                                    onPress={() => setSearchRequire3()}
                                    style={{ padding: 10, paddingTop: 15 }}>
                                    <Text style={{ color: '#3333ff' }}>HỦY</Text>
                                </TouchableOpacity>
                            </View>
                            :
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <View>
                                    {chooseTab === 1 && <Text style={{ fontWeight: 'bold', fontSize: 20 }}>Đang chờ: {dataPost.filter(e => e.review === 2).length}</Text>}
                                    {chooseTab === 2 && <Text style={{ fontWeight: 'bold', fontSize: 20 }}>Chấp nhận: {dataPost.filter(e => e.review === 1).length}</Text>}
                                    {chooseTab === 3 && <Text style={{ fontWeight: 'bold', fontSize: 20 }}>Từ chối: {dataPost.filter(e => e.review === 0).length}</Text>}

                                    <Text style={{ fontSize: 15, color: 'gray' }}>Đang xem theo cũ nhất trước</Text>
                                </View>
                                <EvilIcons name={'search'} size={29}
                                    onPress={() => requireSearch()
                                    }
                                // style={{ padding: 10 }}
                                />
                            </View>

                    }

                    <View style={{ flexDirection: 'row', paddingTop: 20, paddingBottom: 10 }}>
                        {chooseTab === 1 &&
                            <CheckBox
                                // style={styles.checkbox}
                                value={checkAll}
                                onValueChange={() => {
                                    setCheckAll(!checkAll);
                                    setDataPost(dataPost.map(p => ({ ...p, checked: !checkAll })))
                                }}
                            />
                        }
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
                        // (searching === true? filtered: chooseTab === 2 ? dataPost.filter(e => e.review === 1) :
                        //     chooseTab === 3 ? dataPost.filter(e => e.review === 0) :
                        //         dataPost.filter(e => e.review === 2)  )
                        (searching1 === true&&chooseTab===1|| searching2 === true&&chooseTab===2|| searching3 === true&&chooseTab===3 ? filtered : chooseTab === 2 ? dataPost.filter(e => e.review === 1) :
                            chooseTab === 3 ? dataPost.filter(e => e.review === 0) :
                                dataPost.filter(e => e.review === 2))
                            .map((element, key) => {
                                return (
                                    <View key={key} style={{ backgroundColor: '#fff', marginTop: 10, paddingTop: 10, paddingLeft: 10, borderBottomWidth: 1, borderBottomColor: '#e6e6e6' }}>
                                        <View>
                                            <View style={{ flexDirection: 'row', }}>
                                                {chooseTab === 1 &&
                                                    <CheckBox
                                                        value={element.checked}
                                                        onValueChange={() => setDataPost(
                                                            dataPost.map(p => {
                                                                if (p._id === element._id) {
                                                                    return { ...p, checked: !p.checked }
                                                                }
                                                                return p;
                                                            })
                                                        )}
                                                    />
                                                }
                                                <Image
                                                    style={{ height: 40, width: 40, borderRadius: 20, marginLeft: 10 }}
                                                    source={{
                                                        uri: 'data:image/jpeg;base64,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',
                                                    }}
                                                />
                                                <View style={{ marginLeft: 10 }}>
                                                    <Text>{element.user_id.username}</Text>
                                                    <Text>{timeMath(new Date(element.time))}</Text>
                                                </View>


                                            </View>
                                        </View>
                                        <View style={{ paddingTop: 20, paddingBottom: 10, paddingLeft: 10 }}>
                                            {
                                                element.dataVocuShare !== undefined ?
                                                    // <Text>{data.dataVocuShare}</Text>
                                                    <View style={{ flexDirection: 'row' }}>
                                                        <Text>Bộ từ vựng: </Text>
                                                        <TouchableOpacity onPress={() => detailVocuShare(element.dataVocuShare)}>
                                                            <Text style={{ color: 'blue', marginLeft: 5, fontStyle: 'italic' }}>Xem o day</Text>
                                                        </TouchableOpacity>
                                                    </View>
                                                    :
                                                    null

                                            }
                                            <View style={{ flexWrap: 'wrap' }}>
                                                {/* <Paragraph> */}
                                                <RenderHtml
                                                    contentWidth={WIDTH}
                                                    source={element.content}
                                                />
                                                {/* </Paragraph> */}
                                            </View>
                                        </View>

                                        {
                                            chooseTab === 1 || chooseTab === 0 ?
                                                <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 15, marginBottom: 15 }}>
                                                    <TouchableOpacity
                                                        onPress={() => acceptPost(element)}
                                                        style={{ backgroundColor: '#e6f0ff', paddingTop: 5, paddingBottom: 5, paddingLeft: 20, paddingRight: 20 }}>
                                                        <Text style={{ color: '#3333ff' }}>Phê duyệt</Text>
                                                    </TouchableOpacity>
                                                    <TouchableOpacity
                                                        onPress={() => refusePost(element)}
                                                        style={{ backgroundColor: '#e6e6e6', paddingTop: 5, paddingBottom: 5, paddingLeft: 20, paddingRight: 20 }}>
                                                        <Text style={{}}>Từ chối</Text>
                                                    </TouchableOpacity>
                                                </View>
                                                :
                                                null
                                        }
                                    </View>
                                )
                            })
                    }

                </ScrollView>
                {checkAll && chooseTab === 1 && <View style={{ borderTopWidth: 1, borderTopColor: '#e6e6e6' }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 15, marginBottom: 15 }}>
                        <TouchableOpacity
                            onPress={() => acceptPost({})}
                            style={{ backgroundColor: '#e6f0ff', paddingTop: 5, paddingBottom: 5, paddingLeft: 20, paddingRight: 20 }}>
                            <Text style={{ color: '#3333ff' }}>Phê duyệt</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => refusePost({})}
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

export default AssetPost;

const styles = StyleSheet.create({
    container: {
        width: WIDTH,
        flex: 1,
    },
    modalContent: {
        backgroundColor: 'white',
        borderRadius: 4,
        borderColor: 'rgba(0, 0, 0, 0.1)',
    },
})