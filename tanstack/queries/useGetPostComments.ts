import { useSuspenseQuery } from "@tanstack/react-query";
import { getPostComments } from "../../utils/queryComments";
import { PostComment } from "../../types";

const useGetPostComments = (post_id: string) => {
  return useSuspenseQuery({
    queryKey: ["post_comments", post_id],
    refetchOnWindowFocus: false,
    staleTime: Infinity,
    queryFn: async () => await getPostComments<PostComment[]>(post_id),
  });
};

export default useGetPostComments;
