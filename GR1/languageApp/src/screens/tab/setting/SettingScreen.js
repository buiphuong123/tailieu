import React, { Component } from 'react'
import { Text, View, SafeAreaView, TouchableOpacity } from 'react-native'
import CustomHeader from '../../CustomHeader';
import { Kanji } from 'react-native-kanji-animation';

const SettingScreen = ({ navigation }) => {
    return (
        <Kanji
            ref={el => kanjiExample = el}
            element="私"
            size={90}
            placeholder={true}
            duration={30000}
            step={3}
            onPress={() => kanjiExample.animate()}
        />
    )
}
export default SettingScreen;