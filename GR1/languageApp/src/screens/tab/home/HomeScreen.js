import React, {Component}  from 'react'
import {Text, View, SafeAreaView, TouchableOpacity} from 'react-native'
import CustomHeader from '../../CustomHeader';

const HomeScreen = ({navigation}) => {
    return (
        <SafeAreaView style={{flex: 1}}>
            <CustomHeader title="Home" isHome={true} navigation={navigation} />
            <View>
                <Text>Home Screen</Text>
                <TouchableOpacity 
                    style={{marginTop: 20}}
                    onPress={() => navigation.navigate("HomeDetail")}
                >
                    <Text>Go to home detail</Text>
                </TouchableOpacity>
            </View>

        </SafeAreaView>
    )
}
export default HomeScreen;