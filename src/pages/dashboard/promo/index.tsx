import React, { useState } from "react";
import DashboardLayout from "@/components/dashboard/components/DashboardLayout";
import usePromo from "@/components/views/Home/hooks/useOffer";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Pencil, Plus, Trash2 } from "lucide-react";
import { Loader2 } from "lucide-react";
import DeletePromoAlert from "@/hooks/dashboard/promo/deletePromoAlert";

// Define the Promo interface
interface Promo {
  id: string;
  title: string;
  promo_code: string;
  imageUrl: string;
}

const ITEMS_PER_PAGE = 6;

const PromoDashboard: React.FC = () => {
  const { data, isLoading, error } = usePromo();

  // State for search query and pagination
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  // Filter promos based on the search query
  const filteredPromos = data?.filter((promo) =>
    promo.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Paginated promos
  const paginatedPromos = filteredPromos?.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  // Total pages for pagination
  const totalPages = Math.ceil((filteredPromos?.length || 0) / ITEMS_PER_PAGE);

  return (
    <DashboardLayout>
      <div className="p-6 bg-gray-50 dark:bg-gray-900 min-h-screen">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Data Promo</h1>
          <div className="flex items-center mt-4 md:mt-0">
            <input
              type="text"
              placeholder="Search promos..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1); // Reset to the first page on search
              }}
              className="px-4 py-2 mr-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
            />
            <Link href="/dashboard/promo/add-promo">
              <Button variant="sky" className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                Add Promo
              </Button>
            </Link>
          </div>
        </div>

        {/* Promos Grid */}
        <div>
          {isLoading && (
            <div className="flex justify-center items-center h-64">
              <Loader2 className="h-10 w-10 animate-spin text-gray-500" />
            </div>
          )}
          {error && <div className="text-red-500">{error}</div>}
          {paginatedPromos && paginatedPromos.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {paginatedPromos.map((promo) => (
                <div
                  key={promo.id}
                  className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
                >
                  <img
                    src={promo.imageUrl}
                    alt={promo.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h2 className="text-lg font-bold text-gray-800 dark:text-white">{promo.title}</h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                      Promo Code: <span className="font-medium">{promo.promo_code}</span>
                    </p>
                    <div className="flex justify-end mt-4 space-x-2">
                      <Link href={`/dashboard/promo/${promo.id}`}>
                        <Button variant="outline" className="p-2">
                          <Pencil className="h-4 w-4" />
                        </Button>
                      </Link>
                      <DeletePromoAlert promoId={promo.id} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            !isLoading && <div className="text-center text-gray-500">No promos found.</div>
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

export default PromoDashboard;
