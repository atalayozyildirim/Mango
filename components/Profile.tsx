import { View, Text, Image, StyleSheet } from "react-native";
import React from "react";

export default function Profile() {
  return (
    <>
      <View style={styles.container}>
        <Image
          source={{ uri: "https://picsum.photos/200/300" }}
          style={{ width: 45, height: 45, borderRadius: 50 }}
        />
        <Text style={styles.bold}>Atalay Özyıldırım</Text>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    position: "relative",
    top: 60,
    flexDirection: "row",
    left: -100,
    alignItems: "center",
    gap: 8,
  },
  bold: {
    fontWeight: "bold",
  },
});
