import React, { useEffect, useState } from 'react'
import { Text, View, StyleSheet, TouchableOpacity, Dimensions, FlatList } from 'react-native'
import { useSelector, useDispatch } from 'react-redux';
import WordInfo from './WordInfo';
const { width: WIDTH } = Dimensions.get('window');
import Icon from 'react-native-vector-icons/Ionicons';
import { getListWordSuccess, getListWordLevel } from '../../../../redux/actions/word.action';
import axios from 'axios';
import { Center, useScreenReaderEnabled } from 'native-base';
import { getListWordCommentRequest } from '../../../../redux/actions/comment.action';
import Entypo from 'react-native-vector-icons/Entypo';
import Modal from 'react-native-modal'; // 2.4.0

export default ListWord = ({ navigation, lession }) => {
    const wordlevel = useSelector(state => state.wordReducer.wordlevel);
    const isReverse = useSelector(state => state.wordReducer.isReverse);
    const isMemerize = useSelector(state => state.wordReducer.isMemerize);
    const isNotMemerize = useSelector(state => state.wordReducer.isNotMemerize);
    const isLike = useSelector(state => state.wordReducer.isLike);
    const isWord = useSelector(state => state.wordReducer.isWord);
    const isHira = useSelector(state => state.wordReducer.isHira);
    const isKanji = useSelector(state => state.wordReducer.isKanji);
    const isMean = useSelector(state => state.wordReducer.isMean);
    const isAll = useSelector(state => state.wordReducer.isAll);
    const [data, setData] = useState(wordlevel);
    const users = useSelector(state => state.userReducer.user);
    const dispatch = useDispatch();
    const [isVisibleAction, setisVisibleAction] = useState(false);
    // const {lession} = route.params;
    useEffect(() => {
        setData(wordlevel);
    }, [wordlevel]);
    const setMemerize = (userId, wordId) => {
        let objIndex = data.findIndex((e => e._id === wordId));
        if (data[objIndex].memerizes.length === 1) {
            data[objIndex].memerizes = [];
        }
        else if (data[objIndex].memerizes.length === 0) {
            data[objIndex].memerizes.push({ isMemerize: true });
        }
        setData([...data]);
        // dispatch(getListWordSuccess(data));
        dispatch(getListWordLevel(data));

        axios.post('http://192.168.1.72:3002/language/createMemWord', {
            "userId": userId,
            "wordId": wordId
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

    const setLike = (userId, wordId) => {
        console.log(data.slice(20 * lession - 20, 20 * lession).length);
        let objIndex = data.findIndex((e => e._id === wordId));
        if (data[objIndex].likes.length === 1) {
            data[objIndex].likes = [];
        }
        else if (data[objIndex].likes.length === 0) {
            data[objIndex].likes.push({ isLike: true });
        }
        setData([...data]);
        dispatch(getListWordLevel(data));

        axios.post('http://192.168.1.72:3002/language/createLikeWord', {
            "userId": userId,
            "wordId": wordId
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

    const wordDetail = (item) => {
        dispatch(getListWordCommentRequest(item._id, users._id));
        // console.log('item cua word la ', item);
        navigation.navigate("WordScreenDetail", { vocabulary: item });
    }
    const deleteWord = () => {
        console.log('DELETE NE');
        setisVisibleAction(true);
    }

    const renderWord = ({ item, index }) => {
        return (
            <TouchableOpacity
                onPress={() => wordDetail(item)}
                onLongPress={() => users.role === 1 ? deleteWord(item) : null}
            >
                <View style={{ borderBottomWidth: 1, borderBottomColor: '#999999', marginTop: 5, width: WIDTH }}>
                    <View style={{ justifyContent: 'space-between', flexDirection: 'row', marginBottom: 5 }}>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.word1}>{index + 1}/</Text>
                            {isWord ? <Text style={styles.word}>{item.word}</Text> : null}
                            {isHira ? <Text style={styles.word}>{item.translate}</Text> : null}
                        </View>
                        <View />
                        <TouchableOpacity onPress={() => setLike(users._id, item._id)}>
                            <Icon style={[styles.star, { color: item.likes.length === 0 ? '#999999' : 'blue' }]} name="star-outline" size={25} />
                            {/* <Icon name="star-outline" size={25} /> */}
                        </TouchableOpacity>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <View style={{ flexDirection: 'row' }}>
                            {isKanji ? <Text style={{ marginLeft: 5, textTransform: 'uppercase' }}>[{item.amhan == '' ? '' : item.amhan}]</Text> : null}
                            {isMean ? <Text style={{ marginLeft: 5 }}>{item.vn}</Text> : null}
                        </View>
                        <TouchableOpacity onPress={() => setMemerize(users._id, item._id)}>
                            <Icon style={[styles.check, { color: item.memerizes.length === 0 ? '#999999' : 'green' }]} name="checkmark-circle-outline" size={25} />
                        </TouchableOpacity>
                    </View>

                </View>

            </TouchableOpacity>
        )
    }
    return (
        <View>
            <FlatList
                inverted={isReverse ? true : false}
                data={lession === 0 ? data : lession !== 0 && isAll === false ? data.filter((e) => e.likes.length !== 2 &&
                    (isMemerize ? e.memerizes.length === 1 : e.memerizes.length === 0) && (isLike ? e.likes.length === 1 : data.filter(e => e.lession === lession))) : data.filter((e) => e.likes.length !== 2 && e.lession === lession)}

                keyExtractor={(item, index) => index.toString()}
                renderItem={renderWord}

            />
            <TouchableOpacity
                style={{ borderWidth: 1, width: 50, borderRadius: 30, backgroundColor: '#009387', borderColor: '#009387', top: WIDTH + 80, right: 25, position: 'absolute', zIndex: 1 }}
                onPress={() => navigation.navigate("TestWord", { navigation: navigation })}>
                <Entypo name={'triangle-right'} size={50} style={{ color: 'white' }} />
            </TouchableOpacity>
            <View style={styles.container}>
                <Modal
                    isVisible={isVisibleAction}
                    swipeDirection="down"
                    style={{ justifyContent: 'flex-end', margin: 0, }}
                    onRequestClose={() => setisVisibleShare(false)}
                    deviceWidth={WIDTH}
                >
                    <View style={styles.modalContent}>
                        <View style={{ borderBottomWidth: 1, padding: 10, justifyContent: 'center', alignItems: 'center', borderBottomColor: '#e6e6e6' }}>
                            <Text style={{ color: 'red' }}>Xóa</Text>
                        </View>
                        <View style={{ borderBottomWidth: 1, padding: 10, justifyContent: 'center', alignItems: 'center', borderBottomColor: '#e6e6e6' }}>
                            <Text style={{ color: 'blue' }}>Chỉnh sửa</Text>
                        </View>
                       
                    </View>
                    <TouchableOpacity
                            onPress={() => setisVisibleAction(false)}
                        style={{backgroundColor: '#fff', marginTop: 10, marginLeft: 10, marginRight: 10, marginBottom: 10, padding: 10, alignItems: 'center', justifyContent: 'center'}}
                        >
                            <Text style={{color: 'blue'}}>Huỷ</Text>
                        </TouchableOpacity>

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
    modalContent: {
        backgroundColor: 'white',
        borderRadius: 4,
        borderColor: 'rgba(0, 0, 0, 0.1)',
        marginLeft: 10, marginRight: 10,
        // padding: 20
    },
    word1: { marginLeft: 5, color: "blue" },
    word: { marginLeft: 5, color: "blue" },
    star: { marginRight: 10 },
    check: { marginRight: 10 },
});
