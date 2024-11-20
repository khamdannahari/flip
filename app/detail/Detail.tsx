import React from "react";
import { View, StyleSheet, SafeAreaView } from "react-native";
import { ArrowRightIcon, CopyIcon } from "lucide-react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { colors } from "@/constants/colors";
import { TextMain } from "@/components/TextMain";
import { TouchableMain } from "@/components/TouchableMain";
import { fonts } from "@/constants/fonts";
import { Toast } from "@/components/Toast";
import { useDetailState } from "./useDetailState";
import { useDetailAction } from "./useDetailAction";

export type DetailProps = {
  id: string;
  senderBank: string;
  beneficiaryBank: string;
  beneficiaryName: string;
  accountNumber: string;
  amount: string;
  remark: string;
  uniqueCode: string;
  createdDate: string;
  onClose?: () => void;
};

const Detail: React.FC = () => {
  const insets = useSafeAreaInsets();

  const {
    id,
    senderBank,
    beneficiaryBank,
    beneficiaryName,
    accountNumber,
    amount,
    remark,
    uniqueCode,
    createdDate,
  } = useDetailState((state) => state.detail);

  const toastProps = useDetailState((state) => state.toastProps);

  const { onCopy, onClose } = useDetailAction();

  return (
    <SafeAreaView style={[styles.container, { paddingTop: insets.top + 16 }]}>
      <View style={[styles.row, { marginVertical: 24 }]}>
        <TextMain style={styles.id}>
          {"IDTRANSAKSI:#"}
          {id}
        </TextMain>
        <TouchableMain onPress={onCopy}>
          <CopyIcon size={20} color="#000" />
        </TouchableMain>
      </View>

      <View style={styles.divider} />

      <View style={[styles.row, { marginVertical: 24 }]}>
        <TextMain style={styles.detailText}>DETAIL TRANSAKSI</TextMain>
        <TouchableMain onPress={onClose}>
          <TextMain style={styles.closeText}>Tutup</TextMain>
        </TouchableMain>
      </View>

      <View style={styles.divider} />

      <View style={[styles.row, styles.banksRow]}>
        <TextMain style={styles.bankText}>{senderBank}</TextMain>
        <ArrowRightIcon size={20} color="#000" />
        <TextMain style={styles.bankText}>{beneficiaryBank}</TextMain>
      </View>

      <View style={styles.row}>
        <View style={styles.column}>
          <TextMain style={styles.label}>{beneficiaryName}</TextMain>
          <TextMain style={styles.value}>{accountNumber}</TextMain>
        </View>
        <View style={styles.column}>
          <TextMain style={styles.label}>NOMINAL</TextMain>
          <TextMain style={styles.value}>{amount}</TextMain>
        </View>
      </View>

      <View style={styles.row}>
        <View style={styles.column}>
          <TextMain style={styles.label}>BERITA TRANSFER</TextMain>
          <TextMain style={styles.value}>{remark}</TextMain>
        </View>
        <View style={styles.column}>
          <TextMain style={styles.label}>KODE UNIK</TextMain>
          <TextMain style={styles.value}>{uniqueCode}</TextMain>
        </View>
      </View>

      <View style={styles.row}>
        <View style={styles.column}>
          <TextMain style={styles.label}>WAKTU DIBUAT</TextMain>
          <TextMain style={styles.value}>{createdDate}</TextMain>
        </View>
      </View>

      <Toast {...toastProps} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flex: 1,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 12,
    marginHorizontal: 16,
    gap: 16,
  },
  headerRow: {
    marginVertical: 0,
  },
  divider: {
    height: 1,
    backgroundColor: colors.codeE4E4E4,
    width: "100%",
  },
  id: {
    fontSize: 16,
    fontWeight: "bold",
  },
  detailText: {
    fontSize: 16,
    fontWeight: "bold",
    flex: 1,
  },
  closeText: {
    fontSize: 14,
    color: colors.orange,
  },
  banksRow: {
    justifyContent: "flex-start",
    gap: 2,
  },
  bankText: {
    fontSize: 14,
    textTransform: "uppercase",
    fontFamily: fonts.latoBold,
  },
  column: {
    flex: 1,
  },
  label: {
    fontSize: 12,
    color: colors.black,
    textTransform: "uppercase",
    fontFamily: fonts.latoBold,
  },
  value: {
    fontSize: 14,
    marginTop: 4,
    color: colors.black,
  },
});

export default Detail;
