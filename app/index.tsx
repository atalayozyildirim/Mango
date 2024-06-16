import { Link } from "expo-router";
import { Text, View, Button, Image } from "react-native";

const index = () => {
  return (
    <>
      <View className="w-full h-full  ">
        <View className="flex justify-center items-start m-auto">
          <View>
            <Image
              source={require("../assets/images/summer.jpg")}
              style={{
                width: 200,
                height: 200,
                borderRadius: 100,
                position: "relative",
                top: -35,
                left: 40,
              }}
            />
          </View>
          <View className="relative -left-6">
            <Text className="text-5xl  font-bold dark:text-white">
              Deniz Serinliği
            </Text>
            <Text className="text-4xl font-bold text-amber-300">
              Yaz Güneşini
            </Text>
            <Text className="text-3xl font-bold dark:text-white">#Paylaş</Text>
          </View>
          <View className="flex flex-row place-items-center justify-center w-full">
            <Text
              className="text-center font-bold text-xl text-white 
            relative top-20 -left-10 bg-amber-300 rounded-2xl p-2 w-[30vh]"
            >
              <Link href={"/login"}>Hemen giriş yap</Link>
            </Text>
          </View>
        </View>
      </View>
    </>
  );
};

export default index;
