import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import {
  globalStyle,
  secondaryColor,
  thirdColor,
} from "@/constants/globalStyles";
import TextInputComponent from "@/components/TextInputComponent";
import DropDownTsxComponent from "@/components/dropDownComponent";
import CustomButtonComponent from "@/components/customButtonComponent";
import APICall from "@/utils/CallApi";
import LoadingModal from "@/components/LoadingModal";
import {
  ADD_EXPENDITURE,
  FETCH_EXPENDITURE_BY_ID,
  FETCH_EXPENDITURE_CATEGORIES,
} from "@/constants/endpoints";
import SectionDropDownComponent from "@/components/sectionDropDownComponent";
import PieChartComponent from "@/components/PieChartComponent";
import {
  ExpenditurePageProps,
  ManageExpenditurePageProps,
} from "../navigationTypes";
import { RouteProp, useRoute } from "@react-navigation/native";

type PAYLOAD = {
  amount?: number;
  category?: string;
  category_id?: number;
  description?: string | number;
};

type expenseProps = {
  label: string;
  value: string;
};

type Props = {
  navigation: ManageExpenditurePageProps;
};

type RootStackParamList = {
  ManageExpenditurePage: { id: string };
};

type ManageExpenditureRoute = RouteProp<
  RootStackParamList,
  "ManageExpenditurePage"
>;

const ManageExpenditurePage = ({ navigation }: Props) => {
  const defaultErrors = {
    amount: "",
    category: "",
    description: "",
  };

  const [payload, setPayload] = useState<PAYLOAD>();
  const [expenseOptions, setExpenseOptions] = useState<expenseProps[]>([]);
  const [loading, setLoading] = useState(false);

  const route = useRoute<ManageExpenditureRoute>();
  const { id } = route.params;

  const UpdateExpenditure = async () => {
    setLoading(true);
    const payload_new = {...payload, category: payload?.category_id}
    const response = await APICall({
      method: "PUT",
      Accept: "application/json",
      contentType: "application/json",
      endPoint: FETCH_EXPENDITURE_BY_ID + `${id}/`,
      formData: payload_new,
      showToast: true,
    });
    setLoading(false);
  };

  const DeleteExpenditure = async () => {
    setLoading(true);
    const response = await APICall({
      method: "DELETE",
      Accept: "application/json",
      endPoint: FETCH_EXPENDITURE_BY_ID + `${id}/`,
      showToast: true,
    });
    setLoading(false);
    navigation.goBack();
  };

  useEffect(() => {
    const FetchExpenseById = async () => {
      setLoading(true);
      const response = await APICall({
        method: "GET",
        Accept: "application/json",
        endPoint: FETCH_EXPENDITURE_BY_ID + `${id}/`,
        showToast: false,
      });
      setPayload({
        category: response.category.name,
        category_id: response.category.id,
        amount: response.amount,
        description: response.description,
      });
      
      setLoading(false);
    };
    FetchExpenseById();
  }, []);

  useEffect(() => {
    const FetchExpenseCategories = async () => {
      setLoading(true);
      const response = await APICall({
        method: "GET",
        Accept: "application/json",
        endPoint: FETCH_EXPENDITURE_CATEGORIES,
        showToast: false,
      });
      setExpenseOptions(response);
      setLoading(false);
    };
    FetchExpenseCategories();
  }, []);

  return (
    <View style={globalStyle.container}>
      <LoadingModal visible={loading} />
      <View style={[globalStyle.subContainer]}>
        <Text style={globalStyle.pageHeadingStyle}>Manage Expenditure</Text>
        <TextInputComponent
          placeHolder="Amount"
          multiline={false}
          value={payload?.amount}
          keyboardType="numeric"
          fieldType="number"
          onTextChange={(text) => {
            if (typeof text === "string") {
              const float_text = parseFloat(text);
              setPayload({ ...payload, amount: float_text });
            }
          }}
        />
        <DropDownTsxComponent
          data={expenseOptions}
          placeHolder="Select Reason"
          value={payload?.category}
          search={true}
          searchPlaceholder="Search reason here..."
          optionSelected={(id, text) =>
            setPayload({ ...payload, category_id: id,  category: text})
          }
        />
        <TextInputComponent
          placeHolder="Description"
          multiline={true}
          keyboardType="default"
          value={payload?.description}
          onTextChange={(text) => setPayload({ ...payload, description: text })}
        />
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <CustomButtonComponent
            onSubmit={UpdateExpenditure}
            buttonName="Update"
          />
          <CustomButtonComponent
            onSubmit={DeleteExpenditure}
            buttonName="Delete"
          />
        </View>
      </View>
    </View>
  );
};

export default ManageExpenditurePage;

const styles = StyleSheet.create({});
