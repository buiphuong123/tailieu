import React  from 'react'
import {Text, View, Image, SafeAreaView, TouchableOpacity, ScrollView} from 'react-native'
import en from '../../../assets/images/en.png';

const NotificationStack = ({navigation}) => {
    return (
        <SafeAreaView style={{flex: 1}}>
            {/* <CustomHeader title="Home" isHome={true} navigation={navigation} /> */}
            <ScrollView>
                <Text style={{fontSize: 21, fontWeight: 'bold', padding: 10}}>Thông báo</Text>
                <View style={{padding: 10}}>
                    <View>
                        <View style={{flexDirection: 'row'}}>
                            <View style={{width: 70}}>
                                <Image 
                                    style={{width: 50, height: 50}}
                                    source={en}
                                />
                            </View>
                            <View style={{flexWrap: 'wrap'}}>
                                <Text>bui phuong da thich 1 comment ma trong ngu phap dafd</Text>
                            </View>
                        </View>
                    </View>
                </View>
            </ScrollView>

        </SafeAreaView>
    )
}
export default NotificationStack;