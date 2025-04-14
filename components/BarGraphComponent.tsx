import { BarChart } from "react-native-chart-kit";
import { Dimensions, ScrollView, Text, View } from "react-native";
import {
  secondaryColor,
  softLightPink,
  thirdColor,
} from "@/constants/globalStyles";

const screenWidth = Dimensions.get("window").width;

type Props = {
  Xaxis_labels: string[];
  Yaxis_values: number[]
};

const BarChartComponent = ({ Xaxis_labels=[], Yaxis_values=[] }: Props) => {
  const data = {
    labels: Xaxis_labels,
    // labels: ['Medicine', 'Equipment', 'Maintenance', 'Labour', 'Transportation', 'Utilities', 'Marketing', 'Insurance', 'Loan Repayment', 'Other', 'Feed'],
    datasets: [
      {
        data: Yaxis_values,
      },
    ],
  };
  
  return (
    <View>
        {Xaxis_labels.length != 0 && Yaxis_values.length != 0 && Xaxis_labels.length === Yaxis_values.length ? 
          (<BarChart
            data={data}
            width={345} 
            height={250}
            fromZero
            yAxisLabel="₹"
            yAxisSuffix=""
            verticalLabelRotation={20}
            showValuesOnTopOfBars={true}
            showBarTops={true}
            chartConfig={{
              barPercentage: 0.2,
              fillShadowGradient: "transparent",
              fillShadowGradientOpacity: 1,
              backgroundGradientFrom: "yellow",
              backgroundGradientFromOpacity: 1,
              backgroundGradientTo: "lightyellow",
              backgroundGradientToOpacity: 1,
              decimalPlaces: 0,
              color: () => "red",
              labelColor: () => "#333",
              propsForBackgroundLines: {
                stroke: "none",
              },
              propsForVerticalLabels: {
                fontSize: 12,
                transform: [ { translateX: -9 }, { translateY: -8 }],
              },
              propsForHorizontalLabels: {
                fontSize: 12,
                transform: [ { translateX: 0 }]
              }
            }}
            style={{
              marginVertical: 10,
              //   paddingBottom: 30
              borderRadius: 12,
              //   borderColor: thirdColor,
              //   borderWidth: 2,
            }}
          />) : (<Text style={{ alignSelf: 'center', margin: 5 }}>No Bar chart data available</Text>)}
    </View>
  );
};

export default BarChartComponent;
