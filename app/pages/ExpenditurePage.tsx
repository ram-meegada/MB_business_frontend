import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { globalStyle } from "@/constants/globalStyles";
import TextInputComponent from "@/components/TextInputComponent";
import DropDownTsxComponent from "@/components/dropDownComponent";
import { expenditureChoices } from "@/constants/inputFields";
import CustomButtonComponent from "@/components/customButtonComponent";
import APICall from "@/utils/CallApi";
import LoadingModal from "@/components/LoadingModal";
import { ADD_EXPENDITURE } from "@/constants/endpoints";

type PAYLOAD = {
  amount?: number;
  category?: string;
};

type errorProps = {
  amount: string;
  category: string;
};

const ExpenditurePage = () => {
  const defaultErrors = {
    amount: "",
    category: "",
  };
  const [payload, setPayload] = useState<PAYLOAD>();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<errorProps>(defaultErrors);

  const AddExpenditure = async () => {
    setLoading(true);
    const response = await APICall(
      payload,
      "POST",
      "application/json",
      "application/json",
      ADD_EXPENDITURE
    );
    setLoading(false);
  };

  return (
    <View style={globalStyle.container}>
      <LoadingModal visible={loading} />
      <View style={globalStyle.subContainer}>
        <Text style={globalStyle.pageHeadingStyle}>Add Expenditure</Text>
        <TextInputComponent
          placeHolder="Amount"
          multiline={false}
          keyboardType="numeric"
          onTextChange={(text) => {
            const floatText = parseFloat(text);
            setPayload({ ...payload, amount: floatText });
          }}
        />
        {errors.amount ? <Text>{errors.amount}</Text> : null}
        <DropDownTsxComponent
          data={expenditureChoices}
          placeHolder="Select Reason"
          search={true}
          searchPlaceholder="Search reason here..."
          optionSelected={(text) => setPayload({ ...payload, category: text })}
        />
        <CustomButtonComponent onSubmit={AddExpenditure} buttonName="Save" />
      </View>
    </View>
  );
};

export default ExpenditurePage;

const styles = StyleSheet.create({});
