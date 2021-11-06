import React, { useState } from 'react'
import { Text, View, SafeAreaView, Dimensions, Image, TouchableOpacity, StyleSheet, Button, FlatList } from 'react-native'
import CheckBox from '@react-native-community/checkbox';
// import AppText from '../../../components/app-text';
const WIDTH = Dimensions.get('window').width;
import Icon from 'react-native-vector-icons/Ionicons';
import ListGrammer from './ListGrammer';
import CustomHeader from '../../CustomHeader';

export default Grammer = ({ navigation, route }) => {
    const {dataGrammar} = route.params;
    const takedata = () => {
        console.log(dataGrammar);
    }
  return (
    <View style={{flex: 1}}>
        <CustomHeader title=" ~ ならでは" navigation={navigation} />
                <View style={{ flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: 'blue', padding: 10 }}>
                    <View style={styles.checkboxContainer}>
                        <CheckBox
                            style={styles.checkbox}
                            value={ true}
                            // onValueChange={(value) => this.props.setword(value)}
                        />
                        {/* <AppText i18nKey={"word"} style={styles.label} /> */}
                        <Text style={styles.label}>chưa nhớ</Text>
                    </View>

                    <View style={styles.checkboxContainer}>
                        <CheckBox
                            style={styles.checkbox}
                            value={true}
                            // onValueChange={(value) => this.props.setHiraword(value)}
                        />
                        {/* <AppText i18nKey={"hira"} style={styles.label} /> */}
                        <Text style={styles.label}>đã nhớ</Text>
                    </View>
                </View>
                <View style={{flex: 1}}>
                    <ListGrammer navigation={navigation} dataGrammar={dataGrammar}/>
                </View>

            </View>
  )
}
const styles = StyleSheet.create({

    checkboxContainer: {
        flexDirection: "row",
    },
    
    label: {
        margin: 8,
        marginLeft: 0
    },
});