import React, { useEffect, useState } from 'react'
import { Text, View, SafeAreaView, Dimensions, Image, TouchableOpacity, StyleSheet, Button, FlatList } from 'react-native'
import CheckBox from '@react-native-community/checkbox';
// import AppText from '../../../components/app-text';
const WIDTH = Dimensions.get('window').width;
import Icon from 'react-native-vector-icons/Ionicons';
import ListGrammer from './ListGrammer';
import CustomHeader from '../../CustomHeader';
import { useSelector, useDispatch } from 'react-redux';
import { getGrammarSuccess } from '../../../redux/actions';
import axios from 'axios';

export default Grammer = ({ navigation, route }) => {
    const dataGrammar = useSelector(state => state.grammarReducer.grammartList);
    const [data, setData]= useState(dataGrammar);
    const users = useSelector(state => state.userReducer.user);

    const [memerize, setmemerize] = useState(false);
    const dispatch = useDispatch();
    const setMemerize = (grammerId, userId, item) => {
        console.log('DATA GRAMMAR LA ', dataGrammar);
        if(item.memerizes.length === 1) {
            item.memerizes = [];
        }
        else if(item.memerizes.length === 0) {
            item.memerizes.push({isMem: true})
        }
        setData([...data, item]);
        dispatch(getGrammarSuccess(data));

        axios.post('http://192.168.1.6:3002/language/createMemGrammar', {
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
    useEffect(() => {
        console.log('DATA GRAMMAR LA ', dataGrammar);
    }, []);
    const furiExample = () => {
        navigation.navigate("ExplainScreen", {word: item});
    }
    const renderGrammar = ({ item, index }) => {
        return (
            <View>
            <TouchableOpacity onPress={()=> navigation.navigate("ExplainScreen", {word: item})}>
                <View style={{ borderBottomWidth: 1, borderBottomColor: '#999999', marginTop: 5, width: WIDTH}}>
                    <View style={{ justifyContent: 'space-between', flexDirection: 'row', marginBottom: 5 }}>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.word1}>{index + 1}/</Text>
                            <Text style={styles.word}>{item.grammar}</Text>
                        </View>
                        <View />
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{ marginLeft: 5 }}>{item.translation}</Text>
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
        <CustomHeader title=" Grammar" navigation={navigation} />
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
                        data={memerize ? dataGrammar.filter((e) => e.memerizes.length >0) : dataGrammar.filter((e) => e.memerizes.length <= 0)}
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