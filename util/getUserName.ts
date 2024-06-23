import AsyncStorage from "@react-native-async-storage/async-storage";

export const getUserName = async () => {
  try {
    const data = await AsyncStorage.getItem("user");
    const parsedData = JSON.parse(data || "");
    return parsedData?.user?.name || "";
  } catch (error) {
    console.log(error);
  }
};
