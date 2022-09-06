import React, { useState } from "react";
import { View, Text, SafeAreaView, Pressable, StyleSheet } from "react-native";

import { TextInput } from "react-native-gesture-handler";
import { NavigationState } from "@react-navigation/native";
import { loginUser, registerUser } from "../firebase/helpers";
/* interface Props {
  navigation: NavigationState;
} */

const Login = () => {
  /*   const { navigation } = props;  */
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const handleLogin = async () => {
    loginUser(username, password);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Text>Login</Text>
      <Pressable onPress={() => handleLogin()}>
        <Text>sdaasa</Text>
      </Pressable>
      <TextInput placeholder="email" style={styles.searchInput} value={username} onChangeText={(text) => setUsername(text)} />
      <TextInput placeholder="password" style={styles.searchInput} value={password} onChangeText={(text) => setPassword(text)} />
      <Pressable onPress={() => handleLogin()}>
        <Text>Login</Text>
      </Pressable>
    </SafeAreaView>
  );
};

export default Login;
const styles=StyleSheet.create({
  searchInput: {
    padding: 10,
    backgroundColor: "#E9E9E9",
    borderRadius: 15,
    flex: 1,
    zIndex: -2,
    paddingLeft: 32,
  },
})
