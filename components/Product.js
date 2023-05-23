import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Product = ({ product }) => {
  const navigation = useNavigation();

 

  const navigateToBuyItem = (productId) => {
    //filer the product array to get the product with the id passed 
    

    const propsToPass = {
      // Pass any props you want to the BuyItem screen
      productId: productId,
      product: product,

      // Add more props as needed
    };

    navigation.navigate('BuyItem', propsToPass);
  };

  return (
    <TouchableOpacity style={styles.productContainer} onPress={()=>navigateToBuyItem(product.id)}>
      <Image source={{ uri: product.imgs[0] }} style={styles.productImage} />
      <View style={styles.productDetails} key={product.id}>
        <Text style={styles.productName}>{product.name}</Text>
        <Text style={styles.productPrice}>{product.price}</Text>
        <Text style={styles.productDescription}>{product.description}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  productContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  productImage: {
    width: 200,
    height: 200,
    borderRadius: 8,
    marginRight: 10,
  },
  productDetails: {
    flex: 1,
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  productPrice: {
    fontSize: 14,
    color: '#888',
  },
    productDescription: {
    fontSize: 14,
    },
});

export default Product;
