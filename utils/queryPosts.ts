import { CreatePost } from "../types";
import supabase from "./supabase";

const getAllPosts = async <T>(): Promise<T> => {
  try {
    const { data: posts, error } = await supabase
      .from("posts")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) throw error;
    return posts as T;
  } catch (err: unknown) {
    const message =
      err instanceof Error
        ? err.message
        : "Unexpected error while getting posts, try again.";
    throw new Error(message);
  }
};

const getUsersPosts = async <T>(userId: string): Promise<T> => {
  try {
    const { data: posts, error } = await supabase
      .from("posts")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false });
    if (error) throw error;
    return posts as T;
  } catch (err: unknown) {
    const message =
      err instanceof Error
        ? err.message
        : "Unexpected error while getting your posts, try again.";
    throw new Error(message);
  }
};

const deleteUserPost = async (userId: string) => {
  const { error } = await supabase.from("posts").delete().eq("user_id", userId);

  return { error };
};

const createPost = async ({ text, user_id, images = [] }: CreatePost) => {
  try {
    const { error } = await supabase.from("posts").insert([
      {
        text,
        images,
        user_id,
      },
    ]);

    if (error) throw error;
  } catch (err: unknown) {
    const message =
      err instanceof Error
        ? err.message
        : "Unexpected error while creating your posts, try again.";
    throw new Error(message);
  }
};

export { createPost, deleteUserPost, getAllPosts, getUsersPosts };
