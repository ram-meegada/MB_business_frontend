import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import React, { useCallback, useState } from "react";
import { globalStyle, secondaryColor, softLightPink, thirdColor } from "@/constants/globalStyles";
import { useFocusEffect } from "@react-navigation/native";
import APICall from "@/utils/CallApi";
import { PaymentsProps } from "../navigationTypes";
import { PAYMENTS_LIST } from "@/constants/endpoints";
import LoadingModal from "@/components/LoadingModal";

type paymentsDataProps = {
  id: number,
  customer: {name: string, phone_num: string},
  amount_due: number,
  amount_paid: number,
  is_paid: boolean
}

type dataProps = {
  total_payment: number,
  total_paid: number,
  total_due: number,
  data: paymentsDataProps[]
}

type Props = {
    navigation: PaymentsProps
}

const Payments = ({navigation}: Props) => {
  const [loading, setLoading] = useState(false)
  const [thisRecordCollapsed, setThisRecordCollapsed] = useState(0);
  const [data, setData] = useState<dataProps>({data: [], total_payment: 0, total_paid: 0, total_due: 0})

  useFocusEffect(
    useCallback(() => {
      const FetchAllActiveCustomers = async () => {
        setLoading(true);

        const response = await APICall({
          method: "GET",
          Accept: "application/json",
          endPoint: PAYMENTS_LIST,
          showToast: false,
          navigation: navigation
        });
        setData(response)
        setLoading(false);
      };
      FetchAllActiveCustomers();
      
    }, [])
  );

  function openMoreDetails(id: number) {
    if (thisRecordCollapsed == id) {
        setThisRecordCollapsed(0);
    }
    else {
        setThisRecordCollapsed(id);
    }
  }
  return (
    <View style={globalStyle.container}>
      <LoadingModal visible={loading} />
      <View style={globalStyle.subContainer}>
        <Text style={globalStyle.pageHeadingStyle}>Payments</Text>
        <View style={{ backgroundColor: softLightPink }}>
          <Text>Total Payment:- <Text>{data.total_payment}</Text></Text>
          <Text>Total Due:- <Text>{data.total_due}</Text></Text>
          <Text>Total Paid:- <Text>{data.total_paid}</Text></Text>
        </View>
          <FlatList
            data={data.data}
            renderItem={({index,item}) =>
              <Pressable
                key={index}
                style={[
                  {
                    marginBottom: 10,
                    backgroundColor: secondaryColor,
                    padding: 10,
                    borderRadius: 10,
                  },
                  globalStyle.shadowEffect,
                ]}
              >
                <Text>
                  Name:{" "}
                  <Text style={{ fontWeight: "bold", fontSize: 16 }}>
                    {item.customer?.name}
                  </Text>
                </Text>
                <Text>
                  Due Amount:{" "}
                  <Text style={styles.textStyle}>
                    {item.amount_due}
                  </Text>
                </Text>
                <Pressable onPress={() => openMoreDetails(item.id)}>
                  {thisRecordCollapsed !== item.id ?(<Text
                    style={{
                      alignSelf: "center",
                      fontWeight: "500",
                      fontSize: 12,
                      color: "grey",
                    }}
                  >
                    more
                  </Text>) : null}
                  {thisRecordCollapsed === item.id ? (
                    <View>
                      <Text>
                        Amount Paid:{" "}
                        <Text>{item.amount_paid}</Text>
                      </Text>
                      <Text>
                        Phone Number: <Text>{item.customer.phone_num}</Text>
                      </Text>
                    </View>
                  ) : null}
                </Pressable>
              </Pressable>
            }
            keyExtractor={item => item.id.toString()}
          />
      </View>
    </View>
  );
};

export default Payments;

const styles = StyleSheet.create({
  textStyle: { fontWeight: "bold" },
});
