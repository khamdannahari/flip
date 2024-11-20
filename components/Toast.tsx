import React, { useEffect, useState, useRef } from "react";
import { Animated, Text, View, StyleProp, ViewStyle } from "react-native";
import { CheckCircle, AlertCircle, AlertTriangle } from "lucide-react-native";
import { colors } from "@/constants/colors";
import { styles } from "./styles/ToastStyles";

/* eslint-disable no-unused-vars */
export enum ToastType {
  success = "success",
  error = "error",
  warning = "warning",
}

export type ToastProps = {
  type?: ToastType;
  message?: string;
  triggerShow?: Date;
  duration?: number;
  style?: StyleProp<ViewStyle>;
};

export const Toast = ({
  type,
  message,
  triggerShow,
  duration = 3000,
  style,
}: ToastProps) => {
  const [visible, setVisible] = useState(false);
  const [fadeAnim] = useState(new Animated.Value(0));
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (triggerShow && message && type) {
      const currentDate = new Date();
      const isVisible = triggerShow.getTime() >= currentDate.getTime() - 2000;
      if (isVisible) {
        setVisible(true);
        fadeAnim.setValue(0);

        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }

        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }).start(() => {
          timeoutRef.current = setTimeout(() => {
            Animated.timing(fadeAnim, {
              toValue: 0,
              duration: 500,
              useNativeDriver: true,
            }).start(() => {
              setVisible(false);
            });
          }, duration);
        });
      }
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [triggerShow, message, type, fadeAnim, duration]);

  if (!type || !message || !triggerShow || !visible) return null;

  const backgroundColor = colors.toast[type ?? ToastType.success].background;
  const iconColor = colors.toast[type ?? ToastType.success].icon;
  const textColor = colors.toast[type ?? ToastType.success].text;
  const Icon = {
    success: CheckCircle,
    error: AlertCircle,
    warning: AlertTriangle,
  }[type];

  return (
    <Animated.View
      style={[
        styles.toastContainer,
        { backgroundColor, opacity: fadeAnim },
        style,
      ]}
    >
      <View style={styles.content}>
        <Icon color={iconColor} size={24} />
        <Text style={[styles.toastMessage, { color: textColor }]}>
          {message}
        </Text>
      </View>
    </Animated.View>
  );
};
