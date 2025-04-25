import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import React, { useState } from "react";
import {
  globalStyle,
  placeHolderColor,
  secondaryColor,
  softLightPink,
  thirdColor,
} from "@/constants/globalStyles";
import BarChartComponent from "@/components/BarGraphComponent";
import { FETCH_EXPENDITURE_GRAPH_DATA } from "@/constants/endpoints";
import APICall from "@/utils/CallApi";
import LoadingModal from "@/components/LoadingModal";
import VictoryBarChartComponent from "@/components/victoryBarGraphComponent";
import VictoryPieChartComponent from "@/components/VictoryPieChartComponent";
import DropDownTsxComponent from "@/components/dropDownComponent";
import { Dropdown } from "react-native-element-dropdown";
import { getYearDropDown } from "@/utils/common";

export type dataProps = {
  bar_chart_data: { x: string; y: number }[];
  metadata: {
    year: string;
  };
};

export type PieChartDataProps = {
  pie_chart_data: { x: string; y: number; color: string }[];
  metadata: {
    year: string;
    month?: string;
    category?: string;
  };
};

const ExpenditureAnalytics = () => {
  const [openData, setOpenData] = useState("");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<dataProps[]>();
  const [categoryGraphData, setCategoryGraphData] =
    useState<PieChartDataProps>();
  const [subCategoryGraphData, setSubCategoryGraphData] =
    useState<PieChartDataProps>();

  const handleOptionClick = (option: string) => {
    if (openData !== option) {
      FetchGraphData(option);
      setOpenData(option);
    } else {
      setOpenData("");
    }
  };

  const yearDropDown = getYearDropDown();

  const handleFilter = (year: string, month: string, category?: string) => {
    setCategoryGraphData(undefined);
    setSubCategoryGraphData(undefined);
    FetchGraphData("main_categories_analysis", year, month, category);
  };

  const FetchGraphData = async (
    analyticsType: string,
    year?: string,
    month?: string,
    category?: string
  ) => {
    setLoading(true);

    const payload = {
      analytics_type: analyticsType,
      year: year,
      month: month,
      category: category,
    };

    const response = await APICall({
      method: "POST",
      Accept: "application/json",
      contentType: "application/json",
      endPoint: FETCH_EXPENDITURE_GRAPH_DATA,
      formData: payload,
      showToast: false,
    });
    if (response) {
      if (analyticsType === "monthly_data") {
        setData(response);
      } else if (analyticsType === "main_categories_analysis") {
        setCategoryGraphData(response);
      } else if (analyticsType === "sub_categories_analysis") {
        setSubCategoryGraphData(response);
      }
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
              style={[styles.buttonStyle, globalStyle.shadowEffect]}
            >
              <Text style={{ fontSize: 22 }}>Monthly Expenses Data</Text>
            </Pressable>
            {openData === "monthly_data" ? (
              <VictoryBarChartComponent
                // @ts-ignore
                formattedData={data}
                filters={(year, month, category) =>
                  handleFilter(year, month, category)
                }
              />
            ) : null}
            {openData === "monthly_data" && categoryGraphData ? (
              <VictoryPieChartComponent
                pieChartData={categoryGraphData}
                filters={(year, month, category) =>
                  FetchGraphData(
                    "sub_categories_analysis",
                    year,
                    month,
                    category
                  )
                }
                title={`Category Analysis for year ${categoryGraphData.metadata.year}`}
              />
            ) : null}
            {openData === "monthly_data" &&
            categoryGraphData &&
            subCategoryGraphData ? (
              <VictoryPieChartComponent
                pieChartData={subCategoryGraphData}
                title={`Sub Category analysis of ${subCategoryGraphData.metadata.category} for the year ${subCategoryGraphData.metadata.year}`}
              />
            ) : null}
            <Pressable
              onPress={() => handleOptionClick("year_wise_expenditure")}
              style={[
                styles.buttonStyle,
                globalStyle.shadowEffect,
                { marginTop: 10 },
              ]}
            >
              <Text style={{ fontSize: 22 }}>Year Wise Expenditure</Text>
            </Pressable>
            {openData === "year_wise_expenditure" ? (
              <Dropdown
                style={{marginTop: 10, backgroundColor: 'white', height: 25, width: 100, alignSelf: 'flex-end'}}
                data={yearDropDown}
                labelField="label"
                valueField="value"
                placeholder="Select Year"
                placeholderStyle={{
                  fontWeight: "400",
                  color: placeHolderColor,
                  fontSize: 14,
                }}
                onChange={(text) => {
                  
                }}
                renderItem={(item) => {
                  return <Text>{item.label}</Text>;
                }}
              />
            ) : null}
            {openData === "year_wise_expenditure" ? (
              <VictoryBarChartComponent
                // @ts-ignore
                formattedData={data}
                filters={(year, month, category) =>
                  handleFilter(year, month, category)
                }
              />
            ) : null}
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default ExpenditureAnalytics;

const styles = StyleSheet.create({
  graphStyle: {
    // backgroundColor: "white",
    borderRadius: 10,
  },
  buttonStyle: {
    height: 50,
    backgroundColor: softLightPink,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
  },
});
