import { View, Text, ScrollView, Appearance } from "react-native";
import React from "react";
import Posts from "@/components/Posts";
import { BellIcon } from "react-native-heroicons/outline";

const colorScheme = Appearance.getColorScheme();

export default function index() {
  console.log("aklım sana karışık mı gelir");
  return (
    <>
      <View className="w-full h-full flex flex-col items-center dark:bg-[#0b0e0f]">
        <View className="w-5/6 relative top-16 left-6 flex flex-row justify-between">
          <Text
            className="font-bold text-3xl relative -left-12  dark:text-white "
            style={{ fontFamily: "SpaceMono" }}
          >
            #Mango
          </Text>
          <BellIcon
            size={30}
            color={colorScheme === "dark" ? "white" : "black"}
          />
        </View>
        <View className="w-full h-full flex flex-col  items-center relative top-20">
          <ScrollView className="w-full h-full  relative  ">
            <Posts
              title="Hello World"
              content="YAZ GELDİ LAN YAZ GÖZLERİM ELAAA GÖZLERİM ELAAAA "
              date="2024-06-05"
              Author="Atalay"
              LikeCount={10}
              AuthorImage="https://picsum.photos/200/300"
              className="shadow-2xl dark:bg-[#191b1f]"
            />
            <Posts
              title="Hello World"
              content="YAZ GELDİ LAN YAZ GÖZLERİM ELAAA GÖZLERİM ELAAAA "
              date="2024-06-05"
              Author="Atalay"
              LikeCount={10}
              AuthorImage="https://picsum.photos/200/300"
              className="shadow-2xl dark:bg-[#191b1f]"
            />
            <Posts
              title="Hello World"
              content="YAZ GELDİ LAN YAZ GÖZLERİM ELAAA GÖZLERİM ELAAAA "
              date="2024-06-05"
              Author="Atalay"
              LikeCount={10}
              AuthorImage="https://picsum.photos/200/300"
              className="shadow-2xl dark:bg-[#191b1f]"
            />
            <Posts
              title="Hello World"
              content="YAZ GELDİ LAN YAZ GÖZLERİM ELAAA GÖZLERİM ELAAAA "
              date="2024-06-05"
              Author="Atalay"
              LikeCount={10}
              AuthorImage="https://picsum.photos/200/300"
              className="shadow-2xl dark:bg-[#191b1f]"
            />
            <View className="w-full h-[30vh] text-center"></View>
          </ScrollView>
        </View>
        {/* <Posts /> */}
      </View>
    </>
  );
}
