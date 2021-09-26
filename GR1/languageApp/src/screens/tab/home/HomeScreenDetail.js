import React, {Component}  from 'react'
import {Text, View, SafeAreaView, TouchableOpacity} from 'react-native'
import CustomHeader from '../../CustomHeader';

export default HomeScreenDetail = ({navigation}) => {
    return (
        <SafeAreaView style={{flex: 1}}>
            <CustomHeader title="Home detail" navigation={navigation} />
            <View>
                <Text>Home Detail</Text>
            </View>

        </SafeAreaView>
    )
}