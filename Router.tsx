import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import ChatList from "./src/screens/ChatList";
import ChatDetails from "./src/screens/ChatDetails";
import "./src/firebase/config";
import Login from "./src/screens/Login";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./src/firebase/config";
import { RootState } from "./src/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "./src/redux/slices/authSlice";
import Register from "./src/screens/Register";
import Profile from "./src/screens/Profile";

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
  const dispatch = useDispatch();
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(setUser(user));
      } else {
      }
    });
  });

  const user = useSelector((state: RootState) => state.auth.user);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {!user ? (
          <Stack.Screen
            options={{
              headerShown: false,
            }}
            name="Login"
            component={AuthStack}
          />
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
