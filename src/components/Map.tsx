import { icons } from "@/constants";
import { drivers } from "@/constants/drivers";
import { useFetch } from "@/lib/fetch";
import {
  calculateDriverTimes,
  calculateRegion,
  generateMarkersFromData,
} from "@/lib/maps";
import { useDriverStore, useLocationStore } from "@/store";
import { Driver, MarkerData } from "@/types/type";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Platform, Text, View } from "react-native";
import MapView, { Marker, PROVIDER_DEFAULT } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
const GOOGLE_PLACES_API_KEY = process.env.EXPO_PUBLIC_GOOGLE_API_KEY || "";

const Map = () => {
  const {
    userLongitude,
    userLatitude,
    destinationLatitude,
    destinationLongitude,
  } = useLocationStore();

  const { selectedDriver, setDrivers } = useDriverStore();
  const { data, loading, error, refetch } = useFetch<Driver[]>("/(api)/driver");
  const [markers, setMarkers] = useState<MarkerData[]>([]);
  const region = calculateRegion({
    userLatitude,
    userLongitude,
    destinationLatitude,
    destinationLongitude,
  });

  useEffect(() => {
    if (!userLatitude || !userLongitude || !data) return;
    const newMarkers = generateMarkersFromData({
      data,
      userLatitude,
      userLongitude,
    });
    setMarkers(newMarkers);
  }, [data]);

  useEffect(() => {
    if (markers.length && destinationLatitude && destinationLongitude) {
      calculateDriverTimes({
        markers,
        destinationLatitude,
        destinationLongitude,
        userLongitude,
        userLatitude,
      })
        .then((drivers) => {
          setDrivers(drivers as MarkerData[]);
        })
        .catch((err) => {
          console.log({ err });
        });
    }
  }, [markers, destinationLatitude, destinationLongitude]);

  if (loading || !userLatitude || !userLongitude) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="small" color="#000" />
      </View>
    );
  }

  if (error) {
    return (
      <View className="flex-1 justify-center items-center w-full">
        <Text>Error: {error}</Text>
      </View>
    );
  }
  return (
    <View className="flex-1 rounded-lg overflow-hidden">
      <MapView
        provider={Platform.OS === "ios" ? PROVIDER_DEFAULT : "google"}
        initialRegion={region}
        showsUserLocation
        userInterfaceStyle="dark"
        style={{
          flex: 1,
          width: "100%",
          height: "100%",
        }}
      >
        {markers.map((marker) => (
          <Marker
            coordinate={{
              latitude: marker.latitude || 0,
              longitude: marker.longitude || 0,
            }}
            key={marker.id}
            title={marker.title}
            image={
              selectedDriver?.toString() === marker.id
                ? icons.selectedMarker
                : icons.marker
            }
          ></Marker>
        ))}

        {destinationLongitude && destinationLatitude && (
          <>
            <Marker
              coordinate={{
                latitude: destinationLatitude,
                longitude: destinationLongitude,
              }}
              key="destination-pin"
              image={icons.pin}
            />
            <MapViewDirections
              origin={{
                latitude: userLatitude,
                longitude: userLongitude,
              }}
              destination={{
                latitude: destinationLatitude,
                longitude: destinationLongitude,
              }}
              apikey={GOOGLE_PLACES_API_KEY}
              strokeColor="#0286ff"
              strokeWidth={3}
            />
          </>
        )}
      </MapView>
    </View>
  );
};

export default Map;
