import React from 'react'
import { Text, View, StyleSheet } from 'react-native'
import CheckBox from '@react-native-community/checkbox';
import AppText from '../../../../components/app-text';
import CustomHeader from '../../../CustomHeader';
import { useSelector, useDispatch } from 'react-redux';
import { RemoteWord, RemoteAllWord, RemoteHiraWord, RemoteKanjiWord, RemoteMeanWord, RemoteReverseWord, RemoteMemerizeWord, RemoteNotMemerizeWord, RemoteLikeWord } from '../../../../redux/actions/word.action';
import { TouchableOpacity } from 'react-native-gesture-handler';
import ListWord from './ListWord';
import { RadioButton } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';
import Icons from 'react-native-vector-icons/Fontisto';

export default WordScreen = ({ navigation, route }) => {
    const dispatch = useDispatch();
    const isWord = useSelector(state => state.wordReducer.isWord);
    const isAll = useSelector(state => state.wordReducer.isAll);
    const isHira = useSelector(state => state.wordReducer.isHira);
    const isKanji = useSelector(state => state.wordReducer.isKanji);
    const isMean = useSelector(state => state.wordReducer.isMean);
    const isReverse = useSelector(state => state.wordReducer.isReverse);
    const isMemerize = useSelector(state => state.wordReducer.isMemerize);
    const isNotMemerize = useSelector(state => state.wordReducer.isNotMemerize);
    const isLike = useSelector(state => state.wordReducer.isLike);
    const { lession } = route.params;

    const seletMemerizedall = () => {
        dispatch(RemoteAllWord('unchecked'));
        dispatch(RemoteMemerizeWord('checked'));
        dispatch(RemoteNotMemerizeWord('unchecked'));
        dispatch(RemoteLikeWord('unchecked'));

    }
    const seletNotMemerizedall = () => {
        dispatch(RemoteAllWord('unchecked'));
        dispatch(RemoteMemerizeWord('unchecked'));
        dispatch(RemoteNotMemerizeWord('checked'));
        dispatch(RemoteLikeWord('unchecked'));

    }
    const seletLikeall = () => {
        dispatch(RemoteAllWord('unchecked'));
        dispatch(RemoteMemerizeWord('unchecked'));
        dispatch(RemoteNotMemerizeWord('unchecked'));
        dispatch(RemoteLikeWord('checked'));
    }
    const seletwordallRadio = () => {
        dispatch(RemoteAllWord('checked'));
        dispatch(RemoteMemerizeWord('unchecked'));
        dispatch(RemoteNotMemerizeWord('unchecked'));
        dispatch(RemoteLikeWord('unchecked'));
    }

    const learnFlashcard = () => {
        navigation.navigate("Flashcard", { navigation: navigation, lession: lession });
    }
    return (
        <View style={{ flex: 1 }}>
            <View style={{ flexDirection: 'row', height: 50, backgroundColor: '#009387', justifyContent: 'space-between' }}>
                <View style={{ justifyContent: 'center' }}>
                    <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }} onPress={() => navigation.goBack()}>
                        <Icon name={'arrow-back'} size={29} style={{ color: '#fff', marginLeft: 5 }} />
                    </TouchableOpacity>
                </View>
                <View style={{ justifyContent: 'center' }}>
                    <Text style={{ textAlign: 'center', color: '#fff', fontSize: 18 }}>N5</Text>
                </View>
                <View style={{ justifyContent: 'center' }}>
                    <TouchableOpacity 
                    onPress={() => learnFlashcard()}
                    style={{ justifyContent: 'center', marginRight: 20 }} >
                        <Icons name={'person'} size={29} style={{ color: '#fff', marginLeft: 5 }} />
                    </TouchableOpacity>
                </View>
            </View>
            <View style={{ flexDirection: 'row' }}>
                <View style={styles.checkboxContainer}>
                    <CheckBox
                        style={styles.checkbox}
                        value={isWord}
                        onValueChange={(value) => dispatch(RemoteWord(value))}
                    />
                    <AppText i18nKey={"word"} style={styles.label} />
                </View>

                <View style={styles.checkboxContainer}>
                    <CheckBox
                        style={styles.checkbox}
                        value={isHira}
                        onValueChange={(value) => dispatch(RemoteHiraWord(value))}
                    />
                    <AppText i18nKey={"hira"} style={styles.label} />
                </View>

                <View style={styles.checkboxContainer}>
                    <CheckBox
                        style={styles.checkbox}
                        value={isKanji}
                        onValueChange={(value) => dispatch(RemoteKanjiWord(value))}
                    />
                    <AppText i18nKey={"kanji"} style={styles.label} />
                </View>
                <View style={styles.checkboxContainer}>
                    <CheckBox
                        style={styles.checkbox}
                        value={isMean}
                        onValueChange={(value) => dispatch(RemoteMeanWord(value))}
                    />
                    <AppText i18nKey={"mean"} style={styles.label} />
                </View>
                <View style={styles.checkboxContainer}>
                    <CheckBox
                        style={styles.checkbox}
                        value={isReverse}
                        onValueChange={(value) => dispatch(RemoteReverseWord(value))}
                    />
                    <AppText i18nKey={"reverse"} style={styles.label} />
                </View>

            </View>

            <View style={{ flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: 'blue' }}>
                <View style={styles.checkboxContainer}>
                    <RadioButton
                        status={isAll}
                        onPress={() => seletwordallRadio()}
                    />
                    <AppText i18nKey={"all"} style={styles.label} />
                </View>

                <View style={styles.checkboxContainer}>
                    <RadioButton
                        status={isMemerize}
                        onPress={() => seletMemerizedall()}
                    />
                    <AppText i18nKey={"memerize"} style={styles.label} />
                </View>

                <View style={styles.checkboxContainer}>
                    <RadioButton
                        status={isNotMemerize}
                        onPress={() => seletNotMemerizedall()}
                    />
                    <AppText i18nKey={"not memerize"} style={styles.label} />
                </View>
                <View style={styles.checkboxContainer}>
                    <RadioButton
                        status={isLike}
                        onPress={() => seletLikeall()}
                    />
                    <AppText i18nKey={"like"} style={styles.label} />
                </View>

            </View>
            <View style={{ flex: 1 }}>
                {/* <ListWord /> */}
                <ListWord navigation={navigation} lession={lession} />
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