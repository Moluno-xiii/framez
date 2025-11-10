import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { emailRegex } from "../constants";
import supabase from "../utils/supabase";
import { useNavigation } from "@react-navigation/native";
import { RootNavigatorParam } from "../navigation/RootNavigator";
import { Alert } from "react-native";
import { Session, User } from "@supabase/supabase-js";

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
  isLoading: boolean;
};

const AuthContext = createContext<AuthContextTypes | undefined>(undefined);

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null | undefined>(undefined);
  const [session, setSession] = useState<Session | undefined | null>(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation<RootNavigatorParam>();

  useEffect(() => {
    async function getUserSession() {
      try {
        setIsLoading(true);
        const { data, error } = await supabase.auth.getSession();

        if (error) throw error;
        setSession(data.session);
        setUser(data.session?.user);
      } catch (err: unknown) {
        const message =
          err instanceof Error
            ? err.message
            : "Unexpeted error, reload your app and try again.";
        console.error("Error getting session");
        Alert.alert(message);
      } finally {
        setIsLoading(false);
      }
    }

    getUserSession();
  }, []);

  const login: AuthContextTypes["login"] = async (email, password) => {
    try {
      setIsLoading(true);
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
      setIsLoading(false);
    }
  };

  const signup: AuthContextTypes["signup"] = async (
    email,
    password,
    confirmPassword,
    name
  ) => {
    try {
      setIsLoading(true);
      if (!emailRegex.test(email)) {
        throw new Error("Invalid email");
      }

      if (password !== confirmPassword) {
        throw new Error("Both pasword fields do not match.");
      }
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            display_name: name,
          },
        },
      });

      if (error) throw error;

      Alert.alert("Signup successful");
      navigation.navigate("Login");
      if (error) throw error;
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Unexpected error occured";
      Alert.alert(message);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      setIsLoading(true);

      const { error } = await supabase.auth.signOut();

      if (error) throw error;

      Alert.alert("Signout successful");
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
      setIsLoading(false);
    }
  };

  const authReturnValues = { user, login, signup, logout, isLoading, session };
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
