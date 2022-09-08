import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  RefreshControl,
  Pressable,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  Image,
} from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { FontAwesome5 } from "@expo/vector-icons";
import ChatCard from "../components/ChatCard/ChatCard";
import { collection, getDocs, query } from "firebase/firestore";
import { firestore } from "../firebase/config";
import { getAuth, signOut } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { NavigationState } from "@react-navigation/native";
import { setError, setUser } from "../redux/slices/authSlice";
import { UserState } from "../models/UserModel";

interface Props {
  navigation: NavigationState;
}

const ChatList = (props: Props) => {
  const { navigation } = props;
  const dispatch = useDispatch<AppDispatch>();

  const user = useSelector((state: RootState) => state.auth.user);

  const [isRefreshing, setIsRefreshing] = useState(false);
  const [data, setData] = useState<UserState[] | null>(null);
  const [filteredData, setFilteredData] = useState<UserState[] | null>(null);

  const [search, setSearch] = useState("");
  console.log(data);

  useEffect(() => {
    getData();
  }, []);
  useEffect(() => {
    setFilteredData(
      data?.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search]);

  const getData = async () => {
    const q = query(collection(firestore, "users"));
    const snap = await getDocs(q);
    var fetchedData: UserState[] = [];

    snap.forEach((item) => {
      if (item.data().id !== user.uid) fetchedData.push(item.data());
    });
    setData(fetchedData);
    setFilteredData(fetchedData);
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      getData();
      setIsRefreshing(false);
      setSearch("");
    }, 3000);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ marginHorizontal: 10, marginBottom: 5 }}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text style={{ fontSize: 36, fontWeight: "bold", marginBottom: 10 }}>
            Chats
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
            <Image
              style={{
                width: 50,
                height: 50,
                marginRight: 10,
                borderRadius: 100,
                borderWidth: 2,
                borderColor: "#64748b",
                alignSelf: "center",
              }}
              source={
                user?.photoURL
                  ? { uri: user?.photoURL }
                  : require("../assets/profile-photo.png")
              }
            />
          </TouchableOpacity>
        </View>
        <View style={styles.inputContainer}>
          <FontAwesome5
            style={{ position: "absolute", left: 10 }}
            name="search"
            size={16}
            color="#c7c7c7"
          />
          <TextInput
            value={search}
            onChangeText={(text) => setSearch(text)}
            placeholder="Search"
            style={styles.searchInput}
          />
        </View>
      </View>
      {filteredData && filteredData.length != 0 ? (
        <FlatList
          refreshing={isRefreshing}
          refreshControl={
            <RefreshControl
              onRefresh={() => handleRefresh()}
              refreshing={isRefreshing}
            />
          }
          ListHeaderComponent={() => (
            <View style={{ padding: 10, borderBottomWidth: 0.2 }}></View>
          )}
          data={filteredData}
          renderItem={(item) => (
            <ChatCard navigation={navigation} item={item} />
          )}
          keyExtractor={(item) => item.id}
        />
      ) : filteredData?.length == 0 ? (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Text
            style={{
              fontSize: 16,
              textAlign: "center",
              fontWeight: "bold",
              color: "#64748b",
            }}
          >
            No Users Found
          </Text>
        </View>
      ) : (
        <ActivityIndicator />
      )}
    </SafeAreaView>
  );
};

export default ChatList;
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", paddingTop: 30 },

  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    borderBottomWidth: 0.3,
  },

  headerText: { color: "#0284c7" },
  logoutButton: {
    marginLeft: 10,
    padding: 15,
    backgroundColor: "#0369a1",
    borderRadius: 10,
  },

  inputContainer: { flexDirection: "row", alignItems: "center" },

  searchInput: {
    padding: 10,
    backgroundColor: "#E9E9E9",
    borderRadius: 15,
    flex: 1,
    zIndex: -2,
    paddingLeft: 32,
  },
});
