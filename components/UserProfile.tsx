import { useNavigation } from "@react-navigation/native";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import colours from "../colours";
import useAuth from "../contexts/AuthContext";
import { ProtectedNavigatorNavigationParam } from "../navigation/ProtectedNavigator";
import CustomButton from "./CustomButton";
import useGetUser from "../tanstack/queries/useGetUser";
import LoadingScreen from "./LoadingScreen";

const UserProfile = () => {
  const { user } = useAuth();
  const { data, isPending } = useGetUser(user?.id!);
  const navigator = useNavigation<ProtectedNavigatorNavigationParam>();

  if (isPending) return <LoadingScreen />;

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={{ paddingBottom: 30 }}
    >
      <View style={styles.form}>
        <View style={styles.formItem}>
          <Text style={styles.title}>Email</Text>
          <TextInput
            style={styles.notEditable}
            editable={false}
            value={user?.email ?? "not set"}
          />
        </View>
        <View style={styles.formItem}>
          <Text style={styles.title}>Display name</Text>
          <TextInput
            style={styles.notEditable}
            value={data?.display_name}
            editable={false}
          />
        </View>
        <View style={styles.formItem}>
          <Text style={styles.title}>About Me</Text>
          <TextInput
            style={styles.notEditable}
            value={data?.about_me}
            placeholder="Not set yet"
            editable={false}
          />
        </View>
        <View style={styles.formItem}>
          <Text style={styles.title}>Profile Picture</Text>
          {data?.profile_pic ? (
            <Image source={{ uri: data.profile_pic }} style={styles.image} />
          ) : (
            <Text style={styles.errorMessage}>No image yet</Text>
          )}
        </View>
        {!data?.profile_pic && (
          <CustomButton
            title="Add profle picture"
            onClick={() => navigator.navigate("Settings")}
          />
        )}
      </View>
      <CustomButton
        title="Update profile"
        onClick={() => navigator.navigate("Settings")}
      />
    </ScrollView>
  );
};

export default UserProfile;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colours.darker,
    padding: 20,
    gap: 20,
    maxWidth: 700,
    alignSelf: "center",
    width: "100%",
  },
  title: { fontFamily: "geist", fontSize: 18, color: colours.light },
  form: {
    gap: 20,
    flexDirection: "column",
    display: "flex",
    flex: 1,
    marginBottom: 20,
  },
  formItem: {
    gap: 5,
    flexDirection: "column",
    display: "flex",
  },
  notEditable: {
    paddingHorizontal: 20,
    paddingVertical: 3,
    borderRadius: 8,
    backgroundColor: colours.dark,
    height: 40,
    color: colours.light,
    fontFamily: "geist",
    opacity: 0.6,
  },
  errorMessage: { color: "red", fontFamily: "geist" },
  image: {
    height: 200,
    width: 200,
    alignSelf: "center",
    borderWidth: 2,
    borderColor: colours.link,
    borderRadius: 8,
  },
});
