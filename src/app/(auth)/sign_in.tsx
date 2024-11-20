import { View, Text, ScrollView, Image, ImageBackground } from "react-native";
import React, { useState } from "react";
import { icons, images } from "@/constants";
import CustomInput from "@/components/CustomInput";
import { StatusBar } from "expo-status-bar";
import CustomButton from "@/components/CustomButton";
import { Link } from "expo-router";
import OAuth from "@/components/OAuth";

const SignUp = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const onSignInPress = () => {};

  return (
    <ScrollView
      className="flex-1 overflow-scroll bg-white"
      showsVerticalScrollIndicator={false}
    >
      <StatusBar style="dark" />
      <View className="flex-1">
        <ImageBackground source={images.signUpCar} className="h-[250px]">
          <Text className="absolute bottom-10 left-5 text-2xl font-plus-b">
            Welcome 👋
          </Text>
        </ImageBackground>
        <View className="px-5 gap-5 flex-1">
          <CustomInput
            label="Email"
            placeholder="Enter your email"
            icon={icons.email}
            value={form.email}
            onChangeText={(value) => setForm({ ...form, email: value })}
          />
          <CustomInput
            label="Password"
            placeholder="Enter your password"
            icon={icons.lock}
            secureTextEntry
            value={form.password}
            onChangeText={(value) => setForm({ ...form, password: value })}
          />

          <CustomButton
            title="Sign In"
            onPress={onSignInPress}
            className="mt-2"
          />

          <OAuth />
          <View className="flex-1" />
          <Link
            href="/sign_up"
            className="text-base text-center text-general-200 font-plus-r mb-4"
          >
            <Text>Dont you have an account ?   </Text>
            <Text className="text-primary-500 font-bold">Sign Up</Text>
          </Link>
        </View>
      </View>
    </ScrollView>
  );
};

export default SignUp
