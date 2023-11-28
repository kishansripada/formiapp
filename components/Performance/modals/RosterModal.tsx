import React, {useState} from "react";
import {View, Text, StyleSheet, Dimensions, TouchableOpacity, ScrollView } from 'react-native';
import Modal from 'react-native-modal';
import { convertToFeetAndInches } from "../utils";
export const RosterModal = ({ activeIndex, setActiveIndex, modalHeight, dancers }) => {
  const { width } = Dimensions.get('window');
  const visible = activeIndex === 1;
  const [clickedDancer, setClickedDancer] = useState(-1);

  const iconSize = modalHeight/40;
  const barIconSize = modalHeight/20;
  const titleSize = modalHeight/20;
  const textSize = modalHeight/32;
  const clickedHeight = clickedDancer !== -1 ? ( dancers[clickedDancer].height ? convertToFeetAndInches(dancers[clickedDancer].height) : {"feet": 6, "inches": 0}) : 0;
  const Container = dancers.length > 10 ? ScrollView : View;
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
          <Text style={[{fontSize: titleSize}, styles.modalTitle]}>{"Roster"}</Text>
          <View style={styles.rowContainer}>
            <Container style={styles.leftView}>
            {dancers.map((dancer, index) => (
               <TouchableOpacity
               key={dancer.id}
               style={[
                 styles.dancerButton,
                 { backgroundColor: clickedDancer === index ? '#5f243d' : "#262626", height: 0.08 * modalHeight}
               ]}
               onPress={() => setClickedDancer(index)}
             >
               <Text numberOfLines={1} ellipsizeMode = "clip" style={[styles.dancerButtonText, {fontSize: textSize}]}>{`${index + 1}    ${dancer.name}`}</Text>
               <View style={[{backgroundColor: dancer?.color ? dancer?.color : "#db2877", borderBottomColor: dancer?.color ? dancer?.color : "#db2877"},                                  
                                 dancer?.shape === "square" ? {width: iconSize, height: iconSize} :
                                 dancer?.shape === "triangle" ? {
                                  width: 0,
                                  height: 0,
                                  backgroundColor: "solid",
                                  borderStyle: "solid",
                                  borderLeftWidth: iconSize / 2,
                                  borderRightWidth: iconSize / 2,
                                  borderBottomWidth: iconSize,
                                  borderLeftColor: "transparent",
                                  borderRightColor: "transparent",
                                } :
                                {width: iconSize, height: iconSize, borderRadius: iconSize / 2,}, styles.iconStyle]}/>
             </TouchableOpacity>
            ))}         
          </Container>
          <View style ={styles.rightView}>
            {clickedDancer !== -1 && (
                <View>
                  <View>
                              <View>
                              <Text style={[{fontSize: textSize}, styles.heightHeader]}>Height</Text>
                              <View style={styles.heightContainer}>
                                <View>
                                  <Text style={[{fontSize: textSize}, styles.sideText]}>{`${clickedHeight["feet"]} ft `}</Text>
                                </View>
                                <View>
                                  <Text style={[{fontSize: textSize}, styles.sideText]}>{`${clickedHeight["inches"]} in`}</Text>
                                </View>
                              </View>
                            </View>
                  </View>
                  <View style = {styles.topText}>
                    <Text style={{fontSize: textSize, marginBottom: '2.5%', color: 'white', fontWeight: 'bold'}}>Shape</Text>
                  </View>
                  <View style={styles.iconBar}>
                    <TouchableOpacity activeOpacity={1} style={[{backgroundColor: dancers[clickedDancer]?.shape ? dancers[clickedDancer]?.shape == "circle" ? "white" : "#262626" : "white" , borderColor: "white", borderWidth: modalHeight/200, marginLeft: '2.5%', marginRight: "7.5%", }, {width: barIconSize*1.25, height: barIconSize*1.25, borderRadius: barIconSize *1.25 / 2,}]}/>
                    <TouchableOpacity 
                        activeOpacity={1}
                        style={[{backgroundColor: dancers[clickedDancer]?.shape == "square" ? "white": "#262626", borderColor: "white", borderWidth: modalHeight/200, marginRight: "7.5%"}, {width: barIconSize*1.25, height: barIconSize*1.25}]}/>
                    <View style={[{borderBottomColor: "white"}, {
                                  width: 0,
                                  height: 0,
                                  // backgroundColor: "solid",
                                  borderStyle: "solid",
                                  borderLeftWidth: barIconSize / 2 * 1.3,
                                  borderRightWidth: barIconSize / 2 * 1.3,
                                  borderBottomWidth: barIconSize * 1.27,
                                  borderLeftColor: "transparent",
                                  borderRightColor: "transparent",
                                  alignItems: 'center',
                                }]}>
                    <TouchableOpacity activeOpacity={1} style={[{borderBottomColor: dancers[clickedDancer]?.shape == "triangle" ? "white": "#262626"}, {
                                  width: 0,
                                  height: 0,
                                  // backgroundColor: "solid",
                                  borderStyle: "solid",
                                  borderLeftWidth: barIconSize / 2,
                                  borderRightWidth: barIconSize / 2,
                                  borderBottomWidth: barIconSize,
                                  borderLeftColor: "transparent",
                                  borderRightColor: "transparent",
                                  position: 'absolute',
                                  top: modalHeight/100,
                                }]}/>
                    </View>
                  </View>
                <Text style={{fontSize: textSize, marginBottom: '2.5%', color: 'white', fontWeight: 'bold'}}>Color</Text>
                <TouchableOpacity 
                        activeOpacity={1}
                        style={[{backgroundColor: dancers[clickedDancer]?.color ? dancers[clickedDancer]?.color : "#db2877"}, { marginLeft: "2%", width: barIconSize*1.25, height: barIconSize*1.25}]}/>
              </View>
            )}
        </View>
        </View>
        </View>   
    </Modal>

)};

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
    fontWeight: 'bold',
    color: 'white', // Or any color you prefer
  },
  modalTitle: {
    fontWeight: 'bold', 
    textAlign: 'center',
    color: "white",
    paddingVertical: 10, // Added padding vertically to give more space

  },
  rowContainer: {
    flexDirection: 'row', // Align children in a row
    justifyContent: 'space-between', // Use 'flex-start' to align children at the start of the container
    alignItems: 'center', // Align children vertically in the center
    height: "80%",
    width: '100%', // Take up full width to contain the children
  },
  leftView: {
    // backgroundColor: "blue",
    marginLeft: "5%",
    width: '50%',
    height: '80%',
    alignSelf: "flex-start"
  },
  rightView:{
    marginLeft: "5%",
    width: '50%',
    height: '40%',
    alignSelf: "flex-start",
    // backgroundColor: "red",
  },

  dancerButton:{
    flexDirection: 'row', // Arrange items in a row
    justifyContent: "space-between", // Put space between the items
    alignItems: "center", // Center items vertically
    width:'100%',
  },
  dancerButtonText:{
    marginLeft: "7.5%",
    paddingRight: "25%",
    color: 'white',
    // textAlign: "center"
  },
  topText:{
    flexDirection: "row",
    justifyContent: 'space-between', // This will align "Shape" to the left and "Color" to the right
    alignItems: 'center', // This will ensure they are aligned horizontally
    width: "100%",
    paddingRight: '25%', // This will push "Color" 2.5% off of the right side
  },
  iconStyle: {
    position: "absolute",
    right: '5%'
  },
  heightHeader: {
    color: 'white',
    fontWeight: 'bold',
    marginTop: "5%",
    marginBottom: "1.5%"
  },
  heightContainer: {
    marginBottom: "5%",
    flexDirection: 'row',
    alignItems: 'center',
  },
  sideText: {
    flexDirection: 'row',
    color: 'white',
  },
  iconBar: {
    // marginLeft:
    flexDirection: 'row', // Arrange items in a row
    width: '100%',
    marginBottom: "4%"
  }
});
