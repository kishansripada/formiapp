import { useEffect, useState, useCallback, useRef } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { supabase } from "../../lib/supabase";
import { cloudSettings, formation, PIXELS_PER_SECOND } from "../../lib/types"

export const Timeline = ({cloudSettings, formations, performanceOpen, pixelsPerSecond }) => {

   return (
      <>
      {
        cloudSettings ? 
        <View style={styles.container} >
                {
                    formations.map((formation) => {
                        return (
                            <View 
                                key={formation.id}
                                style={[
                                    styles.formation,
                                    { width: pixelsPerSecond * formation.durationSeconds }
                                ]}
                            >
                                <Text style={styles.text}>
                                    {formation.name}
                                </Text>
                            </View>
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
        alignItems: "center",
    },
    text: {
        margin: 10,
        fontWeight: "bold",
        fontSize: 20,
        textAlign: "center",
        flex: 1,
        color: '#FFFFFF',
    },
    formation: {
        borderWidth: 2,
        borderColor: '#dc2f79',
        borderRadius: 20,
        backgroundColor: "#262626",
        alignItems: "flex-start",
        height: "80%",
        flexDirection: "column",
   },
});

