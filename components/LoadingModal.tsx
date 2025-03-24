// components/LoadingModal.js
import React from "react";
import { Modal, View, ActivityIndicator, Text, StyleSheet } from "react-native";

type Props = {
    visible: boolean
}

const LoadingModal: React.FC<Props> = ({ visible }) => {
  return (
    <Modal transparent visible={visible}>
      <View style={styles.overlay}>
        <ActivityIndicator size="large" color="#fff" />
        <Text style={styles.text}>Loading...</Text>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  text: { color: "#fff", fontSize: 18, marginTop: 10 },
});

export default LoadingModal;
