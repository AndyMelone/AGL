import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../screens/Home";
import Settings from "../screens/Settings";
import QrCode from "../screens/QRcode";
import { AntDesign } from "@expo/vector-icons";
import { Text, View, ViewStyle } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Tab = createBottomTabNavigator();

const Stack = createNativeStackNavigator();


const screenOptions = {
  tabBarShowLabel: false,
  headerShown: false,
  tabBarStyle: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    elevation: 0,
    height: 90,
    backgroundColor: "#ffffff",
  } as ViewStyle,
};

const TabNavigator = () => (
  <Tab.Navigator screenOptions={screenOptions}>
    <Tab.Screen
      name="Home"
      component={Home}
      options={{
        tabBarIcon: ({ focused }) => (
          <View style={{ alignItems: "center", justifyContent: "center" }}>
            <AntDesign
              name="home"
              size={24}
              color={focused ? "#307BF6" : "black"}
            />
            <Text
              style={{ color: focused ? "#307BF6" : "#748c94", fontSize: 12 }}
            >
              Accueil
            </Text>
          </View>
        ),
      }}
    />

    <Tab.Screen
      name="En attente"
      component={QrCode}
      options={{
        tabBarIcon: ({ focused }) => (
          <View style={{ alignItems: "center", justifyContent: "center" }}>
            <AntDesign
              name="qrcode"
              size={24}
              color={focused ? "#307BF6" : "black"}
            />
            <Text
              style={{ color: focused ? "#307BF6" : "#748c94", fontSize: 12 }}
            >
              Scanner
            </Text>
          </View>
        ),
      }}
    />
    <Tab.Screen
      name="Paramètres"
      component={Settings}
      options={{
        tabBarIcon: ({ focused }) => (
          <View style={{ alignItems: "center", justifyContent: "center" }}>
            <AntDesign
              name="setting"
              size={24}
              color={focused ? "#307BF6" : "black"}
            />
            <Text
              style={{ color: focused ? "#307BF6" : "#748c94", fontSize: 12 }}
            >
              Paramètres
            </Text>
          </View>
        ),
      }}
    />
  </Tab.Navigator>
);

export default TabNavigator;
