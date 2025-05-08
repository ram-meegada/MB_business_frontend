import * as SecureStore from 'expo-secure-store';
import AsyncStorage from '@react-native-async-storage/async-storage';


export const saveToSecureStorage = async (keyName: string, value: string) => {
    await SecureStore.setItemAsync(keyName, value);
  };

export const getFromSecureStorage = async (keyName: string) => {
    let value = await SecureStore.getItemAsync(keyName)
    if (value) {
      return value
    }
    return null
}



// Variables

export const ACCESS_TOKEN_LS = "AccessToken"
