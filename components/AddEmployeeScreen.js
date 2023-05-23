import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { RadioButton } from 'react-native-paper';

const AddEmployeeScreen = () => {
  const [name, setName] = useState('');
  const [gender, setGender] = useState('male');
  const [position, setPosition] = useState('employee');
  const [phone, setPhone] = useState('');

  const handleAddEmployee = () => {
    // Handle adding employee logic here
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Add Employee</Text>
      <View style={styles.formContainer}>
        <TextInput
          style={styles.input}
          placeholder="Name"
          value={name}
          onChangeText={(text) => setName(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Phone"
          keyboardType="numeric"
          value={phone}
          onChangeText={(text) => setPhone(text)}
        />
        {/* <View style={styles.input}>
          <Picker
            selectedValue={gender}
            onValueChange={(itemValue) => setGender(itemValue)}
          >
            <Picker.Item label="Male" value="male" />
            <Picker.Item label="Female" value="female" />
          </Picker>
        </View> */}
        {/* <View style={styles.radioContainer}>
          <Text style={styles.label}>Position:</Text>
          <View style={styles.radioButtons}>
            <View style={styles.radioButton}>
              <Text>Employee</Text>
              <RadioButton
                value="employee"
                status={position === 'employee' ? 'checked' : 'unchecked'}
                onPress={() => setPosition('employee')}
              />
            </View>
            <View style={styles.radioButton}>
              <Text>Manager</Text>
              <RadioButton
                value="manager"
                status={position === 'manager' ? 'checked' : 'unchecked'}
                onPress={() => setPosition('manager')}
              />
            </View>
          </View>
        </View> */}

        <Button title="Add Employee" onPress={handleAddEmployee} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  heading: {
    fontSize: 24,
    marginBottom: 16,
    fontWeight: 'bold',
  },
  formContainer: {
    width: '80%',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 8,
  },
  input: {
    width: '100%',
    height: 40,
    marginBottom: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
  },
  radioContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  label: {
    marginRight: 10,
  },
  radioButtons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  radioButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 10,
  },
});

export default AddEmployeeScreen;
