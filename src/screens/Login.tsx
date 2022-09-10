import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from "react-native";

import { TextInput } from "react-native-gesture-handler";
import { NavigationState } from "@react-navigation/native";
import { loginUser } from "../firebase/helpers";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/config";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { setUser } from "../redux/slices/authSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";
interface Props {
  navigation: NavigationState;
}

const Login = (props: Props) => {
  const dispatch = useDispatch<AppDispatch>();
  const { navigation } = props;
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    await signInWithEmailAndPassword(auth, username, password).then((res) => {
      dispatch(setUser(res.user));
      AsyncStorage.setItem("@user", JSON.stringify(res.user));
    });
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#075985" }}>
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text style={{ fontSize: 32, color: "#fff", fontWeight: "bold" }}>
          Chat App
        </Text>
      </View>

      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : ""}>
        <View
          style={{
            backgroundColor: "white",
            width: "100%",
            bottom: 0,
            padding: 20,
            borderTopRightRadius: 20,
            borderTopLeftRadius: 20,
          }}
        >
          <Text
            style={{
              fontSize: 24,
              fontWeight: "bold",
              marginBottom: 15,
              textAlign: "center",
            }}
          >
            Login
          </Text>
          <Text style={{ fontSize: 16, color: "gray", marginBottom: 10 }}>
            Email
          </Text>
          <TextInput
            placeholder="email"
            style={styles.searchInput}
            value={username}
            onChangeText={(text) => setUsername(text)}
          />
          <Text style={{ fontSize: 16, color: "gray", marginBottom: 10 }}>
            Password
          </Text>
          <TextInput
            placeholder="password"
            secureTextEntry={true}
            style={styles.searchInput}
            value={password}
            onChangeText={(text) => setPassword(text)}
          />
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              paddingVertical: 10,
            }}
          >
            <TouchableOpacity
              style={{
                padding: 20,
                backgroundColor: "#0284c7",
                alignSelf: "center",
                borderRadius: 10,
                marginRight: 10,
              }}
              onPress={() => handleLogin()}
            >
              <Text style={{ color: "white", fontWeight: "bold" }}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                padding: 20,
                alignSelf: "center",
                borderRadius: 10,
              }}
              onPress={() => navigation.navigate("Register")}
            >
              <Text style={{ color: "#0284c7", fontWeight: "bold" }}>
                Register
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

export default Login;
const styles = StyleSheet.create({
  searchInput: {
    padding: 10,
    backgroundColor: "#E9E9E9",
    borderRadius: 10,
    marginBottom: 20,
    color: "#000",
  },
});
