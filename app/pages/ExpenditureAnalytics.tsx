import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import {
  globalStyle,
  secondaryColor,
  softLightPink,
  thirdColor,
} from "@/constants/globalStyles";
import BarChartComponent from "@/components/BarGraphComponent";
import DonutChartComponent from "@/components/DonutGraphComponent";
import { FETCH_EXPENDITURE_GRAPH_DATA } from "@/constants/endpoints";
import APICall from "@/utils/CallApi";
import LoadingModal from "@/components/LoadingModal";
import VictoryBarChartComponent from "@/components/victoryBarGraphComponent";

type dataProps = {
  x: string;
  y: number;
};

const ExpenditureAnalytics = () => {
  const [openData, setOpenData] = useState("");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<dataProps[]>();

  const handleOptionClick = (option: string) => {
    FetchGraphData(option);
    if (openData !== option) {
      setOpenData(option);
    } else {
      setOpenData("");
    }
  };
  const FetchGraphData = async (analyticsType: string) => {
    setLoading(true);
    const payload = { analytics_type: analyticsType };

    const response = await APICall({
      method: "POST",
      Accept: "application/json",
      contentType: "application/json",
      endPoint: FETCH_EXPENDITURE_GRAPH_DATA,
      formData: payload,
      showToast: false,
    });
    if (response) {
      setData(response);
    }
    setLoading(false);
  };
  return (
    <View style={globalStyle.container}>
      <LoadingModal visible={loading} />
      <View style={globalStyle.subContainer}>
        <Text style={globalStyle.pageHeadingStyle}>Expenditure Analytics</Text>
        <ScrollView>
          <View style={styles.graphStyle}>
            <Pressable
              onPress={() => handleOptionClick("monthly_data")}
              style={[
                {
                  height: 50,
                  backgroundColor: softLightPink,
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: 8,
                },
                globalStyle.shadowEffect,
              ]}
            >
              <Text style={{ fontSize: 22 }}>Monthly Expenses Data</Text>
            </Pressable>
            {openData === "monthly_data" ? (
              <VictoryBarChartComponent formattedData={data || []} />
            ) : null}
            {openData === "monthly_data" ? <DonutChartComponent /> : null}
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default ExpenditureAnalytics;

const styles = StyleSheet.create({
  graphStyle: {
    backgroundColor: "white",
    borderRadius: 10,
  },
});
