import React, {useState}  from 'react'
import {Text, View, SafeAreaView, TouchableOpacity} from 'react-native'
import CustomHeader from '../../CustomHeader';
import axios from "axios";
import { useSelector, useDispatch } from 'react-redux';
import { getGrammarRequest } from '../../../redux/actions/index';

const HomeScreen = ({navigation}) => {
    const dispatch = useDispatch();
    const users = useSelector(state => state.userReducer.user);
    const GrammarRequest = () => dispatch(getGrammarRequest(users._id, navigation));
    return (
        <View style={{flex: 1}}>
            <CustomHeader title="Home" isHome={true} navigation={navigation} />
            <View style={{ backgroundColor: 'gray'}}>
                <Text>Grammar Screen</Text>
                <TouchableOpacity 
                    style={{marginTop: 20}}
                    onPress={() => GrammarRequest()}
                >
                    <View>
                        <Text>Go to home Grammar</Text>
                    </View>
                </TouchableOpacity>
            </View>

        </View>
    )
}
export default HomeScreen;