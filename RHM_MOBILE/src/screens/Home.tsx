import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import tw from "twrnc";
import { NavigationProp } from "@react-navigation/native";
import useAuthStore from "../store/store_auth";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Ionicons from "@expo/vector-icons/Ionicons";
import EvilIcons from "@expo/vector-icons/EvilIcons";
import AntDesign from "@expo/vector-icons/AntDesign";
import capitalizeFirstLetter from "../helpers/capitalizeFirstLetter";

const Home = ({ navigation }: { navigation: NavigationProp<any> }) => {

  
  const { user } = useAuthStore();
  const [date, setDate] = useState(
    new Date().toLocaleDateString("fr-FR", {
      weekday: "short",
      day: "numeric",
      month: "short",
      year: "numeric", 
    })
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setDate(
        new Date().toLocaleDateString("fr-FR", {
          weekday: "short",
          day: "numeric",
          month: "short",
          year: "numeric",
        })
      );
    }, 1000);

    return () => clearInterval(interval);
  });

  return (
    <View style={tw`bg-[#ecf1fd] flex-1 `}>
      <SafeAreaView style={tw`mx-5 mt-4`}>
        <View style={tw`mt-8`}>
          <Text style={tw`text-lg `}>{date}</Text>
          <View style={tw`flex-row items-center justify-between`}>
            <View>
              <View style={tw`flex-row items-center gap-2 `}>
                <Text style={tw`text-2xl font-medium `}>
                  {capitalizeFirstLetter(user.firstName)} {capitalizeFirstLetter(user.lastName)}
                </Text>
              </View>
              <Text style={tw`text-lg`}>{user.matricule.toUpperCase()}</Text>
            </View>
            <View style={tw`flex-row items-center justify-center`}>
              <View
                style={tw`w-15 h-15 bg-blue-500 rounded-full items-center justify-center`}
              >
                <Text style={tw`text-2xl text-white`}>
                  {user.firstName[0].toUpperCase()}
                  {user.lastName[0].toUpperCase()}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </SafeAreaView>
      <SafeAreaView style={tw`bg-white flex-1 rounded-t-[32px] mt-5`}>
        <View style={tw`px-4 py-4 flex-row gap-4 mx-auto`}>
          <TouchableOpacity
            style={tw`w-2/7  bg-[#ecf1fd]  rounded-xl p-2 h-24 flex justify-center items-center`}
          >
            <MaterialCommunityIcons name="palm-tree" size={65} color="green" />
            <Text style={tw`font-medium text-xl`}>Congés</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={tw`w-2/7  bg-[#ecf1fd] rounded-xl p-2 h-24 flex justify-center items-center`}
          >
            <Ionicons name="notifications-outline" size={65} color="green" />
            <Text style={tw`font-medium text-xl`}>Actualité</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={tw`w-2/7  bg-[#ecf1fd] rounded-xl p-2 h-24 flex justify-center items-center`}
          >
            <EvilIcons name="location" size={65} color="green" />
            <Text style={tw`font-medium text-xl`}>Sites</Text>
          </TouchableOpacity>
        </View>
        <View style={tw`px-4 py-4 flex gap-4 `}>
          <View
            style={tw`flex-row justify-between bg-[#ecf1fd] w-full px-2 py-4 rounded-lg`}
          >
            <View>
              <Text style={tw`text-lg font-medium`}>Tâches</Text>
            </View>
            <TouchableOpacity style={tw`flex-row items-center justify-end`}>
              <Text style={tw`text-lg font-medium`}>Voir plus</Text>
              <AntDesign name="arrowright" size={18} color="black" />
            </TouchableOpacity>
          </View>
          <View
            style={tw`flex-row justify-between bg-[#ecf1fd] w-full px-2 py-4 rounded-lg`}
          >
            <View>
              <Text style={tw`text-lg font-medium`}>Planning du jour</Text>
            </View>
            <TouchableOpacity style={tw`flex-row items-center justify-end`}>
              <Text style={tw`text-lg font-medium`}>Voir plus</Text>
              <AntDesign name="arrowright" size={18} color="black" />
            </TouchableOpacity>
          </View>
          <View
            style={tw`flex-row justify-between bg-[#ecf1fd] w-full px-2 py-4 rounded-lg`}
          >
            <View>
              <Text style={tw`text-lg font-medium`}>Rendez-vous à venir</Text>
            </View>
            <TouchableOpacity style={tw`flex-row items-center justify-end`}>
              <Text style={tw`text-lg font-medium`}>Voir plus</Text>
              <AntDesign name="arrowright" size={18} color="black" />
            </TouchableOpacity>
          </View>
        </View>

        {/* floating buttun action in bottom left to screen */}
      </SafeAreaView>
      <SafeAreaView>
        <TouchableOpacity
          onPress={() => navigation.navigate("ScanQr")}
          style={tw` absolute  bottom-30  right-5  flex-row justify-center`}
        >
          <View
            style={tw`w-20 h-20 bg-[#ecf1fd] rounded-full items-center justify-center shadow-lg opacity-100  z-50`}
          >
            <AntDesign name="qrcode" size={50} color="black" />
            <Text style={tw`text-black text-xs`}>Scanner</Text>
          </View>
        </TouchableOpacity>
      </SafeAreaView>
    </View>
  );
};

export default Home;
