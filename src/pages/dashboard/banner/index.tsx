import React, { useState } from "react";
import DashboardLayout from "@/components/dashboard/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Pencil, Plus, Trash } from "lucide-react";
import useBanner from "@/components/views/Home/hooks/useBanner";
import { FORMAT_DATE } from "@/helper/convertTime";
import { Loader2 } from "lucide-react";
import DeleteBannerAlert from "@/hooks/dashboard/banner/deleteBannerAlert";
import Link from "next/link";

// Define the Banner interface
interface Banner {
  id: string;
  name: string;
  imageUrl: string;
  createdAt: string;
  updatedAt: string;
}

const ITEMS_PER_PAGE = 6;

const BannerDashboard: React.FC = () => {
  const { data, isLoading, error } = useBanner();

  // State for search query and pagination
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  // Filtered banners based on search query
  const filteredBanners = data?.filter((banner) =>
    banner.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Paginated banners
  const paginatedBanners = filteredBanners?.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  // Total pages
  const totalPages = Math.ceil((filteredBanners?.length || 0) / ITEMS_PER_PAGE);

  return (
    <DashboardLayout>
      <div className="p-6 bg-gray-50 dark:bg-gray-900 min-h-screen">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Data Banner</h1>
          <div className="flex items-center mt-4 md:mt-0">
            <input
              type="text"
              placeholder="Search banners..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1); // Reset to first page on search
              }}
              className="px-4 py-2 mr-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
            />
            <Link href="/dashboard/banner/add-banner">
              <Button variant="sky" className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                Add Banner
              </Button>
            </Link>
          </div>
        </div>

        {/* Banners Grid */}
        <div>
          {isLoading && (
            <div className="flex justify-center items-center h-64">
              <Loader2 className="h-10 w-10 animate-spin text-gray-500" />
            </div>
          )}
          {error && <div className="text-red-500">{error}</div>}
          {paginatedBanners && paginatedBanners.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {paginatedBanners.map((banner) => (
                <div key={banner.id} className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
                  <img src={banner.imageUrl} alt={banner.name} className="w-full h-48 object-cover" />
                  <div className="p-4">
                    <h2 className="text-xl font-semibold text-gray-800 dark:text-white">{banner.name}</h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                      Created: {FORMAT_DATE(banner.createdAt)}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Updated: {FORMAT_DATE(banner.updatedAt)}
                    </p>
                    <div className="flex justify-end mt-4 space-x-2">
                      <Link href={`/dashboard/banner/${banner.id}`}>
                        <Button variant="outline" className="p-2">
                          <Pencil className="h-4 w-4" />
                        </Button>
                      </Link>
                      <DeleteBannerAlert bannerId={banner.id} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            !isLoading && <div className="text-center text-gray-500">No banners found.</div>
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center mt-8 space-x-2">
            <Button
              variant="outline"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            >
              Previous
            </Button>
            <span className="text-gray-600 dark:text-gray-300">
              Page {currentPage} of {totalPages}
            </span>
            <Button
              variant="outline"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            >
              Next
            </Button>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default BannerDashboard;