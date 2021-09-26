import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import {add_word, isAdding} from '../redux/actionCreators';
class Form extends Component{
    constructor(props){
        super(props);
        this.state= {
            en: '',
            vn: '',
        };
        A
    }
    
    onAdd(){
        const { en, vn }= this.state;
        this.props.add_word(en,vn);
        this.props.isAdding();

    }
    render(){
        return(
            <View style={styles.container}>
                <TextInput 
                style={styles.textInput}
                value ={this.state.en}
                onChangeText ={text => this.setState({en: text})}
                placeholder = "English word"
                />
                <TextInput 
                style={styles.textInput}
                value={this.state.vn}
                onChangeText ={text => this.setState({vn: text})}
                placeholder = "Vietnamese word"
                />
                <TouchableOpacity onPress={this.onAdd.bind(this)}>
                    <Text>Add</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

export default connect(null, {add_word, isAdding})(Form);
const styles = StyleSheet.create({
    container: {alignSelf: 'stretch', alignItems: 'center', justifyContent: 'center'},
    textInput: {
        height: 40,
        width: 200,
        backgroundColor: '#E4F6D4',
        margin: 10, 
        paddingHorizontal: 10
    }
})