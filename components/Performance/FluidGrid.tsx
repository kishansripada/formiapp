import { useEffect, useState, useCallback, useRef } from "react";
import { StyleSheet, View } from "react-native";
import { supabase } from "../../lib/supabase";
import { PIXELS_PER_SQUARE, cloudSettings } from "../../lib/types"
import { VerticalFluidLines } from "./VerticalFluidLines";
import { HorizontalFluidLines } from "./HorizontalFluidLines";
import { EvenGridText } from "./EvenGridText";
import React from "react";

export const FluidGrid = ({cloudSettings, performanceOpen, pixelsPerSquare}) => {
   const [loading, setLoading] = useState(false);


   return (
      <>
         <View style={styles.container}>
            <HorizontalFluidLines cloudSettings={cloudSettings} performanceOpen={performanceOpen}/>
            <VerticalFluidLines cloudSettings={cloudSettings} performanceOpen={performanceOpen}/>
            <EvenGridText pixelsPerSquare={pixelsPerSquare} cloudSettings={cloudSettings} performanceOpen={performanceOpen}/>
         </View>
      </>
   );
}

const styles = StyleSheet.create({
    container: {
       flex: 1,
       flexDirection: "column",
       width: "100%",
       height: "100%",
    },
   text: {
      fontWeight: "bold",
      fontSize: 20,
      textAlign: "center",
      flex: 1 / 2,
      color: '#FFFFFF',
   },
});
