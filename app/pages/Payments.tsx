import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { globalStyle } from "@/constants/globalStyles";

const Payments = () => {
  return (
    <View style={globalStyle.container}>
      <View style={globalStyle.subContainer}>
        <Text style={globalStyle.pageHeadingStyle}>Payments</Text>
      </View>
    </View>
  );
};

export default Payments;

const styles = StyleSheet.create({});
