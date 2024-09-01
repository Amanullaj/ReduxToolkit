import { FlatList, Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addItemToCart, reduceItemFromCart, removeItemFromCart } from '../redux/cartSlice';

const Cart = ({ navigation }) => {
    const cartItems = useSelector(state => state.cart.data); // Get cart items from Redux store
    const dispatch = useDispatch();

    // Calculate total items and total amount
    const totalItems = cartItems.reduce((total, item) => total + item.qty, 0);
    const totalAmount = cartItems.reduce((total, item) => total + item.price * item.qty, 0);

    const renderItem = ({ item }) => (
        <View style={styles.container}>
            <Image source={{ uri: item.image }} style={styles.img} />
            <View style={styles.productDetails}>
                <Text style={styles.title}>
                    {item.title.length > 20 ? `${item.title.substring(0, 20)}...` : item.title}
                </Text>
                <Text style={styles.description}>
                    {item.description.length > 30 ? `${item.description.substring(0, 30)}...` : item.description}
                </Text>
                <Text style={styles.description}>Rating: {item.rating.rate} | Available Qty: {item.rating.count}</Text>
                <Text style={styles.price}>${item.price}</Text>

                {/* Item Quantity Control */}
                <View style={styles.quantityControl}>
                    <TouchableOpacity onPress={() => dispatch(reduceItemFromCart({ id: item.id }))} style={styles.qtyButton}>
                        <Text style={styles.qtyButtonText}>-</Text>
                    </TouchableOpacity>
                    <Text style={styles.qtyText}>{item.qty}</Text>
                    <TouchableOpacity onPress={() => dispatch(addItemToCart({ ...item, qty: 1 }))} style={styles.qtyButton}>
                        <Text style={styles.qtyButtonText}>+</Text>
                    </TouchableOpacity>
                </View>

                {/* Remove Item Button */}
                <TouchableOpacity
                    onPress={() => dispatch(removeItemFromCart({ id: item.id }))}
                    style={styles.removeButton}
                >
                    <Text style={styles.removeButtonText}>Remove</Text>
                </TouchableOpacity>
            </View>
        </View>
    );

    return (
        <SafeAreaView style={{ flex: 1 }}>
            {cartItems.length > 0 ? (
                <>
                    <FlatList
                        data={cartItems}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={renderItem}
                    />
                    <View style={styles.footer}>
                        <View style={styles.footerLeft}>
                            <Text>Items: {totalItems}</Text>
                            <Text>Total: ${totalAmount.toFixed(2)}</Text>
                        </View>
                        <View style={styles.footerRight}>
                            <TouchableOpacity
                                onPress={() => navigation.navigate('Checkout')} // Update this with your actual Checkout screen name
                                style={styles.continueButton}
                            >
                                <Text style={styles.continueButtonText}>Continue to Checkout</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </>
            ) : (
                <View style={styles.centered}>
                    <Text>Your cart is empty.</Text>
                </View>
            )}
        </SafeAreaView>
    );
};

export default Cart;

const styles = StyleSheet.create({
    container: {
        width: '95%',
        flexDirection: 'row',
        margin: 5,
        borderRadius: 10,
        backgroundColor: 'white',
        padding: 10,
        alignSelf: 'center',
        elevation: 5,
        alignItems: 'center',
    },
    img: {
        height: 100,
        width: 100,
        resizeMode: 'contain',
    },
    productDetails: {
        flex: 1,
        marginLeft: 10,
        padding: 5,
    },
    title: {
        fontSize: 16,
        fontWeight: '600',
    },
    description: {
        fontSize: 14,
        color: 'gray',
        marginVertical: 5,
    },
    price: {
        color: 'green',
        fontSize: 18,
        fontWeight: '600',
    },
    quantityControl: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
    },
    qtyButton: {
        backgroundColor: 'green',
        padding: 5,
        borderRadius: 5,
        width: 30,
        alignItems: 'center',
    },
    qtyButtonText: {
        color: 'white',
        fontSize: 18,
    },
    qtyText: {
        marginHorizontal: 10,
        fontSize: 16,
    },
    removeButton: {
        marginTop: 10,
        padding: 10,
        backgroundColor: 'red',
        borderRadius: 10,
        alignItems: 'center',
    },
    removeButtonText: {
        color: 'white',
        fontWeight: '600',
    },
    footer: {
        height: '10%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        backgroundColor: 'white',
    },
    footerLeft: {
        alignItems: 'flex-start',
    },
    footerRight: {
        alignItems: 'flex-end',
    },
    continueButton: {
        backgroundColor: 'green',
        padding: 10,
        borderRadius: 10,
        justifyContent: 'center',
    },
    continueButtonText: {
        color: 'white',
    },
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
