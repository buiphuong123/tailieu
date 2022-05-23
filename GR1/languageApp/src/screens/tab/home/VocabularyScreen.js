import React, { Component, useEffect, useState } from 'react'
import { Text, View, SafeAreaView, TouchableOpacity, Alert, StyleSheet, Dimensions, TextInput } from 'react-native'
import { useDispatch, useSelector } from 'react-redux';
import { useTheme } from 'react-native-paper';
import Icons from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Icon from 'react-native-vector-icons/Ionicons';
import Iconss from 'react-native-vector-icons/MaterialCommunityIcons';
import { element } from 'prop-types';
import { Card, Avatar, Button } from 'react-native-paper';
import Modal from 'react-native-modal'; // 2.4.0
import { getListVocaSuccess } from '../../../redux/actions/vocabulary.action';
import axios from 'axios';

const WIDTH = Dimensions.get('window').width;

const VocabularyScreen = ({navigation}) => {
    const { colors } = useTheme();
    const [isVisibleAdd, setisVisibleAdd] = useState(false);
    const [isVisibleEdit, setisVisibleEdit] = useState(false);
    const [currentElement, setCurrentElement] = useState({});
    const [newVocu, setNewVocu] = useState("");
    const [isVisibleDelete, setisVisibleDelete] = useState(false);
    const [name, setName] = useState("");
    const users = useSelector(state => state.userReducer.user);
    const colorBack = ["#0000b3", "#005ce6", "#ff9900", "#00b300", "#e67300"];
    const vocabulary = useSelector(state => state.vocabularyReducer.vocabularyList);
    const date = new Date();
    // const vocabulary = [
    //     {
    //         "data": [
    //             {
    //                 "kaka": 1,
    //                 "momo": "sorry"
    //             }
    //         ],
    //         "share": [],
    //         "_id": "627e9c984a90e22e08c12169",
    //         "name": "bo dong vat",
    //         "user_id": "61590bbd7463724428b252d2",
    //         "date": "2022-05-13T17:59:52.620Z",
    //         "__v": 0
    //     },
    //     {
    //         "data": [
    //             {
    //                 "kaka": 2,
    //                 "momo": "huhu"
    //             }
    //         ],
    //         "share": [],
    //         "_id": "627e9c984a90e22e08c12168",
    //         "name": "kaka",
    //         "user_id": "61590bbd7463724428b252d2",
    //         "date": "2022-05-13T17:59:52.620Z",
    //         "__v": 0
    //     },
    // ];
    const [dataList, setDataList] = useState(vocabulary);
    // useEffect(() => {
    //     setDataList(vocabulary);
    //     console.log('VOCUBALRY LUC NAY LA ', vocabulary);
    // }, []);
    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            setDataList(vocabulary);
          //Put your Data loading function here instead of my loadData()
        });
    
        return unsubscribe;
      }, [navigation]);
    

    const createVoca = () => {
        axios.post('http://192.168.1.72:3002/language/createVocabulary', {
            "user_id": users._id,
            "name": name,
            // "dataElement": vocabulary,
            "date": date
        }, {
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            }
        })
            .then((response) => {
                console.log(response.data);
                setDataList(dataList.concat(response.data.vocabulary));
            })
            .catch(function (error) {
                throw error;
            })
            setisVisibleAdd(false);
    }
    const listVoca = (element) => {
        navigation.navigate("ListWordVocabulary", {navigation: navigation, listdata: element});
    }
    const editVocaAction = (element) => {
        setNewVocu(element.name);
        setCurrentElement(element);
        setisVisibleEdit(true);
    }
    const editVoca = () => {
        if (currentElement.name === newVocu || newVocu === '') {
            return;
        }
        else {
            const objectIndex = dataList.findIndex(e => e._id === currentElement._id);
            if (objectIndex === -1) {

            }
            console.log('OBJ INDEX DAY NE', objectIndex);
            dataList[objectIndex].name = newVocu;
            dataList[objectIndex].date = date;
            setDataList([...dataList]);
            getListVocaSuccess(dataList);
            axios.post('http://192.168.1.72:3002/language/editVocabulary', {
                "id": currentElement._id,
                "name": newVocu,
                // "dataElement": vocabulary,
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
        setisVisibleEdit(false);
    }

    const deleteVocu = (element) => {
        Alert.alert(
            "Delete",
            "Want to delete" + element.name + "?",
            [
              {
                text: "Cancel",
                onPress: () => console.log("Cancel Pressed"),
                style: "cancel"
              },
              { text: "OK", onPress: () => {
                const objectIndex = dataList.findIndex(e => e._id === element._id);
            if(objectIndex !== -1) {
                dataList.splice(objectIndex, 1);
                setDataList([...dataList]);

                axios.post('http://192.168.1.72:3002/language/deleteVocabulary', {
                "id": element._id,
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
              } }
            ]
        )
        // var result = confirm("Want to delete " + element.name + "?");
        // if (result) {
        //     const objectIndex = dataList.findIndex(e => e._id === element._id);
        //     if(objectIndex !== -1) {
        //         dataList.splice(objectIndex, 1);
        //         setDataList([...dataList]);

        //         axios.post('http://192.168.1.72:3002/language/deleteVocabulary', {
        //         "id": element._id,
        //     }, {
        //         headers: {
        //             "Accept": "application/json",
        //             "Content-Type": "application/json"
        //         }
        //     })
        //         .then((response) => {
        //             console.log(response.data);
        //         })
        //         .catch(function (error) {
        //             throw error;
        //         })
        //     }
        // }
    }

    const fixDigit = (val) => {
        return (val < 10 ? '0' : '') + val;
    }

    return (
        <View style={{ flex: 1 }}>
            <View style={{ flexDirection: 'row', height: 50, backgroundColor: '#009387', justifyContent: 'space-evenly' }}>
                <View style={{ flex: 1, justifyContent: 'center' }}>
                    <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }} onPress={() => navigation.goBack()}>
                        <Icon name={'arrow-back'} size={29} style={{ color: colors.text, marginLeft: 5 }} />
                    </TouchableOpacity>
                </View>
                <View style={{ flex: 1.5, justifyContent: 'center' }}>
                    <Text style={{ textAlign: 'center', color: colors.text, fontSize: 18 }}>Sổ tay</Text>
                </View>
                <View style={{ flexDirection: 'row', marginRight: 20 }}>
                    <TouchableOpacity style={{ justifyContent: 'center' }} onPress={() => action()}>
                        <Icons name={"clouddownloado"} size={29} style={{ color: '#fff' }} />
                    </TouchableOpacity>
                    <TouchableOpacity style={{ justifyContent: 'center', marginLeft: 20 }} onPress={() => setisVisibleAdd(true)}>
                        <MaterialIcons name={"add-box"} size={29} style={{ color: '#fff' }} />
                    </TouchableOpacity>
                    <TouchableOpacity style={{ justifyContent: 'center', marginRight: 10, marginLeft: 20 }} onPress={() => action()}>
                        <Iconss name={"sort-bool-ascending"} size={29} style={{ color: '#fff' }} />
                    </TouchableOpacity>
                </View>
            </View>
            <View>
                {
                    vocabulary.length === 0 ?
                        <View style={{ padding: 20 }}>
                            <Text>Gợi ý </Text>
                            <Text>- Nhấn nút dấu "+" góc trên bên phải để thêm nhóm từ mới.</Text>
                            <Text>- Bên cạnh nhóm từ có nút đẻ sửa xóa nhóm từ
                            </Text>
                        </View>
                        :
                        <View>
                            {
                                dataList.map((element, key) => {
                                    return (
                                        <TouchableOpacity key={key} onPress={() => listVoca(element)}>
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
                                                        <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                                                            <TouchableOpacity onPress={() => editVocaAction(element)}>
                                                                <Icons name={'edit'} size={20} style={{ color: 'black' }} />
                                                            </TouchableOpacity>
                                                            <TouchableOpacity style={{ marginLeft: 10 }} onPress={() => deleteVocu(element)}>
                                                                <Iconss name={'delete-outline'} size={20} style={{ color: 'red' }} />
                                                            </TouchableOpacity>
                                                        </View>
                                                    </View>
                                                    <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                                                        <Text>{new Date(element.date).getFullYear() + '/'+ fixDigit(new Date(element.date).getMonth()) +'/'+ fixDigit(new Date(element.date).getDate())}</Text>
                                                    </View>
                                                </Card.Content>
                                            </Card>
                                        </TouchableOpacity>
                                    )
                                })
                            }
                        </View>
                }
            </View>

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

                    </View>
                </Modal>
            </View>
            {/* model edit vocabulary */}
            <View style={styles.container}>
                <Modal
                    isVisible={isVisibleEdit}
                    animationInTiming={1000}
                    animationOutTiming={1000}
                    backdropTransitionInTiming={1000}
                    backdropTransitionOutTiming={1000}
                    deviceWidth={WIDTH}
                >
                    <View style={[styles.modalContent, { marginTop: 50, minHeight: 170 }]}>
                        <View style={{ padding: 15 }}>
                            <Text style={{ fontWeight: 'bold', fontSize: 20 }}>Sửa nhóm từ</Text>
                            <TextInput
                                style={{ borderBottomWidth: 1, borderBottomColor: '#80b3ff', alignItems: 'center', justifyContent: 'center' }}
                                placeholder="Nhập nhóm từ cần lưu"
                                value={newVocu}
                                onChangeText={text => setNewVocu(text)}
                            />
                            <View style={styles.stylebutton}>
                                <TouchableOpacity
                                    onPress={() => setisVisibleEdit(false)}
                                    style={[styles.keepStyle, { backgroundColor: '#999999', marginRight: 110 }]}>
                                    <Text style={{ color: '#fff' }}>Đóng</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={[styles.keepStyle, { backgroundColor: '#1a75ff', }]}
                                    onPress={() => editVoca()}
                                >
                                    <Text style={{ color: '#fff' }}>Sửa</Text>
                                </TouchableOpacity>
                            </View>

                        </View>

                    </View>
                </Modal>
            </View>



        </View>
    )
}
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

export default VocabularyScreen;