import React, { useState } from 'react'
import { Text, View, SafeAreaView, Dimensions, Image, TouchableOpacity, StyleSheet, Button, FlatList } from 'react-native'
import CustomHeader from '../../CustomHeader';

const WIDTH = Dimensions.get('window').width;
import Icon from 'react-native-vector-icons/Ionicons';

// const { count, word } = props;
export default GrammarScreen = ({ count, word, navigation }) => {
    const furiExample = () => {
        navigation.navigate("ExplainScreen", {word: word});
        // console.log(word.example);
    }
    return (
        <View>
            <TouchableOpacity onPress={()=> furiExample()}>
                <View style={{ borderBottomWidth: 1, borderBottomColor: '#999999', marginTop: 5, width: WIDTH }}>
                    <View style={{ justifyContent: 'space-between', flexDirection: 'row', marginBottom: 5 }}>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.word1}>{count + 1}/</Text>
                            <Text style={styles.word}>{word.grammar}</Text>
                        </View>
                        <View />
                        <TouchableOpacity>
                            <Icon style={[styles.star, { color: 'blue' }]} name="star-outline" size={25} />
                        </TouchableOpacity>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{ marginLeft: 5 }}>{word.translation}</Text>
                        </View>
                        <TouchableOpacity>
                            <Icon style={[styles.check, { color: 'green' }]} name="checkmark-circle-outline" size={25} />
                        </TouchableOpacity>

                    </View>

                </View>

            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    word1: { marginLeft: 5, color: "blue" },
    word: { marginLeft: 5, color: "blue" },
    star: { marginRight: 10 },
    check: { marginRight: 10 },
});