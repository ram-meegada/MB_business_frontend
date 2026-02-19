import {
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import React, { useState } from "react";
import { globalStyle } from "@/constants/globalStyles";
import TextInputComponent from "@/components/TextInputComponent";
import CustomButtonComponent from "@/components/customButtonComponent";
import LoadingModal from "@/components/LoadingModal";
import APICall from "@/utils/CallApi";
import { LOGIN_ENDPOINT } from "@/constants/endpoints";
import { ACCESS_TOKEN_LS, saveToSecureStorage } from "@/utils/localStorage";
import { LoginProps } from "../navigationTypes";

type Props = {
  navigation: LoginProps;
};

const Login = ({ navigation }: Props) => {
  const [username, setUsername] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [loading, setLoading] = useState(false);

  async function handleLogin() {
    const payload = { username: username, password: password };
    if (!username) {
      Alert.alert("Required", "Username is required");
      return;
    }
    if (!password) {
      Alert.alert("Required", "Password is required");
      return;
    }
    setLoading(true);
    try {
      const response = await fetch(LOGIN_ENDPOINT, {
        method: "POST",
        body: JSON.stringify(payload),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      const json_response = await response.json();

      setLoading(false);
      if (response.status === 200) {
        if (response) {
          saveToSecureStorage(ACCESS_TOKEN_LS, json_response.data.access_token);
          
          if (json_response.data.role == 1) {
            navigation.replace("Home");
          } else {
            Alert.alert("Alert", "You do not have access to login");
          }
        }
      } else {
        Alert.alert("Error", json_response.message);
      }
    } catch (err) {
      setLoading(false);
      console.log(err, "-----err---------");
    }
  }

  return (
    <View style={{ flex: 1 }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            <View style={globalStyle.container}>
              <LoadingModal visible={loading} />
              <View style={[globalStyle.subContainer, styles.subcontainer]}>
                <View style={styles.loginBlock}>
                  <Text style={globalStyle.pageHeadingStyle}>Login</Text>
                  <TextInputComponent
                    placeHolder="Enter username..."
                    multiline={false}
                    keyboardType="default"
                    onTextChange={(text) => {
                      setUsername(text.toString());
                    }}
                    fieldType="string"
                  />
                  <TextInputComponent
                    placeHolder="Enter password..."
                    multiline={false}
                    keyboardType="default"
                    onTextChange={(text) => {
                      setPassword(text.toString());
                    }}
                    fieldType="string"
                  />
                  <CustomButtonComponent
                    onSubmit={() => {
                      handleLogin();
                    }}
                    buttonName="Submit"
                  />
                </View>
              </View>
            </View>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  loginBlock: {
    // backgroundColor: "red",
    marginBottom: 100,
  },
  subcontainer: {
    justifyContent: "flex-end",
  },
});
