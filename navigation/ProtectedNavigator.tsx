import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import SettingsScreen from "../screens/protected/SettingsScreen";
import Icon from "../components/Icon";
import iconImages from "../icoin";
import colours from "../colours";
import PostsNavigator, { PostsNavigatorParams } from "./PostsNavigator";

type ProtectedNavigatorParams = {
  Posts: PostsNavigatorParams;
  Settings: undefined;
};
const Tab = createBottomTabNavigator<ProtectedNavigatorParams>();

function ProtectedNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: colours.dark },
        headerTintColor: colours.light,
        tabBarStyle: { backgroundColor: colours.dark },
        tabBarActiveTintColor: colours.link,
      }}
    >
      <Tab.Screen
        name="Posts"
        component={PostsNavigator}
        options={{
          tabBarIcon: () => <Icon imgSrc={iconImages.posts} />,
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{ tabBarIcon: () => <Icon imgSrc={iconImages.settings} /> }}
      />
    </Tab.Navigator>
  );
}

export type { ProtectedNavigatorParams };
export default ProtectedNavigator;
