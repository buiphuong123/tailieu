import { Center } from 'native-base';
import React, { useState, useEffect } from 'react'
import { Text, View, SafeAreaView, Dimensions, Image, TouchableOpacity, StyleSheet, Button, FlatList, ScrollView, TextInput } from 'react-native'
import { useSelector, useDispatch } from 'react-redux';
import { actionChannel } from 'redux-saga/effects';
import Entypo from 'react-native-vector-icons/EvilIcons';
const WIDTH = Dimensions.get('window').width;
import Modal from 'react-native-modal'; // 2.4.0
import CustomHeader from '../../../CustomHeader';

export default KanjiLession = ({navigation}) => {
    const [dataSource, setDataSource] = useState(['tất cả'])
    const [searching, setSearching] = useState(false)
    const [isVisible, setisVisible] = useState(false);
    const kanjiList = useSelector(state => state.kanjiReducer.kanjiList);
    const kanjilevel = useSelector(state => state.kanjiReducer.kanjilevel);
    const [filtered, setFiltered] = useState(kanjiList);
    const [searchName, setSearchName] = useState("");
    const onSearch = (text) => {
        setSearchName(text);
        if (text) {
            setSearching(true)
            // const temp = text.toLowerCase()
            const tempList = kanjiList.filter(item => {
                if ( item.mean.match(text.toUpperCase())) {
                    return item
                }
            })
            setFiltered(tempList)
        }
        else {
            setSearching(false)
            setFiltered(kanjiList)
        }

    }
    useEffect(() => {
        setSearching(false);
        // console.log(wordlevel);
        console.log(kanjilevel.filter(w => !w.lesson).map(w => w.lession))
        const max = Math.max(...kanjilevel.map(w => w.lession ?? 1));
        for (var i = 1; i <= max; i++) {
            dataSource.push("bài " + i);

        }
        setDataSource([...dataSource]);
        console.log(dataSource);
    }, []);

    useEffect(() => {
        console.log('vao focus');
        const unsubscribe = navigation.addListener('focus', () => {
            setSearching(false);
        });

        return unsubscribe;
    }, [navigation]);
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
        navigation.navigate("KanjiScreen", {lession: index});
    }
    return (
        <View style={styles.container}>
            <CustomHeader title="Kanji" navigation={navigation} />
            <View style={{ justifyContent: 'center', alignItems: 'center', height: 60, backgroundColor: '#009387', }}>
                <TextInput
                    style={styles.textInput}
                    placeholder="Search a grammar"
                    placeholderTextColor='#cccccc'
                    value={searchName}
                    onChangeText={(text) => onSearch(text)}

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

                                }} 
                                onPress={() => PressLession(index)}
                                >

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
            {/* {
                searching &&
                <SearchWord
                    onPress={() => setSearching(false)}
                    wordList={filtered} 
                    navigation = {navigation}
                    />
            } */}
             {
                searching &&
                    <ScrollView style={styles.itemSearch}>
                        {
                            filtered.length !== 0 ?
                            filtered.map((element, key) => {
                                return (
                                    <TouchableOpacity key={key} style={styles.itemView} onPress={() =>  navigation.navigate("ExplainKanji", { navigation: navigation, kanjiword: element })}>
                                    <Text style={styles.itemText}>{element.kanji} : {element.mean}</Text>
                                </TouchableOpacity>
                                )
                            })
                            :
                            <View
                                style={styles.noResultView}>
                                <Text style={styles.noResultText}>No search items matched</Text>
                            </View>
                        }
                    </ScrollView>
                    
               
            }
        </View>
    )
}


const styles = StyleSheet.create({
    itemSearch: {
        position: 'absolute', zIndex: 1, top: 100,
        width: WIDTH-40, left: 20 ,backgroundColor: '#fff',
        minHeight: 100, maxHeight: 300
    },
    noResultView: {
        alignSelf: 'center',
        height: 100,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center'
    },
    noResultText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'red'
    },
    itemView: {
        borderBottomColor: '#cccccc',
        borderBottomWidth: 1,
        backgroundColor: 'white',
        height: 30,
        width: WIDTH,
        marginBottom: 10,
        justifyContent: 'center',
        borderRadius: 4,
    },
    itemText: {
        color: 'black',
        paddingHorizontal: 10,
    },
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

