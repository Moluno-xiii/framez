import { StyleSheet, View, Text } from "react-native";
import colours from "../colours";
import CustomButton from "./CustomButton";

const ErrorMessage = ({
  message,
  refetch,
}: {
  message: string | undefined | null;
  refetch: () => void;
}) => {
  return (
    <View style={styles.screen}>
      <Text style={styles.message}>
        {message ?? "An unexpected error occured, please try again."}
      </Text>
      <CustomButton title="Refetch" onClick={refetch} />
    </View>
  );
};

export default ErrorMessage;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colours.darker,
    gap: 20,
  },
  message: {
    color: "red",
    fontSize: 20,
    fontFamily: "geist-bold",
    textAlign: "center",
  },
});
