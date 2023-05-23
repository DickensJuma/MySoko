
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import RegisterScreen from './screens/RegisterScreen';
import LoginScreen from './screens/LoginScreen';

import ProductList from './components/ProductList';
import BuyItemScreen from './components/BuyItemScreen';
import InventoryScreen from './components/InventoryScreen';
import AdminDashboard from './components/AdminDashboard';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
       <Stack.Screen name="Home" component={ProductList} />
       <Stack.Screen
          name="ProductList"
          component={ProductList}
          options={{ title: 'Product List' }}
        />
        <Stack.Screen
          name="BuyItem"
          component={BuyItemScreen }
          options={{ title: 'Order Stock' }}
        />

        <Stack.Screen

          name="Inventory"  
          component={InventoryScreen}
          options={{ title: 'Stock' }}
        />


        <Stack.Screen

          name="AdminDashboard"
          component={AdminDashboard}
          options={{ title: 'Admin Dashboard' }}
        />
        




        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
