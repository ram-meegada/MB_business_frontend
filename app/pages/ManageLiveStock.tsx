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
import React, { useEffect, useState } from "react";
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
import {
  ADD_STOCK_ENDPOINT,
  BASE_URL,
  STOCK_BY_ID_ENDPOINT,
} from "@/constants/endpoints";
import * as Common from "@/constants/common";
import LoadingModal from "@/components/LoadingModal";
import {
  ManageLiveStockProps,
  RootStackNavigationList,
} from "../navigationTypes";
import { RouteProp } from "@react-navigation/native";

type Props = {
  navigation: ManageLiveStockProps;
  route: RouteProp<RootStackNavigationList, "ManageLiveStock">;
};

const ManageLiveStock: React.FC<Props> = ({ navigation, route }) => {
  const id = route.params.id;
  const [textHighlight, setTextHighlight] = useState(-1);
  const [breedValue, setBreedValue] = useState(null);
  const [pregnacncyStatus, setPregnacncyStatus] = useState("no");
  const [image, setImage] = useState("");
  const [lastCalvingDate, setLastCalvingDate] = useState<Date | null>(null);
  const [dateOfBirth, setDateOfBirth] = useState<Date | null>(null);
  const [selectedDateTitle, setSelectedDateTitle] = useState("");
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [lactationMonth, setLactationMonth] = useState(0);
  const [purchasePrice, setPurchasePrice] = useState(0);
  const [milkCapacity, setMilkCapacity] = useState<number | null>(null);
  const [parity, setParity] = useState(0);
  const [sellerDetails, setSellerDetails] = useState("");
  const [qualities, setQualities] = useState("");
  const [foodHabits, setFoodHabits] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const BEARER_TOKEN = Common.BEARER_TOKEN;

  function validatePayload() {
    let hasErrors = false;
    if (!breedValue) {
      setErrors((prev) => ({ ...prev, breed: "Please select breed" }));
      hasErrors = true;
    }
    if (!lastCalvingDate) {
      setErrors({
        ...errors,
        lastCalvingDate: "Please enter last calvation date",
      });
      hasErrors = true;
    }
    if (lactationMonth === 0) {
      setErrors({ ...errors, lactationMonth: "Please enter lactation month" });
      hasErrors = true;
    }
    if (parity === 0) {
      console.log(parity, "-----party----");
      setErrors({ ...errors, parity: "Please fill parity" });
      hasErrors = true;
    } else {
    }
    return hasErrors;
  }

  useEffect(() => {
    const FetchStockById = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${STOCK_BY_ID_ENDPOINT}${id}/`, {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${BEARER_TOKEN}`,
          },
        });

        if (response.ok) {
          const json_response = await response.json();
          const data = json_response?.data;
          console.log(data, "----data----");

          setImage(`${BASE_URL}${data.image_url}`);
          setBreedValue(data.breed);
          setPregnacncyStatus(data.is_pregnant ? "yes" : "no");
          const temp_date = new Date(data.last_calvation_date);
          const temp_date_two = new Date(data.date_of_birth);
          setLastCalvingDate(temp_date);
          setDateOfBirth(temp_date_two);
          setLactationMonth(data.lactation_month);
          setPurchasePrice(data.purchase_price);
          setMilkCapacity(data.milk_capacity);
          setParity(data.parity);
          setSellerDetails(data.seller_details);
          setQualities(data.qualities);
          setFoodHabits(data.food_habits);
        } else {
          Alert.alert("Error!", "Something went wrong");
        }
        setLoading(false);
      } catch (err: any) {
        Alert.alert("Error!!", err.toString());
        setLoading(false);
      }
    };
    FetchStockById();
  }, []);

  const CallApi = async () => {
    const formData = new FormData();

    formData.append("image", {
      uri: image, // Local file path
      name: "buffalo.png", // Extracted filename
      type: "image/jpeg", // Extracted MIME type
    } as any);
    formData.append("breed", breedValue ? breedValue : "");
    formData.append("is_pregnant", pregnacncyStatus);
    formData.append(
      "last_calvation_date",
      lastCalvingDate ? lastCalvingDate.toISOString().split("T")[0] : ""
    );
    formData.append(
      "date_of_birth",
      dateOfBirth ? dateOfBirth.toISOString().split("T")[0] : ""
    );
    formData.append("lactation_month", lactationMonth.toString());
    formData.append("purchase_price", String(purchasePrice));
    formData.append("milk_capacity", String(milkCapacity));
    formData.append("parity", parity.toString());
    formData.append("seller_details", sellerDetails);
    formData.append("qualities", qualities);
    formData.append("food_habits", foodHabits);

    // if (validatePayload()) {
    //   for (let err of Object.entries(errors)) {
    //     console.log(err, "-----err----");

    //     Alert.alert(
    //       "Validation Failed",
    //       String(err[1]) || "Please fill the data correctly"
    //     );
    //     break;
    //   }
    //   return;
    // }
    try {
      setLoading(true);
      const response = await fetch(`${STOCK_BY_ID_ENDPOINT}${id}/`, {
        method: "PUT",
        body: formData,
        headers: {
          Authorization: `Bearer ${BEARER_TOKEN}`,
          Accept: "application/json",
          "Content-Type": "multipart/form-data",
        },
      });
      const json_response = await response.json();
      console.log(json_response, "======");
      if (response.status === 401) {
        Alert.alert("Token expired", "Change token");
      } else if (response.status === 400) {
        Alert.alert("Error", json_response?.message);
      } else if (response.status === 200) {
        Alert.alert("Success!", "Changes saved successfully.");
      }
      setLoading(false);
    } catch (err) {
      setLoading(false);
      Alert.alert("Error", err instanceof Error ? err.message : String(err));
      console.log(err, "----errr---");
    }
  };

  const CallDeleteApi = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${STOCK_BY_ID_ENDPOINT}${id}/`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${BEARER_TOKEN}`,
          Accept: "application/json",
        },
      });
      const json_response = await response.json();
      console.log(json_response, "======");
      if (response.status === 401) {
        Alert.alert("Token expired", "Change token");
      } else if (response.status === 400) {
        Alert.alert("Error", json_response?.message);
      } else if (response.status === 200) {
        Alert.alert("Success!", json_response.message);
        navigation.goBack();
      }
      setLoading(false);
    } catch (err) {
      setLoading(false);
      Alert.alert("Error", err instanceof Error ? err.message : String(err));
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
      // allowsEditing: true,
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

  const saveChangedText = (text: string, title: string) => {
    if (title.includes("Lactation Stage")) {
      setLactationMonth(parseInt(text));
    } else if (title === "Purchase price") {
      setPurchasePrice(parseFloat(text));
    } else if (title.includes("Milk capacity")) {
      setMilkCapacity(text ? parseFloat(text) : null);
    } else if (title === "Parity") {
      setParity(parseInt(text));
    } else if (title === "Seller Details") {
      setSellerDetails(text);
    } else if (title === "Qualities") {
      setQualities(text);
    } else if (title === "Food habits") {
      setFoodHabits(text);
    }
  };

  const setPreValuesForTextInputs = (title: string) => {
    if (title.includes("Lactation Stage")) {
      return lactationMonth ? lactationMonth.toString() : "";
    } else if (title === "Purchase price") {
      return purchasePrice ? purchasePrice.toString() : "";
    } else if (title.includes("Milk capacity")) {
      return milkCapacity ? milkCapacity.toString() : "";
    } else if (title === "Parity") {
      return parity ? parity.toString() : "";
    } else if (title === "Seller Details") {
      return sellerDetails ? sellerDetails : "";
    } else if (title === "Qualities") {
      return qualities ? qualities : "";
    } else if (title === "Food habits") {
      return foodHabits ? foodHabits : "";
    }
  };

  return (
    <View style={globalStyle.container}>
      <LoadingModal visible={loading} />
      <View style={globalStyle.subContainer}>
        <Text style={globalStyle.pageHeadingStyle}>Manage Live Stock</Text>
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
        <ScrollView showsVerticalScrollIndicator={false}>
          {addStockInputFields.map((item, index) => {
            if (["numeric", "text"].includes(item.type)) {
              return (
                <TextInput
                  key={index}
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
                  onChangeText={(text) => saveChangedText(text, item.title)}
                  placeholder={item.title}
                  placeholderTextColor="grey"
                  multiline={item.type == "text"}
                  keyboardType={item.type == "numeric" ? "numeric" : "default"}
                  value={setPreValuesForTextInputs(item.title)}
                ></TextInput>
              );
            } else if (item.type === "DROPDOWN" && item.title === "Breed") {
              return (
                <Dropdown
                  key={index}
                  style={styles.textInput}
                  data={breedChoices}
                  labelField="label"
                  valueField="value"
                  value={breedValue}
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
                  key={index}
                  style={styles.textInput}
                  data={pregnancyStatusOptions}
                  labelField="label"
                  valueField="value"
                  value={pregnacncyStatus}
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
                <View key={index}>
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
                    onPress={() => showDatePicker(item.title)}
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
          })}
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <CustomButtonComponent onSubmit={CallApi} buttonName="Save" />
            <CustomButtonComponent
              onSubmit={CallDeleteApi}
              buttonName="Delete"
            />
          </View>
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

export default ManageLiveStock;
