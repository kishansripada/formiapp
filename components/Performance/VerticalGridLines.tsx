import { useEffect, useState, useCallback, useRef } from "react";
import { Alert, StyleSheet, View, Button, TextInput, Text, ScrollView, RefreshControl, TouchableOpacity } from "react-native";
import { supabase } from "../../lib/supabase";
import { cloudSettings } from "../../lib/types"

export const VerticalGridLines = ({ performanceOpen }) => {
   const [cloudSettings, setCloudSettings] = useState<cloudSettings>();
   const [loading, setLoading] = useState(false);
   const [lineArray, setLineArray] = useState([10, 20, 30, 40])

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
            setLoading(false);
         });
   }, []);

   useEffect(() => {
      fetchData();
   }, []);

   useEffect(() => {
      const arrLen = cloudSettings?.stageDimensions.width % 2 == 0 ? (cloudSettings?.stageDimensions.width - 1) : cloudSettings?.stageDimensions.width
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
                     // <View style={styles.lineContainer}>
                     <View key={index}>
                        {/* {
                           index % 2 == 1 ?  (
                              <Text style={[
                                 {position: "absolute", width: 40, paddingRight: 100},
                                 styles.text
                              ]}>
                                 {index}
                              </Text>
                           ) : <View style={{position: "absolute"}}/>
                        } */}
                        <View 
                           style=
                              {[
                                 // {position: "absolute"},
                                 index % cloudSettings?.gridSubdivisions == Math.floor(lineArray.length / 2) % cloudSettings?.gridSubdivisions ? styles.boldLine : styles.line, 
                                 cloudSettings?.stageDimensions.width % 2 == 1 ? styles.marginLine : styles.empty,
                              ]} 
                           key={index}
                        />

                     </View>
                     // </View>
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
        flexDirection: "row",
        width: "100%",
        height: "100%",
        justifyContent: "space-evenly",
    },
   text: {
      fontWeight: "bold",
      fontSize: 20,
      textAlign: "center",
      flex: 1,
      color: '#FFFFFF',
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
      width: 0,
   },
   marginLine: {
      marginHorizontal: 20,
   },
   empty: {},
});
