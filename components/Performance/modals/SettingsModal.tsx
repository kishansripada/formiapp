import React from "react";
import {View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal';

export const SettingsModal = ({ activeIndex, setActiveIndex, modalHeight, cloudSettings}) => {
  const { width } = Dimensions.get('window');
  const visible = activeIndex === 5;
  const prevFormations = ["None", "Ghost Dancers", "Ghost Dancers + Path"];
  const gridSnaps = ["None", "Half Square", "Whole Square"];
  const dancerStyles = ["Initials", "Numbered", "Solid", "Initials and Name"];
  const videoPositions = ["PIP", "Left", "Above", "Hidden"];
  const titleSize = modalHeight/20;
  const subHeadingSize = modalHeight/32;
  const textSize = modalHeight/40;

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
          <Text style={[{fontSize: titleSize}, styles.modalTitle]}>{"Settings"}</Text>
          <View>
            <View style={styles.setting}>
              <Text style={[{fontSize: subHeadingSize},styles.settingTitle]}>Previous Formation's Avatars</Text>
              <Text style={[{fontSize: textSize}, styles.settingText]}> {prevFormations[0]} </Text>
            </View>
            <View style={styles.setting}>
              <Text style={[{fontSize: subHeadingSize},styles.settingTitle]}>Grid Snap</Text>
              <Text style={[{fontSize: textSize}, styles.settingText]}> {gridSnaps[2]}</Text>
            </View>
            <View style={styles.setting}>
              <Text style={[{fontSize: subHeadingSize},styles.settingTitle]}>Dancer Style</Text>
              {/* Missing from API call */}
              <Text style={[{fontSize: textSize}, styles.settingText]}>{dancerStyles[2]}</Text>
            </View>
            <View style={styles.setting}>
              <Text style={[{fontSize: subHeadingSize},styles.settingTitle]}>Video Position</Text>
              {/* Missing from API call*/}
              <Text style={[{fontSize: textSize}, styles.settingText]}>{videoPositions[0]}</Text>
            </View>
   
          </View>
        </View>
    </Modal>
  )
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
  settingTitle: {
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
  settingText: {
    color: 'white',
    textAlign: 'center',
    marginTop: 10,
    borderColor: 'white',
    borderWidth: 1,
    width: '35%',
  },
  setting: {
    marginBottom: 25,
    alignItems: "center",
  }
});