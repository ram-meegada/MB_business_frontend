import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Button,
  TouchableOpacity,
  ImageBackground,
  FlatList,
} from "react-native";
import { Audio } from "expo-av";
import { secondPageProps } from "../navigationTypes";

type Props = {
  navigation: secondPageProps
}

const SecondPage:React.FC<Props> = ({ navigation }) => {
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [buttonTitle, setButtonTitle] = useState("Play Audio");

  async function playSound() {
    const { sound } = await Audio.Sound.createAsync(
      require("../../assets/audio/scam_1992_bgm.mp3")
    );
    setSound(sound);
    const status = await getStatus();
    if (!status || ("isPlaying" in status && !status.isPlaying)) {
      await sound.playAsync();
      setButtonTitle("Stop Audio");
    } else {
      await sound.stopAsync();
      setButtonTitle("Play Audio");
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
    <View style={styles.container}>
      <View style={{ backgroundColor: "green" }}>
        <Image
          style={{ height: 150, width: 150 }}
          source={{ uri: "https://reactjs.org/logo-og.png" }}
        />
      </View>
      <View style={{}}>
        <Button title={buttonTitle} onPress={playSound} />
      </View>
      <ImageBackground
        source={{ uri: "https://reactjs.org/logo-og.png" }}
        style={{ width: 100, height: 100 }}
      >
        <Text style={{ color: "blue" }}>Inside</Text>
        <Text style={{ color: "blue" }}>Inside</Text>
        <Text style={{ color: "blue" }}>Inside</Text>
      </ImageBackground>
      <FlatList
        data={[
          {key: 'Devin'},
          {key: 'Dan'},
          {key: 'Dominic'},
          {key: 'Jackson'},
          {key: 'James'},
          {key: 'Joel'},
          {key: 'John'},
          {key: 'Jillian'},
          {key: 'Jimmy'},
          {key: 'Julie'},
        ]}
        renderItem={({item}) => <Text style={styles.item}>{item.key}</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "red",
  },
  box: {
    width: 100,
    height: 100,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
  },
  staticBox: {
    backgroundColor: "red",
    position: "static",
    top: 100,
  },
  relativeBox: {
    backgroundColor: "blue",
    position: "relative",
    top: 40, // Moves down 20px
    // left: 30, // Moves right 30px
  },
  absoluteBox: {
    backgroundColor: "green",
    position: "absolute",
    top: 0, // Moves to top of screen
    right: 0, // Moves to right of screen
  },
  text: {
    color: "white",
    fontWeight: "bold",
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
});


export default SecondPage;
