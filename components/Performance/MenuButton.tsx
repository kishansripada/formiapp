// import React from 'react';
import { Text, TouchableOpacity, StyleSheet, View } from 'react-native';
import { SvgUri } from 'react-native-svg';
import React from "react"

export const MenuButton = ({ svg, children, buttonDim, onPress, textColor}) => {
  const iconRatio = 0.75;
  const styles = StyleSheet.create({
    button: {
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: buttonDim/25,
      borderColor: 'transparent',
      // borderColor: 'blue',
      width: buttonDim,
      height: buttonDim
    },
    svgContainer: {
      width: buttonDim * iconRatio,
      height: buttonDim * iconRatio,
      marginTop: -15,
    },
    
    buttonTextContainer: {
      position: 'absolute',
      bottom: 0, // Position it at the bottom
      width: '100%', // Ensure the text container spans the full width of the button
    },
    buttonText: {
      fontSize: buttonDim/5,
      color: textColor,
      textAlign: 'center', // Center the text horizontally
    },
  });
  
  

  return (

    <TouchableOpacity style={styles.button} onPress={onPress}>
    <View style={styles.svgContainer}>
      <SvgUri
      // width={styles.svgContainer.width}
      // height={styles.svgContainer.height}
      uri={`data:image/svg+xml;utf8,${encodeURIComponent(svg)}`}
      />
    </View>
  <View style={styles.buttonTextContainer}>
  <Text style={styles.buttonText}>{children}</Text>
  </View>
  </TouchableOpacity>
  );
};

