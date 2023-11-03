import React, { useEffect, useState, useCallback, useRef } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { supabase } from "../../lib/supabase";
import { cloudSettings, formation, PIXELS_PER_SECOND } from "../../lib/types";

export const Timeline = ({ selectedFormation, cloudSettings, formations, performanceOpen, pixelsPerSecond }) => {
  const [isTextOverflowing, setIsTextOverflowing] = useState(false);

  const checkTextOverflow = (event) => {
    const { width, height } = event.nativeEvent.layout;
    const isOverflowing = width > 100; // Adjust 100 to your desired text container width
    setIsTextOverflowing(isOverflowing);
  };

  return (
    <>
      {cloudSettings ? (
        <View style={styles.container}>
          {formations.map((formation) => {
            return (
              <View
                key={formation.id}
                style={[
                  styles.formation,
                  {
                    width: pixelsPerSecond * formation.durationSeconds,
                    borderColor: selectedFormation?.id === formation?.id ? '#dc2f79' : '#525252',
                  },
                ]}
              >
                <View style={styles.textContainer}>
                  <Text onLayout={checkTextOverflow} style={isTextOverflowing ? styles.textEllipsis : styles.text}>
                    {formation.name}
                  </Text>
                </View>
              </View>
            );
          })}
        </View>
      ) : (
        <></>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    flex: 1,
    flexDirection: "row",
    width: "100%",
    height: "100%",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  textContainer: {
    // width: 2000, // Set a fixed width for the text container
    overflow: 'hidden',
  },
  text: {
    margin: 10,
    fontWeight: "bold",
    fontSize: 20,
    textAlign: "center",
    flex: 1,
    color: '#FFFFFF',
  },
  textEllipsis: {
    margin: 10,
    fontWeight: "bold",
    fontSize: 20,
    textAlign: "center",
    flex: 1,
    color: '#FFFFFF',
    overflow: 'hidden',
    // textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  formation: {
    borderWidth: 2,
    borderColor: '#dc2f79',
    borderRadius: 20,
    backgroundColor: "#262626",
    alignItems: "flex-start",
    height: "80%",
    flexDirection: "column",
  },
});
