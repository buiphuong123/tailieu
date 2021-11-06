import React from 'react'
import {Text, View, SafeAreaView, TouchableOpacity} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons';
import { useTheme } from 'react-native-paper';

const CustomHeader = ({title, isHome, navigation}) => {
    const { colors } = useTheme();
    return (
        <View style={{flexDirection: 'row', height: 50, backgroundColor: '#009387'}}>
            <View style={{flex: 1, justifyContent: 'center'}}>
                {
                    isHome ?
                    <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
                        <Icon name={'menu'} size={29} style={{color: colors.text}} />
                    </TouchableOpacity>
                    :
                    <TouchableOpacity style={{flexDirection: 'row', alignItems: 'center'}} onPress={() => navigation.goBack()}>
                        <Icon name={'arrow-back'} size={29} style={{color: colors.text, marginLeft: 5}} />
                    </TouchableOpacity>
                }
            </View>
            <View style={{flex: 1.5, justifyContent: 'center'}}>
                <Text style={{textAlign: 'center', color: colors.text, fontSize: 18}}>{title}</Text>
            </View>
            <View style={{flex: 1}}></View>
        </View>
    )
}
export default CustomHeader;