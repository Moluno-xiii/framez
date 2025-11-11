import { ActivityIndicator, StyleSheet, View } from "react-native";
import colours from "../colours";

const LoadingScreen = () => {
  return (
    <View style={styles.emptyStateScreen}>
      <ActivityIndicator />;
    </View>
  );
};

export default LoadingScreen;

const styles = StyleSheet.create({
  emptyStateScreen: {
    flex: 1,
    backgroundColor: colours.darker,
    justifyContent: "center",
    alignItems: "center",
    gap: 20,
  },
});
