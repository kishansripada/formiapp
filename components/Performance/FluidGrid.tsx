import { useEffect, useState, useCallback, useRef } from "react";
import { Alert, StyleSheet, View, Button, TextInput, Text, ScrollView, RefreshControl, TouchableOpacity } from "react-native";
import { supabase } from "../../lib/supabase";
import { cloudSettings } from "../../lib/types"
import { VerticalFluidLines } from "./VerticalFluidLines";
import { HorizontalFluidLines } from "./HorizontalFluidLines";
import { EvenGridText } from "./EvenGridText";

export const FluidGrid = ({ performanceOpen }) => {
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
            setLoading(false);
         });
   }, []);

   useEffect(() => {
      fetchData();
   }, []);

   return (
      <>
         <View style={styles.container}>
            <HorizontalFluidLines performanceOpen={performanceOpen}/>
            <VerticalFluidLines performanceOpen={performanceOpen}/>
            {/* <EvenGridText performanceOpen={performanceOpen}/> */}
         </View>
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
   text: {
      fontWeight: "bold",
      fontSize: 20,
      textAlign: "center",
      flex: 1 / 2,
      color: '#FFFFFF',
   },
});
