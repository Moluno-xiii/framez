import { Image, StyleSheet, Text, View } from "react-native";
import colours from "../colours";
import CustomButton from "./CustomButton";

const ImagePicker = ({
  pickImage,
  imageUrl,
}: {
  pickImage: () => void;
  imageUrl: string;
}) => {
  return (
    <View style={styles.screen}>
      {!imageUrl ? (
        <Text style={styles.text}>No selected image yet</Text>
      ) : (
        <Image
          source={{ uri: imageUrl }}
          style={{
            borderRadius: 8,
            width: 300,
            height: 300,
            borderWidth: 2,
            borderColor: colours.link,
          }}
        />
      )}
      <CustomButton
        title={imageUrl ? "Change image" : "Pick an image"}
        onClick={pickImage}
      />
    </View>
  );
};

export default ImagePicker;

const styles = StyleSheet.create({
  screen: {
    marginBottom: 20,
    gap: 10,
    paddingVertical: 10,
    alignSelf: "center",
  },
  text: {
    fontFamily: "signature",
    color: "red",
    fontSize: 12,
    textAlign: "center",
    textTransform: "uppercase",
  },
});
