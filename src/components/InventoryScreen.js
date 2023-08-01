import React, { useState, useContext, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
const { OrderContext } = require("../contexts/orderContext");
const { AuthContext } = require("../contexts/authContext");


const InventoryScreen = () => {
  const { orders, getUserOrders , userOrders} = useContext(OrderContext);
  const { user } = useContext(AuthContext);
  const [filter, setFilter] = useState("all"); // Add filter state
  const [loading, setLoading] = useState(true);

  let userId = user._id

  useEffect(() => {
    getUserOrders(userId);
    setLoading(false);
  }, []);

  const filterOrders = (status) => {
    setFilter(status);
  };

  const filteredOrders = () => {
    if (filter === "all") {
      return userOrders;
    } else if (filter === "pending") {
      return userOrders.filter((order) => order.status !== "Delivered");
    } else if (filter === "delivered") {
      return userOrders.filter((order) => order.status === "Delivered");
    }
    return [];
  };


  const renderOrderItem = ({ item }) => (
    <View style={styles.orderItem}>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <View style={{ flexDirection: "column" }}>
          <Image
            source={{ uri: item.products?.product_image }}
            style={styles.productImage}
          />
        </View>
        <View
          style={{
            flexDirection: "column",
            backgroundColor: "#fff",
            padding: 16,
            borderRadius: 8,
          }}
        >
          <Text style={styles.orderItemText}>{item.products?.product_name}</Text>
          <Text style={styles.orderItemText}>Quantity: {item.quantity}</Text>
          <Text style={styles.orderItemText}>Size: {item.size}  </Text>
          <Text style={styles.orderItemText}>Color: {item.color}</Text>
          <Text style={styles.orderItemText}>
            {new Date(item.date)?.toDateString()}
          </Text>
          <Text style={styles.orderItemText}>Total: {new Intl.NumberFormat('en-US').format(item.total)}</Text>
          <Text
            style={[
              styles.orderItemText,
              { color: item.status == "Delivered" ? "green" : "red" },
            ]}
          >
            Status: {item.status == "Delivered" ? "Delivered" : "Pending"}
          </Text>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
       <View style={styles.navbar}>
        <TouchableOpacity
          style={[
            styles.navbarButton,
            filter === "all" && styles.activeNavbarButton,
          ]}
          onPress={() => filterOrders("all")}
        >
          <Text style={styles.navbarButtonText}>All</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.navbarButton,
            filter === "pending" && styles.activeNavbarButton,
          ]}
          onPress={() => filterOrders("pending")}
        >
          <Text style={styles.navbarButtonText}>Pending</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.navbarButton,
            filter === "delivered" && styles.activeNavbarButton,
          ]}
          onPress={() => filterOrders("delivered")}
        >
          <Text style={styles.navbarButtonText}>Delivered</Text>
        </TouchableOpacity>
      </View>
  <Text style={styles.title}>Stock Ordered</Text>
 
  {userOrders.length === 0 ? (
    <View style={{ flex: 1, justifyContent: 'center' }}>
      <ActivityIndicator color="#000" animating={true} size="small" />
    </View>
  ) : (
    <FlatList
      data={filteredOrders()}
      renderItem={renderOrderItem}
      keyExtractor={(item) => `${item._id}-${item.date}`} 
      style={styles.orderList}
    />
  )}
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
  markDeliveredButton: {
    backgroundColor: "green",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 4,
    marginTop: 8,
  },
  markDeliveredButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  productImage: {
    width: 150,
    height: 150,
    borderRadius: 8,
    marginRight: 10,
  },
  navbar: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  navbarButton: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginRight: 8,
  },
  activeNavbarButton: {
    backgroundColor: "#d1d1d1",
  },
  navbarButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
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
    markDeliveredButton: {
    backgroundColor: "green",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 4,
    marginTop: 8,
    },
    markDeliveredButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    },
    productImage: {
    width: 150,
    height: 150,
    borderRadius: 8,
    marginRight: 10,
    },
});

export default InventoryScreen;
