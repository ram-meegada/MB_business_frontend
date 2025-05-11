import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import React, { useCallback, useState } from "react";
import { globalStyle, secondaryColor } from "@/constants/globalStyles";
import CustomButtonComponent from "@/components/customButtonComponent";
import { CustomersListProps } from "../navigationTypes";
import { useFocusEffect } from "@react-navigation/native";
import APICall from "@/utils/CallApi";
import { CUSTOMERS_LIST } from "@/constants/endpoints";
import LoadingModal from "@/components/LoadingModal";

type Props = {
    navigation: CustomersListProps
}

type dataProps = {
    id: number,
    user: { username: string },
    subscription: { animal: string, product: string, price: number, quantity: number },
    price_at_subscription: number,
    start_date: string,
    end_date: string,
    delivery_schedule: {morning: number | null, evening: number | null},
    delivery_agent: {username: string}
}

const CustomersList = ({ navigation }: Props) => {
  const [loading, setLoading] = useState(false)
  const [thisRecordCollapsed, setThisRecordCollapsed] = useState(0);
  const [data, setData] = useState<dataProps[]>()

  function getDeliveryMorningOrEvening(schedule: {
    evening: number | null;
    morning: number | null;
  }) {
    if (schedule.evening && schedule.morning) {
      return "Both";
    } else if (schedule.morning) {
      return "Morning only";
    }
    return "Evening only";
  }

  function openMoreDetails(id: number) {
    if (thisRecordCollapsed == id) {
        setThisRecordCollapsed(0);
    }
    else {
        setThisRecordCollapsed(id);
    }
  }

  useFocusEffect(
    useCallback(() => {
      const FetchAllActiveCustomers = async () => {
        setLoading(true);

        const response = await APICall({
          method: "GET",
          Accept: "application/json",
          endPoint: CUSTOMERS_LIST,
          showToast: false,
          navigation: navigation
        });
        setData(response)
        setLoading(false);
      };
      FetchAllActiveCustomers();
    }, [])
  );

  return (
    <View style={globalStyle.container}>
        <LoadingModal visible={loading} />
      <View style={globalStyle.subContainer}>
        <Text style={globalStyle.pageHeadingStyle}>Customers</Text>
        <CustomButtonComponent 
        onSubmit={() => navigation.navigate("AddCustomer")}
        buttonName="Add Customer"
        addedStyles={{width: 130, marginBottom: 20, alignSelf: 'flex-end', height: 40}}
        />
        <FlatList
          data={data}
          renderItem={({ item, index }) => (
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
                name:{" "}
                <Text style={{ fontWeight: "bold", fontSize: 16 }}>
                  {item.user.username}
                </Text>
              </Text>
              <Text>
                Price at subscription:{" "}
                <Text style={styles.textStyle}>
                  {item.price_at_subscription}/-
                </Text>
              </Text>
              <Text>
                Subscription:{" "}
                <Text style={styles.textStyle}>
                  {item.subscription.animal} {item.subscription.product}{" "}
                  {item.subscription.quantity}ml {item.subscription.price}/-
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
                      Delivery schedule:{" "}
                      <Text>
                        {getDeliveryMorningOrEvening(item.delivery_schedule)}
                      </Text>
                    </Text>
                    <Text>
                      Delivery Agent:{" "}
                      <Text>{item.delivery_agent.username}</Text>
                    </Text>
                    <Text>
                      Start Date: <Text>{item.start_date}</Text>
                    </Text>
                    <Text>
                      End Date: <Text>{item.end_date}</Text>
                    </Text>
                  </View>
                ) : null}
              </Pressable>
            </Pressable>
          )}
        ></FlatList>
      </View>
    </View>
  );
};

export default CustomersList;

const styles = StyleSheet.create({
  textStyle: { fontWeight: "bold" },
});
