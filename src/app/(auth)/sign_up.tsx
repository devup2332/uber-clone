import {
  View,
  Text,
  ScrollView,
  Image,
  ImageBackground,
  Modal,
} from "react-native";
import React, { useState } from "react";
import { icons, images } from "@/constants";
import CustomInput from "@/components/CustomInput";
import { StatusBar } from "expo-status-bar";
import CustomButton from "@/components/CustomButton";
import { Link, router } from "expo-router";
import OAuth from "@/components/OAuth";
import { useSignUp } from "@clerk/clerk-expo";
import { fetchAPI } from "@/lib/fetch";

interface Verification {
  state: "default" | "pending" | "success" | "failed";
  error: string;
  code: string;
}
const SignUp = () => {
  const { signUp, isLoaded, setActive } = useSignUp();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [verification, setVerification] = useState<Verification>({
    state: "default",
    error: "",
    code: "",
  });

  const onSignUpPress = async () => {
    if (!isLoaded) return;
    try {
      await signUp.create({
        emailAddress: form.email,
        password: form.password,
      });

      await signUp.prepareEmailAddressVerification({
        strategy: "email_code",
      });
      setVerification({ ...verification, state: "pending" });
    } catch (error) {
      console.log(error);
    }
  };

  const onPressVerify = async () => {
    if (!isLoaded) return;
    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code: verification.code,
      });

      if (completeSignUp.status === "complete") {
        // Creating User in Neon Database
        await fetchAPI("/(api)/users", {
          method: "POST",
          body: JSON.stringify({
            name: form.name,
            email: form.email,
            clerkId: completeSignUp.createdUserId,
          }),
        });

        await setActive({
          session: completeSignUp.createdSessionId,
        });

        setVerification({ ...verification, state: "success" });
      } else {
        setVerification({
          ...verification,
          state: "failed",
          error: "Verification Failed",
        });
      }
    } catch (error) {
      setVerification({
        ...verification,
        state: "failed",
        error: "Verification Failed",
      });
    }
  };

  return (
    <ScrollView
      className="flex-1 overflow-scroll bg-white"
      showsVerticalScrollIndicator={false}
    >
      <StatusBar style="dark" />
      <Modal
        visible={verification.state === "pending"}
        statusBarTranslucent
        animationType="fade"
        transparent
      >
        <View className="items-center justify-center flex-1 h-full bg-black/70">
          <View className="rounded-xl bg-white elevation-lg shadow-xl w-11/12 py-14 px-10 items-stretch gap-5">
            <Text className="text-3xl font-plus-b">Verification</Text>
            <Text className="font-plus-r">
              We've sent a verification code to your email
            </Text>
            <CustomInput
              icon={icons.lock}
              placeholder="123456"
              labelStyle="text-xl "
              label="Code"
              keyboardType="numeric"
              value={verification.code}
              onChangeText={(value) =>
                setVerification({ ...verification, code: value })
              }
            />
            {verification.error && (
              <Text className="text-red-500 text-sm">{verification.error}</Text>
            )}
            <CustomButton
              title="Verify Email"
              onPress={onPressVerify}
              bgVariant="success"
            />
          </View>
        </View>
      </Modal>
      <View className="flex-1">
        <ImageBackground source={images.signUpCar} className="h-[250px]">
          <Text className="absolute bottom-10 left-5 text-2xl font-plus-b">
            Create Your Account
          </Text>
        </ImageBackground>
        <View className="px-5 gap-5 flex-1">
          <CustomInput
            label="Name"
            placeholder="Enter your name"
            icon={icons.person}
            value={form.name}
            onChangeText={(value) => setForm({ ...form, name: value })}
          />
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
            title="Sign Up"
            onPress={onSignUpPress}
            className="mt-2"
          />

          <OAuth />
          <View className="flex-1" />
          <Link
            href="/sign_in"
            className="text-base text-center text-general-200 font-plus-r mb-4"
          >
            <Text>Already have an account ? </Text>
            <Text className="text-primary-500 font-bold">Log In</Text>
          </Link>
        </View>
      </View>
      <Modal
        visible={verification.state === "success"}
        transparent
        statusBarTranslucent
        animationType="fade"
      >
        <View className="items-center justify-center flex-1 h-full bg-black/70">
          <View className="rounded-xl bg-white elevation-lg shadow-xl w-11/12 py-14 px-10 items-center gap-5">
            <Image
              source={images.check}
              className="w-32 h-32"
              resizeMode="contain"
            />
            <Text className="text-4xl font-plus-b text-center">Verified !</Text>
            <Text className="text-neutral-400 font-plus-r text-xl text-center">
              Yoy have successfully verified your account
            </Text>
            <CustomButton
              title="Browse Home"
              className="w-full"
              onPress={() => router.replace("/(root)/(tabs)/home")}
            />
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

export default SignUp;
