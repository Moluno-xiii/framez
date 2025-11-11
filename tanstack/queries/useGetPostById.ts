import { useQuery } from "@tanstack/react-query";
import { getPostById } from "../../utils/queryPosts";

const useGetPostById = (post_id: string) => {
  return useQuery({
    queryKey: ["post", post_id],
    queryFn: async () => await getPostById(post_id),
    staleTime: Infinity,
    refetchOnWindowFocus: false,
  });
};

export default useGetPostById;
