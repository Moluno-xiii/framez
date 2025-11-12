import { useNavigation } from "@react-navigation/native";
import {
  ActivityIndicator,
  FlatList,
  Image,
  RefreshControl,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import colours from "../colours";
import { ProtectedNavigatorNavigationParam } from "../navigation/ProtectedNavigator";
import useGetUserPosts from "../tanstack/queries/useGetUserPosts";
import CustomButton from "./CustomButton";
import ErrorMessage from "./ErrorMessage";
import formatDateDsitance from "../utils/formateDateDistance";

const UserPosts = () => {
  const { data, isPending, error, refetch, isRefetching } = useGetUserPosts();
  const navigator = useNavigation<ProtectedNavigatorNavigationParam>();

  if (isPending) return <ActivityIndicator />;
  if (error) return <ErrorMessage message={error.message} refetch={refetch} />;

  if (data.length < 1) return <UserPostsEmptyState />;
  return (
    <View style={styles.screen}>
      <Text style={styles.title}>My Posts ({data.length})</Text>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{
          backgroundColor: colours.darker,
          gap: 20,
          flexGrow: 1,
        }}
        renderItem={({ item }) => (
          <View style={styles.container}>
            <View style={styles.row}>
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
                navigator.navigate("Posts", {
                  screen: "PostDetails",
                  params: { post_Id: item.id },
                })
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
    </View>
  );
};

export default UserPosts;

const UserPostsEmptyState = () => {
  const navigator = useNavigation<ProtectedNavigatorNavigationParam>();

  return (
    <View style={styles.emptyStateScreen}>
      <Text style={styles.title}>You have no posts yet.</Text>
      <CustomButton
        title="Get started"
        onClick={() =>
          navigator.navigate("Posts", {
            screen: "New",
          })
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    gap: 20,
    paddingBottom: 100,
    maxWidth: 700,
    alignSelf: "center",
    width: "100%",
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
  button: {
    backgroundColor: colours.darker,
    textAlign: "center",
    padding: 10,
    borderRadius: 9,
    alignSelf: "flex-end",
  },
  timestamp: {
    color: colours.link,
    fontFamily: "signature",
    fontSize: 12,
  },
  image: {
    height: 400,
    width: "auto",
    borderRadius: 7,
    borderColor: colours.darker,
  },
});
