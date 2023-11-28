import React from "react";
import {View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal';

export const MediaModal = ({ activeIndex, setActiveIndex, modalHeight, soundCloudId}) => {
  const { width } = Dimensions.get('window');
  const visible = activeIndex === 2;
  const titleSize = modalHeight/20;
  const textSize =  modalHeight/40;
  const selectedFile = soundCloudId !== "" ?  soundCloudId.split(/audiofiles\/[^\/]*\//).pop(): "No File Selected";


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
            <Text style={[{fontSize: modalHeight/32}, styles.closeButtonText]}>X</Text>
          </TouchableOpacity>
          <Text style={[{fontSize: titleSize}, styles.modalTitle]}>{"Media"}</Text>
          <View style={styles.box}>
            <Text style={[{fontSize: textSize}, styles.text]} numberOfLines={1}>{selectedFile}</Text>
          </View>



        </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    justifyContent: 'flex-end', // Aligns the modal to the bottom
    margin: 0, // Removes default margin for full width
  },
  modalContent: {
    backgroundColor: '#262626',
    alignSelf: "center",
    borderRadius: 10,
    alignItems: 'center',
  },
  closeButton: {
    alignSelf: 'flex-end',
    margin: 10
  },
  closeButtonText: {
    fontWeight: 'bold',
    color: 'white', // Or any color you prefer
  },
  modalTitle: {
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginBottom: 20,
  },
  box: {
    backgroundColor: '#5f243d',
    borderRadius: 10,
    width: '50%',
    height: '5%', // Assuming modalHeight is defined in the same scope
    justifyContent: 'center', // This centers the text vertically
    alignItems: 'center', // This centers the text horizontally
    paddingHorizontal: '2.5%'
  },
  text: {
    color: 'white',
    textAlign: 'center', // Ensures text is centered within the text component itself
    // ...other styles remain unchanged
  },
});