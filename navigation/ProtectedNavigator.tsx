import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import SettingsScreen from "../screens/settings/SettingsScreen";
import Icon from "../components/Icon";
import iconImages from "../icoin";
import colours from "../colours";
import PostsNavigator, { PostsNavigatorParams } from "./PostsNavigator";
import useImagePicker from "../hooks/useImagePicker";
import ProfileScreen from "../screens/ProfileScreen";

type ProtectedNavigatorParams = {
  Posts: PostsNavigatorParams;
  Settings: undefined;
  Profile: undefined;
};
const Tab = createBottomTabNavigator<ProtectedNavigatorParams>();

function ProtectedNavigator() {
  const { imageUrl } = useImagePicker();
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
        name="Profile"
        component={ProfileScreen}
        options={{ tabBarIcon: () => <Icon uri={imageUrl} isImage={true} /> }}
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
