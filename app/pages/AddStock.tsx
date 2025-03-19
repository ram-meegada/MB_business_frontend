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
import { ADD_STOCK_ENDPOINT } from "@/constants/endpoints";

type Props = {
  navigation: AddStockProps;
};

const AddStock = () => {
  const [textHighlight, setTextHighlight] = useState(-1);
  const [breedValue, setBreedValue] = useState(null);
  const [pregnacncyStatus, setPregnacncyStatus] = useState("no");
  const [image, setImage] = useState("");
  const [lastCalvingDate, setLastCalvingDate] = useState<Date | null>(null);
  const [dateOfBirth, setDateOfBirth] = useState<Date | null>(null);
  const [selectedDateTitle, setSelectedDateTitle] = useState("");
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const CallApi = async () => {
    console.log("7777777777777777777");

    const PAYLOAD = {
      breed: breedValue,
      is_pregnant: pregnacncyStatus,
      last_calvation_date: lastCalvingDate,
      date_of_birth: dateOfBirth,
      lactation_month: 3,
      purchase_price: 50000,
      milk_capacity: 10,
      parity: 2,
      seller_details: "lorem ipsum lorem ipsum lorem ipsum lorem ipsum",
      qualities: "lorem ipsum lorem ipsum lorem ipsum lorem ipsum",
      food_habits: "lorem ipsum lorem ipsum lorem ipsum lorem ipsum",
    };
    try {
      const response = await fetch(ADD_STOCK_ENDPOINT, {
        method: "POST",
        body: JSON.stringify(PAYLOAD),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      const json_response = await response.json();
      console.log(json_response, "----json==========");
    } catch (err) {
      console.log(err, "----errr-----");
    }
  };

  const showDatePicker = (title: string) => {
    setSelectedDateTitle(title);
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (selectedDate: Date) => {
    if (selectedDateTitle === "Last Calving Date") {
      setLastCalvingDate(selectedDate);
    } else if (selectedDateTitle === "Date Of Birth") {
      setDateOfBirth(selectedDate);
    }
    hideDatePicker();
  };

  function displayDate(title: string) {
    if (title === "Last Calving Date") {
      return lastCalvingDate ? lastCalvingDate.toDateString() : title;
    } else if (title === "Date Of Birth") {
      return dateOfBirth ? dateOfBirth.toDateString() : title;
    }
    return null;
  }

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

  function setDateColor(title: string) {
    if (title === "Last Calving Date" && lastCalvingDate) {
      return "black";
    }
    if (title === "Date Of Birth" && dateOfBirth) {
      return "black";
    }
    return "grey";
  }

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
                    placeholderTextColor="grey"
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
                      onPress={() => showDatePicker(item.title)}
                    >
                      <Image
                        source={require("../../assets/images/calender.png")}
                        style={styles.uploadIcon}
                      />
                    </Pressable>
                    <Pressable
                      style={[styles.textInput, { justifyContent: "center" }]}
                      // placeholder={item.title}
                      onPress={() => showDatePicker(item.title)}
                      // editable={false}
                      // pointerEvents="none"
                    >
                      <Text
                        style={{
                          fontWeight: "400",
                          color: setDateColor(item.title),
                          fontSize: 14,
                        }}
                      >
                        {displayDate(item.title)}
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
            ListFooterComponent={<CustomButtonComponent onSubmit={CallApi} />}
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
    color: "black",
  },
  uploadIcon: {
    height: 30,
    width: 30,
    borderRadius: 10,
    backgroundColor: secondaryColor,
  },
});

export default AddStock;
