import { useEffect, useState } from "react";
import apiClient from "../utils/api-client";

function useData(url, params, deps) {
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(
    () => {
      setIsLoading(true);
      apiClient
        .get(url, params)
        .then((res) => {
          if (
            url === "/products" &&
            data &&
            data.products &&
            params.params.page !== 1
          ) {
            setData((prev) => ({
              ...prev,
              products: [...prev.products, ...res.data.products],
            }));
          } else {
            setData(res.data);
          }
          setIsLoading(false);
        })
        .catch((err) => {
          setError(err.message), setIsLoading(false);
        });
    },
    deps ? deps : []
  );
  return { data, error, isLoading };
}

export default useData;
