import { BEARER_TOKEN } from "@/constants/common";
import { Alert } from "react-native";

const APICall = async (
  formData: any,
  method: string,
  Accept: string,
  contentType: string,
  endPoint: string
) => {
  try {
    let json_response = null;
    const response = await fetch(endPoint, {
      method: method,
      body: JSON.stringify(formData),
      headers: {
        Authorization: `Bearer ${BEARER_TOKEN}`,
        Accept: Accept,
        "Content-Type": contentType,
      },
    });
    json_response = await response.json();
    console.log(json_response, typeof(response.status), "-----json_responsesdsadas-----");
    if (response.status === 401) {
      Alert.alert("Session Ended", "Please login again.");
    } else if (response.status === 400) {
      Alert.alert("Error", json_response?.message);
    } else if ([200, 201].includes(response.status)) {
      Alert.alert("Success!", json_response?.message);
    }
    else {
        Alert.alert("Warning!", 'response not handled');
    }
  } catch (err) {
    Alert.alert("Error", String(err));
  }
};

export default APICall;
