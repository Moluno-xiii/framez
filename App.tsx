import { NavigationContainer } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { StatusBar } from "expo-status-bar";
import RootNavigator from "./navigation/RootNavigator";
import { AuthProvider } from "./contexts/AuthContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export default function App() {
  const [loaded] = useFonts({
    geist: require("./fonts/GeistMono-Regular.ttf"),
    "geist-bold": require("./fonts/GeistMono-Bold.ttf"),
    "geist-thin": require("./fonts/GeistMono-Thin.ttf"),
    signature: require("./fonts/MomoSignature-Regular.ttf"),
  });

  if (!loaded) return null;

  return (
    <NavigationContainer>
      <AuthProvider>
        <QueryClientProvider client={queryClient}>
          <StatusBar style="auto" />
          <RootNavigator />
        </QueryClientProvider>
      </AuthProvider>
    </NavigationContainer>
  );
}
