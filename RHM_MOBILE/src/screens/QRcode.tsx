import {
  Alert,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Button,
} from "react-native";
import React, { useEffect, useMemo, useRef, useState } from "react";
import useAuthStore from "../store/store_auth";
import { Box,  Radio as NativeBaseRadio } from "native-base";
import { CameraView } from "expo-camera";

import tw from "twrnc";
import BottomSheet, {
  BottomSheetScrollView,
  BottomSheetTextInput,
} from "@gorhom/bottom-sheet";
import { makePresence } from "../api/employe";
import { NavigationProp } from "@react-navigation/native";

export default function QrCode({
  navigation,
}: {
  navigation: NavigationProp<any>;
}) {
  const { user } = useAuthStore();

  // State to control BottomSheet visibility
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);

  // bottom sheet 1
  const bottomSheetRef = useRef<BottomSheet>(null);
  const handleClosePress = () => bottomSheetRef.current?.close();
  const handleOpenPress = () => bottomSheetRef.current?.expand();

  const [scanStartedAt, setScanStartedAt] = useState<number | null>(null);
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [scanned, setScanned] = useState(false);
  const [text, setText] = useState("");
  const [value, setValue] = useState("checkIn");
  const [time, setTime] = useState(
    new Date().toLocaleTimeString("fr-FR", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    })
  );

  const [date, setDate] = useState(
    new Date().toLocaleDateString("fr-FR", {
      weekday: "short",
      day: "numeric",
      month: "short",
      year: "numeric",
    })
  );

  const snapPoints = useMemo(() => ["88%", "90%"], []);

  const askForCameraPermission = async () => {
    const { status } = await BarCodeScanner.requestPermissionsAsync();
    setHasPermission(status === "granted");
  };

  const handleMakePresence = async () => {
    try {
      const response = await makePresence(user.id, value);
      if (response.ok) {
        Alert.alert(response.message);
        handleClosePress();
        navigation.navigate("Acceuil");
      } else {
        Alert.alert("", response.message, [
          {
            text: "Non",
            style: "cancel",
            onPress: () => {
              handleClosePress();
              navigation.navigate("Acceuil");
            },
          },
          {
            text: "Oui",
            onPress: async () => {
              const response2 = await makePresence(user.id, response.action);
              if (response2.ok) {
                Alert.alert(response2.message);
                handleClosePress();
                navigation.navigate("Acceuil");
              } else {
                Alert.alert(
                  "Oops !, une erreur est survenue, veuillez réessayer"
                );
                handleClosePress();
                navigation.navigate("Acceuil");
              }
            },
          },
        ]);
      }
    } catch (error) {
      console.error("Presence error:", error);
    }
  };

  const handleBarCodeScanned = async ({
    type,
    data,
  }: {
    type: string;
    data: string;
  }) => {
    if (scanned) return;

    setScanned(true);
    setScanStartedAt(Date.now());

    if (data === "2024") {
      handleOpenPress();

      setTimeout(() => {
        setScanned(false);
        setScanStartedAt(null);
      }, 5000);
    } else {
      Alert.alert("Erreur", "QR Code invalide !");
      setScanned(false);
    }
  };

  useEffect(() => {
    askForCameraPermission();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(
        new Date().toLocaleTimeString("fr-FR", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })
      );
    }, 1000);

    return () => clearInterval(interval);
  }, []);

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
  }, []);

  return (
    <View style={styles.container}>
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text style={{ fontSize: 20, marginBottom: 20 }}>
          Scanner le QR Code
        </Text>
        <View style={styles.barcodebox}>
          <CameraView
            onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
            barcodeScannerSettings={{
              barcodeTypes: ["qr", "pdf417"],
            }}
            style={{ height: 400, width: 400 }}
          />
        </View>
        {scanStartedAt && (
          <Text>
            Scan commencé à : {new Date(scanStartedAt).toLocaleTimeString()}
          </Text>
        )}
      </View>

      <BottomSheet
        snapPoints={snapPoints}
        ref={bottomSheetRef}
        onClose={handleClosePress}
        enablePanDownToClose={true}
        index={isBottomSheetOpen ? 0 : -1}
        backgroundStyle={{
          backgroundColor: "#ecf1fd",
        }}
      >
        <BottomSheetScrollView>
          <View style={tw`flex-1 rounded-t-[40px] `}>
            <Text style={tw`mx-auto my-4 font-medium text-2xl underline`}>
              Pointer
            </Text>
            <View style={tw`flex-row gap-2 mx-3 flex-wrap `}>
              <Text style={tw`text-2xl font-semibold`}>
                {new Date().getHours() < 12 ? "Bonjour" : "Bonsoir, "}
              </Text>
              <Text style={tw`text-2xl font-semibold text-[#E89D85]`}>
                {user.firstName}
              </Text>
              <Text style={tw`text-2xl font-semibold text-[#E89D85]`}>
                {user.lastName}
              </Text>
              <Text style={tw`text-2xl font-semibold`}>👋</Text>
            </View>
            <View style={tw`mx-3 my-4 flex gap-1`}>
              <Text style={tw`text-lg `}>{date}</Text>
              <Text style={tw`text-2xl font-bold`}>{time}</Text>
            </View>
            <View style={tw`mx-3 my-4`}>
              <NativeBaseRadio.Group
                name="object"
                value={value}
                onChange={(nextValue) => {
                  setValue(nextValue);
                }}
              >
                <View style={tw``}>
                  <NativeBaseRadio value="checkIn" my={1}>
                    <Text style={tw`font-medium text-lg`}>
                      Je commence mon service
                    </Text>
                  </NativeBaseRadio>
                  <NativeBaseRadio value="checkOut" my={1}>
                    <Text style={tw`font-medium text-lg`}>
                      Je termine mon service
                    </Text>
                  </NativeBaseRadio>
                </View>
                <View style={tw``}>
                  <NativeBaseRadio value="pause" my={1}>
                    <Text style={tw`font-medium text-lg`}>
                      Je prend une pause
                    </Text>
                  </NativeBaseRadio>
                  <NativeBaseRadio value="reprise" my={1}>
                    <Text style={tw`font-medium text-lg`}>
                      Je termine ma pause
                    </Text>
                  </NativeBaseRadio>
                </View>
              </NativeBaseRadio.Group>
            </View>
            <View style={tw`mx-3`}>
              <Text style={tw`text-lg `}>Laisser une note</Text>
              <Box alignItems="center" w="100%">
                <BottomSheetTextInput
                  placeholder="Laisser une note (Optionnel)"
                  style={tw`border border-gray-300 rounded-lg w-full bg-white h-10 p-2 `}
                />
              </Box>
            </View>
            <TouchableOpacity
              style={tw`bg-[#E89D85] w-2/3 mx-auto mt-16 p-2 rounded-xl  `}
              onPress={handleMakePresence}
            >
              <Text style={tw`text-white text-center text-lg`}>Valider</Text>
            </TouchableOpacity>
          </View>
        </BottomSheetScrollView>
      </BottomSheet>
    </View>
  );
}

// Define styles for the components
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  barcodebox: {
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    height: 340,
    width: 340,
    overflow: "hidden",
    borderRadius: 50,
  },
});
