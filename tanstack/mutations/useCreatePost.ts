import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Alert } from "react-native";
import useAuth from "../../contexts/AuthContext";
import { createPost } from "../../utils/queryPosts";
import { useNavigation } from "@react-navigation/native";
import { PostsNavigationProp } from "../../navigation/PostsNavigator";
import { CreatePost } from "../../types";
import { updateImage } from "../../utils/supabaseStorageQueries";
import supabase from "../../utils/supabase";

const useCreatePost = () => {
  const navigator = useNavigation<PostsNavigationProp>();
  const { user } = useAuth();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (
      data: CreatePost & {
        imageDetails?: { url: string; imageBlob: ArrayBuffer };
      }
    ) => {
      if (data.imageDetails) {
        const publicImageUrl = await uploadImage({
          imageBlob: data.imageDetails.imageBlob,
          imageUrl: data.imageDetails.url,
          user_id: data.user_id,
        });

        if (!publicImageUrl)
          throw new Error("Error uploading image, try again later");
        await createPost({ ...data, images: [publicImageUrl] });
        return;
      }
      await createPost(data);
    },
    onSuccess: () => {
      Alert.alert("Post created successfully");
      queryClient.invalidateQueries({
        queryKey: ["all_posts"],
      });
      queryClient.invalidateQueries({
        queryKey: ["user_posts", user?.id],
      });
      navigator.navigate("Feed");
    },
    onError: (err) => {
      Alert.alert(err.message);
    },
  });
};

export default useCreatePost;

const uploadImage = async ({
  imageBlob,
  imageUrl,
  user_id,
}: {
  imageBlob: ArrayBuffer;
  imageUrl: string;
  user_id: string;
}) => {
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

    Alert.alert("Profile updated succ essfully");
    return publicImageUrl;
  } catch (err) {
    const message =
      err instanceof Error
        ? err.message
        : "Unexpected error occured while trying to upload your image, please relaunch the app and try again.";
    throw new Error(message);
  }
};
