import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Agenda } from 'react-native-calendars';
import { Card, Avatar, Button } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';

export default Calendar = () => {
  const [items, setItems] = useState({});
  const timeToString = (time) => {
    const date = new Date(time);
    return date.toISOString().split('T')[0];
  };
  const loadItems = (day) => {
    setTimeout(() => {
      for (let i = -15; i < 85; i++) {
        const time = day.timestamp + i * 24 * 60 * 60 * 1000;
        const strTime = timeToString(time); // ngay ma chung ta chon
        if (!items[strTime]) {
          console.log(strTime);
          items[strTime] = [];
          const numItems = Math.floor(Math.random() * 3 + 1);
          for (let j = 0; j < numItems; j++) {
            items[strTime].push({
              name: 'Item for ' + strTime + ' #' + j,
              height: Math.max(50, Math.floor(Math.random() * 150)),
            });
          }
        }
      }
      const newItems = {};
      Object.keys(items).forEach((key) => {
        newItems[key] = items[key];
      });
      setItems(newItems);
    }, 1000);
  };

  const renderItem = (item) => {
    return (
      <View>
        <TouchableOpacity style={{ marginRight: 10, marginTop: 17 }}>
          <Card>
            <Card.Content style={{
              borderLeftWidth: 2,
              borderLeftColor: 'red'
            }}>
              <View>
                <Text style={{ fontWeight: 'bold', fontSize: 18 }}>kdkddk</Text>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}>
                  <View style={{ flexDirection: 'row', marginTop: 10 }}>
                    <AntDesign name={'clockcircleo'} size={20} />
                    <Text style={{ marginLeft: 10 }}>dasdf</Text>
                  </View>
                  {/* <Text>{item.name}</Text> */}
                  {/* <Avatar.Text label="J" /> */}
                  <Icon name={'notifications-outline'} size={20} style={{ color: 'black' }} />
                </View>
              </View>
              {/* <View>
              <Text>jhjhj</Text>
            </View> */}
            </Card.Content>
            <Card.Actions style={{ justifyContent: 'flex-end' }}>
              <TouchableOpacity>
                <AntDesign name={'edit'} size={20} style={{ color: 'black' }} />
              </TouchableOpacity>
              <TouchableOpacity style={{ marginLeft: 10 }}>
                <Icons name={'delete-outline'} size={20} style={{ color: 'red' }} />
              </TouchableOpacity>
            </Card.Actions>
          </Card>
        </TouchableOpacity>
        
        {/* <TouchableOpacity style={{height: 50, marginRight : 10, marginTop: 17, borderWidth: 1, borderStyle: 'dashed',borderRadius: 1, justifyContent: 'center'}}>
          <Text style={{textAlign: 'center'}}>+ Add schedule</Text>
        </TouchableOpacity> */}
      </View>
    );
  };
  return (
    <View style={{ flex: 1 }}>
      <Agenda
        items={items}
        loadItemsForMonth={loadItems}
        selected={new Date}
        renderItem={renderItem}
      />
    </View>
  )
}

