import React from "react";
import Layout from "@/components/Layout";
import { formatToIDR } from "@/helper/convertIDR";
import useActivityCategory from "@/hooks/useActivity_category";
import useCaregoryId from "@/hooks/useCategory_id";
import { useRouter } from "next/router";
import { MapPin, Star, Users, ArrowRight, Loader2 } from "lucide-react";

const Category = () => {
  const { data, isLoading, error } = useCaregoryId();
  const { dataActivity, isLoadingActivity, errorActivity } = useActivityCategory();
  const router = useRouter();

  if (!router.isReady || isLoading || isLoadingActivity) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
          <div className="text-center">
            <div className="loader" />
            <p className="mt-4 text-gray-600 font-medium">
              Loading the best experiences for you...
            </p>
          </div>
        </div>
      </Layout>
    );
  }

  if (error || errorActivity) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
          <div className="text-center">
            <p className="text-xl text-red-500 font-semibold">Oops! An error occurred.</p>
            <p className="text-sm text-gray-500 mt-2">{error || errorActivity}</p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto mt-20 px-6">
        {/* Category Header */}
        {data && (
          <div className="relative rounded-lg overflow-hidden shadow-lg mb-12">
            <img
              src={data.imageUrl || "https://placehold.co/1200x400/png"}
              alt={data.name}
              className="w-full h-[400px] object-cover"
              onError={(e) => {
                const img = e.target as HTMLImageElement;
                img.src = "https://placehold.co/1200x400/png";
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
            <div className="absolute bottom-8 left-8">
              <h1 className="text-3xl text-white font-extrabold">{data.name}</h1>
              <p className="text-white mt-2">Find unique activities and experiences.</p>
            </div>
          </div>
        )}

        {/* Activities Section */}
        {dataActivity.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-lg text-gray-500">No activities available at the moment.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {dataActivity.map((activity) => (
              <div
                key={activity.id}
                className="flex flex-col rounded-xl border border-gray-200 bg-white shadow-sm hover:shadow-lg transition-shadow duration-300 overflow-hidden"
              >
                {/* Image Section */}
                <div className="relative">
                  <img
                    src={activity.imageUrls[0]}
                    alt={activity.title}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                  <div className="absolute top-3 right-3 bg-[#4393F5] text-white text-sm px-3 py-1 rounded-full shadow flex items-center">
                    <Star className="h-4 w-4 text-yellow-400 mr-1" />
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
    </Layout>
  );
};

export default Category;






