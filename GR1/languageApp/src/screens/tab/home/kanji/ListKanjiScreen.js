import React, { useEffect, useState } from 'react'
import { Text, Image, View, StyleSheet, TouchableOpacity, Dimensions, FlatList } from 'react-native'
import { useSelector, useDispatch } from 'react-redux';
const { width: WIDTH } = Dimensions.get('window');
import Icon from 'react-native-vector-icons/Ionicons';
import { getListKanjiLevel, getListKanjiSuccess } from '../../../../redux/actions/kanji.action';
import axios from 'axios';
import Entypo from 'react-native-vector-icons/Entypo';
import {getListKanjiCommentRequest} from '../../../../redux/actions/comment.action';

export default ListWord = ({ navigation, lession }) => {
    const kanjilevel = useSelector(state => state.kanjiReducer.kanjilevel);
    const isAll = useSelector(state => state.kanjiReducer.isAll);
    const isMemerize = useSelector(state => state.kanjiReducer.isMemerize);
    const isNotMemerize = useSelector(state => state.kanjiReducer.isNotMemerize);
    const isLike = useSelector(state => state.kanjiReducer.isLike);
    const [data, setData] = useState(kanjilevel);
    const users = useSelector(state => state.userReducer.user);
    const dispatch = useDispatch();
    // const {lession} = route.params;
    useEffect(() => {
        setData(kanjilevel);
    }, [kanjilevel]);
    const setMemerize = (userId, kanjiId) => {
        let objIndex = data.findIndex((e => e._id === kanjiId));
        if (data[objIndex].memerizes.length === 1) {
            data[objIndex].memerizes = [];
        }
        else if (data[objIndex].memerizes.length === 0) {
            data[objIndex].memerizes.push({ isMemerize: true });
        }
        setData([...data]);
        dispatch(getListKanjiLevel(data));

        axios.post('http://192.168.1.72:3002/language/createMemKanji', {
            "userId": userId,
            "kanjiId": kanjiId
        }, {
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            }
        })
            .then((response) => {
                console.log('nemWord', response.data.nemWord);
            })
            .catch(function (error) {
                throw error;
            })
    }

    const setLike = (userId, kanjiId) => {
        let objIndex = data.findIndex((e => e._id === kanjiId));
        if (data[objIndex].likes.length === 1) {
            data[objIndex].likes = [];
        }
        else if (data[objIndex].likes.length === 0) {
            data[objIndex].likes.push({ isLike: true });
        }
        setData([...data]);
        dispatch(getListKanjiLevel(data));

        axios.post('http://192.168.1.72:3002/language/createLikeKanji', {
            "userId": userId,
            "kanjiId": kanjiId
        }, {
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            }
        })
            .then((response) => {
                console.log('nemWord', response.data.likeWord);
            })
            .catch(function (error) {
                throw error;
            })
    }

    const kanjiDetail = (item) => {
        dispatch(getListKanjiCommentRequest(item._id, users._id));
        navigation.navigate("ExplainKanji", {navigation: navigation, kanjiword: item});
    }
   
    const renderWord = ({ item, index }) => {
        return (
            <TouchableOpacity onPress={() => kanjiDetail(item)}>
                <View style={{ borderBottomWidth: 1, borderBottomColor: '#999999', marginTop: 0, width: WIDTH }}>
                    <View style={{ justifyContent: 'space-between', flexDirection: 'row', marginBottom: 5, padding: 10 }}>
                        <View style={{ flexDirection: 'row' }}>
                            <View style={{ borderWidth: 1, paddingTop: 10, paddingLeft: 10, paddingRight: 10, paddingBottom: 5, justifyContent: 'center', alignItems: 'center', borderColor: '#999999' }}>
                                <Text style={styles.textTitle}>{item.kanji}</Text>
                                <Text style={styles.textTitle}>{item.mean}</Text>
                            </View>
                            <View style={{ marginLeft: 10 }}>
                            {/* <Text>  {item.kanji_on}</Text>
                            <Text>  {item.kanji_kun}</Text> */}
                                {
                                   
                                    item.kanji_on !== null ?
                                        <View style={{ flexDirection: 'row' }}>
                                            <Text style={styles.textTitle}>On</Text>
                                            <Text style={{ marginLeft: 5 }}>{item.kanji_on}</Text>
                                        </View> 
                                    : 
                                    null
                                }

{
                                    item.kanji_kun !== null ?
                                        <View style={{ flexDirection: 'row' }}>
                                            <Text style={styles.textTitle}>Kun</Text>
                                            <Text style={{ marginLeft: 5 }}>{item.kanji_kun}</Text>
                                        </View> 
                                    : 
                                    null
                                }
                            </View>
                        </View>

                        <View style={{ flexDirection: 'row' }}>
                            <TouchableOpacity onPress={() => setLike(users._id, item._id)}>
                                <Icon style={[styles.star, { color: item.likes.length === 0 ? '#999999' : 'blue' }]} name="star-outline" size={25} />
                                {/* <Icon name="star-outline" size={25} /> */}
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => setMemerize(users._id, item._id)}>
                                <Icon style={[styles.check, { color: item.memerizes.length === 0 ? '#999999' : 'green' }]} name="checkmark-circle-outline" size={25} />
                            </TouchableOpacity>
                        </View>

                    </View>
                    {
                        item.explain !== undefined ?
                        <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginLeft: 10 }}>
                        <View style={{ width: '50%', justifyContent: 'center', marginBottom: 20 }}>
                            <Text>{item.explain}</Text>
                        </View>
                        <View style={{ width: '50%' }}>
                            <Image
                                style={{ width: '40%', height: 40, marginBottom: 10, marginLeft: 20 }}
                                source={{
                                    uri: item.image,
                                }}
                            />
                        </View>
                    </View>
                    : null
                    }

                </View>

            </TouchableOpacity>
        )
    }
    return (
        <View>
            <FlatList
                // data={data.filter(e => e.lession === lession)}
                data={isMemerize === 'checked' ? data.filter(e => e.memerizes.length === 1 && e.lession === lession) : data.filter(e => e.lession === lession) && isLike === 'checked' ? data.filter(e => e.likes.length === 1 && e.lession === lession) : data.filter(e => e.lession === lession) && isNotMemerize === 'checked' ? data.filter(e => e.memerizes.length === 0 && e.lession === lession) : data.filter(e => e.lession === lession)}

                keyExtractor={(item, index) => index.toString()}
                renderItem={renderWord}

            />
            <TouchableOpacity
                style={{ borderWidth: 1, width: 50, borderRadius: 30, backgroundColor: '#009387', borderColor: '#009387', top: WIDTH + 80, right: 25, position: 'absolute', zIndex: 1 }}
                onPress={() => navigation.navigate("TestKanji", { navigation: navigation, lession: lession })}>
                <Entypo name={'triangle-right'} size={50} style={{ color: 'white' }} />
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    word1: { marginLeft: 5, color: "blue" },
    word: { marginLeft: 5, color: "blue" },
    star: { marginRight: 10 },
    check: { marginRight: 10 },
    textTitle: {
        color: 'blue',
        fontWeight: 'bold'
    }
});
