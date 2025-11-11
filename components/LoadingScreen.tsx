import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import colours from "../colours";

const LoadingScreen = () => {
  return (
    <View style={styles.emptyStateScreen}>
      <Text>
        <ActivityIndicator />;
      </Text>
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
