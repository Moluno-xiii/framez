import { useNavigation } from "@react-navigation/native";
import { useLayoutEffect, useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import colours from "../../colours";
import useAuth from "../../contexts/AuthContext";
import CustomButton from "../../components/CustomButton";

const SettingsScreen = () => {
  const { user, logout, isLoading } = useAuth();
  const navigator = useNavigation();
  const [displayName, setDisplayName] = useState(
    user?.user_metadata.display_name
  );

  useLayoutEffect(() => {
    navigator.setOptions({
      headerTitle: "Settings",
      headerTitleStyle: { fontFamily: "signature", fontSize: 20 },
    });
  });

  return (
    <View style={styles.screen}>
      <Text style={styles.title}>Your Profile</Text>
      <View style={styles.form}>
        <View style={styles.formItem}>
          <Text style={styles.text}>Email</Text>
          <TextInput
            style={styles.notEditable}
            editable={false}
            value={user?.email ?? "not set"}
          />
        </View>
        <View style={styles.formItem}>
          <Text style={styles.text}>Display name</Text>
          <TextInput
            style={styles.textInput}
            onChangeText={setDisplayName}
            value={displayName}
          />
        </View>
        <View style={styles.formItem}>
          <Text style={styles.text}>Display Image</Text>
          <TextInput
            style={styles.textInput}
            onChangeText={setDisplayName}
            value={displayName}
          />
        </View>
        <CustomButton title="Save Changes" colour="" />
      </View>
      <CustomButton
        title="Logout"
        colour="red"
        onClick={logout}
        pending={isLoading}
        pendingMessage="Logging out..."
      />
    </View>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colours.darker, padding: 20, gap: 20 },
  text: { fontFamily: "geist", fontSize: 14, color: colours.light },
  title: { fontFamily: "geist", fontSize: 20, color: colours.light },
  form: {
    gap: 10,
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
    color: colours.placeholderText,
    fontFamily: "geist",
  },
});
