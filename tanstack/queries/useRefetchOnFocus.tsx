import React from "react";
import { useFocusEffect } from "@react-navigation/native";
import { useQueryClient } from "@tanstack/react-query";

const useRefreshOnFocus = (key: string[]) => {
  const queryClient = useQueryClient();
  const firstTimeRef = React.useRef(true);

  useFocusEffect(
    React.useCallback(() => {
      if (firstTimeRef.current) {
        firstTimeRef.current = false;
        return;
      }

      queryClient.refetchQueries({
        queryKey: key,
        stale: true,
        type: "active",
      });
    }, [queryClient])
  );
};

export default useRefreshOnFocus;
