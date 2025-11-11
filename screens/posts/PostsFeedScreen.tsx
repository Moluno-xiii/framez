import { useNavigation } from "@react-navigation/native";
import { FlatList, StyleSheet, Text, View } from "react-native";
import colours from "../../colours";
import CustomButton from "../../components/CustomButton";
import ErrorMessage from "../../components/ErrorMessage";
import Icon from "../../components/Icon";
import LoadingScreen from "../../components/LoadingScreen";
import useSetPageTitle from "../../hooks/useSetPageTitle";
import iconImages from "../../icoin";
import { PostsNavigationProp } from "../../navigation/PostsNavigator";
import useGetAllPosts from "../../tanstack/queries/useGetAllPosts";
import useRefreshOnFocus from "../../tanstack/queries/useRefetchOnFocus";

const PostsFeedScreen = () => {
  const navigator = useNavigation<PostsNavigationProp>();

  const headerRight = () => (
    <View>
      <Icon
        imgSrc={iconImages["add-circle"]}
        onClick={() => navigator.navigate("New")}
      />
    </View>
  );

  useSetPageTitle("Feed", headerRight);
  useRefreshOnFocus(["all_posts"]);

  const { data, isPending, error, refetch } = useGetAllPosts();

  if (isPending) return <LoadingScreen />;
  if (error) return <ErrorMessage message={error.message} refetch={refetch} />;

  if (data.length < 1) return <AllPostsEmptyState refetch={refetch} />;

  return (
    <View style={styles.screen}>
      <Text style={styles.text}>PostsFeedScreen {data.length}</Text>
      <FlatList
        data={data}
        renderItem={({ item }) => (
          <View>
            <Text style={styles.text}>{item.created_at}</Text>
          </View>
        )}
      />
    </View>
  );
};

export default PostsFeedScreen;

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

const AllPostsEmptyState = ({ refetch }: { refetch: () => void }) => {
  const navigator = useNavigation<PostsNavigationProp>();

  return (
    <View style={styles.emptyStateScreen}>
      <Text style={styles.title}>No posts yet.</Text>
      <CustomButton
        title="Create a post"
        onClick={() => navigator.navigate("New")}
      />
      <CustomButton title="refetch" onClick={refetch} />
    </View>
  );
};
