import { Center } from 'native-base';
import React, { useState, useEffect } from 'react'
import { Text, View, SafeAreaView, Dimensions, Image, TouchableOpacity, StyleSheet, Button, FlatList, ScrollView } from 'react-native'
import { useSelector, useDispatch } from 'react-redux';
import CustomHeader from '../../CustomHeader';

export default ResultScreen = ({ navigation, route }) => {
  const { listQuestion } = route.params;
  const renderResult = ({ item, index }) => {
    return (
      <View>
        <View>
          <View style={{ paddingTop: 10, paddingLeft: 20 }}>
            <View>
              <View>
                <Text>{index + 1}. {item.word}</Text>
                <Text>Nghia: [{item.vn}] </Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    )
  }
  return (
    <View style={{flex: 1}}>
       <CustomHeader title="Bài test ghép từ" navigation={navigation} />
      <ScrollView style={{ flex: 1 }}>
      <View style={{ padding: 10, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ fontSize: 18, color: 'blue', padding: 10 }}>Kết quả bài test</Text>
          <Text>Bạn đã hoàn thành bài test ghép từ. Dưới đây là danh sách các từ bạn đã ghép
          </Text>
        </View>
      <FlatList
        data={listQuestion}
        keyExtractor={(item, index) => item.id}
        renderItem={renderResult}
      />
    </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  textQues: {
    fontWeight: 'bold',

  }
})