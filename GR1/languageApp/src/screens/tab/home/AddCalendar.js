import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Dimensions, TextInput, Platform } from 'react-native';
import { Agenda } from 'react-native-calendars';
import { Card, Avatar, Button } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Icons from 'react-native-vector-icons/EvilIcons';
import DateTimePicker from '@react-native-community/datetimepicker';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Modal from 'react-native-modal'; // 2.4.0
import CheckBox from '@react-native-community/checkbox';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';

const { height } = Dimensions.get('window');

export default AddCalendar = () => {
    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
    const [text, setText] = useState('Empty');
    const users = useSelector(state => state.userReducer.user);
    const [isModalVisible, setModalVisible] = useState(false);
    const [isModalRecurrence, setModalRecurrence] = useState(false);
    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };
    const toggleModalRecurrence = () => {
        setModalRecurrence(!isModalRecurrence);
    };
    var now = new Date();
    const fixDigit = (val) => {
        return (val < 10 ? '0' : '') + val;
    }
    // const [dateCalen, setdateCalen] = useState(fixDigit(now.getDate()) + '/' + fixDigit(now.getMonth() + 1) + '/' + now.getFullYear());
    // const [timecalen, settimeCalen] = useState(fixDigit(now.getHours()) + ':' + fixDigit(now.getMinutes()));
    const [dateCalen, setdateCalen] = useState(now);
    // const [timecalen, settimeCalen] = useState(now);
    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(false);
        setDate(currentDate);

        let tempDate = new Date(currentDate);
        // let fDate = fixDigit(tempDate.getDate()) + '/' + fixDigit(tempDate.getMonth() + 1) + '/' + tempDate.getFullYear();
        // setdateCalen(fDate);
        console.log('temp date laf ', tempDate);
        setdateCalen(tempDate);
        // let fTime = fixDigit(tempDate.getHours()) + ':' + fixDigit(tempDate.getMinutes());
        // settimeCalen(fTime);
        // setText(fDate + '\n' + fTime);
        // console.log(fDate + '(' + fTime + ')');
    }

    const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
    }

    const sendSchedule = () => {
        axios.post('http://192.168.1.72:3002/language/remind', {
            "date": dateCalen,
            "user": users.notifiToken
        }, {
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            }
        })
            .then((response) => {
                console.log(response.data);
            })

    }

    return (
        <View style={{ flex: 1 }}>
            <Card>
                <AntDesign name={'close'} size={25} style={{ color: 'black', paddingTop: 20, paddingLeft: 20 }} />
                <Card.Content>
                    <View
                        style={{
                            marginTop: 20,
                            marginLeft: 20,
                            height: height / 10,
                        }}>
                        <TextInput
                            style={{ fontSize: 25, padding: 15 }}
                            placeholder="input schedule"
                        />
                    </View>
                </Card.Content>
            </Card>
            <ScrollView>
                <View style={{ borderBottomWidth: 1, borderBottomColor: '#e6e6e6', padding: 20 }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
                        <View style={{ flexDirection: 'row' }}>
                            <TouchableOpacity onPress={() => showMode('date')}>
                                <AntDesign name={'calendar'} size={20} style={{ color: 'blue' }} />
                            </TouchableOpacity>
                            {/* <Text style={{ marginLeft: 10 }}>{dateCalen}</Text> */}
                             <Text style={{ marginLeft: 10 }}>{fixDigit(dateCalen.getDate()) + '/' + fixDigit(dateCalen.getMonth() + 1) + '/' + dateCalen.getFullYear()}</Text>
                        </View>
                        <View style={{ flexDirection: 'row', marginLeft: 100 }}>
                            <TouchableOpacity onPress={() => showMode('time')}>
                                <Icon name={'time-outline'} size={20} style={{ color: 'blue' }} />
                            </TouchableOpacity>
                            {/* <Text style={{ marginLeft: 10 }}>{timecalen}</Text> */}
                            <Text style={{ marginLeft: 10 }}>{fixDigit(dateCalen.getHours()) + ':' + fixDigit(dateCalen.getMinutes())}</Text>
                        </View>
                    </View>
                </View>

                <TouchableOpacity style={{ borderBottomWidth: 1, borderBottomColor: '#e6e6e6', padding: 20 }} onPress={toggleModal}>
                    <View style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
                        <View style={{ flexDirection: 'row' }}>
                            <TouchableOpacity onPress={() => showMode('date')}>
                                <Icon name={'notifications-outline'} size={20} style={{ color: '#808080' }} />
                            </TouchableOpacity>
                            <Text style={{ marginLeft: 10, color: '#808080' }}>Set notification</Text>
                        </View>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity style={{ borderBottomWidth: 1, borderBottomColor: '#e6e6e6', padding: 20 }} onPress={toggleModalRecurrence}>
                    <View style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
                        <View style={{ flexDirection: 'row' }}>
                            <TouchableOpacity onPress={() => showMode('date')}>
                                <Icons name={'refresh'} size={25} style={{ color: '#808080' }} />
                            </TouchableOpacity>
                            <Text style={{ marginLeft: 10, color: '#808080' }}>Set recurrence</Text>
                        </View>
                    </View>
                </TouchableOpacity>

                <View style={{ paddingLeft: 20, paddingRight: 20, justifyContent: 'center', }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'flex-start', flexGrow: 1 }}>
                        <View style={{ flexDirection: 'row', }}>
                            <View style={{ justifyContent: 'center' }}>
                                <TouchableOpacity onPress={() => showMode('date')}>
                                    <FontAwesome name={'sticky-note-o'} size={20} style={{ color: '#808080' }} />
                                </TouchableOpacity>
                            </View>
                            <View style={{ marginTop: 10 }}>
                                <TextInput
                                    style={{ padding: 20, paddingTop: 10 }}
                                    multiline={true}
                                    placeholder="Note...."
                                />
                            </View>
                        </View>
                    </View>
                </View>
                
                <TouchableOpacity onPress={() => sendSchedule()}>
                    <Text>crete schedule</Text>
                </TouchableOpacity>
            </ScrollView>
            {show && (
                <DateTimePicker
                    testID='dateTimePicker'
                    value={date}
                    mode={mode}
                    is24Hour={true}
                    display='default'
                    onChange={onChange}
                />

            )}

            {/* model */}
            <View style={styles.centeredView}>
                <Modal
                    // animationType="slide"
                    transparent={true}
                    // visible={modalVisible}
                    isVisible={isModalVisible}
                >
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <Text style={styles.modalText}>Notification</Text>
                            <View>
                                <View style={styles.checkboxStyle}>
                                    <CheckBox
                                        style={styles.centerStyle}
                                    // value={isMemerize}
                                    // onValueChange={(value) => seletMemerizedall(value)}
                                    />
                                    <Text style={styles.centerStyle}>10 minutes</Text>
                                </View>

                                <View style={styles.checkboxStyle}>
                                    <CheckBox
                                        style={styles.centerStyle}
                                    // value={isMemerize}
                                    // onValueChange={(value) => seletMemerizedall(value)}
                                    />
                                    <Text style={styles.centerStyle}>30 minutes</Text>
                                </View>

                                <View style={styles.checkboxStyle}>
                                    <CheckBox
                                        style={styles.centerStyle}
                                    // value={isMemerize}
                                    // onValueChange={(value) => seletMemerizedall(value)}
                                    />
                                    <Text style={styles.centerStyle}>1 hour before</Text>
                                </View>

                                <View style={styles.checkboxStyle}>
                                    <CheckBox
                                        style={styles.centerStyle}
                                    // value={isMemerize}
                                    // onValueChange={(value) => seletMemerizedall(value)}
                                    />
                                    <Text style={styles.centerStyle}>1 day before</Text>
                                </View>
                            </View>
                            <TouchableOpacity
                                style={[styles.button, styles.buttonClose]}
                                // onPress={() => setModalVisible(!modalVisible)}
                                onPress={toggleModal}
                            >
                                <Text style={styles.textStyle}>Hide Modal</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
                {/* <TouchableOpacity
                    style={[styles.button, styles.buttonOpen]}
                    onPress={toggleModal}
                >
                    <Text style={styles.textStyle}>Show Modal</Text>
                </TouchableOpacity> */}
            </View>

            {/* modeReccurence */}
            <View style={styles.centeredView}>
                <Modal
                    // animationType="slide"
                    transparent={true}
                    // visible={modalVisible}
                    isVisible={isModalRecurrence}
                >
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <Text style={styles.modalText}>modeReccurence!</Text>
                            <View>
                                <View style={styles.checkboxStyle}>
                                    <CheckBox
                                        style={styles.centerStyle}
                                    // value={isMemerize}
                                    // onValueChange={(value) => seletMemerizedall(value)}
                                    />
                                    <Text style={styles.centerStyle}>Daily</Text>
                                </View>

                                <View style={styles.checkboxStyle}>
                                    <CheckBox
                                        style={styles.centerStyle}
                                    // value={isMemerize}
                                    // onValueChange={(value) => seletMemerizedall(value)}
                                    />
                                    <Text style={styles.centerStyle}>Weekly</Text>
                                </View>

                                <View style={styles.checkboxStyle}>
                                    <CheckBox
                                        style={styles.centerStyle}
                                    // value={isMemerize}
                                    // onValueChange={(value) => seletMemerizedall(value)}
                                    />
                                    <Text style={styles.centerStyle}>Monthly</Text>
                                </View>

                                <View style={styles.checkboxStyle}>
                                    <CheckBox
                                        style={styles.centerStyle}
                                    // value={isMemerize}
                                    // onValueChange={(value) => seletMemerizedall(value)}
                                    />
                                    <Text style={styles.centerStyle}>Yearly</Text>
                                </View>
                            </View>
                            <TouchableOpacity
                                style={[styles.button, styles.buttonClose]}
                                // onPress={() => setModalVisible(!modalVisible)}
                                onPress={toggleModalRecurrence}
                            >
                                <Text style={styles.textStyle}>Hide Reccurece</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    checkboxStyle: {
        flexDirection: 'row',
        // justifyContent: 'center',
        alignItems: 'center',
        padding: 10
    },
    centerStyle: {
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 10
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        // alignItems: "center",
        marginTop: 22,
    },
    modalView: {

        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        // alignItems: "center",
        shadowColor: "red",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 2,
        shadowRadius: 4,
        elevation: 5
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2
    },
    buttonOpen: {
        backgroundColor: "#F194FF",
    },
    buttonClose: {
        backgroundColor: "#2196F3",
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center",
        fontSize: 20,
        // fontWeight: 'bold'
    }
});

