import { useEffect, useState, useCallback, useRef } from "react";
import { Alert, StyleSheet, View, Button, TextInput, Text, ScrollView, RefreshControl, TouchableOpacity } from "react-native";
import { supabase } from "../../lib/supabase";
import { cloudSettings } from "../../lib/types"

export const HorizontalGridLines = ({ performanceOpen }) => {
   const [cloudSettings, setCloudSettings] = useState<cloudSettings>();
   const [loading, setLoading] = useState(false);
   const [test, setTest] = useState([0, 0, 0])

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
      console.log(Array(cloudSettings?.stageDimensions.height % 2 == 0 ? (cloudSettings?.stageDimensions.height - 1) : cloudSettings?.stageDimensions.height))
   }, []);

   return (
      <>
      {
        cloudSettings ? 
        <View style={styles.container}>
            <Text style={styles.text}>hi</Text>
            <Text>{(Array(cloudSettings?.stageDimensions.height % 2 == 0 ? (cloudSettings?.stageDimensions.height - 1) : cloudSettings?.stageDimensions.height))}</Text>
            {
                Array(cloudSettings?.stageDimensions.height % 2 == 0 ? (cloudSettings?.stageDimensions.height - 1) : cloudSettings?.stageDimensions.height).map((number, index) => {
                   return <Text key={index}>Hi</Text>
                    // <View
                    //     style={{
                    //         borderBottomColor: 'black',
                    //         borderBottomWidth: StyleSheet.hairlineWidth,
                    //     }}
                    // />
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
        flexDirection: "column",
        width: "100%",
        height: "100%",
    },
   text: {
      fontWeight: "bold",
      fontSize: 20,
      textAlign: "center",
      flex: 1 / 2,
      color: '#000000',
   },
});

