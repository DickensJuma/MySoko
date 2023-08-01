import React, { useState, useContext, useEffect } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Text,
  TextInput,
  FlatList,
} from "react-native";
import PropTypes from "prop-types";
import Product from "./Product";
import { ProductContext } from "../contexts/productContext";
import { useIsFocused } from "@react-navigation/native";

const { width } = Dimensions.get("window");
const bannerHeight = 200;

const categories = [
  "All",
  "Big",
  "Medium",
  "Large",
  // Add more categories as needed
];

const ProductList = ({ navigation }) => {
  const { products, getProducts } = useContext(ProductContext);
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  const [searchQuery, setSearchQuery] = useState("");
  const isFocused = useIsFocused();

  const onSelectCategory = (category) => {
    setSelectedCategory(category);
  };

  useEffect(() => {
    getProducts();
  }, []);
  useEffect(() => {
    if (isFocused) {
      getProducts();
    }
  }, [isFocused]);

  const filteredProducts = products.filter((product) => {
    if (selectedCategory === "All" && searchQuery === "") {
      return true;
    }
    if (selectedCategory === "All") {
      return product.product_name
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
    }
    return (
      product.product_category.includes(selectedCategory) &&
      product.product_name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search by Product Name"
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      <Navbar
        categories={categories}
        selectedCategory={selectedCategory}
        onSelectCategory={onSelectCategory}
      />

      <FlatList
        data={filteredProducts}
        renderItem={({ item }) => <Product product={item} key={item._id} />}
        keyExtractor={(item) => item._id}
      />
    </View>
  );
};

const Navbar = ({ categories, selectedCategory, onSelectCategory }) => {
  return (
    <View style={styles.navbar}>
      {categories.map((category) => (
        <TouchableOpacity
          key={category}
          style={[
            styles.navbarItem,
            category === selectedCategory && styles.navbarItemSelected,
          ]}
          onPress={() => onSelectCategory(category)}
        >
          <Text
            style={[
              styles.navbarItemText,
              category === selectedCategory && styles.navbarItemTextSelected,
            ]}
          >
            {category}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

Navbar.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.string).isRequired,
  selectedCategory: PropTypes.string.isRequired,
  onSelectCategory: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#fff",
    paddingVertical: 16,
    paddingHorizontal: 20,
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  bannerImage: {
    width: "100%",
    height: 200,
    marginBottom: 16,
  },
  coverProductContainer: {
    marginBottom: 16,
    alignItems: "center",
  },
  navbar: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    marginBottom: 5,
  },
  navbarItem: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: "#eee",
  },
  navbarItemSelected: {
    backgroundColor: "#ccc",
  },
  navbarItemText: {
    fontSize: 16,
    color: "#555",
    fontWeight: "bold",
  },
  navbarItemTextSelected: {
    color: "#fff",
  },
  registerButton: {
    color: "#4287f5",
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 30,
  },
  slider_container: {
    height: bannerHeight,
    marginBottom: 10,
  },
  slider_image: {
    width: width,
    height: bannerHeight,
    resizeMode: "cover",
  },
  nav_container: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    backgroundColor: "#ff9b39",
    height: 60,
    alignItems: "center",
    marginBottom: 8,
  },
  navbarLink: {
    paddingVertical: 6,
  },
  navbarLinkText: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "bold",
  },
  button: {
    //backgroundColor: '#fff',
    borderRadius: 8,
    paddingVertical: 3,
    paddingHorizontal: 2,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
  },
  heading: {
    fontSize: 25,
    paddingHorizontal: 3,
  },
  chartView: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    marginVertical: 20,
    marginHorizontal: 10,
    marginTop: 30,
  },
  searchInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 8,
    marginBottom: 16,
  },
});

export default ProductList;
