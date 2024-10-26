import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import tw from "twrnc";
import { getTaskList } from "../api/employe";
import useAuthStore from "../store/store_auth";
import { useFocusEffect } from "@react-navigation/native";

const QrCode = () => {
  const { user } = useAuthStore();
  console.log(user.id);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  // useFocusEffect(() => {
  //   const fetchTasks = async () => {
  //     try {
  //       const taskList = await getTaskList(user.id);
  //       setTasks(taskList);
  //     } catch (error) {
  //       console.error("Erreur lors du chargement des tâches :", error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchTasks();
  // });

  return (
    <SafeAreaView style={tw`mx-2`}>
      <View>
        <Text style={tw`text-2xl font-bold`}>Mes Taches</Text>
      </View>
      {/* <View>
        {loading ? (
          <Text>Chargement...</Text>
        ) : (
          tasks.map((task: any) => (
            <View key={task.id}>
              <Text>{task.title}</Text>
            </View>
          ))
        )}
      </View> */}
      <View style={tw`mt-4`}>
        <TouchableOpacity style={tw`bg-[#E89D85] p-1 m-1 rounded-lg`}>
          <Text style={tw`text-xl`}>QR code</Text>
          <Text style={tw`font-light`}>QR code</Text>
          <Text style={tw`text-right font-light`}>QR code</Text>
        </TouchableOpacity>
        <TouchableOpacity style={tw`bg-[#E89D85] p-1 m-1 rounded-lg`}>
          <Text style={tw`text-xl`}>QR code</Text>
          <Text style={tw`font-light`}>QR code</Text>
          <Text style={tw`text-right font-light`}>QR code</Text>
        </TouchableOpacity>
        <TouchableOpacity style={tw`bg-[#E89D85] p-1 m-1 rounded-lg`}>
          <Text style={tw`text-xl`}>QR code</Text>
          <Text style={tw`font-light`}>QR code</Text>
          <Text style={tw`text-right font-light`}>QR code</Text>
        </TouchableOpacity>
        <TouchableOpacity style={tw`bg-[#E89D85] p-1 m-1 rounded-lg`}>
          <Text style={tw`text-xl`}>QR code</Text>
          <Text style={tw`font-light`}>QR code</Text>
          <Text style={tw`text-right font-light`}>QR code</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default QrCode;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
