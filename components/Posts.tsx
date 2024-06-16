import React, { useState } from "react";
import { View, Text, Image, StyleSheet, Appearance } from "react-native";
import {
  HeartIcon,
  ChatBubbleOvalLeftIcon,
  EllipsisHorizontalIcon,
} from "react-native-heroicons/outline";

interface PostProps {
  title: string;
  content: string;
  date: string;
  Author: string;
  LikeCount: number;
  AuthorImage: String;
  className: string;
  image?: string[];
}

const colorScheme = Appearance.getColorScheme();

export default function Posts(prop: PostProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === (prop.image?.length || 0) - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? (prop.image?.length || 0) - 1 : prevIndex - 1
    );
  };

  return (
    <>
      <View style={styles.container} className={prop.className}>
        <View style={styles.top}>
          <Image
            source={{ uri: "https://picsum.photos/200/300" }}
            style={{
              width: 50,
              height: 50,
              resizeMode: "cover",
              borderRadius: 50,
              marginRight: 10,
            }}
          />
          <Text style={styles.bold}>{prop.Author}</Text>
          <View style={styles.renklensingecelerimiz}>
            <EllipsisHorizontalIcon
              width={24}
              height={24}
              color={colorScheme === "dark" ? "white" : "black"}
            />
          </View>
        </View>
        <View style={styles.content}>
          <Text style={styles.gozlerimela}>{prop.content}</Text>
          {/* {prop.image != null ? (
            <Image
              source={{ uri: prop.image[currentImageIndex] }}
              style={{ width: "100%", height: 200, resizeMode: "cover", borderRadius: 20}}
            />
          ) : null} */}
        </View>
        <View style={styles.iconContainer}>
          <View>
            <HeartIcon width={24} height={24} color={"#f91880"} />
          </View>
          <View>
            <ChatBubbleOvalLeftIcon
              width={24}
              height={24}
              color={colorScheme === "dark" ? "white" : "black"}
            />
          </View>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "auto",
    backgroundColor: colorScheme === "dark" ? "#191b1f" : "#fff",
    color: colorScheme === "dark" ? "#ffffff" : "#000",
    display: "flex",
    borderBottomColor: colorScheme === "dark" ? "#0b0e0f" : "black",
    borderBottomWidth: 2,
    flexDirection: "column",
    alignItems: "center",
    marginBottom: 10,
    fontFamily: "SpaceMono",
    padding: 10,
  },
  top: {
    display: "flex",
    width: "95%",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  bold: {
    fontWeight: "bold",
    color: colorScheme === "dark" ? "#ffffff" : "#000",
    fontSize: 16,
  },
  content: {
    display: "flex",
    width: "95%",
    flexGrow: 1,
    marginTop: 5,
    fontSize: 16,
  },
  iconContainer: {
    display: "flex",
    flexDirection: "row",
    gap: 10,
    width: "95%",
    marginTop: 10,
  },
  gozlerimela: {
    fontFamily: "SpaceMono",
    color: colorScheme === "dark" ? "#ffffff" : "#000",
    marginTop: 5,
  },
  renklensingecelerimiz: {
    display: "flex",
    width: "100%",
    justifyContent: "flex-end",
    position: "relative",
    right: -252,
  },
});
