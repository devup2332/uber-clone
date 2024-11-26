import React from "react";
import { Tabs } from "expo-router";
import { icons } from "@/constants";
import TabBarIcon from "@/components/TabBarIcon";

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
          overflow: "hidden",
          justifyContent: "space-between",
          alignItems: "center",
          backgroundColor: "#333333",
          display: "flex",
          borderRadius: 50,
          position: "absolute",
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
