import { View, Text, Image } from "react-native";
import React from "react";
import { Ride } from "@/types/type";
import { icons } from "@/constants";
import { formatDate, formatTime } from "@/lib/utils";

interface Props {
  ride: Ride;
}

const RideCard: React.FC<Props> = ({ ride }) => {
  const mapURI = `https://maps.geoapify.com/v1/staticmap?style=osm-bright-smooth&width=600&height=400&center=lonlat:${ride.destination_longitude},${ride.destination_latitude}&zoom=14&apiKey=${process.env.EXPO_PUBLIC_GEOAPIFY_API_KEY}`;
  return (
    <View className="flex items-stretch elevation-7 bg-white rounded-lg shadow-sm shadow-neutral-300 mb-3 p-5 elevation-lg">
      <View className="flex-row items-center gap-5 mb-3">
        <Image
          className="w-[80px] h-[90px] rounded-lg"
          source={{
            uri: mapURI,
          }}
        />

        <View className="flex flex-col gap-y-5">
          <View className="flex flex-row items-center gap-x-2">
            <Image source={icons.to} className="w-5 h-5" />
            <Text className="text-base font-plus-m">{ride.origin_address}</Text>
          </View>
          <View className="flex flex-row items-center gap-x-2">
            <Image source={icons.point} className="w-5 h-5" />
            <Text className="text-base font-plus-m" numberOfLines={1}>
              {ride.destination_address}
            </Text>
          </View>
        </View>
      </View>

      <View className="bg-general-500 p-5 rounded-md">
        <View className="flex-row justify-between border-b-white border-b-2 pb-3">
          <Text className="font-plus-r text-gray-500">Date & Time</Text>
          <Text>
            {formatDate(ride.created_at)}, {formatTime(ride.ride_time)}
          </Text>
        </View>
        <View className="flex-row justify-between border-b-white border-b-2 pb-3 mt-3">
          <Text className="font-plus-r text-gray-500">Driver</Text>
          <Text>
            {ride.driver.first_name} {ride.driver.last_name}
          </Text>
        </View>
        <View className="flex-row justify-between border-b-white border-b-2 pb-3 mt-3">
          <Text className="font-plus-r text-gray-500">Car Seats</Text>
          <Text>{ride.driver.car_seats}</Text>
        </View>
        <View className="flex-row justify-between mt-3">
          <Text className="font-plus-r text-gray-500">Payment Status</Text>
          <Text
            className={
              ride.payment_status === "paid" ? "text-green-500" : "text-black"
            }
          >
            {ride.payment_status.toUpperCase()}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default RideCard;
