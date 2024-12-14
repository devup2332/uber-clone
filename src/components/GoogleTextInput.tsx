import { icons } from "@/constants";
import { cn } from "@/lib/utilities";
import { GoogleInputProps } from "@/types/type";
import React from "react";
import { Image, View } from "react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";

const GOOGLE_PLACES_API_KEY = process.env.EXPO_PUBLIC_GOOGLE_API_KEY || "";

const GoogleTextInput: React.FC<GoogleInputProps> = ({
  containerStyle,
  initialLocation,
  handlePress,
  textInputBackgroundColor,
  icon,
}) => {
  return (
    <View
      className={cn(
        "flex flex-row items-center h-16 justify-start bg-white gap-4 rounded-xl",
        containerStyle,
      )}
      style={{
        boxShadow: "0px 0px 20px rgba(51,51,51,0.15)",
      }}
    >
      <GooglePlacesAutocomplete
        fetchDetails={true}
        placeholder="Where you want to go?"
        debounce={200}
        styles={{
          textInputContainer: {
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 20,
            marginHorizontal: 20,
            position: "relative",
            shadowColor: "#d4d4d4",
          },
          textInput: {
            backgroundColor: textInputBackgroundColor
              ? textInputBackgroundColor
              : "white",
            fontSize: 16,
            fontWeight: "600",
            fontFamily: "plus-r",
            marginTop: 5,
            width: "100%",
            borderRadius: 200,
          },
          poweredContainer: {
            display: "none",
          },
          listView: {
            backgroundColor: "white",
            position: "absolute",
            top: 64,
            width: "100%",
            borderRadius: 10,
            shadowColor: "#d4d4d4",
            zIndex: 99,
          },
        }}
        onPress={(data, details = null) => {
          handlePress({
            latitude: details?.geometry.location.lat!,
            longitude: details?.geometry.location.lng!,
            address: data.description,
          });
        }}
        query={{
          key: GOOGLE_PLACES_API_KEY,
          language: "en",
        }}
        textInputProps={{
          placeholderTextColor: "gray",
          placeholder: initialLocation ?? "Where do you want to go?",
        }}
        renderLeftButton={() => (
          <View className="justify-center items-center w-6 h-6">
            <Image
              source={icon ? icon : icons.search}
              className="w-6 h-6"
              resizeMode="contain"
            />
          </View>
        )}
      />
    </View>
  );
};

export default GoogleTextInput;
