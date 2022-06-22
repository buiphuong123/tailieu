import React, { Component, useEffect, useState } from 'react'
import { Text, View, SafeAreaView, TouchableOpacity } from 'react-native'
import CustomHeader from '../../../CustomHeader'
import Icon from 'react-native-vector-icons/Ionicons';
import { useTheme } from 'react-native-paper';
import { element } from 'prop-types';
import { ScrollView } from 'react-native-gesture-handler';
import axios from 'axios';
const PracticeScreen = ({navigation, route}) => {
    const { colors } = useTheme();
    const {dataqs} = route.params;
    // const [data, setData] = useState(dataqs);
    
    const [listques, setlistques] = useState([]);
    useEffect(() => {
        // setlistques(dataqs);
        setlistques( dataqs.map((obj, i) => ({ ...obj, choose: undefined })));
        console.log('ban dau day nhe',dataqs);
    }, [dataqs, navigation]);
    const [checkTest, setCheckTest] = useState(false);
    const [count, setCount] = useState(0);
    const chooseAns = (question, choo) => {
        const objIndex = listques.findIndex(e => e._id === question._id);
        const objIndex1 = listques[objIndex].listAns.indexOf(choo);
        listques[objIndex].choose = objIndex1;
        setlistques([...listques]);
    }
    const submitTest = () => {
        const count = listques.filter(e => e.answer === e.choose);
        setCount(count.length);
        setCheckTest(true);
    }
    const replayTest = () => {
        console.log(dataqs);
        setlistques( dataqs.map((obj, i) => ({ ...obj, choose: undefined })));
        setCheckTest(false);
    }
  
    // const check = () => {
    //     if(checkTest === true) {
    //         if(ke1!== element.answer&&key1 !==element.choose)
    //         // && key1!==element.answer && 
    //         // element.answer!== element.choose? 
    //         // 'red': checkTest=== false&& element.choose === key1 ? 'blue' : 'black'
    //     // }
    // }
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={{ flexDirection: 'row', height: 50, backgroundColor: '#009387', justifyContent: 'flex-start' }}>
                <View style={{ justifyContent: 'center' }}>
                    <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }} onPress={() => navigation.goBack()}>
                        <Icon name={'arrow-back'} size={29} style={{ color: colors.text, marginLeft: 5 }} />
                    </TouchableOpacity>
                </View>
                <View style={{ justifyContent: 'center' }}>
                    <Text style={{ textAlign: 'center', color: colors.text, fontSize: 18, marginLeft: 10 }}>Test 1</Text>
                </View>
                <View style={{ flex: 5, flexDirection: 'row', marginRight: 20, justifyContent: 'flex-end' }}>
                    {checkTest === false ?
                        <TouchableOpacity style={{ justifyContent: 'center' }} onPress={() => submitTest()}>
                            <Text style={{ textAlign: 'center', color: colors.text, fontSize: 18 }}>Nộp bài </Text>
                        </TouchableOpacity>
                        : 
                        <TouchableOpacity style={{ justifyContent: 'center' }} onPress={() => replayTest()}>
                            <Text style={{ textAlign: 'center', color: colors.text, fontSize: 18 }}>Làm lại</Text>
                        </TouchableOpacity>
                    }
                </View>
            </View>
            <ScrollView style={{ padding: 10 }}>
                <View>
                    {checkTest === true ?
                        <View style={{ justifyContent: 'center' }}>
                            <Text style={{ fontWeight: 'bold', fontSize: 18, textAlign: 'center', marginBottom: 10 }}>Banj đã trả lời đúng: {count}/{listques.length} câu hỏi</Text>
                        </View>
                        : null}
                    {listques.map((element, key) => {
                        return (
                            <View key={key}>
                                <View>
                                    <Text style={{ color: 'blue', fontSize: 17 }}>{key +1}. {element.question}</Text>
                                    {
                                        element.listAns.map((item, key1) => {
                                             return (
                                                <View>
                                                    <TouchableOpacity key={key1} onPress={() => chooseAns(element, item)} style={{ paddingTop: 5, paddingLeft: 5 }}>
                                                        <Text 
                                                        style={{ color: checkTest===true&& key1 === element.answer ? 'blue': (checkTest===true&& key1!==element.answer&&key1===element.choose)? 'red': checkTest=== false&& element.choose === key1 ? 'blue': 'black' }}>{item}</Text>
                                                    </TouchableOpacity>
                                                    {
                                                        checkTest === true && key1 === 4 ?
                                                            <View style={{ marginBottom: 10 }}>
                                                                <Text style={{ fontWeight: 'bold' }}>Đáp án đúng: {element.listAns[element.answer]}</Text>
                                                                <View  style={{marginBottom: 10}}>
                                                                    <View style={{flexDirection: 'row'}}>
                                                                    <Text>Dịch nghĩa : </Text>
                                                                    <Text style={{color: 'red', fontStyle: 'italic',}}>{element.explain}</Text>
                                                                    </View>
                                                                    <TouchableOpacity onPress={() => navigation.navigate("ExplainScreen", {word: element.data})}>
                                                                        <Text style={{textDecorationLine: 'underline', color: 'blue'}}>giải thích chi tiết ngữ pháp</Text>
                                                                    </TouchableOpacity>
                                                                </View>
                                                            </View>
                                                            : null
                                                    }
                                                </View>
                                            )
                                        })
                                    }

                                </View>
                            </View>
                        )
                    })}
                </View>
            </ScrollView>

        </SafeAreaView>
    )
}
export default PracticeScreen;