import {
  Image,
  ImageSourcePropType,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { defaultProfilePicture } from "../constants";

const Icon = ({
  imgSrc,
  onClick,
  uri,
  isImage = false,
}: {
  imgSrc?: ImageSourcePropType;
  onClick?: () => void;
  uri?: string;
  isImage?: boolean;
}) => {
  return (
    <TouchableOpacity style={styles.screen} onPress={onClick}>
      {imgSrc ? (
        <Image alt="icon image" source={imgSrc} height={24} width={24} />
      ) : (
        <Image
          style={isImage && styles.imageStyle}
          alt="icon image"
          source={{ uri: uri ? uri : defaultProfilePicture }}
          height={24}
          width={24}
        />
      )}
    </TouchableOpacity>
  );
};

export default Icon;

const styles = StyleSheet.create({
  screen: { flex: 1 },
  imageStyle: {
    borderRadius: 100,
  },
});
