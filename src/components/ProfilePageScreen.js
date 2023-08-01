import React, { useContext, useEffect, useState } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { Table, Rows } from "react-native-table-component";
import { Ionicons } from "@expo/vector-icons";

import { OrderContext } from "../contexts/orderContext";
import { AuthContext } from "../contexts/authContext";
import { useIsFocused } from "@react-navigation/native";

const ProfilePageScreen = () => {
  const { user, getUserData } = useContext(AuthContext);
  const { orders, getUserOrders, userOrders } = useContext(OrderContext);
  const [loading, setLoading] = useState(true);
  const isFocused = useIsFocused();

  useEffect(() => {
    getUserOrders(user._id);
    setLoading(false);
  }, []);

  useEffect(() => {
    if (isFocused) {
      getUserData(user._id);
    }
  }, [isFocused]);

  const totalOrders = userOrders.length;
  const deliveredOrders = userOrders.filter(
    (order) => order.status == "Delivered"
  ).length;
  const pendingOrders = userOrders.filter(
    (order) => order.status !== "Delivered"
  ).length;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require("../../assets/profile.png")}
          style={styles.profileImage}
        />
        <Text style={styles.name}>{user.full_name}</Text>
        <Text
          style={[
            styles.orderItemText,
            { color: user.status ? "green" : "red" },
          ]}
        >
          {user.status ? "Active" : "Inactive"}
        </Text>
        <Text style={styles.phone}>
          <Ionicons name="call-outline" size={24} color="black" />
          {user.phone_number}
        </Text>
      </View>
      <View style={styles.content}>
        
        <Text style={styles.sectionHeading}>
          <Ionicons name="business-outline" size={24} color="black" />
          Shop
        </Text>
        <Text style={styles.about}> {user.shop_name}</Text>

        <Text style={styles.sectionHeading}>
          <Ionicons name="location-outline" size={24} color="black" />
          Location
        </Text>
        <Text style={styles.interests}>{user.shop_address}</Text>

        {loading ? <Text>Loading...</Text> : null}

        <View style={styles.container}>
          <Text style={styles.sectionHeading}>
            <Ionicons name="cart-outline" size={24} color="black" />
            Stock Orders
          </Text>

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
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    // alignItems: 'center',
  },
  header: {
    alignItems: "center",
    paddingTop: 32,
    paddingBottom: 16,
    backgroundColor: "#f9f9f9",
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 8,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 4,
  },
  email: {
    fontSize: 16,
    color: "#666",
  },
  content: {
    flex: 1,
    padding: 16,
  },
  sectionHeading: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 18,
  },
  about: {
    marginBottom: 4,
  },
  interests: {
    marginBottom: 16,
  },
  position: {
    fontSize: 14,
    color: "#43a47a",
  },
  sectionHeading: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  tableBorder: {
    borderWidth: 1,
    borderColor: "#000",
    marginBottom: 10,
  },
  tableContainer: {
    borderWidth: 1,
    borderColor: "#000",
    marginBottom: 10,
  },
  text: {
    padding: 10,
    textAlign: "center",
  },
  button: {
    borderWidth: 2,
    borderColor: "#000",
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    alignItems: "center",
  },
  orderItemText: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
  },
  phone: {
    fontSize: 16,
    color: "#666",
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
    marginBottom: 20,
  },
  navbarItem: {
    alignItems: "center",
  },
  navbarItemText: {
    fontSize: 16,
    marginBottom: 4,
  },
  navbarItemValue: {
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default ProfilePageScreen;
