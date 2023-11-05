import { useEffect, useState, useCallback, useRef } from "react";
import { StyleSheet, View } from "react-native";
import { supabase } from "../../lib/supabase";
import { cloudSettings } from "../../lib/types"
import React from "react";
export const HorizontalGridLines = ({cloudSettings, performanceOpen }) => {
   const [lineArray, setLineArray] = useState([10, 20, 30, 40])
   // const lineArray = [10, 20, 30]
   
   useEffect(() => {
      const arrLen = cloudSettings?.stageDimensions.height % 2 == 0 ? (cloudSettings?.stageDimensions.height - 1) : cloudSettings?.stageDimensions.height
      const tempArray = Array(arrLen).fill(0)
      setLineArray(tempArray)
   }, [cloudSettings]);


   return (
      <>
      {
        cloudSettings ? 
        <View style={styles.container}>
            {
               lineArray.map((number, index) => {
                  return (
                     <View 
                        style=
                           {[
                              index % cloudSettings?.gridSubdivisions == Math.floor(lineArray.length / 2) % cloudSettings?.gridSubdivisions ? styles.boldLine : styles.line,
                              cloudSettings?.stageDimensions.height % 2 == 1 ? styles.marginLine : styles.empty,
                           ]} 
                        key={index}
                     >
                     </View>
                  )
               })
            }
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
        flexDirection: "column",
        width: "100%",
        height: "100%",
        justifyContent: "space-evenly",
    },
   text: {
      fontWeight: "bold",
      fontSize: 100,
      textAlign: "center",
      flex: 1,
      color: '#00FFFF',
   },
   line: {
      borderColor: '#414141',
      borderWidth: 1,
      borderRadius: 0,
      height: 0,
   },
   boldLine: {
      borderColor: '#525252',
      borderWidth: 2,
      borderRadius: 0,
      height: 0,
   },
   marginLine: {
      marginVertical: 20,
   },
   empty: {},
});

