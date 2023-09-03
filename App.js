import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import Navigator from "./src/components/Navigator";
import AppProvider from "./src/provider/context";

export default function App() {
  return (
    <AppProvider>
      <NavigationContainer>
        <Navigator />
      </NavigationContainer>
    </AppProvider>
  );
}
