import {
  View,
  Text,
  SafeAreaView,
  Button,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
} from "react-native";
import React, { useEffect, useState } from "react";
import { EvilIcons } from "@expo/vector-icons";
import {
  ScrollView,
  TextInput,
  TouchableWithoutFeedback,
} from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import io from "socket.io-client";

type Props = {};

const ChatDetails = ({ navigation, route }) => {
  const socket = io("http://localhost:3000/");
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [lastPong, setLastPong] = useState(null);
  useEffect(() => {
    socket.on("connect", () => {
      setIsConnected(true);
    });

    socket.on("disconnect", () => {
      setIsConnected(false);
    });
    return () => {
      socket.off("connect");
      socket.off("disconnect");
    };
  }, [socket]);
  const [messages, setMessages] = useState(route.params.user.messages);
  const [text, setText] = useState("");

  navigation.setOptions({
    headerShown: true,
    title: route.params.user.name,
    headerLeft: () => (
      <EvilIcons
        onPress={() => navigation.goBack()}
        name="chevron-left"
        size={48}
        color="black"
      />
    ),
    headerBackTitleVisible: false,
  });
  const handleSend = () => {
    if (text !== "") {
      setMessages([
        ...messages,
        { status: "sent", content: text, time: "17.32" },
      ]);
      setText("");
    }
  };
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#475569" }}>
      <ScrollView style={{ flex: 1, paddingHorizontal: 15 }}>
        <TouchableOpacity
          activeOpacity={0.3}
          style={{
            padding: 10,
            backgroundColor: "#93c5fd",
            alignSelf: "center",
            width: "45%",
            borderRadius: 15,
            marginVertical: 10,
          }}
        >
          <Text style={{ color: "#000", textAlign: "center" }}>Today</Text>
        </TouchableOpacity>
        {messages.map((item, index) => {
          return (
            <TouchableOpacity
              key={index}
              style={
                item.status === "sent" ? styles.sentStyle : styles.receivedStyle
              }
            >
              <Text style={{ marginRight: 5, maxWidth: "60%" }}>
                {item.content}
              </Text>
              <View style={{ flexDirection: "row" }}>
                <Text
                  style={{
                    alignSelf: "flex-end",
                    fontSize: 10,
                    fontWeight: "500",
                    color: "#64748b",
                    marginRight: 3,
                  }}
                >
                  {new Date().getHours() < 10
                    ? `0${new Date().getHours()}`
                    : new Date().getHours()}
                  :
                  {new Date().getMinutes() < 10
                    ? `0${new Date().getMinutes()}`
                    : new Date().getMinutes()}
                </Text>
                {/*   <FontAwesome5
                style={{ alignSelf: "flex-end" }}
                name="check-double"
                size={10}
                color="#06b6d4"
              /> */}
                <FontAwesome5
                  style={{ alignSelf: "flex-end" }}
                  name="check"
                  size={10}
                  color="#94a3b8"
                />
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginHorizontal: 10,
        }}
      >
        <TextInput
          onChangeText={(text) => setText(text)}
          value={text}
          placeholder="Type"
          style={{
            padding: 10,
            backgroundColor: "#E9E9E9",
            marginVertical: 15,
            marginRight: 5,
            borderRadius: 10,
            flex: 1,
          }}
        />

        <TouchableOpacity
          onPress={() => handleSend()}
          style={{
            width: 50,
            height: 50,
            borderRadius: 30,
            backgroundColor: "#028376",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {text === "" ? (
            <FontAwesome5 name="microphone" size={24} color="#fff" />
          ) : (
            <Ionicons name="send" size={24} color="#fff" />
          )}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default ChatDetails;
const styles = StyleSheet.create({
  sentStyle: {
    flexDirection: "row",
    paddingHorizontal: 10,
    paddingVertical: 6,
    backgroundColor: "#DBF8C6",
    marginVertical: 5,
    alignSelf: "flex-end",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.36,
    shadowRadius: 6.68,

    elevation: 11,
  },
  receivedStyle: {
    alignSelf: "flex-start",
    backgroundColor: "#ffffff",
    flexDirection: "row",
    paddingHorizontal: 10,
    paddingVertical: 6,

    marginVertical: 5,

    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.36,
    shadowRadius: 6.68,

    elevation: 11,
  },
});
