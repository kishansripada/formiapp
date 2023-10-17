import { useEffect, useState, useCallback, useRef } from "react";
import { StyleSheet, View, Text } from "react-native";
import { supabase } from "../../lib/supabase";
import { cloudSettings, formation, PIXELS_PER_SQUARE } from "../../lib/types"

export const Dancers = ({selectedFormation, setSelectedFormation, dancers, formations, cloudSettings, performanceOpen, curSecond }) => {



   const coordsToPosition = (coords: { x: number; y: number }) => {
      if (!coords) return null;
      let { x, y } = coords;
      return {
         left: ((PIXELS_PER_SQUARE * cloudSettings.stageDimensions.width) / 2) + PIXELS_PER_SQUARE * (x - .9),
         top: ((PIXELS_PER_SQUARE * cloudSettings.stageDimensions.height) / 2) + PIXELS_PER_SQUARE * (-1 * (y + .7)),
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
                        <View style={[{backgroundColor: curDancer[0]?.color,}, styles.dancerIcon]}/>
                        <Text style={styles.name}>{curDancer[0]?.name.split(' ')[0]}</Text>
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
      fontSize: 20,
   },
   dancerIcon: {
      width: 40,
      height: 40,
      borderRadius: 20,
   }
});

