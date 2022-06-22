import React, { useEffect, useState } from 'react'
import { Text, View, SafeAreaView, Dimensions, Image, TouchableOpacity, StyleSheet, Button, FlatList } from 'react-native'
import CheckBox from '@react-native-community/checkbox';
// import AppText from '../../../components/app-text';
const WIDTH = Dimensions.get('window').width;
import Icon from 'react-native-vector-icons/Ionicons';
import ListGrammer from './ListGrammer';
import CustomHeader from '../../CustomHeader';
import { useSelector, useDispatch } from 'react-redux';
import { getGrammarSuccess } from '../../../redux/actions/grammar.action';
import axios from 'axios';
import { getListCommentRequest, getListCommentSuccess } from '../../../redux/actions/comment.action';

export default Grammer = ({ navigation, route }) => {
    const {lession} = route.params; 
    // const dataGrammar = useSelector(state => state.grammarReducer.grammartList);
    const users = useSelector(state => state.userReducer.user);
    const grammarlevel = useSelector(state => state.grammarReducer.grammarlevel);
    const [data, setData]= useState(grammarlevel);
    const [memerize, setmemerize] = useState(false);
    const dispatch = useDispatch();
    useEffect(() => {
        setData(grammarlevel);
    }, [grammarlevel]);

    const setMemerize = (grammerId, userId, item) => {
        objIndex = data.findIndex((e => e._id === grammerId));
        if(data[objIndex].memerizes.length === 1) {
            data[objIndex].memerizes = [];
        }
        else if(data[objIndex].memerizes.length === 0) {
            data[objIndex].memerizes.push({isMem: true});
        }
        setData([...data]);
        dispatch(getGrammarSuccess(data));

        axios.post('http://192.168.1.72:3002/language/createMemGrammar', {
            "user_id": userId,
            "grammar_id": grammerId
        }, {
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            }
        })
            .then((response) => {
                console.log(response.data.nemGrammar);
            })
            .catch(function(error) {
                throw error;
            })
    }

    const explainGrammar = (item) => {
        dispatch(getListCommentRequest(item._id, users._id));
        navigation.navigate("ExplainScreen", {word: item});
    }
   
    const renderGrammar = ({ item, index }) => {
        return (
            <View>
            <TouchableOpacity onPress={()=> explainGrammar(item)}>
                <View style={{ borderBottomWidth: 1, borderBottomColor: '#999999', marginTop: 5, width: WIDTH}}>
                    <View style={{ justifyContent: 'space-between', flexDirection: 'row', marginBottom: 5 }}>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.word1}>{index + 1}/</Text>
                            <Text style={styles.word}>{item.grammar.split("=>")[0]}</Text>
                        </View>
                        <View />
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{ marginLeft: 5 }}>{item.grammar.split("=>")[1]}</Text>
                        </View>
                        <TouchableOpacity onPress={() => setMemerize(item._id, users._id, item)}>
                            <Icon style={[styles.check, { color: item.memerizes.length !== 0 ? 'green' : '#999999'  }]} name="checkmark-circle-outline" size={25} />
                        </TouchableOpacity>

                    </View>

                </View>


            </TouchableOpacity>
        </View>
        )
    }
  return (
    <View style={{flex: 1}}>
        <CustomHeader title={lession === 0? "Tất cả": "Bài "+ lession} navigation={navigation} />
                <View style={{ flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: 'blue', padding: 10 }}>
                    <View style={styles.checkboxContainer}>
                        <CheckBox
                            style={styles.checkbox}
                            value={ !memerize }
                            onValueChange={() => setmemerize(!memerize)}
                        />
                        {/* <AppText i18nKey={"word"} style={styles.label} /> */}
                        <Text style={styles.label}>chưa nhớ</Text>
                    </View>

                    <View style={styles.checkboxContainer}>
                        <CheckBox
                            style={styles.checkbox}
                            value={memerize}
                            onValueChange={() => setmemerize(!memerize)}
                        />
                        {/* <AppText i18nKey={"hira"} style={styles.label} /> */}
                        <Text style={styles.label}>đã nhớ</Text>
                    </View>
                </View>
                <View>
                    <FlatList
                        // data={memerize === true ? data.filter(e => e.memerizes.length === 1 )&& data.filter(e => e.lession === lession ) :  memerize === false? data.filter(e => e.lession === lession ) &&  data.filter(e => e.memerizes.length === 0)  :  data.filter(e => e.lession === lession )}
                        data={ lession ? data.filter((e) => e.lession === lession && (memerize ?  e.memerizes.length === 1 :  e.memerizes.length === 0)) :(memerize ? data.filter((e) => e.memerizes.length === 1) : data.filter((e) => e.memerizes.length === 0))}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={renderGrammar}
                    />
                    {/* <Text>dskjafkd</Text> */}
                </View>

            </View>
  )
}
const styles = StyleSheet.create({

    checkboxContainer: {
        flexDirection: "row",
    },
    
    label: {
        margin: 8,
        marginLeft: 0
    },
    word1: { marginLeft: 5, color: "blue" },
    word: { marginLeft: 5, color: "blue" },
    star: { marginRight: 10 },
    check: { marginRight: 10 },
});