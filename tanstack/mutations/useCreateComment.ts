import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Alert } from "react-native";
import { CreateCommentType } from "../../types";
import { addPostComment } from "../../utils/queryComments";

const useCreateComment = (closeModal: () => void, post_id: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: CreateCommentType) => await addPostComment(data),
    onSuccess: () => {
      Alert.alert("Comment added successfully");
      queryClient.invalidateQueries({
        queryKey: ["post", post_id],
      });
      queryClient.invalidateQueries({
        queryKey: ["post_comments", post_id],
      });
      closeModal();
    },
    onError: (err) => {
      Alert.alert(err.message);
    },
  });
};

export default useCreateComment;
