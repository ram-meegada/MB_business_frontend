import React from "react";
import { View, Text, Dimensions } from "react-native";
import {
  VictoryBar,
  VictoryChart,
  VictoryTheme,
  VictoryAxis,
} from "victory-native";
import Svg from "react-native-svg";
import {
  secondaryColor,
  softLightPink,
  thirdColor,
} from "@/constants/globalStyles";

const screenWidth = Dimensions.get("window").width;

type Props = {
  formattedData: { x: string; y: number }[];
};

const VictoryBarChartComponent = ({ formattedData }: Props) => {
  if (formattedData.length === 0) {
    return <Text>No data available</Text>;
  }

  function humanReadableNum(num: number) {
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + "K";
    } else if (num >= 100000) {
      return (num / 100000).toFixed(1) + "L";
    } else if (num >= 10000000) {
      return (num / 10000000).toFixed(1) + "Cr";
    }
    return num;
  }

  return (
    <View
      style={{
        backgroundColor: "lightyellow",
        borderRadius: 12,
        padding: 10,
        marginVertical: 10,
      }}
    >
      <Svg width={screenWidth} height={250}>
        <VictoryChart
          standalone={false}
          width={screenWidth - 20}
          height={250}
          theme={VictoryTheme.material}
          domainPadding={{ x: 5 }}
        >
          <VictoryAxis
            style={{
              tickLabels: {
                fontSize: 12,
                angle: 30,
                padding: 10,
                fill: "#333",
              },
              axis: {},
            }}
          />
          <VictoryAxis
            dependentAxis
            tickFormat={(y) => `₹${humanReadableNum(y)}`}
            style={{
              tickLabels: { fontSize: 10, fill: "#333" },
              axis: {},
            }}
          />
          <VictoryBar
            data={formattedData}
            style={{
              data: { fill: "red", width: 10, stroke: "black", strokeWidth: 2 },
              labels: { fontSize: 10 },
            }}
            labels={({ datum }) => `${humanReadableNum(datum.y)}`}
            events={[
              {
                target: "data",
                eventHandlers: {
                  onPressIn: () => [
                    {
                      target: "data",
                      mutation: (props) => {
                        console.log("Bar clicked:", props.datum);
                        return null;
                      },
                    },
                  ],
                },
              },
            ]}
          />
        </VictoryChart>
      </Svg>
    </View>
  );
};

export default VictoryBarChartComponent;
