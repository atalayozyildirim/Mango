import AsyncStorage from "@react-native-async-storage/async-storage";

export const getUserName = async () => {
  try {
    const data = await AsyncStorage.getItem("user");
    return data;
  } catch (error) {
    console.log(error);
  }
};
