/// <reference types="nativewind/types" />
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { router, Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useContext } from "react";
import "react-native-reanimated";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useColorScheme } from "@/hooks/useColorScheme";
import { ApolloProvider } from "@apollo/client";
import { client } from "@/graphql/Client";
import { Provider } from "react-redux";
import store from "@/redux/store";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Config } from "@/config/config";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
      const bootstrapAsync = async () => {
        try {
          const fetchUserLogin = await fetch(Config.API_URL + "auth/user", {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          });

          if (!fetchUserLogin.ok) {
            await AsyncStorage.removeItem("user");
          }
          const response = await fetchUserLogin.json();

          const token = await AsyncStorage.getItem("user");
          if (token) {
            router.push("/home");
          } else {
            router.push("/");
          }
        } catch (error) {
          console.error(error);
        }
      };
      bootstrapAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ApolloProvider client={client}>
      <Provider store={store}>
        <GestureHandlerRootView>
          <ThemeProvider
            value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
          >
            <Stack>
              <Stack.Screen name="index" options={{ headerShown: false }} />
              <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
              <Stack.Screen name="(auth)" options={{ headerShown: false }} />
              <Stack.Screen name="(home)" options={{ headerShown: false }} />
              <Stack.Screen name="(post)" options={{ headerShown: false }} />
              <Stack.Screen name="+not-found" />
            </Stack>
          </ThemeProvider>
        </GestureHandlerRootView>
      </Provider>
    </ApolloProvider>
  );
}
