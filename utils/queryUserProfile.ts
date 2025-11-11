import { Alert } from "react-native";
import supabase from "./supabase";
import { defaultProfilePicture } from "../constants";
import { CreateProfile, UserProfileType } from "../types";

const createProfile = async ({ user_id, display_name }: CreateProfile) => {
  try {
    const { data, error } = await supabase
      .from("profile")
      .insert([{ user_id, display_name, profile_pic: defaultProfilePicture }]);
    if (error) throw error;
    Alert.alert("profile created succesully");
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
}: CreateProfile) => {
  try {
    const { error } = await supabase
      .from("profile")
      .update([{ display_name, profile_pic }])
      .eq("user_id", user_id);

    if (error) throw error;
  } catch (err: unknown) {
    const message =
      err instanceof Error ? err.message : "unexpected error, try again later";
    throw new Error(message);
  }
};

// const getUserProfile = async (user_id: string): UserProfileType => {
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

export { createProfile, updateUserProfile, getUserProfile };
