import React from "react";

import RegisterScreen from "./src/screens/RegisterScreen";
import LoginScreen from "./src/screens/LoginScreen";
import Home from "./src/components/ProductList";
import BuyItemScreen from "./src/components/BuyItemScreen";
import InventoryScreen from "./src/components/InventoryScreen";
import AdminDashboard from "./src/components/AdminDashboard";
import ProfilePageScreen from "./src/components/ProfilePageScreen";
import EditProfileScreen from "./src/components/EditProfileScreen";

import { AuthProvider } from "./src/contexts/authContext";
import { ProductProvider } from "./src/contexts/productContext";
import { OrderProvider } from "./src/contexts/orderContext";
import CustomDrawer from "./src/components/CustomDrawer";
import Icon_Feather from "react-native-vector-icons/Feather";
import Icon_MaterialIcons from "react-native-vector-icons/MaterialIcons";
import * as SplashScreen from "expo-splash-screen";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

const App = () => {
  SplashScreen.hideAsync();

  return (
    <NavigationContainer>
      <AuthProvider>
        <ProductProvider>
          <OrderProvider>
            <Stack.Navigator initialRouteName="Login" headerShow="false">
              <Stack.Screen name="Login" component={LoginScreen} />
              <Stack.Screen name="Home" component={MainStack} />
              <Stack.Screen
                name="BuyItem"
                component={BuyItemScreen}
                options={{ title: "Order Stock" }}
              />
              <Stack.Screen
                name="Register"
                component={RegisterScreen}
                options={{
                  drawerIcon: () => (
                    <Icon_MaterialIcons
                      name="person-add"
                      size={24}
                      color="#4796BD"
                    />
                  ),
                }}
              />
              <Stack.Screen
                name="AdminDashboard"
                component={AdminDashboard}
                options={{ title: "Admin Dashboard" }}
              />

              <Stack.Screen
                name="ProfilePage"
                component={ProfilePageScreen}
                options={{
                  title: "Profile Page",
                }}
              />
            </Stack.Navigator>
          </OrderProvider>
        </ProductProvider>
      </AuthProvider>
    </NavigationContainer>
  );
};

const MainStack = () => {
  return (
    <Drawer.Navigator drawerContent={(props) => <CustomDrawer {...props} />}>
      <Drawer.Screen
        name="Product List"
        component={Home}
        options={{
          drawerIcon: () => (
            <Icon_MaterialIcons name="home" size={24} color="#4796BD" />
          ),
        }}
        headerShow="false"
      />
      <Drawer.Screen
        name="Inventory"
        component={InventoryScreen}
        options={{
          drawerIcon: () => (
            <Icon_Feather name="list" size={24} color="#4796BD" />
          ),
        }}
      />
      <Drawer.Screen
        name="Profile Page"
        component={ProfilePageScreen}
        options={{
          drawerIcon: () => (
            <Icon_MaterialIcons name="person" size={24} color="#4796BD" />
          ),
        }}
      />
      <Drawer.Screen
        name="Edit Profile"
        component={EditProfileScreen}
        options={{
          drawerIcon: () => (
            <Icon_MaterialIcons name="edit" size={24} color="#4796BD" />
          ),
        }}
      />
    </Drawer.Navigator>
  );
};

export default App;
