import { StyleSheet, TextInput, View, TouchableOpacity } from "react-native";
import React, { useRef } from "react";
import tw from "twrnc";

interface InputProps {
  children?: React.ReactNode;
  placeholder: string;
  value: string;
  onChange: (text: string) => void;
  secureTextEntry?: boolean;
  rightIcon?: React.ReactNode;
}

const Input: React.FC<InputProps> = ({ children, placeholder, value, onChange, secureTextEntry, rightIcon }) => {
  const inputRef = useRef<TextInput>(null);

  return (
    <View
      style={[
        tw`p-3 flex-row items-center gap-2 bg-white rounded-2xl mx-5`,
        styles.shadow,
      ]}
    >
      {children}
      <TextInput
        ref={inputRef}
        style={tw`flex-1 font-semibold text-3xl`}
        placeholder={placeholder}
        value={value}
        onChangeText={onChange}
        secureTextEntry={secureTextEntry}
      />
      {rightIcon && <View>{rightIcon}</View>}
    </View>
  );
};

const styles = StyleSheet.create({
  shadow: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    opacity: 1,
  },
});

export default Input;
