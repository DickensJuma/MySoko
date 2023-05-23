import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet,Image } from 'react-native';

const RegisterScreen = ({navigation}) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
    const [shopName, setShopName] = useState('');
    const [shopAddress, setShopAddress] = useState('');


  const handleRegister = () => {
    // Handle registration logic here
    navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
     <Image source={{uri: 'https://reactnative.dev/img/tiny_logo.png',}} style={{width: 50, height: 50,}} />
      <Text style={styles.heading}>Register</Text>
      
        <Text style={styles.labelling}>User Details</Text>
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
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry={true}
        value={password}
        onChangeText={(text) => setPassword(text)}
      />
        <Text style={styles.labelling}>Shop Details</Text>

        <TextInput
        style={styles.input}
        placeholder=" Name of Shop"
        value={shopName}
        onChangeText={(text) => setName(text)}
      />
       <TextInput
        style={styles.input}
        placeholder=" Address of the Shop"
        value={shopAddress}
        onChangeText={(text) => setName(text)}
      />
      <Button title="Register" onPress={handleRegister} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
  },
  heading: {
    fontSize: 24,
    marginBottom: 16,
  },
  input: {
    width: '70%',
    height: 40,
    marginBottom: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    backgroundColor: '#f2f2f2',
  },
    labelling: {
    fontSize: 20,
    marginBottom: 16,
    },

});

export default RegisterScreen;
