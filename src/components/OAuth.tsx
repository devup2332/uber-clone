import { View, Text, Image } from "react-native";
import React from "react";
import CustomButton from "./CustomButton";
import { icons } from "@/constants";

const OAuth = () => {
  const handleGoogleLogin = () => {};
  return (
    <View className="gap-5">
      <View className="font-plus-r flex-row justify-between items-center gap-5">
        <View className="flex-1 h-[1px] bg-general-100/30"></View>
        <View>
          <Text className="text-xl">Or</Text>
        </View>
        <View className="flex-1 h-[1px] bg-general-100/30"></View>
      </View>
      <CustomButton
        title="Login In with Google"
        className="w-full shadow-none"
        bgVariant="outline"
        textVariant="primary"
        IconLeft={() => (
          <Image
            source={icons.google}
            resizeMode="contain"
            className="w-5 h-5 mx-2"
          />
        )}
      />
    </View>
  );
};

export default OAuth;