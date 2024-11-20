import React from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import Search from "./childs/Search";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import TransactionList from "./childs/TransactionList";
import SortPopup from "./childs/SortPopup";
import { useMainAction } from "./useMainAction";
import { useMainState } from "./useMainState";

const Main: React.FC = () => {
  const insets = useSafeAreaInsets();

  const search = useMainState((state) => state.search);
  const showSortPopup = useMainState((state) => state.showSortPopup);
  const transactionList = useMainState((state) => state.transactionList);

  const {
    onChangeSearch,
    onPressSort,
    onCloseSort,
    onSelectSort,
    onPressItem,
  } = useMainAction();

  return (
    <SafeAreaView style={[styles.container, { paddingTop: insets.top + 16 }]}>
      <Search
        search={search}
        onChangeSearch={onChangeSearch}
        onPressSort={onPressSort}
      />
      <TransactionList
        transactions={transactionList}
        onPressItem={onPressItem}
      />
      <SortPopup
        visible={showSortPopup}
        onClose={onCloseSort}
        onSelect={onSelectSort}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Main;
