import {
  View,
  Text,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Image,
  ImageProps,
  TextInput,
  Platform,
  KeyboardTypeOptions,
} from "react-native";
import React from "react";
import { cn } from "@/lib/utilities";
import { ClassValue } from "clsx";

interface Props {
  label: string;
  labelStyle?: string;
  icon: ImageProps;
  secureTextEntry?: boolean;
  containerStyle?: ClassValue;
  inputStyle?: string;
  keyboardType?: KeyboardTypeOptions;
  iconStyle?: string;
  placeholder?: string;
  value: string;
  onChangeText: (value: string) => void;
}

const CustomInput: React.FC<Props> = ({
  label,
  labelStyle,
  icon,
  containerStyle,
  iconStyle,
  placeholder,
  keyboardType,
  inputStyle,
  value,
  onChangeText,
  secureTextEntry = false,
}) => {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <TouchableWithoutFeedback>
        <View>
          <Text className={cn("text-lg font-plus-sb mb-3", labelStyle)}>
            {label}
          </Text>
          <View
            className={cn(
              "flex-row justify-start items-center relative bg-neutral-100 rounded-full border border-neutral-100 focus:border-primary-500",
              containerStyle,
            )}
          >
            {icon && (
              <Image source={icon} className={cn("w-6 h-6 ml-4", iconStyle)} />
            )}

            <TextInput
              keyboardType={keyboardType}
              secureTextEntry={secureTextEntry}
              placeholder={placeholder}
              returnKeyType="emergency-call"
              value={value}
              onChangeText={onChangeText}
              className={cn(
                "rounded-full p-4 font-plus-sb text-[15px] flex-1 text-left placeholder:text-secondary-500",
                inputStyle,
              )}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default CustomInput;
