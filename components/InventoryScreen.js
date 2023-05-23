import React from 'react';
import { View, Text, Image, FlatList, StyleSheet } from 'react-native';

const InventoryScreen = () => {
  const inventoryData = [
    { id: '1', name: 'Product 1', quantity: 10,
     image: 'https://fastly.picsum.photos/id/0/5000/3333.jpg?hmac=_j6ghY5fCfSD6tvtcV74zXivkJSPIfR9B8w34XeQmvU', 
    price: 100},
    { id: '2', name: 'Product 2', quantity: 5, 
    image: 'https://fastly.picsum.photos/id/13/2500/1667.jpg?hmac=SoX9UoHhN8HyklRA4A3vcCWJMVtiBXUg0W4ljWTor7s', 
    price: 150},
    { id: '3', name: 'Product 3', quantity: 8,
     image: 'https://fastly.picsum.photos/id/28/4928/3264.jpg?hmac=GnYF-RnBUg44PFfU5pcw_Qs0ReOyStdnZ8MtQWJqTfA', 
    price: 200 },
    // Add more inventory items as needed
  ];

  const renderItem = ({ item }) => (
    <View style={styles.item}>
     <View style={{flexDirection:'row',justifyContent:'space-between'}}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.quantity}>{item.quantity}</Text>
    <Text style={styles.description}>{item.price}</Text>
      <Text style={styles.description}>Delivered</Text>
      </View>
    </View>
  );
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Inventory</Text>
      
      <View style={{flexDirection:'row',justifyContent:'space-between', backgroundColor: "#eee", padding: 2}}>
      <Text style={{fontSize:18,fontWeight:'bold'}}> Image</Text>
      <Text style={{fontSize:18,fontWeight:'bold'}}>Name</Text>
      <Text style={{fontSize:18,fontWeight:'bold'}}>Qnty</Text>
      <Text style={{fontSize:18,fontWeight:'bold'}}>Price</Text>
      <Text style={{fontSize:18,fontWeight:'bold'}}>Status</Text>
      </View>

      <FlatList
        data={inventoryData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  heading: {
    fontSize: 24,
    marginBottom: 16,
    fontWeight: 'bold',
  },
  item: {
    backgroundColor: '#f9f9f9',
    padding: 16,
    marginBottom: 12,
    borderRadius: 8,
    elevation: 3,
  },
  image: {
    width: 50,
    height: 50,
    marginBottom: 8,
    borderRadius: 4,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  quantity: {
    fontSize: 14,
    color: '#888',
  },
  description: {
    fontSize: 14,
    marginBottom: 8,
  },
});

export default InventoryScreen;
