import { useNavigation } from "@react-navigation/native";
import { Image, StyleSheet, Text, TextInput, View } from "react-native";
import colours from "../colours";
import useAuth from "../contexts/AuthContext";
import useImagePicker from "../hooks/useImagePicker";
import { ProtectedNavigatorNavigationParam } from "../navigation/ProtectedNavigator";
import CustomButton from "./CustomButton";

const UserProfile = () => {
  const { user } = useAuth();
  const { imageUrl } = useImagePicker();
  const navigator = useNavigation<ProtectedNavigatorNavigationParam>();
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
            style={styles.notEditable}
            value={user?.user_metadata.display_name}
          />
        </View>
        <View style={styles.formItem}>
          <Text style={styles.title}>Profile Picture</Text>
          {imageUrl ? (
            <Image
              source={{ uri: imageUrl }}
              style={{ height: 200, width: 200, alignSelf: "center" }}
            />
          ) : (
            <Text style={styles.errorMessage}>No image yet</Text>
          )}
        </View>
        <CustomButton
          title="Add profle picture"
          onClick={() => navigator.navigate("Settings")}
        />
      </View>
      <CustomButton
        title="Update profile"
        onClick={() => navigator.navigate("Settings")}
      />
    </View>
  );
};

export default UserProfile;

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colours.darker, padding: 20, gap: 20 },
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
});
