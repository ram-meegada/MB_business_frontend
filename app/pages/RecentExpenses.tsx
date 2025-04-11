import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState, useCallback } from "react";
import { globalStyle, secondaryColor } from "@/constants/globalStyles";
import APICall from "@/utils/CallApi";
import { ADD_EXPENDITURE } from "@/constants/endpoints";
import LoadingModal from "@/components/LoadingModal";
import { RecentExpensesProps } from "../navigationTypes";
import { useFocusEffect } from "@react-navigation/native";


type categoryProps = {
  id: number,
  parent: string,
  parent_id: number,
  name: string
}

type recentExpensesProps = {
  id: number;
  amount?: number;
  category?: categoryProps;
  description?: string;
  created_at?: string;
};

type Props = {
  navigation: RecentExpensesProps;
};

const RecentExpenses = ({ navigation }: Props) => {
  const [recentExpenses, setRecentExpenses] = useState<recentExpensesProps[]>(
    []
  );
  const [loading, setLoading] = useState(false);
  const [numberOfLines, setNumberOfLines] = useState(0)

  useFocusEffect(
    useCallback(() => {
      const FetchRecentExpenses = async () => {
        setLoading(true);

        const response = await APICall({
          method: "GET",
          Accept: "application/json",
          endPoint: ADD_EXPENDITURE,
          showToast: false,
        });
        setRecentExpenses(response);
        setLoading(false);
      };
      FetchRecentExpenses();
    }, [])
  )

  const onDescClick = (id:number) => {
    id === numberOfLines ? setNumberOfLines(0) : setNumberOfLines(id)
  };

  const onNavigation = (id: number) => {
    navigation.navigate('ManageExpenditurePage', {id: id})
  }

  return (
    <View style={globalStyle.container}>
      <LoadingModal visible={loading} />
      <View style={[globalStyle.subContainer]}>
        <Text style={globalStyle.pageHeadingStyle}>Recent Expenses</Text>
        <FlatList
          data={recentExpenses}
          renderItem={({ item, index }) => (
            <Pressable
              onPress={() => onNavigation(item.id)}
              style={[
                {
                  margin: 10,
                  backgroundColor: secondaryColor,
                  padding: 10,
                },
                globalStyle.shadowEffect,
              ]}
            >
              <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                {item.category?.name} ({item.category?.parent})
              </Text>
              <Text style={{ fontSize: 16, fontWeight: "bold" }}>
                {item.amount} /-
              </Text>
              <Pressable onPress={() => onDescClick(item.id)} style={{  }}>
                <Text
                  numberOfLines={item.id === numberOfLines ? 0 : 3}
                  style={{ fontSize: 14 }}
                >
                  {item.description}
                </Text>
              </Pressable>
              <Text></Text>
              <Text>{item.created_at}</Text>
            </Pressable>
          )}
        ></FlatList>
      </View>
    </View>
  );
};

export default RecentExpenses;

const styles = StyleSheet.create({});
