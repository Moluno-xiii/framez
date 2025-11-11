import { defaultProfilePicture } from "../constants";
import { CreateProfile, UserProfileType } from "../types";
import supabase from "./supabase";

const createProfile = async ({
  user_id,
  display_name,
  email,
}: CreateProfile) => {
  try {
    const { error } = await supabase
      .from("profile")
      .insert([
        { user_id, display_name, profile_pic: defaultProfilePicture, email },
      ]);
    if (error) throw error;
  } catch (err: unknown) {
    const message =
      err instanceof Error ? err.message : "unexpected error, try again later";
    throw new Error(message);
  }
};

const updateUserProfile = async ({
  user_id,
  display_name,
  profile_pic,
  about_me,
}: CreateProfile) => {
  try {
    const { error } = await supabase
      .from("profile")
      .update([{ display_name, profile_pic, about_me }])
      .eq("user_id", user_id);

    if (error) throw error;
  } catch (err: unknown) {
    const message =
      err instanceof Error ? err.message : "unexpected error, try again later";
    throw new Error(message);
  }
};

const getUserProfile = async (user_id: string) => {
  try {
    const { data, error } = await supabase
      .from("profile")
      .select("*")
      .eq("user_id", user_id);

    if (error) throw error;
    return data[0] as UserProfileType;
  } catch (err: unknown) {
    const message =
      err instanceof Error ? err.message : "unexpected error, try again later";
    throw new Error(message);
  }
};

export { createProfile, getUserProfile, updateUserProfile };
