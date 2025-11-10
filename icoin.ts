import { ImageSourcePropType } from "react-native";
import { IconNames } from "./types";

const iconImages: Record<IconNames, ImageSourcePropType> = {
  fingerprint: require("./assets/fingerprint-icon.png"),
  signup: require("./assets/signup-logo.png"),
  settings: require("./assets/settings-icon.png"),
  posts: require("./assets/posts-icon.png"),
  "add-circle": require("./assets/add-circle_icon.png"),
};

export default iconImages;
