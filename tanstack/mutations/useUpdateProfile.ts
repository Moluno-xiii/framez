import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Alert } from "react-native";
import { updateImage } from "../../utils/supabaseStorageQueries";
import supabase from "../../utils/supabase";
import { updateUserProfile } from "../../utils/queryUserProfile";

const useUpdateProfile = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: UpdateProfileData) => await updateProfile(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["user_info"],
      });
    },
    onError: (err) => {
      Alert.alert(err.message);
    },
  });
};

export default useUpdateProfile;

type UpdateProfileData = {
  user_id: string;
  display_name?: string;
  imageBlob?: ArrayBuffer;
  imageUrl?: string;
};

const updateProfile = async ({
  imageBlob,
  imageUrl,
  display_name,
  user_id,
}: UpdateProfileData) => {
  try {
    let publicImageUrl;

    if (imageBlob && imageUrl) {
      const imageExtension = imageUrl.split(".").pop();
      const url = `private/${user_id}-${Date.now()}.${imageExtension}`;

      const { data, error: imageUploadError } = await updateImage(
        url,
        imageBlob
      );
      if (imageUploadError) {
        throw imageUploadError;
      }

      if (data) {
        const { data: publicUrlData } = await supabase.storage
          .from("user_avatars")
          .getPublicUrl(data.path);
        publicImageUrl = publicUrlData.publicUrl;
      }
    }

    await updateUserProfile({
      user_id: user_id,
      display_name,
      profile_pic: publicImageUrl,
    });

    Alert.alert("Profile updated successfully");
  } catch (err) {
    const message =
      err instanceof Error
        ? err.message
        : "Unexpected error occured while trying to update your profile, please relaunch the app and try again.";
    throw new Error(message);
  }
};
