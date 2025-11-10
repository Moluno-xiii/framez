import { StyleSheet, View, Text } from "react-native";
import colours from "../colours";

const AuthLoadingScreen = () => {
  return (
    <View style={styles.screen}>
      <Text style={styles.text}>Getting Auth info...</Text>
    </View>
  );
};

export default AuthLoadingScreen;

const styles = StyleSheet.create({
  screen: {
    backgroundColor: colours.darker,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: colours.lighter,
    fontSize: 20,
    fontFamily: "signature",
  },
});
