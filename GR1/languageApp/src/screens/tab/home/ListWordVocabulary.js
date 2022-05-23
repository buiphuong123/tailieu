import React, { Component, useEffect, useState } from 'react'
import { Text, View, SafeAreaView, TouchableOpacity, Alert, StyleSheet, Dimensions, TextInput } from 'react-native'
import { useDispatch, useSelector } from 'react-redux';
import { useTheme } from 'react-native-paper';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Icon from 'react-native-vector-icons/Ionicons';
import Icons from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Iconss from 'react-native-vector-icons/MaterialCommunityIcons';
import { TextInput as TextInputPaper } from 'react-native-paper';
import { element } from 'prop-types';
import { Card, Avatar, Button } from 'react-native-paper';
import Modal from 'react-native-modal'; // 2.4.0
import { getListVocaSuccess } from '../../../redux/actions/vocabulary.action';
import axios from 'axios';
import { color, not } from 'react-native-reanimated';
import SelectDropdown from 'react-native-select-dropdown';

const WIDTH = Dimensions.get('window').width;

const ListWordVocabulary = ({ navigation, route }) => {
    const { colors } = useTheme();
    const [searchRequire, setSearchRequire] = useState(false);
    const [nameSearch, setNameSearch] = useState("");
    const dispatch = useDispatch();
    const [isVisibleAdd, setisVisibleAdd] = useState(false);
    const users = useSelector(state => state.userReducer.user);
    const [wordD, setWordD] = useState("");
    const [spell, setSpell] = useState("");
    const [mean, setMean] = useState("");
    const [value, setValue] = useState("Từ vựng");
    const wordoptions = ["Từ vựng", "Hán tự", "Ngữ pháp"];
    const [note, setNote] = useState("");
    const { listdata } = route.params;
    const [word, setWord] = useState([]);
    const [newEdit, setNewEdit] = useState("");
    const dateCreate = new Date();

    const [currentElement, setCurrentElement] = useState({});
    const [isVisibleEdit, setisVisibleEdit] = useState(false);
    useEffect(() => {
        setWord(listdata);
    }, [listdata]);
    const editVocaAction = (element) => {
        setNewEdit(element.vn);
        setCurrentElement(element);
        setisVisibleEdit(true);
    }
    const createWordVoca = () => {
        var d = {};
        d.word = wordD;
        d.translate = spell;
        d.vn = mean;
        d.type = value;
        d.note = note;
        word.data.push(d);
        setWord({ ...word });
        axios.post('http://192.168.1.72:3002/language/createWordInVoca', {
            "id": word._id,
            "word": wordD,
            "translate": spell,
            "vn": mean,
            "note": note,
            "type": value,
            "date": dateCreate,
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
            setWordD("");
            setSpell("");
            setMean("");
            setValue("Từ vựng");
            setNote("");
        setisVisibleAdd(false);
    }
    const fixDigit = (val) => {
        return (val < 10 ? '0' : '') + val;
    }
    const editWordVoca = () => {
        const objIndex = word.data.findIndex(e => e.word === currentElement.word);
        console.log('OBJINDEX LA ', objIndex, word.data[objIndex].word, newEdit);
        if (objIndex !== -1) {
            word.data[objIndex].vn = newEdit;
            setWord({ ...word });
        }
        axios.post('http://192.168.1.72:3002/language/editWordInVoca', {
            "id": word._id,
            "name": currentElement.word,
            "newName": newEdit,
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
        setisVisibleEdit(false);
    }
    const deleteWordVocu = (element) => {
        Alert.alert(
            "Delete",
            "Want to delete" + element.word + "?",
            [
                {
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },
                {
                    text: "OK", onPress: () => {
                        const objectIndex = word.data.findIndex(e => e.word === element.word);
                        if (objectIndex === -1) {

                        }
                        else {
                            word.data.splice(objectIndex, 1);
                            setWord({ ...word });
                            axios.post('http://192.168.1.72:3002/language/deleteWordInVoca', {
                                "id": word._id,
                                "word": element.word
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
                }
            ]
        )
    }
    const moveDiffVocu = (element) => {
        navigation.navigate("MoveVocabulary", {navigation: navigation, dataword: element, word: word});
    }
    return (
        <View style={{ flex: 1 }}>
            <View style={{ flexDirection: 'row', height: 50, backgroundColor: '#009387', justifyContent: 'space-between' }}>
                <View style={{ justifyContent: 'center', flex: 1 }}>
                    <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }} onPress={() => navigation.goBack()}>
                        <Icon name={'arrow-back'} size={29} style={{ color: colors.text, marginLeft: 5 }} />
                    </TouchableOpacity>
                </View>
                {searchRequire === false ?
                    <View style={{ flexDirection: 'row', flex: 7, justifyContent: 'space-between' }}>
                        <View style={{ justifyContent: 'center', marginLeft: 10, paddingLeft: 10 }}>
                            <Text style={{ textAlign: 'center', color: colors.text, fontSize: 18 }}>{word.name}</Text>
                        </View>
                        <View style={{ flexDirection: 'row', paddingRight: 10 }}>

                            {word.length !== 0 ?
                                <TouchableOpacity style={{ justifyContent: 'center', marginLeft: 20, paddingRight: 10 }} onPress={() => setSearchRequire(true)}>
                                    <Icons name={"search"} size={29} style={{ color: '#fff' }} />
                                </TouchableOpacity>
                                : null
                            }
                            <TouchableOpacity style={{ justifyContent: 'center', }} onPress={() => setisVisibleAdd(true)}>
                                <MaterialIcons name={"add-box"} size={29} style={{ color: '#fff' }} />
                            </TouchableOpacity>

                        </View>

                    </View>
                    :

                    <View style={{ flexDirection: 'row', flex: 7, justifyContent: 'space-between' }}>
                        <TextInput
                            style={{ marginLeft: 10, fontSize: 18 }}
                            placeholder="tìm kiếm ..."
                            value={nameSearch}
                            onChangeText={text => setNameSearch(text)}
                        />
                        <View />
                        <AntDesign name={'close'} size={20}
                            onPress={() => setSearchRequire(false)}
                            style={{ color: colors.text, paddingTop: 15, paddingRight: 20 }} />
                    </View>
                }
            </View>
            {word.data !== undefined && word.data.length !== 0 ?
                <View style={{ margin: 10 }}>
                    {
                        word.data.map((element, key) => {
                            return (
                                <View key={key} style={{ borderBottomColor: '#cccccc', borderBottomWidth: 1, paddingBottom: 10, paddingTop: 10 }} >
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                        <View>
                                            <Text>{key + 1}. {element.word} [{element.translate}]</Text>
                                            <Text style={{ marginTop: 5 }}>{element.vn}</Text>
                                        </View>
                                        <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                                            <TouchableOpacity onPress={() => editVocaAction(element)}>
                                                <AntDesign name={'edit'} size={20} style={{ color: 'black' }} />
                                            </TouchableOpacity>
                                            <TouchableOpacity style={{ marginLeft: 10 }} onPress={() => deleteWordVocu(element)}>
                                                <Iconss name={'delete-outline'} size={20} style={{ color: 'red' }} />
                                            </TouchableOpacity>

                                            <TouchableOpacity style={{ marginLeft: 10 }} onPress={() => moveDiffVocu(element)}>
                                                <MaterialIcons name={"drive-file-move"} size={20} style={{}} />
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                    <View style={{ justifyContent: 'flex-end', flexDirection: 'row' }}>
                                        {
                                            element.date !== undefined ?
                                                <Text >{new Date(element.date).getFullYear() + '/' + fixDigit(new Date(element.date).getMonth()) + '/' + fixDigit(new Date(element.date).getDate())}</Text>
                                                :
                                                null
                                        }
                                    </View>
                                </View>

                            )
                        })
                    }
                </View>
                :
                <View style={{ padding: 10 }}>
                    <Text style={{ fontSize: 20 }}>- Bạn chưa thêm từ vào sổ tay </Text>
                    <Text style={{ fontSize: 20 }}>- Tra cứu từ vựng, kanji, ngữ pháp rồi click vào biểu tượng + hoặc biểu tượng +
                        ở góc bên phải màn hình để thêm từ vào sổ tay
                    </Text>
                </View>
            }

            {/* add tu */}
            <View style={styles.container}>
                <Modal
                    isVisible={isVisibleAdd}
                    animationInTiming={1000}
                    animationOutTiming={1000}
                    backdropTransitionInTiming={1000}
                    backdropTransitionOutTiming={1000}
                    deviceWidth={WIDTH}
                >
                    <View style={[styles.modalContent, { marginTop: 50, minHeight: 520 }]}>
                        <View style={{ padding: 15 }}>
                            <Text style={{ fontWeight: 'bold', fontSize: 20, textAlign: 'center', justifyContent: 'center' }}>Thêm từ vào : "{word.name}"</Text>
                            <View>
                                <TextInputPaper label="Từ" mode="outlined" style={{ marginTop: 10, backgroundColor: '#fff' }} value={wordD} onChangeText={(text) => setWordD(text)} />
                                <TextInputPaper label="PHiên âm" mode="outlined" style={{ marginTop: 10, backgroundColor: '#fff' }} value={spell} onChangeText={(text) => setSpell(text)} />
                                <TextInputPaper label="Nghĩa" mode="outlined" style={{ marginTop: 10, backgroundColor: '#fff' }} value={mean} onChangeText={(text) => setMean(text)} />
                                <SelectDropdown
                                    data={wordoptions}
                                    onSelect={(selectedItem, index) => {
                                        setValue(selectedItem);
                                    }}
                                    defaultValue={value}
                                    buttonStyle={{ marginTop: 15, width: '100%', borderWidth: 1, borderColor: '#8c8c8c', backgroundColor: '#fff', borderRadius: 5 }}
                                    buttonTextStyle={{ color: '#8c8c8c', marginLeft: -240 }}
                                />
                                <TextInput
                                    placeholder='note...'
                                    style={{ borderWidth: 1, borderColor: '#8c8c8c', marginTop: 15, borderRadius: 5 }}
                                    multiline={true}
                                    numberOfLines={4}
                                    onChangeText={(text) => setNote(text)}
                                    value={note} />
                            </View>
                            <View style={styles.stylebutton}>
                                <TouchableOpacity
                                    onPress={() => setisVisibleAdd(false)}
                                    style={[styles.keepStyle, { backgroundColor: '#999999', marginRight: 110 }]}>
                                    <Text style={{ color: '#fff' }}>Đóng</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={[styles.keepStyle, { backgroundColor: '#1a75ff', }]}
                                    onPress={() => createWordVoca()}
                                >
                                    <Text style={{ color: '#fff' }}>Xong</Text>
                                </TouchableOpacity>
                            </View>

                        </View>

                    </View>
                </Modal>
            </View>

            {/* edit tuwf */}



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
                            <Text style={{ fontWeight: 'bold', fontSize: 20 }}>Chỉnh sửa nghĩa của từ {currentElement.wordD}</Text>
                            <TextInput
                                style={{ borderBottomWidth: 1, borderBottomColor: '#80b3ff', alignItems: 'center', justifyContent: 'center' }}
                                placeholder="Nhập nhóm từ cần lưu"
                                value={newEdit}
                                onChangeText={text => setNewEdit(text)}
                            />
                            <View style={styles.stylebutton}>
                                <TouchableOpacity
                                    onPress={() => setisVisibleEdit(false)}
                                    style={[styles.keepStyle, { backgroundColor: '#999999', marginRight: 110 }]}>
                                    <Text style={{ color: '#fff' }}>Đóng</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={[styles.keepStyle, { backgroundColor: '#1a75ff', }]}
                                    onPress={() => editWordVoca()}
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

export default ListWordVocabulary;