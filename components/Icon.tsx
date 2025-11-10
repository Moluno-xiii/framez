import {
  Image,
  ImageSourcePropType,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

const Icon = ({
  imgSrc,
  onClick,
}: {
  imgSrc: ImageSourcePropType;
  onClick?: () => void;
}) => {
  return (
    <TouchableOpacity style={styles.screen} onPress={onClick}>
      {/* <Image alt="icon image" source={imgSrc} style={styles.image} /> */}
      <Image alt="icon image" source={imgSrc} height={24} width={24} />
    </TouchableOpacity>
  );
};

export default Icon;

const styles = StyleSheet.create({
  screen: { flex: 1 },
});

// const styles = StyleSheet.create({
//   container: {
//     padding: 6,
//     alignItems: "center",
//     justifyContent: "center",
//     backgroundColor: "pink",
//   },
//   image: {
//     width: 24,
//     height: 24,
//     resizeMode: "contain",
//   },
// });
