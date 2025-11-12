import { Alert, Image, StyleSheet, Text, View } from "react-native";
import colours from "../colours";
import CustomButton from "./CustomButton";
import { Dispatch, SetStateAction, useState } from "react";
import * as ImagePicker from "expo-image-picker";

const PostImagePicker = ({
  setImageDetails,
  imageDetails,
}: {
  setImageDetails: Dispatch<
    SetStateAction<{ url: string; imageBlob: ArrayBuffer } | undefined>
  >;
  imageDetails: { url: string; imageBlob: ArrayBuffer } | undefined;
}) => {
  const urlToBlob = async (uri: string) => {
    const response = await fetch(uri);
    const blob = await response.arrayBuffer();
    return blob;
  };

  const pickImage = async () => {
    let imageResult = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!imageResult.canceled) {
      const image = imageResult.assets[0];

      if (image.fileSize && image.fileSize > 2000000) {
        Alert.alert("Image size exceeded, Max image size = 2MB");
        return;
      }
      const blob = await urlToBlob(image.uri);
      setImageDetails({ imageBlob: blob, url: image.uri });
      return image;
    }
  };

  return (
    <View style={styles.screen}>
      {!imageDetails?.url ? (
        <Text style={styles.text}>No selected image yet</Text>
      ) : (
        <Image
          source={{ uri: imageDetails?.url }}
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
        title={imageDetails?.url ? "Change image" : "Pick an image"}
        onClick={pickImage}
      />
    </View>
  );
};

export default PostImagePicker;

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
