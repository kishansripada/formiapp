import { useEffect, useState, useCallback, useRef } from "react";
import { Dimensions, StyleSheet, View, Text, TouchableOpacity, TouchableHighlight, ScrollView} from "react-native";
import Svg, { Path } from "react-native-svg";
import { supabase } from "../../lib/supabase";
import { cloudSettings, formation, PIXELS_PER_SQUARE, PIXELS_PER_SECOND } from "../../lib/types"
import { Grid } from "./Grid";
import { FluidGrid } from "./FluidGrid";
import { Dancers } from "./Dancers";
import { Timeline } from "./Timeline";
import { Tracker } from "./Tracker";
import { PlayButton } from "./PlayButton";
import { MenuBar } from "./MenuBar";

import { FormModal } from "./modals/FormModal";
import { RosterModal } from "./modals/RosterModal";
import { MediaModal } from "./modals/MediaModal";
import { PropsModal } from "./modals/PropsModal";
import { StageModal } from "./modals/StageModal";
import { SettingsModal } from "./modals/SettingsModal";
import { EmptyGrid } from "./Emptygrid";
import React from "react"
import { ScreenHeight, ScreenWidth } from "@rneui/base";


export function Performance({ session, performanceOpen, setPerformanceOpen }) {
   const [formations, setFormations] = useState([]);
   const [dancers, setDancers] = useState([]);
   const [danceName, setDanceName] = useState<string>("");
   const [selectedFormation, setSelectedFormation] = useState<formation>();
   const [cloudSettings, setCloudSettings] = useState<cloudSettings>();
   const [timeline, setTimeline] = useState(0);
   const [curSecond, setSecond] = useState(0);
   const [startTime, setStartTime] = useState(0);
   const [lastStopped, setLastStopped] = useState(0);
   const [pixelsPerSquare, setPixelsPerSquare] = useState(0);
   const [pixelsPerSecond, setPixelsPerSecond] = useState(0);
   const [loading, setLoading] = useState(false);
   const [dimensionChange, setDimensionChange] = useState(false);
   const [position, setPosition] = useState(0);
   const [activeIndex, setActiveIndex] = useState(null);
   const heightForTimeline =  Dimensions.get('window').height;
   const bottomPosition =  (heightForTimeline * 0.1);
   
   const fetchTimelineLength = () => {
      const timelineLength = formations.reduce((accumulator, object) => {
         return accumulator + object.durationSeconds + object.transition.durationSeconds;
       }, 0);
      setTimeline(timelineLength)
   }

   const updateTimeline = (event) => {
      // setPosition(event.nativeEvent.locationX)
      const timelineWidth = (pixelsPerSecond * timeline)
      const newSecond = (event.nativeEvent.locationX / timelineWidth)  * timeline
      setLastStopped(newSecond)
      setSecond(newSecond);
 }

   const fetchData = useCallback(async () => {
      setLoading(true);

      // gets the dance that is currenlty open based on the id in performanceOpen
      supabase
         .from("dances")
         .select("*")
         .eq("id", performanceOpen)
         .single()
         .then((r) => {
            setCloudSettings(r.data.settings);
            r.data.formations[0].transition.durationSeconds = 0
            setFormations(r.data.formations);
            setSelectedFormation(r.data.formations[0]);
            setDancers(r.data.dancers);
            setDanceName(r.data.name);
            setLoading(false);
         });
   }, []);

   useEffect(() => {
      fetchData();

      Dimensions.addEventListener('change', ({window}) => {
         if (cloudSettings && timeline) {            
            const windowWidth = Dimensions.get('window').width;
            const stageWidth = windowWidth * 3 / 4;
            if (cloudSettings.stageDimensions.width > cloudSettings.stageDimensions.height) {
               const squarePixel = Math.ceil(stageWidth / cloudSettings.stageDimensions.width)
               setPixelsPerSquare(squarePixel);
            } else {
               const windowHeight = Dimensions.get('window').height;
               const stageHeight = windowHeight * 1 / 2;
               const squarePixel = Math.ceil(stageHeight / cloudSettings.stageDimensions.height)
               setPixelsPerSquare(squarePixel);
            }
   
            const secondPixel = Math.ceil(stageWidth / timeline);
            setPixelsPerSecond(secondPixel);
         }
      })
   }, []);

   useEffect(() => {
      // Calculate pixelsPerSquare and pixelsPerSecond based on screen size
      if (cloudSettings && timeline) {            
         const windowWidth = Dimensions.get('window').width;
         const stageWidth = windowWidth * 3 / 4;
         if (cloudSettings.stageDimensions.width > cloudSettings.stageDimensions.height) {
            const squarePixel = Math.ceil(stageWidth / cloudSettings.stageDimensions.width)
            setPixelsPerSquare(squarePixel);
         } else {
            const windowHeight = Dimensions.get('window').height;
            const stageHeight = windowHeight * 1 / 2;
            const squarePixel = Math.ceil(stageHeight / cloudSettings.stageDimensions.height)
            setPixelsPerSquare(squarePixel);
         }

         const secondPixel = Math.ceil(stageWidth / timeline);
         setPixelsPerSecond(secondPixel);
      }
   }, [cloudSettings, timeline]);

   useEffect(() => {
      fetchTimelineLength(); 
   }, [formations]);
   // this is currently hardcoded as opposed to height - menuBar height. Probably not a good idea.
   const horizontalMode = Dimensions.get('window').height < Dimensions.get('window').width;
   const modalHeight = Dimensions.get('window').height * ((horizontalMode ? 155/192: 25/30));
   // const modalHeight = Dimensions.get('window').height;
   return (
      <>
      {cloudSettings ?
         <View style={styles.container}>
            <View style={styles.header}>
               <TouchableOpacity style={styles.touchable} onPress={() => setPerformanceOpen(null)}>
                  <Svg width={Dimensions.get("window").width*0.03} height={Dimensions.get("window").width*0.03} viewBox="0 0 24 24" fill="none" strokeWidth={1.5} stroke="currentColor">
                     <Path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                  </Svg>
               </TouchableOpacity>
               <Text style={styles.text}>{danceName}</Text>
               <Text style={[styles.text, styles.emptyText]}></Text>
            </View>
            <View style={styles.body}>
            <View><MenuBar screenHeight={Dimensions.get('window').height} screenWidth={Dimensions.get('window').width} activeIndex={activeIndex} setActiveIndex={setActiveIndex}/></View>
               <FormModal activeIndex={activeIndex} setActiveIndex={setActiveIndex} modalHeight={modalHeight} title={selectedFormation?.name} text={selectedFormation?.notes}/>
               <RosterModal activeIndex={activeIndex} setActiveIndex={setActiveIndex} modalHeight={modalHeight}/>
               <MediaModal activeIndex={activeIndex} setActiveIndex={setActiveIndex} modalHeight={modalHeight}/>
               <PropsModal activeIndex={activeIndex} setActiveIndex={setActiveIndex} modalHeight={modalHeight}/>
               <StageModal activeIndex={activeIndex} setActiveIndex={setActiveIndex} modalHeight={modalHeight} cloudSettings={cloudSettings}/>
               <SettingsModal activeIndex={activeIndex} setActiveIndex={setActiveIndex} modalHeight={modalHeight}/>
               <View 
                  style={[{
                        width: (cloudSettings?.stageDimensions.width) * pixelsPerSquare,
                        height: (cloudSettings?.stageDimensions.height) * pixelsPerSquare,
                     }, styles.stage
                  ]}
               >
                  {
                     cloudSettings?.stageBackground == "grid" ? <Grid cloudSettings={cloudSettings} performanceOpen={performanceOpen} pixelsPerSquare={pixelsPerSquare}/> 
                     : cloudSettings?.stageBackground == "gridfluid" ? <FluidGrid cloudSettings={cloudSettings} performanceOpen={performanceOpen} pixelsPerSquare={pixelsPerSquare}/>//> 
                     :  <EmptyGrid cloudSettings={cloudSettings} performanceOpen={performanceOpen} pixelsPerSquare={pixelsPerSquare}/> 
                  } 
                  <Dancers 
                     selectedFormation={selectedFormation} 
                     setSelectedFormation={setSelectedFormation} 
                     dancers={dancers}
                     formations={formations} 
                     cloudSettings={cloudSettings} 
                     curSecond={curSecond}
                     pixelsPerSquare={pixelsPerSquare}
                  />
               </View>
                  
               <View style={[{bottom:bottomPosition , position: "absolute"}, styles.player]}>

                  <PlayButton 
                     cloudSettings={cloudSettings}
                     curSecond={curSecond}
                     setSecond={setSecond}
                     startTime={startTime}
                     setStartTime={setStartTime}
                     lastStopped={lastStopped}
                     setLastStopped={setLastStopped}
                     timeline={timeline}
                  />
                  <TouchableHighlight 
                     style={[{width: pixelsPerSecond * timeline
                     }, styles.timeline,
                    ]}
                     underlayColor="transparent"
                     onPress={updateTimeline}
                  >
                     <View style={[{width: pixelsPerSecond * timeline,
                     }, styles.innerView]}>
                        <Timeline 
                           selectedFormation={selectedFormation}
                           cloudSettings={cloudSettings}
                           formations={formations}
                           performanceOpen={performanceOpen}
                           pixelsPerSecond={pixelsPerSecond}
                        />
                        <Tracker 
                           cloudSettings={cloudSettings}
                           curSecond={curSecond}
                           position={position}
                           setPosition={setPosition}
                           pixelsPerSecond={pixelsPerSecond}
                           pixelsPerSquare={pixelsPerSquare}
                        />
                     </View>
                  </TouchableHighlight>
               </View>
            </View>  
         </View>
         : <></>
      }
      </>
   );
}
const styles = StyleSheet.create({
   container: {
      flex: 1,
      flexDirection: "column",
      width: "100%",
      height: "100%",
   },
   header: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingHorizontal: 20,
      paddingTop: Dimensions.get("window").height*0.05,
      paddingBottom: Dimensions.get("window").height*0.025,
      flex: 0.02
      // You can add flex: 1 here if you want the header to be flexible
   },
   body: {
      flex: 1, // This will allow the body to take up all remaining space
      flexDirection: "column",
      alignItems: "center",
      borderRadius: 2,
   },
   debug: {
      flexDirection: "row",
      borderRadius: 2,
   },
   stage: {
      flexDirection: "column",
      backgroundColor: "#262626",
      alignItems: "center",
      borderColor: '#dc2f79',
      borderWidth: 4,
      borderRadius: 20,
      justifyContent: "space-evenly",
      marginBottom: 80,
   },
   test: {
      fontSize: 60,
      color: '#FFFFFF',
   },
   touchable: {
      flex: 1 / 4,
   },
   text: {
      fontWeight: "bold",
      fontSize: 20,
      textAlign: "center",
   },
   emptyText: {
      flex: 1 / 4,
   },
   line: {
      borderColor: '#dc2f79',
      borderWidth: 6,
      borderRadius: 10,
   },
   timeline: {
      height: 120,
      flexDirection: "row",
      // backgroundColor: "#262626",
      // borderColor: '#dc2f79',
      alignItems: "flex-start",
      // borderWidth: 4,
      // borderRadius: 20,
      // position: "absolute",
      // bottom: 0,
   },
   innerView: {
      height: "100%",
      flexDirection: "row",
      borderColor: '#dc2f79',
      alignItems: "flex-start",
   },
   player: {
      flexDirection: "column",
      alignItems: "center",
   },
});
