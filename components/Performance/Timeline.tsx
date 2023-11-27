import { ScreenHeight } from "@rneui/base";
import React, { useEffect, useState, useCallback, useRef } from "react";

import { Dimensions, StyleSheet, View, Text, TouchableOpacity, ScrollView } from "react-native";

import { supabase } from "../../lib/supabase";
import { cloudSettings, formation, PIXELS_PER_SECOND } from "../../lib/types";

export const Timeline = ({ selectedFormation, cloudSettings, formations, performanceOpen, pixelsPerSecond }) => {
  const [isTextOverflowing, setIsTextOverflowing] = useState(false);
  const screenHeight = Dimensions.get('window').height;
  const checkTextOverflow = (event) => {
    const { width, height } = event.nativeEvent.layout;
    const isOverflowing = width > 100; // Adjust 100 to your desired text container width
    setIsTextOverflowing(isOverflowing);
    //  get screen height to use to resize timeline later
    
  };

  // get window height and width using dimensions and then use that to style - use layout file as a guide 
  // set it to some percentage in height 


  return (
    <>
      {cloudSettings && (
        <View
    
          style={[styles.container,
          {   
            height: (screenHeight / 10),
          }]}
        
        >
 
            {formations.map((formation) => (
              <View
                key={formation.id}
                style={[
                  styles.formation,
                  {
                    width: (pixelsPerSecond * (formation.durationSeconds + formation.transition.durationSeconds)),
                    borderColor: selectedFormation?.id === formation?.id ? '#dc2f79' : '#525252',
                    height: screenHeight / 10,
                  },
                ]}
              >
                <Text
                  onLayout={checkTextOverflow}
                  numberOfLines={1}
                  ellipsizeMode='clip'
                  style={[
                    styles.text,
                    { fontSize: screenHeight / 60 }
                  ]}
                >
                  {formation.name}
                </Text>
                <View style={styles.line} />
                <View
                  style={[
                    styles.transitionBox,
                    {
                      width: `${(formation.transition.durationSeconds / (formation.transition.durationSeconds + formation.durationSeconds)) * 100}%`
                    }
                  ]}
                />
              </View>
            ))}
          </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({

  container: {
    // position: "absolute",
    flex: 1,
    flexDirection: "row",
    width: "100%",
    height: "100%",
    // justifyContent: "space-evenly",
    // alignItems: "center",
  },
  line: {
    borderColor: '#414141',
    borderWidth: 1.5,
    position: 'absolute',
    top: '45%',
    left: 0,
    right: 0,
  },
  text: {
    margin: 10,
    fontWeight: "bold",
    // fontSize: 20,
    textAlign: "center",
    flex: 1,
    color: '#FFFFFF', 
  },

  formation: {
    borderWidth: 3,
    borderColor: '#dc2f79',
    borderRadius: 15,
    backgroundColor: "#262626",
    alignItems: "flex-start",
    flexDirection: "column",

  },
  transitionBox: {

    borderTopColor: '#414141',
    height: "52.5%",
    borderColor: '#dc2f79',
    borderBottomLeftRadius: 12,
    // borderRadius: 10,
    backgroundColor: "#dc2f79",

  }

});
