import React from 'react'
import { Text, View, StyleSheet } from 'react-native'
import CheckBox from '@react-native-community/checkbox';
import AppText from '../../../components/app-text';
import CustomHeader from '../../CustomHeader';

export default WordScreen = ({ navigation }) => {
    return (
        <View style={{ flex: 1 }}>
            <CustomHeader title=" Word" navigation={navigation} />
            <View style={{ flexDirection: 'row' }}>
                <View style={styles.checkboxContainer}>
                    <CheckBox
                        style={styles.checkbox}
                        // value={this.props.isWord}
                        // onValueChange={(value) => this.props.setword(value)}
                    />
                    <AppText i18nKey={"word"} style={styles.label} />
                </View>

                <View style={styles.checkboxContainer}>
                    <CheckBox
                        style={styles.checkbox}
                        // value={this.props.isHira}
                        // onValueChange={(value) => this.props.setHiraword(value)}
                    />
                    <AppText i18nKey={"hira"} style={styles.label} />
                </View>

                <View style={styles.checkboxContainer}>
                    <CheckBox
                        style={styles.checkbox}
                        // value={this.props.isKanji}
                        // onValueChange={(value) => this.props.setKanjiword(value)}
                    />
                    <AppText i18nKey={"kanji"} style={styles.label} />
                </View>
                <View style={styles.checkboxContainer}>
                    <CheckBox
                        style={styles.checkbox}
                        // value={this.props.isMean}
                        // onValueChange={(value) => this.props.setMeanword(value)}
                    />
                    <AppText i18nKey={"mean"} style={styles.label} />
                </View>
                <View style={styles.checkboxContainer}>
                    <CheckBox
                        style={styles.checkbox}
                        // value={this.props.isReverse}
                        // onValueChange={(value) => this.props.setReverseword(value)}
                    />
                    <AppText i18nKey={"reverse"} style={styles.label} />
                </View>

            </View>

            <View style={{ flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: 'blue' }}>
                <View style={styles.checkboxContainer}>
                    <CheckBox
                        style={styles.checkbox}
                        // value={this.props.isAll}
                        // onValueChange={(value) => this.seletwordall(value)}

                    />
                    <AppText i18nKey={"all"} style={styles.label} />
                </View>

                <View style={styles.checkboxContainer}>
                    <CheckBox
                        style={styles.checkbox}
                        // value={this.props.isMemerize}
                        // onValueChange={(value) => this.seletMemerizedall(value)}
                    />
                    <AppText i18nKey={"memerize"} style={styles.label} />
                </View>

                <View style={styles.checkboxContainer}>
                    <CheckBox
                        style={styles.checkbox}
                        // value={this.props.isNotMemerize}
                        // onValueChange={(value) => this.seletNotMemerizedall(value)}
                    />
                    <AppText i18nKey={"not memerize"} style={styles.label} />
                </View>
                <View style={styles.checkboxContainer}>
                    <CheckBox
                        style={styles.checkbox}
                        // value={this.props.isLike}
                        // checked={this.props.isLike}
                        // onValueChange={(value) => this.seletLikeall(value)}
                    />
                    <AppText i18nKey={"like"} style={styles.label} />
                </View>

            </View>
            <View style={{ flex: 1 }}>
                {/* <ListWord /> */}
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