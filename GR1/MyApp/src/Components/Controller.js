import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import ChangeColor from '../Components/ChangeColor';
class Controller extends Component {
    onUpButtonPress(){
        this.props.dispatch({ type: 'UP' });
    }
    onDownButtonPress(){
        this.props.dispatch({ type: 'DOWN' });
    }
    render() {
        return (
            <View style={styleController.controller}>
                <Text style={styleController.controllName}>CONTROLLER COMPONENT</Text>
                <ChangeColor />
                <View style={styleController.buttonContainer}>
                    <TouchableOpacity 
                        style={styleController.button}
                        onPress={ this.onUpButtonPress.bind(this) }
                    >
                        <Text style={styleController.buttonText}>+</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={styleController.button}
                        onPress={ this.onDownButtonPress.bind(this) }
                    >
                        <Text style={styleController.buttonText}>-</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}



export default connect()(Controller);

const styleController = StyleSheet.create({
    controller: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-around',
        backgroundColor: 'yellow',
        alignSelf: 'stretch',
        margin: 20
    },
    controllName: {
        fontSize: 20,
        marginBottom: 10
    },
    buttonContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    button: {
        backgroundColor: 'black',
        paddingHorizontal: 50,
        paddingVertical: 25,
        margin: 10,
        borderRadius: 5
    },
    buttonText: {
        color: 'white',
        fontSize: 40
    }
});