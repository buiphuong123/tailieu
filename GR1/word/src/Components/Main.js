import React, { Component } from 'react';
import { View, FlatList } from 'react-native';
import { connect } from 'react-redux';
import Word from './Word';
import Filter from './Filter';
import Header from './Header';
import Form from './Form';
class Main extends Component{
    takeWordList(){
        const {filterStatus, arrWords} = this.props;
        if(filterStatus === 'MEMORIZED') return arrWords.filter(e =>e.memorized);
        if(filterStatus === 'NEED_PRACTICE') return arrWords.filter(e =>!e.memorized);
        return arrWords;
    }
    render() {
        return (
            <View style={{backgroundColor: 'yellow', flex: 1}}>
                <Header />
                <View style={{ flex: 10  }}>
                    {this.props.isAdding ? <Form /> : null}
                    <FlatList 
                        data={this.takeWordList()}
                        renderItem={({ item })=> <Word myWord={item}/>}
                        keyExtractor = { item => item.id}
                    />
                </View>
                <Filter />
            </View>
            
        )
    }
}

function mapStateToProps(state){
    return {
        filterStatus: state.filterStatus,
        arrWords: state.arrWords,
        isAdding : state.isAdding,
    }
}
export default connect(mapStateToProps)(Main);