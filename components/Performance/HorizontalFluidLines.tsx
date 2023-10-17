import { useEffect, useState, useCallback, useRef } from "react";
import { StyleSheet, View } from "react-native";
import { supabase } from "../../lib/supabase";
import { cloudSettings } from "../../lib/types"

export const HorizontalFluidLines = ({cloudSettings, performanceOpen }) => {
   const [lineArray, setLineArray] = useState([10, 20, 30, 40])
   
   useEffect(() => {
      const boldLinesCount = cloudSettings?.horizontalGridSubdivisions
      const smallLinesCount = cloudSettings?.horizontalFineDivisions
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
                     <View 
                        style=
                           {[
                              index % cloudSettings?.horizontalFineDivisions + 1 == cloudSettings?.horizontalFineDivisions ? styles.boldLine : styles.line,
                           ]} 
                        key={index}
                     />
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
});

