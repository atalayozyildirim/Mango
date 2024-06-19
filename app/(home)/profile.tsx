import { View, Text, Image, Appearance } from "react-native";
import React from "react";
import Posts from "@/components/Posts";
import { PencilIcon } from "react-native-heroicons/outline";

const colorScheme = Appearance.getColorScheme();

interface ProfileProps {
  Name: string;
  image: string;
  job: string;
  age: number;
  city: string;
  content: string;
}

export default function profile(props: ProfileProps) {
  return (
    <View className="w-full h-full justify-center items-center dark:bg-[#0b0e0f]">
      <View className="w-full h-full ">
        <View className="bg-amber-200 w-full h-48  relative  rounded-b-3xl">
          <View className="flex justify-center items-center absolute  w-full h-full -bottom-24">
            <Image
              source={{ uri: props.image || "https://picsum.photos/200/300" }}
              style={{
                width: 80,
                height: 80,
                resizeMode: "cover",
                borderRadius: 50,
                marginRight: 10,
              }}
            />
          </View>
        </View>
        {
          <PencilIcon
            color="black"
            className="dark:text-white dark:bg-white"
            size={24}
            style={{ position: "absolute", top: 50, right: 30 }}
          />
        }
        <View className="relative top-16 flex justify-center items-center w-full h-auto">
          <Text className="font-bold text-center text-2xl dark:text-white">
            {props.Name || "Atalay Özyıldırım"}
          </Text>
        </View>

        <View className="w-full h-20 bg-white shadow-2xl rounded-2xl relative top-24 flex container dark:bg-[#191b1f]  items-center p-4">
          <View className="flex w-full flex-row items-center relative top-4 -left-4  gap-8">
            <Text className="font-bold dark:text-white">
              {props.job || "Meslek girilmemiş"}
            </Text>
            <Text className="font-bold dark:text-white">
              {props.age || "Yaş girilmemiş"}
            </Text>
            <Text className="font-bold dark:text-white">
              {props.city || "Şehir girilmemiş"}
            </Text>
          </View>
        </View>
        <View className="w-cull h-36 bg-white dark:bg-[#191b1f] shadow-2xl rounded-2xl relative top-24 mt-5 flex  p-5  ">
          <View className="flex flex-row justify-start items-center relative ml-2  flex-grow">
            <Text className="flex flex-grow-1 text dark:text-white ">
              {props.content && props.content.length > 350
                ? props.content.slice(0, 350)
                : props.content ||
                  "ELA GÖZLERİM ELA GÖZLERİM ELAAAAA YALAN SÖLEEM GÖZLERİM ELA"}
            </Text>
          </View>
        </View>
        {/* if user not authorized show the posts x user  */}
        {/* <Text className="flex justify-start relative top-28 ml-1 text-2xl font-bold">
          #Post
        </Text>
        <View className="w-full bg-white  flex justify-start relative rounded-2xl top-28  top">
          <Posts
            title="Hello World"
            content="YAZ GELDİ LAN YAZ GÖZLERİM ELAAA GÖZLERİM ELAAAA "
            date="2024-06-05"
            image="https://picsum.photos/200/300"
            Author="Atalay"
            LikeCount={10}
            AuthorImage="https://picsum.photos/200/300"
            className="shadow-2xl "
          />
        </View> */}
      </View>
    </View>
  );
}
