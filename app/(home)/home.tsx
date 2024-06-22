import { View, Text, ScrollView, Appearance, FlatList } from "react-native";
import React from "react";
import Posts from "@/components/Posts";
import { BellIcon } from "react-native-heroicons/outline";
import { getPosts, GetPostsWithPagination } from "@/redux/actions/PostActions";
import { useDispatch, useSelector } from "react-redux";

const colorScheme = Appearance.getColorScheme();

export default function index() {
  const dispatch = useDispatch();

  const [page, setPage] = React.useState(1);
  const [limit, setLimit] = React.useState(10);

  const post = useSelector(
    (state: any) => state.paginationPosts.posts.response?.paginatePosts
  );

  console.log(post);
  React.useEffect(() => {
    dispatch<any>(GetPostsWithPagination({ page, limit }));
  }, []);

  const handleLoadMore = () => {
    setPage(page + 1);
  };

  return (
    <>
      <View className="w-full h-full flex flex-col items-center dark:bg-[#0b0e0f]">
        <View className="w-5/6 relative top-14 left-6 flex flex-row justify-between">
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
          <FlatList
            data={post}
            keyExtractor={(item) => item.id} // Assuming 'id' is a string, use the appropriate property for your data
            onEndReached={handleLoadMore}
            onEndReachedThreshold={0.5}
            renderItem={({ item }) => (
              <Posts
                key={item.id}
                title={item.title}
                content={item.content}
                date={item.date}
                Author={item.authorName}
                LikeCount={item.likeCount}
                AuthorImage={item.authorImage}
                className="shadow-2xl dark:bg-[#191b1f]"
              />
            )}
          />
        </View>
      </View>
    </>
  );
}
