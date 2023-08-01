import React, { useState, useContext, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  Button,
  ScrollView,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import PropTypes from "prop-types";
import { ProductContext } from "../contexts/productContext";
import { OrderContext } from "../contexts/orderContext";
import { AuthContext } from "../contexts/authContext";

import { useNavigation } from "@react-navigation/native";

const BuyItemScreen = ({ route }) => {
  const { getProduct, updateProduct } = useContext(ProductContext);
  const { createOrder } = useContext(OrderContext);
  const { user } = useContext(AuthContext);

  const { productId, product } = route.params;
  const [quantity, setQuantity] = useState("");
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
  const [total, setTotal] = useState(0);

  const navigation = useNavigation();

  // Define your options for the select input
  const colorOptions = [
    { label: "Choose Color", value: "" },
    { label: "Red", value: "red" },
    { label: "Blue", value: "blue" },
    { label: "Green", value: "green" },
    { label: "All  colors", value: "all" },
  ];

  const sizeOptions = [
    { label: "Choose Size", value: "" },
    { label: "Small", value: "small" },
    { label: "Medium", value: "medium" },
    { label: "Large", value: "large" },
    { label: "All sizes", value: "all" },
  ];

  useEffect(() => {
    getProduct(productId);
  }, []);

  const userId = user._id;

  const handleBuyItem = async () => {
    const order = {
      products: productId,
      user: userId,
      quantity,
      size,
      color,
      total,
      status: "pending",
    };

    console.log("ORDER=", order);
    let maxOrderQuantity =
      parseInt(product.product_quantity) - parseInt(quantity);
    console.log("MAX ORDER QUANTITY=", maxOrderQuantity);

    const productData = {
      ...product,
      product_quantity: maxOrderQuantity.toString(),
    };

    console.log("PRODUCT DATA=", productData);
    let newOrder = await createOrder(order);
    if (newOrder) {
      console.log("NEW ORDER=", newOrder);
      alert("Order Created Successfully");
      await updateProduct(productData), navigation.navigate("Inventory");
    } else {
      alert("Order Creation Failed");
    }
  };

  const fieldsError = () => {
    if (parseFloat(quantity) > parseFloat(product.product_quantity)) {
      return (
        <Text style={{ color: "red" }}>
          Quantity is larger than available quantity
        </Text>
      );
    }

    if (color == "" || size == "") {
      return (
        <View style={styles.container}>
          <Text style={styles.text}>Please select color and size</Text>
        </View>
      );
    }
  };

  const handleQuantityChange = (quantity) => {
    setQuantity(quantity);
    const totalPrice = quantity * product.product_price;
    setTotal(totalPrice || 0);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.productInfoContainer} key={product._id}>
        <Image
          source={{ uri: product.product_image }}
          style={styles.productImage}
        />

        <View style={styles.productDetails}>
          <Text style={styles.text}> {product.product_name}</Text>
          <Text style={styles.productPrice}>
            {" "}
            
            Price: KES {new Intl.NumberFormat('en-US').format(product.product_price)}
          </Text>
          <Text style={styles.productPrice}>
            {" "}
            Qnty Available: {product.product_quantity}
          </Text>
          <Text style={styles.productPrice}> MOQ: {product.moq}</Text>
          <Text style={styles.productDescription}>
            {" "}
            category: {product.product_category[0]}
          </Text>
          <Text style={styles.productDescription}>
            {" "}
            {product.product_description}
          </Text>
        </View>
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.text}>Total Price: KES {new Intl.NumberFormat('en-US').format(total)}</Text>
        {fieldsError()}

        <Text style={styles.text}>Quantity</Text>
        <TextInput
          style={styles.input}
          placeholder="Quantity"
          value={quantity}
          onChangeText={handleQuantityChange}
          keyboardType="default"
          // ReturnKeyType="done"
          // onSubmitEditing={handleInputSubmit}
        />
        <Text style={styles.text}>Color</Text>
        <Picker
          selectedValue={color}
          onValueChange={(itemValue, itemIndex) => setColor(itemValue)}
          style={styles.picker}
        >
          {colorOptions.map((option, index) => (
            <Picker.Item
              key={index}
              label={option.label}
              value={option.value}
            />
          ))}
        </Picker>
        <Text style={styles.text}>Size</Text>
        <Picker
          selectedValue={size}
          onValueChange={(itemValue, itemIndex) => setSize(itemValue)}
          style={styles.picker}
        >
          {sizeOptions.map((option, index) => (
            <Picker.Item
              key={index}
              label={option.label}
              value={option.value}
            />
          ))}
        </Picker>

        {/* <TextInput
          style={styles.input}
          placeholder="Size"
          value={size}
          onChangeText={setSize}
          keyboardType="default"
        /> */}
      </View>

      <Button title="Order Stock" onPress={handleBuyItem} />
    </ScrollView>
  );
};

BuyItemScreen.propTypes = {
  route: PropTypes.object.isRequired,
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  productInfoContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  productImage: {
    width: 120,
    height: 120,
    borderRadius: 8,
    marginRight: 16,
  },
  productDetails: {
    flex: 1,
  },
  productName: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  price: {
    fontSize: 16,
    marginBottom: 4,
    color: "#888",
  },
  category: {
    fontSize: 14,
    marginBottom: 4,
    color: "#888",
  },
  description: {
    fontSize: 14,
    marginBottom: 8,
  },
  inputContainer: {
    marginBottom: 16,
  },
  totalPrice: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
  },
  label: {
    fontSize: 14,
    marginBottom: 4,
    color: "#888",
  },
  picker: {
    width: "100%",
    marginBottom: 8,
    borderWidth: 1,
    borderColor: "#888",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: "#888",
    borderRadius: 8,
    padding: 8,
    marginBottom: 8,
  },
  text: {
    fontSize: 16,
    //marginBottom: 2,
    color: "#000",
    fontWeight: "bold",
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

export default BuyItemScreen;
