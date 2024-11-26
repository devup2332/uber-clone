import { cn } from "@/lib/utilities";
import { ClassValue } from "clsx";
import React from "react";
import { Text, View } from "react-native";

interface Props {
  icon: () => React.JSX.Element;
  containerStyle: ClassValue;
  handlerPress: () => void;
}

const GoogleTextInput: React.FC<Props> = ({ containerStyle }) => {
  return (
    <View
      className={cn(
        "flex flex-row items-center justify-center relative z-50 rounded-xl mb-5",
        containerStyle,
      )}
    >
      <Text>Google</Text>
    </View>
  );
};

export default GoogleTextInput;
