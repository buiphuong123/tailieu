import React, {Component}  from 'react'
import {Text, View, SafeAreaView, TouchableOpacity} from 'react-native'
import CustomHeader from '../../CustomHeader';

const SettingScreen = ({navigation}) => {
    return (
        <SafeAreaView style={{flex: 1}}>
            <CustomHeader title="Setting" isHome={true} navigation={navigation} />
            <View>
                <Text>Setting Screen</Text>
                <TouchableOpacity 
                    style={{marginTop: 20}}
                    onPress={() => navigation.navigate("SettingDetail")}
                >
                    <Text>Go to setting detail</Text>
                </TouchableOpacity>
            </View>

        </SafeAreaView>
    )
}
export default SettingScreen;