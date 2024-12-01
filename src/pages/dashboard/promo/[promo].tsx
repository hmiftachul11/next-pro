import React, { useState, useEffect } from "react";
import DashboardLayout from "@/components/dashboard/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import useEditPromo from "@/hooks/dashboard/promo/useEditPromo";
import { toast } from "@/hooks/use-toast";
import usePromoId from "@/hooks/usePromo_id";
import { useRouter } from "next/router";

interface FormData {
  title: string;
  description: string;
  imageUrl: string | null;
  terms_condition: string;
  promo_code: string;
  promo_discount_price: string;
  minimum_claim_price: string;
  pictureFile: File | null;
}

const EditPromo = () => {
  const router = useRouter();
  const { data, isLoading: isLoadingData, error } = usePromoId();
  const { editPromo, handleImageUpload, isLoading, uploadProgress } = useEditPromo();
  const [formData, setFormData] = useState<FormData>({
    title: "",
    description: "",
    imageUrl: null,
    terms_condition: "",
    promo_code: "",
    promo_discount_price: "",
    minimum_claim_price: "",
    pictureFile: null,
  });

  useEffect(() => {
    if (data) {
      setFormData({
        title: data.title || "",
        description: data.description || "",
        imageUrl: data.imageUrl || null,
        terms_condition: data.terms_condition || "",
        promo_code: data.promo_code || "",
        promo_discount_price: data.promo_discount_price?.toString() || "",
        minimum_claim_price: data.minimum_claim_price?.toString() || "",
        pictureFile: null,
      });
    }
  }, [data]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];

      if (file.size > 5 * 1024 * 1024) {
        toast({
          variant: "destructive",
          title: "Error",
          description: "File size should not exceed 5MB",
        });
        e.target.value = "";
        return;
      }

      setFormData((prev) => ({
        ...prev,
        pictureFile: file,
        imageUrl: URL.createObjectURL(file),
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!data?.id) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Promo ID is missing",
      });
      return;
    }

    let imageUrl = formData.imageUrl;

    if (formData.pictureFile) {
      const uploadedUrl = await handleImageUpload(formData.pictureFile);
      if (!uploadedUrl) return;
      imageUrl = uploadedUrl;
    }

    const success = await editPromo(data.id, {
      title: formData.title,
      description: formData.description,
      imageUrl: imageUrl!,
      terms_condition: formData.terms_condition,
      promo_code: formData.promo_code,
      promo_discount_price: Number(formData.promo_discount_price),
      minimum_claim_price: Number(formData.minimum_claim_price),
    });

    if (success) {
      router.push("/dashboard/promo");
    }
  };

  const handleCancel = () => {
    router.push("/dashboard/promo");
  };

  if (!router.isReady || isLoadingData) return <div>Loading...</div>;
  if (error)
    return <div className="text-center text-red-500 py-8">{error}</div>;

  return (
    <DashboardLayout>
      <div className="p-6 bg-gray-50 dark:bg-gray-900 min-h-screen">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Edit Promo</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Image Preview */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <img
              src={
                formData.imageUrl ||
                data?.imageUrl ||
                "https://placehold.co/600x400/png"
              }
              alt={formData.title || data?.title}
              className="w-full h-64 object-cover rounded-lg"
              onError={(e) => {
                const img = e.target as HTMLImageElement;
                img.src = "https://placehold.co/600x400/png";
              }}
            />
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
              Maximum size: 5MB
            </p>
          </div>

          {/* Form Section */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-300">
                  Title
                </Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="Enter promo title"
                  required
                />
              </div>

              <div>
                <Label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-300">
                  Description
                </Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Enter promo description"
                  required
                />
              </div>

              <div>
                <Label htmlFor="promo_code" className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-300">
                  Promo Code
                </Label>
                <Input
                  id="promo_code"
                  value={formData.promo_code}
                  onChange={handleInputChange}
                  placeholder="Enter promo code"
                  required
                />
              </div>

              <div>
                <Label htmlFor="promo_discount_price" className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-300">
                  Discount Amount
                </Label>
                <Input
                  id="promo_discount_price"
                  type="number"
                  value={formData.promo_discount_price}
                  onChange={handleInputChange}
                  placeholder="Enter discount amount"
                  required
                />
              </div>

              <div>
                <Label htmlFor="minimum_claim_price" className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-300">
                  Minimum Purchase
                </Label>
                <Input
                  id="minimum_claim_price"
                  type="number"
                  value={formData.minimum_claim_price}
                  onChange={handleInputChange}
                  placeholder="Enter minimum purchase amount"
                  required
                />
              </div>

              <div>
                <Label htmlFor="picture" className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-300">
                  Picture
                </Label>
                <Input
                  id="picture"
                  type="file"
                  onChange={handleFileChange}
                  accept="image/*"
                />
                {uploadProgress > 0 && uploadProgress < 100 && (
                  <div className="mt-2 h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-blue-500 transition-all duration-300"
                      style={{ width: `${uploadProgress}%` }}
                    />
                  </div>
                )}
              </div>

              <div className="flex justify-end gap-4 mt-6">
                <Button
                  type="button"
                  variant="secondary"
                  onClick={handleCancel}
                  disabled={isLoading}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? "Saving..." : "Save Changes"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default EditPromo;
