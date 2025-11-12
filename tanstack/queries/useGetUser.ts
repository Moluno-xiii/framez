import { useQuery } from "@tanstack/react-query";
import { UserProfileType } from "../../types";
import { getUserProfile } from "../../utils/queryUserProfile";
import useAuth from "../../contexts/AuthContext";

const useGetUser = (user_id?: string) => {
  const { user } = useAuth();
  const userId = user_id ?? user?.id!;
  return useQuery({
    queryKey: ["user_info", userId],
    staleTime: Infinity,
    refetchOnMount: true,
    refetchOnWindowFocus: false,
    queryFn: async (): Promise<UserProfileType> => {
      const userProfile = await getUserProfile(userId);

      return userProfile;
    },
  });
};

export default useGetUser;
