import { StyleSheet, Text, View } from "react-native";
import colours from "../../colours";
import ErrorMessage from "../../components/ErrorMessage";
import LoadingScreen from "../../components/LoadingScreen";
import useSetPageTitle from "../../hooks/useSetPageTitle";
import useGetPostById from "../../tanstack/queries/useGetPostById";
import { RouteProp, useRoute } from "@react-navigation/native";
import { PostsNavigatorParams } from "../../navigation/PostsNavigator";
import { lazy, Suspense } from "react";

const PostComments = lazy(() => import("../../components/PostComments"));

type PostDetailsRouteProp = RouteProp<PostsNavigatorParams, "PostDetails">;

const PostDetailsScreen = () => {
  useSetPageTitle("Post Details");
  const route = useRoute<PostDetailsRouteProp>();
  const { data, isPending, error, refetch } = useGetPostById(
    route.params.post_Id
  );

  if (isPending) return <LoadingScreen />;
  if (error) return <ErrorMessage message={error.message} refetch={refetch} />;
  return (
    <View style={styles.screen}>
      <Text style={styles.title}>
        {data.authorInfo.display_name ?? data.authorInfo.email}
      </Text>
      <Text style={styles.text}>{data.text}</Text>
      <Suspense fallback={<LoadingScreen />}>
        <PostComments post_id={route.params.post_Id!} />
      </Suspense>
    </View>
  );
};

export default PostDetailsScreen;

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colours.darker, padding: 20, gap: 20 },
  text: { fontFamily: "geist", fontSize: 14, color: colours.light },
  title: { fontFamily: "geist", fontSize: 20, color: colours.light },
  emptyStateScreen: {
    flex: 1,
    backgroundColor: colours.darker,
    justifyContent: "center",
    alignItems: "center",
    gap: 20,
  },
});
