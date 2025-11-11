import { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { Alert } from "react-native";
import useGetUser from "../tanstack/queries/useGetUser";
import useAuth from "../contexts/AuthContext";

const useImagePicker = () => {
  const { user } = useAuth();
  const { data } = useGetUser(user?.id!);
  const [imageBlob, setImageBlob] = useState<ArrayBuffer>();
  const [imageUrl, setImageUrl] = useState(data?.profile_pic);

  const urlToBlob = async (uri: string) => {
    const response = await fetch(uri);
    const blob = await response.arrayBuffer();
    setImageBlob(blob);
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
      await urlToBlob(image.uri);
      setImageUrl(image.uri);
      return image;
    }
  };

  return {
    setImageUrl,
    imageUrl,
    pickImage,
    imageBlob,
  };
};

export default useImagePicker;
