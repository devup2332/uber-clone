import React from "react";
import { Text, View } from "react-native";
import MapView, { PROVIDER_DEFAULT } from "react-native-maps";

const Map = () => {
  const INITIAL_REGION = {
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };
  return (
    <View className="flex-1">
      <MapView
        provider={PROVIDER_DEFAULT}
        tintColor="black"
        showsPointsOfInterest={false}
        initialRegion={INITIAL_REGION}
        className="flex-1"
        showsUserLocation
      ></MapView>
    </View>
  );
};

export default Map;
