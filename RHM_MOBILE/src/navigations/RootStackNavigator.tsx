import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "../screens/Login";
import MainStackNavigator from "./MainStackNavigator";
import useAuthStore from "../store/store_auth";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const RootStackNavigator = () => {
  const { isAuthenticated } = useAuthStore(); 
  return (
    <Stack.Navigator>
      {
        isAuthenticated ? (
          <Stack.Screen
            name="Main"
            component={MainStackNavigator}
            options={{ headerShown: false }}
          />
        ) : (
          <Stack.Screen
            name="login"
            component={Login}
            options={{ headerShown: false }}
          />
        )
      }
    </Stack.Navigator>
  );
};

export default RootStackNavigator;
