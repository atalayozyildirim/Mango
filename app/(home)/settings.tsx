import { View, Text, TextInput, TouchableOpacity } from "react-native";
import React from "react";
import { ArrowLeftStartOnRectangleIcon } from "react-native-heroicons/outline";
import { Switch } from "react-native-gesture-handler";

export default function settings() {
  return (
    <View className="flex justify-center items-center w-full h-full relative top-8">
      <Text className="text-3xl font-bold w-[35vh] ml-2 text-start">
        Settings
      </Text>
      <View className="w-[35vh] h-[55vh] bg-white rounded-xl flex  ml-3 mt-5 items-center dark:bg-[#0b0e0f] relative ">
        <View className="flex w-full flex-row  absolute bottom-5 items-center justify-center gap-2 mt-5 ">
          <TouchableOpacity className="flex flex-row justify-center items-center">
            <ArrowLeftStartOnRectangleIcon size={30} color={"red"} />
            <Text className="dark:text-white font-bold text-md relative ">
              Çıkış yap
            </Text>
          </TouchableOpacity>
        </View>

        <View className="flex justify-center items-center top-10 relative">
          <Text className="font-bold text-2xl">Dark Mode</Text>
          <Switch style={{ position: "relative", left: -1 }} />
        </View>
      </View>
    </View>
  );
}
