import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  RefreshControl,
  Pressable,
  FlatList,
  StyleSheet,
} from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { FontAwesome5 } from "@expo/vector-icons";
import ChatCard from "../components/ChatCard/ChatCard";
import { collection, getDocs, query } from "firebase/firestore";
import { firestore } from "../firebase/config";
import { getAuth, signOut, User } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../redux/store";
import { User as FirebaseUser } from "firebase/auth";
import { NavigationState } from "@react-navigation/native";
import { setUser } from "../redux/slices/authSlice";

interface Props {
  navigation: NavigationState;
}

const ChatList = (props: Props) => {
  const { navigation } = props;
  const dispatch = useDispatch<AppDispatch>();

  const user = useSelector((state) => state.auth.user);

  const [isRefreshing, setIsRefreshing] = useState(false);
  const [data, setData] = useState<User[]>([]);

  const getData = async () => {
    const q = query(collection(firestore, "users"));
    const snap = await getDocs(q);
    var fetchedData: FirebaseUser[] = [];

    snap.forEach((item) => {
      if (item.data().id !== user.uid) fetchedData.push(item.data());
    });
    setData(fetchedData);
  };
  const logoutUser = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        dispatch(setUser(null));
      })
      .catch((error) => {
        // An error happened.
      });
  };
  useEffect(() => {
    getData();
  }, []);
  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      getData();
      setIsRefreshing(false);
    }, 3000);
  };
  const listHeader = () => {
    return (
      <View style={styles.headerContainer}>
        <Pressable>
          <Text style={styles.headerText}>Contacts</Text>
        </Pressable>
        <Pressable>
          <Text style={styles.headerText}>Create Group</Text>
        </Pressable>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ marginHorizontal: 10, marginBottom: 10 }}>
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
          <Pressable style={styles.logoutButton} onPress={() => logoutUser()}>
            <Text style={{ color: "#fff", fontWeight: "bold" }}>Logout</Text>
          </Pressable>
        </View>
        <View style={styles.inputContainer}>
          <FontAwesome5
            style={{ position: "absolute", left: 10 }}
            name="search"
            size={16}
            color="#c7c7c7"
          />
          <TextInput placeholder="Search" style={styles.searchInput} />
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
        data={data}
        renderItem={(item) => <ChatCard navigation={navigation} item={item} />}
        keyExtractor={(item) => item.uid}
      />
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
