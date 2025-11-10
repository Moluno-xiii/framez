import { useNavigation } from "@react-navigation/native";
import { useLayoutEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import CustomButton from "../../components/CustomButton";
import Icon from "../../components/Icon";
import useAuth from "../../contexts/AuthContext";
import iconImages from "../../icoin";
import { PostsNavigationProp } from "../../navigation/PostsNavigator";
import colours from "../../colours";

const PostsFeedScreen = () => {
  const { logout, isLoading } = useAuth();
  const navigator = useNavigation<PostsNavigationProp>();

  useLayoutEffect(() => {
    navigator.setOptions({
      headerTitle: "Feed",
      headerTitleStyle: { fontFamily: "signature", fontSize: 18 },
      headerRight: () => (
        <View>
          <Icon
            imgSrc={iconImages["add-circle"]}
            onClick={() => navigator.navigate("New")}
          />
        </View>
      ),
    });
  });
  return (
    <View style={styles.screen}>
      <CustomButton
        title="Logout"
        onClick={logout}
        pending={isLoading === "logout"}
      />
      <Text style={styles.text}>PostsFeedScreen</Text>
    </View>
  );
};

export default PostsFeedScreen;

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colours.darker, padding: 20, gap: 20 },
  text: { color: colours.light, fontFamily: "geist" },
});
