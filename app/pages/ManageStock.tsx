import {
  Alert,
  FlatList,
  Image,
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import {
  globalStyle,
  secondaryColor,
  sideHeadingColor,
  textColor,
  thirdColor,
} from "@/constants/globalStyles";
import { BASE_URL, LIST_STOCKS_ENDPOINT } from "@/constants/endpoints";
import { BEARER_TOKEN } from "@/constants/common";

type dataStructure = {
  id: number;
  live_stock_id: number;
  image_url: string | null;
  breed: string;
  age: string;
  milk_capacity: number;
  parity: number;
};

const ManageStock = () => {
  const [data, setData] = useState<dataStructure[]>([]);

  useEffect(() => {
    const callAPI = async () => {
      const response = await fetch(`${LIST_STOCKS_ENDPOINT}`, {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${BEARER_TOKEN}`,
        },
      });
      console.log(response.status);

      if (response.ok) {
        const json_response = await response.json();
        setData(json_response.data);
      } else {
        Alert.alert("Error", "Something went wrong");
      }
    };
    callAPI();
  }, []);

  return (
    <View style={globalStyle.container}>
      <View style={globalStyle.subContainer}>
        <Text style={globalStyle.pageHeadingStyle}>Livestock Management</Text>
        <FlatList
          data={data}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item, index }) => (
            <View style={styles.child}>
              <Pressable style={{ width: 150 }}>
                <Image
                  style={{
                    height: styles.child.height,
                    borderTopLeftRadius: styles.child.borderRadius,
                    borderBottomLeftRadius: styles.child.borderRadius,
                  }}
                  source={{ uri: `${BASE_URL}${item?.image_url}` }}
                />
              </Pressable>
              <Pressable
                style={{
                  flex: 1,
                  borderTopRightRadius: styles.child.borderRadius,
                  borderBottomRightRadius: styles.child.borderRadius,
                  paddingLeft: 5,
                  paddingTop: 5,
                }}
              >
                <View style={styles.textStyle}>
                  <Text style={styles.sideHeading}>Stock Id:</Text>
                  <Text style={styles.mainText}>{item.live_stock_id}</Text>
                </View>
                <View style={styles.textStyle}>
                  <Text style={styles.sideHeading}>Breed:</Text>
                  <Text style={styles.mainText}>{item.breed}</Text>
                </View>
                <View style={styles.textStyle}>
                  <Text style={styles.sideHeading}>Age:</Text>
                  <Text style={styles.mainText}>{item.age}</Text>
                </View>
                <View style={styles.textStyle}>
                  <Text style={styles.sideHeading}>Milk Capacity:</Text>
                  <Text style={styles.mainText}>{item.milk_capacity}</Text>
                </View>
                <View style={styles.textStyle}>
                  <Text style={styles.sideHeading}>Parity:</Text>
                  <Text style={styles.mainText}>{item.parity}</Text>
                </View>
              </Pressable>
            </View>
          )}
        />
      </View>
    </View>
  );
};

export default ManageStock;

const styles = StyleSheet.create({
  child: {
    height: 200,
    backgroundColor: secondaryColor,
    margin: 10,
    borderRadius: 10,
    flexDirection: "row",
  },
  textStyle: {
    flexDirection: "row",
    backgroundColor: "#f0fcfc",
    marginBottom: 5,
    width: 165,
    borderRadius: 8,
    padding: 2,
  },
  sideHeading: { color: sideHeadingColor, marginRight: 3 },
  mainText: { color: textColor, fontWeight: "600" },
});
