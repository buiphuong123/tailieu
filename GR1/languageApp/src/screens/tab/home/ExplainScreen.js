import React, { useState } from 'react'
import { Text, View, SafeAreaView, Dimensions, Image, TouchableOpacity, StyleSheet, Button, FlatList } from 'react-native'
import CustomHeader from '../../CustomHeader';
import Icon from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import Furi from 'react-native-furi'

export default ExplainScreen = ({ navigation, route }) => {
    const { word } = route.params;
    const renderItem = ({ item }) => {
        return (
            <View style={{ flexDirection: 'row' }}>
                <Text>😄</Text>
                <Text style={{ color: 'red', fontWeight: 'bold', marginLeft: 10 }}>[{item}]</Text>
                <Text style={{ marginLeft: 10, color: 'blue', fontWeight: 'bold' }}>+ {word.grammar}</Text>
            </View>
        )
    }
    const renderMean = ({ item }) => {
        return (
            <View style={{ flexDirection: 'row' }}>
                <Text style={{}}>・</Text>
                <Text style={{ fontWeight: 'bold', marginLeft: 5 }}>{item}</Text>
            </View>
        )
    }

    const renderExample = ({ item, index }) => {
        return (
            <View>
                <View style={{flexDirection: 'row', padding: 10}}>
                    <Text style={{marginTop: 10}}>{index +1}/</Text>
                    <Furi
                        style={{marginLeft: 10}}
                        value={item.jp}
                        valueStyle={{
                            color: 'black',
                            borderColor: 'black',
                            borderWidth: 0,
                        }}
                        furiStyle={{
                            borderColor: 'red',
                            borderWidth: 0,
                        }}
                        showFuri={true}
                        size={13}
                    />
                </View>
                <Text>{item.vn}</Text>
            </View>
        )
    }
    return (
        <View style={{ flex: 1 }}>
            <CustomHeader title={word.grammar} navigation={navigation} />
            <View style={{ marginTop: 20, marginLeft: 15 }}>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={{ color: '#009387', fontWeight: 'bold' }}> {word.grammar} :</Text>
                    <Text style={{ flexShrink: 1, marginLeft: 10, paddingRight: 10, color: 'red', fontWeight: 'bold' }}>{word.translation}</Text>
                </View>
                <View style={{ marginTop: 20 }}>
                    <Text style={{ fontWeight: 'bold', color: 'blue', fontSize: 18, textDecorationLine: 'underline' }}>Cấu trúc: </Text>
                    <FlatList
                        style={{ marginTop: 15, marginLeft: 20 }}
                        data={word.structure}
                        keyExtractor={item => item.id}
                        renderItem={renderItem}
                    />
                </View>
                <View style={{ marginTop: 20 }}>
                    <Text style={{ fontWeight: 'bold', color: 'blue', fontSize: 18, textDecorationLine: 'underline' }}>Ý nghĩa: </Text>
                    <FlatList
                        style={{ marginTop: 15, marginLeft: 20 }}
                        data={word.mean}
                        keyExtractor={item => item.id}
                        renderItem={renderMean}
                    />
                </View>
                {word.indication.length === 0 ? null :
                    <View style={{ marginTop: 20 }}>
                        <Text style={{ fontWeight: 'bold', color: 'blue', fontSize: 18, textDecorationLine: 'underline' }}>Dấu hiện nhận biết: </Text>
                        <FlatList
                            style={{ marginTop: 15, marginLeft: 20 }}
                            data={word.indication}
                            keyExtractor={item => item.id}
                            renderItem={renderMean}
                        />
                    </View>
                }
                <View style={{ marginTop: 20 }}>
                    <Text style={{ fontWeight: 'bold', color: 'blue', fontSize: 18, textDecorationLine: 'underline' }}>Ví dụ: </Text>
                    <FlatList
                        style={{ marginTop: 15 }}
                        data={word.example}
                        keyExtractor={item => item.id}
                        renderItem={renderExample}
                    />
                </View>
            </View>
            <TouchableOpacity
                style={{ borderWidth: 1, width: 50, borderRadius: 30, backgroundColor: '#009387', borderColor: '#009387', bottom: 20, right: 20, position: 'absolute', zIndex: 1 }}
                onPress={() => navigation.navigate("HomeDetail")}>
                <Entypo name={'triangle-right'} size={50} style={{ color: 'white' }} />
            </TouchableOpacity>
        </View>
    )
}