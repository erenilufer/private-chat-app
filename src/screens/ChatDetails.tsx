import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import { useEffect, useRef, useState } from "react";
import { EvilIcons } from "@expo/vector-icons";
import { ScrollView, TextInput } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import "react-native-get-random-values";
import { useSelector } from "react-redux";
import { getDatabase, onValue, ref } from "firebase/database";
import { RootState } from "../redux/store";
import { NavigationState } from "@react-navigation/native";
import { sendMessage } from "../firebase/helpers";
import Message from "../components/Message/Message";
import { MessageState } from "../models/MessageModel";

type Props = {
  navigation: NavigationState;
  route: any;
};

const ChatDetails = (props: Props) => {
  const [messages, setMessages] = useState<MessageState[]>([]);
  const [text, setText] = useState<string>("");

  const user = useSelector((state: RootState) => state.auth.user);

  const { navigation, route } = props;
  const { id, name } = route.params.user.item;

  const scrollViewRef = useRef<any>();

  const _setChatID = (): string => {
    if (id > user.uid) {
      return id + user?.uid; //this is chat ID
    }
    return user?.uid + id;
  };
  const chatID = _setChatID();

  const scrollToEnd = (): void => {
    scrollViewRef.current?.scrollToEnd({ animated: true });
  };
  useEffect(() => {
    scrollToEnd;
  }, [messages]);

  navigation.setOptions({
    headerShown: true,
    headerTitle: () => (
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Image
          style={{ width: 30, height: 30, marginRight: 10, borderRadius: 30 }}
          source={{
            uri: "https://www.dergicilikokulu.com/wp-content/plugins/ultimate-member/assets/img/default_avatar.jpg",
          }}
        />
        <Text style={{ fontWeight: "bold" }}>{name}</Text>
      </View>
    ),

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

  useEffect(() => {
    const db = getDatabase();
    const chatRef = ref(db, "chats/" + _setChatID());

    onValue(chatRef, (snapshot) => {
      const data = snapshot.val();
      var array: any[] =
        data &&
        Object.keys(data).map(function (key) {
          return data[key];
        });

      setMessages(array);
    });
  }, []);

  const handleSend = () => {
    sendMessage(chatID, text, user?.uid, id);
    setText("");
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#475569" }}>
      <ScrollView
        style={{ flex: 1, paddingHorizontal: 15 }}
        ref={scrollViewRef}
        onContentSizeChange={() => scrollToEnd()}
      >
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
        {/*  */}
        {messages &&
          messages.map((item, index) => {
            return <Message item={item} index={index} />;
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
