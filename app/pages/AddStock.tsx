import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  Pressable,
  TextInput,
  FlatList,
  KeyboardAvoidingView,
  ScrollView,
  Button,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { AddStockProps } from "../navigationTypes";
import {
  globalStyle,
  secondaryColor,
  thirdColor,
} from "@/constants/globalStyles";
import { Image } from "react-native";
import {
  addStockInputFields,
  breedChoices,
  pregnancyStatusOptions,
} from "@/constants/inputFields";
import CustomButtonComponent from "@/components/customButtonComponent";
import { Dropdown } from "react-native-element-dropdown";
import * as ImagePicker from "expo-image-picker";
import DateTimePickerModal from "react-native-modal-datetime-picker";

type Props = {
  navigation: AddStockProps;
};

const AddStock = () => {
  const [textHighlight, setTextHighlight] = useState(-1);
  const [breedValue, setBreedValue] = useState(null);
  const [pregnacncyStatus, setPregnacncyStatus] = useState("no");
  const [image, setImage] = useState("");
  const [date, setDate] = useState<Date | null>(null);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (selectedDate: Date) => {
    setDate(selectedDate);
    hideDatePicker();
  };

  const pickImage = async () => {
    // Request permission
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permission Denied", "Allow access to upload images.");
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: "images",
      // allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      if (result.assets && result.assets[0]) {
        setImage(result.assets[0].uri);
      }
    }
  };

  const selectImage = async () => {
    Alert.alert("Upload Image", "Choose an option", [
      { text: "Camera", onPress: openCamera },
      { text: "Gallery", onPress: pickImage },
      { text: "Cancel", style: "cancel" },
    ]);
  };

  const openCamera = async () => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
    if (!permissionResult.granted) {
      alert("Camera permission is required.");
      return;
    }

    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: "images",
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled && result.assets && result.assets[0]) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <View style={globalStyle.container}>
      <View
        style={{
          flex: 1,
          marginTop: StatusBar.currentHeight ? StatusBar.currentHeight : 10,
          marginHorizontal: 20,
          marginBottom: 20,
          //   backgroundColor: 'red',
        }}
      >
        <Text style={{ fontSize: 24, alignSelf: "center", marginBottom: 20 }}>
          Add Live Stock
        </Text>
        <View style={{ width: 100, height: 110, marginBottom: 20 }}>
          <Image
            source={
              image
                ? { uri: image }
                : require("../../assets/images/upload_buffalo_image.png")
            }
            style={{
              height: 100,
              width: 100,
              borderRadius: 50,
              opacity: image ? 1 : 0.3,
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
            // onPress={pickImage}
            onPress={selectImage}
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
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <FlatList
            data={addStockInputFields}
            renderItem={({ item, index }) => {
              if (["numeric", "text"].includes(item.type)) {
                return (
                  <TextInput
                    onFocus={() => setTextHighlight(index)}
                    style={[
                      styles.textInput,
                      {
                        borderColor:
                          textHighlight == index ? thirdColor : "transparent",
                        borderWidth: textHighlight == index ? 2 : 0,
                        height:
                          item.type == "text" ? 100 : styles.textInput.height,
                        textAlignVertical: item.type == "text" ? "top" : "auto",
                        borderRadius:
                          item.type == "text"
                            ? 15
                            : styles.textInput.borderRadius,
                      },
                    ]}
                    placeholder={item.title}
                    multiline={item.type == "text"}
                    keyboardType={
                      item.type == "numeric" ? "numeric" : "default"
                    }
                  ></TextInput>
                );
              } else if (item.type === "DROPDOWN" && item.title === "Breed") {
                return (
                  <Dropdown
                    style={styles.textInput}
                    data={breedChoices}
                    labelField="label"
                    valueField="value"
                    placeholder="Select Breed"
                    search
                    searchPlaceholder="Search Breed here....."
                    placeholderStyle={{
                      fontWeight: "400",
                      color: "grey",
                      fontSize: 14,
                    }}
                    onChange={(item) => setBreedValue(item.value)}
                  />
                );
              } else if (
                item.type === "DROPDOWN" &&
                item.title.includes("Pregnancy status")
              ) {
                return (
                  <Dropdown
                    style={styles.textInput}
                    data={pregnancyStatusOptions}
                    labelField="label"
                    valueField="value"
                    placeholder="Pregnancy status"
                    placeholderStyle={{
                      fontWeight: "400",
                      color: "grey",
                      fontSize: 14,
                    }}
                    onChange={(item) => setPregnacncyStatus(item.value)}
                  />
                );
              } else if (item.type === "DATE") {
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
                      onPress={showDatePicker}
                    >
                      <Image
                        source={require("../../assets/images/calender.png")}
                        style={styles.uploadIcon}
                      />
                    </Pressable>
                    <Pressable
                      style={[styles.textInput, { justifyContent: "center" }]}
                      // placeholder={item.title}
                      onPress={showDatePicker}
                      // editable={false}
                      // pointerEvents="none"
                    >
                      <Text
                        style={{
                          fontWeight: "400",
                          color: "grey",
                          fontSize: 14,
                        }}
                      >
                        {date ? date.toDateString() : item.title}
                      </Text>
                    </Pressable>
                    <DateTimePickerModal
                      style={styles.textInput}
                      isVisible={isDatePickerVisible}
                      mode="date"
                      onConfirm={handleConfirm}
                      onCancel={hideDatePicker}
                    />
                  </View>
                );
              } else {
                return null;
              }
            }}
            ListFooterComponent={<CustomButtonComponent />}
          />
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  textInput: {
    height: 50,
    marginBottom: 10,
    borderRadius: 30,
    backgroundColor: secondaryColor,
    paddingLeft: 10,
  },
  uploadIcon: {
    height: 30,
    width: 30,
    borderRadius: 10,
    backgroundColor: secondaryColor,
  },
});

export default AddStock;
