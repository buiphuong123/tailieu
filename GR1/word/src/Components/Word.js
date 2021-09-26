import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { toggle_show, toggle_memorized} from '../redux/actionCreators';
class Word extends Component {
    render() {       
        const { en, vn, memorized, isShow, id } = this.props.myWord;
        const textDecorationLine = memorized ? 'line-through' : 'none';
        const memorizeButtonText= memorized? 'forget' : 'memorized';
        const meaning = isShow ? vn : '----------';
        return (
            <View style={styles.container}>
                <Text style={{ textDecorationLine }}>{en}</Text>
                <Text>{meaning}</Text>
                <View style={styles.controller}>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={()=>this.props.toggle_memorized(id)}>
                        <Text>{memorizeButtonText}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={()=> this.props.toggle_show(id)}>
                        <Text>show</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }      
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#D2DEF6',
        padding: 10,
        margin: 10
    },
    controller: { flexDirection: 'row', justifyContent: 'space-around' },
    button: { backgroundColor: 'white', padding: 10, borderRadius: 7, margin: 10 }
})
export default connect(null, {toggle_show, toggle_memorized})(Word);