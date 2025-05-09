import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { globalStyle } from "@/constants/globalStyles";


const CustomersList = () => {
    const l = [
        {
            "id": 1,
            "user": {
                "id": 5,
                "username": "ram",
                "name": "ram",
                "email": null,
                "role": 2
            },
            "subscription": {
                "id": 2,
                "animal": "Cow",
                "product": "Milk",
                "price": 60.0,
                "quantity": 500
            },
            "price_at_subscription": 45.0,
            "start_date": "2025-05-03",
            "end_date": "2025-05-31",
            "delivery_schedule": {
                "evening": 500,
                "morning": 500
            },
            "delivery_agent": {
                "id": 4,
                "username": "kane",
                "name": "kane",
                "email": null,
                "role": 3
            }
        },
        {
            "id": 2,
            "user": {
                "id": 6,
                "username": "customer1",
                "name": "customer1",
                "email": "customer1@yopmail.com",
                "role": 2
            },
            "subscription": {
                "id": 1,
                "animal": "Buffalo",
                "product": "Milk",
                "price": 47.0,
                "quantity": 500
            },
            "price_at_subscription": 47.0,
            "start_date": "2025-05-07",
            "end_date": "2025-05-31",
            "delivery_schedule": {
                "evening": 250,
                "morning": 500
            },
            "delivery_agent": {
                "id": 4,
                "username": "kane",
                "name": "kane",
                "email": null,
                "role": 3
            }
        }
    ]
  return (
    <View style={globalStyle.container}>
      <View style={globalStyle.subContainer}>
        <Text style={globalStyle.pageHeadingStyle}>Customers</Text>
        <View>
            {l.map((item, index) => (
                <View key={index}>
                    <Text>{item.user.username}</Text>
                </View>
            ))}
        </View>
      </View>
    </View>
  );
};

export default CustomersList;

const styles = StyleSheet.create({});
