import React from 'react'
import { Text, View, StyleSheet, Dimensions } from 'react-native'
import CheckBox from '@react-native-community/checkbox';
import AppText from '../../../../components/app-text';
import { useSelector, useDispatch } from 'react-redux';
import { TouchableOpacity } from 'react-native-gesture-handler';
// import ListWord from './ListWord';
import CustomHeader from '../../../CustomHeader';
import { RemoteAllKanji, RemoteLikeKanji, RemoteMemerizeKanji, RemoteNotMemerizeKanji } from '../../../../redux/actions/kanji.action';
import { RadioButton } from 'react-native-paper';
const { width: WIDTH } = Dimensions.get('window');
import Icon from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import { Center } from 'native-base';
import ListKanjiScreen from './ListKanjiScreen';

export default WordScreen = ({ navigation, route }) => {
    const dispatch = useDispatch();
    const isAll = useSelector(state => state.kanjiReducer.isAll);

    const isMemerize = useSelector(state => state.kanjiReducer.isMemerize);
    const isNotMemerize = useSelector(state => state.kanjiReducer.isNotMemerize);
    const isLike = useSelector(state => state.kanjiReducer.isLike);
    const { lession } = route.params;
    const toggleAllKanji = () => {
        if (isAll === 'unchecked') {
            dispatch(RemoteAllKanji('checked'));
            dispatch(RemoteMemerizeKanji('unchecked'));
            dispatch(RemoteNotMemerizeKanji('unchecked'));
            dispatch(RemoteLikeKanji('unchecked'));
        }
    }
    const toggleMemerizeKanji = (value) => {
        if (isMemerize === 'unchecked') {
            dispatch(RemoteAllKanji('unchecked'));
            dispatch(RemoteMemerizeKanji('checked'));
            dispatch(RemoteNotMemerizeKanji('unchecked'));
            dispatch(RemoteLikeKanji('unchecked'));
        }
    }
    const toggleNotMemerizeKanji = (value) => {
        if (isNotMemerize === 'unchecked') {
            dispatch(RemoteAllKanji('unchecked'));
            dispatch(RemoteMemerizeKanji('unchecked'));
            dispatch(RemoteNotMemerizeKanji('checked'));
            dispatch(RemoteLikeKanji('unchecked'));
        }
    }
    const toggleLikeKanji = (value) => {
        if (isLike === 'unchecked') {
            dispatch(RemoteAllKanji('unchecked'));
            dispatch(RemoteMemerizeKanji('unchecked'));
            dispatch(RemoteNotMemerizeKanji('unchecked'));
            dispatch(RemoteLikeKanji('checked'));
        }
    }

    const learnFlashcard = () => {
        console.log('vao kanji flashcard nha', lession);
        navigation.navigate("KanjiFlashcard", { navigation: navigation, lession: lession });
    }
    return (
        <View style={{ flex: 1 }}>
            <CustomHeader title=" Word" navigation={navigation} icon="person" action={learnFlashcard} />
            <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 10, paddingBottom: 10, borderBottomWidth: 1, borderBottomColor: 'blue' }}>
                <View style={styles.checkboxContainer}>
                    <RadioButton
                        status={isAll}
                        onPress={() => toggleAllKanji()}
                    />
                    <Text style={{ marginTop: 8 }}>Tất cả</Text>
                </View>

                <View style={[styles.checkboxContainer]}>
                    <RadioButton
                        status={isMemerize}
                        onPress={() => toggleMemerizeKanji()}
                    />
                    <Text style={{ marginTop: 8 }}>Đã nhớ</Text>
                </View>

                <View style={styles.checkboxContainer}>
                    <RadioButton
                        status={isNotMemerize}
                        onPress={() => toggleNotMemerizeKanji()}
                    />
                    <Text style={{ marginTop: 8 }}>Chưa nhớ</Text>
                </View>

                <View style={styles.checkboxContainer}>
                    <RadioButton
                        status={isLike}
                        onPress={() => toggleLikeKanji()}
                    />
                    <Text style={{ marginTop: 8 }}>Đã thích</Text>
                </View>
            </View>

            <View style={{ flex: 1 }}>
                {/* <Text>List dât day nhe</Text> */}
                {/* <ListWord /> */}
                {/* <ListWord navigation={navigation} lession={lession} /> */}
                <ListKanjiScreen navigation={navigation} lession={lession}/>
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

