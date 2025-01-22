import { useState, useEffect, useCallback } from "react";
import axios from "axios";

const useAxios = (baseURL) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  // Create an Axios instance
  const axiosInstance = axios.create({
    baseURL,
    headers: {
      "Content-Type": "application/json",
    },
  });

  // Function to make API requests
  const sendRequest = useCallback(
    async (config) => {
      setLoading(true);
      setError(null);
      try {
        const { method = "GET", url, data: bodyData, params } = config;
        const response = await axiosInstance({
          method,
          url,
          data: bodyData,
          params,
        });
        setData(response.data);
        return response.data; // Return data for additional handling
      } catch (err) {
        setError(err.response?.data || err.message);
        throw err; // Re-throw error for external handling
      } finally {
        setLoading(false);
      }
    },
    [axiosInstance]
  );

  // Cleanup: Cancel requests when the component unmounts
  useEffect(() => {
    const source = axios.CancelToken.source();
    axiosInstance.interceptors.request.use((config) => {
      config.cancelToken = source.token;
      return config;
    });

    return () => source.cancel("Request canceled on component unmount");
  }, [axiosInstance]);

  return { loading, error, data, sendRequest };
};

export default useAxios;
