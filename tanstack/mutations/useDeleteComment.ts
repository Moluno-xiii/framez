import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Alert } from "react-native";
import { deleteComment } from "../../utils/queryComments";

const useDeleteComment = (post_id: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      user_id,
      comment_id,
    }: {
      user_id: string;
      comment_id: string;
    }) => await deleteComment(user_id, comment_id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["post_comments", post_id],
      });
    },
    onError: (err) => {
      Alert.alert(err.message);
    },
  });
};

export default useDeleteComment;
