import React, {useState} from "react";
import {View, ScrollView, Text, StyleSheet, Dimensions, TouchableOpacity, Image} from 'react-native';
import { SvgUri } from 'react-native-svg';
import Modal from 'react-native-modal';

export const PropsModal = ({ activeIndex, setActiveIndex, modalHeight, props}) => {
  const { width } = Dimensions.get('window');
  const visible = activeIndex === 3;
  const [clickedProp, setClickedProp] = useState(-1);
  const propBaseUrl = `https://dxtxbxkkvoslcrsxbfai.supabase.co/storage/v1/object/public/props/`;
  // console.log(props);
  const activeColor = "#c5c5c5";
  const inactiveColor = '#525252'
  const propSvg = `<svg
  xmlns="http://www.w3.org/2000/svg"
  viewBox="0 0 24 24"
  strokeWidth="1.5"
  stroke="${inactiveColor}"
  fill="none"
>
  <path
    strokeLinecap="round"
    strokeLinejoin="round"
    d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9"
  />
</svg>
`
  const iconSize = modalHeight/30;
  const barIconSize = modalHeight/20;
  const titleSize = modalHeight/20;
  const textSize = modalHeight/32;
  const Container = props.length > 8 ? ScrollView : View;
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
          <Text style={[{fontSize: titleSize}, styles.modalTitle]}>{"Props"}</Text>
          <View style={styles.rowContainer}>
              <Container style={styles.leftView}>
              {props.map((prop, index) => (
                <TouchableOpacity
                key={prop.id}
                style={[
                  styles.propButton,
                  { backgroundColor: clickedProp === index ? '#5f243d' : "#262626", height: 0.1 * modalHeight }
                ]}
                onPress={() => setClickedProp(index)}
              >
                <Text numberOfLines={1} ellipsizeMode="clip" style={[styles.propButtonText, {fontSize: textSize}]}>{`${prop.name}`}</Text>
                <View style={[{width: iconSize, height: iconSize}, styles.iconStyle]}>
                  <Image
                    resizeMode={"contain"}
                    style={[styles.prop]}
                    source={{ uri: propBaseUrl + props[index]?.url}}
                    alt="image failed to load"
                    />
                </View>
              </TouchableOpacity>
              ))}         
            </Container>
          <View style = {styles.rightView}>
              {clickedProp !== -1 && (
                  <View>
                    <View>
                                <View>
                                <Text style={[{fontSize: textSize}, styles.rightHeader]}>Width</Text>
                                <View style={styles.widthContainer}>
                                    <Text style={[{fontSize: textSize}, styles.sideText]}>{`${props[clickedProp].width ? props[clickedProp].width : 1} squares `}</Text>
                                </View>
                              </View>
                    </View>
          
                  <Text style={{fontSize: textSize, marginBottom: '2.5%', color: 'white', fontWeight: 'bold'}}>Side</Text>
                  <View style={[styles.iconContainer, {marginLeft: '-30%'}]}>
                    <TouchableOpacity activeOpacity={1}>
                      <SvgUri width={barIconSize} height={barIconSize} uri={`data:image/svg+xml;utf8,${encodeURIComponent(props[clickedProp].side ? props[clickedProp].side == "top" ? propSvg.replace(inactiveColor, activeColor) : propSvg : propSvg.replace(inactiveColor, activeColor))}`}/>
                    </TouchableOpacity>
                    <View style={[styles.iconRow, styles.centerRow]}>
                      <TouchableOpacity activeOpacity={1}>
                        <SvgUri width={barIconSize} height={barIconSize} uri={`data:image/svg+xml;utf8,${encodeURIComponent(props[clickedProp].side == "left" ? propSvg.replace(inactiveColor, activeColor) : propSvg)}`} />
                      </TouchableOpacity>
                      <View style={{width: iconSize, height: iconSize, borderRadius: iconSize / 2, backgroundColor:"#db2877", margin: '5%'}}/>
                      <TouchableOpacity activeOpacity={1}>
                        <SvgUri width={barIconSize} height={barIconSize} uri={`data:image/svg+xml;utf8,${encodeURIComponent(props[clickedProp].side == "right" ? propSvg.replace(inactiveColor, activeColor) : propSvg)}`} />
                      </TouchableOpacity>
                    </View>
                    <TouchableOpacity activeOpacity={1}>
                      <SvgUri width={barIconSize} height={barIconSize} uri={`data:image/svg+xml;utf8,${encodeURIComponent(props[clickedProp].side == "bottom" ? propSvg.replace(inactiveColor, activeColor) : propSvg)}`} />
                    </TouchableOpacity>
                  </View>
                </View>
              )}
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
    paddingVertical: '2%', // Added padding vertically to give more space

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
  prop: {
    aspectRatio: 1,
  },
  propButton:{
    flexDirection: 'row', // Arrange items in a row
    justifyContent: "space-between", // Put space between the items
    alignItems: "center", // Center items vertically
    width:'100%',
    // backgroundColor: "#262626"
  },
  propButtonText:{
    marginLeft: "7.5%",
    paddingRight: "30%",
    color: 'white',
    // textAlign: "center"
  },
  iconStyle: {
    position: "absolute",
    right: '5%'
  },
  rightHeader: {
    color: 'white',
    fontWeight: 'bold',
    marginTop: "5%",
    marginBottom: "1.5%"
  },
  widthContainer: {
    marginBottom: "5%",
    flexDirection: 'row',
    alignItems: 'center',
  },
  sideText: {
    flexDirection: 'row',
    color: 'white',
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  centerRow: {
    justifyContent: 'center',
  },
});
