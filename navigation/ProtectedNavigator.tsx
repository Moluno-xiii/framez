import {
  BottomTabNavigationProp,
  createBottomTabNavigator,
} from "@react-navigation/bottom-tabs";
import { NavigatorScreenParams } from "@react-navigation/native";
import colours from "../colours";
import Icon from "../components/Icon";
import LoadingScreen from "../components/LoadingScreen";
import iconImages from "../icoin";
import ProfileScreen from "../screens/ProfileScreen";
import SettingsScreen from "../screens/settings/SettingsScreen";
import useGetUser from "../tanstack/queries/useGetUser";
import PostsNavigator, { PostsNavigatorParams } from "./PostsNavigator";
import useAuth from "../contexts/AuthContext";

type ProtectedNavigatorParams = {
  Posts: NavigatorScreenParams<PostsNavigatorParams>;
  Settings: undefined;
  Profile: undefined;
};

type ProtectedNavigatorNavigationParam =
  BottomTabNavigationProp<ProtectedNavigatorParams>;

const Tab = createBottomTabNavigator<ProtectedNavigatorParams>();

function ProtectedNavigator() {
  const { user } = useAuth();
  const { data, isPending } = useGetUser(user?.id!);

  if (isPending) return <LoadingScreen />;
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
        options={{
          tabBarIcon: () => <Icon uri={data?.profile_pic} isImage={true} />,
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

export type { ProtectedNavigatorNavigationParam, ProtectedNavigatorParams };
export default ProtectedNavigator;
