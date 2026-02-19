import { Alert, Image, Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { secondaryColor, thirdColor } from "@/constants/globalStyles";
import * as ImagePicker from "expo-image-picker";

type Props = {
  image: string;
  selectImage: (uri: string) => void;
};

const ImageSelectorComponent = ({ image, selectImage }: Props) => {

  const PickImage = async () => {
    Alert.alert("Upload Image", "Choose an option", [
      { text: "Camera", onPress: openCamera },
      { text: "Gallery", onPress: pickImage },
      { text: "Cancel", style: "cancel" },
    ]);
  };

  const openCamera = async () => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

    if (!permissionResult.granted) {
      Alert.alert("Camera permission is required.");
      return;
    }

    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: "images",
      // allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled && result.assets && result.assets[0]) {
      selectImage(result.assets[0].uri);
    }
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
        selectImage(result.assets[0].uri);
      }
    }
  };
  return (
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
        onPress={PickImage}
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
  );
};

export default ImageSelectorComponent;

const styles = StyleSheet.create({});
