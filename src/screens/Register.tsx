import { View, Text, SafeAreaView, TextInput, StyleSheet } from "react-native";
import React, { useState } from "react";
import { registerUser } from "../firebase/helpers";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";

type Props = {};

const Register = (props: Props) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleRegister = async () => {
    registerUser(email, password, name);
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#075985" }}>
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text style={{ fontSize: 32, color: "#fff", fontWeight: "bold" }}>
          Chat App
        </Text>
      </View>

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
          Register
        </Text>
        <Text style={{ fontSize: 16, color: "gray", marginBottom: 10 }}>
          Full Name
        </Text>
        <TextInput
          placeholder="John Doe"
          style={styles.searchInput}
          value={name}
          onChangeText={(text) => setName(text)}
        />
        <Text style={{ fontSize: 16, color: "gray", marginBottom: 10 }}>
          Email
        </Text>
        <TextInput
          placeholder="johndoe@outlook.com"
          style={styles.searchInput}
          value={email}
          onChangeText={(text) => setEmail(text)}
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
          <TouchableWithoutFeedback
            onPress={() => handleRegister()}
            style={{
              padding: 20,
              backgroundColor: "#0284c7",
              alignSelf: "center",
              borderRadius: 10,
              marginRight: 10,
            }}
          >
            <Text style={{ color: "white", fontWeight: "bold" }}>Register</Text>
          </TouchableWithoutFeedback>
        </View>
      </View>
    </View>
  );
};
export default Register;

const styles = StyleSheet.create({
  searchInput: {
    padding: 10,
    backgroundColor: "#E9E9E9",
    borderRadius: 10,
    marginBottom: 20,
    color: "#000",
  },
});
