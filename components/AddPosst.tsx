import { View, Text, StyleSheet } from "react-native";

import React from "react";
import { PlusCircleIcon } from "react-native-heroicons/solid";

interface Props {
  className: string;
}

export default function AddPosst(props: Props) {
  return (
    <>
      <View className={props.className}>
        <PlusCircleIcon color="black" size={50} />
      </View>
    </>
  );
}
