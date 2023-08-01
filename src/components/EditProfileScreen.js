import React, { useContext, useEffect, useState } from "react";
import { View, Text, TextInput, Image, StyleSheet, Button } from "react-native";
import Icon_MaterialIcons from "react-native-vector-icons/MaterialIcons";

import { AuthContext } from "../contexts/authContext";
import { useNavigation } from "@react-navigation/native";

const EditProfileScreen = () => {
  const { user, editProfile } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState(user.full_name);
  const [phone, setPhone] = useState(user.phone_number);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [shopName, setShopName] = useState(user.shop_name);
  const [shopAddress, setShopAddress] = useState(user.shop_address);

  const navigation = useNavigation();

  const handleEditProfile = () => {
    const data = {
      userId: user._id,
      full_name: name,
      phone_number: phone,
      shop_name: shopName,
      shop_address: shopAddress,
      status: true,
    };
    editProfile(data);
    navigation.navigate("ProfilePage");
  };

  useEffect(() => {
    if (user) {
      setLoading(false);
    }
  }, [user]);

  if (loading) {
    return <Text>Loading...</Text>;
  }

  return (
    <View style={styles.container}>
     
      <View style={styles.content}>
        <Text style={styles.sectionHeading}>
          <Icon_MaterialIcons name="edit" size={24} color="#4796BD" />
          Edit Profile
        </Text>
        <TextInput
          style={styles.input}
          placeholder="Full Name"
          value={name}
          onChangeText={(text) => setName(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Phone Number"
          value={phone}
          onChangeText={(text) => setPhone(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Shop Name"
          value={shopName}
          onChangeText={(text) => setShopName(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Shop Address"
          value={shopAddress}
          onChangeText={(text) => setShopAddress(text)}
        />

        <Button title="Update Profile" onPress={handleEditProfile} />
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

  content: {
    flex: 1,
    padding: 16,
  },
  sectionHeading: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
  },
  input: {
    width: "100%",
    height: 40,
    marginBottom: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    backgroundColor: "#f2f2f2",
  },
  about: {
    marginBottom: 16,
  },
  interests: {},
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
  tableText: {
    padding: 10,
    textAlign: "center",
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
});

export default EditProfileScreen;
