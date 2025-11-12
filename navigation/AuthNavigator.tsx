import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { View } from "react-native";
import colours from "../colours";
import Icon from "../components/Icon";
import iconImages from "../icoin";
import LoginScreen from "../screens/auth/LoginScreen";
import SignupScreen from "../screens/auth/SignupScreen";

type AuthTabParamList = {
  Login: undefined;
  Signup: undefined;
};

const Tab = createBottomTabNavigator<AuthTabParamList>();

function AuthNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: { backgroundColor: colours.dark },
        tabBarActiveTintColor: colours.link,
        tabBarActiveBackgroundColor: colours.darker,
      }}
    >
      <Tab.Screen
        name="Login"
        component={LoginScreen}
        options={{
          tabBarIcon: () => <Icon imgSrc={iconImages.fingerprint} />,
        }}
      />
      <Tab.Screen
        name="Signup"
        component={SignupScreen}
        options={{
          tabBarIcon: () => (
            <View style={{ padding: 6, backgroundColor: "" }}>
              <Icon imgSrc={iconImages.signup} />,
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default AuthNavigator;

export type { AuthTabParamList };
