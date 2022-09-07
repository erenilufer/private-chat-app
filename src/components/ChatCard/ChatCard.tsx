import { MaterialIcons } from "@expo/vector-icons";
import { View, Text, Image, TouchableOpacity, Dimensions } from "react-native";

interface Props {
  navigation: any;
  item: any;
}

const ChatCard = (props: Props) => {
  const { navigation, item } = props;
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
          <Image
            style={{ width: 60, height: 60, borderRadius: 30 }}
            source={require("../../assets/profile-photo.png")}
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
                {item.item.name}
              </Text>
            </View>
            <Text style={{ fontWeight: "500", color: "#64748b" }}>
              Start a Conversation
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
