import { useNavigation } from "@react-navigation/native";
import { useLayoutEffect } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { PostsNavigationProp } from "../../navigation/PostsNavigator";
import colours from "../../colours";

const AddNewPostScreen = () => {
  const navigator = useNavigation<PostsNavigationProp>();

  useLayoutEffect(() => {
    navigator.setOptions({
      headerTitle: "Create new post",
      headerTitleStyle: { fontFamily: "signature", fontSize: 18 },
    });
  });

  return (
    <View style={styles.screen}>
      <Text style={styles.title}>Add new Post</Text>
      <View style={styles.form}>
        <TextInput
          style={styles.textarea}
          multiline={true}
          placeholder="Enter your text here..."
          textAlignVertical="top"
          placeholderTextColor={colours.placeholderText}
        />
      </View>
    </View>
  );
};

export default AddNewPostScreen;

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colours.darker, padding: 20, gap: 20 },
  title: { fontFamily: "geist", fontSize: 20, color: colours.light },
  textarea: {
    height: 100,
    borderColor: colours.dark,
    borderWidth: 1,
    padding: 10,
    color: colours.lighter,
    borderRadius: 8,
  },
  form: {
    gap: 20,
    flexDirection: "column",
  },
});
