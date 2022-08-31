import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Dimensions,
  SafeAreaView,
  Image,
  RefreshControl,
  Button,
  Pressable,
  FlatList,
} from "react-native";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import { FontAwesome5, MaterialIcons } from "@expo/vector-icons";
import data from "../json/data.json";
import ChatCard from "../components/ChatCard/ChatCard";

interface Props {}

const ChatList = ({ navigation }) => {
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
    }, 3000);
  };
  const listHeader = () => {
    return (
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          padding: 10,
          borderBottomWidth: 0.3,
        }}
      >
        <Pressable>
          <Text style={{ color: "#0284c7" }}>Contacts</Text>
        </Pressable>
        <Pressable>
          <Text style={{ color: "#0284c7" }}>Create Group</Text>
        </Pressable>
      </View>
    );
  };
  const renderItem = (item) => {
    return <ChatCard navigation={navigation} item={item} />;
  };
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff", paddingTop: 30 }}>
      <View style={{ marginHorizontal: 10, marginBottom: 10 }}>
        <Text style={{ fontSize: 36, fontWeight: "bold", marginBottom: 10 }}>
          Chats
        </Text>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <FontAwesome5
            style={{ position: "absolute", left: 10 }}
            name="search"
            size={16}
            color="#c7c7c7"
          />
          <TextInput
            placeholder="Search"
            style={{
              padding: 10,
              backgroundColor: "#E9E9E9",
              borderRadius: 15,
              flex: 1,
              zIndex: -2,
              paddingLeft: 32,
            }}
          />
        </View>
      </View>
      <FlatList
        refreshing={isRefreshing}
        refreshControl={
          <RefreshControl
            onRefresh={() => handleRefresh()}
            refreshing={isRefreshing}
          />
        }
        ListHeaderComponent={() => listHeader()}
        data={data.chats}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </SafeAreaView>
  );
};

export default ChatList;
