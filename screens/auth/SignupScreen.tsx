import { useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import colours from "../../colours";
import CustomButton from "../../components/CustomButton";
import useAuth from "../../contexts/AuthContext";

const SignupScreen = () => {
  const [email, setEmeil] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const { signup, isLoading } = useAuth();

  return (
    <View style={styles.screen}>
      <Text style={styles.title}>SignUp</Text>
      <View style={styles.form}>
        <TextInput
          style={styles.textInput}
          textContentType="emailAddress"
          placeholder="email e.g : jack-inghof@gmail.com"
          placeholderTextColor={"#a1a1a1"}
          onChangeText={setEmeil}
          value={email}
        />
        <TextInput
          style={styles.textInput}
          textContentType="nickname"
          placeholder="display name eg :jack the ripper"
          placeholderTextColor={"#a1a1a1"}
          onChangeText={setDisplayName}
          value={displayName}
        />
        <TextInput
          style={styles.textInput}
          textContentType="password"
          placeholder="mySuPerSECRetpassWord132"
          placeholderTextColor={"#a1a1a1"}
          onChangeText={setPassword}
          value={password}
          secureTextEntry={true}
        />
        <TextInput
          style={styles.textInput}
          textContentType="password"
          placeholder="confirm your password"
          placeholderTextColor={"#a1a1a1"}
          onChangeText={setConfirmPassword}
          value={confirmPassword}
          secureTextEntry={true}
        />
      </View>
      <CustomButton
        title="Signup"
        pending={isLoading === "signup"}
        onClick={() => signup(email, password, confirmPassword, displayName)}
        pendingMessage="Signing up..."
      />
    </View>
  );
};

export default SignupScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colours.darker,
    paddingHorizontal: 10,
    flexDirection: "column",
    justifyContent: "center",
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
  smallText: {
    color: colours.link,
    fontSize: 10,
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: 20,
    marginTop: 20,
    marginBottom: 40,
  },
  title: {
    color: colours.light,
    fontSize: 20,
    textAlign: "center",
    fontFamily: "signature",
  },
});
