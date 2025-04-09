import { StyleSheet, Text, TouchableWithoutFeedback, View } from "react-native";
import React, { useState } from "react";
import { Dropdown } from "react-native-element-dropdown";
import { globalStyle, placeHolderColor, secondaryColor, sideHeadingColor, textColor, thirdColor } from "@/constants/globalStyles";

type Props = {
  data: { label: string; value: string }[];
  placeHolder: string;
  search: boolean;
  searchPlaceholder: string;
  optionSelected: (text: number) => void;
};

const DropDownTsxComponent = ({
  data,
  placeHolder,
  search,
  searchPlaceholder,
  optionSelected,
}: Props) => {
  return (
    <Dropdown
      style={globalStyle.textInputStyle}
      data={data}
      labelField="label"
      valueField="value"
      placeholder={placeHolder}
      search={search}
      searchPlaceholder={searchPlaceholder}
      placeholderStyle={{
        fontWeight: "400",
        color: placeHolderColor,
        fontSize: 14,
      }}
      onChange={(text) => {
        if (text?.isHeader === undefined) {
          optionSelected(text.id);
        }
      }}
      renderItem={(item) => {
        if (item.isHeader) {
          return (
            <TouchableWithoutFeedback>
              <View
                style={{
                  padding: 10,
                  backgroundColor: thirdColor,
                }}
              >
                <Text style={styles.headerStyle}>
                  {item.label}
                </Text>
              </View>
            </TouchableWithoutFeedback>
          );
        } else {
          return <Text style={styles.textStyle}>{item.label}</Text>;
        }
      }}
    />
  );
};

const styles = StyleSheet.create({
  textStyle: {
    fontSize: 14,
    padding: 10,
  },
  headerStyle: {
    fontSize: 18,
    fontWeight: "bold",
    color: textColor
  }
});

export default DropDownTsxComponent;
