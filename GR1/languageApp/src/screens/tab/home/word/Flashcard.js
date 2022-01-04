import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Dimensions, Animated } from 'react-native';
const { width: WIDTH } = Dimensions.get('window');
const { height: HEIGHT } = Dimensions.get('window');
import Icon from 'react-native-vector-icons/MaterialIcons';
import Carousel from "react-native-snap-carousel";
import { connect } from 'react-redux';
import { Container } from 'native-base';
import { useSelector, useDispatch } from 'react-redux';

const Item = () => {
    useEffect(() => {

        animatedValue = new Animated.Value(0);
        value = 0;
        animatedValue.addListener(({ value }) => {
            value = value;
        })
        frontInterpolate = animatedValue.interpolate({
            inputRange: [0, 180],
            outputRange: ['0deg', '180deg']
        })
        backInterpolate = this.animatedValue.interpolate({
            inputRange: [0, 180],
            outputRange: ['180deg', '360deg']
        })
    }
    )
    flipCard = () => {
        if (this.value >= 90) {
            Animated.timing(this.animatedValue, {
                toValue: 0,
                friction: 8,
                tension: 10,
                useNativeDriver: true,
            }).start();
        } else {
            Animated.timing(this.animatedValue, {
                toValue: 180,
                friction: 8,
                tension: 10,
                useNativeDriver: true,
            }).start();
        }

    }
   
        const frontAnimateStyle = {
            transform: [
                { rotateY: this.frontInterpolate }
            ]
        }
        const backAnimatedStyle = {
            transform: [
                { rotateY: this.backInterpolate }
            ]
        }
        const { item, count, countWord } = this.props;
        return (
            <TouchableOpacity onPress={() => this.flipCard()} style={styles.cardStyle}>
                <Animated.View style={[frontAnimateStyle, styles.flipCard]}>
                    <View style={[styles.flashcardStyle, styles.flashcardStyletop]}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', flex: 1 }}>
                            <TouchableOpacity>
                                <Icon style={{ marginTop: 13, marginLeft: 15, color: '#4d88ff' }} name="feedback" size={28} />
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <Icon style={{ marginTop: 13, marginRight: 15, color: '#4d88ff' }} name="settings" size={28} />
                            </TouchableOpacity>
                        </View>
                        <View />
                        <View style={{ alignItems: 'center', justifyContent: 'center', flex: 4 }}>
                            <Text style={styles.flipText1}>
                                {item.hira}
                            </Text>
                        </View>
                    </View>
                    <View style={[styles.flashcardStyle, styles.flashcardStyledowm]}>
                        <Icon style={{ marginLeft: (WIDTH - 50) / 2, marginTop: -70, alignItems: 'center', color: '#999999' }} name="volume-up" size={45} />
                        <Text style={{ marginLeft: (WIDTH - 50) / 2, marginBottom: -40 }}>{count+1}/{countWord}</Text>
                    </View>
                </Animated.View>

                <Animated.View style={[backAnimatedStyle, styles.flipCard, styles.flipCardBack]}>
                    <View style={[styles.flashcardStyle, styles.flashcardStyletop]}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', flex: 1 }}>
                            <TouchableOpacity>
                                <Icon style={{ marginTop: 13, marginLeft: 15, color: '#4d88ff' }} name="feedback" size={28} />
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <Icon style={{ marginTop: 13, marginRight: 15, color: '#4d88ff' }} name="settings" size={28} />
                            </TouchableOpacity>
                        </View>
                        <View />
                        <View style={{ alignItems: 'center', justifyContent: 'center', flex: 3 }}>
                            <Text style={styles.flipText1}>
                                {item.vn}
                            </Text>
                        </View>
                    </View>
                    <View style={[styles.flashcardStyle, styles.flashcardStyledowm], { flex: 2 }}>
                        <TouchableOpacity style={{ alignItems: 'center', justifyContent: 'center', marginTop: -30, flex: 1 }}>
                            <Icon style={{ color: '#999999' }} name="volume-up" size={45} />
                        </TouchableOpacity>
                        <View style={{ flex: 4, width: WIDTH - 50, alignItems: 'center', justifyContent: 'center' }}>
                            <Text style={{ fontSize: 30 }}>{item.kanji}</Text>
                            <Text style={{ fontSize: 20 }}>{item.hira}</Text>
                            <Text style={{ fontSize: 20 }}>{item.vn}</Text>
                        </View>
                    </View>
                </Animated.View>
            </TouchableOpacity>
        );
    };


export default Flashcard = () => {
    const wordList = useSelector(state => state.wordReducer.wordList);
    _renderItem = ({ item, index }) => <Item item={item} count={index} countWord={this.props.checkwordArr.length}/>
        return (
            <Container>
                <View>
                    <Carousel
                        // layout={'tinder'} 
                        // layoutCardOffset={`9`}
                        data={wordList}
                        renderItem={this._renderItem}
                        sliderWidth={Dimensions.get('window').width}
                        itemWidth={Dimensions.get('window').width - 40}
                        enableMomentum={false}
                        lockScrollWhileSnapping
                        useScrollView
                    />
                </View>
                <View style={styles.stylebutton}>
                    <TouchableOpacity style={[styles.keepStyle, { backgroundColor: '#ff0000', marginRight: 110 }]}>
                        <Text>memorize</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.keepStyle, { backgroundColor: '#5cd65c', }]}>
                        <Text>not memorize</Text>
                    </TouchableOpacity>
                </View>
            </Container>
        );
    }


const styles = StyleSheet.create({
    cardStyle: { backgroundColor: '#fff', marginTop: 40 },
    flipCard: { width: WIDTH - 50, height: HEIGHT - 180, flexDirection: 'column', marginTop: 25, alignItems: 'center', justifyContent: 'center', backgroundColor: 'white', backfaceVisibility: 'hidden', },
    flipCardBack: { backgroundColor: '#e6e6e6', position: 'absolute', top: 0 },
    stylebutton: { flexDirection: 'row', justifyContent: 'space-around', flex: 4, marginTop: 20 },
    flipText1: { fontSize: 50, },
    flashcardStyle: { width: WIDTH - 50, },
    flashcardStyletop: { height: HEIGHT / 5, backgroundColor: 'white', flex: 2 },
    flashcardStyledowm: { flex: 1, backgroundColor: '#e6e6e6', flexDirection: 'column', justifyContent: 'space-around' },
    keepStyle: { height: 40, width: 100, alignItems: 'center', justifyContent: 'center', borderRadius: 5 },

})

