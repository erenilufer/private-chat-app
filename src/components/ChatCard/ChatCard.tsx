import { MaterialIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity, Dimensions } from "react-native";

interface Props {
  navigation: any;
  item: any;
}

const ChatCard = (props: Props) => {
  const [selectedChats, setSelectedChats] = useState([]);
  console.log(selectedChats);

  return (
    <TouchableOpacity
      key={props.item.item.id}
      style={{
        paddingVertical: 15,
        paddingHorizontal: 10,
        borderBottomWidth: 0.2,
        width: Dimensions.get("screen").width,
      }}
      onLongPress={() => {
        setSelectedChats([...selectedChats, props.item.item]);
      }}
      onPress={() =>
        props.navigation.navigate("Chat Details", {
          user: {
            name: props.item.item.name,
            messages: props.item.item.messages,
          },
        })
      }
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <View style={{ flexDirection: "row" }}>
          <Image
            style={{ width: 60, height: 60, borderRadius: 30 }}
            source={require("../../assets/2.jpg")}
          />
          <View style={{ marginLeft: 10 }}>
            <View
              style={{
                flexDirection: "row",
              }}
            >
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: "bold",
                  marginBottom: 5,
                }}
              >
                {props.item.item.name}
              </Text>
            </View>
            <Text style={{ fontWeight: "500", color: "#64748b" }}>
              {
                props.item.item.messages[props.item.item.messages.length - 1]
                  .content
              }
            </Text>
          </View>
        </View>
        <View>
          <Text style={{ fontWeight: "500", color: "#64748b" }}>16.53</Text>
          <MaterialIcons
            name="keyboard-arrow-right"
            size={32}
            color="#64748b"
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ChatCard;
