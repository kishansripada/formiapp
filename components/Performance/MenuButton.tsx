import React from 'react';
import { Text, TouchableOpacity, StyleSheet, View } from 'react-native';
import SvgUri from 'react-native-svg-uri';

export const MenuButton = ({ svg, children, buttonDim}) => {
  const styles = StyleSheet.create({
    button: {
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: 5,
      // borderColor: 'blue',
      width: buttonDim,
      height: buttonDim
    },
    buttonTextContainer: {
      position: 'absolute',
      bottom: 0, // Position it at the bottom
      width: '100%', // Ensure the text container spans the full width of the button
      // Remove marginTop since we are now positioning it at the bottom
    },
    buttonText: {
      color: 'white',
      textAlign: 'center', // Center the text horizontally
    },
  });
  
  
  const handleClick = () => {
    console.log("clicked!");
  };

  return (

    <TouchableOpacity style={styles.button} onPress={handleClick}>
    <SvgUri
    width={styles.button.width}
    height={styles.button.height}
    source={{
      uri: `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`,
    }}
  />
  <View style={styles.buttonTextContainer}>
  <Text style={styles.buttonText}>{children}</Text>
  </View>
  </TouchableOpacity>
  );
};

