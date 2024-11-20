import { TextMain } from "@/components/TextMain";
import { TouchableMain } from "@/components/TouchableMain";
import { colors } from "@/constants/colors";
import { fonts } from "@/constants/fonts";
import React, { useState } from "react";
import {
  View,
  Modal,
  StyleSheet,
  FlatList,
  TouchableWithoutFeedback,
} from "react-native";

interface SortPopupProps {
  visible: boolean;
  onClose: () => void;
  onSelect: (sortId: string) => void;
}

const SortPopup: React.FC<SortPopupProps> = ({
  visible,
  onClose,
  onSelect,
}) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const sortOptions = [
    { id: "1", label: "Nama A-Z" },
    { id: "2", label: "Nama Z-A" },
    { id: "3", label: "Tanggal Terbaru" },
    { id: "4", label: "Tanggal Terlama" },
  ];

  const handleOptionSelect = (option: string) => {
    setSelectedOption(option);
    onSelect(option);
  };

  return (
    <Modal visible={visible} transparent animationType="fade">
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.overlay}>
          <TouchableWithoutFeedback>
            <View style={styles.popup}>
              <View style={styles.header}>
                <TextMain style={styles.title}>URUTKAN</TextMain>
              </View>

              <FlatList
                data={sortOptions}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                  <TouchableMain
                    style={styles.option}
                    onPress={() => handleOptionSelect(item.id)}
                  >
                    <View style={styles.radio}>
                      {selectedOption === item.id && (
                        <View style={styles.selectedRadio} />
                      )}
                    </View>
                    <TextMain style={styles.optionText}>{item.label}</TextMain>
                  </TouchableMain>
                )}
              />
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  popup: {
    width: "80%",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 16,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  title: {
    fontSize: 18,
    fontFamily: fonts.latoBold,
  },
  closeButton: {
    color: "blue",
    fontSize: 16,
  },
  option: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
  },
  radio: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#ccc",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 8,
  },
  selectedRadio: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: colors.orange,
  },
  optionText: {
    fontSize: 16,
  },
});

export default SortPopup;
