import React, { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import {
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native-gesture-handler";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { Ionicons } from "@expo/vector-icons";
import { NavigationState } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import { app, auth } from "../firebase/config";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { async } from "@firebase/util";
import { getAuth, signOut, updateProfile } from "firebase/auth";
import { setError, setUser } from "../redux/slices/authSlice";

interface Props {
  navigation: NavigationState;
}

const Profile = (props: Props) => {
  const dispatch = useDispatch();
  useEffect(() => {
    const getImage = async () => {
      const storage = getStorage();
      const storageRef = ref(storage, user?.uid);
      await getDownloadURL(storageRef).then((res) => {
        updateProfile(auth.currentUser, { photoURL: res });
      });
    };
    getImage();
  });
  const logoutUser = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        dispatch(setUser(null));
      })
      .catch((error) => {
        dispatch(setError(error));
      });
  };
  const { navigation } = props;
  const user = useSelector((state: RootState) => state.auth.user);
  console.log(user);
  const handleImagePicker = async () => {
    const result = await ImagePicker.launchImageLibraryAsync();
    //let result = await ImagePicker.launchImageLibraryAsync();

    if (!result.cancelled) {
      uploadImage(result.uri, "test-image")
        .then(() => {
          console.log("success");
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };
  const uploadImage = async (uri, imageName) => {
    const response = await fetch(uri);
    const blob = await response.blob();

    const storage = getStorage();
    const storageRef = ref(storage, user?.uid);
    uploadBytes(storageRef, blob).then((snapshot) => {
      console.log("Uploaded a blob or file!");
    });
  };
  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          height: 200,
          backgroundColor: "#0c4a6e",
          paddingTop: 50,
          paddingHorizontal: 20,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems:"flex-start"
        }}
      >
        <TouchableOpacity
          onPress={() => navigation.navigate("ChatList")}
          style={{
            padding: 10,
            backgroundColor: "#eae5e5",
            alignSelf: "flex-start",
            borderRadius: 10,
          }}
        >
          <Ionicons name="arrow-back" size={24} color="#0c4a6e|" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.logoutButton}
          onPress={() => logoutUser()}
        >
          <Text style={{ color: "#fff", fontWeight: "bold" }}>Logout</Text>
        </TouchableOpacity>
      </View>
      <View style={{ marginTop: -120 }}>
        <View style={{ flexDirection: "row", justifyContent: "center" }}>
          <TouchableOpacity
            style={{
              width: 200,
              height: 200,

              borderRadius: 100,

              alignItems: "center",
              justifyContent: "center",
            }}
            onPress={() => handleImagePicker()}
          >
            <Image
              style={{
                width: 200,
                height: 200,
                borderRadius: 100,
              }}
              source={
                user?.photoURL
                  ? { uri: user.photoURL }
                  : require("../assets/profile-photo.png")
              }
            />
          </TouchableOpacity>
        </View>

        <View
          style={{
            marginVertical: 10,

            marginHorizontal: 10,
            borderRadius: 20,
            padding: 20,
            backgroundColor: "#fff",
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 7,
            },
            shadowOpacity: 0.41,
            shadowRadius: 9.11,

            elevation: 14,
          }}
        >
          <Text style={{ fontSize: 12, color: "#64748b", marginBottom: 5 }}>
            Name
          </Text>

          <Text style={{ fontSize: 16, fontWeight: "bold", color: "#334155" }}>
            {user?.displayName}
          </Text>
        </View>
        <View
          style={{
            marginBottom: 10,
            marginHorizontal: 10,
            borderRadius: 20,
            padding: 20,
            backgroundColor: "#fff",
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 7,
            },
            shadowOpacity: 0.41,
            shadowRadius: 9.11,

            elevation: 14,
          }}
        >
          <Text style={{ fontSize: 12, color: "#64748b", marginBottom: 5 }}>
            Email
          </Text>
          <Text style={{ fontSize: 16, fontWeight: "bold", color: "#334155" }}>
            {user?.email}
          </Text>
        </View>
        <View
          style={{
            marginHorizontal: 10,
            borderRadius: 20,
            padding: 20,
            backgroundColor: "#fff",
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 7,
            },
            shadowOpacity: 0.41,
            shadowRadius: 9.11,

            elevation: 14,
          }}
        >
          <Text style={{ fontSize: 12, color: "#64748b", marginBottom: 5 }}>
            Last Login
          </Text>
          <Text style={{ fontSize: 16, fontWeight: "bold", color: "#334155" }}>
            {user?.metadata.lastSignInTime}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default Profile;
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
    backgroundColor: "#881337",
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
