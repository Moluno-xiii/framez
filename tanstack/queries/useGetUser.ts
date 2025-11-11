import { useQuery } from "@tanstack/react-query";
import { UserProfileType } from "../../types";
import { getUserProfile } from "../../utils/queryUserProfile";

const useGetUser = (user_id: string) => {
  return useQuery({
    queryKey: ["user_info", user_id],
    staleTime: Infinity,
    refetchOnMount: true,
    refetchOnWindowFocus: false,
    queryFn: async (): Promise<UserProfileType> => {
      const userProfile = await getUserProfile(user_id);

      return userProfile;
    },
  });
};

export default useGetUser;
