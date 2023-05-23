import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const DrawerScreen = ({ navigation }) => {
  const handleNavigation = (screen) => {
    navigation.navigate(screen);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.drawerItem}
        onPress={() => handleNavigation('Home')}
      >
        <Text style={styles.drawerItemText}>Home</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.drawerItem}
        onPress={() => handleNavigation('AddEmployee')}
      >
        <Text style={styles.drawerItemText}>Add Employee</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.drawerItem}
        onPress={() => handleNavigation('Inventory')}
      >
        <Text style={styles.drawerItemText}>Inventory</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.drawerItem}
        onPress={() => handleNavigation('EmployeeList')}
      >
        <Text style={styles.drawerItemText}>Employee List</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.drawerItem}
        onPress={() => handleNavigation('ProfilePage')}
      >
        <Text style={styles.drawerItemText}>Profile Page</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 40,
    paddingHorizontal: 20,
    backgroundColor: '#FFFFFF',
  },
  drawerItem: {
    marginBottom: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  drawerItemText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
    paddingVertical: 8,
  },
});

export default DrawerScreen;
