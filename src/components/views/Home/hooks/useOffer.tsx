import { API_KEY, BASE_URL, END_POINT } from "@/helper/endpoint";
import axios from "axios";
import useSWR from "swr";

export interface PromoItem {
  id: string;
  imageUrl: string;
  title: string;
  description: string;
  terms_condition: string;
  promo_code: string;
  promo_discount_price: number;
  minimum_claim_price: number;
  createdAt: string;
  updatedAt: string;
}

interface ApiResponse {
  status: string;
  message: string;
  data: PromoItem[];
}

const fetcher = async (url: string): Promise<PromoItem[]> => {
  const response = await axios.get<ApiResponse>(url, {
    headers: {
      apiKey: API_KEY,
    },
  });
  return response.data.data;
};

const usePromo = () => {

  const { data, error, isLoading, mutate } = useSWR<PromoItem[]>(
    `${BASE_URL.API}${END_POINT.GET_PROMO}`,
    fetcher,
    {
      revalidateOnFocus: false,
      dedupingInterval: 5000,
      errorRetryCount: 3,
    }
  );

  const refreshPromo = async () => {
    await mutate();
  };

  return {
    data: data || [],
    isLoading,
    error: error?.message || null,
    mutate,
    refreshPromo,
  };
};

export default usePromo;
