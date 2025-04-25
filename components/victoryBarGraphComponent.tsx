import React, { useState } from "react";
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
import { dataProps } from "@/app/pages/ExpenditureAnalytics";
import { humanReadableNum } from "@/utils/common";

const screenWidth = Dimensions.get("window").width;

type Props = {
  formattedData: dataProps;
  filters: ( year: string, month: string, category?: string ) => void;
};


const VictoryBarChartComponent = ({ formattedData, filters }: Props) => {
  const [ selectedBar, setSelectedBar ] = useState("")

  if (!formattedData || Object.keys(formattedData).length === 0) {
    return <Text>No data available</Text>;
  }

  const handleStrokeColor = (x_label: string) => {
    if (selectedBar === x_label) {
      return "black"
    }
    return "transparent";
  };

  const handleBarClick = (props: any) => {
    if (selectedBar === props.datum.x) {
      setSelectedBar("")  
    }
    else {
      setSelectedBar(props.datum.x)
      filters(formattedData.metadata.year, props.datum.x)
    }
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
            data={formattedData.bar_chart_data}
            style={{
              data: {
                fill: "red",
                width: 10,
                stroke: ({ datum }) => handleStrokeColor(datum.x),
                strokeWidth: 2,
              },
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
                      mutation: (props) => {handleBarClick(props)},
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
