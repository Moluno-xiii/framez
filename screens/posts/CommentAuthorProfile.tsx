import { RouteProp, useRoute } from "@react-navigation/native";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Image,
  ScrollView,
} from "react-native";
import { PostsNavigatorParams } from "../../navigation/PostsNavigator";
import useGetUser from "../../tanstack/queries/useGetUser";
import LoadingScreen from "../../components/LoadingScreen";
import ErrorMessage from "../../components/ErrorMessage";
import colours from "../../colours";
import useSetPageTitle from "../../hooks/useSetPageTitle";

type CommentAuthorProfileRouteProp = RouteProp<
  PostsNavigatorParams,
  "CommentAuthorProfile"
>;

const CommentAuthorProfile = () => {
  const { params } = useRoute<CommentAuthorProfileRouteProp>();
  const { isPending, error, refetch, data } = useGetUser(params.user_id);
  useSetPageTitle("User details");
  if (isPending) return <LoadingScreen />;
  if (error) return <ErrorMessage refetch={refetch} message={error.message} />;

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={{
        paddingBottom: 30,
        maxWidth: 700,
        alignSelf: "center",
        width: "100%",
      }}
    >
      <View style={styles.form}>
        <View style={styles.formItem}>
          <Text style={styles.title}>Email</Text>
          <TextInput
            style={styles.notEditable}
            editable={false}
            value={data.email}
          />
        </View>
        <View style={styles.formItem}>
          <Text style={styles.title}>Display name</Text>
          <TextInput
            style={styles.notEditable}
            value={data.display_name ?? "Not yet set"}
            editable={false}
          />
        </View>
        <View style={styles.formItem}>
          <Text style={styles.title}>About Me</Text>
          <TextInput
            style={styles.notEditable}
            value={data.about_me ?? "Not yet set"}
            placeholder="Not set yet"
            editable={false}
          />
        </View>
        <View style={styles.formItem}>
          <Text style={styles.title}>Profile Picture</Text>
          {data?.profile_pic ? (
            <Image source={{ uri: data.profile_pic }} style={styles.image} />
          ) : (
            <Text style={styles.errorMessage}>No image yet</Text>
          )}
        </View>
      </View>
    </ScrollView>
  );
};

export default CommentAuthorProfile;

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colours.darker, padding: 20, gap: 20 },
  text: { fontFamily: "geist", fontSize: 14, color: colours.light },
  title: { fontFamily: "geist", fontSize: 18, color: colours.light },
  form: {
    gap: 20,
    flexDirection: "column",
    display: "flex",
    flex: 1,
  },
  formItem: {
    gap: 5,
    flexDirection: "column",
    display: "flex",
  },
  notEditable: {
    paddingHorizontal: 20,
    paddingVertical: 3,
    borderRadius: 8,
    backgroundColor: colours.dark,
    height: 40,
    color: colours.light,
    fontFamily: "geist",
    opacity: 0.6,
  },
  errorMessage: { color: "red", fontFamily: "geist" },
  image: {
    height: 200,
    width: 200,
    alignSelf: "center",
    borderWidth: 2,
    borderColor: colours.link,
    borderRadius: 8,
  },
});
