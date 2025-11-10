type PostType = {
  created_at: string;
  user_id: string;
  id: string;
  text: string;
  images: string[] | null;
  likes: number | null;
};

type CreatePost = {
  text: string;
  images?: string[];
  user_id: string;
};

type IconNames = "fingerprint" | "signup" | "settings" | "posts" | "add-circle";

export { PostType, IconNames, CreatePost };
