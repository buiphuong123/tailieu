import React, { useEffect, useState } from 'react';
import {
    TouchableOpacity,
    StyleSheet,
    ScrollView,
    View,
    Text,
    TextInput,
    FlatList,
    Dimensions,
    Alert
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import {RemoteTextVocabulary} from '../../../redux/actions/word.action';
const WIDTH = Dimensions.get('window').width;
import axios from 'axios';

export default function SearchDropDownGrammar(props) {
    const { dataGrammar, navigation,dataVocu  } = props;
    const [check, setCheck] = useState(false);
    const dispatch = useDispatch();
    const searchData = (item) => {
       dispatch(RemoteTextVocabulary(item.grammar.split("=>")[0]));
        Alert.alert(
            "Alert",
            "Do you want to use "+item.grammar+ "the app's vocabulary?",
            [
                {
                    text: "No",
                    // onPress: () => {
                    //     // props.press();
                    //     console.log("Cancel Pressed");
                        
                    //     dispatch(RemoteTextVocabulary(item.grammar.split("=>")[0]));
                    // },
                    onPress: props.onPress,
                    style: "cancel"

                },
                {
                    text: "Yes", onPress: () => {
                        var d= {};
                        d.word = item.grammar.split("=>")[0];
                        d.vn = item.grammar.split("=>")[1];
                        d.type="Ngữ pháp";
                        d.explain = item;
                        dataVocu.data.push(d);
                        axios.post('http://192.168.1.72:3002/language/createWordInVoca', {
                            "id": dataVocu._id,
                            "word": item.grammar.split("=>")[0],
                            "vn": item.grammar.split("=>")[1],
                            "type": "Ngữ pháp",
                            "explain": item,
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
                        navigation.navigate("ListWordVocabulary", {navigation: navigation, listdata: dataVocu, status: false});
                    }
                },
                {
                    text: "Xem ngữ pháp", onPress: () => {
                        navigation.navigate("ExplainScreen", {word: item});
                    }
                }
            ]
        )
    }

    const renderGrammar = ({ item }) => {
        return (
            <TouchableOpacity style={styles.itemView} onPress={() => searchData(item)}>
                <Text style={styles.itemText}>{item.grammar}</Text>
            </TouchableOpacity>
        )
    }
    return (
        <TouchableOpacity
            onPress={props.onPress}
            style={styles.container}>

                <View>
                {
                    dataGrammar.length ?
                        <ScrollView>
                            <FlatList
                                // style={{}}
                                style={styles.subContainer}
                                data={dataGrammar}
                                keyExtractor={item => item.id}
                                renderItem={renderGrammar}
                            />
                        </ScrollView>

                        : 
                        <Text></Text>
                }

            </View>
        </TouchableOpacity>

    )
}


const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        left: 0, right: 0, bottom: 0,
        // top: 130,
        top: WIDTH / 3,
        width: 400,
        zIndex: 1
    },
    subContainer: {
        minHeight: 200,
        backgroundColor: '#fff',
        paddingTop: 10,
        marginHorizontal: 20,
        borderTopLeftRadius: 4,
        borderTopRightRadius: 4,
        flexWrap: 'wrap',
    },
    itemView: {
        borderBottomColor: '#cccccc',
        borderBottomWidth: 1,
        backgroundColor: 'white',
        minHeight: 30,
        width: WIDTH,
        marginBottom: 10,
        justifyContent: 'center',
        borderRadius: 4,
    },
    itemText: {
        color: 'black',
        paddingHorizontal: 10,
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

});