import {
  Image,
  ImageSourcePropType,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

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
          source={{ uri }}
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
