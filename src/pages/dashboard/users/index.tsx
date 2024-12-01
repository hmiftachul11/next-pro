import React, { useState, useMemo } from "react";
import DashboardLayout from "@/components/dashboard/components/DashboardLayout";
import UseGetAllUser from "@/hooks/dashboard/user/useGetAllUser";
import { TableSkeleton } from "@/components/content/Skeleton";
import UpdateRoleDialog from "@/components/views/dashboard/users/UpdateRoleDialog";
import UseUpdateRole from "@/hooks/dashboard/user/useUpdateRole";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { SearchIcon } from "lucide-react";

const ITEMS_PER_PAGE = 10;

const UsersDashboard = () => {
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [isUpdateDialogOpen, setIsUpdateDialogOpen] = useState(false);
  const [loading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const updateUserRole = UseUpdateRole();

  const handleUpdateRole = async (newRole: string) => {
    if (!selectedUserId) return;

    setIsLoading(true);
    const success = await updateUserRole(selectedUserId, { role: newRole });

    if (success) {
      setIsUpdateDialogOpen(false);
      mutate();
    }

    setIsLoading(false);
  };

  const { data, isLoading, error, mutate } = UseGetAllUser();
  const [currentPage, setCurrentPage] = useState(1);

  // Filter users based on search query
  const filteredData = useMemo(() => {
    if (!data) return [];
    return data.filter(
      (user) =>
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.id.includes(searchQuery)
    );
  }, [data, searchQuery]);

  const totalPages = filteredData
    ? Math.ceil(filteredData.length / ITEMS_PER_PAGE)
    : 0;
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentData = filteredData.slice(startIndex, endIndex);

  const renderPaginationItems = () => {
    const items = [];
    const maxVisiblePages = 5;
    let startPage = Math.max(
      1,
      currentPage - Math.floor(maxVisiblePages / 2)
    );
    const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    if (startPage > 1) {
      items.push(
        <PaginationItem key="1">
          <PaginationLink onClick={() => setCurrentPage(1)}>1</PaginationLink>
        </PaginationItem>
      );
      if (startPage > 2) {
        items.push(
          <PaginationItem key="start-ellipsis">
            <PaginationEllipsis />
          </PaginationItem>
        );
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      items.push(
        <PaginationItem key={i}>
          <PaginationLink
            onClick={() => setCurrentPage(i)}
            isActive={currentPage === i}
          >
            {i}
          </PaginationLink>
        </PaginationItem>
      );
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        items.push(
          <PaginationItem key="end-ellipsis">
            <PaginationEllipsis />
          </PaginationItem>
        );
      }
      items.push(
        <PaginationItem key={totalPages}>
          <PaginationLink onClick={() => setCurrentPage(totalPages)}>
            {totalPages}
          </PaginationLink>
        </PaginationItem>
      );
    }

    return items;
  };

  return (
    <DashboardLayout>
      <div className="p-6 bg-gray-50 min-h-screen">
        <div className="flex flex-col md:flex-row justify-between items-center mb-6">
          <h1 className="text-3xl font-semibold text-gray-800">Data User</h1>
          <div className="relative mt-4 md:mt-0 w-full md:w-1/3">
            <input
              type="text"
              placeholder="Search users..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <SearchIcon className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
          </div>
        </div>

        {isLoading ? (
          <TableSkeleton />
        ) : error ? (
          <div className="text-red-500 text-center">Failed to load users.</div>
        ) : (
          <>
            {filteredData.length === 0 ? (
              <div className="text-center text-gray-500">No users found.</div>
            ) : (
              <div className="grid gap-6">
                {currentData.map((user) => (
                  <div
                    key={user.id}
                    className="flex items-center p-4 bg-white shadow rounded-lg"
                  >
                    <img
                      src={
                        user.profilePictureUrl ||
                        "https://placehold.co/100x100/png"
                      }
                      alt={user.name}
                      className="w-16 h-16 object-cover rounded-full mr-4"
                      onError={(e) => {
                        const img = e.target as HTMLImageElement;
                        img.src = "https://placehold.co/100x100/png";
                      }}
                    />
                    <div className="flex-1">
                      <h2 className="text-xl font-medium text-gray-800">
                        {user.name}
                      </h2>
                      <p className="text-sm text-gray-600">{user.email}</p>
                      <p className="text-sm text-gray-600">ID: {user.id}</p>
                      <p className="text-sm text-gray-600">
                        Role:{" "}
                        <span className="font-semibold capitalize">
                          {user.role}
                        </span>
                      </p>
                    </div>
                    <div className="ml-4">
                      <button
                        onClick={() => {
                          setSelectedUserId(user.id);
                          setIsUpdateDialogOpen(true);
                        }}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                      >
                        Update Role
                      </button>
                      <UpdateRoleDialog
                        userId={user.id}
                        currentRole={user.role}
                        isLoading={loading && selectedUserId === user.id}
                        isDialogOpen={
                          isUpdateDialogOpen && selectedUserId === user.id
                        }
                        setDialogOpen={(open) => {
                          setIsUpdateDialogOpen(open);
                          if (!open) {
                            setSelectedUserId(null);
                          }
                        }}
                        onUpdate={handleUpdateRole}
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}

            {totalPages > 1 && (
              <div className="mt-6 flex justify-center">
                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious
                        onClick={() =>
                          setCurrentPage((prev) => Math.max(1, prev - 1))
                        }
                        aria-disabled={currentPage === 1}
                      />
                    </PaginationItem>
                    {renderPaginationItems()}
                    <PaginationItem>
                      <PaginationNext
                        onClick={() =>
                          setCurrentPage((prev) =>
                            Math.min(totalPages, prev + 1)
                          )
                        }
                        aria-disabled={currentPage === totalPages}
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </div>
            )}
          </>
        )}
      </div>
    </DashboardLayout>
  );
};

export default UsersDashboard;
