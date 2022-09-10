import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import ChatList from "./src/screens/ChatList";
import ChatDetails from "./src/screens/ChatDetails";
import "./src/firebase/config";
import Login from "./src/screens/Login";
import { useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { auth } from "./src/firebase/config";
import { RootState } from "./src/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "./src/redux/slices/authSlice";
import Register from "./src/screens/Register";
import Profile from "./src/screens/Profile";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Stack = createStackNavigator();

interface Props {}
const AuthStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name="Login"
        component={Login}
      />
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name="Register"
        component={Register}
      />
    </Stack.Navigator>
  );
};
const StackNavigation = () => {
  const user = useSelector((state: RootState) => state.auth.user);

  const dispatch = useDispatch();
  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (firebaseUser) => {
      if (!user) {
        dispatch(setUser(firebaseUser));
        AsyncStorage.setItem("@user", JSON.stringify(firebaseUser));
      } else {
      }
    });

    const retrieveUser = async () => {
      try {
        const value = await AsyncStorage.getItem("@user");
        if (value !== null) {
          dispatch(setUser(JSON.parse(value)));
        }
      } catch (error) {}
    };
    retrieveUser();
  }, []);

  console.log(user);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {!user ? (
          <>
            <Stack.Screen
              options={{
                headerShown: false,
              }}
              name="Login"
              component={AuthStack}
            />
          </>
        ) : (
          <>
            <Stack.Screen
              options={{
                headerShown: false,
              }}
              name="ChatList"
              component={ChatList}
            />

            <Stack.Screen name="Chat Details" component={ChatDetails} />
            <Stack.Screen
              options={{
                headerShown: false,
              }}
              name="Profile"
              component={Profile}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
const Router = () => {
  return <StackNavigation />;
};

export default Router;
