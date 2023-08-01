import React, { useState, createContext, useContext, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
} from "react-native";
import { AuthContext } from "../contexts/authContext";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/FontAwesome";


const LoginScreen = () => {
  const { login } = useContext(AuthContext);
  const [phone_number, setPhone_number] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // State variable for show/hide password
  const navigation = useNavigation();

  
  const handleRedirectToRegister = () => {
    navigation.navigate("Register");
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  
  //check if all fields are filled
  const checkFields = () => {
    if (phone_number === "" || password === "") {
      return false;
    } else {
      return true;
    }
  };
  
  //check if password is more than 6 characters
  // const checkPasswordLength = () => {
    //   if (password.length < 6) {
      //     return false;
      //   } else {
        //     return true;
        //   }
  // };
  //check if kenyan phone number
  const checkPhone = () => {
    if (phone_number.length === 10 && phone_number.startsWith("07")) {
      return true;
    } else {
      return false;
    }
  };

  //error if fields are empty
  const fieldsError = () => {
    if (checkFields() === false) {
      return <Text style={{ color: "red" }}>All fields are required*</Text>;
    }
    
    // if (checkPasswordLength() === false) {
      //   return <Text style={{ color: 'red' }}>Password must be more than 6 characters*</Text>;
      // }
      
      if (checkPhone() === false) {
        return <Text style={{ color: "red" }}>Enter a valid phone number*</Text>;
    }
  };
  const handleLogin = () => {
    if(!checkFields()){
      fieldsError();
    }else if(!checkPhone()){
      fieldsError();
    }else{

    login(phone_number, password);
    }
  };
  
  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/mysoko.png")}
        style={{ width: 100, height: 100 , marginBottom: 20}}
      />
      {fieldsError()}
      <View style={styles.inputContainer}>
        <ScrollView keyboardDismissMode="interactive">
          <TextInput
            style={styles.input}
            placeholder="Phone Number"
            placeholderTextColor="#808080"
            value={phone_number}
            onChangeText={(text) => setPhone_number(text)}
          />
        </ScrollView>
      </View>

      <View style={styles.inputContainer}>
        <ScrollView keyboardDismissMode="interactive">
          <View style={styles.passwordInputContainer}>
            <TextInput
              style={styles.passwordInput}
              placeholder="Password"
              placeholderTextColor="#808080"
              secureTextEntry={!showPassword} 
              value={password}
              onChangeText={(text) => setPassword(text)}
            />
            <TouchableOpacity
              style={styles.passwordToggle}
              onPress={toggleShowPassword}
            >
              <Icon
                name={showPassword ? "eye-slash" : "eye"}
                size={20}
                color="#808080"
              />
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>

      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginButtonText}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity>
        <Text style={styles.registerButton}>
          <Text
            style={styles.registerButton}
            onPress={handleRedirectToRegister}
          >
            Don't have an account? Register here
          </Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  logo: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 40,
  },
  inputContainer: {
    width: "80%",
    marginBottom: 20,
  },
  input: {
    backgroundColor: "#f2f2f2",
    padding: 14,
    borderRadius: 5,
  },
  loginButton: {
    backgroundColor: "#4287f5",
    padding: 10,
    borderRadius: 5,
    width: "80%",
    alignItems: "center",
    marginTop: 20,
  },
  loginButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  registerButton: {
    color: "#4287f5",
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 30,
  },
  passwordInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    // borderBottomWidth: 1,
    // borderBottomColor: '#808080',
  },
  passwordInput: {
    flex: 1,
    backgroundColor: "#f2f2f2",
    padding: 14,
    borderRadius: 5,
  },
  passwordToggle: {
    //backgroundColor: '#f2f2f2',
    padding: 17,
  },
});

export default LoginScreen;
