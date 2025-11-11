import { useQuery } from "@tanstack/react-query";
import useAuth from "../../contexts/AuthContext";
import { UserProfileType } from "../../types";
import { getUserProfile } from "../../utils/queryUserProfile";

const useGetUser = () => {
  const { user } = useAuth();
  return useQuery({
    queryKey: ["user_info"],
    staleTime: Infinity,
    refetchOnMount: true,
    refetchOnWindowFocus: false,
    queryFn: async (): Promise<UserProfileType> => {
      const userProfile = await getUserProfile(user?.id!);

      return userProfile;
    },
  });
};

export default useGetUser;
