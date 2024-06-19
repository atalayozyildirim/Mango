import { View, Text, TextInput, Appearance } from "react-native";
import React from "react";
import { PhotoIcon } from "react-native-heroicons/outline";
import { LinkIcon } from "react-native-heroicons/solid";

const colorScheme = Appearance.getColorScheme();

export default function addpost() {
  const pickImage = () => {
    alert("Fotoğraf Seç");
  };
  return (
    <>
      <Text className="text-3xl font-bold  w-full relative  top-64 ml-4 dark:text-white ">
        #Yeni Gönderi
      </Text>
      <View className="w-full h-full flex justify-center items-center dark:bg-[#0b0e0f]">
        <TextInput
          placeholder="Bir şey yaz"
          multiline={true}
          maxLength={500}
          className="border-b-2 border-black bg-white  p-2 w-full h-[20vh] dark:bg-[#191b1f]"
          placeholderTextColor={colorScheme === "dark" ? "white" : "black"}
        />
        <View className="flex flex-row gap-5 w-full  justify-start mt-2 ">
          <PhotoIcon
            size={25}
            color={colorScheme === "dark" ? "white" : "black"}
            onPress={pickImage}
          />
          <LinkIcon
            size={25}
            color={colorScheme === "dark" ? "white" : "black"}
          />
        </View>
        <View className="flex flex-row gap-5 w-full  justify-end ">
          <Text className="w-32 p-2 relative left-1 bg-black dark:bg-white dark:text-black   text-white text-center rounded-3xl">
            Paylaş
          </Text>
        </View>
      </View>
    </>
  );
}
