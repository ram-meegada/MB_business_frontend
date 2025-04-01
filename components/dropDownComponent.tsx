import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { Dropdown } from "react-native-element-dropdown";
import { globalStyle } from "@/constants/globalStyles";

type Props = {
  data: { label: string; value: string }[];
  placeHolder: string;
  search: boolean;
  searchPlaceholder: string;
  optionSelected: (text: string) => void;
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
        color: "grey",
        fontSize: 14,
      }}
      onChange={(text) => {
        optionSelected(text.value);
      }}
    />
  );
};

const styles = StyleSheet.create({});

export default DropDownTsxComponent;
