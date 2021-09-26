import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Controller from './src/Components/Controller';
import {connect} from 'react-redux';

class App extends Component {
    render() {
        const color = this.props.mycolor ? 'yellow' : 'white';
        return (   
            <View style={styleApp.container}>
                <View style={styleApp.header}>
                    <Text style={styleApp.appName}>EXAM 1: {'\n'}APP COMPONENT</Text>
                    <Text style={{ fontSize: 40, color}}>{this.props.myValue}</Text>
                </View>
                <Controller />
            </View>
        );
    }
}

function mapStateToProps(state) {
    return { 
        myValue: state.value,
        mycolor: state.hightlight,
    };
}
export default connect(mapStateToProps)(App);

const styleApp = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'black',
        paddingTop: 30
    },
    header: {
        flex: 1,
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    appName: {
        color: 'white',
        fontSize: 30,
        textAlign: 'center'
    },
    
});