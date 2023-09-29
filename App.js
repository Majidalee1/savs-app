import { NavigationContainer } from "@react-navigation/native";
import StackNavigater from "./src/StackNavigater";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function App() {
  return (
    <NavigationContainer>
      <SafeAreaProvider>
        <StackNavigater />
      </SafeAreaProvider>
    </NavigationContainer>
  );
}
