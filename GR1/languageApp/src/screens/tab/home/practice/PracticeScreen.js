import React, { Component, useState } from 'react'
import { Text, View, SafeAreaView, TouchableOpacity } from 'react-native'
import CustomHeader from '../../../CustomHeader'
import Icon from 'react-native-vector-icons/Ionicons';
import { useTheme } from 'react-native-paper';
import { element } from 'prop-types';
import { ScrollView } from 'react-native-gesture-handler';
import axios from 'axios';
const PracticeScreen = ({ }) => {
    const { colors } = useTheme();
    const [listques, setlistques] = useState([
        {
            "listAns": [
                "①. を",
                "②. が",
                "③. の",
                "④. も",
                ""
            ],
            "_id": "6284a232b9106a5cdc9ae593",
            "question": "①) そ れ は わ た し ( ) か さ で す 。",
            "answer": 2,
            "explain": "Dịch nghĩa: Đó là cây dù của tôi.",
            "level": 5,
            "lession": 1,
            "data": {
                "uses": [
                    {
                        "explain": "Bổ nghĩa cho danh từ đi sau và diễn tả nhiều ý nghĩa khác nhau của danh từ đó, như tính chất, trạng thái, chủng loại, số lượng, v.v...",
                        "note": "",
                        "examples": [
                            {
                                "content": "我が家には3人の娘がいます。",
                                "mean": "Nhà chúng tôi có 3 cô con gái.",
                                "transcription": "わがやには3にんのむすめがいます。"
                            },
                            {
                                "content": "彼女に青色の花をあげる。",
                                "mean": "Tôi sẽ tặng cô ấy những bông hoa màu xanh.",
                                "transcription": "かのじょにあおいろのはなをあげる。"
                            }
                        ],
                        "mean": "",
                        "synopsis": "Bổ nghĩa cho danh từ đi sau."
                    }
                ],
                "_id": "6283c439f3d56356c05e3b8b",
                "level": 5,
                "grammar": "N1 の N2 => N2 có tính chất hoặc số lượng N1 ( Tính chất)",
                "__v": 0,
                "lession": 7
            },
            "__v": 0
        },
        {
            "listAns": [
                "①. で",
                "②. に",
                "③. が",
                "④. の",
                ""
            ],
            "_id": "6284a49cb9106a5cdc9ae594",
            "question": "②) じ て ん し ゃ ( ) 学 校 へ 行 き ま す 。",
            "answer": 0,
            "explain": "Tôi đi học bằng xe đạp.",
            "level": 5,
            "lession": 1,
            "data": {
                "uses": [
                    {
                        "explain": "  ☞ Diễn tả nơi xảy ra hành động ☞ Diễn tả nơi xảy ra sự kiện ☞ Diễn tả nguyên nhân ☞ Diễn tả phương pháp, phương thức, phương tiện ☞ Diễn tả sự vật được làm bằng vật liệu/chất liệu gì ☞ Diễn tả một khoảng thời gian giới hạn ",
                        "note": "",
                        "examples": [
                            {
                                "content": "姫路で岡山行きの列車に乗り換える。",
                                "mean": "Tôi ｃhuyển sang xe lửa đi Okayama ở Himeji.",
                                "transcription": "ひめじでおかやまいきのれっしゃにのりかえる。"
                            },
                            {
                                "content": "明後日は体育館でスポーツ大会があります。",
                                "mean": "Ngày kia ở trung tâm thể dục sẽ có đại hội thể thao.",
                                "transcription": "あさってはたいいくかんですぽーつたいかいがあります。"
                            },
                            {
                                "content": "事故でバスが止まっています。",
                                "mean": "Vì sự cố nên xe buýt đang bị dừng.",
                                "transcription": "じこでばすがとまっています。"
                            },
                            {
                                "content": "その機械は電気で動く。",
                                "mean": "Cái máy đó chạy bằng điện.",
                                "transcription": "そのきかいはでんきでうごく。"
                            },
                            {
                                "content": "このクリームでおいしいケーキを作ります。",
                                "mean": "Tôi sẽ làm một cái bánh ngon bằng loại kem này.",
                                "transcription": "このくりーむでおいしいけーきをつくります。"
                            },
                            {
                                "content": "このプロジェクトは一ヶ月で終りますか。",
                                "mean": "Dự án này trong 1 tháng có xong không?",
                                "transcription": "このぷろじぇくとはいっかげつでおわりますか。"
                            }
                        ],
                        "mean": " : Tại, ở, vì, bằng, với (khoảng thời gian) ",
                        "synopsis": " ～ で "
                    }
                ],
                "_id": "6283c415fa464844e0dd0c7d",
                "level": 5,
                "grammar": "～で     =>Tại, ở, vì, bằng, với (khoảng thời gian)",
                "__v": 0,
                "lession": 2
            },
            "__v": 0
        },
        {
            "listAns": [
                "①. を",
                "②. が",
                "③. で",
                "④. に",
                ""
            ],
            "_id": "6284a4feb9106a5cdc9ae595",
            "question": "③) 母 は り ょ う り ( ) じ ょ う ず で す 。",
            "answer": 1,
            "explain": "Mẹ tôi nấu ăn rất ngon.",
            "level": 5,
            "lession": 1,
            "data": {
                "uses": [
                    {
                        "explain": "Dùng để nói về một thuộc tính của chủ đề được biểu thị bởi「 は」 . Danh từ 1 là chủ đề của câu . Danh từ 2 là chủ ngữ được bổ nghĩa bởi tính từ .",
                        "note": "",
                        "examples": [
                            {
                                "content": "ベトナムは食べ物が美味しいです。                                                ",
                                "mean": "\n                                                    Thức ăn ở Việt Nam ngon .                                                ",
                                "transcription": "べとなむはたべものがおいしいです。"
                            },
                            {
                                "content": "\n                                                    象は耳が大きいです。                                                ",
                                "mean": "\n                                                    Con voi có cái tai lớn.                                                ",
                                "transcription": "ぞうはみみがおおきいです。"
                            }
                        ],
                        "mean": "",
                        "synopsis": "N1 は N2 が A-い/ Na-な"
                    }
                ],
                "_id": "6283c4699a18e014dcb497c2",
                "level": 5,
                "grammar": "は...が... => Cái gì đó như thế nào",
                "__v": 0,
                "lession": 13
            },
            "__v": 0
        },
        {
            "listAns": [
                "①. に",
                "②. は",
                "③. も",
                "④. が",
                ""
            ],
            "_id": "6284a535b9106a5cdc9ae596",
            "question": "④) き ょ う し つ に は だ れ ( ) い ま せ ん で し た 。",
            "answer": 2,
            "explain": "Trong phòng học không có ai cả.",
            "level": 5,
            "lession": 1,
            "data": {
                "uses": [
                    {
                        "explain": "  ☞ Dùng miêu tả sự việc/ hành động/ tính chất tương tự với một sự việc/ hành động/ tính chất đã nêu trước đó. (nhằm tránh lặp lại trợ từ “は”/động từ nhiều lần) ☞ Thể hiện sự ngạc nhiên về mức độ nhiều. ☞ Thể hiện mức độ không giống như bình thường (cao hơn hoặc thấp hơn) ",
                        "note": "☞ “も” có chức năng tương tự như “は”, “が” nên không đứng liền kề với “は”, “が\"khi dùng cho một chủ từ.<br>☞ “も” cũng có thể đứng sau các trợ từ khác giống như “は” で／と／へ／など も<br>Ví dụ: 日曜日(にちようび)ですが、どこへも行(い)けません。 Ngày chủ nhật nhưng tôi cũng chẳng thể đi đâu.",
                        "examples": [
                            {
                                "content": "田中さんは医者です。私も医者です。",
                                "mean": "Anh Tanaka là bác sĩ. Tôi cũng là bác sĩ.",
                                "transcription": "たなかさんはいしゃです。わたしもいしゃです。"
                            },
                            {
                                "content": "雨はもう四日も降っています。",
                                "mean": "Trời đã mưa tới 4 ngày rồi.",
                                "transcription": "あめはもうよんにちもふっています。"
                            },
                            {
                                "content": "お客はひとりも来なかった。",
                                "mean": "Không có một người khách nào tới.",
                                "transcription": "おきゃくはひとりもこなかった。"
                            }
                        ],
                        "mean": " : Cũng, đến mức, đến cả ",
                        "synopsis": " ～ も "
                    }
                ],
                "_id": "6283c415fa464844e0dd0c80",
                "level": 5,
                "grammar": "～も     =>Cũng, đến mức, đến cả",
                "__v": 0,
                "lession": 3
            },
            "__v": 0
        },
        {
            "listAns": [
                "①. と",
                "②. の",
                "③. が",
                "④. を",
                ""
            ],
            "_id": "6284a55db9106a5cdc9ae597",
            "question": "⑤) り ょ う り ( ) 本 を か い ま し た 。",
            "answer": 0,
            "explain": "Tôi đã mua sách dạy nấu ăn",
            "level": 5,
            "lession": 1,
            "data": {
                "uses": [
                    {
                        "explain": "Bổ nghĩa cho danh từ đi sau và diễn tả nhiều ý nghĩa khác nhau của danh từ đó, như tính chất, trạng thái, chủng loại, số lượng, v.v...",
                        "note": "",
                        "examples": [
                            {
                                "content": "我が家には3人の娘がいます。",
                                "mean": "Nhà chúng tôi có 3 cô con gái.",
                                "transcription": "わがやには3にんのむすめがいます。"
                            },
                            {
                                "content": "彼女に青色の花をあげる。",
                                "mean": "Tôi sẽ tặng cô ấy những bông hoa màu xanh.",
                                "transcription": "かのじょにあおいろのはなをあげる。"
                            }
                        ],
                        "mean": "",
                        "synopsis": "Bổ nghĩa cho danh từ đi sau."
                    }
                ],
                "_id": "6283c439f3d56356c05e3b8b",
                "level": 5,
                "grammar": "N1 の N2 => N2 có tính chất hoặc số lượng N1 ( Tính chất)",
                "__v": 0,
                "lession": 7
            },
            "__v": 0
        }
    ]);
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
        setCheckTest(false);
    }
    const checkDAtaGrammar = () => {
        console.log('vao check');
        axios.post('http://192.168.1.72:3002/language/getKanji', {
            "id": "61590bbd7463724428b252d2",
        }, {
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            }
        })
            .then((response) => {
                console.log(response.data);
                console.log('DATA DAY NHE ',response.data.grammar);
            })
            .catch(function (error) {
                throw error;
            })
    }
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
                                    <Text style={{ color: 'blue', fontSize: 17 }}>{element.question}</Text>
                                    {
                                        element.listAns.map((item, key1) => {
                                            return (
                                                <View>
                                                    <TouchableOpacity key={key1} onPress={() => chooseAns(element, item)} style={{ paddingTop: 5, paddingLeft: 5 }}>
                                                        <Text style={{ color: checkTest=== true && key1!==element.answer && element.answer!== element.choose? 'red': checkTest=== false&& element.choose === key1 ? 'blue' : 'black' }}>{item}</Text>
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
                                                                    <TouchableOpacity>
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
                <TouchableOpacity style={{marginBottom: 20}} onPress={() => checkDAtaGrammar()}>
                    <Text>check api</Text>
                </TouchableOpacity>
            </ScrollView>

        </SafeAreaView>
    )
}
export default PracticeScreen;