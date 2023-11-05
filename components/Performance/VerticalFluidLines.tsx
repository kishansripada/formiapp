import { useEffect, useState, useCallback, useRef } from "react";
import { StyleSheet, View } from "react-native";
import { supabase } from "../../lib/supabase";
import { cloudSettings } from "../../lib/types"
import React from "react";
export const VerticalFluidLines = ({cloudSettings, performanceOpen }) => {
   const [lineArray, setLineArray] = useState([10, 20, 30, 40])


   useEffect(() => {
      const boldLinesCount = cloudSettings?.gridSubdivisions
      const smallLinesCount = cloudSettings?.verticalFineDivisions
      const arrLen = boldLinesCount * smallLinesCount - 1 ? boldLinesCount * smallLinesCount - 1 : 0
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
                     // <View style={styles.lineContainer}>
                     <View key={index}>
                        {/* {
                           index % 2 == 1 ?  (
                              <Text style={[
                                 {position: "absolute", width: 40, paddingRight: 100},
                                 styles.text
                              ]}>
                                 {index}
                              </Text>
                           ) : <View style={{position: "absolute"}}/>
                        } */}
                        <View 
                           style=
                              {[
                                 index % cloudSettings?.verticalFineDivisions + 1 == cloudSettings?.verticalFineDivisions ? styles.boldLine : styles.line, 
                              ]} 
                           key={index}
                        />
                     </View>
                     // </View>
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
        flexDirection: "row",
        width: "100%",
        height: "100%",
        justifyContent: "space-evenly",
    },
   text: {
      fontWeight: "bold",
      fontSize: 20,
      textAlign: "center",
      flex: 1,
      color: '#FFFFFF',
   },
   line: {
      borderColor: '#414141',
      borderWidth: 1,
      height: "100%",
      width: 0,
   },
   boldLine: {
      borderColor: '#525252',
      borderWidth: 2,
      height: "100%",
      width: 0,
   },
   marginLine: {
      marginHorizontal: 20,
   },
   empty: {},
});
