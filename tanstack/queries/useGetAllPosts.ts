import { useQuery } from "@tanstack/react-query";
import { getAllPosts } from "../../utils/queryPosts";
import { PostType, UserProfileType } from "../../types";

const useGetAllPosts = () => {
  return useQuery({
    queryFn: async () => await getAllPosts(),
    queryKey: ["all_posts"],
    staleTime: Infinity,
    refetchOnWindowFocus: true,
  });
};

export default useGetAllPosts;
