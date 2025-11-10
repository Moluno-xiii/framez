import { useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import colours from "../../colours";
import CustomButton from "../../components/CustomButton";
import ImagePicker from "../../components/ImagePicker";
import useAuth from "../../contexts/AuthContext";
import useImagePicker from "../../hooks/useImagePicker";
import useSetPageTitle from "../../hooks/useSetPageTitle";

const SettingsScreen = () => {
  const { user, logout, isLoading, updateProfile } = useAuth();
  const { imageUrl, pickImage, imageBlob } = useImagePicker();
  const [displayName, setDisplayName] = useState(
    user?.user_metadata.display_name
  );
  useSetPageTitle("Settings");

  const isSaveChangesButtonDisabled =
    displayName === user?.user_metadata.display_name &&
    imageUrl === user?.user_metadata.imageUrl;
  return (
    <View style={styles.screen}>
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
          <Text style={styles.title}>Profile Picture</Text>
          <ImagePicker imageUrl={imageUrl} pickImage={pickImage} />
        </View>
        <CustomButton
          title="Save Changes"
          disabled={isSaveChangesButtonDisabled}
          pending={isLoading === "updateProfile"}
          pendingMessage="Updating your profile..."
          onClick={() => updateProfile(displayName, imageBlob, imageUrl)}
        />
      </View>
      <CustomButton
        title="Logout"
        colour="red"
        onClick={logout}
        pending={isLoading === "logout"}
        pendingMessage="Logging out..."
      />
    </View>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colours.darker, padding: 20, gap: 20 },
  text: { fontFamily: "geist", fontSize: 14, color: colours.light },
  title: { fontFamily: "geist", fontSize: 18, color: colours.light },
  form: {
    gap: 20,
    flexDirection: "column",
    display: "flex",
    flex: 1,
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
