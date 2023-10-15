import { useEffect, useState, useCallback, useRef } from "react";
import { StyleSheet, View, Image, TouchableHighlight } from "react-native";
import { supabase } from "../../lib/supabase";
import { cloudSettings, formation } from "../../lib/types"
// import { MaterialIcons } from '@expo/vector-icons';



export const PlayButton = ({ performanceOpen, curSecond, setSecond, timeline }) => {
   const [cloudSettings, setCloudSettings] = useState<cloudSettings>();
   const [formations, setFormations] = useState([]);
   const [selectedFormation, setSelectedFormation] = useState<formation>();
   const [dancers, setDancers] = useState([]);
   const [loading, setLoading] = useState(false);
   const [playing, setPlaying] = useState(false);
   const [intervalID, setIntervalID] = useState(null);

   const updateTime = () => {
      setSecond((prevSecond) => {
         if (prevSecond >= timeline) {
            return prevSecond
         } else {
            return (prevSecond + .01)
         }
      });
   }

   const handlePlay = () => {
      setPlaying(!playing)
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
            setFormations(r.data.formations);
            setSelectedFormation(r.data.formations[0]);
            setDancers(r.data.dancers);
            setLoading(false);
         });
   }, []);

   useEffect(() => {
      fetchData();
   }, []);

   useEffect(() => {
      if (!playing) {
         clearInterval(intervalID)
         setIntervalID(null);
      } else {
         const tempID = setInterval(updateTime, 10);
         setIntervalID(tempID)
      }
   }, [playing])

   return (
      <>
      {
        cloudSettings ? 
        <View style={styles.container}>
            {/* <MaterialIcons name="home" size={32} color="blue" /> */}
            <TouchableHighlight
               onPress={handlePlay}
            >
               <View>
                  {
                     playing ? (
                        <Image 
                           source={require('../../assets/icons8-pause-100.png')}
                           style={styles.icon}
                        />
                     ) : (
                        <Image 
                           source={require('../../assets/icons8-play-100.png')}
                           style={styles.icon}
                        />
                     )
                  }
               </View>
            </TouchableHighlight>
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
        width: "100%",        
    },
    icon: {
      width: 50,
      height: 50,
    }
});

