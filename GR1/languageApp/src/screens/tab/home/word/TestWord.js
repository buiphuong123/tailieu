import React, { useState } from 'react'
import { Text, View, SafeAreaView, TouchableOpacity, StyleSheet, TextInput } from 'react-native'
import CustomHeader from '../../../CustomHeader';
import CheckBox from '@react-native-community/checkbox';
import { RadioButton } from 'react-native-paper';
import Picker from '@react-native-picker/picker';
import { useDispatch, useSelector } from 'react-redux';
import { RemoteLikeTest, RemoteN5Test, RemoteN4Test, RemoteN3Test, RemoteN2Test, RemoteAllWordTest, RemoteMemerizeWordTest, RemoteNotMemerizeWordTest, RemoteChooseQuestion, RemoteJoinQuestion } from '../../../../redux/actions/word.action';

const randomNumber = (a, lenthmax) => {
    var arrRandom = [];
    var value = 0;
    while(value <3){
        var b = Math.floor((Math.random() * lenthmax) );
        const index = arrRandom.findIndex(object => {
            return object === b;
        });
        if(index === -1 && b!=a) {
            arrRandom.push(b);
            value++;
        }

    }
    return arrRandom;
}
const TestWord = ({ navigation }) => {
    const dispatch = useDispatch();
    const isN5test = useSelector(state => state.wordReducer.isN5test);
    const isN4test = useSelector(state => state.wordReducer.isN4test);
    const isN3test = useSelector(state => state.wordReducer.isN3test);
    const isN2test = useSelector(state => state.wordReducer.isN2test);
    const isAlltest = useSelector(state => state.wordReducer.isAlltest);
    const isMemerizetest = useSelector(state => state.wordReducer.isMemerizetest);
    const isNotMemerizetest = useSelector(state => state.wordReducer.isNotMemerizetest);
    const islikeTest = useSelector(state => state.wordReducer.islikeTest);
    const ischooseQuestion = useSelector(state => state.wordReducer.ischooseQuestion);
    const isjoinQuestion = useSelector(state => state.wordReducer.isjoinQuestion);
    const wordList = useSelector(state => state.wordReducer.wordList);
    const [numberquestion, setNumberQuestion] = useState(20);
    const [numberlession, setNumberLession] = useState("1");
    const shuffleArray = (array) => {
        let i = array.length - 1;
        for (; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            const temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
        let arrayObj = [];
        for (var j = 0; j < array.length; j++) {
            arrayObj.push(array[j]);
        }
        return arrayObj;
    }
    const playtest = () => {
        // console.log(wordList);
        var listdata = [];
        if (isN5test === true && isN4test === true && isN3test === true && isN2test === true) {
            listdata = listdata.concat(wordList);
        }
        else if (isN5test === true && isN4test === true && isN2test === true) {
            listdata = wordList.filter((e) => e.level === 5) && wordList.filter((e) => e.level === 4) && wordList.filter((e) => e.level === 3);
        }
        else if (isN5test === true && isN4test === true && isN2test === true) {
            listdata = wordList.filter((e) => e.level === 5) && wordList.filter((e) => e.level === 4) && wordList.filter((e) => e.level === 2);
        }
        else if (isN5test === true && isN3test === true && isN2test === true) {
            listdata = wordList.filter((e) => e.level === 5) && wordList.filter((e) => e.level === 3) && wordList.filter((e) => e.level === 2);

        }
        else if (isN4test === true && isN3test === true && isN2test === true) {
            listdata = wordList.filter((e) => e.level === 4) && wordList.filter((e) => e.level === 3) && wordList.filter((e) => e.level === 2);

        }
        else if (isN5test === true && isN4test === true) {
            listdata = wordList.filter((e) => e.level === 5) && wordList.filter((e) => e.level === 4);
        }
        else if (isN5test && isN3test) {
            listdata = wordList.filter((e) => e.level === 5) && wordList.filter((e) => e.level === 3);
        }
        else if (isN5test === true && isN2test === true) {
            listdata = wordList.filter((e) => e.level === 5) && wordList.filter((e) => e.level === 2);
        }
        else if (isN4test === true && isN3test === true) {
            listdata = wordList.filter((e) => e.level === 4) && wordList.filter((e) => e.level === 3);
        }
        else if (isN4test === true && isN2test === true) {
            listdata = wordList.filter((e) => e.level === 4) && wordList.filter((e) => e.level === 2);
        }
        else if (isN3test === true && isN2test === true) {
            listdata = wordList.filter((e) => e.level === 3) && wordList.filter((e) => e.level === 2);
        }
        else if (isN5test === true) {
            listdata = wordList.filter((e) => e.level === 5);
        }
        else if (isN4test === true) {
            listdata = wordList.filter((e) => e.level === 4);
        }
        else if (isN3test === true) {
            listdata = wordList.filter((e) => e.level === 3);
        }
        else if (isN2test === true) {
            listdata = wordList.filter((e) => e.level === 2);
        }
        // console.log('list data o day ', listdata);
        // loai kiem tra
        if (isNotMemerizetest === 'checked') {
            listdata = listdata.filter((e) => e.memerizes.length === 0);
        }
        else if (isMemerizetest === 'checked') {
            listdata = listdata.filter((e) => e.memerizes.length === 1);
        }
        else if (islikeTest === 'checked') {
            listdata = listdata.filter((e) => e.likes.length === 1);
        }
        else {

        }

        var lession = numberlession.split(",");
        // console.log(numberlession.indexOf("oo"));
        if (numberlession.indexOf("-") !== -1) {
            for (var i = 0; i < lession.length; i++) {
                if (lession[i].indexOf("-") !== -1) {
                    var arr = lession[i];
                    lession.splice(lession.indexOf(lession[i]), 1);
                    arr = arr.split("-");
                    lession = lession.concat(arr[0]);
                    lession = lession.concat(arr[1]);
                    var kaka = parseInt(arr[0], 10) + 1;
                    console.log('kaka day ne', arr[0], arr[1], kaka);
                    while (kaka > parseInt(arr[0], 10) && kaka < parseInt(arr[1], 10)) {
                        lession = lession.concat(kaka.toString());
                        kaka = kaka + 1;
                    }
                }
            }
        }
        console.log('lession day nhe', lession);
        var dataTest = [];
        for (var i = 0; i < lession.length; i++) {
            dataTest = dataTest.concat(listdata.filter((e) => e.lession === parseInt(lession[i], 10)));
        }
        console.log('DATA TEST LA ', dataTest);
        if (isjoinQuestion === 'checked') {
            const ranNums = [];
            var maxlength = dataTest.length;
            var j = 0;

            // while (maxlength-- && ranNums.length < Math.floor(numberquestion/3)*2) {
                while (maxlength-- && ranNums.length < 18) {
                j = Math.floor(Math.random() * (maxlength + 1));
                var obqs = {};
                obqs.word = dataTest[j].word;
                obqs.vn = dataTest[j].vn;
                ranNums.push(obqs);
                dataTest.splice(j, 1);
            }
            navigation.navigate("TestJoinWord", { navigation: navigation, listQuestion: ranNums, title: "Test Word"  });
        }
        else if (ischooseQuestion === 'checked') {
            const question = [];
            var as;
            const typeqs = ["word", "vn"];
            for (var i = 0; i < numberquestion; i++) {
                const a = Math.floor((Math.random() * dataTest.length));
                // console.log('dataTest la ', dataTest[a]);
                var rand = typeqs[Math.floor(Math.random() * typeqs.length)];
                console.log('rand la ', rand);
                if (rand === 'vn') {
                    var qs = {};
                    var arr = [];
                    qs.question = dataTest[a].vn;
                    console.log('check cai nay ne', dataTest[a].vn);
                    // qs.chooseas = dataTest[a].word;
                    const arrRan = randomNumber(a, dataTest.length);
                    // console.log('ARRAY RAN LA ', arrRan);
                    // arr.push(dataTest[arrRan[0]].word, dataTest[arrRan[1]].word, dataTest[arrRan[2]].word);
                    for (var po = 0; po < arrRan.length; po++) {
                        const m = arrRan[po];
                        if (dataTest[m] !== undefined) {
                            console.log(dataTest[m].word);
                            arr.push(dataTest[m].word);

                        }
                        else {
                            console.log('undefined');
                        }
                    }
                    // arr.push(dataTest[Math.floor((Math.random() * dataTest.length) + 1)].word, dataTest[Math.floor((Math.random() * dataTest.length) + 1)].word, dataTest[Math.floor((Math.random() * dataTest.length) + 1)].word);
                    // qs.ans2 = dataTest[Math.floor((Math.random() * dataTest.length) + 1)].word;
                    // qs.ans3 = dataTest[Math.floor((Math.random() * dataTest.length) + 1)].word;
                    arr.push(dataTest[a].word);
                    const kaka = shuffleArray(arr);
                    qs.answer = kaka;
                    const index = kaka.findIndex(object => {
                        return object === dataTest[a].word;
                    });
                    qs.anCorrect = index;

                    question.push(qs);
                }
                else {
                    var qs = {};
                    var arr = [];
                    qs.question = dataTest[a].word;
                    // var a = Math.floor((Math.random() * dataTest.length) + 1)
                    // arr.push(dataTest[a].word, dataTest[a].word, dataTest[a].word);
                    // arr.push(dataTest[Math.floor((Math.random() * dataTest.length) + 1)].vn, dataTest[Math.floor((Math.random() * dataTest.length) + 1)].vn, dataTest[Math.floor((Math.random() * dataTest.length) + 1)].vn);
                     const arrRan = randomNumber(a, dataTest.length);
                    //  console.log('ARRAY RAN LA ', arrRan);
                    for (var po = 0; po < arrRan.length; po++) {
                        const m = arrRan[po];
                        if (dataTest[m] !== undefined) {
                            console.log(dataTest[m].vn);
                            arr.push(dataTest[m].vn);

                        }
                        else {
                            console.log('undefined');
                        }
                    }
                    // arr.push(dataTest[arrRan[0]].vn, dataTest[arrRan[1]].vn, dataTest[arrRan[2]].vn);
                    arr.push(dataTest[a].vn);
                    console.log('arr la ', arr);
                    const kaka = shuffleArray(arr);
                    qs.answer = kaka;
                    console.log('kaka la ', kaka);
                    const index = kaka.findIndex(object => {
                        return object === dataTest[a].vn;
                    });
                    qs.anCorrect = index;
                    // console.log('kaka la ', kaka);
                    // qs.chooseas = dataTest[a].vn;
                    // qs.ans1 = dataTest[Math.floor((Math.random() * dataTest.length) + 1)].vn;
                    // qs.ans2 = dataTest[Math.floor((Math.random() * dataTest.length) + 1)].vn;
                    // qs.ans3 = dataTest[Math.floor((Math.random() * dataTest.length) + 1)].vn;
                    question.push(qs);
                }

            }
            console.log('question day nhe ', question);

            navigation.navigate("SelectQuestion", { navigation: navigation, question: question, title: "Test Word" });
        }

    }
    const toggleSwitchAllTest = () => {
        if (isAlltest === 'unchecked') {
            dispatch(RemoteAllWordTest('checked'));
            dispatch(RemoteMemerizeWordTest('unchecked'));
            dispatch(RemoteNotMemerizeWordTest('unchecked'));
            dispatch(RemoteLikeTest('unchecked'));

        }
    }

    const toggleSwitchMemerizeTest = () => {
        if (isMemerizetest === 'unchecked') {
            dispatch(RemoteAllWordTest('unchecked'));
            dispatch(RemoteMemerizeWordTest('checked'));
            dispatch(RemoteNotMemerizeWordTest('unchecked'));
            dispatch(RemoteLikeTest('unchecked'));

        }
    }
    const toggleSwitchNotMemerizeTest = () => {
        if (isNotMemerizetest === 'unchecked') {
            dispatch(RemoteAllWordTest('unchecked'));
            dispatch(RemoteMemerizeWordTest('unchecked'));
            dispatch(RemoteNotMemerizeWordTest('checked'));
            dispatch(RemoteLikeTest('unchecked'));

        }
    }
    const toggleSwitchLikeTest = () => {
        if (isNotMemerizetest === 'unchecked') {
            dispatch(RemoteAllWordTest('unchecked'));
            dispatch(RemoteMemerizeWordTest('unchecked'));
            dispatch(RemoteNotMemerizeWordTest('unchecked'));
            dispatch(RemoteLikeTest('checked'));

        }
    }
    const toggleSwitchChooseQuestion = () => {
        if (ischooseQuestion === 'unchecked') {
            dispatch(RemoteChooseQuestion('checked'));
            dispatch(RemoteJoinQuestion('unchecked'));
        }
    }
    const toggleSwitchJoinQuestion = () => {
        if (isjoinQuestion === 'unchecked') {
            dispatch(RemoteChooseQuestion('unchecked'));
            dispatch(RemoteJoinQuestion('checked'));
        }
    }
    return (
        <View style={{ flex: 1 }}>
            <CustomHeader title="Bài test từ vựng" navigation={navigation} />
            <View>
                <View style={{ alignItems: 'center', justifyContent: 'center', padding: 15 }}>
                    <Text style={{ fontWeight: 'bold', fontSize: 20, color: '#009387' }}>Thiết lập bài test từ vựng</Text>
                </View>
                <View style={{ marginLeft: 10 }}>
                    <View style={{ flexDirection: 'row' }}>
                        <View style={styles.checkboxStyle}>
                            <CheckBox
                                style={styles.checkbox}
                                value={isN5test}
                                onValueChange={() => dispatch(RemoteN5Test(!isN5test))}
                            />
                            <Text style={{ marginTop: 8 }}>N5</Text>
                        </View>
                        <View style={[styles.checkboxStyle, { marginLeft: 20 }]}>
                            <CheckBox
                                style={styles.checkbox}
                                value={isN4test}
                                onValueChange={() => dispatch(RemoteN4Test(!isN4test))}
                            />
                            <Text style={{ marginTop: 8 }}>N4</Text>
                        </View>
                        <View style={[styles.checkboxStyle, { marginLeft: 20 }]}>
                            <CheckBox
                                style={styles.checkbox}
                                value={isN3test}
                                onValueChange={() => dispatch(RemoteN3Test(!isN3test))}
                            />
                            <Text style={{ marginTop: 8 }}>N3</Text>
                        </View>
                        <View style={[styles.checkboxStyle, { marginLeft: 20 }]}>
                            <CheckBox
                                style={styles.checkbox}
                                value={isN2test}
                                onValueChange={() => dispatch(RemoteN2Test(!isN2test))}
                            />
                            <Text style={{ marginTop: 8 }}>N2</Text>
                        </View>

                    </View>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <View style={{ marginLeft: 10, flexDirection: 'row' }}>
                        <RadioButton
                            status={isAlltest}
                            onPress={() => toggleSwitchAllTest()}
                        />
                        <Text style={{ marginTop: 8 }}>Tất cả</Text>
                    </View>
                    <View style={{ marginLeft: 10, flexDirection: 'row' }}>
                        <RadioButton
                            status={isNotMemerizetest}
                            onPress={() => toggleSwitchNotMemerizeTest()}
                        />
                        <Text style={{ marginTop: 8 }}>Chưa nhớ</Text>
                    </View>
                    <View style={{ marginLeft: 10, flexDirection: 'row' }}>
                        <RadioButton
                            status={isMemerizetest}
                            onPress={() => toggleSwitchMemerizeTest()}
                        />
                        <Text style={{ marginTop: 8 }}>Đã nhớ</Text>
                    </View>
                    <View style={{ marginLeft: 10, flexDirection: 'row' }}>
                        <RadioButton
                            status={islikeTest}
                            onPress={() => toggleSwitchLikeTest()}
                        />
                        <Text style={{ marginTop: 8 }}>Thích</Text>
                    </View>
                </View>

                <View style={{ flexDirection: 'row' }}>
                    <View style={{ marginLeft: 10, flexDirection: 'row' }}>
                        <RadioButton
                            status={ischooseQuestion}
                            onPress={() => toggleSwitchChooseQuestion()}
                        />
                        <Text style={{ marginTop: 8 }}>Dạng chọn đáp án đúng</Text>
                    </View>
                    <View style={{ marginLeft: 10, flexDirection: 'row' }}>
                        <RadioButton
                            status={isjoinQuestion}
                            onPress={() => toggleSwitchJoinQuestion()}
                        />
                        <Text style={{ marginTop: 8 }}>Dạng ghép từ</Text>
                    </View>
                </View>
                <View style={{ marginLeft: 15, flexDirection: 'row' }}>
                    <View>
                        <Text style={{ marginTop: 20 }}>Số câu hỏi tối đa</Text>
                    </View>
                    <View>
                        <TextInput
                            keyboardType='numeric'
                            style={styles.input}
                            onChangeText={(text) => setNumberQuestion(text.replace(/[^0-9]/g, ''))}
                            value={numberquestion}
                        />
                    </View>

                    {/* <Picker
                        selectedValue={selectedLanguage}
                        onValueChange={(itemValue, itemIndex) =>
                            setSelectedLanguage(itemValue)
                        }>
                        <Picker.Item label="Java" value="java" />
                        <Picker.Item label="JavaScript" value="js" />
                    <
                    </Picker> */}
                </View>
                <View style={{ marginLeft: 10 }}>
                    <Text>Chọn bài muốn test</Text>
                    <Text style={{ color: 'red' }}>Ví dụ: Nhập 1,2,4-6 để test các bài 1,2,3,4,5,6</Text>
                    <TextInput
                        style={{ borderBottomWidth: 1, padding: 10, marginTop: 10, height: 40, borderBottomColor: 'blue' }}
                        // onChangeText={(val) => handlePasswordChange(val)}
                        onChangeText={text => setNumberLession(text)}
                        value={numberlession}
                    />
                </View>
                <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                    <TouchableOpacity
                        onPress={() => playtest()}
                        style={[styles.signIn, {
                            borderColor: '#009387',
                            borderWidth: 1,
                            marginTop: 15
                        }]}
                    >
                        <Text style={[styles.textSign, {
                            color: '#009387'
                        }]}>Làm bài</Text>
                    </TouchableOpacity>
                </View>
            </View>


        </View >
    )
}
const styles = StyleSheet.create({
    checkboxStyle: {
        flexDirection: 'row',
    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
    },
    signIn: {
        width: '50%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },
    textSign: {
        fontSize: 18,
        fontWeight: 'bold'
    }
})
export default TestWord;