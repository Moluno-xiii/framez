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
  about_me?: string;
  email?: string;
};

type UserProfileType = {
  id: string;
  user_id: string;
  display_name: string;
  profile_pic: string;
  created_at: string;
  about_me: string;
  email: string;
};

type CreateCommentType = {
  post_id: string;
  comment: string;
  user_id: string;
};

type PostComment = {
  comment: string;
  created_at: string;
  id: string;
  likes: number | null;
  post_id: string;
  user_id: string;
  authorInfo: UserProfileType;
};
type AllPostsType = PostType & { authorInfo: UserProfileType };

type IconNames =
  | "fingerprint"
  | "signup"
  | "settings"
  | "posts"
  | "add-circle"
  | "arrow-back";

export {
  PostType,
  IconNames,
  CreatePost,
  UserProfileType,
  CreateProfile,
  AllPostsType,
  CreateCommentType,
  PostComment,
};
