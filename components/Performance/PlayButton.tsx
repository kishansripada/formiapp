import { useEffect, useState, useCallback, useRef } from "react";
import { StyleSheet, View, Text, Image, TouchableHighlight } from "react-native";
import { SvgUri } from 'react-native-svg';
import React from "react";
// import { MaterialIcons } from '@expo/vector-icons';



export const PlayButton = ({cloudSettings, curSecond, setSecond, startTime, setStartTime, lastStopped, setLastStopped, timeline }) => {
   const [playing, setPlaying] = useState(false);
   const [intervalID, setIntervalID] = useState(null);

   const playSVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#FFFFFF"><path d="M0 0h24v24H0z" fill="none"/><path d="M8 5v14l11-7z"/></svg>`
   const pauseSVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#FFFFFF"><path d="M0 0h24v24H0z" fill="none"/><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>`

   const updateTime = () => {
      const newSecond = (Date.now() - startTime) / 1000 + lastStopped
      let setSecondLet = newSecond
      if (newSecond > timeline) {
         setSecondLet = curSecond
      }
      setSecond(setSecondLet);
   }

   const updateTimePosition = () => {
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
            <TouchableHighlight
               onPress={handlePlay}
            >
               <View style={styles.icon}>
                  {
                     playing ? (
                        <SvgUri
                           uri={`data:image/svg+xml;utf8,${encodeURIComponent(pauseSVG)}`}
                        />
                     ) : (
                        <SvgUri
                        uri={`data:image/svg+xml;utf8,${encodeURIComponent(playSVG)}`}
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
      //   height: "3%",
    },
    icon: {
      width: 50,
      height: 50,
    },
    timer: {
      color: "#FFFFFF",
      fontSize: 24,
    }
});

