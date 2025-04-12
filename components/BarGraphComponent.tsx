import { BarChart } from "react-native-chart-kit";
import { Dimensions, ScrollView } from "react-native";
import {
  secondaryColor,
  softLightPink,
  thirdColor,
} from "@/constants/globalStyles";

const screenWidth = Dimensions.get("window").width;

type Props = {
    labels: string[];

}

const BarChartComponent = () => {
  const data = {
    labels: [
      "FEED",
      "MEDC",
      "MNTC",
      "TRANS",
      "LABOR",
      "EQPT",
      "UTIL",
      "MRKTG",
      "INSRC",
      "LOAN",
      "OTHER",
    ],
    // labels: ['Medicine', 'Equipment', 'Maintenance', 'Labour', 'Transportation', 'Utilities', 'Marketing', 'Insurance', 'Loan Repayment', 'Other', 'Feed'],
    datasets: [
      {
        data: [
          4000, 2000, 1500, 3000, 6000, 10000, 2000, 1500, 3000, 6000, 10000,
        ],
      },
    ],
  };
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      <BarChart
        data={data}
        width={data.labels.length * 60} // Dynamic width based on number of labels
        height={250}
        fromZero
        yAxisLabel="₹"
        yAxisSuffix=""
        // verticalLabelRotation={10}
        chartConfig={{
          fillShadowGradient: thirdColor,
          fillShadowGradientOpacity: 1,
          backgroundColor: softLightPink,
          backgroundGradientFrom: softLightPink,
          backgroundGradientTo: softLightPink,
          decimalPlaces: 0,
          color: () => thirdColor,
          labelColor: () => "#333",
          propsForBackgroundLines: {
            stroke: "none",
          },
          propsForVerticalLabels: {
            fontSize: 10,
          },
        }}
        style={{
          marginVertical: 10,
          //   paddingBottom: 30
          borderRadius: 12,
          borderColor: thirdColor,
          borderWidth: 2,
        }}
      />
    </ScrollView>
  );
};

export default BarChartComponent;
