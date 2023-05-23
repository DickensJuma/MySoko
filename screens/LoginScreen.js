import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet , Image} from 'react-native';
import axios from 'axios';

const LoginScreen = ({navigation}) => {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');

  console.log(phone, password)


  const handleLogin = async () => {
    console.log(phone, password)
    // if (phone === '' || password === '') {
    //   // Display an error message if any of the fields are empty
    //   alert('Please enter your Phone Number and password.');
    // } else {
    //   try {
    //     // Make a request to your backend server to authenticate the user
    //     const response = await axios.post('https://example.com/api/login', {
    //       phone,
    //       password,
    //     });
  
    //     // Handle the response from the server
    //     if (response.data.success) {
    //       // Login successful
    //       alert('Login successful!');
    //       // You can navigate to the home screen or perform any other actions as needed
    //     } else {
    //       // Login failed, display an error message
    //       alert('Invalid email or password. Please try again.');
    //     }
    //   } catch (error) {
    //     // An error occurred during the request
    //     console.log('Error:', error);
    //     alert('An error occurred. Please try again later.');
    //   }
    // }
    if(password == "admin" || phone == "admin"){
      navigation.navigate('AdminDashboard');
    }else{
      navigation.navigate('Home');
    }
    
  };

  const handleRedirectToRegister = () => {
    navigation.navigate('Register');
  };
  
  return (
    
    <View style={styles.container}>
       <Image source={{uri: 'https://reactnative.dev/img/tiny_logo.png',}} style={{width: 50, height: 50,}} />
      <Text style={styles.logo}>MySoko</Text>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Phone Number"
          placeholderTextColor="#808080"
          value={phone}
          onChangeText={(text) => setPhone(text)}
        />
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#808080"
          secureTextEntry
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
      </View>

      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginButtonText}>Login</Text>
      </TouchableOpacity>

        <TouchableOpacity>
        <Text style={styles.registerButton}>{
            <Text style={styles.registerButton}  onPress={handleRedirectToRegister}>Don't have an account? Register here</Text>
        }</Text>
        </TouchableOpacity>

    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  logo: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 50,
  },
  inputContainer: {
    width: '80%',
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#f2f2f2',
    padding: 10,
    borderRadius: 5,
  },
  loginButton: {
    backgroundColor: '#4287f5',
    padding: 10,
    borderRadius: 5,
    width: '80%',
    alignItems: 'center',
    marginTop: 30,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
    registerButton: {
    color: '#4287f5',
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 30,
    },

});

export default LoginScreen;
