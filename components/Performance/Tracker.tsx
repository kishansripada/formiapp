import { useEffect, useState, useCallback, useRef } from "react";
import { StyleSheet, View, Text } from "react-native";
import { supabase } from "../../lib/supabase";
import { cloudSettings, formation, PIXELS_PER_SECOND } from "../../lib/types"

export const Tracker = ({ performanceOpen, curSecond, position, setPosition }) => {
   const [cloudSettings, setCloudSettings] = useState<cloudSettings>();
   const [formations, setFormations] = useState([]);
   const [selectedFormation, setSelectedFormation] = useState<formation>();
   const [dancers, setDancers] = useState([]);
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
            setSelectedFormation(r.data.formations[0]);
            setDancers(r.data.dancers);
            setLoading(false);
         });
   }, []);

   useEffect(() => {
      fetchData();
   }, []);

   const secondsToPosition = ( seconds: number ) => {
        return (seconds * PIXELS_PER_SECOND);
    };

   useEffect(() => {
      const curPosition = secondsToPosition(curSecond);
      setPosition(curPosition);
   }, [curSecond])

   return (
      <>
      {
        cloudSettings ? 
        <View style={styles.container}>
            <View style={[
                    styles.line,
                    { left:  position }
                ]}/>
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
    },
    text: {
        margin: 10,
        fontWeight: "bold",
        fontSize: 20,
        textAlign: "center",
        flex: 1,
        color: '#FFFFFF',
    },
    line: {
        width: 0,
        borderColor: '#dc2f79',
        borderWidth: 2,
        height: "100%",
   }
});

