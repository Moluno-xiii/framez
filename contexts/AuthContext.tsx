import { useNavigation } from "@react-navigation/native";
import { Session, User } from "@supabase/supabase-js";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { Alert } from "react-native";
import { emailRegex } from "../constants";
import { RootNavigatorParam } from "../navigation/RootNavigator";
import { createProfile } from "../utils/queryUserProfile";
import supabase from "../utils/supabase";

type AuthContextTypes = {
  user: User | null | undefined;
  session: Session | undefined | null;
  login: (email: string, password: string) => void;
  signup: (
    email: string,
    password: string,
    confirmPassword: string,
    name: string
  ) => void;
  logout: () => void;
  isLoading: AuthLoadingStates;
};

type AuthLoadingStates =
  | "login"
  | "signup"
  | "updateProfile"
  | "onAppStart"
  | "notLoading"
  | "logout";

const AuthContext = createContext<AuthContextTypes | undefined>(undefined);

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null | undefined>(undefined);
  const [session, setSession] = useState<Session | undefined | null>(undefined);
  const [isLoading, setIsLoading] = useState<AuthLoadingStates>("notLoading");
  const navigation = useNavigation<RootNavigatorParam>();

  useEffect(() => {
    async function getUserSession() {
      try {
        setIsLoading("onAppStart");
        const { data, error } = await supabase.auth.getSession();

        if (error) throw error;
        setSession(data.session);
        setUser(data.session?.user);
      } catch (err: unknown) {
        const message =
          err instanceof Error
            ? err.message
            : "Unexpeted error, reload your app and try again.";
        Alert.alert(message);
      } finally {
        setIsLoading("notLoading");
      }
    }

    getUserSession();
  }, []);

  const login: AuthContextTypes["login"] = async (email, password) => {
    try {
      setIsLoading("login");
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;
      Alert.alert("Login successful");
      setSession(data.session);
      setUser(data.user);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Unexpected error occured";
      Alert.alert(message);
    } finally {
      setIsLoading("notLoading");
    }
  };

  const signup: AuthContextTypes["signup"] = async (
    email,
    password,
    confirmPassword,
    display_name
  ) => {
    try {
      setIsLoading("signup");
      if (!emailRegex.test(email)) {
        throw new Error("Invalid email");
      }

      if (password !== confirmPassword) {
        throw new Error("Both pasword fields do not match.");
      }
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) throw error;
      await createProfile({ user_id: data.user?.id!, display_name });

      Alert.alert("Signup successful");
      navigation.navigate("Login");
      if (error) throw error;
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Unexpected error occured";
      Alert.alert(message);
    } finally {
      setIsLoading("notLoading");
    }
  };

  const logout = async () => {
    try {
      setIsLoading("logout");

      const { error } = await supabase.auth.signOut();

      if (error) throw error;

      Alert.alert("Logout successful");
      setSession(null);
      setUser(null);
      if (error) throw error;
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : "Unexpected error occured, reload the page and try again";
      Alert.alert(message);
    } finally {
      setIsLoading("notLoading");
    }
  };

  const authReturnValues = {
    user,
    login,
    signup,
    logout,
    isLoading,
    session,
  };
  return (
    <AuthContext.Provider value={authReturnValues}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) throw new Error("AuthContext was used outside its scope.");
  return context;
};

export { AuthProvider };
export default useAuth;
