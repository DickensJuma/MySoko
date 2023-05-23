import React, {useState} from 'react';
import { View, ScrollView, StyleSheet, Dimensions, TouchableOpacity, Text, Image } from 'react-native';
import PropTypes from 'prop-types';

// import Carousel from 'react-native-snap-carousel';
// const { width: screenWidth } = Dimensions.get('window');

import Product from './Product';




const products = [
    {
      id: 1,
      name: 'Product 1',
      price: 10,
      description: 'This is product 1',
      imgs: [
        'https://ke.jumia.is/unsafe/fit-in/300x300/filters:fill(white)/product/23/6064321/1.jpg?2311',
        'https://picsum.photos/200/300pg',
      ],
      categories: [
        'Medium',
    ]
    },
    {
      id: 2,
      name: 'Product 2',
      price: 20,
      description: 'This is product 2',
      imgs: [
        'https://ke.jumia.is/unsafe/fit-in/300x300/filters:fill(white)/product/87/709868/1.jpg?7987',
        'https://example.com/product2-img2.jpg',
      ],
      categories: [
        'Big',
    ]
    },
    {
        id: 3,
        name: 'Product 3',
        price: 30,
        description: 'This is product 3',
        imgs: [
          'https://ke.jumia.is/unsafe/fit-in/300x300/filters:fill(white)/product/72/773685/1.jpg?4953',
          'https://example.com/product2-img2.jpg',
        ],
        categories: [
            'Medium',
        ]
      },
      
      {
        id: 4,
        name: 'Product 4',
        price: 500,
        description: 'This is product 4',
        imgs: [
          'https://ke.jumia.is/unsafe/fit-in/300x300/filters:fill(white)/product/12/568507/1.jpg?1880',
          'https://example.com/product2-img2.jpg',
        ],
        categories: [
            'Large',
        ]
      },
      {
        id: 5,
        name: 'Product 5',
        price: 400,
        description: 'This is product 4',
        imgs: [
          'https://ke.jumia.is/unsafe/fit-in/300x300/filters:fill(white)/product/61/208144/1.jpg?8469',
          'https://example.com/product2-img2.jpg',
        ],
        categories: [
            'Big',
        ]
      },
    // Add more products as needed
  ];
  

  
const categories = [
  'All',
  'Big',
  'Medium',
  'Large',
  // Add more categories as needed
];

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

const ProductList = () => {
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  const [selectedProduct, setSelectedProduct] = useState(products[0]);
 

  const onSelectCategory = (category) => {
    setSelectedCategory(category);

  };
  const filteredProducts = products.filter((product) =>
    selectedCategory === 'All' ? true :  product.categories.includes(selectedCategory)
  );


  return (
    <ScrollView contentContainerStyle={styles.container}>
        <Image
        source={{ uri: 'https://ke.jumia.is/cms/2023/BrandDays/PRK/Teasing/W21/_S_rvsd.jpg' }}
        style={styles.bannerImage}
        resizeMode="cover"
      />  
      <Navbar
        categories={categories}
        selectedCategory={selectedCategory}
        onSelectCategory={onSelectCategory}
      />
      {/* <View style={styles.coverProductContainer}>
        <Carousel
          data={products}
          renderItem={renderItem}
          sliderWidth={screenWidth}
          itemWidth={screenWidth / 2}
        />
      </View> */}
       {filteredProducts.map((product) => (
        
          <Product product={product} />
     
      ))}
      
    </ScrollView>
  );
};

ProductList.propTypes = {
  // Add any prop types for the component
  //products: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#fff',
    paddingVertical: 16,
    paddingHorizontal: 20,
  },
  bannerImage: {
    width: '100%',
    height: 200,
    marginBottom: 16,

  },
  coverProductContainer: {
    marginBottom: 16,
    alignItems: 'center',
  },
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginBottom: 8,
  },
  navbarItem: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: '#eee',
  },
  navbarItemSelected: {
    backgroundColor: '#ccc',
  },
  navbarItemText: {
    fontSize: 16,
    color: '#555',
  },
  navbarItemTextSelected: {
    color: '#fff',
  },
  registerButton: {
    color: '#4287f5',
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 30,
    },
});

export default ProductList;
