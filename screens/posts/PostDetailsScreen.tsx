import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { lazy, Suspense, useLayoutEffect } from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import colours from "../../colours";
import ErrorMessage from "../../components/ErrorMessage";
import LoadingScreen from "../../components/LoadingScreen";
import {
  PostsNavigationProp,
  PostsNavigatorParams,
} from "../../navigation/PostsNavigator";
import useGetPostById from "../../tanstack/queries/useGetPostById";
import formatDateDsitance from "../../utils/formateDateDistance";

const PostComments = lazy(() => import("../../components/PostComments"));

type PostDetailsRouteProp = RouteProp<PostsNavigatorParams, "PostDetails">;

const PostDetailsScreen = () => {
  const navigator = useNavigation<PostsNavigationProp>();
  const route = useRoute<PostDetailsRouteProp>();
  const { data, isPending, error, refetch } = useGetPostById(
    route.params.post_Id
  );

  useLayoutEffect(() => {
    navigator.setOptions({
      headerTitle: "Post Details",
      headerTitleStyle: { fontFamily: "signature", fontSize: 18 },
    });
  });

  if (isPending) return <LoadingScreen />;
  if (error) return <ErrorMessage message={error.message} refetch={refetch} />;
  return (
    <View style={styles.screen}>
      <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
        <Pressable
          onPress={() =>
            navigator.navigate("CommentAuthorProfile", {
              user_id: data.user_id,
            })
          }
        >
          <Image
            style={{ height: 24, width: 24, borderRadius: 100 }}
            source={{ uri: data.authorInfo.profile_pic }}
          />
        </Pressable>
        <Text style={styles.title}>
          {data.authorInfo.display_name ?? data.authorInfo.email}
        </Text>
        <Text
          style={{
            ...styles.text,
            flex: 1,
            alignSelf: "flex-end",
            color: colours.link,
            textAlign: "right",
          }}
        >
          {formatDateDsitance(data.created_at)}
        </Text>
      </View>
      <Text style={styles.text}>{data.text}</Text>
      {data.images?.length ? (
        <Image source={{ uri: data.images[0] }} style={styles.image} />
      ) : null}
      <Suspense fallback={<LoadingScreen />}>
        <PostComments post_id={route.params.post_Id!} />
      </Suspense>
    </View>
  );
};

export default PostDetailsScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colours.darker,
    paddingHorizontal: 20,
    paddingTop: 20,
    gap: 20,
  },
  text: { fontFamily: "geist", fontSize: 14, color: colours.light },
  title: { fontFamily: "geist", fontSize: 20, color: colours.light },
  emptyStateScreen: {
    flex: 1,
    backgroundColor: colours.darker,
    justifyContent: "center",
    alignItems: "center",
    gap: 20,
  },
  image: {
    height: 300,
    width: "auto",
    borderWidth: 2,
    // borderColor: colours.darker,
  },
});
