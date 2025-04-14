import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import {
  globalStyle,
  secondaryColor,
  softLightPink,
  thirdColor,
} from "@/constants/globalStyles";
import CustomButtonComponent from "@/components/customButtonComponent";
import { AnalyticsListScreenProps, RootStackNavigationList } from "../navigationTypes";


type Props = {
    navigation: AnalyticsListScreenProps
}

const AnalyticsListScreen = ({ navigation }: Props) => {
  const AnalyticsList = [
    {
      label: "Expenditure Analytics",
      navigateTo: "ExpenditureAnalytics",
    },
  ];
  return (
    <View style={globalStyle.container}>
      <View style={globalStyle.subContainer}>
        <Text style={globalStyle.pageHeadingStyle}>Analytics List</Text>
        {AnalyticsList.map((value, index) => (
          <Pressable
            key={index}
            onPress={() => navigation.navigate(value.navigateTo as never)}
            style={[
              {
                height: 50,
                backgroundColor: secondaryColor,
                marginTop: 10,
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 8,
              },
              globalStyle.shadowEffect,
            ]}
          >
            <Text style={{ fontSize: 22 }}>{value.label}</Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
};

export default AnalyticsListScreen;

const styles = StyleSheet.create({});
