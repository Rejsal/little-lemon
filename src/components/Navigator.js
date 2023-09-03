import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Onboarding from "./Onboarding";
import { useAppContext } from "../provider/context";
import Splash from "./Splash";
import Home from "./Home";
import Profile from "./Profile";

const Stack = createNativeStackNavigator();

export default function Navigator() {
  const { isLoading, isOnboardingCompleted } = useAppContext();
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      {isLoading ? (
        <Stack.Screen name="Splash" component={Splash} />
      ) : isOnboardingCompleted ? (
        <>
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Profile" component={Profile} />
        </>
      ) : (
        <Stack.Screen name="Onboarding" component={Onboarding} />
      )}
    </Stack.Navigator>
  );
}
