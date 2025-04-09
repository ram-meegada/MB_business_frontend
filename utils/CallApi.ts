import { BEARER_TOKEN } from "@/constants/common";
import { Alert } from "react-native";

type Props = {
  method: string;
  Accept: string;
  endPoint: string;
  contentType?: string;
  formData?: any;
  showToast?: boolean;
};

const APICall = async ({
  method,
  Accept,
  endPoint,
  contentType,
  formData,
  showToast,
}: Props) => {
  try {
    
    let json_response = null;
    const options: any = {
      method: method,
      headers: {
        Authorization: `Bearer ${BEARER_TOKEN}`,
        Accept: Accept,
      },
    };

    if (formData) {
      options.body = JSON.stringify(formData);
    }

    if (contentType) {
      options.headers["Content-Type"] = contentType;
    }

    const response = await fetch(endPoint, options);
    json_response = await response.json();

    if (response.status === 401) {
      Alert.alert("Session Ended", "Please login again.");
    } else if (response.status === 400) {
      Alert.alert("Error", json_response?.message);
    } else if ([200, 201].includes(response.status)) {
      if (showToast) {
        Alert.alert("Success!", json_response?.message);
      }
    } else if (response.status === 500) {
      Alert.alert("Unknown error", json_response?.message);
    } else {
      Alert.alert("Warning!", "response not handled");
    }
    return json_response.data
  } catch (err) {
    Alert.alert("Error", String(err));
  }
};

export default APICall;
