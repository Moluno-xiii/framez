import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import colours from "../colours";

type CustomButtonProps = {
  title: string;
  pendingMessage?: string;
  onClick?: () => void;
  pending?: boolean;
  disabled?: boolean;
  colour?: string;
};

const CustomButton = ({
  title,
  onClick,
  pending,
  pendingMessage = "Loading...",
  colour,
  disabled,
}: CustomButtonProps) => {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        (pending || disabled) && styles.disabled,
        colour && { backgroundColor: colour },
      ]}
      onPress={onClick}
      disabled={pending || disabled}
      activeOpacity={0.7}
    >
      <Text style={styles.text}>{pending ? pendingMessage : title}</Text>
    </TouchableOpacity>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  button: {
    backgroundColor: colours.link,
    borderRadius: 8,
    paddingVertical: 5,
    paddingHorizontal: 20,
    textAlign: "center",
    marginHorizontal: "auto",
    width: 300,
  },
  disabled: {
    opacity: 0.6,
  },
  text: {
    color: colours.light,
    fontSize: 18,
    fontFamily: "geist-bold",
    textAlign: "center",
  },
});
