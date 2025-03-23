import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  StatusBar,
  TouchableHighlight,
  Image,
  ImageBackground,
  Pressable,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Audio } from "expo-av";
import { homePageProps } from "../navigationTypes";
import { globalStyle, secondaryColor } from "@/constants/globalStyles";

type Props = {
  navigation: homePageProps;
};

const HomeScreen: React.FC<Props> = ({ navigation }) => {
  const homePageButtons = [
    {
      title: "Add stock",
      backgroundImage: require("../../assets/images/add_buffalo.png"),
      audio: require("../../assets/audio/scam_1992_bgm.mp3"),
      navigateTo: "AddStock",
    },
    {
      title: "Daily data",
      backgroundImage: require("../../assets/images/data_entry.jpg"),
      audio: require("../../assets/audio/animal_bgm.mp3"),
      navigateTo: "AddStock",
    },
    {
      title: "Customers",
      backgroundImage: require("../../assets/images/customers.png"),
      audio: require("../../assets/audio/jim_entry_pathan.mp3"),
      navigateTo: "AddStock",
    },
    {
      title: "Expenditure",
      backgroundImage: require("../../assets/images/expenditure.png"),
      audio: require("../../assets/audio/captain_jacksparrow.mp3"),
      navigateTo: "AddStock",
    },
    {
      title: "Manage Stock",
      backgroundImage: require("../../assets/images/manage_stock.png"),
      audio: require("../../assets/audio/captain_jacksparrow.mp3"),
      navigateTo: "ManageStock",
    },
  ];
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [audioPlaying, setaudioPlaying] = useState(-1);

  const navigateToAddStock = (navigateTo: string) => {
    navigation.navigate(navigateTo);
  };

  async function playSound(n: number, audio: number) {
    const { sound } = await Audio.Sound.createAsync(audio);
    setSound(sound);

    const status = await getStatus();
    if (!status) {
      await sound.playAsync();
      setaudioPlaying(n);
    } else if ("isPlaying" in status) {
      await sound.stopAsync();
      if (audioPlaying == n) {
        setaudioPlaying(-1);
        return;
      } else {
        await sound.playAsync();
        setaudioPlaying(n);
        return;
      }
    }
  }

  const getStatus = async () => {
    const status = await sound?.getStatusAsync();
    return status;
  };

  useEffect(() => {
    return sound
      ? () => {
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  return (
    <View style={globalStyle.container}>
      <ImageBackground
        source={require("../../assets/images/backbuff.png")}
        style={{
          flex: 7,
          overflow: "hidden",
          borderBottomLeftRadius: 20,
          borderBottomRightRadius: 20,
          marginBottom: 30,
        }}
        imageStyle={{ opacity: 0.8 }}
      >
        <View
          style={{
            marginTop: StatusBar.currentHeight
              ? StatusBar.currentHeight + 10
              : 110,
            padding: 10,
            borderRadius: 20,
            flexDirection: "row",
            backgroundColor: "#ffffff90",
            alignItems: "center",
            overflow: "hidden",
          }}
        >
          <Image
            style={{ height: 20, width: 20, marginRight: 10 }}
            source={require("../../assets/images/location.png")}
          />
          <View style={{ flex: 1 }}>
            <Text style={{ fontWeight: "bold", fontSize: 18 }}>Home</Text>
            <Text numberOfLines={1} style={{ fontWeight: "500" }}>
              403 room no, samskruthi pg for gents, 88, koramangala
            </Text>
          </View>
          <Image
            style={{ height: 40, width: 40, borderRadius: 20 }}
            source={require("../../assets/images/ram_profile.png")}
          />
        </View>
      </ImageBackground>
      <View
        style={{
          flex: 13,
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "space-evenly",
          // alignItems: 'center'
          // alignContent: "flex-start",
        }}
      >
        {homePageButtons.map((key, index) => (
          <View
            style={{
              alignItems: "center",
              marginBottom: 20,
              // marginRight: 8
            }}
            key={index}
          >
            <Pressable onPress={() => navigateToAddStock(key.navigateTo)}>
              <ImageBackground
                style={styles.buttons}
                source={key.backgroundImage}
                imageStyle={{ opacity: 0.5 }}
              >
                {/* <Text style={styles.buttonTe-xt}>{key.title}</Text> */}
                <Pressable onPress={() => playSound(index, key.audio)}>
                  <Image
                    style={{
                      height: 20,
                      width: 20,
                      borderRadius: 10,
                      borderColor: "tomato",
                      borderWidth: 2,
                    }}
                    source={
                      audioPlaying == index
                        ? require("../../assets/images/off_audio.png")
                        : require("../../assets/images/on_audio.png")
                    }
                  />
                </Pressable>
              </ImageBackground>
            </Pressable>
            <Pressable onPress={() => navigateToAddStock(key.navigateTo)}>
              <View
                style={{
                  backgroundColor: secondaryColor,
                  width: 100,
                  height: 30,
                  borderBottomLeftRadius: 10,
                  borderBottomRightRadius: 10,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text numberOfLines={1} style={{ alignSelf: "center" }}>
                  {key.title}
                </Text>
              </View>
            </Pressable>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  buttons: {
    backgroundColor: "#ffffff",
    width: 100,
    height: 100,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderColor: secondaryColor,
    borderWidth: 2,
    marginHorizontal: 10,
    overflow: "hidden",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  buttonText: {
    fontSize: 24,
    color: "#050dfa",
    fontWeight: "bold",
  },
});

export default HomeScreen;
