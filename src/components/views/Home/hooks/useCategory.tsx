import { API_KEY, BASE_URL, END_POINT } from "@/helper/endpoint";
import axios from "axios";
import useSWR from "swr";

export interface CategoryItem {
  id: string;
  imageUrl: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

interface ApiResponse {
  status: string;
  message: string;
  data: CategoryItem[];
}

const fetcher = async (url: string): Promise<CategoryItem[]> => {
  const response = await axios.get<ApiResponse>(url, {
    headers: {
      apiKey: API_KEY,
    },
  });
  return response.data.data;
};
const useCategory = () => {

  const { data, error, isLoading, mutate } = useSWR<CategoryItem[]>(
    `${BASE_URL.API}${END_POINT.GET_CATEGORY}`,
    fetcher,
    {
      revalidateOnFocus: false,
      dedupingInterval: 5000,
      errorRetryCount: 3,
    }
  );

  const refreshCategory = async () => {
    await mutate();
  };

  return {
    data: data || [],
    isLoading,
    error: error?.message || null,
    mutate,
    refreshCategory,
  };
};

export default useCategory;
