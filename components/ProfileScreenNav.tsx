import { Dispatch, SetStateAction } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import colours from "../colours";

const ProfileScreenNav = ({
  activeTab,
  setActiveTab,
}: {
  activeTab: string;
  setActiveTab: Dispatch<SetStateAction<"profile" | "posts">>;
}) => {
  return (
    <View style={styles.nav}>
      <TouchableOpacity
        style={[styles.navItem, activeTab === "posts" && styles.activeStyle]}
        onPress={() => setActiveTab("posts")}
        activeOpacity={0.6}
      >
        <Text style={styles.navText}>Posts</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.navItem, activeTab === "profile" && styles.activeStyle]}
        onPress={() => setActiveTab("profile")}
      >
        <Text style={styles.navText}>Profile</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ProfileScreenNav;

const styles = StyleSheet.create({
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
