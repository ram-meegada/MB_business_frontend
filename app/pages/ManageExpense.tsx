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
  category?: number;
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

//   const AddExpenditure = async () => {
//     setLoading(true);
//     const response = await APICall({
//       method: "POST",
//       Accept: "application/json",
//       contentType: "application/json",
//       endPoint: ADD_EXPENDITURE,
//       formData: payload,
//       showToast: true,
//     });
//     setLoading(false);
//   };

  return (
    <View style={globalStyle.container}>
      <LoadingModal visible={loading} />
      <View style={[globalStyle.subContainer]}>
        <Text style={globalStyle.pageHeadingStyle}>Manage Expenditure</Text>
        <TextInputComponent
          placeHolder="Amount"
          multiline={false}
          keyboardType="numeric"
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
          search={true}
          searchPlaceholder="Search reason here..."
          optionSelected={(text) => setPayload({ ...payload, category: text })}
        />
        <TextInputComponent
          placeHolder="Description"
          multiline={true}
          keyboardType="default"
          onTextChange={(text) => setPayload({ ...payload, description: text })}
        />
        {/* <CustomButtonComponent onSubmit={AddExpenditure} buttonName="Save" /> */}
      </View>
    </View>
  );
};

export default ManageExpenditurePage;

const styles = StyleSheet.create({});
