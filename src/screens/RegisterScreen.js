import React, { useState, useContext } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { AuthContext } from "../contexts/authContext";
import Icon from "react-native-vector-icons/FontAwesome";

const RegisterScreen = () => {
  const { register ,getUserByPhone} = useContext(AuthContext);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [shopName, setShopName] = useState("");
  const [shopAddress, setShopAddress] = useState("");
  const [refferalCode, setRefferalCode] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);


  
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const toggleShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const passwordInputType = showPassword ? "text" : "password";
  const confirmPasswordInputType = showConfirmPassword ? "text" : "password";

  const checkPassword = () => {
    if (password === confirmPassword) {
      return true;
    } else {
      return false;
    }
  };

  //check if all fields are filled
  const checkFields = () => {
    if (
      name === "" ||
      phone === "" ||
      password === "" ||
      confirmPassword === "" ||
      shopName === "" ||
      shopAddress === ""
      ) {
        return false;
    } else {
      return true;
    }
  };
  
  ///error if passwords dont match
  const passwordError = () => {
    if (checkPassword() === false) {
      return <Text style={{ color: "red" }}>Passwords do not match</Text>;
    }
  };
  //check if kenyan phone number
  const checkPhone = () => {
    if (phone.length === 10 && phone.startsWith("07")) {
      return true;
    } else {
      return false;
    }
  };

  //check if password is more than 6 characters
  const checkPasswordLength = () => {
    if (password.length < 6 || confirmPassword.length < 6) {
      return false;
    } else {
      return true;
    }
  };

  //error if fields are empty
  const fieldsError = () => {
    if (checkFields() === false) {
      return <Text style={{ color: "red" }}>All fields are required*</Text>;
    }
    if (checkPhone() === false) {
      return (
        <Text style={{ color: "red" }}>
          Phone number must be 10 digits and start with 07
        </Text>
      );
    }
    if (checkPasswordLength() === false) {
      return (
        <Text style={{ color: "red" }}>
          Password must be more than 6 characters*
        </Text>
      );
    }
   
  };

  const handleRegister = () => {
    console.log(name, phone, password, shopName, shopAddress, refferalCode);
    if(checkFields()){
  
      register(name, phone, password, shopName, shopAddress, refferalCode);
    }else
    {
      fieldsError();
    }
      
  };
  
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image
        source={require("../../assets/mysoko.png")}
        style={{ width: 100, height: 100 }}
      />

      <Text style={styles.labelling}>Register</Text>
      {passwordError()}
      {fieldsError()}

      <TextInput
        style={styles.input}
        placeholder=" Full Name"
        value={name}
        onChangeText={(text) => setName(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Phone Number"
        value={phone}
        onChangeText={(text) => setPhone(text)}
      />
      <View style={styles.passwordInputContainer}>
        <TextInput
          style={styles.inputPassword}
          placeholder="Password"
          secureTextEntry={!showPassword}
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
        <TouchableOpacity
          style={styles.iconButton}
          onPress={toggleShowPassword}
        >
          <Icon
            name={showPassword ? "eye-slash" : "eye"}
            size={24}
            color="#808080"
          />
        </TouchableOpacity>
      </View>

      <View style={styles.passwordInputContainer}>
        <TextInput
          style={styles.inputPassword}
          placeholder="Confirm Password"
          secureTextEntry={!showConfirmPassword}
          value={confirmPassword}
          onChangeText={(text) => setConfirmPassword(text)}
        />
        <TouchableOpacity
          style={styles.iconButton}
          onPress={toggleShowConfirmPassword}
        >
          <Icon
            name={showConfirmPassword ? "eye-slash" : "eye"}
            size={24}
            color="#808080"
          />
        </TouchableOpacity>
      </View>

      <TextInput
        style={styles.input}
        placeholder="Referral Code (Optional)"
        value={refferalCode}
        onChangeText={(text) => setRefferalCode(text)}
      />
      <Text style={styles.labelling}>Shop Details</Text>

      <TextInput
        style={styles.input}
        placeholder=" Name of Shop"
        value={shopName}
        onChangeText={(text) => setShopName(text)}
      />
      <TextInput
        style={styles.input}
        placeholder=" Location or Address of the Shop"
        value={shopAddress}
        onChangeText={(text) => setShopAddress(text)}
      />

      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#fff",
  },
  labelling: {
    fontSize: 24,
    fontWeight: "bold",
  },
  input: {
    width: "80%",
    height: 40,
    marginBottom: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    backgroundColor: "#f2f2f2",
  },
  inputPassword: {
    width: "73%",
    height: 40,
    marginBottom: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    backgroundColor: "#f2f2f2",
  },
  button: {
    borderWidth: 2,
    borderColor: "#000",
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    alignItems: "center",
  },
  buttonText: {
    color: "#000",
    fontSize: 16,
    fontWeight: "bold",
  },
  passwordInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    // borderBottomWidth: 1,
  },
  passwordInput: {
    flex: 1,
    backgroundColor: "#f2f2f2",
    padding: 14,
    borderRadius: 5,
  },
  passwordToggle: {
    backgroundColor: "#f2f2f2",
    padding: 12,
  },
});
export default RegisterScreen;
