import { View, Text, TouchableOpacity, Image } from "react-native";
import React, { useRef } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { icons } from "@/constants";
import Map from "@/components/Map";
import { router } from "expo-router";
import BottomSheet, {
  BottomSheetScrollView,
  BottomSheetView,
} from "@gorhom/bottom-sheet";

interface Props {
  children: React.ReactNode;
  title: string;
  snapPoints?: (string | number)[];
}

const RideLayout: React.FC<Props> = ({ children, title, snapPoints }) => {
  const bottomSheetRef = useRef<BottomSheet>(null);
  return (
    <GestureHandlerRootView>
      <View className="flex-1 bg-white">
        <View className="flex-1 h-screen">
          <View className="absolute z-10 top-16 items-center justify-start px-5 flex flex-row">
            <TouchableOpacity onPress={() => router.back()}>
              <View
                className="w-10 h-10 bg-white rounded-full items-center justify-center"
                style={{
                  boxShadow: "0px 0px 10px rgba(51, 51, 51, 0.15)",
                }}
              >
                <Image
                  source={icons.backArrow}
                  resizeMode="contain"
                  className="w-6 h-6"
                />
              </View>
            </TouchableOpacity>
            <Text className="text-xl font-plus-sb ml-5">
              {title || "Go Back"}
            </Text>
          </View>
          <Map />
        </View>
        <BottomSheet
          ref={bottomSheetRef}
          snapPoints={snapPoints ? snapPoints : ["45%", "85%"]}
          keyboardBehavior="extend"
          index={1}
        >
          <BottomSheetView className="flex-1 px-8 py-10">
            {children}
          </BottomSheetView>
        </BottomSheet>
      </View>
    </GestureHandlerRootView>
  );
};

export default RideLayout;
