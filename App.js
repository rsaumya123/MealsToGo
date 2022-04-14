import { StatusBar as ExpoStatusBar } from "expo-status-bar";
import React from "react";
import { ThemeProvider } from "styled-components/native";

import * as firebase from "firebase";
import { AuthenticationContextProvider } from "./src/services/authentication/authentication.context";

import {
  useFonts as useOswald,
  Oswald_400Regular,
} from "@expo-google-fonts/oswald";
import { useFonts as useLato, Lato_400Regular } from "@expo-google-fonts/lato";

import { theme } from "./src/infrastructure/theme";
import { Navigation } from "./src/infrastructure/navigation";

const firebaseConfig = {
  apiKey: "enter your firebase api key",
  authDomain: "mealstogo-50453.firebaseapp.com",
  projectId: "mealstogo-50453",
  storageBucket: "mealstogo-50453.appspot.com",
  messagingSenderId: "453665257689",
  appId: "1:453665257689:web:80f8e94dbbce56eafba6c8",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
// const app = initializeApp(firebaseConfig);

export default function App() {
  const [oswaldLoaded] = useOswald({
    Oswald_400Regular,
  });

  const [latoLoaded] = useLato({
    Lato_400Regular,
  });

  if (!oswaldLoaded || !latoLoaded) {
    return null;
  }

  return (
    <>
      <ThemeProvider theme={theme}>
        <AuthenticationContextProvider>
          <Navigation />
        </AuthenticationContextProvider>
      </ThemeProvider>
      <ExpoStatusBar style="auto" />
    </>
  );
}
