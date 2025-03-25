import { ColorValue, Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { textColor, thirdColor } from "@/constants/globalStyles";

type Props = {
  onSubmit: () => void;
  buttonName: string;
};

const CustomButtonComponent: React.FC<Props> = ({ onSubmit, buttonName }) => {
  return (
    <Pressable
      onPress={onSubmit}
      style={{
        backgroundColor: buttonName === "Delete" ? "red" : thirdColor,
        height: 50,
        width: 100,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 8,
      }}
    >
      <Text
        style={{
          fontSize: 18,
          fontWeight: "500",
          color: buttonName === "Delete" ? "white" : textColor,
        }}
      >
        {buttonName}
      </Text>
    </Pressable>
  );
};

export default CustomButtonComponent;

const styles = StyleSheet.create({});
