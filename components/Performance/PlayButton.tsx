import { useEffect, useState, useCallback, useRef } from "react";
import { StyleSheet, View, Text, Image, TouchableHighlight } from "react-native";
import { supabase } from "../../lib/supabase";
import { cloudSettings, formation } from "../../lib/types";
import React from "react";
// import { MaterialIcons } from '@expo/vector-icons';



export const PlayButton = ({cloudSettings, curSecond, setSecond, startTime, setStartTime, lastStopped, setLastStopped, timeline, playing, setPlaying }) => {
   const [intervalID, setIntervalID] = useState(null);

   const updateTime = () => {
      const newSecond = (Date.now() - startTime) / 1000 + lastStopped
      let setSecondLet = newSecond
      if (newSecond > timeline) {
         setSecondLet = curSecond
      }
      setSecond(setSecondLet);
   }

   const handlePlay = () => {
      if (playing) {
         setLastStopped(curSecond)
         setStartTime(0)
      } else {
         setStartTime(Date.now())
      }
      setPlaying(!playing)
   }

   function toMINSECMS(secondsFloat) {
      const minutes = Math.floor(secondsFloat / 60);
      const seconds = Math.floor(secondsFloat % 60);
      const milliseconds = Math.floor((secondsFloat % 1) * 100); // Get milliseconds
  
      // Padding each value with a zero if it's less than 10
      const paddedMinutes = minutes.toString().padStart(2, '0');
      const paddedSeconds = seconds.toString().padStart(2, '0');
      const paddedMilliseconds = milliseconds.toString().padStart(2, '0');
  
      return `${paddedMinutes}:${paddedSeconds}.${paddedMilliseconds}`;
  }

   useEffect(() => {
      if (startTime > 0) {
         const tempID = setInterval(updateTime, 1);
         setIntervalID(tempID)
      } else {
         clearInterval(intervalID)
         setIntervalID(null);
      }
   }, [startTime])

   return (
      <>
      {
        cloudSettings ? 
        <View style={styles.container}>
            {/* <MaterialIcons name="home" size={32} color="blue" /> */}
            <TouchableHighlight
               onPress={handlePlay}
            >
               <View>
                  {
                     playing ? (
                        <Image 
                           source={require('../../assets/icons8-pause-100.png')}
                           style={styles.icon}
                        />
                     ) : (
                        <Image 
                           source={require('../../assets/icons8-play-100.png')}
                           style={styles.icon}
                        />
                     )
                  }
               </View>
            </TouchableHighlight>
            <View>
               <Text style={styles.timer}>
                  {toMINSECMS(curSecond)}
               </Text>
            </View>
        </View>
        : <></>
      }
      </>
   );
}

const styles = StyleSheet.create({
    container: {
        position: "relative",
        flexDirection: "row",
        alignItems: "center",
        width: "100%",        
    },
    icon: {
      width: 50,
      height: 50,
    },
    timer: {

    }
});

