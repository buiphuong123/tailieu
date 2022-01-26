import { Center } from 'native-base';
import React, { useState, useEffect } from 'react'
import { Text, View, SafeAreaView, Dimensions, Image, TouchableOpacity, StyleSheet, Button, FlatList, ScrollView } from 'react-native'
import { useSelector, useDispatch } from 'react-redux';

export default ResultScreen = ({ navigation }) => {
    return (
        <ScrollView style={{ flex: 1 }}>
            <View style={{padding: 10, justifyContent: 'center', alignItems: 'center'}}>
                <Text style={{fontSize: 18, color: 'blue', padding: 10}}>Kết quả bài test</Text>
                <Text>Bạn đã làm đúng 1/2 câu (50%). bạn cần cố gắng hơn</Text>
            </View>
        </ScrollView>
    )
}
