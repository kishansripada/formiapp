import { useEffect, useState, useCallback, useRef } from "react";
import { StyleSheet, View, Text } from "react-native";
import { supabase } from "../../lib/supabase";
import { cloudSettings, formation, PIXELS_PER_SECOND } from "../../lib/types"

export const Tracker = ({cloudSettings, performanceOpen, curSecond, position, setPosition }) => {


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

