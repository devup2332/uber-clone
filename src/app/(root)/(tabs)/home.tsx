import {
  ActivityIndicator,
  FlatList,
  Image,
  ListRenderItemInfo,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import * as Location from "expo-location";
import React, { useEffect, useState } from "react";
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
import { useLocationStore } from "@/store";

const HomePage = () => {
  const [loading, setLoading] = useState(true);
  const { setUserLocation, setDestinationLocation } = useLocationStore();
  const [hasPermissions, setHasPermissions] = useState(false);
  const { user } = useUser();
  const { signOut } = useAuth();

  const handleSignOut = async () => {
    await signOut();
    router.push("/(auth)/sign_in");
  };
  const handleDestionationPress = () => {};

  const requestLocation = async () => {
    try {
      const { status } = await Location?.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setHasPermissions(false);
        return;
      }

      const location = await Location.getCurrentPositionAsync();
      const address = await Location.reverseGeocodeAsync({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });

      setUserLocation({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        address: `${address[0].name}, ${address[0].region}`,
      });
    } catch (err) {
      console.log({ err });
    }
  };
  useEffect(() => {
    requestLocation();
  }, []);
  return (
    <SafeAreaView className="flex-1 bg-general-500 w-11/12 m-auto">
      <StatusBar style="dark" />
      <View>
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
              <GoogleTextInput handlePress={handleDestionationPress} />
              <Text className="text-xl font-plus-b my-5">
                Your Current Location
              </Text>
              <View className="h-[300px] flex-1 mb-4">
                <Map />
              </View>
            </>
          )}
          showsVerticalScrollIndicator={false}
          renderItem={({ item: ride }: ListRenderItemInfo<Ride>) => (
            <RideCard ride={ride} />
          )}
        />
      </View>
    </SafeAreaView>
  );
};

export default HomePage;
