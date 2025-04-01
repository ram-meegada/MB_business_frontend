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
  multiline: boolean;
  keyboardType: KeyboardTypeOptions;
  onTextChange: (text: number | string) => void;
};

const TextInputComponent: React.FC<Props> = ({
  placeHolder,
  multiline,
  keyboardType,
  onTextChange,
}) => {
  const [textHighlight, setTextHighlight] = useState(false);
  return (
    <TextInput
      onFocus={() => setTextHighlight(true)}
      style={[
        globalStyle.textInputStyle,
        {
          borderColor: textHighlight ? thirdColor : "transparent",
          borderWidth: textHighlight ? 2 : 0,
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
