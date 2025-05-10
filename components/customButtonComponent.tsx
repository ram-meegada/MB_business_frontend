import { ColorValue, Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { globalStyle, textColor, thirdColor } from "@/constants/globalStyles";

type Props = {
  onSubmit: () => void;
  buttonName: string;
  addedStyles?: any
};

const CustomButtonComponent: React.FC<Props> = ({ onSubmit, buttonName, addedStyles={} }) => {
  return (
    <Pressable
      onPress={onSubmit}
      style={[{
        backgroundColor: buttonName === "Delete" ? "red" : thirdColor,
        height: 50,
        width: 100,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 8,
      }, globalStyle.shadowEffect, addedStyles]}
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
