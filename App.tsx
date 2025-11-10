import { NavigationContainer } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { StatusBar } from "expo-status-bar";
import RootNavigator from "./navigation/RootNavigator";
import { AuthProvider } from "./contexts/AuthContext";
import Netinfo from "@react-native-community/netinfo";
import {
  QueryClient,
  QueryClientProvider,
  onlineManager,
  focusManager,
} from "@tanstack/react-query";
import { AppState, AppStateStatus, Platform } from "react-native";
import { useEffect } from "react";

const queryClient = new QueryClient();
onlineManager.setEventListener((setOnline) => {
  return Netinfo.addEventListener((state) => {
    setOnline(!!state.isConnected);
  });
});

const onAppStateChange = (status: AppStateStatus) => {
  if (Platform.OS !== "web") {
    focusManager.setFocused(status === "active");
  }
};

export default function App() {
  const [loaded] = useFonts({
    geist: require("./fonts/GeistMono-Regular.ttf"),
    "geist-bold": require("./fonts/GeistMono-Bold.ttf"),
    "geist-thin": require("./fonts/GeistMono-Thin.ttf"),
    signature: require("./fonts/MomoSignature-Regular.ttf"),
  });

  useEffect(() => {
    const subscription = AppState.addEventListener("change", onAppStateChange);

    return () => subscription.remove();
  }, []);

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
