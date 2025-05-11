import {
  KeyboardTypeOptions,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useState } from "react";
import {
  globalStyle,
  secondaryColor,
  thirdColor,
} from "@/constants/globalStyles";

type Props = {
  placeHolder: string;
  multiline?: boolean;
  keyboardType?: KeyboardTypeOptions;
  onTextChange: (text: number | string) => void;
  value?: string | number;
  fieldType?: string
};

const TextInputComponent: React.FC<Props> = ({
  placeHolder,
  multiline=false,
  keyboardType="default",
  onTextChange,
  value,
  fieldType="string"
}) => {
  const [textHighlight, setTextHighlight] = useState(false);

  if (fieldType=="number" && value !== undefined && isNaN(Number(value))) {
    value = ""
  }
  
  return (
    <TextInput
      value={value !== undefined ? value.toString() : undefined}
      onFocus={() => setTextHighlight(true)}
      style={[
        globalStyle.textInputStyle,
        {
          borderColor: textHighlight ? thirdColor : "transparent",
          borderWidth: textHighlight ? 2 : 0,
          height: multiline ? 100 : globalStyle.textInputStyle.height,
          textAlignVertical: multiline ? 'top' : 'auto'
        },
      ]}
      onChangeText={(text) => onTextChange(text)}
      placeholder={placeHolder}
      placeholderTextColor="grey"
      multiline={multiline}
      keyboardType={keyboardType}
    />
  );
};

export default TextInputComponent;

const styles = StyleSheet.create({});
