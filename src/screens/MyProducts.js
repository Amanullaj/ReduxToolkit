import React, { useEffect, useState } from 'react';
import { Alert, FlatList, Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { addProducts } from '../redux/productSlice';
import { addItemToCart } from '../redux/cartSlice';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation if using React Navigation

const MyProducts = () => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const cartItems = useSelector(state => state.cart.data); // Access the 'data' array in the cart state
    const [products, setProducts] = useState([]);
  
    useEffect(() => {
      getProducts();
    }, []);
  
    const getProducts = async () => {
      const url = 'https://fakestoreapi.com/products/category/jewelery';
      fetch(url)
        .then(res => res.json())
        .then(json => {
          setProducts(json);
          dispatch(addProducts(json));
        })
        .catch(error => console.error(error));
    };
  
    const totalItems = cartItems.reduce((acc, item) => acc + item.qty, 0);
    const totalAmount = cartItems.reduce((acc, item) => acc + item.qty * item.price, 0);
  
    const handleAddToCart = (item) => {
        dispatch(addItemToCart({ ...item, qty: 1 }));
        Alert.alert('Success', `${item.title} has been added to the cart!`);
    };


    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Redux ToolKit Example</Text>
        </View>
        <View style={styles.productList}>
          <FlatList
            data={products}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <View style={styles.container}>
                <Image source={{ uri: item.image }} style={styles.img} />
                <View style={styles.productDetails}>
                  <Text style={styles.title}>{item.title.length > 20 ? `${item.title.substring(0, 20)}...` : item.title}</Text>
                  <Text style={styles.description}>
                    {item.description.length > 30 ? `${item.description.substring(0, 30)}...` : item.description}
                  </Text>
                  <Text style={styles.description}>Rating: {item.rating.rate} | Available Qty: {item.rating.count}</Text>
                  <Text style={styles.price}>${item.price}</Text>
                  <TouchableOpacity
                    onPress={() => handleAddToCart(item)}
                    style={styles.addToCartButton}
                  >
                    <Text style={styles.addToCartText}>Add to Cart</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          />
        </View>
        <View style={styles.footer}>
          <View style={styles.footerLeft}>
            <Text>Items: {totalItems}</Text>
            <Text>Total: ${totalAmount.toFixed(2)}</Text>
          </View>
          <View style={styles.footerRight}>
            <TouchableOpacity
              onPress={() => navigation.navigate('Cart')}
              style={styles.continueButton}
            >
              <Text style={styles.continueButtonText}>Continue to Cart</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    );
  };
  
  export default MyProducts;

const styles = StyleSheet.create({
    header: {
        height: '8%',
        width: '100%',
        backgroundColor: 'white',
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center'
    },
    headerText: {
        fontSize: 18,
        fontWeight: '700'
    },
    productList: {
        height: '82%',
        width: '100%',
    },
    container: {
        width: '95%',
        flexDirection: 'row',
        margin: 5,
        borderRadius: 10,
        backgroundColor: 'white',
        padding: 10,
        alignSelf: 'center',
        elevation: 5,
        alignItems: 'center'
    },
    img: {
        height: 100,
        width: 100,
        resizeMode: 'center'
    },
    productDetails: {
        margin: 10,
        padding: 5,
    },
    title: {
        fontSize: 16,
        fontWeight: '600'
    },
    description: {
        fontSize: 14,
        color: 'gray'
    },
    price: {
        color: 'green',
        fontSize: 18,
        fontWeight: '600'
    },
    addToCartButton: {
        padding: 10,
        backgroundColor: 'green',
        borderRadius: 10,
        width: '50%',
        alignItems: 'center',
        marginTop: 10
    },
    addToCartText: {
        color: 'white'
    },
    footer: {
        height: '10%',
        width: '100%',
        backgroundColor: 'white',
        flexDirection: 'row',
    },
    footerLeft: {
        width: '50%',
        alignItems: 'center',
        alignSelf: 'center'
    },
    footerRight: {
        width: '50%',
        alignItems: 'center',
        alignSelf: 'center'
    },
    continueButton: {
        backgroundColor: 'green',
        padding: 10,
        borderRadius: 10,
        height: 45,
        justifyContent: 'center'
    },
    continueButtonText: {
        color: 'white',
    }
});
