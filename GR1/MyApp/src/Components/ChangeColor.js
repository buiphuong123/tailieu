import React, { Component } from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';

class ChangeColor extends Component{
    onChangeColor(){
        this.props.dispatch({type: 'CHANGE_COLOR'});
    }
    render(){
        const color = this.props.hightlight ? 'black' : 'red';
        return(
            <TouchableOpacity onPress={this.onChangeColor.bind(this)}>
                <Text style={{color}}>Change Color</Text>
            </TouchableOpacity>
        )

    }
}

// index(Provider) -> App -> Controller -> ChangeColor
export default connect(
    function(state) {
        return { hightlight: state.hightlight }
    }
)(ChangeColor);