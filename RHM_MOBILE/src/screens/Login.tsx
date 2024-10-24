import { Alert, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import tw from "twrnc";
import { EvilIcons, Feather } from "@expo/vector-icons";
import Input from "../components/ui/Input";
import { Text } from "react-native";
import useAuthStore from "../store/store_auth";
import { loginApi } from "../api/auth";


const Login = () => {
  const [pseudo, setPseudo] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const { setUser, setToken, login } = useAuthStore(); 

  const handleLogin = async () => {
    try {
      const response = await loginApi(pseudo, password);
      const { accessToken, refreshToken } = response.data.token;
      setToken(accessToken);
      setUser(response.data.data); 
      login(response.data.data, accessToken);

    } catch (error) {
      console.error("Erreur de connexion:", error);
      Alert.alert("Erreur", "Pseudo ou mot de passe incorrect");
    }
  };

  return (
    <View style={tw`flex-1 justify-center`}>
      <Text style={tw`mx-10 font-extrabold text-4xl`}>logo RHM</Text>
      <Text style={tw`mx-10 my-4 text-3xl font-bold`}>Connexion</Text>
      <View style={tw`flex justify-center gap-8`}>
        <Input placeholder="Pseudo" value={pseudo} onChange={setPseudo}>
          <EvilIcons name="user" size={36} color="black" />
        </Input>
        <Input
          placeholder="Mot de passe"
          value={password}
          onChange={setPassword}
          secureTextEntry={!showPassword}
          rightIcon={
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              <Feather
                name={showPassword ? "eye-off" : "eye"}
                size={24}
                color="black"
              />
            </TouchableOpacity>
          }
        >
          <Feather name="lock" size={24} color="black" />
        </Input>
      </View>
      <Text style={tw`mx-auto my-5 text-xl`}>Mot de passe oublié ?</Text>
      <TouchableOpacity
        onPress={handleLogin}
        style={tw`bg-[#2816A7] mx-5 p-3 rounded-2xl py-3 mt-6`}
      >
        <Text style={tw`text-white text-center text-2xl`}>Se connecter</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Login;
