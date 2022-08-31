import { StatusBar } from "expo-status-bar";
import { Button, StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import ChatList from "./src/pages/ChatList";
import ChatDetails from "./src/pages/ChatDetails";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import "./src/firebase/config";
import Calls from "./src/pages/Calls";
import { Ionicons } from "@expo/vector-icons";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const CustomTab = () => {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false,tabBarShowLabel:false }}>
      <Tab.Screen
        options={{
          tabBarIcon: () => (
            <Ionicons name="chatbox-outline" size={24} color="#0ea5e9" />
          ),
        }}
        name="Chatlist"
        component={ChatList}
      />
      <Tab.Screen options={{tabBarIcon:()=><Ionicons name="call-outline" size={24} color="#0ea5e9" />}} name="Calls" component={Calls} />
    </Tab.Navigator>
  );
};
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          options={{
            headerShown: false,
        
          }}
          name="Main"
          component={CustomTab}
        />
        <Stack.Screen name="Chat Details" component={ChatDetails} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
