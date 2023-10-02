import { useState } from "react";
import { Alert, StyleSheet, View, Button, TextInput, Text } from "react-native";
import { supabase, supabaseUrl } from "../lib/supabase";
import { makeRedirectUri, useAuthRequest } from "expo-auth-session";
import * as WebBrowser from "expo-web-browser";
// import * as AuthSession from "expo-auth-session";
import * as Linking from "expo-linking";

export default function Auth() {
   const [loading, setLoading] = useState(false);

   const extractParamsFromUrl = (url: string) => {
      const params = new URLSearchParams(url.split("#")[1]);
         const data = {
            access_token: params.get("access_token"),
            expires_in: parseInt(params.get("expires_in") || "0"),
            refresh_token: params.get("refresh_token"),
            token_type: params.get("token_type"),
            provider_token: params.get("provider_token"),
         };
      
         return data;
      };

   async function signInWithEmail() {
      setLoading(true);

      // const redirectUrl = makeRedirectUri({
      //    scheme: "formi",
      //    path: "/auth/callback",
      // });

      const redirectUrl = "formi://auth/callback";

      // let redirectURL = Linking.createURL("/auth/callback");
      // (redirectURL);
      // const { data, error } = await supabase.auth.signInWithOtp({
      //    email: "kishansripada@gmail.com",
      //    options: {
      //       emailRedirectTo: redirectURL,
      //    },
      // })

      // const getGoogleOAuthUrl = async (): Promise<string | null> => {
      //       const result = await supabase.auth.signInWithOAuth({
      //        provider: "google",
      //        options: {
      //           redirectTo: "mysupabaseapp://google-auth",
      //         },
      //       });
            
      //       return result.data.url;
      //    };

      // const authResponse = await AuthSession.promptAsync({
      //    authUrl: `${supabaseUrl}/auth/v1/authorize?provider=google&redirect_to=${redirectUrl}`,
      //    returnUrl: redirectUrl,
      // });

      const result = await WebBrowser.openAuthSessionAsync(
         `${supabaseUrl}/auth/v1/authorize?provider=google&redirect_to=${redirectUrl}`,
             redirectUrl,
                {
                  showInRecents: true,
                }
              );

      if (result.type === "success") {
         const data = extractParamsFromUrl(result.url);
         supabase.auth.setSession({
            access_token: data.access_token,
            refresh_token: data.refresh_token,
         });
      }

      // if (error) Alert.alert(error.message);
      setLoading(false);
   }

   return (
      <View style={styles.container}>
         <View style={styles.innerContainer}>
            <Text style={styles.headerText}>FORMI</Text>
         </View>

         <Button title="Sign in with Google" color="#000000" disabled={loading} onPress={signInWithEmail} />
      </View>
   );
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
      justifyContent: "center",
   },
   innerContainer: {
      width: 200,
      alignSelf: "center",
      marginBottom: 20,
      alignItems: "center",
   },
   headerText: {
      fontSize: 40,
      fontWeight: "bold",
      zIndex: 10,
      position: "relative",
   },
   underline: {
      backgroundColor: "#F06292",
      height: 3,
      width: "100%",
      opacity: 0.4,
      position: "relative",
      top: -15,
   },
});
