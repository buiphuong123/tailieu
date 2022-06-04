import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Agenda } from 'react-native-calendars';
import { Card, Avatar, Button } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useDispatch, useSelector } from 'react-redux';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import { getListScheduleSuccess } from '../../../redux/actions/schedule.action';
import { RemoteWord } from '../../../redux/actions/word.action';
import axios from 'axios';

export default Calendar = ({navigation}) => {
  const scheduleList = useSelector(state => state.scheduleReducer.scheduleList);
  const [items, setItems] = useState({});
  var index =0;
  const timeToString = (time) => {
    const date = new Date(time);
    return date.toISOString().split('T')[0];
  };
  const dispatch = useDispatch();
  useEffect(() => {
    console.log('BEN CALENDAR DAY NHE ',scheduleList);
    setItems(scheduleList);
  });
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setItems(scheduleList);
      //Put your Data loading function here instead of my loadData()
    });

    return unsubscribe;
  }, [navigation]);


  const [dot, setDot] = useState({});
  const loadItems = (day) => {
    setTimeout(() => {
      for (let i = -15; i < 85; i++) {
        const time = day.timestamp + i * 24 * 60 * 60 * 1000;
        const strTime = timeToString(time); // ngay ma chung ta chon
        if (!items[strTime]) {
          items[strTime] = [];
          // const numItems = Math.floor(Math.random() * 3 + 1);
          // for (let j = 0; j < numItems; j++) {
          items[strTime].push({
            nameSchedule: '',
          });
          // }
        }
      }

      const newItems = {};
      Object.keys(items).forEach((key) => {
        newItems[key] = items[key];
      });

      Object.keys(items).forEach((key) => {
        // console.log(newItems[key]);
        if (items[key].nameSchedule !== '') {
          dot[key] = items[key];
          // dot[key] = { marked: true };
        }
      });
  Object.keys(items).forEach((key) => {
    if (items[key][0].nameSchedule !== '') {
      dot[key] = { marked: true };
    }
  });
  setDot(dot)
      console.log('DOT LA ', dot);
      setItems(newItems);
    }, 1000);
  };
  const check = () => {
    console.log(scheduleList);
    console.log('DATA ITEM DAY NHE');
    // console.log(items);
  }
  const editCalen = (item) => {
    console.log('CAI CAN EDIT LA', item);
    navigation.navigate("EditCalendar", {calen: item})
  }

  const deleteCalen = (item) => {
    axios.post('http://192.168.1.722:3002/language/deleteschedule', {
      "id": item._id,
    }, {
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      }
    })
      .then((response) => {
        console.log(response.data);
      })
      .catch(function (error) {
        throw error;
      })
  }
  const addCalen = () => {
    navigation.navigate("AddCalendar");
  }
  const renderItem = (item) => {
    return (
      <View>
        <TouchableOpacity style={{ marginRight: 10, marginTop: 17 }}>
          {
            item.nameSchedule !== '' ?
              <Card>
                <Card.Content style={{
                  borderLeftWidth: 2,
                  borderLeftColor: 'red'
                }}>
                  <View>
                    <Text style={{ fontWeight: 'bold', fontSize: 18 }}>{item.nameSchedule}</Text>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                      }}>
                      <View style={{ flexDirection: 'row', marginTop: 10 }}>
                        <AntDesign name={'clockcircleo'} size={20} />
                        <Text style={{ marginLeft: 10 }}>{item.time}</Text>
                      </View>
                      {
                        item.method === 1 ?
                          <Icon name={'notifications-outline'} size={20} style={{ color: 'black' }} />
                          :
                          item.method === 2 ?
                            <Entypo name={'mail'} size={20} style={{ color: mailNoti ? 'blue' : '#bfbfbf' }} />
                            :
                            item.method === 3 ?
                              <View style={{ flexDirection: 'row' }}>
                                <TouchableOpacity style={{ marginLeft: 40 }}>
                                  <MaterialIcons name={'phone-iphone'} size={20} />
                                </TouchableOpacity>
                                <TouchableOpacity style={{ marginLeft: 10 }}>
                                  <Entypo name={'mail'} size={20} />
                                </TouchableOpacity>
                              </View>
                              : null

                      }

                    </View>
                  </View>
                  {/* <View>
              <Text>jhjhj</Text>
            </View> */}
                </Card.Content>
                <Card.Actions style={{ justifyContent: 'flex-end' }}>
                  <TouchableOpacity onPress={() => editCalen(item)}>
                    <AntDesign name={'edit'} size={20} style={{ color: 'black' }} />
                  </TouchableOpacity>
                  <TouchableOpacity style={{ marginLeft: 10 }} onPress={() => deleteCalen(item)}>
                    <Icons name={'delete-outline'} size={20} style={{ color: 'red' }} />
                  </TouchableOpacity>
                </Card.Actions>
              </Card>
              :
              <View style={{}} />
            //   <Text style={{}}>Not event</Text>
            // </View>
          }
        </TouchableOpacity>

        <TouchableOpacity style={{ height: 50, marginRight: 10, marginTop: 17, borderWidth: 1, borderStyle: 'dashed', borderRadius: 1, justifyContent: 'center' }}>
          <Text style={{ textAlign: 'center' }}>+ Add schedule</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <Agenda
        items={items}
        loadItemsForMonth={loadItems}
        markedDates={dot}
        renderItem={renderItem}
      />
      <TouchableOpacity
        style={{ borderWidth: 1, alignItems: 'center', justifyContent: 'center', width: 50, borderRadius: 30, backgroundColor: '#b3b3ff', borderColor: '#009387', bottom: 60, right: 20, position: 'absolute', zIndex: 1 }}
        // onPress={() => quesSc()}
        onPress={() => addCalen()}
      >
        <Icon name={'add-outline'} size={40} style={{ color: 'white' }} />
      </TouchableOpacity>
    </View>
  )
}

