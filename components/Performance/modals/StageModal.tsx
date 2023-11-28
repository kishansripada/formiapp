import React from "react";
import {View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal';

export const StageModal = ({ activeIndex, setActiveIndex, modalHeight, cloudSettings }) => {
  const { width } = Dimensions.get('window');
  const visible = activeIndex === 4;
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
          <Text style={[{fontSize: titleSize}, styles.modalTitle]}>{"Stage"}</Text>
          <View>
            <View style={styles.setting}>
              <Text style={[{fontSize: subHeadingSize},styles.settingTitle]}>Stage Dimensions (feet)</Text>
              <Text style={[{fontSize: textSize}, styles.settingText]}>Width: {cloudSettings.stageDimensions.width}</Text>
              <Text style={[{fontSize: textSize}, styles.settingText]}>Height: {cloudSettings.stageDimensions.height}</Text>
            </View>
            <View style={styles.setting}>
              <Text style={[{fontSize: subHeadingSize},styles.settingTitle]}>Stage Background</Text>
              <Text style={[{fontSize: textSize}, styles.settingText]}>{cloudSettings.stageBackground === "grid" ? "Grid" : cloudSettings.stageBackground === "gridfluid" ? "Fluid Grid" : ""}</Text>
            </View>
            {
              cloudSettings?.stageBackground === "grid" ? (
                <Text style={styles.settingText}>Subdivisions: {cloudSettings.gridSubdivisions}</Text>
              ) : (cloudSettings?.stageBackground === "gridfluid") ? (
                <View>
                  <View style={styles.setting}>
                    <Text style={[{fontSize: subHeadingSize},styles.settingTitle]}>Stage Lines</Text>
                    <Text style={[{fontSize: textSize}, styles.settingText]}>Vertical: {cloudSettings.gridSubdivisions}</Text>
                    <Text style={[{fontSize: textSize}, styles.settingText]}>Horizontal: {cloudSettings.horizontalGridSubdivisions}</Text>
                  </View>
                  <View style={styles.setting}>
                    <Text style={[{fontSize: subHeadingSize},styles.settingTitle]}>Subdivisions (grid snap)</Text>
                    <Text style={[{fontSize: textSize}, styles.settingText]}>Vertical: {cloudSettings.verticalFineDivisions}</Text>
                    <Text style={[{fontSize: textSize}, styles.settingText]}>Horizontal: {cloudSettings.horizontalFineDivisions}</Text>
                  </View>
                </View>
              ) : (<View/>)
            }
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
