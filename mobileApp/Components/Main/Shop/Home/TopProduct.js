import React, {Component} from 'react';
import {Text, View, StyleSheet, Dimensions, Image, FlatList} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import sp1 from '../../../../media/temp/sp1.jpeg';
import sp2 from '../../../../media/temp/sp2.jpeg';
import sp3 from '../../../../media/temp/sp3.jpeg';
import sp4 from '../../../../media/temp/sp4.jpeg';
const url ='http://192.168.1.20/api/images/product/';
const {height, width}=Dimensions.get('window');
export default class TopProduct extends Component{
    // constructor(props){
    //     super(props);
    //     const {topProduct} = this.props;
    //     ds=dataSource({rowHasChanged:(r1, r2)=>r1!=r2});
    //     this.state={
    //         dataSource: ds.cloneWithRows(ds),
    //     }
    // }
    gotoDetail(product){
       const {navigation}= this.props;
        navigation.navigate('ProductDetail', {
           product: product,
        });
       

    }
    render(){
        const {topProduct } = this.props;
        return(
            <View style={styles.container}>
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>TOP PRODUCT</Text>
                </View>
                <View style={styles.body}>
                    {topProduct.map(e => (
                        <TouchableOpacity style={styles.productContainer} onPress={()=> this.gotoDetail(e)} key={e.id} >
                            <Image source={{uri: `${url}${e.images[0]}`}} style={styles.productImage} />
                            <Text style={styles.productName}>{e.name.toUpperCase()}</Text>
                            <Text style={styles.productPrice}>{e.price}</Text>
                         </TouchableOpacity>
                    ))}
                    {/* <TouchableOpacity style={styles.productContainer} onPress={this.gotoDetail.bind(this)}>
                        <Image source={sp1} style={styles.productImage} />
                        <Text>PRODUCT NAME</Text>
                        <Text>250$</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.productContainer} onPress={this.gotoDetail.bind(this)}>
                        <Image source= style={styles.productImage} />
                        <Text style={styles.productName}>PRODUCT NAME</Text>
                        <Text style={styles.productPrice}>400$</Text>
                    </TouchableOpacity>

                    <View style={{height: 10, width: width}}/>
                    <TouchableOpacity style={styles.productContainer} onPress={this.gotoDetail.bind(this)}>
                        <Image source={sp3} style={styles.productImage} />
                        <Text style={styles.productName}>PRODUCT NAME</Text>
                        <Text style={styles.productPrice}>400$</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.productContainer} onPress={this.gotoDetail.bind(this)}>
                        <Image source={sp4} style={styles.productImage} />
                        <Text style={styles.productName}>PRODUCT NAME</Text>
                        <Text style={styles.productPrice}>400$</Text>
                    </TouchableOpacity> */}

                </View>

                {/* <FlatList 
                    data={topProduct}
                    renderItem={({item})=>
                    <View style={styles.body}>
                        <TouchableOpacity style={styles.productContainer} onPress={this.gotoDetail.bind(this)}>
                            <Image source={sp4} style={styles.productImage} />
                            <Text style={styles.productName}>PRODUCT NAME</Text>
                            <Text style={styles.productPrice}>400$</Text>
                        </TouchableOpacity>
                    </View>
                }
                /> */}
            </View>
        )
    }
}
// image
const productWidth=(width-50)/2;
const productImageHeight=(productWidth/361) *452
var styles= StyleSheet.create({
   container:{backgroundColor: '#FFF', margin: 10, shadowColor:'#2E272B', shadowOffset: {width: 0, height: 3}, shadowOpacity: 0.2},
   titleContainer:{ height: 50, paddingBottom: 20, justifyContent:'center', paddingLeft: 10},
   body:{flexWrap: 'wrap',paddingBottom: 10, flexDirection: 'row', justifyContent: 'space-around'},
   title:{ fontSize: 15 , color: '#D3D3CF'},
   productContainer:{width: productWidth},
   productImage:{width: productWidth, height: productImageHeight},
    productName: {paddingLeft: 10,marginVertical: 5, fontFamily: 'Avenir'},
    productPrice :{ paddingLeft: 10, marginBottom:5, fontFamily: 'Avenir'}
})