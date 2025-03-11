import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  Pressable,
  TextInput,
} from "react-native";
import React, { useState } from "react";
import { AddStockProps } from "../navigationTypes";
import {
  globalStyle,
  secondaryColor,
  thirdColor,
} from "@/constants/globalStyles";
import { Image } from "react-native";

type Props = {
  navigation: AddStockProps;
};

const AddStock = () => {
  const [textHighlight, setTextHighlight] = useState(-1);
  const textInputList = [
    {
      title: "Age",
    },
    {
      title: "Purchase price",
    },
    {
      title: "Milk capacity(in litres)",
    },
  ];
  return (
    <View style={globalStyle.container}>
      <View
        style={{
          flex: 1,
          marginTop: StatusBar.currentHeight ? StatusBar.currentHeight : 10,
          marginHorizontal: 20,
          //   backgroundColor: 'red',
        }}
      >
        <Text style={{ fontSize: 24, alignSelf: "center", marginBottom: 20 }}>
          Add Stock
        </Text>
        <View style={{ width: 100, height: 110, marginBottom: 20 }}>
          <Image
            source={require("../../assets/images/upload_buffalo_image.png")}
            style={{
              height: 100,
              width: 100,
              borderRadius: 50,
              opacity: 0.3,
              borderColor: thirdColor,
              borderWidth: 2,
            }}
          />
          <Pressable
            style={{
              position: "absolute",
              bottom: 0,
              left: "50%",
              transform: [{ translateX: -15 }],
            }}
          >
            <Image
              source={require("../../assets/images/upload_image_button.png")}
              style={{
                height: 30,
                width: 30,
                borderRadius: 15,
                borderColor: thirdColor,
                borderWidth: 1,
                backgroundColor: secondaryColor,
              }}
            />
          </Pressable>
        </View>
        {textInputList.map((placeholder, index) => (
          <TextInput
            key={index}
            onFocus={() => setTextHighlight(index)}
            style={[
              styles.textInput,
              {
                borderColor: textHighlight == index ? thirdColor : "",
                borderWidth: textHighlight == index ? 2 : 0,
              },
            ]}
            placeholder={placeholder.title}
            keyboardType="numeric"
          ></TextInput>
        ))}
      </View>
    </View>
  );
};

export default AddStock;

const styles = StyleSheet.create({
  textInput: {
    height: 50,
    marginBottom: 10,
    borderRadius: 30,
    backgroundColor: secondaryColor,
    paddingLeft: 10,
  },
});
