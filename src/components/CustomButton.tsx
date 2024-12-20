import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import clsx from "clsx";

interface Props {
  onPress?: () => void;
  title: string;
  bgVariant?: "primary" | "secondary" | "danger" | "outline" | "success";
  textVariant?: "primary" | "default" | "secondary" | "danger" | "success";
  IconLeft?: React.ComponentType<any>;
  IconRight?: React.ComponentType<any>;
  className?: string;
  loading?: boolean;
}

const getBgVariantStyle = (variant: Props["bgVariant"]) => {
  const variants = {
    danger: "bg-red-500",
    secondary: "bg-gray-500",
    success: "bg-green-500",
    outline: "bg-transparent border-neutral-300 border-[0.5px]",
    primary: "bg-[#0286FF]",
  };
  return variants[variant || "primary"];
};

const getTextVariantStyle = (variant: Props["textVariant"]) => {
  const variants = {
    primary: "text-black",
    secondary: "text-gray-100",
    danger: "text-red-100",
    success: "text-green-100",
    default: "text-white",
  };
  return variants[variant || "default"];
};

const CustomButton: React.FC<Props> = (props) => {
  const {
    onPress,
    title,
    IconLeft,
    IconRight,
    bgVariant,
    textVariant,
    className,
    loading,
  } = props;
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={loading}
      className={clsx(
        "rounded-full flex py-4 flex-row justify-center items-center gap-5",
        getBgVariantStyle(bgVariant),
        className,
      )}
      style={{
        boxShadow: "0px 0px 20px rgba(51,51,51,0.15)",
      }}
    >
      {loading && (
        <View>
          <ActivityIndicator size="small" color="#fff" />
        </View>
      )}
      {IconLeft && <IconLeft className="mr-2" />}
      <Text
        className={clsx(
          "text-lg font-plus-b",
          getTextVariantStyle(textVariant),
        )}
      >
        {title}
      </Text>
      {IconRight && <IconRight className="mr-2" />}
    </TouchableOpacity>
  );
};

export default CustomButton;
