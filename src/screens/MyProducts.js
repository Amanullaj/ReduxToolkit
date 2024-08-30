import { FlatList, Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'

const MyProducts = () => {

    const [produtcs, setProducts] = useState([]);

    useEffect(() => {
        getProducts();
    }, []);

    const getProducts = () => {

        const url = 'https://fakestoreapi.com/products/category/jewelery';
        console.log('Products url : ', url);

        fetch(url)
            .then(res => res.json())
            .then(json => {
                setProducts(json);
            })
    }
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={{
                height: '8%', width: '100%',
                backgroundColor: 'white', alignSelf: 'center', alignItems: 'center',
                justifyContent: 'center'
            }}>
                <Text style={{ fontSize: 18, fontWeight: '700' }}>Redux ToolKit Example</Text>
            </View>
            <View style={{ height: '82%', width: '100%', }}>
                <FlatList
                    data={produtcs}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item, index }) =>
                        <TouchableOpacity style={styles.container} onPress={() => navigation.navigate('ProductDetails', { data: item })}>
                            <Image source={{ uri: item.image }} style={styles.img} />
                            <View style={{ margin: 10, padding: 5, }}>
                                <Text style={styles.title}>{item.title.length > 20 ? item.title.substring(0, 20) +
                                    '...' : item.title}</Text>
                                {/* if name is larger      */}
                                <Text style={styles.description}>{item.description.length > 30 ? item.description.substring(0, 30) +
                                    '...' : item.description}</Text>
                                    <Text style={styles.description}>Rating : {item.rating.rate} | Available Qty : {item.rating.count}</Text>          
                                <Text style={styles.price}>$.{item.price}</Text>
                                <TouchableOpacity style={{padding: 10, backgroundColor: 'green', borderRadius: 10,
                                    width: '50%',alignItems: 'center', top: 10
                                }}>
                                <Text style={{color: 'white'}}>Add to Cart</Text>
                                </TouchableOpacity>
                            </View>
                        </TouchableOpacity>} />

            </View>
            <View style={{ height: '10%', width: '100%', backgroundColor: 'white' }}>

            </View>
        </SafeAreaView>
    )
}

export default MyProducts

const styles = StyleSheet.create({
    container : {width: '95%', flexDirection:'row',margin:5, borderRadius: 10,
        backgroundColor:'white',padding:10, alignSelf: 'center', elevation: 5, alignItems: 'center'},
    img : {height:100,width:100,resizeMode:'center'},
    title: {fontSize:16,fontWeight:'600'},
    price : {color:'green',fontSize:18,fontWeight:'600'}
})