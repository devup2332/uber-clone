import {
  ActivityIndicator,
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import * as Location from "expo-location";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import RideCard from "@/components/RideCard";
import { icons, images } from "@/constants";
import { useAuth, useUser } from "@clerk/clerk-expo";
import { router } from "expo-router";
import GoogleTextInput from "@/components/GoogleTextInput";
import Map from "@/components/Map";
import { useLocationStore } from "@/store";
import { StatusBar } from "expo-status-bar";
import { useFetch } from "@/lib/fetch";
import { Ride } from "@/types/type";

const HomePage = () => {
  const { setUserLocation, setDestinationLocation } = useLocationStore();
  const [hasPermissions, setHasPermissions] = useState(false);
  const { user } = useUser();
  const { signOut } = useAuth();
  const { data: recentRides, loading } = useFetch<Ride[]>(
    `/(api)/ride/${user?.id}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    },
  );

  const handleSignOut = async () => {
    await signOut();
    router.push("/(auth)/sign_in");
  };

  const handleDestionationPress = (location: {
    latitude: number;
    longitude: number;
    address: string;
  }) => {
    setDestinationLocation(location);
    router.push("/(root)/find-ride");
  };

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

  if (loading)
    return (
      <View className="flex-1 items-center justify-center">
        <ActivityIndicator size="small" color="#000" />
      </View>
    );
  return (
    <SafeAreaView className="flex-1 bg-general-500">
      <StatusBar style="dark" />
      <FlatList
        data={recentRides}
        ListEmptyComponent={() => {
          return (
            <View className="flex-1 justify-center items-center">
              <Text className="text-xl font-plus-r">No recent rides</Text>
              <Image
                source={images.noResult}
                className="w-36 h-36"
                resizeMode="contain"
              />
            </View>
          );
        }}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 100,
          paddingHorizontal: 20,
          flexGrow: 1,
          gap: 20,
        }}
        renderItem={({ item }) => <RideCard ride={item} />}
        ListHeaderComponent={() => (
          <View className="gap-6">
            <View className="flex-row items-center justify-between pt-4">
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
            <Text className="text-xl font-plus-b">Your Current Location</Text>
            <View className="w-full h-[300px]">
              <Map />
            </View>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

export default HomePage;
