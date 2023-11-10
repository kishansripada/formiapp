import React from "react";
import { Modal, View, Text, StyleSheet, Dimensions, TouchableOpacity} from 'react-native';
export const MediaModal = ({activeIndex, setActiveIndex, modalHeight}) => {
  // Get the full dimensions of the screen
  const { width, height } = Dimensions.get('window');
  const visible = activeIndex === 2;
  return (
    <Modal
      transparent={true}
      visible={visible}
      onRequestClose={() => setActiveIndex(null)}
    >
      <View style={[styles.modalOverlay, { width, height: modalHeight}]}>
        <View style={[styles.modalContent, { width, height: modalHeight }]}>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setActiveIndex(null)}
          >
            <Text style={styles.closeButtonText}>X</Text>
          </TouchableOpacity>
          <Text style={styles.modalTitle}>{"Media"}</Text>
          {/* Add more content here as needed */}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    // width: '90%', // Adjust the width as needed
    // maxHeight: '80%', // Adjust the max height as needed
    borderRadius: 10, // Optional: for rounded corners
    padding: 20, // Add padding for inner content
  },
  closeButton: {
    alignSelf: 'flex-end',
  },
  closeButtonText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333', // Or any color you prefer
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  }
});


