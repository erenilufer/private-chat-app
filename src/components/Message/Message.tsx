import { FontAwesome5 } from "@expo/vector-icons";
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useSelector } from "react-redux";
import { MessageState } from "../../models/MessageModel";
import { RootState } from "../../redux/store";

interface Props {
  item: MessageState;
}

const Message = (props: Props) => {
  const user = useSelector((state: RootState) => state.auth.user);
  const { item } = props;

  return (
    <TouchableOpacity
      style={
        item.senderID === user?.uid ? styles.sentStyle : styles.receivedStyle
      }
    >
      <Text style={{ marginRight: 5, maxWidth: "60%" }}>{item.content}</Text>
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
          {new Date(item.time).getHours() < 10
            ? `0${new Date(item.time).getHours()}`
            : new Date(item.time).getHours()}
          :
          {new Date(item.time).getMinutes() < 10
            ? `0${new Date(item.time).getMinutes()}`
            : new Date(item.time).getMinutes()}
        </Text>
        <FontAwesome5
          style={{ alignSelf: "flex-end" }}
          name="check"
          size={10}
          color="#94a3b8"
        />
      </View>
    </TouchableOpacity>
  );
};

export default Message;
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
