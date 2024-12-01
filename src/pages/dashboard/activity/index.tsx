import React, { useState } from "react";
import DashboardLayout from "@/components/dashboard/components/DashboardLayout";
import useActivity from "@/components/views/Home/hooks/useActivity";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Pencil, Plus, Trash2 } from "lucide-react";
import { Loader2 } from "lucide-react";
import DeleteActivityAlert from "@/hooks/dashboard/activity/deleteActivityAlert";

const ITEMS_PER_PAGE = 6;

const ActivityDashboard: React.FC = () => {
  const { data, isLoading, error } = useActivity();
  const [currentPage, setCurrentPage] = useState(1);

  // Calculate total pages
  const totalPages = Math.ceil((data?.length || 0) / ITEMS_PER_PAGE);

  // Paginated data
  const paginatedData =
    data?.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE) || [];

  return (
    <DashboardLayout>
      <div className="p-6 bg-gray-50 dark:bg-gray-900 min-h-screen">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Data Activity</h1>
          <Link href="/dashboard/activity/add-activity">
            <Button variant="sky" className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Add Activity
            </Button>
          </Link>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="h-10 w-10 animate-spin text-gray-500" />
          </div>
        )}

        {/* Error State */}
        {error && <div className="text-center text-red-500 py-8">{error}</div>}

        {/* Activities Grid */}
        {paginatedData.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {paginatedData.map((activity) => (
                <div
                  key={activity.id}
                  className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
                >
                  <img
                    src={activity.imageUrls[0]}
                    alt={activity.title}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                  <div className="p-4">
                    <h2 className="text-lg font-bold text-gray-800 dark:text-white">{activity.title}</h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                      Category: <span className="font-medium">{activity.category.name}</span>
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      City: <span className="font-medium">{activity.city}</span>
                    </p>
                    <div className="flex justify-end mt-4 space-x-2">
                      <Link href={`/dashboard/activity/${activity.id}`}>
                        <Button variant="outline" className="p-2">
                          <Pencil className="h-4 w-4" />
                        </Button>
                      </Link>
                      <DeleteActivityAlert activityId={activity.id} />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination Controls */}
            <div className="flex justify-center items-center mt-8 space-x-4">
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
          </>
        ) : (
          !isLoading && <div className="text-center text-gray-500">No activities found.</div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default ActivityDashboard;
