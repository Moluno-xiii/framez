import { useState } from "react";
import {
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
  RefreshControl,
} from "react-native";
import colours from "../colours";
import useGetPostComments from "../tanstack/queries/useGetPostComments";
import AddCommentModal from "./AddCommentModal";
import CustomButton from "./CustomButton";
import ErrorMessage from "./ErrorMessage";
import { useNavigation } from "@react-navigation/native";
import { PostsNavigationProp } from "../navigation/PostsNavigator";
import formatDateDsitance from "../utils/formateDateDistance";

const PostComments = ({ post_id }: { post_id: string }) => {
  const [isCommentModalOpen, setIsCommentModalOpen] = useState(false);
  const {
    error,
    data = [],
    refetch,
    isRefetching,
  } = useGetPostComments(post_id);
  const navigator = useNavigation<PostsNavigationProp>();

  if (error) return <ErrorMessage message={error.message} refetch={refetch} />;

  const closeCommentModal = () => setIsCommentModalOpen(false);

  return (
    <View style={styles.screen}>
      <AddCommentModal
        isOpen={isCommentModalOpen}
        closeModal={closeCommentModal}
        post_id={post_id}
      />

      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{
          paddingVertical: 20,
          gap: 20,
          paddingBottom: 60,
        }}
        ListHeaderComponent={
          <>
            <Text style={styles.title}>Comments ({data.length})</Text>
            {data.length ? (
              <CustomButton
                title="Add a comment"
                onClick={() => setIsCommentModalOpen(true)}
              />
            ) : null}
          </>
        }
        ListEmptyComponent={
          <EmpyState openModal={() => setIsCommentModalOpen(true)} />
        }
        renderItem={({ item }) => (
          <View style={styles.commentContainer}>
            <Pressable
              onPress={() =>
                navigator.navigate("CommentAuthorProfile", {
                  user_id: item.user_id,
                })
              }
            >
              <Image
                source={{ uri: item.authorInfo.profile_pic }}
                style={styles.image}
              />
            </Pressable>
            <View style={styles.commentText}>
              <View style={styles.commentHeader}>
                <Text style={styles.commentAuthor}>
                  {item.authorInfo.display_name ?? item.authorInfo.email}
                </Text>
                <Text style={styles.smallText}>
                  {formatDateDsitance(item.created_at)}
                </Text>
              </View>
              <Text style={styles.text}>{item.comment}</Text>
            </View>
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

export default PostComments;

const EmpyState = ({ openModal }: { openModal: () => void }) => (
  <View style={{ justifyContent: "center", alignItems: "center", gap: 20 }}>
    <Text style={styles.text}>No comments yet, add a comment</Text>
    <CustomButton title="Add a comment" onClick={openModal} />
  </View>
);

const styles = StyleSheet.create({
  screen: { flex: 1 },
  text: { fontFamily: "geist", fontSize: 14, color: colours.light },
  smallText: {
    fontFamily: "signature",
    fontSize: 12,
    color: colours.link,
    opacity: 0.6,
  },
  title: {
    fontFamily: "geist-bold",
    fontSize: 18,
    color: colours.light,
    marginBottom: 10,
  },
  commentContainer: {
    flexDirection: "row",
    gap: 20,
    borderRadius: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#5c565652",
    padding: 10,
  },
  commentText: {
    flex: 1,
    flexDirection: "column",
    gap: 10,
  },
  commentHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 20,
  },
  commentAuthor: {
    fontFamily: "geist-bold",
    fontSize: 14,
    color: colours.light,
  },
  image: {
    height: 32,
    width: 32,
    borderRadius: 16,
  },
});
