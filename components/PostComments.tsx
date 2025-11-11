import { useState } from "react";
import {
  FlatList,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import colours from "../colours";
import useGetPostComments from "../tanstack/queries/useGetPostComments";
import AddCommentModal from "./AddCommentModal";
import CustomButton from "./CustomButton";
import ErrorMessage from "./ErrorMessage";
import { useNavigation } from "@react-navigation/native";
import { PostsNavigationProp } from "../navigation/PostsNavigator";

const PostComments = ({ post_id }: { post_id: string }) => {
  const [isCommentModalOpen, setIsCommentModalOpen] = useState(false);
  const { error, data, refetch } = useGetPostComments(post_id);
  const navigator = useNavigation<PostsNavigationProp>();

  if (error) return <ErrorMessage message={error.message} refetch={refetch} />;

  const closeCommentModal = () => {
    setIsCommentModalOpen(false);
  };

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={{ gap: 20, paddingBottom: 30 }}
    >
      {data.length < 1 && (
        <EmpyState openModal={() => setIsCommentModalOpen(true)} />
      )}
      <AddCommentModal
        isOpen={isCommentModalOpen}
        closeModal={closeCommentModal}
        post_id={post_id}
      />
      {data.length > 0 && (
        <View>
          <Text style={{ ...styles.title, marginVertical: 20 }}>
            Comments ({data.length})
          </Text>
          <CustomButton
            title="Add a comment"
            onClick={() => setIsCommentModalOpen(true)}
          />
          <FlatList
            data={data}
            contentContainerStyle={{
              gap: 20,
              marginTop: 20,
            }}
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
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                      gap: 20,
                    }}
                  >
                    <Text
                      style={{
                        ...styles.title,
                        fontSize: 14,
                        fontFamily: "geist-bold",
                      }}
                    >
                      {item.authorInfo.display_name ?? item.authorInfo.email}
                    </Text>
                    <Text style={styles.smallText}>
                      {item.created_at.split("T")[0]},{" "}
                      {item.created_at.split("T")[1].split(".")[0]}
                    </Text>
                  </View>
                  <Text style={styles.text}>{item.comment}</Text>
                </View>
              </View>
            )}
          />
        </View>
      )}
    </ScrollView>
  );
};

export default PostComments;

const EmpyState = ({ openModal }: { openModal: () => void }) => {
  return (
    <View style={{ justifyContent: "center", alignItems: "center", gap: 20 }}>
      <Text style={styles.text}>No comments yet, add a comment</Text>
      <CustomButton title="Add a comment" onClick={openModal} />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: { flex: 1 },
  text: { fontFamily: "geist", fontSize: 14, color: colours.light },
  smallText: {
    fontFamily: "signature",
    fontSize: 12,
    color: colours.link,
    opacity: 0.6,
  },
  title: { fontFamily: "geist", fontSize: 18, color: colours.light },
  modalView: {
    backgroundColor: colours.dark,
    minHeight: 200,
    margin: 20,
  },
  commentContainer: {
    flexDirection: "row",
    gap: 20,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: colours.dark,
    padding: 10,
  },
  commentText: {
    flexDirection: "column",
    flex: 1,
    gap: 10,
  },
  image: {
    height: 24,
    width: 24,
    borderRadius: 1000,
  },
});
