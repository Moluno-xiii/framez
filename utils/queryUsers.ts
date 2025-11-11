import supabase from "./supabase";

const getUserSession = async () => {
  try {
    const { data, error } = await supabase.auth.getSession();

    if (error) throw error;
    return data;
  } catch (err: unknown) {
    const message =
      err instanceof Error
        ? err.message
        : "Unexpeted error, reload your app and try again.";
    throw new Error(message);
  }
};

export { getUserSession };
