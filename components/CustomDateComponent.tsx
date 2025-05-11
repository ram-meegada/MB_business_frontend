import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { secondaryColor } from "@/constants/globalStyles";
import DateTimePickerModal from "react-native-modal-datetime-picker";

type Props = {
    fieldName: string,
    dateSelection: (text: Date) => void
}

const CustomDateComponent = ({ fieldName, dateSelection }: Props) => {
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [ selectedDate, setSelectedDate ] = useState<Date | string>(fieldName)

    const showDatePicker = (title: string) => {
        setDatePickerVisibility(true);
      };

    const hideDatePicker = () => {
    setDatePickerVisibility(false);
    };

    const handleDateSelect = (text: Date) => {
        dateSelection(text)
        hideDatePicker()
        setSelectedDate(text.toISOString().slice(0, 10))
    }

    function dateColor() {
        const temp = parseInt(selectedDate.toString())
        if (temp && typeof temp === "number") {
            return "black"
        }
        return "grey"
    }

  return (
    <View>
      <Pressable
        style={{
          position: "absolute",
          bottom: styles.uploadIcon.height / 2,
          right: "2%",
          zIndex: 2,
          transform: [{ translateY: -5 }, { translateX: -5 }],
        }}
        onPress={() => showDatePicker("select date")}
      >
        <Image
          source={require("../assets/images/calender.png")}
          style={styles.uploadIcon}
        />
      </Pressable>
      <Pressable
        style={[styles.textInput, { justifyContent: "center" }]}
        onPress={() => showDatePicker("Select date")}
      >
        <Text
          style={{
            fontWeight: "400",
            color: dateColor(),
            fontSize: 14,
          }}
        >
          {selectedDate.toString()}
        </Text>
      </Pressable>
      <DateTimePickerModal
        style={styles.textInput}
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={(text) => handleDateSelect(text)}
        onCancel={hideDatePicker}
      />
    </View>
  );
};

export default CustomDateComponent;

const styles = StyleSheet.create({
  uploadIcon: {
    height: 30,
    width: 30,
    borderRadius: 10,
    backgroundColor: secondaryColor,
  },
  textInput: {
    height: 50,
    marginBottom: 10,
    borderRadius: 30,
    backgroundColor: secondaryColor,
    paddingLeft: 10,
    color: "black",
  }
});
