import { Image, StyleSheet, Text, View, Animated } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { ThirdPageProps } from "../navigationTypes";
import { globalStyle } from "@/constants/globalStyles";

type Props = {
  navigation: ThirdPageProps;
};

const ThirdPage: React.FC<Props> = ({ navigation }) => {
  const translateY = useRef(new Animated.Value(200)).current;

  useEffect(() => {
    Animated.timing(translateY, {
      toValue: 0,
      duration: 1000,
      useNativeDriver: true,
    }).start(() => {
      navigation.replace("Home");
    });
  }, []);

  return (
    <View style={globalStyle.container}>
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          //   backgroundColor: "green",
        }}
      >
        <Image
          style={{
            height: 200,
            width: 200,
            borderRadius: 100
          }}
          source={require("../../assets/images/RR.jpeg")}
        />
        <Animated.View style={{ transform: [{ translateY }] }}>
          <Text style={{ fontSize: 24 }}>Welcome to R</Text>
        </Animated.View>
      </View>
    </View>
  );
};

export default ThirdPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  homePage: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "green",
  },
});
