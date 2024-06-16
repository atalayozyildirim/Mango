import React from "react";
import {
  Cog8ToothIcon,
  HomeIcon,
  MagnifyingGlassIcon,
  UserIcon,
} from "react-native-heroicons/outline";
import {
  HomeIcon as HomeIconD,
  UserIcon as UserIconD,
  MagnifyingGlassIcon as MagnifyingGlassIconD,
  Cog8ToothIcon as Cog8ToothIconD,
  PlusCircleIcon as PlusCircleIconD,
} from "react-native-heroicons/solid";
import { Tabs } from "expo-router";
import { Appearance } from "react-native";

const colorScheme = Appearance.getColorScheme();

export default function _layout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: colorScheme === "dark" ? "black" : "white",
          borderTopRightRadius: 20,
          borderTopLeftRadius: 20,
        },
        tabBarLabelStyle: {
          color: colorScheme === "dark" ? "white" : "black",
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          tabBarShowLabel: false,
          tabBarLabelStyle: {
            color: "black",
            fontWeight: "bold",
            fontSize: 9,
          },
          tabBarIcon: ({ focused }) =>
            focused ? (
              <HomeIconD color={colorScheme === "dark" ? "white" : "black"} />
            ) : (
              <HomeIcon color={colorScheme === "dark" ? "white" : "black"} />
            ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          tabBarShowLabel: false,
          title: "Profile",
          tabBarLabelStyle: {
            color: "black",
            fontWeight: "bold",
            fontSize: 9,
          },

          tabBarIcon: ({ focused }) =>
            focused ? (
              <UserIconD color={colorScheme === "dark" ? "white" : "black"} />
            ) : (
              <UserIcon color={colorScheme === "dark" ? "white" : "black"} />
            ),
        }}
      />
      <Tabs.Screen
        name="addpost"
        options={{
          title: "AddPost",
          tabBarShowLabel: false,
          tabBarLabelStyle: {
            backgroundColor: "#f0f4f9",
            position: "relative",
            top: -30,
          },
          tabBarIcon: ({ focused }) => (
            <PlusCircleIconD
              color={colorScheme === "dark" ? "white" : "black"}
              size={50}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: "Search",
          tabBarShowLabel: false,
          tabBarLabelStyle: {
            color: "black",
            fontWeight: "bold",
            fontSize: 9,
          },
          tabBarIcon: ({ focused }) =>
            focused ? (
              <MagnifyingGlassIconD
                color={colorScheme === "dark" ? "white" : "black"}
              />
            ) : (
              <MagnifyingGlassIcon
                color={colorScheme === "dark" ? "white" : "black"}
              />
            ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",
          tabBarShowLabel: false,
          tabBarLabelStyle: {
            color: "black",
            fontWeight: "bold",
            fontSize: 9,
          },
          tabBarIcon: ({ focused }) =>
            focused ? (
              <Cog8ToothIconD
                color={colorScheme === "dark" ? "white" : "black"}
              />
            ) : (
              <Cog8ToothIcon
                color={colorScheme === "dark" ? "white" : "black"}
              />
            ),
        }}
      />
    </Tabs>
  );
}
