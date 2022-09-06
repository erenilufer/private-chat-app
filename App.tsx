import { StatusBar } from "expo-status-bar";
import { Button, StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import ChatList from "./src/screens/ChatList";
import ChatDetails from "./src/screens/ChatDetails";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import "./src/firebase/config";
import Calls from "./src/screens/Calls";
import { Ionicons } from "@expo/vector-icons";
import Login from "./src/screens/Login";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./src/firebase/config";
import { store } from "./src/redux/store";
import { Provider, useDispatch, useSelector } from "react-redux";
import { setUser } from "./src/redux/slices/authSlice";
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
import { AntDesign } from "@expo/vector-icons";
import Contacts from "./src/screens/Contacts";

const CustomTab = ({ navigation }) => {
  return (
    <Tab.Navigator
      screenOptions={{ headerShown: false, tabBarShowLabel: false }}
    >
      <Tab.Screen
        options={{
          tabBarIcon: () => (
            <Ionicons name="chatbox-outline" size={24} color="#0ea5e9" />
          ),
        }}
        name="Chatlist"
        component={ChatList}
      />
      <Tab.Screen
        options={{
          tabBarIcon: () => (
            <AntDesign name="contacts" size={24} color="#0ea5e9" />
          ),
        }}
        name="Contacts"
        component={Contacts}
      />
    </Tab.Navigator>
  );
};
const StackNavigation = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User

        dispatch(setUser(user));
        // ...
      } else {
        // User is signed out
        // ...
      }
    });
  });
  const user = useSelector((state) => state.auth.user);
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {!user ? (
          <Stack.Screen
            options={{
              headerShown: false,
            }}
            name="Login"
            component={Login}
          />
        ) : (
          <>
            <Stack.Screen
              options={{
                headerShown: false,
              }}
              name="Main"
              component={CustomTab}
            />
            <Stack.Screen name="Chat Details" component={ChatDetails} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default function App() {
  return (
    <Provider store={store}>
      <StackNavigation />
    </Provider>
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
