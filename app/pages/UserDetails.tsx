import { ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { globalStyle } from "@/constants/globalStyles";
import { UserDetailsProps } from "../navigationTypes";
import ImageSelectorComponent from "@/components/Custom/ImageComponent";
import TextInputComponent from "@/components/TextInputComponent";
import LoadingModal from "@/components/LoadingModal";
import APICall from "@/utils/CallApi";

type Props = {
  navigation: UserDetailsProps;
};

type DATA = {
  image?: string,
  username: string,
  name: string
};

const UserDetails = ({ navigation }: Props) => {
  const [image, setImage] = useState("");
  const [data, setData] = useState<DATA>();
  const [loading, setLoading] = useState(false);


  return (
    <View style={globalStyle.container}>
    <LoadingModal visible={loading} />
      <View style={globalStyle.subContainer}>
        <Text style={globalStyle.pageHeadingStyle}>Profile</Text>
        <ScrollView>
            <View style={{ marginLeft: '35%' }}>
                <ImageSelectorComponent image={image} selectImage={(uri) => setImage(uri)} />
            </View>
            <TextInputComponent
                placeHolder="Enter Username"
                multiline={false}
                keyboardType="default"
                value={""}
                onTextChange={(text) => console.log(text, '-------------------')}
            />
        </ScrollView>
      </View>
    </View>
  );
};

export default UserDetails;

const styles = StyleSheet.create({});
