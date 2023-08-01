import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

const Product = ({ product }) => {
  const navigation = useNavigation();

  const navigateToBuyItem = (productId) => {
    const propsToPass = {
      productId: productId,
      product: product,
    };

    navigation.navigate("BuyItem", propsToPass);
  };

  return (
    <TouchableOpacity
      style={styles.productContainer}
      key={product._id}
      onPress={() => navigateToBuyItem(product._id)}
    >
      <Image
        source={{ uri: product.product_image }}
        style={styles.productImage}
      />
      <View style={styles.productDetails} key={product._id}>
        <Text style={styles.productName}>{product.product_name}</Text>
        <Text style={styles.productPrice}>KES: {new Intl.NumberFormat('en-US').format(product.product_price)}</Text>
        <Text style={styles.productPrice}>
          QNTY Available: {product.product_quantity}
        </Text>
        <Text style={styles.productPrice}>MOQ: {product.moq}</Text>
        <Text style={styles.productDescription}>
          {product.product_description}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  productContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  productImage: {
    width: 130,
    height: 130,
    borderRadius: 8,
    marginRight: 2,
  },
  productDetails: {
    flex: 1,
  },
  productName: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
  },
  productPrice: {
    fontSize: 14,
    color: "#000",
    marginBottom: 8,
  },
  productDescription: {
    fontSize: 14,
    color: "#444",
  },
});

export default Product;
