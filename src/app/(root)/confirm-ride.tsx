import { FlatList } from "react-native";
import React from "react";
import RideLayout from "@/components/RideLayout";
import DriverCard from "@/components/DriverCard";
import CustomButton from "@/components/CustomButton";
import { router } from "expo-router";
import { useDriverStore } from "@/store";

const ConfirmRide = () => {
  const { selectedDriver, setSelectedDriver, drivers } = useDriverStore();
  return (
    <RideLayout title="Choose driver" snapPoints={["65%", "85%", "15%"]}>
      <FlatList
        data={drivers}
        renderItem={({ item }) => (
          <DriverCard
            item={item}
            selected={selectedDriver!}
            setSelected={() => setSelectedDriver(Number(item.id))}
          />
        )}
        ListFooterComponent={() => (
          <CustomButton
            title="Select Ride"
            onPress={() => router.push("/(root)/book-ride")}
          />
        )}
      />
    </RideLayout>
  );
};

export default ConfirmRide;
