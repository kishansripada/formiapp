import { ScreenWidth } from "@rneui/base";
import React from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import Modal from "react-native-modal";

// to change from view-only to editable: first remove editable = false from textInput,
// and pass in text and SetText as props.
export const FormModal = ({
  activeIndex,
  setActiveIndex,
  modalHeight,
  title,
  text,
  pixelsPerSquare,
}) => {
  const { width } = Dimensions.get("window");
  const visible = activeIndex === 0;
  const titleSize = pixelsPerSquare * 2;
  const textSize = pixelsPerSquare * 1.5;

  return (
    <Modal
      isVisible={visible}
      hasBackdrop={false}
      coverScreen={false}
      style={styles.modalContainer} // Added style for positioning the modal
    >
      <View style={[styles.modalContent, { width, height: modalHeight }]}>
        <TouchableOpacity
          style={styles.closeButton}
          onPress={() => setActiveIndex(null)}
        >
          <Text style={[{fontSize: textSize}, styles.closeButtonText]}>X</Text>
        </TouchableOpacity>
        <Text style={[{fontSize: titleSize}, styles.modalTitle]}>{title}</Text>
        {/* <ScrollView> */}
        <TextInput
          style={[{fontSize: textSize}, styles.textBox]}
          editable={false} // currently view-only
          value={text}
          // placeholder="Notes..."
          multiline={true}
          numberOfLines={4} // You can adjust this as needed
          />
        {/* </ScrollView> */}
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  // modalOverlay: {
  //   flex: 0,
  //   justifyContent: 'flex-end',
  //   alignItems: 'center',
  // },

  textBox: {
    width: "90%",
    height: "78%",
    borderWidth: 1,
    borderColor: "#dc2f79",
    borderRadius: 23,
    shadowOffset: { width: -5, height: 5 },
    shadowColor: "black",
    shadowOpacity: 0.7,
    shadowRadius: 5,
    padding: "3%",
    paddingTop: "3%",
    paddingBottom: "3%", 
    color: "white",
    alignSelf: "center",
    textAlignVertical: "top", // This ensures that the text starts from the top on Android
    backgroundColor: "#383838",
  },

  modalContainer: {
    justifyContent: "flex-end", // Aligns the modal to the bottom
    margin: 0, // Removes default margin for full width
  },
  modalContent: {
    backgroundColor: "#262626",
    alignSelf: "center",
    borderRadius: 10,
    // Other styles remain the same
  },
  closeButton: {
    alignSelf: "flex-end",
    margin: 10,
  },
  closeButtonText: {
    fontWeight: "bold",
    color: "white", // Or any color you prefer
  },
  modalTitle: {
    fontWeight: "bold",
    textAlign: "center",
    // paddingLeft: "6%",
    color: "white",
    shadowOffset: { width: -2, height: 4 },
    shadowColor: "black",
    shadowOpacity: 0.9,
    shadowRadius: 5,
    paddingBottom: "4%",
    // textDecorationLine: 'underline',
    paddingVertical: 20, // Added padding vertically to give more space
  },
});
