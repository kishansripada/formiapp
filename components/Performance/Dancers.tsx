import { useEffect, useState, useCallback, useRef } from "react";
import { StyleSheet, View, Text, Image } from "react-native";
import { supabase } from "../../lib/supabase";
import { cloudSettings, formation, PIXELS_PER_SQUARE } from "../../lib/types";
import {linear, cubic} from "./transitionTypes"
import React from "react";


export const Dancers = ({selectedFormation, setSelectedFormation, dancers, formations, cloudSettings, curSecond, pixelsPerSquare, playing, props}) => {
   const [formationNum, setFormationNum] = useState(0);
   const [percentThroughTransition, setPercentThroughTransition] = useState(0);
   const propBaseUrl = `https://dxtxbxkkvoslcrsxbfai.supabase.co/storage/v1/object/public/props/`

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
         let timeElapsed = curSecond;
         let formationID = 0;
         let timeInFormation = 0;
         
         while (timeElapsed > (formations[formationID]?.durationSeconds + formations[formationID]?.transition.durationSeconds) && formationID < formations.length) {
            
            timeElapsed -= formations[formationID]?.durationSeconds
            timeElapsed -= formations[formationID]?.transition.durationSeconds
            formationID++;
         }
         if(timeElapsed >= formations[formationID]?.transition.durationSeconds){
            setPercentThroughTransition(1)
         }
         else{
            setPercentThroughTransition(timeElapsed / formations[formationID]?.transition.durationSeconds)
         }

         setFormationNum(formationID)
         setSelectedFormation(formations[formationID]) 
      }
   }, [curSecond])

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
     prop:{
      position: "absolute",
      height: undefined, 
      alignItems: "center",
      alignContent: "center",
      aspectRatio: 1, // This ensures that the height is the same as the width
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
        backgroundColor: "transparent",
        borderStyle: "solid",
        borderLeftWidth: pixelsPerSquare / 2,
        borderRightWidth: pixelsPerSquare / 2,
        borderBottomWidth: pixelsPerSquare,
        borderLeftColor: "transparent",
        borderRightColor: "transparent",
  
      },
  
  
  });
   return (
      <>
      {
        cloudSettings ? 
        <View style={styles.container}>
            {
               selectedFormation ? selectedFormation.positions.map((pos, index) => {
                  const curDancer = dancers.filter((dancer) => (dancer.id == pos.id))
                  const currProp = props.filter((prop) => (prop.id == pos?.itemId))

                  if (formationNum == 0 || playing === false || percentThroughTransition === 1){
                   
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
                                 curDancer[0]?.shape === "square" ? [styles.dancerIconSquare, {backgroundColor: curDancer[0]?.color ? curDancer[0]?.color : "#db2877"}] :
                                 curDancer[0]?.shape === "triangle" ? [styles.dancerIconTriangle, {borderBottomColor: curDancer[0]?.color ? curDancer[0]?.color : "#db2877"},] :
                                 [styles.dancerIconCircle, {backgroundColor: curDancer[0]?.color ? curDancer[0]?.color : "#db2877"}],
                                 { zIndex: 0 } 
                              ]}/>
                              <Text style={[  
                                 {
                                       fontSize: pixelsPerSquare * 2 / 3,
                                       zIndex: 0,
                                 }, styles.name
                              ]}>{curDancer[0]?.name.split(' ')[0]}</Text>

                              {/* Conditionally render the Image with a high zIndex*/}
                              {currProp.length > 0 && (
                                 <Image 
                                       resizeMode="contain"
                                       style={[
                                          {
                                             width: currProp[0]?.width * pixelsPerSquare,
                                             zIndex: 1,
                                         
                                             ...(currProp[0]?.side ? (
                                                {
                                                    ...(currProp[0]?.side === 'top' && { bottom: 1.8 * pixelsPerSquare }),
                                                    ...(currProp[0]?.side === 'bottom' && { top: 0.9 * pixelsPerSquare }),
                                                    ...(currProp[0]?.side === 'left' && { right: pixelsPerSquare * 1.35, bottom: "40%"}),
                                                    ...(currProp[0]?.side === 'right' && { left: pixelsPerSquare * 1.35, bottom: "40%"}),
                                                }
                                            ) : { bottom: 1.8 * pixelsPerSquare }), // Default to top if side is not provided
                                    
                                              
                                          },
                                           styles.prop, 
                                       ]}
                                       source={{ uri: propBaseUrl + currProp[0].url }}
                                       alt="image failed to load"
                                 />
                              )}
                           </View>
                                             
                     )
                     
                  } 
                  else{

                     const startPosition = coordsToPosition({x: formations[formationNum - 1].positions[index].position.x, y: formations[formationNum - 1].positions[index].position.y});
                     const endPosition = coordsToPosition({x: pos.position.x, y: pos.position.y});
                     let transitionPosition:any = "kish"

                   
                     if(pos?.transitionType === "teleport"){
                        return (
                           <View key={pos.id}></View>
                        )
                     }
                     else if(pos?.transitionType === "cubic"){
                        let cpt1 = coordsToPosition(pos?.controlPointStart)
                        let cpt2 = {x: cpt1.left, y: cpt1.top}

                        let end1 = coordsToPosition(pos?.controlPointEnd)
                        let end2 = {x: end1.left, y: end1.top}
                        // Pass the control points through the coords to position function 

                        transitionPosition = cubic(startPosition, endPosition, percentThroughTransition, cpt2, end2);

                     }
                     else{
                        transitionPosition = linear(startPosition, endPosition, percentThroughTransition);

                     }
  
                     return (
                        <View 
                           key={pos.id}
                           style={[
                              {
                                 left: transitionPosition.x,
                                 top: transitionPosition.y,
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

                              {currProp.length > 0 && (
                                 <Image 
                                       resizeMode="contain"
                                       style={[
                                          {
                                             width: currProp[0]?.width * pixelsPerSquare,
                                             zIndex: 1,
                                         
                                             ...(currProp[0]?.side ? (
                                                {
                                                    ...(currProp[0]?.side === 'top' && { bottom: 1.8 * pixelsPerSquare }),
                                                    ...(currProp[0]?.side === 'bottom' && { top: 0.9 * pixelsPerSquare }),
                                                    ...(currProp[0]?.side === 'left' && { right: pixelsPerSquare * 1.35, bottom: "40%"}),
                                                    ...(currProp[0]?.side === 'right' && { left: pixelsPerSquare * 1.35, bottom: "40%"}),
                                                }
                                            ) : { bottom: 1.8 * pixelsPerSquare }), // Default to top if side is not provided
                                    

                                              
                                          },
                                           styles.prop, 
                                       ]}
                                       source={{ uri: propBaseUrl + currProp[0].url }}
                                       alt="image failed to load"
                                 />
                           )}
                        </View>
                     )
                  }
                  
               }) : <></>
            }
        </View>
        : <></>
      }
      </>
   );
   
}

