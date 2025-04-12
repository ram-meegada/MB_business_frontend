import {
  Alert,
  FlatList,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import {
  globalStyle,
  secondaryColor,
  softLightPink,
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
import { ExpenditurePageProps } from "../navigationTypes";

type PAYLOAD = {
  amount?: number;
  category?: number;
  description?: string | number;
};

type errorProps = {
  amount: string;
  category: string;
};

type expenseProps = {
  label: string;
  value: string;
};

type Props = {
  navigation: ExpenditurePageProps
}


const ExpenditurePage = ({ navigation }: Props) => {
  const defaultErrors = {
    amount: "",
    category: "",
    description: "",
  };

  const [payload, setPayload] = useState<PAYLOAD>();
  const [expenseOptions, setExpenseOptions] = useState<expenseProps[]>([]);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<errorProps>(defaultErrors);

  const AddExpenditure = async () => {
    setLoading(true);
    const response = await APICall({
      method: "POST",
      Accept: "application/json",
      contentType: "application/json",
      endPoint: ADD_EXPENDITURE,
      formData: payload,
      showToast: true,
    });
    setLoading(false);
  };

  useEffect(() => {
    const FetchExpenseOptions = async () => {
      try {
        setLoading(true);
        const response = await APICall({
          method: "GET",
          Accept: "application/json",
          endPoint: FETCH_EXPENDITURE_CATEGORIES,
          showToast: false,
        });
        if (response) {
          setExpenseOptions(response);
        }
      }
      catch (err) {
        Alert.alert(String(err))
      }
      finally {
        setLoading(false);
      }
    };
    FetchExpenseOptions();
  }, []);

  return (
    <View style={globalStyle.container}>
      <LoadingModal visible={loading} />
      <View style={[globalStyle.subContainer]}>
        <Text style={globalStyle.pageHeadingStyle}>Add Expenditure</Text>
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
        {errors.amount ? <Text>{errors.amount}</Text> : null}
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
        <CustomButtonComponent onSubmit={AddExpenditure} buttonName="Submit" />
        <Pressable
          onPress={() => navigation.navigate("RecentExpenses")}
          style={[
            {
              height: 50,
              backgroundColor: softLightPink,
              marginTop: 10,
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 8,
            },
            globalStyle.shadowEffect,
          ]}
        >
          <Text style={{ fontSize: 22 }}>View Recent Expenditures</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default ExpenditurePage;

const styles = StyleSheet.create({});
