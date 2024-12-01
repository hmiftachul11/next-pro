import { API_KEY, BASE_URL, END_POINT } from "@/helper/endpoint";
import axios from "axios";
import useSWR from "swr";

export interface BannerItem {
  id: string;
  imageUrl: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

interface ApiResponse {
  status: string;
  message: string;
  data: BannerItem[];
}
const fetcher = async (url: string): Promise<BannerItem[]> => {
  const response = await axios.get<ApiResponse>(url, {
    headers: {
      apiKey: API_KEY,
    },
  });
  return response.data.data;
};

const useBanner = () => {

  const { data, error, isLoading, mutate } = useSWR<BannerItem[]>(
    `${BASE_URL.API}${END_POINT.GET_BANNER}`,
    fetcher,
    {
      revalidateOnFocus: false,
      dedupingInterval: 5000,
      errorRetryCount: 3,
    }
  );

  const refreshBanner = async () => {
    await mutate();
  };

  return {
    data: data || [],
    isLoading,
    error: error?.message || null,
    mutate,
    refreshBanner,
  };
};

export default useBanner;
