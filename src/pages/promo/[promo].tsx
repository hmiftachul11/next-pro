import Layout from "@/components/Layout";
import usePromoId from "@/hooks/usePromo_id";
import { useRouter } from "next/router";
import { Calendar, Copy, Share2, Tag } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { formatToIDR } from "@/helper/convertIDR";
import { CardSkeleton } from "@/components/content/Skeleton";
import { useBreadcrumb } from "@/hooks/useBreadcrumb";
import { CustomBreadcrumb } from "@/components/ui/custom-breadcrumb";

const PromoDetail = () => {

  const { data, isLoading, error } = usePromoId();

  const router = useRouter();
  const copyPromoCode = () => {
    navigator.clipboard.writeText(data!.promo_code);
    toast({
      title: "Kode promo disalin!",
      description: "Kode promo telah disalin ke clipboard.",
    });
  };

  const createMarkup = (htmlContent: string) => {
    return {
      __html: htmlContent,
    };
  };

  if (!router.isReady) {
    return (
      <Layout>
        <div className="mt-20 container mx-auto">
          <CardSkeleton />
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="mt-20 mb-10 container py-4 mx-auto px-6">

        {isLoading && (
          <div className="text-center py-8">
            <CardSkeleton />
          </div>
        )}

        {error && <div className="text-center text-red-500 py-8">{error}</div>}

        {data && (
          <div className="max-w-3xl mx-auto">


            {/* Main Card */}
            <div className="bg-white rounded-lg shadow-lg p-6 mt-6">
              {/* Promo Header */}
              <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg p-6 my-3 shadow-md text-center">
                <h1 className="text-3xl font-bold">{data.title}</h1>
                <p className="mt-2 text-sm">
                  Berlaku hingga <strong>31 Maret 2024</strong>
                </p>
              </div>
              <div className="relative">
                {/* Promo Image */}
                <img
                  src={data.imageUrl || "https://placehold.co/600x400/png"}
                  alt={data.title}
                  className="w-full h-64 object-cover rounded-lg mb-4"
                  onError={(e) => {
                    const img = e.target as HTMLImageElement;
                    img.src = "https://placehold.co/600x400/png";
                  }}
                />
                {/* Promo Code */}
                <div className="absolute bottom-4 right-4 bg-blue-100 px-4 py-2 rounded-lg flex items-center gap-2 shadow-md">
                  <span className="text-[#4393F5] font-bold">
                    {data.promo_code}
                  </span>
                  <button
                    onClick={copyPromoCode}
                    className="text-[#4393F5] hover:text-blue-700"
                  >
                    <Copy className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Promo Details */}
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-600">Discount Rate</h3>
                  <p className="text-xl font-bold text-green-600">
                    {formatToIDR(data.promo_discount_price)}
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-600">Transaction Minimum</h3>
                  <p className="text-xl font-bold text-[#4393F5]">
                    {formatToIDR(data.minimum_claim_price)}
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-600">Promo Description</h3>
                  <p className="text-gray-800">{data.description}</p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-600">terms and conditions</h3>
                  <p 
                  className="text-gray-800" 
                  dangerouslySetInnerHTML={{
                      __html: data.terms_condition,
                    }}/>
                </div>
              </div>
              
            </div>


          </div>
        )}
      </div>
    </Layout>
  );
};

export default PromoDetail;
