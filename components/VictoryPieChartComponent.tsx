import React, { useState } from "react";
import { View, Text, Dimensions } from "react-native";
import { VictoryPie } from "victory-native";
import { softLightPink } from "@/constants/globalStyles";
import { humanReadableNum } from "@/utils/common";
import { PieChartDataProps } from "@/app/pages/ExpenditureAnalytics";

const screenWidth = Dimensions.get("window").width;

type Props = {
  pieChartData: PieChartDataProps,
  filters?: (year: string, month?: string, category?: string) => void;
  title: string
}

const VictoryPieChartComponent = ( { pieChartData, filters, title="" }: Props ) => {
  const chartData = pieChartData ? pieChartData.pie_chart_data : []

  if (chartData?.length === 0) {
    return (<Text style={{ alignSelf: 'center', fontWeight: 'bold' }}>No data available</Text>)
  }
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const calculatePercentage = (y_amount: number) => {
    const total = chartData.reduce((total, curr) => {
      return total + curr.y;
    }, 0);

    const amountPercentage = ((y_amount / total) * 100).toFixed(1);

    return amountPercentage;
  };
  return (
    <View
      style={{
        flexDirection: "column",
        backgroundColor: "lightyellow",
        // padding: 16,
        borderRadius: 16,
        marginBottom: 10
        // justifyContent: "space-between",
      }}
    >
      <VictoryPie
        data={chartData}
        width={screenWidth * 0.9}
        height={250}
        colorScale={chartData.map((item) => item.color)}
        labels={({ datum }) => `₹${humanReadableNum(datum.y)}`}
        style={{
          data: {
            fillOpacity: ({ index }) => (selectedIndex === index ? 1 : 0.8),
            stroke: ({ index }) => (selectedIndex === index ? "#000" : "none"),
            strokeWidth: ({ index }) => (selectedIndex === index ? 2 : 0),
          },
          labels: {
            fill: "black",
            fontSize: 12,
            fontWeight: "bold",
          },
        }}
        events={[
          {
            target: "data",
            eventHandlers: {
              onPressIn: (evt, props) => {
                if (selectedIndex === props.index) {
                  setSelectedIndex(null)
                }
                else {
                  setSelectedIndex(props.index);
                  filters?.(pieChartData.metadata.year, pieChartData.metadata.month, props.datum.x)
                }
                return null;
              },
            },
          },
        ]}
      />
      <Text style={{ alignSelf: 'center', fontWeight: 'bold' }}>{title}</Text>

      <View style={{ marginLeft: 10, flexDirection: "row", flexWrap: 'wrap', justifyContent: 'center' }}>
        {chartData.map((item, index) => (
          <View
            key={index}
            style={{
              flexDirection: "row",
              marginBottom: 6,
              alignItems: "center",
              marginRight: 10
            }}
          >
            <View
              style={{
                width: 12,
                height: 12,
                backgroundColor: item.color,
                borderRadius: 2,
                marginRight: 6,
              }}
            />
            <Text style={{ fontSize: 12, color: "#333" }}>
              {item.x} ({calculatePercentage(item.y)}%)
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
};

export default VictoryPieChartComponent;
