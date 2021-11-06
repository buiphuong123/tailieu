import React, {Component}  from 'react'
import {Text, View, SafeAreaView, TouchableOpacity} from 'react-native'
import CustomHeader from '../../CustomHeader';

const ContactStack = ({navigation}) => {
    return (
        <SafeAreaView style={{flex: 1}}>
            {/* <CustomHeader title="Home" isHome={true} navigation={navigation} /> */}
            <View>
                <Text>Contact Screen</Text>
            </View>

        </SafeAreaView>
    )
}
export default ContactStack;