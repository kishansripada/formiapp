import React from "react";
import {View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal';

export const RosterModal = ({ activeIndex, setActiveIndex, modalHeight }) => {
  const { width } = Dimensions.get('window');
  const visible = activeIndex === 1;

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
          <Text style={styles.modalTitle}>{"Roster"}</Text>
          {/* Add more content here as needed */}
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
    height: '65%',
    borderWidth: 1,
    borderColor: '#DCDCDC',
    borderRadius: 5,
    padding: "3%",
    paddingTop: "3%",
    fontSize: 30,
    alignSelf: 'center', 
    textAlignVertical: 'top', // This ensures that the text starts from the top on Android
    backgroundColor: '#DCDCDC',
  },

  modalContainer: {
    justifyContent: 'flex-end', // Aligns the modal to the bottom
    margin: 0, // Removes default margin for full width
  },
  modalContent: {
    backgroundColor: 'white',
    alignSelf: "center",
    borderRadius: 10,
    // Other styles remain the same
  },
  closeButton: {
    alignSelf: 'flex-end',
    margin: 15
  },
  closeButtonText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#333', // Or any color you prefer
  },
  modalTitle: {
    fontSize: 40,
    fontWeight: 'bold', 
    textAlign: 'center',
    // paddingVertical: 10, // Added padding vertically to give more space

  },
});
