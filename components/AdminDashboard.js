import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';

const AdminDashboard = () => {
  const [orders, setOrders] = useState([
    { id: 1, customerName: 'John Doe', product: 'Product 1', image: 'https://ke.jumia.is/unsafe/fit-in/300x300/filters:fill(white)/product/72/773685/1.jpg?4953', quantity: 2,price:5000,  delivered: false },
    { id: 2, customerName: 'Jane Smith', product: 'Product 2',  image: 'https://ke.jumia.is/unsafe/fit-in/300x300/filters:fill(white)/product/72/773685/1.jpg?4953',quantity: 1, price:1000, delivered: false },
    { id: 3, customerName: 'Bob Johnson', product: 'Product 3', image: 'https://ke.jumia.is/unsafe/fit-in/300x300/filters:fill(white)/product/72/773685/1.jpg?4953', quantity: 3, price:2000, delivered: true },
    // Add more orders as needed
  ]);

  const markOrderDelivered = (orderId) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === orderId ? { ...order, delivered: true } : order
      )
    );
  };

  const renderOrderItem = ({ item }) => (
    <View style={styles.orderItem}>
          


        <View style={{flexDirection:'row',justifyContent:'space-between'}}>
        <View style={{flexDirection:'column'}}>
                <Image source={{ uri: item.image }}  style={styles.productImage}/>
            </View>
            <View style={{flexDirection:'column'}}>
            <Text style={styles.orderItemText}>Order ID: {item.id}</Text>
      <Text style={styles.orderItemText}>Customer: {item.customerName}</Text>
      <Text style={styles.orderItemText}>Product: {item.product}</Text>
      <Text style={styles.orderItemText}>Quantity: {item.quantity}</Text>
        <Text style={styles.orderItemText}>Total Price: {item.price}</Text>
        <Text style={[
  styles.orderItemText,
  { color: item.delivered ? 'green' : 'red' }
]}>
  Status:
  {' '}
  {item.delivered ? 'Delivered' : 'Pending'}
</Text>
      {!item.delivered && (
        <TouchableOpacity
          style={styles.markDeliveredButton}
          onPress={() => markOrderDelivered(item.id)}
        >
          <Text style={styles.markDeliveredButtonText}>Mark Delivered</Text>
        </TouchableOpacity>
      )}
            </View>

        
     
    </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Admin Dashboard</Text>
      <FlatList
        data={orders}
        renderItem={renderOrderItem}
        keyExtractor={(item) => item.id.toString()}
        style={styles.orderList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  orderList: {
    flex: 1,
  },
  orderItem: {
    backgroundColor: '#f5f5f5',
    padding: 16,
    marginBottom: 8,
    borderRadius: 8,
  },
  orderItemText: {
    fontSize: 16,
    marginBottom: 8,
  },
  markDeliveredButton: {
    backgroundColor: 'green',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 4,
    marginTop: 8,
  },
  markDeliveredButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  productImage: {
    width: 150,
    height: 150,
    borderRadius: 8,
    marginRight: 10,
  },
});

export default AdminDashboard;
