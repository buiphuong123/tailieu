import React, {Component} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, ScrollView, Image} from 'react-native';
import backList from '../../../../media/appIcon/backList.png';
import sp1 from '../../../../media/temp/sp1.jpeg';

export default class ListProduct extends Component{
    goBack(){
        const {navigation}= this.props;
        navigation.pop();
    }
    gotoDetail(){
        const {navigation}= this.props;
        navigation.push('ProductDetail');
    }
    render(){
        return(
            <View style={styles.container}>
               <ScrollView style={styles.wrapper}>
                    <View style={styles.header}>
                        <TouchableOpacity onPress={this.goBack.bind(this)}>
                            <Image source={backList} style={styles.sizeIconBack} />
                        </TouchableOpacity>
                        <Text style={styles.titleStyle}>Party Dress</Text>
                        <View style={{width: 30}} />
                    </View>
                    
                    <View style={styles.productContainer}>
                        <Image source={sp1} style={styles.productImage}/>
                        <View style={styles.productInfo}>
                            <Text style={styles.txtName}>Lace Sleeve Si</Text>
                            <Text style={styles.txtPrice}>117$</Text>
                            <Text style={styles.txtMeteril}>Meterial silk</Text>
                            <View style={styles.lastRowInfo}>
                                <Text style={styles.txtColor}>Colo RoyaBlue</Text>
                                <View style={{backgroundColor: 'cyan', height: 10, width: 10, borderRadius: 5}}/>
                                <TouchableOpacity>
                                    <Text style={styles.txtShowDetail}>Show Details</Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                        
                    </View>

                    <View style={styles.productContainer}>
                        <Image source={sp1} style={styles.productImage}/>
                        <View style={styles.productInfo}>
                            <Text style={styles.txtName}>Lace Sleeve Si</Text>
                            <Text style={styles.txtPrice}>117$</Text>
                            <Text style={styles.txtMeteril}>Meterial silk</Text>
                            <View style={styles.lastRowInfo}>
                                <Text style={styles.txtColor}>Colo RoyaBlue</Text>
                                <View style={{backgroundColor: 'cyan', height: 10, width: 10, borderRadius: 5}}/>
                                <TouchableOpacity>
                                    <Text style={styles.txtShowDetail}>Show Details</Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                        
                    </View>

                    <View style={styles.productContainer}>
                        <Image source={sp1} style={styles.productImage}/>
                        <View style={styles.productInfo}>
                            <Text style={styles.txtName}>Lace Sleeve Si</Text>
                            <Text style={styles.txtPrice}>117$</Text>
                            <Text style={styles.txtMeteril}>Meterial silk</Text>
                            <View style={styles.lastRowInfo}>
                                <Text style={styles.txtColor}>Colo RoyaBlue</Text>
                                <View style={{backgroundColor: 'cyan', height: 10, width: 10, borderRadius: 5}}/>
                                <TouchableOpacity>
                                    <Text style={styles.txtShowDetail}>Show Details</Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                        
                    </View>

                    <View style={styles.productContainer}>
                        <Image source={sp1} style={styles.productImage}/>
                        <View style={styles.productInfo}>
                            <Text style={styles.txtName}>Lace Sleeve Si</Text>
                            <Text style={styles.txtPrice}>117$</Text>
                            <Text style={styles.txtMeteril}>Meterial silk</Text>
                            <View style={styles.lastRowInfo}>
                                <Text style={styles.txtColor}>Colo RoyaBlue</Text>
                                <View style={{backgroundColor: 'cyan', height: 10, width: 10, borderRadius: 5}}/>
                                <TouchableOpacity>
                                    <Text style={styles.txtShowDetail}>Show Details</Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                        
                    </View>
                </ScrollView>
            </View>
        )
    }

}
var styles = StyleSheet.create({
    container:{backgroundColor: '#DBDBD8', flex: 1, padding: 10},
    header:{height: 50, padding: 5,alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between'},
    wrapper:{backgroundColor: '#FFF',shadowColor: "#000",
    shadowOffset: {
        width: 0,
        height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.00,
    
    elevation: 24,
    paddingHorizontal: 10
 },
    sizeIconBack:{height: 30, width : 30,},
    titleStyle:{fontFamily: 'Avenir', color: 'red', fontSize: 20},
    productImage:{width: 90, height: (70*452)/361},
    productInfo:{justifyContent: 'space-between',marginLeft: 15, flex: 1},
    lastRowInfo:{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', alignSelf: 'stretch'},
    productContainer :{flexDirection: 'row', paddingVertical: 10, borderTopColor: '#D6D6D6', borderLeftColor: '#FFF', borderRightColor: '#FFF', borderBottomColor: '#FFF', borderWidth: 1},
    txtName:{fontFamily: 'Avenir', color: '#BCBCBC', fontSize: 18, fontWeight: '200'},
    txtPrice:{fontFamily: 'Avenir', color: 'red'},
    txtMeteril:{fontFamily: 'Avenir'},
    txtColor:{fontFamily: 'Avenir'},
    txtShowDetail:{fontFamily: 'Avenir', color: 'red', fontSize: 11}
    
})