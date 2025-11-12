import { useNavigation } from "@react-navigation/native";
import {
  FlatList,
  Image,
  Pressable,
  RefreshControl,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
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
import formatDateDsitance from "../../utils/formateDateDistance";

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
            <Pressable
              onPress={() =>
                navigator.navigate("CommentAuthorProfile", {
                  user_id: item.user_id,
                })
              }
            >
              <View
                style={{ flexDirection: "row", alignItems: "center", gap: 10 }}
              >
                <Image
                  style={{ height: 24, width: 24, borderRadius: 100 }}
                  source={{ uri: item.authorInfo.profile_pic }}
                />
                <Text style={styles.title}>
                  {item.authorInfo.display_name ?? item.authorInfo.email}
                </Text>
              </View>
            </Pressable>
            <Text style={styles.timestamp}>
              {formatDateDsitance(item.created_at)}
            </Text>
          </View>
          <Text style={styles.text}>{item.text}</Text>
          {item.images?.length ? (
            <Image source={{ uri: item.images[0] }} style={styles.image} />
          ) : null}
          <TouchableOpacity
            style={styles.button}
            onPress={() =>
              navigator.navigate("PostDetails", { post_Id: item.id })
            }
          >
            <Text style={styles.text}>View Post</Text>
          </TouchableOpacity>
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
  button: {
    backgroundColor: colours.darker,
    textAlign: "center",
    padding: 10,
    borderRadius: 9,
    alignSelf: "flex-end",
  },
  image: {
    height: 400,
    width: "auto",
    borderRadius: 7,
    borderColor: colours.darker,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  timestamp: {
    color: colours.link,
    fontFamily: "signature",
    fontSize: 12,
  },
  text: {
    fontFamily: "geist",
    fontSize: 14,
    color: colours.light,
  },
  title: {
    fontFamily: "geist-bold",
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
