import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Alert } from "react-native";
import useAuth from "../../contexts/AuthContext";
import { createPost } from "../../utils/queryPosts";
import { useNavigation } from "@react-navigation/native";
import { PostsNavigationProp } from "../../navigation/PostsNavigator";
import { CreatePost } from "../../types";

const useCreatePost = () => {
  const navigator = useNavigation<PostsNavigationProp>();
  const { user } = useAuth();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: CreatePost) => await createPost(data),
    onSuccess: () => {
      Alert.alert("Mutation crate post successful");
      queryClient.invalidateQueries({
        queryKey: ["all_posts"],
      });
      queryClient.invalidateQueries({
        queryKey: ["user_posts", user?.id],
      });
      navigator.navigate("Feed");
    },
    onError: (err) => {
      Alert.alert(err.message);
    },
  });
};

export default useCreatePost;
