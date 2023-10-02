import { useEffect, useState, useCallback, useRef } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import Svg, { Path } from "react-native-svg";
import { supabase } from "../../lib/supabase";
import { cloudSettings, PIXELS_PER_SQUARE } from "../../lib/types"
import { Grid } from "./Grid";
import { FluidGrid } from "./FluidGrid";
import { Dancers } from "./Dancers";

export function Performance({ session, performanceOpen, setPerformanceOpen }) {
   const [formations, setFormations] = useState([]);
   const [dancers, setDancers] = useState([]);
   const [danceName, setDanceName] = useState<string>("");
   const [selectedFormation, setSelectedFormation] = useState<string>("");
   const [cloudSettings, setCloudSettings] = useState<cloudSettings>();
   const [loading, setLoading] = useState(false);

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
            setFormations(r.data.formations);
            setSelectedFormation(r.data.formations[0].id);
            setDancers(r.data.dancers);
            setDanceName(r.data.name);
            setLoading(false);
         });
   }, []);

   useEffect(() => {
      fetchData();
   }, []);

   return (
      <>
      {cloudSettings ?
         <View style={styles.container}>
            <View style={styles.header}>
               <TouchableOpacity style={styles.touchable} onPress={() => setPerformanceOpen(null)}>
                  <Svg width={32} height={32} viewBox="0 0 24 24" fill="none" strokeWidth={1.5} stroke="currentColor">
                     <Path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                  </Svg>
               </TouchableOpacity>
               <Text style={styles.text}>{danceName}</Text>
               <Text style={[styles.text, styles.emptyText]}></Text>
            </View>
            <View style={styles.body}>
               <View style={styles.debug}>
                  <Text style={styles.text}> {cloudSettings?.stageDimensions.width} </Text>
                  <Text style={styles.text}> {cloudSettings?.stageDimensions.height} </Text>
               </View>
               <View 
                  style={[{
                        width: (cloudSettings?.stageDimensions.width) * PIXELS_PER_SQUARE,
                        height: (cloudSettings?.stageDimensions.height) * PIXELS_PER_SQUARE,
                     }, styles.stage
                  ]}
               >
                  {
                     cloudSettings?.stageBackground == "grid" ? <Grid performanceOpen={performanceOpen}/> 
                     : cloudSettings?.stageBackground == "gridfluid" ? <FluidGrid performanceOpen={performanceOpen}/> 
                     : <></>
                  }
                  <Dancers performanceOpen={performanceOpen}/>
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
      paddingTop: 56,
      paddingBottom: 20,
   },
   body: {
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: 2,
      flexGrow: 1,
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
      justifyContent: "space-evenly"
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
      flex: 1 / 2,
   },
   emptyText: {
      flex: 1 / 4,
   },
   line: {
      borderColor: '#dc2f79',
      borderWidth: 6,
      borderRadius: 10,
   }
});
