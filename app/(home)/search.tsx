import { View, Text, TextInput } from "react-native";
import React from "react";

export default function search() {
  return (
    <View className="w-full h-full flex relative  items-center dark:bg-[#0b0e0f] ">
      <TextInput
        placeholder="Kullanıcı veya post ara"
        className="w-80 p-2 border-2 border-black bg-white shadow-2xl rounded-2xl relative top-28 dark:border-white"
      />

      <View className="w-full h-full searchField flex mt-10 items-center"></View>
    </View>
  );
}
