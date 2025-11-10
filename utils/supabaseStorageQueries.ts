import supabase from "./supabase";

const uploadImage = async (file: File, url: string) => {
  const { data, error } = await supabase.storage
    .from("user_avatars")
    .upload(url, file, {
      contentType: "image/jpeg",
    });

  if (error) {
    console.error("file upload error", error.message);
  }
};

const updateImage = async (url: string, file: ArrayBuffer) => {
  const { data, error } = await supabase.storage
    .from("user_avatars")
    .upload(url, file, {
      upsert: true,
      contentType: "image/jpeg",
    });

  if (error) {
    console.error("file upload error", error.message);
  }

  return { data, error };
};

export { uploadImage, updateImage };
