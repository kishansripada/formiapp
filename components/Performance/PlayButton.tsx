import { useEffect, useState, useCallback, useRef } from "react";
import { StyleSheet, View, Text } from "react-native";
import { supabase } from "../../lib/supabase";
import { cloudSettings, formation } from "../../lib/types"
import { Icon } from '@rneui/themed';


export const PlayButton = ({ performanceOpen, curSecond }) => {
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


   return (
      <>
      {
        cloudSettings ? 
        <View style={styles.container}>
            {/* <Icon name='material'></Icon> */}
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
    }
});

