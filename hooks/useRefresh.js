import { useState, useCallback, useEffect } from "react";
import { useIsFocused } from "@react-navigation/native";

export function usePullToRefresh(fetchData) {
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    try {
      await fetchData();
    } catch (error) {
      console.error("Erro ao atualizar:", error);
    } finally {
      setRefreshing(false);
    }
  }, [fetchData]);

  return { refreshing, onRefresh };
}

export function useRefreshOnFocus(fetchData) {
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      fetchData().catch((error) =>
        console.error("Erro ao atualizar ao focar:", error)
      );
    }
  }, [isFocused, fetchData]);
}

