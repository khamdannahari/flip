import { colors } from "@/constants/colors";
import { fonts } from "@/constants/fonts";
import { StatusBar, StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  toastContainer: {
    position: "absolute",
    top: (StatusBar.currentHeight ?? 0) + 80,
    left: 20,
    right: 20,
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 8,
    zIndex: 1000,
    shadowColor: colors.black,
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
  },
  toastMessage: {
    fontSize: 16,
    textAlign: "left",
    marginLeft: 10,
    flex: 1,
    fontFamily: fonts.lato,
  },
});
