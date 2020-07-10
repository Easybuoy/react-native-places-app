import React from "react";
import { NavigationContainer } from "@react-navigation/native";

import { StackScreen } from "./navigation/Navigator";

export default function App() {
  return (
    <NavigationContainer>
      <StackScreen />
    </NavigationContainer>
  );
}
