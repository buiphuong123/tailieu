import React from 'react'
import { Text, View, StyleSheet } from 'react-native'
import CheckBox from '@react-native-community/checkbox';
import AppText from '../../../../components/app-text';
import CustomHeader from '../../../CustomHeader';
import { useSelector, useDispatch } from 'react-redux';
import { RemoteWord, RemoteAllWord, RemoteHiraWord, RemoteKanjiWord, RemoteMeanWord, RemoteReverseWord, RemoteMemerizeWord, RemoteNotMemerizeWord, RemoteLikeWord } from '../../../../redux/actions/word.action';
import { TouchableOpacity } from 'react-native-gesture-handler';
import ListWord from './ListWord';

export default WordScreen = ({ navigation }) => {
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

    const seletwordall = (value) => {
        dispatch(RemoteAllWord(value));
        if(value === true) {
            dispatch(RemoteMemerizeWord(false)); 
            dispatch(RemoteNotMemerizeWord(false));
            dispatch(RemoteLikeWord(false)); 
        }
        
    }
    const seletMemerizedall = (value) => {
        dispatch(RemoteMemerizeWord(value)); 
        if(value===true) {
            dispatch(RemoteAllWord(false));
            dispatch(RemoteNotMemerizeWord(false));
            dispatch(RemoteLikeWord(false)); 
        }
        
    }
    const seletNotMemerizedall = (value) => {
        dispatch(RemoteNotMemerizeWord(value));
        if(value===true) {
            dispatch(RemoteAllWord(false));
            dispatch(RemoteMemerizeWord(false)); 
            dispatch(RemoteLikeWord(false)); 
        }
        
    }
    const seletLikeall = (value) => {
        dispatch(RemoteLikeWord(value)); 
        if(value===true) {
            dispatch(RemoteAllWord(false));
            dispatch(RemoteMemerizeWord(false)); 
            dispatch(RemoteNotMemerizeWord(false));
        }
        
    }

    const learnFlashcard = () => {
        navigation.navigate("Flashcard", {navigation: navigation});
    }
    return (
        <View style={{ flex: 1 }}>
            <CustomHeader title=" Word" navigation={navigation} icon="person" action={learnFlashcard} />
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
                        onValueChange={(value) =>  dispatch(RemoteMeanWord(value))}
                    />
                    <AppText i18nKey={"mean"} style={styles.label} />
                </View>
                <View style={styles.checkboxContainer}>
                    <CheckBox
                        style={styles.checkbox}
                        value={isReverse}
                        onValueChange={(value) =>  dispatch(RemoteReverseWord(value))}
                    />
                    <AppText i18nKey={"reverse"} style={styles.label} />
                </View>

            </View>

            <View style={{ flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: 'blue' }}>
                <View style={styles.checkboxContainer}>
                    <CheckBox
                        style={styles.checkbox}
                        value={isAll}
                        onValueChange={(value) => seletwordall(value)}

                    />
                    <AppText i18nKey={"all"} style={styles.label} />
                </View>

                <View style={styles.checkboxContainer}>
                    <CheckBox
                        style={styles.checkbox}
                        value={isMemerize}
                        onValueChange={(value) => seletMemerizedall(value)}
                    />
                    <AppText i18nKey={"memerize"} style={styles.label} />
                </View>

                <View style={styles.checkboxContainer}>
                    <CheckBox
                        style={styles.checkbox}
                        value={isNotMemerize}
                        onValueChange={(value) => seletNotMemerizedall(value)}
                    />
                    <AppText i18nKey={"not memerize"} style={styles.label} />
                </View>
                <View style={styles.checkboxContainer}>
                    <CheckBox
                        style={styles.checkbox}
                        value={isLike}
                        checked={isLike}
                        onValueChange={(value) => seletLikeall(value)}
                    />
                    <AppText i18nKey={"like"} style={styles.label} />
                </View>

            </View>
            <View style={{ flex: 1 }}>
                {/* <ListWord /> */}
                    <ListWord navigation={navigation}/>
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