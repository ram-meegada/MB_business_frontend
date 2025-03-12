import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { thirdColor } from "@/constants/globalStyles";

const CustomButtonComponent = () => {
  return (
    <Pressable style={{ 
        backgroundColor: thirdColor,
        height: 50,
        width: 100,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 8
     }}>
        <Text style={{ fontSize: 18, fontWeight: '500' }}>Submit</Text>
    </Pressable>
  );
};

export default CustomButtonComponent;

const styles = StyleSheet.create({});
