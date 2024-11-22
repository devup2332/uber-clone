import { View, Text } from "react-native";
import React from "react";
import { Stack } from "expo-router";

const Layout = () => {
  return (
    <Stack>
      <Stack.Screen name="welcome" options={{ headerShown: false }} />
      <Stack.Screen
        name="sign_up"
        options={{ headerShown: false }}
      />
      <Stack.Screen name="sign_in" options={{ headerShown: false }} />
    </Stack>
  );
};

export default Layout;
