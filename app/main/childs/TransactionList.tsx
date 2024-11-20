import React from "react";
import { FlatList, StyleSheet } from "react-native";
import TransactionItem, { TransactionItemProps } from "./TransactionItem";

export type TransactionListProps = {
  transactions: TransactionItemProps[];
  onPressItem?: (id: string) => void;
};

const TransactionList: React.FC<TransactionListProps> = ({
  transactions,
  onPressItem,
}) => {
  const renderItem = ({ item }: { item: TransactionItemProps }) => (
    <TransactionItem {...item} onPressItem={onPressItem} />
  );

  return (
    <FlatList
      data={transactions}
      windowSize={10}
      keyExtractor={(item) => item.id}
      renderItem={renderItem}
      contentContainerStyle={styles.listContainer}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  listContainer: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
});

export default TransactionList;
