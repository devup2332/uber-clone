import { View, Text, TouchableOpacity, Image, Dimensions } from "react-native";
import React, { useRef, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { data } from "@/constants";
import CustomButton from "@/components/CustomButton";
import { SwiperFlatList } from "react-native-swiper-flatlist";
import { cn } from "@/lib/utilities";
import { StatusBar } from "expo-status-bar";

const { width } = Dimensions.get("window");
const WelcomePage = () => {
  const swiperRef = useRef<SwiperFlatList>(null);
  const [index, setIndex] = useState(0);
  const isLastSlide = index === data.welcomePages.length - 1;
  return (
    <SafeAreaView className="flex-1 pb-10">
      <StatusBar style="dark" />
      <TouchableOpacity
        onPress={() => router.replace("/(auth)/sign_up")}
        className="w-full flex justify-end items-end px-10 py-4"
      >
        <Text className="font-plus-b text-lg">Skip</Text>
      </TouchableOpacity>
      <SwiperFlatList
        ref={swiperRef}
        data={data.welcomePages}
        index={index}
        onChangeIndex={({ index }) => setIndex(index)}
        showPagination
        PaginationComponent={({ paginationIndex }) => {
          return (
            <View className="flex flex-row gap-2 justify-center">
              {data.welcomePages.map((_, index) => (
                <View
                  className="w-[32px] h-[4px] mx-1 bg-[#E2E8F0] rounded-full"
                  key={index}
                  style={{
                    backgroundColor:
                      index === paginationIndex ? "#3182CE" : "#E2E8F0",
                  }}
                />
              ))}
            </View>
          );
        }}
      >
        {data.welcomePages.map((page, index) => (
          <View
            key={index}
            style={{
              width,
            }}
          >
            <View className="w-9/12 mx-auto">
              <Image
                source={page.image}
                className="w-full h-[300px]"
                resizeMode="contain"
              />
              <View className="flex flex-row items-center justify-center mt-14">
                <Text className="text-black text-3xl font-plus-b text-center">
                  {page.title}
                </Text>
              </View>
              <Text className="text-lg font-plus-sb text-center text-[#858585] mt-3">
                {page.description}
              </Text>
            </View>
          </View>
        ))}
      </SwiperFlatList>
      <CustomButton
        title={isLastSlide ? "Get Started" : "Next"}
        className="mt-10 py-4 w-9/12 self-center"
        onPress={() => {
          isLastSlide
            ? router.replace("/(auth)/sign_up")
            : swiperRef.current?.scrollToIndex({ index: index + 1 });
        }}
      />
    </SafeAreaView>
  );
};

export default WelcomePage;
