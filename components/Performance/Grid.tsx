import { useEffect, useState, useCallback, useRef } from "react";
import { StyleSheet, View } from "react-native";
import { supabase } from "../../lib/supabase";
import { cloudSettings } from "../../lib/types"
import { HorizontalGridLines } from "./HorizontalGridLines"
import { VerticalGridLines } from "./VerticalGridLines"
import { EvenGridText } from "./EvenGridText";
import React from "react";

export const Grid = ({cloudSettings, performanceOpen, pixelsPerSquare }) => {
   return (
      <>
      {
        cloudSettings ? 
        <View style={styles.container}>
            <HorizontalGridLines cloudSettings={cloudSettings} performanceOpen={performanceOpen}/>
            <VerticalGridLines cloudSettings={cloudSettings} performanceOpen={performanceOpen}/>    
            <EvenGridText cloudSettings={cloudSettings} performanceOpen={performanceOpen} pixelsPerSquare={pixelsPerSquare}/>
        </View>
        : <></>
      }
      </>
   );
}

const styles = StyleSheet.create({
    container: {
      //   position: "absolute",
        flex: 1,
        flexDirection: "column",
        width: "100%",
        height: "100%",
        justifyContent: "flex-end",
    },
   text: {
      fontWeight: "bold",
      fontSize: 20,
      textAlign: "center",
      flex: 1 / 2,
      color: '#FFFFFF',
   },
});
