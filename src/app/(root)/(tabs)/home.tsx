import {
  ActivityIndicator,
  FlatList,
  Image,
  ListRenderItemInfo,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { recentRides } from "@/constants/data";
import RideCard from "@/components/RideCard";
import { Ride } from "@/types/type";
import { icons, images } from "@/constants";
import { useAuth, useUser } from "@clerk/clerk-expo";
import { router } from "expo-router";
import GoogleTextInput from "@/components/GoogleTextInput";
import Map from "@/components/Map";

const HomePage = () => {
  const [loading, setLoading] = useState(true);
  const { user } = useUser();
  const { signOut } = useAuth();

  const handleSignOut = async () => {
    await signOut();
    router.push("/(auth)/sign_in");
  };
  const handleDestionationPress = () => {};
  return (
    <SafeAreaView className={"flex-1 bg-general-500 px-5"}>
      <StatusBar style="dark" />
      <FlatList
        data={recentRides}
        contentContainerStyle={{
          paddingBottom: 100,
        }}
        ListEmptyComponent={() => (
          <View className="justify-center items-center">
            {!loading ? (
              <>
                <Image
                  source={images.noResult}
                  className="h-40 w-40"
                  alt="No recent rides found"
                  resizeMode="contain"
                />
                <Text className="text-center flex-0 font-plus-r text-lg">
                  No recent rides founded
                </Text>
              </>
            ) : (
              <ActivityIndicator size="small" color="#000" />
            )}
          </View>
        )}
        ListHeaderComponent={() => (
          <>
            <View className="flex-row items-center justify-between py-4">
              <Text className="font-plus-b text-2xl">
                Welcome {user?.firstName} 👋
              </Text>
              <TouchableOpacity
                className="w-10 h-10 justify-center items-center bg-white rounded-full"
                onPress={handleSignOut}
              >
                <Image
                  source={icons.out}
                  className="w-5 h-5"
                  resizeMode="contain"
                />
              </TouchableOpacity>
            </View>
            <GoogleTextInput
              icon={icons.google}
              containerStyle=""
              handlerPress={handleDestionationPress}
            />
            <Text className="text-xl font-plus-b my-5">
              Your Current Location
            </Text>
            <View className="h-[300px] flex-1">
              <Map />
            </View>
          </>
        )}
        showsVerticalScrollIndicator={false}
        renderItem={({ item: ride }: ListRenderItemInfo<Ride>) => (
          <RideCard ride={ride} />
        )}
      />
    </SafeAreaView>
  );
};

export default HomePage;
