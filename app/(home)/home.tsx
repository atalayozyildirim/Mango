import { View, Text, ScrollView, Appearance } from "react-native";
import React from "react";
import Posts from "@/components/Posts";
import { BellIcon } from "react-native-heroicons/outline";
import { useDispatch, useSelector } from "react-redux";
import { getPosts } from "@/redux/actions/PostActions";

const colorScheme = Appearance.getColorScheme();

export default function index() {
  const [loading, setLoading] = React.useState<boolean>(false);

  const post = useSelector((state: any) => state.post);

  const dispatch = useDispatch();

  React.useEffect(() => {
    setLoading(true);
    dispatch(getPosts());
    console.log(JSON.stringify(post) + "REQUEST");
    return () => {
      setLoading(false);
    };
  }, [loading]);
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
            {post && post.length > 0 ? (
              post.map((item: any) => {
                return (
                  <Posts
                    title={item.title}
                    content={item.content}
                    date={item.date}
                    Author={item.authorName}
                    LikeCount={item.LikeCount}
                    AuthorImage={item.authorImage}
                    className="shadow-2xl dark:bg-[#191b1f]"
                  />
                );
              })
            ) : (
              <Text className="text-black text-center ">
                Başka post yok ...
              </Text>
            )}
            <View className="w-full h-[30vh] text-center"></View>
          </ScrollView>
        </View>
        {/* <Posts /> */}
      </View>
    </>
  );
}
