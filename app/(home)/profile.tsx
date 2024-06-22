import { View, Text, Image, Appearance, FlatList } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React from "react";
import Posts from "@/components/Posts";
import { PencilSquareIcon } from "react-native-heroicons/outline";
import { ScrollView } from "react-native-gesture-handler";
import { useDispatch, useSelector } from "react-redux";
import { GetPostById } from "@/redux/actions/PostActions";

const colorScheme = Appearance.getColorScheme();

export default function profile() {
  const [data, setData] = React.useState<any>(null);
  const [postData, setPostData] = React.useState<any>([]);
  const dispatch: any = useDispatch();
  const Post = useSelector((state: any) => state?.GetPostById);

  React.useEffect(() => {
    const userData = async () => {
      try {
        const value: any = await AsyncStorage.getItem("user");
        if (value !== null) {
          const parsedValue = JSON.parse(value);
          setData(parsedValue);
        }
      } catch (e) {
        console.log(e);
      }
    };
    userData();
    console.log(data);
  }, []);

  React.useEffect(() => {
    data?.user?.Posts?.map((post: any) => {
      dispatch(GetPostById(post));
      setPostData((prevD: any) => [...prevD, Post]);
    });
  }, [data?.user?.Posts]);

  React.useEffect(() => {
    if (Post.length > 0) {
      setPostData((prevState: any) => [...prevState, ...Post]);
    }
  }, [Post]);

  React.useEffect(() => {}, [postData]);
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
        <Text className="text-xl h-10 font-bold mt-6 ml-4 dark:text-white">
          Posts
        </Text>
        {postData?.length > 0 ? (
          postData.map((post: any, index: number) => (
            <Posts
              key={index}
              Author={post?.posts?.post.authorName}
              content={post?.posts?.post.content}
              image={post?.posts?.post.image}
              title={post?.posts?.post.title}
              date={post?.posts?.post.date}
              LikeCount={post?.posts?.post.LikeCount}
              AuthorImage={post?.posts?.post.AuthorImage}
              className={post?.posts?.post.className}
              id={""}
            />
          ))
        ) : (
          <Text className="text-center mt-6 dark:text-white">Gönderi yok</Text>
        )}
      </ScrollView>
    </>
  );
}
