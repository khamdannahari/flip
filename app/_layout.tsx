import React, { useEffect, useMemo } from "react";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { fonts } from "@/constants/fonts";
import { Stack } from "expo-router";
import { pageName } from "@/constants/pages";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    [fonts.lato]: require("../assets/fonts/Lato-Regular.ttf"),
    [fonts.latoBold]: require("../assets/fonts/Lato-Bold.ttf"),
  });

  const options = useMemo(() => ({ headerShown: false }), []);

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <Stack>
      <Stack.Screen name={pageName.main} options={options} />
      <Stack.Screen name={pageName.detail} options={options} />
    </Stack>
  );
}
