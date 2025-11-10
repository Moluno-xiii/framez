import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from "@react-navigation/native-stack";
import PostsFeedScreen from "../screens/posts/PostsFeedScreen";
import AddNewPostScreen from "../screens/posts/AddNewPostScreen";
import colours from "../colours";

type PostsNavigatorParams = {
  New: undefined;
  Feed: undefined;
};

type PostsNavigationProp = NativeStackNavigationProp<PostsNavigatorParams>;

const Stack = createNativeStackNavigator<PostsNavigatorParams>();

function PostsNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: colours.dark },
        headerTintColor: colours.light,
      }}
    >
      <Stack.Screen name="Feed" component={PostsFeedScreen} />
      <Stack.Screen name="New" component={AddNewPostScreen} />
    </Stack.Navigator>
  );
}

export type { PostsNavigatorParams, PostsNavigationProp };
export default PostsNavigator;
