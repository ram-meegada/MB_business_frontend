import { ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import { globalStyle } from "@/constants/globalStyles";
import BarChartComponent from "@/components/BarGraphComponent";

const ExpenditureAnalytics = () => {
  return (
    <View style={globalStyle.container}>
      <View style={globalStyle.subContainer}>
        <Text style={globalStyle.pageHeadingStyle}>Expenditure Analytics</Text>
        <ScrollView>
          <BarChartComponent />
        </ScrollView>
      </View>
    </View>
  );
};

export default ExpenditureAnalytics;

const styles = StyleSheet.create({});
