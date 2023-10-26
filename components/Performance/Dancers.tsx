import { useEffect, useState, useCallback, useRef } from "react";
import { StyleSheet, View, Text } from "react-native";
import { supabase } from "../../lib/supabase";
import { cloudSettings, formation, PIXELS_PER_SQUARE } from "../../lib/types"

export const Dancers = ({selectedFormation, setSelectedFormation, dancers, formations, cloudSettings, curSecond, pixelsPerSquare }) => {
   // Moved all of the styling here so that we could use pixelsPerSquare in the styling
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
     dancer: {
        position: "absolute",
        alignItems: "center",
        alignContent: "center",
     },
     name: {
        color: '#FFFFFF',
        textAlign: "center",
     },
     dancerIconCircle: {
        width: pixelsPerSquare,
        height: pixelsPerSquare,
        borderRadius: pixelsPerSquare / 2,
     },
     dancerIconSquare: {
         width: pixelsPerSquare,
         height: pixelsPerSquare,
     },
     dancerIconTriangle: {
        width: 0,
        height: 0,
        backgroundColor: "solid",
        borderStyle: "solid",
        borderLeftWidth: pixelsPerSquare / 2,
        borderRightWidth: pixelsPerSquare / 2,
        borderBottomWidth: pixelsPerSquare,
        borderLeftColor: "transparent",
        borderRightColor: "transparent",
  
      },
  
  
  });
  
  



   const coordsToPosition = (coords: { x: number; y: number }) => {
      if (!coords) return null;
      let { x, y } = coords;
      return {
         left: ((pixelsPerSquare * cloudSettings.stageDimensions.width) / 2) + pixelsPerSquare * (x - .9),
         top: ((pixelsPerSquare * cloudSettings.stageDimensions.height) / 2) + pixelsPerSquare * (-1 * (y + .7)),
      };
   };



   useEffect(() => {
      if (cloudSettings) {
         var timeElapsed = curSecond;
         var formationID = 0;
         
         while (timeElapsed > formations[formationID]?.durationSeconds && formationID < formations.length) {
            timeElapsed -= formations[formationID]?.durationSeconds
            formationID++;
         }
         
         setSelectedFormation(formations[formationID]) 
      }
   }, [curSecond])


   return (
      <>
      {
        cloudSettings ? 
        <View style={styles.container}>
            {
               selectedFormation ? selectedFormation.positions.map((pos, index) => {
                  const curDancer = dancers.filter((dancer) => (dancer.id == pos.id))
                  return (
                     <View 
                        key={pos.id}
                        style={[
                           {
                              left: coordsToPosition({x: pos.position.x, y: pos.position.y}).left,
                              top: coordsToPosition({x: pos.position.x, y: pos.position.y}).top,
                           }, styles.dancer,
                        ]}
                     >
                     <View style={[
                          
                              { backgroundColor: curDancer[0]?.color, borderBottomColor: curDancer[0]?.color,},
                              curDancer[0]?.shape === "circle" ? styles.dancerIconCircle : 
                              curDancer[0]?.shape === "square" ? styles.dancerIconSquare :
                              curDancer[0]?.shape === "triangle" ? styles.dancerIconTriangle :
                              styles.dancerIconCircle 
                     ]}/>
                        <Text style={[
                           {
                              fontSize: pixelsPerSquare * 2 / 3,
                           },styles.name]}>{curDancer[0]?.name.split(' ')[0]}</Text>
                     </View>
                  )
               }) : <></>
            }
        </View>
        : <></>
      }
      </>
   );
}

