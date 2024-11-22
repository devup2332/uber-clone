import { View, Text, Image, ImageProps } from "react-native";
import React from "react";
import { Tabs } from "expo-router";
import { cn } from "@/lib/utilities";
import { icons } from "@/constants";

interface TabBarIconProps {
  focused: boolean;
  icon: ImageProps;
}

const TabBarIcon: React.FC<TabBarIconProps> = ({ focused, icon }) => {
  return (
    <View
      className={cn(
        "rounded-full justify-center items-center",
        focused ? "bg-general-400 w-14 h-14" : "",
      )}
    >
      <Image
        source={icon}
        tintColor="white"
        resizeMode="contain"
        className="w-8 h-8"
      />
    </View>
  );
};

const Layout = () => {
  return (
    <Tabs
      initialRouteName="home"
      
      screenOptions={{
        tabBarShowLabel: false,
        headerShown: false,
        tabBarLabelStyle: {},
        tabBarStyle: {
          height: 70,
          marginBottom: 20,
          marginHorizontal: 20,
          paddingBottom: 0,
          justifyContent: "space-between",
          alignItems: "center",
          display: "flex",
          borderRadius: 50,
          position: "absolute",
          backgroundColor: "#333333",
        },
        tabBarItemStyle: {
          height: "100%",
          justifyContent: "center",
          flex: 1,
          alignItems: "center",
        },
        tabBarIconStyle: {
          flex: 1,
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabBarIcon icon={icons.home} focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="rides"
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabBarIcon icon={icons.list} focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="chat"
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabBarIcon icon={icons.chat} focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabBarIcon icon={icons.profile} focused={focused} />
          ),
        }}
      />
    </Tabs>
  );
};

export default Layout;
