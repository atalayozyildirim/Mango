import {
  View,
  Text,
  TextInput,
  Appearance,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { PhotoIcon } from "react-native-heroicons/outline";
import { LinkIcon } from "react-native-heroicons/solid";
import { useDispatch } from "react-redux";
import { createPost } from "@/redux/actions/PostActions";
import * as ImagePicker from "expo-image-picker";
import { getUserName } from "@/util/getUserName";
import { router } from "expo-router";

const colorScheme = Appearance.getColorScheme();

export default function addpost() {
  const [data, setdata] = React.useState({
    content: "",
    uri: "",
    image: [],
    authorName: "",
  });
  const [image, setImage] = React.useState<any>(null);
  const dispacth = useDispatch();

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };
  const addPost = async () => {
    try {
      await dispacth<any>(createPost({ data }));
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    const fetchData = async () => {
      const userName = await getUserName();
      const parse: any = JSON.parse(userName!);
      setdata({ ...data, authorName: parse.user.name });
    };
    fetchData();
  }, []);
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
          onChangeText={(text) => {
            if (image !== null) {
              setdata({ ...data, content: text, image: image });
            } else {
              setdata({ ...data, content: text });
            }
          }}
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
        <TouchableOpacity onPress={addPost}>
          <View className="flex flex-row gap-5 w-full  justify-end ">
            <Text className="w-32 p-2 relative left-1 bg-black dark:bg-white dark:text-black   text-white text-center rounded-3xl">
              Paylaş
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </>
  );
}
