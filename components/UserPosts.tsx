import { useNavigation } from "@react-navigation/native";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";
import colours from "../colours";
import { ProtectedNavigatorNavigationParam } from "../navigation/ProtectedNavigator";
import useGetUserPosts from "../tanstack/queries/useGetUserPosts";
import CustomButton from "./CustomButton";
import ErrorMessage from "./ErrorMessage";

const UserPosts = () => {
  const { data, isPending, error, refetch } = useGetUserPosts();

  if (isPending) return <ActivityIndicator />;
  if (error) return <ErrorMessage message={error.message} refetch={refetch} />;

  if (data.length < 1) return <UserPostsEmptyState />;
  return (
    <View style={styles.screen}>
      <Text style={styles.text}>UserPosts {data.length}</Text>
      <FlatList
        data={data}
        renderItem={({ item }) => (
          <View>
            <Text style={styles.text}>{item.text}</Text>
          </View>
        )}
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
