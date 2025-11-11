import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { CompositeNavigationProp } from "@react-navigation/native";
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from "@react-navigation/native-stack";
import AuthLoadingScreen from "../components/AuthLoadingScreen";
import useAuth from "../contexts/AuthContext";
import AuthNavigator, { AuthTabParamList } from "./AuthNavigator";
import ProtectedNavigator, {
  ProtectedNavigatorParams,
} from "./ProtectedNavigator";

type RootNavParamList = {
  Auth: undefined;
  Protected: ProtectedNavigatorParams;
};

type RootNavigatorParam = CompositeNavigationProp<
  BottomTabNavigationProp<AuthTabParamList, "Login">,
  NativeStackNavigationProp<RootNavParamList>
>;

const Stack = createNativeStackNavigator<RootNavParamList>();

function RootNavigator() {
  const { session } = useAuth();

  if (session === undefined) return <AuthLoadingScreen />;

  return (
    <Stack.Navigator>
      {session === null ? (
        <Stack.Screen
          name="Auth"
          component={AuthNavigator}
          options={{ headerShown: false }}
        />
      ) : (
        <Stack.Screen
          name="Protected"
          component={ProtectedNavigator}
          options={{ headerShown: false }}
        />
      )}
    </Stack.Navigator>
  );
}

export default RootNavigator;

export type { RootNavigatorParam, RootNavParamList };
