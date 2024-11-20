import { TextMain } from "@/components/TextMain";
import { TouchableMain } from "@/components/TouchableMain";
import { colors } from "@/constants/colors";
import { fonts } from "@/constants/fonts";
import { ChevronDownIcon, SearchIcon } from "lucide-react-native";
import React from "react";
import { View, TextInput, StyleSheet } from "react-native";

type SearchProps = {
  search: string;
  onChangeSearch: (search: string) => void;
  onPressSort: () => void;
};

const Search: React.FC<SearchProps> = ({
  search,
  onChangeSearch,
  onPressSort,
}) => {
  return (
    <View style={styles.container}>
      <SearchIcon size={24} color={colors.grey} style={styles.icon} />

      <TextInput
        value={search}
        onChangeText={onChangeSearch}
        style={styles.input}
        placeholder="Cari nama, bank, atau nominal"
        placeholderTextColor={colors.grey}
        multiline={false}
        numberOfLines={1}
        textAlignVertical="center"
      />

      <TouchableMain style={styles.sortContainer} onPress={onPressSort}>
        <TextMain style={styles.sortText}>Urutkan</TextMain>
        <ChevronDownIcon size={24} color={colors.orange} />
      </TouchableMain>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.white,
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 16,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
    marginHorizontal: 16,
  },
  icon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: colors.black,
    fontFamily: fonts.lato,
    padding: 0,
  },
  sortContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 8,
  },
  sortText: {
    fontSize: 14,
    color: colors.orange,
    marginRight: 4,
    fontFamily: fonts.latoBold,
    textTransform: "uppercase",
  },
});

export default Search;
