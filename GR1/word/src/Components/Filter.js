import React, { Component } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { show_all, memorized, need_practice } from '../redux/actionCreators';

class Filter extends Component {
    getTextStyle(statusName) {
        const {filterStatus} = this.props;
        if(statusName === filterStatus) return { color: 'yellow', fontWeight: 'bold'};
        return styles.button;
    }

   
    render() {
        return (
            <View style={ styles.container }>
                <TouchableOpacity onPress= {()=>this.props.show_all()}>
                    <Text style={this.getTextStyle('SHOW_ALL')}>SHOW_ALL</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress= {()=>this.props.memorized()}>
                    <Text style={this.getTextStyle('MEMORIZED')}>MEMORIZED</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress= {()=>this.props.need_practice()}>
                    <Text style={this.getTextStyle('NEED_PRACTICE')}>NEED PRACTICE</Text>
                </TouchableOpacity>
            </View>
        )
    }
}  

function mapStateToProps(state){
    return {filterStatus: state.filterStatus };
}
export default connect(mapStateToProps, {show_all, memorized, need_practice})(Filter);
const styles = StyleSheet.create({
    container: {backgroundColor: '#583C3C', flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around'},
    button: {color: 'white'}
});

