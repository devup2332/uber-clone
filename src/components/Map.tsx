import { icons } from "@/constants";
import { drivers } from "@/constants/drivers";
import { calculateRegion, generateMarkersFromData } from "@/lib/maps";
import { useDriverStore, useLocationStore } from "@/store";
import { MarkerData } from "@/types/type";
import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import MapView, { Marker, PROVIDER_DEFAULT } from "react-native-maps";

const Map = () => {
  const INITIAL_REGION = {
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  const {
    userLongitude,
    userLatitude,
    destinationLatitude,
    destinationLongitude,
  } = useLocationStore();

  const { selectedDriver, setDrivers } = useDriverStore();
  const [markers, setMarkers] = useState<MarkerData[]>([]);
  const region = calculateRegion({
    userLatitude,
    userLongitude,
    destinationLatitude,
    destinationLongitude,
  });

  useEffect(() => {
    if (!userLatitude || !userLongitude) return;
    const newMarkers = generateMarkersFromData({
      data: drivers,
      userLatitude,
      userLongitude,
    });
    setMarkers(newMarkers);
  }, []);
  return (
    <View className="flex-1">
      <MapView
        provider={PROVIDER_DEFAULT}
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
              latitude: marker.latitude,
              longitude: marker.longitude,
            }}
            key={marker.id}
            title={marker.title}
            image={
              selectedDriver === marker.id ? icons.selectedMarker : icons.marker
            }
          ></Marker>
        ))}
      </MapView>
    </View>
  );
};

export default Map;
