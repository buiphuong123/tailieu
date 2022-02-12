import { Center } from 'native-base';
import React, { useState, useEffect } from 'react'
import { Text, View, SafeAreaView, Dimensions, Image, TouchableOpacity, StyleSheet, Button, FlatList, ScrollView } from 'react-native'
import { useSelector, useDispatch } from 'react-redux';

export default ResultScreen = ({ navigation }) => {
  return (
    <ScrollView style={{ flex: 1 }}>
      <View style={{ padding: 10, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ fontSize: 18, color: 'blue', padding: 10 }}>Kết quả bài test</Text>
        <Text>Bạn đã làm đúng 1/2 câu (50%). bạn cần cố gắng hơn</Text>
      </View>
      <View>
        <ScrollView>
          <View style={{ paddingTop: 10, paddingLeft: 20 }}>
            <View style={{ flexDirection: 'row' }}>
              <View>
                <Text style={styles.textQues}>1. </Text>
              </View>
              <View>
                <Text style={styles.textQues}>Question</Text>
              </View>
            </View>
            <View>
              <View style={{flexDirection: 'row'}}>
                <Text>Đáp án: [đáp án] </Text>
                <Text>(OK)</Text>
              </View>
              <Text>(bạn đã chọn sai thành [đáp án sai])</Text>
            </View>
          </View>

          <View style={{ paddingTop: 10, paddingLeft: 20 }}>
            <View style={{ flexDirection: 'row' }}>
              <View>
                <Text style={styles.textQues}>1. </Text>
              </View>
              <View>
                <Text style={styles.textQues}>Question</Text>
              </View>
            </View>
            <View>
              <View style={{flexDirection: 'row'}}>
                <Text>Đáp án: [đáp án] </Text>
                <Text>(OK)</Text>
              </View>
              <Text>(bạn đã chọn sai thành [đáp án sai])</Text>
            </View>
          </View>
        </ScrollView>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  textQues: {
    fontWeight: 'bold',

  }
})