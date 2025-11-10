import { useNavigation } from "@react-navigation/native";
import { JSX, useLayoutEffect } from "react";

const useSetPageTitle = (
  headerTitle: string,
  headerRight?: () => JSX.Element
) => {
  const navigator = useNavigation();
  useLayoutEffect(() => {
    navigator.setOptions({
      headerTitle,
      headerTitleStyle: { fontFamily: "signature", fontSize: 20 },
      headerRight,
    });
  });
};

export default useSetPageTitle;
