import { CardSkeleton, TableSkeleton } from "@/components/content/Skeleton";
import Layout from "@/components/Layout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CustomBreadcrumb } from "@/components/ui/custom-breadcrumb";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import useActivity from "@/components/views/Home/hooks/useActivity";
import { formatToIDR } from "@/helper/convertIDR";
import { useBreadcrumb } from "@/hooks/useBreadcrumb";
import { ArrowRight, Loader2, MapPin, Search, Star, Users } from "lucide-react";
import { useRouter } from "next/router";
import React, { useState, useMemo, useEffect } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import SparklesText from "@/components/ui/sparkles-text";

// Update the Activity interface based on Option A or B above
interface Activity {
  id: string;
  title: string;
  city: string;
  imageUrls: string[]; // Ensure this matches your data
  rating: number;
  total_reviews: number;
  price: number;
}

const Activity: React.FC = () => {
  const router = useRouter();
  const { data, isLoading, error } = useActivity();
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filterType, setFilterType] = useState<"title" | "city">("title");
  const [selectedFilter, setSelectedFilter] = useState<string>("");

  // Sync URL search parameter with local state
  useEffect(() => {
    const { search, filter } = router.query;
    if (search) {
      setSearchQuery(decodeURIComponent(search as string));
    }
    if (filter === "city" || filter === "title") {
      setFilterType(filter as "title" | "city");
    }
  }, [router.query]);

  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = e.target.value;
    setSearchQuery(newQuery);

    // Reset selected filter when search changes
    setSelectedFilter("");

    // Update URL without triggering a page reload
    const newUrl = newQuery
      ? `/activity?search=${encodeURIComponent(newQuery)}&filter=${filterType}`
      : "/activity";
    router.replace(newUrl, undefined, { shallow: true });
  };

  // Handle filter type change
  const handleFilterChange = (value: string) => {
    setSelectedFilter(value);

    // Update URL without triggering a page reload
    const newUrl = searchQuery
      ? `/activity?search=${encodeURIComponent(searchQuery)}&filter=${filterType}&value=${encodeURIComponent(
        value
      )}`
      : "/activity";
    router.replace(newUrl, undefined, { shallow: true });
  };

  // Filter data based on search query
  const filteredData = useMemo(() => {
    if (!data) return [];

    const query = searchQuery.toLowerCase().trim();
    if (!query) return data;

    return data.filter((activity) =>
      activity[filterType].toLowerCase().includes(query)
    );
  }, [data, searchQuery, filterType]);

  // Generate unique dropdown options based on filtered data
  const dropdownOptions = useMemo(() => {
    const options = filteredData.map((activity) => activity[filterType]);
    return Array.from(new Set(options)); // Get unique values
  }, [filteredData, filterType]);

  // Filter data based on selected dropdown filter
  const finalFilteredData = useMemo(() => {
    if (!selectedFilter) return filteredData;

    return filteredData.filter(
      (activity) => activity[filterType] === selectedFilter
    );
  }, [filteredData, selectedFilter, filterType]);

  if (isLoading) {
    return (
      <Layout>
        <div className="mx-auto container flex flex-col items-center justify-center space-y-6">
          <CardSkeleton />
          <TableSkeleton />
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center text-red-500">
            <p className="text-2xl font-semibold mb-4">
              Oops! Something went wrong
            </p>
            <p>{error}</p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="relative mt-20 h-64 md:h-80 lg:h-[20rem] overflow-hidden shadow-lg">
  {/* Background Image */}
  <div className="absolute inset-0">
    <img
      src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?q=80&w=2000&auto=format&fit=crop"
      alt="Activity Banner"
      onError={(e) => {
        const img = e.target as HTMLImageElement;
        img.src = "https://placehold.co/2000x800/png?text=Banner+Image";
      }}
      className="w-full h-full object-cover scale-100 transition-transform duration-700 ease-out group-hover:scale-105"
    />
    <div className="absolute inset-0 bg-gradient-to-r from-blue-700/80 via-transparent to-black/50"></div>
  </div>

  {/* Text Content */}
  <div className="relative z-10 h-full flex flex-col justify-center items-start p-6 md:p-10 lg:p-14">
    <SparklesText className="text-white" text="Experience Your Next Adventure"/>
    {/* <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-snug">
      Experience Your Next Adventure
    </h1> */}
    <p className="mt-4 text-lg md:text-xl text-gray-200 max-w-2xl">
      Explore handpicked activities for your journey. Adventure starts here!
    </p>
  </div>
</div>

      
      {/* Header Section */}
      <div className="my-10 mx-auto container px-4">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-4">Explore Activities</h1>
            <p className="text-lg text-gray-600">
              Search and filter activities to find your next adventure.
            </p>

            {/* Filter Controls */}
            <div className="flex flex-col sm:flex-row items-center gap-4 mt-6">
              {/* Search Input */}
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  type="text"
                  placeholder={`Search by ${filterType}...`}
                  value={searchQuery}
                  onChange={handleSearchChange}
                  className="pl-10 w-full"
                />
              </div>

              {/* Dropdown Filter */}
              {dropdownOptions.length > 0 && (
                <Select
                  value={selectedFilter}
                  onValueChange={handleFilterChange}
                >
                  <SelectTrigger className="w-full sm:w-40">
                    <SelectValue placeholder="Filter Options" />
                  </SelectTrigger>
                  <SelectContent>
                    {dropdownOptions.map((option) => (
                      <SelectItem key={option} value={option}>
                        {option}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            </div>
          </div>

          {/* Content */}
          {finalFilteredData.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-xl text-gray-600">
                {searchQuery
                  ? `No activities found for "${searchQuery}".`
                  : "No activities available."}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {finalFilteredData.map((activity) => (
                <div
                  key={activity.id}
                  className="flex flex-col rounded-xl border border-gray-200 bg-white shadow-sm hover:shadow-lg transition-shadow duration-300 overflow-hidden"
                >
                  {/* Image Section */}
                  <div className="relative">
                    <img
                      src={activity.imageUrls[0]}
                      alt={activity.title}
                      className="w-full h-48 object-cover rounded-t-xl transition-transform duration-300 hover:scale-110"
                    />
                    <div className="absolute top-3 right-3 bg-[#4393F5] text-white text-sm px-3 py-1 rounded-full shadow">
                      <Star className="h-4 w-4 text-yellow-400 mr-1 inline-block" />
                      {activity.rating.toFixed(1)}
                    </div>
                  </div>

                  {/* Content Section */}
                  <div className="flex-1 flex flex-col p-4">
                    <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2">
                      {activity.title}
                    </h3>
                    <p className="text-sm text-gray-500 mb-2 flex items-center">
                      <MapPin className="h-4 w-4 mr-1 text-[#4393F5]" />
                      {activity.city}
                    </p>
                    <p className="text-sm text-gray-500 flex items-center">
                      <Users className="h-4 w-4 mr-1 text-[#4393F5]" />
                      {activity.total_reviews} Reviews
                    </p>
                  </div>

                  {/* Footer Section */}
                  <div className="border-t border-gray-200 px-4 py-3 flex items-center justify-between bg-gray-50">
                    <p className="text-blue-600 font-bold text-lg">
                      {formatToIDR(activity.price)}
                    </p>
                    <button
                      onClick={() => router.push(`/activity/${activity.id}`)}
                      className="text-sm bg-[#4393F5] text-white px-4 py-2 rounded-full shadow hover:bg-[#357AE8] transition"
                    >
                      Details
                      <ArrowRight className="h-4 w-4 ml-1 inline-block" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Activity;