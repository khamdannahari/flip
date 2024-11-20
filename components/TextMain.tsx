import { fonts } from "@/constants/fonts";
import { Text, TextProps } from "react-native";

export function TextMain({ style, ...rest }: TextProps) {
  return (
    <Text
      style={[{ fontFamily: fonts.lato, letterSpacing: 0 }, style]}
      {...rest}
    />
  );
}
