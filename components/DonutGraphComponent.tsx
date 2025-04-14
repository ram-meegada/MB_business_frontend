import React from "react";
import { PieChart } from "react-native-chart-kit";
import { Dimensions, View, Text } from "react-native";
import { softLightPink } from "@/constants/globalStyles";

const screenWidth = Dimensions.get("window").width;

const DonutChartComponent = () => {
    const chartData = [
        { name: "HINDALCO", population: 13, color: "#00BCD4", legendFontColor: "#7F7F7F", legendFontSize: 12 },
        { name: "ICICIBANK", population: 21, color: "#FFC107", legendFontColor: "#7F7F7F", legendFontSize: 12 },
        { name: "BAJFINANCE", population: 19, color: "#FF5722", legendFontColor: "#7F7F7F", legendFontSize: 12 },
        { name: "SBIN", population: 19, color: "#9C27B0", legendFontColor: "#7F7F7F", legendFontSize: 12 },
        { name: "FEDERALBNK", population: 19, color: "#F44336", legendFontColor: "#7F7F7F", legendFontSize: 12 },
        { name: "ULTRACEMCO", population: 18, color: "#3F51B5", legendFontColor: "#7F7F7F", legendFontSize: 12 },
      ];

  const chartConfig = {
    backgroundColor: softLightPink,
    backgroundGradientFrom: softLightPink,
    backgroundGradientTo: softLightPink,
    decimalPlaces: 0,
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  };

  return (
    <View>
      <PieChart
        data={chartData}
        width={screenWidth - 16}
        height={250}
        chartConfig={chartConfig}
        accessor="population"
        backgroundColor="transparent"
        paddingLeft="10"
        center={[0, 0]}
        absolute
      />
    </View>
  );
};

export default DonutChartComponent;
