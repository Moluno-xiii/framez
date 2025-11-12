import { useState } from "react";
import { ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import colours from "../../colours";
import CustomButton from "../../components/CustomButton";
import ImagePicker from "../../components/ImagePicker";
import useAuth from "../../contexts/AuthContext";
import useImagePicker from "../../hooks/useImagePicker";
import useSetPageTitle from "../../hooks/useSetPageTitle";
import useUpdateProfile from "../../tanstack/mutations/useUpdateProfile";
import useGetUser from "../../tanstack/queries/useGetUser";
import LoadingScreen from "../../components/LoadingScreen";

const SettingsScreen = () => {
  const { user, logout, isLoading } = useAuth();
  const { imageUrl, pickImage, imageBlob } = useImagePicker();
  const { data, isPending: loadingUserProfile } = useGetUser(user?.id!);
  const [displayName, setDisplayName] = useState(data?.display_name);
  const [aboutMe, setAboutMe] = useState(data?.about_me ?? "");
  useSetPageTitle("Settings");
  const { isPending, mutate } = useUpdateProfile();

  if (loadingUserProfile) return <LoadingScreen />;

  const isSaveChangesButtonDisabled =
    displayName === data?.display_name &&
    imageUrl === data?.profile_pic &&
    aboutMe === data?.about_me;
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
            style={styles.textInput}
            onChangeText={setDisplayName}
            value={displayName}
          />
        </View>
        <View style={styles.formItem}>
          <Text style={styles.title}>About Me</Text>
          <TextInput
            style={styles.textInput}
            onChangeText={setAboutMe}
            placeholder="Not yet set"
            value={aboutMe}
          />
        </View>
        <View style={styles.formItem}>
          <Text style={styles.title}>Profile Picture</Text>
          <ImagePicker imageUrl={imageUrl!} pickImage={pickImage} />
        </View>
        <CustomButton
          title="Save Changes"
          disabled={isSaveChangesButtonDisabled}
          pending={isPending}
          pendingMessage="Updating your profile..."
          onClick={() =>
            mutate({
              user_id: user?.id!,
              imageBlob,
              imageUrl,
              display_name: displayName,
              about_me: aboutMe,
            })
          }
        />
      </View>
      <CustomButton
        title="Logout"
        colour="red"
        onClick={logout}
        pending={isLoading === "logout"}
        pendingMessage="Logging out..."
      />
    </ScrollView>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colours.darker,
    paddingTop: 20,
    paddingHorizontal: 20,
    gap: 20,
    paddingBottom: 30,
  },
  text: { fontFamily: "geist", fontSize: 14, color: colours.light },
  title: { fontFamily: "geist", fontSize: 18, color: colours.light },
  form: {
    gap: 20,
    flexDirection: "column",
    display: "flex",
    flex: 1,
    marginBottom: 40,
    maxWidth: 700,
    alignSelf: "center",
    width: "100%",
  },
  formItem: {
    gap: 5,
    flexDirection: "column",
    display: "flex",
  },
  textInput: {
    paddingHorizontal: 20,
    paddingVertical: 3,
    borderRadius: 8,
    backgroundColor: colours.dark,
    height: 40,
    color: colours.light,
    fontFamily: "geist",
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
});
