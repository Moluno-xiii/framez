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

type CreateProfile = {
  user_id: string;
  display_name?: string;
  profile_pic?: string;
};

type UserProfileType = {
  id: string;
  user_id: string;
  display_name: string;
  profile_pic: string;
  created_at: string;
};

type AllPostsType = PostType & { authorInfo: UserProfileType };

type IconNames = "fingerprint" | "signup" | "settings" | "posts" | "add-circle";

export {
  PostType,
  IconNames,
  CreatePost,
  UserProfileType,
  CreateProfile,
  AllPostsType,
};
