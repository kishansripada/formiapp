import { useEffect, useState, useCallback, useRef } from "react";
import { StyleSheet, View, Text, Image, TouchableHighlight } from "react-native";
import { SvgUri } from 'react-native-svg';
import React from "react";
// import { useStore } from "../../lib/store";
// import { MaterialIcons } from '@expo/vector-icons';



export const PlayButton = ({cloudSettings, curSecond, setSecond, startTime, setStartTime, lastStopped, setLastStopped, timeline, playing, setPlaying, sound, muted, setMuted, music}) => {
   const [intervalID, setIntervalID] = useState(null);
   const playSVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#FFFFFF"><path d="M0 0h24v24H0z" fill="none"/><path d="M8 5v14l11-7z"/></svg>`
   const pauseSVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#FFFFFF"><path d="M0 0h24v24H0z" fill="none"/><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>`
   const mutedSVG =  `<svg xmlns="http://www.w3.org/2000/svg" fill="#FFFFFF" class="bi bi-volume-mute-fill" viewBox="0 0 16 16"><path d="M6.717 3.55A.5.5 0 0 1 7 4v8a.5.5 0 0 1-.812.39L3.825 10.5H1.5A.5.5 0 0 1 1 10V6a.5.5 0 0 1 .5-.5h2.325l2.363-1.89a.5.5 0 0 1 .529-.06zm7.137 2.096a.5.5 0 0 1 0 .708L12.207 8l1.647 1.646a.5.5 0 0 1-.708.708L11.5 8.707l-1.646 1.647a.5.5 0 0 1-.708-.708L10.793 8 9.146 6.354a.5.5 0 1 1 .708-.708L11.5 7.293l1.646-1.647a.5.5 0 0 1 .708 0z"/></svg>`
   const unmutedSVG = `<svg xmlns="http://www.w3.org/2000/svg" fill="#FFFFFF" class="bi bi-volume-up-fill" viewBox="0 0 16 16"><path d="M11.536 14.01A8.473 8.473 0 0 0 14.026 8a8.473 8.473 0 0 0-2.49-6.01l-.708.707A7.476 7.476 0 0 1 13.025 8c0 2.071-.84 3.946-2.197 5.303l.708.707z"/><path d="M10.121 12.596A6.48 6.48 0 0 0 12.025 8a6.48 6.48 0 0 0-1.904-4.596l-.707.707A5.483 5.483 0 0 1 11.025 8a5.483 5.483 0 0 1-1.61 3.89z"/><path d="M8.707 11.182A4.486 4.486 0 0 0 10.025 8a4.486 4.486 0 0 0-1.318-3.182L8 5.525A3.489 3.489 0 0 1 9.025 8 3.49 3.49 0 0 1 8 10.475zM6.717 3.55A.5.5 0 0 1 7 4v8a.5.5 0 0 1-.812.39L3.825 10.5H1.5A.5.5 0 0 1 1 10V6a.5.5 0 0 1 .5-.5h2.325l2.363-1.89a.5.5 0 0 1 .529-.06z"/></svg>`

   const updateTime = (startTime) => {
      const newSecond = (Date.now() - startTime) / 1000 + lastStopped
      let setSecondLet = newSecond
      setSecond((prevSecond) => {
         if (prevSecond >= timeline - .05) {
            setPlaying(false)
            if (music) {
               sound.pauseAsync()
            
            }
            
            return prevSecond
         } else {
            return newSecond
         }
      })
   }

   const handlePlay = async () => {
      if (playing) {
         setLastStopped(curSecond)
         setStartTime(0)    
         if (music) {
            await sound.pauseAsync()
         } 
         
      } else {
         setStartTime(Date.now())
         clearInterval(intervalID)
         
         if (music) {
            await sound.playAsync()
         } 
      }
      setPlaying(!playing)
   }

   function toMINSECMS(secondsFloat) {
      const minutes = Math.floor(secondsFloat / 60);
      const seconds = Math.floor(secondsFloat % 60);
      const milliseconds = Math.floor((secondsFloat % 1) * 10); // Get milliseconds
  
      // Padding each value with a zero if it's less than 10
      const paddedMinutes = minutes.toString().padStart(2, '0');
      const paddedSeconds = seconds.toString().padStart(2, '0');
      const paddedMilliseconds = milliseconds.toString().padStart(1, '0');
  
      return `${paddedMinutes}:${paddedSeconds}.${paddedMilliseconds}`;
  }

  const handleMute = async () => {
      if(music){
         sound.setIsMutedAsync(!muted)

      }
      setMuted(!muted)
   }

   useEffect(() => {
      if (!playing) {
         clearInterval(intervalID)
         setIntervalID(null);
      } else {
         const tempID = setInterval(() => updateTime(startTime), 20);
         setIntervalID(tempID)
      }
   
   }, [playing])

   return (
      <>
      {
        cloudSettings ? 
        <View style={styles.container}>
            <TouchableHighlight
               underlayColor="transparent"
               onPress={handleMute}
            >
               <View style={styles.icon}>
                  {
                     muted ? (
                        <SvgUri
                           uri={`data:image/svg+xml;utf8,${encodeURIComponent(mutedSVG)}`}
                        />
                     ) : (
                        <SvgUri
                        uri={`data:image/svg+xml;utf8,${encodeURIComponent(unmutedSVG)}`}
                        />
                     )
                  }
               </View>
            </TouchableHighlight>
            <TouchableHighlight
               underlayColor="transparent"
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
        paddingLeft: 20    
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

