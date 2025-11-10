import { useQuery } from "@tanstack/react-query";
import useAuth from "../../contexts/AuthContext";
import { getUsersPosts } from "../../utils/queryPosts";
import { PostType } from "../../types";

const useGetUserPosts = () => {
  const { user } = useAuth();

  return useQuery({
    queryFn: async () => await getUsersPosts<PostType[]>(user?.id!),
    queryKey: ["user_posts", user?.id],
    staleTime: Infinity,
    refetchOnWindowFocus: true,
  });
};

export default useGetUserPosts;
