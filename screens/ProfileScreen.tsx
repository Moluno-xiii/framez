import { StyleSheet, View, Text } from "react-native";

const ProfileScreen = () => {
  return (
    <View style={styles.screen}>
      <Text style={styles.text}>ProfileScreen</Text>
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  screen: { flex: 1 },
  text: { fontFamily: "geist", fontSize: 18 },
});
