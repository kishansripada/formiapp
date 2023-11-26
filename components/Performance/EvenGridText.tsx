import { useEffect, useState, useCallback, useRef } from "react";
import { StyleSheet, View, Text } from "react-native";
import { supabase } from "../../lib/supabase";
import { cloudSettings, PIXELS_PER_SQUARE } from "../../lib/types";
import React from "react";

export const EvenGridText = ({cloudSettings, performanceOpen, pixelsPerSquare }) => {
   // const [cloudSettings, setCloudSettings] = useState<cloudSettings>();
   const [lineArray, setLineArray] = useState([10, 20, 30, 40])

  

   useEffect(() => {
      const arrLen = cloudSettings?.stageDimensions.width % 2 == 0 ? (cloudSettings?.stageDimensions.width - 1) : cloudSettings?.stageDimensions.width
      const newArrLen = arrLen ? Math.floor(arrLen / 2) : 0
      const tempArray = Array(newArrLen).fill(0)
      setLineArray(tempArray)
   }, [cloudSettings]);

   return (
      <>
      {
       
        cloudSettings ? 
        <>
        <View style={{
            flexDirection: "row",
            width: "100%",
            height: "100%",
            position: 'absolute',
            // borderWidth: 4,
            alignSelf: "center",
            justifyContent: "center",
         }}>
              <Text style={{
                     textAlign: 'center',                 // text-center
                     fontSize: pixelsPerSquare,        //maybe change later             
                     color: 'rgba(255, 255, 255, 0.3)',   
                     fontWeight: '800',                   // font-extrabold
                     letterSpacing: 2,     
                     // backgroundColor: 'red'               // approximation for tracking-widest, adjust as needed
                  }}
               >
                  BACKSTAGE
               </Text>
        </View>
        {/* <View style={{
            flexDirection: "row",
            width: (cloudSettings?.stageDimensions.width - 2) * PIXELS_PER_SQUARE,
            position: 'absolute',
            // borderWidth: 4,
            alignSelf: "center",
            justifyContent: "center",
            // backgroundColor: "red"
         }}>
             {
               lineArray.map((number, index) => {
                  return (index % 2 == 0) ? (
                     <Text key={index} 
                        style={[
                           styles.text, 
                           // {borderWidth: 2}
                           // {position: "absolute"}
                           // cloudSettings?.stageDimensions.width % 2 == 1 ? styles.margin : styles.empty
                     ]}>
                        {2 * Math.abs(index - Math.floor(lineArray.length / 2))}
                     </Text>
                  ) : (
                     // <View 
                     //       // style={cloudSettings?.stageDimensions.width % 2 == 1 ? styles.margin : styles.empty} 
                     //       key={index} 
                     // />
                     <Text key={index} 
                        style={[
                           styles.text, 
                           // {borderWidth: 2}
                           // {position: "absolute"}
                           // cloudSettings?.stageDimensions.width % 2 == 1 ? styles.margin : styles.empty
                     ]}>
                        {2 * Math.abs(index - Math.floor(lineArray.length / 2))}
                     </Text>
                  )
               })
         }

         </View> */}
        
         </>
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
        alignItems: "flex-end",
    },
   text: {
      fontWeight: "bold",
      fontSize: 20,
      textAlign: "center",
      flex: 1,
      color: '#8A8A8A',
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
      width: 0
   },
   margin: {
      marginHorizontal: 20
   },
   empty: {}
});




