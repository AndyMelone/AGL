import React from "react";
import {
  createNativeStackNavigator,
  NativeStackNavigationOptions,
} from "@react-navigation/native-stack";
import Login from "../screens/Login";
import TabNavigator from "./TabNavigator";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import QrCode from "../screens/QRcode";

type RootStackParamList = {
  Acceuil: undefined;
  Login: undefined;
  ScanQr: undefined;

};

const Stack = createNativeStackNavigator<RootStackParamList>();

const defaultScreenOptions = ({
  navigation,
}: {
  navigation: any;
}): NativeStackNavigationOptions => ({
  headerShown: true,
  headerTitleStyle: {
    fontWeight: "600",
  },
  headerLeft: () => (
    <TouchableOpacity onPress={() => navigation.goBack()}>
      <Ionicons name="arrow-back-circle-outline" size={32} color="black" />
    </TouchableOpacity>
  ),
  headerRight: () => (
    <TouchableOpacity onPress={() => navigation.navigate("Notifications")}>
      <Ionicons name="notifications-outline" size={28} color="black" />
    </TouchableOpacity>
  ),
});

const MainStackNavigator = () => (
  <Stack.Navigator screenOptions={defaultScreenOptions}>
    <Stack.Screen
      name="Acceuil"
      component={TabNavigator}
      options={{ headerShown: false }}
    />

    <Stack.Screen
      name="ScanQr"
      component={QrCode}
      options={{ headerShown: false }}
    />

    <Stack.Screen
      name="Login"
      component={Login}
      options={{ headerShown: false }}
    />
  </Stack.Navigator>
);

export default MainStackNavigator;
