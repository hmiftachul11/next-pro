import DashboardLayout from "@/components/dashboard/components/DashboardLayout";
import { Card, CardContent } from "@/components/ui/card";
import useActivity from "@/components/views/Home/hooks/useActivity";
import useBanner from "@/components/views/Home/hooks/useBanner";
import useCategory from "@/components/views/Home/hooks/useCategory";
import usePromo from "@/components/views/Home/hooks/useOffer";
import UseGetAllTransaksi from "@/hooks/dashboard/transaksi/useGetAllTransaksi";
import UseGetAllUser from "@/hooks/dashboard/user/useGetAllUser";

import {
  Image,
  Tag,
  LayoutGrid,
  MapPin,
  ShoppingCart,
  AlertCircle,
  Users,
  UserCog,
  Loader2,
} from "lucide-react";

export function Dashboard() {
  const { data: dataBanner, isLoading: isLoadingBanner } = useBanner();
  const { data: dataPromo, isLoading: isLoadingPromo } = usePromo();
  const { data: dataCategory, isLoading: isLoadingCategory } = useCategory();
  const { data: dataActivity, isLoading: isLoadingActivity } = useActivity();
  const { data: dataTransaksi, isLoading: isLoadingTransaksi } =
    UseGetAllTransaksi();
  const { data: dataUsers, isLoading: isLoadingUsers } = UseGetAllUser();

  const pendingTransactions =
    dataTransaksi?.filter(
      (transaction) => transaction.status.toLowerCase() === "pending"
    )?.length || 0;

  const adminCount =
    dataUsers?.filter((user) => user.role === "admin")?.length || 0;

  const userCount =
    dataUsers?.filter((user) => user.role !== "admin")?.length || 0;

  const renderMetricCard = (
    title: string,
    value: number,
    isLoading: boolean,
    Icon: any,
    bgColor: string
  ) => (
    <div className="relative p-6 rounded-lg bg-white shadow-md dark:bg-gray-800 hover:shadow-lg transition-shadow duration-300">
      <div className="flex items-center">
        <div
          className={`flex items-center justify-center w-12 h-12 rounded-full ${bgColor} text-white`}
        >
          <Icon className="w-6 h-6" />
        </div>
        <div className="ml-4">
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
            {title}
          </p>
          {isLoading ? (
            <div className="flex items-center gap-2">
              <Loader2 className="h-4 w-4 animate-spin" />
              <span className="text-sm">Loading...</span>
            </div>
          ) : (
            <p className="text-2xl font-bold text-gray-800 dark:text-white">
              {value}
            </p>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <DashboardLayout>
      <div className="p-6">
        <h1 className="text-3xl font-bold mb-8">Dashboard</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Highlight Section */}
          <div className="grid grid-cols-2 gap-6">
            {renderMetricCard(
              "Total Banner",
              dataBanner?.length || 0,
              isLoadingBanner,
              Image,
              "bg-blue-500"
            )}
            {renderMetricCard(
              "Total Promo",
              dataPromo?.length || 0,
              isLoadingPromo,
              Tag,
              "bg-green-500"
            )}
            {renderMetricCard(
              "Total Category",
              dataCategory?.length || 0,
              isLoadingCategory,
              LayoutGrid,
              "bg-purple-500"
            )}
            {renderMetricCard(
              "Total Activity",
              dataActivity?.length || 0,
              isLoadingActivity,
              MapPin,
              "bg-pink-500"
            )}
          </div>

          {/* Statistics Section */}
          <div className="bg-gray-100 dark:bg-gray-900 p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold mb-4">Quick Stats</h2>
            <div className="space-y-4">
              {renderMetricCard(
                "Total Transaksi",
                dataTransaksi?.length || 0,
                isLoadingTransaksi,
                ShoppingCart,
                "bg-yellow-500"
              )}
              {renderMetricCard(
                "Pending Transaksi",
                pendingTransactions,
                isLoadingTransaksi,
                AlertCircle,
                "bg-red-500"
              )}
              {renderMetricCard(
                "Total Users",
                userCount,
                isLoadingUsers,
                Users,
                "bg-indigo-500"
              )}
              {renderMetricCard(
                "Total Admins",
                adminCount,
                isLoadingUsers,
                UserCog,
                "bg-gray-700"
              )}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default Dashboard;
