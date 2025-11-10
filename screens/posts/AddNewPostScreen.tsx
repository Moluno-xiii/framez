import { useNavigation } from "@react-navigation/native";
import { useLayoutEffect, useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { PostsNavigationProp } from "../../navigation/PostsNavigator";
import colours from "../../colours";
import CustomButton from "../../components/CustomButton";
import useCreatePost from "../../tanstack/mutations/useCreatePost";
import useAuth from "../../contexts/AuthContext";

const AddNewPostScreen = () => {
  const navigator = useNavigation<PostsNavigationProp>();
  const [postText, setPostText] = useState("");
  const { user } = useAuth();

  useLayoutEffect(() => {
    navigator.setOptions({
      headerTitle: "Create new post",
      headerTitleStyle: { fontFamily: "signature", fontSize: 18 },
    });
  });

  const { isPending, mutate } = useCreatePost();

  return (
    <View style={styles.screen}>
      <Text style={styles.title}>Add new Post</Text>
      <View style={styles.form}>
        <TextInput
          style={styles.textarea}
          multiline={true}
          placeholder="Enter your text here..."
          textAlignVertical="top"
          placeholderTextColor={colours.placeholderText}
          value={postText}
          onChangeText={setPostText}
        />
        <CustomButton
          title="Create post"
          pending={isPending}
          pendingMessage="Creating post..."
          onClick={() => mutate({ text: postText, user_id: user?.id! })}
          disabled={!postText}
        />
      </View>
    </View>
  );
};

export default AddNewPostScreen;

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colours.darker, padding: 20, gap: 20 },
  title: { fontFamily: "geist", fontSize: 20, color: colours.light },
  textarea: {
    height: 100,
    borderColor: colours.dark,
    borderWidth: 1,
    padding: 10,
    color: colours.lighter,
    borderRadius: 8,
  },
  form: {
    gap: 20,
    flexDirection: "column",
  },
});
