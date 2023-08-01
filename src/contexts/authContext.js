import React, { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";

import { BASE_URL } from "../config/env";

const AuthContext = createContext();

const API_URL = BASE_URL + "/api/user";

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);

  const navigation = useNavigation();

  useEffect(() => {
    getAllUsers();
  }, []);

  const login = async (phone_number, password) => {
    try {
      const response = await axios.post(`${API_URL}/login`, {
        phone_number,
        password,
      });

      const { token, user, role } = response.data;

      setUser(user);
      setIsAuthenticated(true);

      if (role == "admin") {
        navigation.navigate("AdminDashboard");
        return;
      }

      navigation.navigate("Home");
    } catch (error) {
      alert("Wrong Phone Number or Password. Please Try Again");
    }
  };

  const register = async (
    full_name,
    phone_number,
    password,
    shop_name,
    shop_address,
    referral_code
  ) => {
    try {
      console.log(
        full_name,
        phone_number,
        password,
        shop_name,
        shop_address,
        referral_code
      );
      const config = {
        method: "post",
        url: `${API_URL}/register`,
        headers: {
          "Content-Type": "application/json",
        },
        data: JSON.stringify({
          full_name,
          phone_number,
          password,
          shop_name,
          shop_address,
          referral_code,
        }),
      };

      const response = await axios(config);

      const { user } = response.data;

      if (user) {
        // alert("Registration Successful");
        setUser(user);
        setIsAuthenticated(true);
        navigation.navigate("Home");
      }
    } catch (error) {
      console.log("Registration error:", error);
      alert("Please provide the right info and Try Again");
    }
  };

  //ALL USERS
  const getAllUsers = async () => {
    try {
      const response = await axios.get(`${API_URL}/all`);
      if (response) {
        //console.log("GET ALL USERS RESPONSE",response.data)
        setUsers(response.data);
        return response.data;
      }
    } catch (error) {
      console.error("Get All Users error:", error.message);
    }
  };



  //EDIT PROFILE

  const editProfile = async (UpdatedUser) => {
    try {
      const {
        userId,
        full_name,
        phone_number,
        shop_name,
        shop_address,
        status,
      } = UpdatedUser;

      const config = {
        method: "put",
        url: `${API_URL}/update/${userId}`,
        headers: {
          "Content-Type": "application/json",
        },
        data: JSON.stringify({
          full_name,
          phone_number,
          shop_name,
          shop_address,
          status,
        }),
      };

      const response = await axios(config);
      if (response.data.error) {
        alert(response.data.error);
        return;
      }

      // setUser(...user, full_name, phone_number, shop_name, shop_address);

      if (user) {
        alert("Profile Updated Successfully");
      } else {
        alert("Profile Update Failed Please Try Again");
      }
    } catch (error) {
      console.error("Profile Update error:", error.message);
    }
  };

  const signOut = async () => {
    setUser(undefined);
  };

  const getUserData = async (userId) => {
    try {
      const response = await axios.get(`${API_URL}/${userId}`);

      if (response) {
        setUser(response.data);
      } else {
        alert("Failed to fetch user data");
      }
    } catch (error) {
      console.error("Failed to fetch user data:", error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        users,
        login,
        register,
        signOut,
        editProfile,
        getUserData,
        isAuthenticated,
        loading,
        getAllUsers,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
}

export { AuthContext, AuthProvider, useAuth };
