import { View, Text, Image, Appearance, FlatList } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React from "react";
import Posts from "@/components/Posts";
import { PencilSquareIcon } from "react-native-heroicons/outline";
import { ScrollView } from "react-native-gesture-handler";

const colorScheme = Appearance.getColorScheme();

export default function profile() {
  const [data, setData] = React.useState<any>(null);
  const [myPosts, setMyPosts] = React.useState<any>([]);

  React.useEffect(() => {});

  React.useEffect(() => {
    const userData = async () => {
      try {
        const value: any = await AsyncStorage.getItem("user");
        if (value !== null) {
          const parsedValue = JSON.parse(value);
          setData(parsedValue);
          console.warn(parsedValue);
        }
      } catch (e) {
        console.log(e);
      }
    };
    userData();
    console.log(data);
  }, []);
  return (
    <>
      <ScrollView>
        <View className="w-full h-[6vh] "></View>
        <PencilSquareIcon
          size={25}
          color="black"
          style={{ position: "absolute", right: 15, top: 50 }}
        />
        <View className="w-full h-36 flex flex-col justify-center items-center ">
          <Image
            source={require("../../assets/images/avatar.png")}
            style={{ width: 85, height: 85, borderRadius: 50 }}
          />
          <Text className="text-3xl font-bold dark:text-white mt-3">
            {data?.user?.name}
          </Text>
        </View>
        <View className="w-full h-14 flex flex-row justify-center items-center dark:text-white ">
          <Text className="text-xl  grow- dark:text-white">
            {data?.user?.content?.length > 350
              ? data?.user?.content.slice(0, 350)
              : data?.user?.content || "Hmmmmm ..."}
          </Text>
        </View>
        <View className="w-full  flex flex-row justify-center items-center gap-2 mt-6 relative">
          <Text className="w-40 rounded-xl p-3 bg-sky-100 border-2 text-center border-black font-bold text-md">
            ne işe yarıcak
          </Text>
          <Text className="w-40 rounded-xl p-3 bg-amber-100 border-2 text-center border-black font-bold text-md">
            Message
          </Text>
        </View>
        <Text className="text-xl font-bold mt-6 ml-4 dark:text-white">
          Posts
        </Text>
        {/* {data?.user?.Posts?.length > 0 ? (
          data.user.posts.map((post: any, index: number) => (
            <Posts
              key={index}
              title={post.title}
              content={post.content}
              image={post.image}
              date={post.date}
              Author={post.Author}
              LikeCount={post.LikeCount}
              AuthorImage={post.AuthorImage}
              className={post.className}
            />
          ))
        ) : (
          <Text className="ml-4">Görününrde birşey yok</Text>
        )} */}
      </ScrollView>
    </>
  );
}
