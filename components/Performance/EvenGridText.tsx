import { useEffect, useState, useCallback, useRef } from "react";
import { Alert, StyleSheet, View, Button, TextInput, Text, ScrollView, RefreshControl, TouchableOpacity } from "react-native";
import { supabase } from "../../lib/supabase";
import { cloudSettings, PIXELS_PER_SQUARE } from "../../lib/types"

export const EvenGridText = ({ performanceOpen }) => {
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

      const newArrLen = arrLen ? Math.floor(arrLen / 2) : 0
      const tempArray = Array(newArrLen).fill(0)
      setLineArray(tempArray)
   }, [cloudSettings]);


   return (
      <>
      {
        cloudSettings ? 
        <View style={{
            flexDirection: "row",
            width: (cloudSettings?.stageDimensions.width - 2) * PIXELS_PER_SQUARE,
            height: (cloudSettings?.stageDimensions.height) * PIXELS_PER_SQUARE,
            borderWidth: 4,
            alignSelf: "center",
            justifyContent: "center",
         }}>
            {
               lineArray.map((number, index) => {
                  return (index % 2 == 0) ? (
                     <Text key={index} 
                        style={[
                           styles.text, 
                           {borderWidth: 2}
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
                           {borderWidth: 2}
                           // {position: "absolute"}
                           // cloudSettings?.stageDimensions.width % 2 == 1 ? styles.margin : styles.empty
                     ]}>
                        {2 * Math.abs(index - Math.floor(lineArray.length / 2))}
                     </Text>
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
