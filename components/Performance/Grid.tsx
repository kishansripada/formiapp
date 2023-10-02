import { useEffect, useState, useCallback, useRef } from "react";
import { StyleSheet, View } from "react-native";
import { supabase } from "../../lib/supabase";
import { cloudSettings } from "../../lib/types"
import { HorizontalGridLines } from "./HorizontalGridLines"
import { VerticalGridLines } from "./VerticalGridLines"
import { EvenGridText } from "./EvenGridText";

export const Grid = ({ performanceOpen }) => {
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
      {
        cloudSettings ? 
        <View style={styles.container}>
            <HorizontalGridLines performanceOpen={performanceOpen}/>
            <VerticalGridLines performanceOpen={performanceOpen}/>
            {/* {
               cloudSettings?.stageDimensions.width % 2 == 0 ? 
                  <EvenGridText performanceOpen={performanceOpen}/>
               : <></>
            } */}
        </View>
        : <></>
      }
      </>
   );
}

const styles = StyleSheet.create({
    container: {
      //   position: "absolute",
        flex: 1,
        flexDirection: "column",
        width: "100%",
        height: "100%",
        justifyContent: "flex-end",
    },
   text: {
      fontWeight: "bold",
      fontSize: 20,
      textAlign: "center",
      flex: 1 / 2,
      color: '#FFFFFF',
   },
});
