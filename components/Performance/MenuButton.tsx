import React from 'react';
import { Text, TouchableOpacity, Image, StyleSheet, View } from 'react-native';
import SvgUri from 'react-native-svg-uri';

export const MenuButton = ({ svg, children }) => {
  const handleClick = () => {
    console.log("clicked!");
  };

  return (

    <TouchableOpacity style={styles.button} onPress={handleClick}>
    <SvgUri
    width={70}
    height={70}
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

const styles = StyleSheet.create({
  button: {
    width: 70,
    height: 70,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 5, // Use borderWidth for border
    borderColor: 'transparent', // Set the color of the border
  },
  buttonImage: {
    width: 70,
    height: 70,
  },
  buttonTextContainer: {
    position: 'absolute', // Position the text absolutely within the button
    bottom: 0, // Position it at the bottom
    left: 0, // Position it at the left
    right: 0, // Position it at the right
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
  },
});
