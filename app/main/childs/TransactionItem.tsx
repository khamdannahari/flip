import { TextMain } from "@/components/TextMain";
import { TouchableMain } from "@/components/TouchableMain";
import { colors } from "@/constants/colors";
import { fonts } from "@/constants/fonts";
import React from "react";
import { View, StyleSheet } from "react-native";

export type TransactionItemProps = {
  id: string;
  senderBank: string;
  beneficiaryBank: string;
  beneficiaryName: string;
  accountNumber: string;
  amount: string;
  remark: string;
  uniqueCode: string;
  createdDate: string;
  isSuccess: boolean;
  onPressItem?: (id: string) => void;
};

const TransactionItem: React.FC<TransactionItemProps> = React.memo(
  ({
    id,
    senderBank,
    beneficiaryBank,
    beneficiaryName,
    amount,
    createdDate,
    isSuccess,
    onPressItem,
  }) => {
    return (
      <TouchableMain style={styles.container} onPress={() => onPressItem?.(id)}>
        <View
          style={[
            styles.leftBar,
            { backgroundColor: isSuccess ? colors.green : colors.orange },
          ]}
        />

        <View style={styles.textContainer}>
          <TextMain style={styles.bankText}>
            {senderBank} ➔ {beneficiaryBank}
          </TextMain>
          <TextMain style={styles.senderText}>{beneficiaryName}</TextMain>
          <TextMain style={styles.amountText}>
            {amount} • {createdDate}
          </TextMain>
        </View>

        <View
          style={[
            styles.statusContainer,
            { borderColor: isSuccess ? colors.green : colors.orange },
            { backgroundColor: isSuccess ? colors.green : undefined },
          ]}
        >
          <TextMain
            style={[
              styles.statusText,
              { color: isSuccess ? colors.white : colors.black },
            ]}
          >
            {isSuccess ? "Berhasil" : "Pengecekan"}
          </TextMain>
        </View>
      </TouchableMain>
    );
  },
);

TransactionItem.displayName = "TransactionItem";

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.white,
    borderRadius: 8,
    marginVertical: 8,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  leftBar: {
    width: 8,
    height: "100%",
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
  },
  textContainer: {
    flex: 1,
    padding: 16,
  },
  bankText: {
    fontSize: 16,
    color: colors.black,
    fontFamily: fonts.latoBold,
    textTransform: "uppercase",
  },
  senderText: {
    fontSize: 14,
    marginTop: 4,
    textTransform: "uppercase",
  },
  amountText: {
    fontSize: 14,
    color: colors.black,
    marginTop: 4,
  },
  statusContainer: {
    borderWidth: 1,
    borderColor: colors.black,
    borderRadius: 5,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginRight: 16,
  },
  statusText: {
    fontSize: 14,
    fontFamily: fonts.latoBold,
  },
});

export default TransactionItem;
