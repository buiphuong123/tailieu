import React, { useState } from 'react'
import { Text, View, StyleSheet, TouchableOpacity, Dimensions, FlatList } from 'react-native'
import { useSelector, useDispatch } from 'react-redux';
import WordInfo from './WordInfo';
const { width: WIDTH } = Dimensions.get('window');
import Icon from 'react-native-vector-icons/Ionicons';
import { getListWordSuccess } from '../../../../redux/actions/word.action';
import axios from 'axios';
import { useScreenReaderEnabled } from 'native-base';

export default ListWord = ({ navigation }) => {
    const wordList = useSelector(state => state.wordReducer.wordList);
    const isReverse = useSelector(state => state.wordReducer.isReverse);
    const isMemerize = useSelector(state => state.wordReducer.isMemerize);
    const isNotMemerize = useSelector(state => state.wordReducer.isNotMemerize);
    const isLike = useSelector(state => state.wordReducer.isLike);
    const isWord = useSelector(state => state.wordReducer.isWord);
    const isHira = useSelector(state => state.wordReducer.isHira);
    const isKanji = useSelector(state => state.wordReducer.isKanji);
    const isMean = useSelector(state => state.wordReducer.isMean);
    const [data, setData] = useState(wordList);
    const users = useSelector(state => state.userReducer.user);
    const dispatch = useDispatch();
    // useEffect(() => {
    //    Y
    // }, [wordList]);
    const setMemerize= (userId, wordId) => {
       let objIndex = data.findIndex((e => e._id === wordId));
        if(data[objIndex].memerizes.length === 1) {
            data[objIndex].memerizes = [];
        }
        else if(data[objIndex].memerizes.length === 0) {
            data[objIndex].memerizes.push({isMemerize: true});
        }
        setData([...data]);
        dispatch(getListWordSuccess(data));

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
            .catch(function(error) {
                throw error;
            })
    }

    const setLike= (userId, wordId) => {
        let objIndex = data.findIndex((e => e._id === wordId));
         if(data[objIndex].likes.length === 1) {
             data[objIndex].likes = [];
         }
         else if(data[objIndex].likes.length === 0) {
             data[objIndex].likes.push({isLike: true});
         }
         setData([...data]);
         dispatch(getListWordSuccess(data));
 
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
             .catch(function(error) {
                 throw error;
             })
     }

    const renderWord = ({ item, index }) => {
        return (
            <TouchableOpacity onPress={() => navigation.navigate("WordScreenDetail", {vocabulary: item})}>
                <View style={{ borderBottomWidth: 1, borderBottomColor: '#999999', marginTop: 5, width: WIDTH }}>
                    <View style={{ justifyContent: 'space-between', flexDirection: 'row', marginBottom: 5 }}>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.word1}>{index + 1}/</Text>
                            {isWord ? <Text style={styles.word}>{item.kanji === undefined ? item.kata : item.kanji}</Text> : null}
                            {isHira ? <Text style={styles.word}>{item.hira}</Text> : null}
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
        <FlatList
            inverted={isReverse ? true : false}
            // data={wordList}
            data={isMemerize ? data.filter(e => e.memerizes.length === 1) : data && isLike ? data.filter(e => e.likes.length === 1) : data && isNotMemerize ? data.filter(e => e.memerizes.length === 0) : data}
            keyExtractor={(item, index) => index.toString()}
            renderItem={ renderWord }

        />
    )
}

const styles = StyleSheet.create({
    word1: { marginLeft: 5, color: "blue" },
    word: { marginLeft: 5, color: "blue" },
    star: { marginRight: 10 },
    check: { marginRight: 10 },
  });
