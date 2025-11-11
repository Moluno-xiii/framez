import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from "@react-navigation/native-stack";
import PostsFeedScreen from "../screens/posts/PostsFeedScreen";
import AddNewPostScreen from "../screens/posts/AddNewPostScreen";
import colours from "../colours";
import PostDetailsScreen from "../screens/posts/PostDetailsScreen";
import CommentAuthorProfile from "../screens/posts/CommentAuthorProfile";

type PostsNavigatorParams = {
  New: undefined;
  Feed: undefined;
  PostDetails: { post_Id: string };
  CommentAuthorProfile: { user_id: string };
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
      <Stack.Screen name="PostDetails" component={PostDetailsScreen} />
      <Stack.Screen
        name="CommentAuthorProfile"
        component={CommentAuthorProfile}
      />
    </Stack.Navigator>
  );
}

export type { PostsNavigatorParams, PostsNavigationProp };
export default PostsNavigator;
