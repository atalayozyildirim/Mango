import React from "react";
import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import { Link, router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Config } from "@/config/config";

const login: React.FC = () => {
  const [Email, setEmail] = React.useState("");
  const [Password, setPassword] = React.useState("");
  const [error, setError] = React.useState({ false: false, message: "" });
  const [disable, setDisabled] = React.useState(false);

  const onLogin = async () => {
    const Login = await fetch(Config.API_URL + "auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: Email,
        password: Password,
      }),
    });
    const response = await Login;

    if (response.status !== 200) {
      setDisabled(false);
      setError({ false: true, message: "Kullanıcı adı veya şifre hatali" });
      return alert("Kullanıcı adı veya şifre hatali");
    }
    setDisabled(true);
    const data = await response.json();
    await AsyncStorage.setItem("user", JSON.stringify(data));
    router.push("/home");
    return data;
  };

  return (
    <>
      <View className="w-full h-full justify-center items-center  relative -top-10 dark:bg-[#0b0e0f]">
        <Text className="text-4xl font-bold flex justify-start w-[35vh] -mt-2 dark:text-white">
          Giriş yap
        </Text>
        <TextInput
          placeholder="Email"
          keyboardType="email-address"
          className="p-2 m-2 bg-white w-[35vh]  focus:border-2 focus:border-black   dark:bg-[#191b1f] rounded-md"
          placeholderTextColor="#000"
          onChange={(e) => {
            setEmail(e.nativeEvent.text);
          }}
        />
        <TextInput
          placeholder="Password"
          secureTextEntry={true}
          className="w-[35vh] p-2 m-2 bg-white  focus:border-2 focus:border-black dark:bg-[#191b1f] rounded-md"
          placeholderTextColor="#000"
          onChange={(e) => {
            setPassword(e.nativeEvent.text);
          }}
        />
        <TouchableOpacity
          className="bg-black p-3 w-[35vh] mt-5 font-bold  dark:bg-white"
          onPress={onLogin}
        >
          <Text className="text-center text-white dark:text-black">
            Giriş yap
          </Text>
        </TouchableOpacity>
        <View className="w-[35vh] flex  flex-row justify-between  mt-3 ">
          <Text className="font-bold dark:text-white">Şifreyi unutum </Text>
          <Link href="/register">
            <Text className="font-bold dark:text-white">Hesabin yok mu ?</Text>
          </Link>
        </View>
        <Text className="text-xl font-bold mt-2 dark:text-white">OR</Text>
        <TouchableOpacity onPress={() => {}}>
          <View className="w-[35vh] flex flex-row justify-start gap-2 mt-3">
            <View className="bg-white container flex justify-center items-center  border-2  shadow-md border-blue-100  w-[5vh] h-[5vh]   rounded-lg">
              <Image
                source={require("../../assets/images/google.png")}
                style={{ width: 30, height: 30, resizeMode: "contain" }}
              />
            </View>
          </View>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default login;
