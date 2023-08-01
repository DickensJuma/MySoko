import React, { useState, useContext, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  TextInput,
} from "react-native";
const { OrderContext } = require("../contexts/orderContext");

const AdminDashboard = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const { orders, getOrders, updateOrder } = useContext(OrderContext);

  useEffect(() => {
    getOrders();
  }, [orders]);

  const totalOrders = orders.length;
  const deliveredOrders = orders.filter(
    (order) => order.status !== "pending"
  ).length;
  const pendingOrders = orders.filter(
    (order) => order.status == "pending"
  ).length;

  console.log("D",deliveredOrders);
  console.log("P",pendingOrders);

  const filteredOrders = orders.filter((order) => {
    //convert to lowercase
    const searchQueryLower = searchQuery.toLowerCase();
    const orderIDLower = order._id.toLowerCase();
    const productNameLower = order.products?.product_name.toLowerCase() || "";
    const fullNameLower = order.user?.full_name.toLowerCase();
    const phone_number = order.user?.phone_number;

    const sizeLower = order.size;
    const colorLower = order.color.toLowerCase();
    const dateLower = order.date.toLowerCase();
    const statusLower = order.status.toLowerCase();

    return (
      orderIDLower.includes(searchQueryLower) ||
      productNameLower.includes(searchQueryLower) ||
      fullNameLower.includes(searchQueryLower) ||
      phone_number.includes(searchQueryLower) ||
      sizeLower.includes(searchQueryLower) ||
      colorLower.includes(searchQueryLower) ||
      dateLower.includes(searchQueryLower) ||
      statusLower.includes(searchQueryLower)
    );
  });

  const markOrderDelivered = (orderId) => {
    const order = orders.find((order) => order._id === orderId);
    let orderData = {
      ...order,
      status: "Delivered",
    };

    updateOrder(orderData);
  };


  const renderOrderItem = ({ item }) => (
    <View style={styles.orderItem}>
      {orders.length == 0 && (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
          }}
        >
          <ActivityIndicator color={"#000"} animating={true} size="small" />
        </View>
      )}

      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <View style={{ flexDirection: "column" }}>
          <Image
            source={{ uri: item.products?.product_image }}
            style={styles.productImage}
          />
          {item.status !== "Delivered" && (
            <TouchableOpacity
              style={styles.markDeliveredButton}
              onPress={() => markOrderDelivered(item._id)}
            >
              <Text style={styles.markDeliveredButtonText}>
               Mark as Delivered
              </Text>
            </TouchableOpacity>
          )}
        </View>
        <View style={{ flexDirection: "column", paddingHorizontal: 10 }}>
          <Text style={styles.orderItemText}>
          {item.products?.product_name}
          </Text>
          <Text style={styles.orderItemText}>{item.user.full_name}</Text>
          <Text style={styles.orderItemText}>
            Phone: {item.user.phone_number}
          </Text>
          <Text style={styles.orderItemText}>
            Qnty: {item.quantity}
           
          </Text>
          <Text style={styles.orderItemText}>Size: {item.size}</Text>

          <Text style={styles.orderItemText}>Color: {item.color}</Text>
          <Text style={styles.orderItemText}>
          {new Date(item.date)?.toDateString()}
          </Text>
          <Text style={styles.orderItemTotal}>Total: KES {new Intl.NumberFormat('en-US').format(item.total)}</Text>
          <Text
            style={[
              styles.orderItemText,
              { color: item.status !== "pending" ? "green" : "red" },
            ]}
          >
            Status:
            {item.status}
          </Text>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Admin Dashboard</Text>
      <TextInput
        style={styles.searchInput}
        placeholder="Search by Product Name or Customer Name"
        value={searchQuery}
        onChangeText={setSearchQuery}
      />

      <FlatList
        data={filteredOrders}
        renderItem={renderOrderItem}
        keyExtractor={(item) => item._id}
        style={styles.orderList}
      />

      <View style={styles.navbar}>
        <View style={styles.navbarItem}>
          <Text style={styles.navbarItemText}>Total</Text>
          <Text style={styles.navbarItemValue}>{totalOrders}</Text>
        </View>
        <View style={styles.navbarItem}>
          <Text style={styles.navbarItemText}>Pending</Text>
          <Text style={styles.navbarItemValue}>{pendingOrders}</Text>
        </View>
        <View style={styles.navbarItem}>
          <Text style={styles.navbarItemText}>Delivered </Text>
          <Text style={styles.navbarItemValue}>{deliveredOrders}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
  },
  orderList: {
    flex: 1,
  },
  orderItem: {
    backgroundColor: "#f5f5f5",
    padding: 16,
    marginBottom: 8,
    borderRadius: 8,
  },
  orderItemText: {
    fontSize: 16,
    marginBottom: 8,
  },
  orderItemTotal: {
    fontSize: 16,
    marginBottom: 8,
    fontWeight: "bold",
  },
  markDeliveredButton: {
    backgroundColor: "green",
    paddingVertical: 12,
    paddingHorizontal: 4,
    borderRadius: 4,
    marginTop: 22,
  },
  markDeliveredButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    width: "100%",
  },
  productImage: {
    width: 130,
    height: 140,
    borderRadius: 8,
    marginRight: 10,
  },
  searchInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 8,
    marginBottom: 2,
  },
  footer: {
    borderTopWidth: 1,
    borderTopColor: "#ccc",
    paddingVertical: 16,
    paddingHorizontal: 10,
  },
  footerButton: {
    backgroundColor: "#333",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  footerButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  navbar: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginTop: 20,
    paddingVertical: 10,
    backgroundColor: "#f5f5f5",
    borderRadius: 8,
    width: "100%",
    //marginBottom: 2,
  },
  navbarItem: {
    alignItems: "center",
  },
  navbarItemText: {
    fontSize: 16,
    marginBottom: 2,
  },
  navbarItemValue: {
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default AdminDashboard;
