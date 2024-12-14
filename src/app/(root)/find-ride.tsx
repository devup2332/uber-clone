import { View, Text } from "react-native";
import React from "react";
import { useLocationStore } from "@/store";
import RideLayout from "@/components/RideLayout";
import GoogleTextInput from "@/components/GoogleTextInput";
import { icons } from "@/constants";
import CustomButton from "@/components/CustomButton";
import { router } from "expo-router";

const FindRide = () => {
  const {
    userAddress,
    setUserLocation,
    setDestinationLocation,
    destinationAddress,
  } = useLocationStore();
  return (
    <RideLayout title="Ride" snapPoints={["45%", "60%"]}>
      <View className="my-3">
        <Text className="text-lg font-plus-sb mb-3">From</Text>
        <GoogleTextInput
          icon={icons.target}
          initialLocation={userAddress!}
          containerStyle="bg-neutral-100"
          textInputBackgroundColor="#f5f5f5"
          handlePress={(location) => {
            setUserLocation(location);
          }}
        />
      </View>
      <View className="my-3">
        <Text className="text-lg font-plus-sb mb-3">From</Text>
        <GoogleTextInput
          icon={icons.map}
          initialLocation={destinationAddress!}
          containerStyle="bg-neutral-100"
          textInputBackgroundColor="#f5f5f5"
          handlePress={(location) => {
            setDestinationLocation(location);
          }}
        />
      </View>

      <CustomButton
        title="Find now"
        className="mt-10"
        onPress={() => router.push("/(root)/confirm-ride")}
      />
    </RideLayout>
  );
};

export default FindRide;
