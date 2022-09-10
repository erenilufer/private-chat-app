import { MaterialIcons } from "@expo/vector-icons";
import { getAuth, updateProfile } from "firebase/auth";
import { doc, updateDoc } from "firebase/firestore";
import { getDownloadURL, getStorage, ref } from "firebase/storage";
import { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { firestore } from "../../firebase/config";

interface Props {
  navigation: any;
  item: any;
}

const ChatCard = (props: Props) => {
  const { navigation, item } = props;
  const user = useSelector((state: RootState) => state.auth.user);
  console.log(item);

  const [imageUrl, setImageUrl] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getImage = async () => {
      const storage = getStorage();
      const storageRef = ref(storage, item.item.id);
      await getDownloadURL(storageRef).then((res) => {
        setImageUrl(res);
      });
    };
    getImage();
  }, [imageUrl]);
  console.log(user);

  return (
    <TouchableOpacity
      key={props.item.item.id}
      style={{
        paddingVertical: 15,
        paddingHorizontal: 10,
        borderBottomWidth: 0.2,
        borderBottomColor: "grey",
        width: Dimensions.get("screen").width,
      }}
      onPress={() => navigation.navigate("Chat Details", { user: item })}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <View style={{ flexDirection: "row" }}>
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              borderColor: "#64748b",
            }}
          >
            {loading && (
              <ActivityIndicator
                style={{ position: "absolute", left: 15.5 }}
                size="small"
                color="#7e7e7e"
              />
            )}
            <Image
              onLoadStart={() => setLoading(true)}
              onLoadEnd={() => setLoading(false)}
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
                  ? { uri: item.item.photoURL }
                  : require("../../assets/profile-photo.png")
              }
            />
          </View>
          <View style={{ marginLeft: 10, justifyContent: "center" }}>
            <Text
              style={{
                fontSize: 16,
                fontWeight: "bold",
                marginBottom: 5,
              }}
            >
              {item.item.name}
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
