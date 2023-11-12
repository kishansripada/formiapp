import { ScreenWidth } from "@rneui/base";
import React from "react";
import {View, Text, TextInput, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal';

// to change from view-only to editable: first remove editable = false from textInput,
// and pass in text and SetText as props.
export const FormModal = ({ activeIndex, setActiveIndex, modalHeight, title, text}) => {
  const { width } = Dimensions.get('window');
  const visible = activeIndex === 0;

  return (
    <Modal
      isVisible={visible}
      hasBackdrop={false}
      coverScreen={false}
      style={styles.modalContainer} // Added style for positioning the modal
    >
        <View style={[styles.modalContent, { width, height: modalHeight}]}>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setActiveIndex(null)}
          >
            <Text style={styles.closeButtonText}>X</Text>
          </TouchableOpacity>
          <Text style={styles.modalTitle}>{title}</Text>
          <TextInput
            style={styles.textBox}
            editable={false} // currently view-only
            value = {text}
            // placeholder="Notes..."
            multiline={true}
            numberOfLines={4} // You can adjust this as needed
          />
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
    width: '80%', 
    height: '75%',
    borderWidth: 5,
    borderColor: '#dc2f79',
    borderRadius: 20,
    
    padding: "3%",
    paddingTop: "3%",
    fontSize: 30,
    color: "white",
    alignSelf: 'center', 
    textAlignVertical: 'top', // This ensures that the text starts from the top on Android
    backgroundColor: '#383838',
  },

  modalContainer: {
    justifyContent: 'flex-end', // Aligns the modal to the bottom
    margin: 0, // Removes default margin for full width
  },
  modalContent: {
    backgroundColor: "#262626",
    alignSelf: "center",
    borderRadius: 10,
    // Other styles remain the same
  },
  closeButton: {
    alignSelf: 'flex-end',
    margin: 10
  },
  closeButtonText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'white', // Or any color you prefer
  },
  modalTitle: {
    fontSize: 40,
    fontWeight: 'bold', 
    textAlign: 'center',
    color:"#dc2f79",
    paddingVertical: 20, // Added padding vertically to give more space

  },
});
