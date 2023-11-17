import { useEffect, useState, useCallback, useRef } from "react";
import {Dimensions, StyleSheet, View, Text } from "react-native";
import { supabase } from "../../lib/supabase";
import { cloudSettings, formation, PIXELS_PER_SECOND } from "../../lib/types"
import React from "react";

export const Tracker = ({cloudSettings, curSecond, position, setPosition, pixelsPerSecond }) => {

    const screenHeight = Dimensions.get('window').height;
    const secondsToPosition = ( seconds: number ) => {
        return (seconds * pixelsPerSecond);
    };

   useEffect(() => {
      const curPosition = secondsToPosition(curSecond);
      setPosition(curPosition);
   }, [curSecond])

   return (
      <>
      {
        cloudSettings ? 
        <View style={[
            styles.container,
            {height: screenHeight / 10}
        ]}>
            <View style={[
                    styles.line,
                    { left:  position, }
                ]}/>
             <View style={[
                    styles.triangle,
                    { left:  position - 12.45,
                        borderLeftWidth: screenHeight / 100,
                        borderRightWidth: screenHeight / 100,
                        borderBottomWidth: screenHeight / 50,
                    }
                ]}/>
        </View>
        : <></>
      }
      </>
   );
}

const styles = StyleSheet.create({
    container: {
        position: "absolute",
        flex: 1,
        flexDirection: "row",
        width: "100%",
        // height: "100%",
    },
    text: {
        margin: 10,
        fontWeight: "bold",
        fontSize: 20,
        textAlign: "center",
        flex: 1,
        color: '#FFFFFF',
    },
    line: {
        width: 0,
        borderColor: '#dc2f79',
        borderWidth: 2,
        height: "120%",
   },
   triangle: {
    width: 0,
    height: 0,
    backgroundColor: "solid",
    borderStyle: "solid",
    borderLeftWidth:  10,
    borderRightWidth:  10,
    borderBottomWidth: 20,
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
    transform: [{ rotate: "180deg" }],
    borderBottomColor: '#dc2f79',

  },
});

