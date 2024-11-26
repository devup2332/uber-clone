import { cn } from "@/lib/utilities";
import { Image, ImageProps, View } from "react-native";

interface TabBarIconProps {
  focused: boolean;
  icon: ImageProps;
}

const TabBarIcon: React.FC<TabBarIconProps> = ({ focused, icon }) => {
  return (
    <View
      className={cn(
        "rounded-full justify-center items-center w-14 h-14 p-3",
        focused ? "bg-general-400 " : "",
      )}
    >
      <Image
        source={icon}
        tintColor="white"
        resizeMode="contain"
        className="w-full"
      />
    </View>
  );
};

export default TabBarIcon;
