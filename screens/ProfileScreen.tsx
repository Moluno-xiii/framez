import { useState } from "react";
import { StyleSheet, View } from "react-native";
import colours from "../colours";
import ProfileScreenNav from "../components/ProfileScreenNav";
import UserPosts from "../components/UserPosts";
import UserProfile from "../components/UserProfile";
import useSetPageTitle from "../hooks/useSetPageTitle";

const ProfileScreen = () => {
  useSetPageTitle("Profile");
  const [activeTab, setActiveTab] = useState<"profile" | "posts">("posts");

  return (
    <View style={styles.screen}>
      <ProfileScreenNav activeTab={activeTab} setActiveTab={setActiveTab} />
      {activeTab === "posts" && <UserPosts />}
      {activeTab === "profile" && <UserProfile />}
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colours.darker, padding: 20, gap: 20 },
  text: { fontFamily: "geist", fontSize: 14, color: colours.light },
  title: { fontFamily: "geist", fontSize: 20, color: colours.light },
  nav: {
    backgroundColor: colours.dark,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
    gap: 5,
    flexDirection: "row",
    justifyContent: "space-around",
  },
  navItem: {
    color: colours.lighter,
    paddingVertical: 10,
    flex: 1,
    borderRadius: 8,
  },
  activeStyle: {
    backgroundColor: colours.darker,
    fontFamily: "geist-bold",
    // fontSize: 14,
  },
  navText: {
    fontSize: 12,
    fontFamily: "geist",
    textTransform: "capitalize",
    color: colours.lighter,
    textAlign: "center",
  },
});
