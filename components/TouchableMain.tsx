import React, { ReactNode, useRef } from "react";
import {
  Animated,
  TouchableWithoutFeedback,
  ViewStyle,
  StyleProp,
} from "react-native";

type TouchableMainProps = {
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
  scaleValue?: number;
  children: ReactNode;
};

export const TouchableMain: React.FC<TouchableMainProps> = ({
  onPress,
  style,
  children,
  scaleValue = 0.95,
}) => {
  const scale = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.timing(scale, {
      toValue: scaleValue,
      duration: 150,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.timing(scale, {
      toValue: 1,
      duration: 150,
      useNativeDriver: true,
    }).start();
  };

  return (
    <TouchableWithoutFeedback
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
    >
      <Animated.View style={[{ transform: [{ scale }] }, style]}>
        {children}
      </Animated.View>
    </TouchableWithoutFeedback>
  );
};
