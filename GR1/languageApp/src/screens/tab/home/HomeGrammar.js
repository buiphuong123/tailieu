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
import { getGrammarSuccess } from '../../../redux/actions/grammar.action';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Icon from 'react-native-vector-icons/Ionicons';

export default HomeGrammar = ({navigation, route}) => {
    const {level } = route.params;
    const [dataSource, setDataSource] = useState(['tất cả'])
    const [searching, setSearching] = useState(false)
    const [isVisible, setisVisible] = useState(false);
    const dataGrammar = useSelector(state => state.grammarReducer.grammarList);
    const grammarlevel = useSelector(state => state.grammarReducer.grammarlevel);
    const [filtered, setFiltered] = useState(dataGrammar);
    const dispatch = useDispatch();
    const onSearch = (text) => {
        if (text) {
            setSearching(true)
            const temp = text.toLowerCase()

            const tempList = dataGrammar.filter(item => {
                if (item.grammar.match(temp))
                    return item
            })
            setFiltered(tempList)
        }
        else {
            setSearching(false)
            setFiltered(dataGrammar)
        }

    }

    useEffect(() => {
        setSearching(false);
        // console.log(wordlevel);
        // console.log(grammarlevel.filter(w => !w.lesson).map(w => w.lession))
        // const max = Math.max(...grammarlevel.map(w => w.lession ?? 1));
        // // console.log(max);
        // for (var i = 1; i <= max; i++) {
        //     dataSource.push("bài " + i);

        // }
        // setDataSource([...dataSource]);
    }, []);
    useEffect(() => {
        console.log('ve bai nha', level);
        const max = Math.max(...grammarlevel.map(w => w.lession ?? 1));
        // console.log(max);
        for (var i = 1; i <= max; i++) {
            dataSource.push("bài " + i);

        }
        console.log(dataSource);
        setDataSource([...dataSource]);
    }, [level, grammarlevel]);

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            setSearching(false);
            let arr3 = dataGrammar.map((item, i) => Object.assign({}, item, grammarlevel[i]));
            dispatch(getGrammarSuccess(arr3));
        });

        return unsubscribe;
    }, [navigation]);

    const renderLession = ({ item, index }) => {
        return (
            <View style={{ backgroundColor: '#fff', padding: 10 }}>
                <Text>{item} Đã nhớ</Text>
                <View style={{ flexDirection: 'row' }}>
                    <View>
                        {
                            index === 0 ?
                                <Text>{Math.floor((grammarlevel.filter(e => e.memerizes.length === 1).length / grammarlevel.length) * 100)}%</Text>
                                :
                                <Text>{Math.floor((grammarlevel.filter(e => e.memerizes.length === 1 && e.lession === index).length / grammarlevel.filter(e => e.lession === index).length) * 100)}%</Text>


                        }
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
            {/* <CustomHeader title="grammar" navigation={navigation} /> */}
            <View style={{flexDirection: 'row', height: 50, backgroundColor: '#009387', justifyContent: 'space-around'}}>
            <View style={{flex: 1, justifyContent: 'center'}}>
               
                    <TouchableOpacity style={{flexDirection: 'row', alignItems: 'center'}} onPress={() => navigation.goBack()}>
                        <Icon name={'arrow-back'} size={29} style={{color: '#fff', marginLeft: 5}} />
                    </TouchableOpacity>
            </View>
            <View style={{flex: 1.5, justifyContent: 'center'}}>
                <Text style={{textAlign: 'center', color: '#fff', fontSize: 18}}>Grammar</Text>
            </View>

            <TouchableOpacity style={{flexDirection: 'row', alignItems: 'center'}} onPress={() => navigation.navigate("GrammarTest", {navigation: navigation, level: level})}>
                        <AntDesign name={'caretright'} size={29} style={{color: '#fff', marginRight: 20}} />
                    </TouchableOpacity>
            {/* <View style={{flex: 1}}></View> */}
        </View>
            <View style={{ justifyContent: 'center', alignItems: 'center', height: 60, backgroundColor: '#009387', }}>
                <TextInput
                    style={styles.textInput}
                    placeholder="Search a grammar"
                    placeholderTextColor='#cccccc'
                    onChangeText={onSearch}

                />
            </View>
            <ScrollView style={{}}>
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
                                    paddingLeft: 15,
                                    paddingRight: 15,

                                }} onPress={() => PressLession(index)}>

                                    <Text style={{ fontSize: 17, }}>
                                        {item}
                                    </Text>
                                </TouchableOpacity>
                            )
                        })
                    }
                </View>

            </ScrollView>


            <View>
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
    modalContent: {
        // flex: 1,
        marginTop: 50,
        marginBottom: 50,
        // marginBottom: 50,
        backgroundColor: 'white',
        // height: HEIGHT
    },
});

