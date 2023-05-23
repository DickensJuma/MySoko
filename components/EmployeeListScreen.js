import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

const EmployeeListScreen = () => {
  const [employees, setEmployees] = useState([
    { id: '1', name: 'John Doe', position: 'Manager' },
    { id: '2', name: 'Jane Smith', position: 'Developer' },
    { id: '3', name: 'Mike Johnson', position: 'Designer' },
    // Add more employees as needed
  ]);

  const renderEmployeeItem = ({ item }) => (
    <View style={styles.employeeItem}>
      <Text style={styles.employeeName}>{item.name}</Text>
      <Text style={styles.employeePosition}>{item.position}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Employee List</Text>
      <FlatList
        data={employees}
        renderItem={renderEmployeeItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    paddingHorizontal: 16,
    backgroundColor: '#fff',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  employeeItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  employeeName: {
    flex: 1,
    fontSize: 16,
  },
  employeePosition: {
    fontSize: 14,
    color: '#666',
  },
});

export default EmployeeListScreen;
