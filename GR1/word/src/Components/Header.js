import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { isAdding } from '../redux/actionCreators';
class Header extends Component {

    render() {
        return (
            <View style={styles.header}>
                <Text></Text>
                <Text>add Word</Text>
                <TouchableOpacity onPress={()=> this.props.isAdding()}>
                    <Text>+</Text>
                </TouchableOpacity>
            </View>
        );
    }

}

export default connect(null, {isAdding})(Header);


const styles = StyleSheet.create({
    header: {flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal : 30},

})