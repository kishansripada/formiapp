import React, {useState} from "react";
import {View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal';
import { convertToCentimeters, convertToFeetAndInches } from "../utils";
const iconSize = 20;
export const RosterModal = ({ activeIndex, setActiveIndex, modalHeight, dancers, pixelsPerSquare }) => {
  // console.log(dancers);
  const { width } = Dimensions.get('window');
  const visible = activeIndex === 1;
  const [clickedDancer, setClickedDancer] = useState(-1);
  const handleDancerPress = (index) => {
    setClickedDancer(index);
  };
  const clickedHeight = clickedDancer !== -1 ? ( dancers[clickedDancer].height ? convertToFeetAndInches(dancers[clickedDancer].height) : {"feet": 6, "inches": 0}) : 0;
  // console.log(clickedDancer ? clickedDancer : "no Clicked Dancer");
  console.log(clickedHeight);
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
          <View style={styles.rowContainer}>
            <View style={styles.leftView}>
            {dancers.map((dancer, index) => (
               <TouchableOpacity
               key={dancer.id}
               style={[
                 styles.dancerButton,
                 { backgroundColor: clickedDancer === index ? '#5f243d' : "#262626" }
               ]}
               onPress={() => handleDancerPress(index)}
             >
               <Text style={styles.dancerButtonText}>{`${index + 1}    ${dancer.name}`}</Text>
               <View style={[{backgroundColor: dancer?.color ? dancer?.color : "#db2877", borderBottomColor: dancer?.color ? dancer?.color : "#db2877"},                                  
                                 dancer?.shape === "square" ? styles.dancerIconSquare :
                                 dancer?.shape === "triangle" ? styles.dancerIconTriangle :
                                 styles.dancerIconCircle, styles.iconStyle]}/>
             </TouchableOpacity>
            ))}            
            </View>
            <View style={styles.heightDisplay}>
                  {clickedDancer !== -1 && (
                        <View>
                        <Text style={[{fontSize: pixelsPerSquare * 5}, styles.heightHeader]}>Height</Text>
                        <View style={styles.heightContainer}>
                          <View>
                            <Text style={[{fontSize: pixelsPerSquare * 5}, styles.sideText]}>{`${clickedHeight["feet"]} ft  `}</Text>
                          </View>
                          <View>
                            <Text style={[{fontSize: pixelsPerSquare * 5}, styles.sideText]}>{`${clickedHeight["inches"]} in`}</Text>
                          </View>
                        </View>
                      </View>

                  )}
            </View>
          </View>
          {/* Add more content here as needed */}
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
    color: "white",
    paddingVertical: 10, // Added padding vertically to give more space

  },
  rowContainer: {
    flexDirection: 'row', // Align children in a row
    justifyContent: 'space-between', // Use 'flex-start' to align children at the start of the container
    alignItems: 'center', // Align children vertically in the center
    height: '80%',
    width: '100%', // Take up full width to contain the children
  },
  leftView: {
    // backgroundColor: "blue",
    width: '50%',
    height: '80%',
    alignSelf: "flex-start"
  },
  heightDisplay: {
    backgroundColor: "red",
    width: '50%',
    height: '40%',
    alignSelf: "flex-start",
  },
  dancerButton:{
    flexDirection: 'row', // Arrange items in a row
    justifyContent: "space-between", // Put space between the items
    alignItems: "center", // Center items vertically
    width:'100%',
    height:'10%',
    // backgroundColor: "#262626"
  },
  dancerButtonText:{
    marginLeft: "7.5%",
    color: 'white',
    fontSize: 30,
    // textAlign: "center"
  },
  dancerIconCircle: {
    width: iconSize,
    height: iconSize,
    borderRadius: iconSize / 2,
 },
 dancerIconSquare: {
     width: iconSize,
     height: iconSize,
 },
 dancerIconTriangle: {
    width: 0,
    height: 0,
    backgroundColor: "solid",
    borderStyle: "solid",
    borderLeftWidth: iconSize / 2,
    borderRightWidth: iconSize / 2,
    borderBottomWidth: iconSize,
    borderLeftColor: "transparent",
    borderRightColor: "transparent",

  },
  iconStyle: {
    margin: 10
  },
  heightHeader: {
    color: 'white',
    fontWeight: 'bold',
    marginTop: 20,
    marginLeft: 20,
  },
  heightContainer: {
    margin: 20,
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  sideText: {
    color: 'white',
  }
});

