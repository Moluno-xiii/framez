import { CreateCommentType } from "../types";
import { getUserProfile } from "./queryUserProfile";
import supabase from "./supabase";

const getPostComments = async <T,>(post_id: string): Promise<T> => {
  try {
    const { data: comments, error } = await supabase
      .from("comments")
      .select("*")
      .eq("post_id", post_id)
      .order("created_at", { ascending: false });

    if (error) throw error;
    const mergedData = await Promise.all(
      comments.map(async (comment) => ({
        ...comment,
        authorInfo: await getUserProfile(comment.user_id),
      }))
    );
    return mergedData as T;
  } catch (err) {
    const message =
      err instanceof Error
        ? err.message
        : "Unexpected error while getting post comments, try again.";
    throw new Error(message);
  }
};

const addPostComment = async ({
  post_id,
  comment,
  user_id,
}: CreateCommentType) => {
  try {
    const { error } = await supabase.from("comments").insert([
      {
        comment,
        post_id,
        user_id,
      },
    ]);
    if (error) throw error;
  } catch (err) {
    const message =
      err instanceof Error
        ? err.message
        : "Unexpected error while creating comments, try again.";
    throw new Error(message);
  }
};

const deleteComment = async (user_id: string, comment_id: string) => {
  try {
    const { error } = await supabase
      .from("comments")
      .delete()
      .eq("id", user_id)
      .eq("id", comment_id);
    if (error) throw error;
  } catch (err) {
    const message =
      err instanceof Error
        ? err.message
        : "Unexpected error while deleting comment, try again.";
    throw new Error(message);
  }
};

export { addPostComment, deleteComment, getPostComments };
