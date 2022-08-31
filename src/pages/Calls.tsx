import React, { useEffect } from "react";
import { View, Text, SafeAreaView, Pressable } from "react-native";
import { getDatabase, ref, onValue, set } from "firebase/database";
import { TextInput } from "react-native-gesture-handler";
import { FontAwesome5 } from "@expo/vector-icons";

interface Props {}

const Calls = (props: Props) => {
  function storeHighScore(userId, score) {
    const db = getDatabase();
    const reference = ref(db, "users/" + userId);
    set(reference, {
      highscore: score,
    });
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff", paddingTop: 30 }}>
      <View style={{ marginHorizontal: 10, marginBottom: 10 }}>
        <Text style={{ fontSize: 36, fontWeight: "bold", marginBottom: 10 }}>
          Calls
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
    </SafeAreaView>
  );
};

export default Calls;
