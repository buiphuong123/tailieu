import { Center } from 'native-base';
import React, { useState, useEffect } from 'react'
import { Text, View, SafeAreaView, Dimensions, Image, TouchableOpacity, StyleSheet, Button, FlatList, ScrollView, TextInput } from 'react-native'
import { useSelector, useDispatch } from 'react-redux';
import { actionChannel } from 'redux-saga/effects';
import SearchDropDown from './SearchDropDown';
import CustomHeader from '../../CustomHeader';
import Entypo from 'react-native-vector-icons/EvilIcons';
const WIDTH = Dimensions.get('window').width;
import Modal from 'react-native-modal'; // 2.4.0

export default HomeGrammar = ({navigation}) => {
    const [dataSource] = useState(['tat ca', 'bai 1', 'bai 2', 'bai 3', 'bai 4', 'bai 5', 'bai 6', 'bai 7', 'bai 8', 'bai 9', 'bai 10'])
    const [filtered, setFiltered] = useState(dataSource)
    const [searching, setSearching] = useState(false)
    const [isVisible, setisVisible] = useState(false);
    const dataGrammar = useSelector(state => state.grammarReducer.grammartList);

    const onSearch = (text) => {
        if (text) {
            setSearching(true)
            const temp = text.toLowerCase()

            const tempList = dataGrammar.filter(item => {
                if (item.grammar.match(temp) || item.translation.match(temp))
                    return item
            })
            setFiltered(tempList)
        }
        else {
            setSearching(false)
            setFiltered(dataGrammar)
        }

    }

    const renderLession = ({ item }) => {
        return (
            <View style={{ backgroundColor: '#fff', padding: 10 }}>
                <Text>{item} Đã nhớ</Text>
                <View style={{flexDirection: 'row'}}>
                    <View>
                        <Text>50%</Text>
                    </View>
                    <View style={{ borderWidth: 1, borderColor: '#cccccc', width: '80%', height: 1, marginTop: 10, marginLeft: 5 }}></View>
                </View>
            </View>
        )
    }

    const PressLession = (index) => {
        console.log('gia tri index la ', index);
        navigation.navigate("GrammarScr", {navigation: navigation, lession: index});
    }
    return (
        <View style={styles.container}>
            <CustomHeader title="grammar" navigation={navigation} />
            <View style={{ justifyContent: 'center', alignItems: 'center', height: 60, backgroundColor: '#009387', }}>
                <TextInput
                    style={styles.textInput}
                    placeholder="Search a grammar"
                    placeholderTextColor='#cccccc'
                    onChangeText={onSearch}

                />
            </View>
            <View style={{}}>
                <View style={{
                    flexWrap: 'wrap', flexDirection: 'row',
                    // justifyContent: 'center'
                }}>

                    {
                        dataSource.map((item, index) => {
                            return (
                                <TouchableOpacity style={{
                                    margin: 10,
                                    // justifyContent: 'center',
                                    // alignItems: 'center',
                                    // height: 50,
                                    backgroundColor: '#fff',
                                    borderWidth: 1,
                                    borderColor: "blue",
                                    borderRadius: 15,
                                    padding: 5,
                                    paddingLeft: 18,
                                    paddingRight: 18,

                                }} onPress={() => PressLession(index)}>

                                    <Text style={{ fontSize: 17, }}>
                                        {item}
                                    </Text>
                                </TouchableOpacity>
                            )
                        })
                    }
                </View>

            </View>


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
                                data={dataSource}
                                keyExtractor={item => item.id}
                                renderItem={renderLession}
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
                style={{ borderWidth: 1, borderRadius: 40, backgroundColor: '#009387', borderColor: '#009387', bottom: 30, right: 30, position: 'absolute' }}
                onPress={() => setisVisible(true)}>
                <Entypo name={'chart'} size={40} style={{ color: 'white', padding: 10 }} />
            </TouchableOpacity>

            {/* your components can stay here like anything */}
            {/* and at the end of view */}
            {
                searching &&
                <SearchDropDown
                    onPress={() => setSearching(false)}
                    dataGrammar={filtered} 
                    navigation = {navigation}
                    />
            }
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        //   justifyContent: 'center',
        //   alignItems: 'center',
        width: WIDTH,
        flex: 1,
    },
    textInput: {
        backgroundColor: '#fff',
        width: '90%',
        borderRadius: 5,
        fontSize: 16,
        paddingHorizontal: 10,
        margin: 10
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
});

