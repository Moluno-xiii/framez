import { useNavigation } from "@react-navigation/native";
import { FlatList, RefreshControl, StyleSheet, Text, View } from "react-native";
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

  const { data, isPending, error, refetch, isRefetching } = useGetAllPosts();

  if (isPending) return <LoadingScreen />;
  if (error) return <ErrorMessage message={error.message} refetch={refetch} />;

  if (data.length < 1) return <AllPostsEmptyState refetch={refetch} />;
  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.id}
      contentContainerStyle={{
        backgroundColor: colours.darker,
        padding: 20,
        gap: 20,
        paddingBottom: 30,
        flexGrow: 1,
      }}
      renderItem={({ item }) => (
        <View style={styles.container}>
          <View style={styles.row}>
            <Text style={styles.text}>
              {item.authorInfo.display_name ?? item.authorInfo.email}
            </Text>
            <Text style={styles.timestamp}>
              {item.created_at.split("T")[0]},{" "}
              {item.created_at.split("T")[1].split(".")[0]}
            </Text>
          </View>
          <Text style={styles.title}>{item.text}</Text>
          <CustomButton
            onClick={() =>
              navigator.navigate("PostDetails", { post_Id: item.id })
            }
            title="Check post details"
          />
        </View>
      )}
      refreshControl={
        <RefreshControl
          refreshing={isRefetching}
          onRefresh={refetch}
          tintColor={colours.link}
          colors={[colours.link]}
          progressBackgroundColor={colours.darker}
        />
      }
    />
  );
};

export default PostsFeedScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colours.dark,
    borderRadius: 12,
    padding: 16,
    gap: 10,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  text: {
    fontFamily: "geist",
    fontSize: 14,
    color: colours.light,
  },
  timestamp: {
    color: colours.link,
    fontFamily: "signature",
    fontSize: 12,
  },
  title: {
    fontFamily: "geist",
    fontSize: 16,
    color: colours.light,
  },
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
