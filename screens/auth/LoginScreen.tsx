import { useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import colours from "../../colours";
import CustomButton from "../../components/CustomButton";
import useAuth from "../../contexts/AuthContext";

const LoginScreen = () => {
  const [email, setEmeil] = useState("");
  const [password, setPassword] = useState("");
  const { login, isLoading } = useAuth();

  return (
    <View style={styles.screen}>
      <Text style={styles.title}>Login</Text>
      <View style={styles.form}>
        <TextInput
          style={styles.textInput}
          textContentType="emailAddress"
          placeholder="emaiil e.g : jack-inghof@gmail.com"
          placeholderTextColor={colours.placeholderText}
          onChangeText={setEmeil}
          value={email}
        />
        <TextInput
          style={styles.textInput}
          textContentType="password"
          placeholder="mySuPerSECRetpassWord132"
          placeholderTextColor={colours.placeholderText}
          onChangeText={setPassword}
          value={password}
          secureTextEntry={true}
        />
        <CustomButton
          title="Login"
          pending={isLoading}
          pendingMessage="Logging in..."
          onClick={() => login(email, password)}
        />
      </View>
    </View>
  );
};

export default LoginScreen;

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
    marginVertical: 20,
  },
  title: {
    color: colours.light,
    fontSize: 20,
    textAlign: "center",
    fontFamily: "signature",
  },
});
