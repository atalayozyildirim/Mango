import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Image,
  Appearance,
} from "react-native";
import { Link } from "expo-router";
import React from "react";

const colorScheme = Appearance.getColorScheme();

export default function register() {
  return (
    <>
      <View className="flex flex-col w-full h-full justify-center items-center -mt-10 z-20 dark:bg-[#0b0e0f]">
        <Text className="font-bold text-4xl w-[35vh] flex justify-start relative -top-5 dark:text-white">
          Kayıt ol
        </Text>
        <View>
          <TextInput
            placeholder="Name"
            className="p-2 m-2 bg-white w-[35vh]  focus:border-2 focus:border-black  rounded-md dark:bg-[#191b1f]"
            placeholderTextColor={colorScheme === "dark" ? "#fff" : "#000"}
          />
          <TextInput
            placeholder="Email"
            keyboardType="email-address"
            className="p-2 m-2 bg-white w-[35vh]  focus:border-2 focus:border-black  rounded-md dark:bg-[#191b1f]"
            placeholderTextColor={colorScheme === "dark" ? "#fff" : "#000"}
          />
          <TextInput
            placeholder="Phone number"
            keyboardType="phone-pad"
            className="p-2 m-2 bg-white w-[35vh]  focus:border-2 focus:border-black  rounded-md dark:bg-[#191b1f]"
            placeholderTextColor={colorScheme === "dark" ? "#fff" : "#000"}
          />
          <TextInput
            placeholder="Password"
            secureTextEntry={true}
            className="p-2 m-2 bg-white w-[35vh]  focus:border-2 focus:border-black  rounded-md dark:bg-[#191b1f]"
            placeholderTextColor={colorScheme === "dark" ? "#fff" : "#000"}
          />
          <TextInput
            placeholder="Confirm password"
            secureTextEntry={true}
            className="p-2 m-2 bg-white w-[35vh]  focus:border-2 focus:border-black  rounded-md dark:bg-[#191b1f]"
            placeholderTextColor={colorScheme === "dark" ? "#fff" : "#000"}
          />
        </View>
        <TouchableOpacity className="bg-black p-3 w-[35vh] mt-5 font-bold  rounded-lg">
          <Text className="text-center text-white dark:text-white">
            Register
          </Text>
        </TouchableOpacity>
        <Text className="w-[35vh] flex justify-start mt-3 font-bold dark:text-white">
          <Link href="/login">Do you have Account ?</Link>
        </Text>
        <Text className="text-xl font-bold mt-2 dark:text-white">OR</Text>
        <View className="w-[35vh] flex flex-row justify-start gap-2 mt-3 ">
          <View className="bg-white container flex justify-center items-center  border-2  shadow-md border-blue-100  w-[5vh] h-[5vh]   rounded-lg">
            <Image
              source={require("../../assets/images/google.png")}
              style={{ width: 30, height: 30, resizeMode: "contain" }}
            />
          </View>
        </View>
      </View>
    </>
  );
}
