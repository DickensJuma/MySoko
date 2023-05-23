import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TextInput, Button, SafeAreaView } from 'react-native';
import PropTypes from 'prop-types';
import { useNavigation } from '@react-navigation/native';


const BuyItemScreen = ({ route }) => {
 
  const { productId, product } = route.params;

  const [quantity, setQuantity] = useState('');
  const [size, setSize] = useState('');
  const [color, setColor] = useState('');


  const navigation = useNavigation();


  const handleBuyItem = () => {
    // Logic to handle buying the item with the selected quantity, size, and color
    console.log('Buy item:', {
      productId,
      product,
      quantity,
      size,
      color,
    });
    navigation.navigate('Inventory');
  };

  return (
    <View style={styles.container}>
      <View style={styles.productInfoContainer} key={product.id}>
        <Image source={{ uri: product.imgs[0] }} style={styles.productImage} />

        <View style={styles.productDetails}>
        <Text style={styles.text}> {product.name}</Text>
        <Text style={styles.text}> Price: KES {product.price}</Text>
        <Text style={styles.text}> {product.categories[0]}</Text>
        <Text style={styles.text}> {product.description}</Text>
          </View>
      
      </View>
      <SafeAreaView>
      <View style={styles.inputContainer}>
       
     
       
        <Text style={styles.text}>Color</Text>
        <TextInput
          style={styles.input}
          placeholder="Color"
          value={color}
          onChangeText={setColor}
          keyboardType="default"

        />

<Text style={styles.text}>Size</Text>
         <TextInput
          style={styles.input}
          placeholder="Size"
          value={size}
          onChangeText={setSize}
          keyboardType="default"

        />
         <Text style={styles.text}>Quantity</Text>
        
        <TextInput
            style={styles.input}
            placeholder="Quantity"
            value={quantity}
            onChangeText={setQuantity}
            keyboardType="default"
  
          />
      </View>
      </SafeAreaView>
      

      <Button title="Order Stock" onPress={handleBuyItem} />
    </View>
  );
};

BuyItemScreen.propTypes = {
  route: PropTypes.object.isRequired,
};

const styles = StyleSheet.create({

  container: {  
    flex: 1,
    padding: 16,
    justifyContent: 'space-between',
  },
  productInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 2,
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
  text: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  inputContainer: {
    marginBottom: 2,
  },
  input: {
    borderWidth: 1,
    borderColor: '#888',
    borderRadius: 8,
    padding: 8,
    marginBottom: 8,
  },
  picker: {
    borderWidth: 1,
    borderColor: '#888',
    borderRadius: 8,
    marginBottom: 8,
  },
  Button: {
    marginBottom: 2,
    
  },



});

export default BuyItemScreen;
