import React, { useState, useEffect } from "react";
import DashboardLayout from "@/components/dashboard/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useEditBanner from "@/hooks/dashboard/banner/useEditBanner";
import { toast } from "@/hooks/use-toast";
import useBannerId from "@/hooks/useBanner_id";
import { useRouter } from "next/router";

interface FormData {
  name: string;
  imageUrl: string | null;
  pictureFile: File | null;
}

const EditBanner: React.FC = () => {
  const router = useRouter();
  const { data, isLoading: isLoadingData, error } = useBannerId();
  const { editBanner, handleImageUpload, isLoading, uploadProgress } = useEditBanner();
  const [formData, setFormData] = useState<FormData>({
    name: "",
    imageUrl: null,
    pictureFile: null,
  });

  useEffect(() => {
    if (data) {
      setFormData({
        name: data.name || "",
        imageUrl: data.imageUrl || null,
        pictureFile: null,
      });
    }
  }, [data]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
        description: "Banner ID is missing",
      });
      return;
    }

    let imageUrl = formData.imageUrl;

    if (formData.pictureFile) {
      const uploadedUrl = await handleImageUpload(formData.pictureFile);
      if (!uploadedUrl) return;
      imageUrl = uploadedUrl;
    }

    const success = await editBanner(data.id, {
      name: formData.name,
      imageUrl: imageUrl!,
    });

    if (success) {
      router.push("/dashboard/banner");
    }
  };

  const handleCancel = () => {
    router.push("/dashboard/banner");
  };

  return (
    <DashboardLayout>
      <div className="p-6 bg-gray-50 dark:bg-gray-900 min-h-screen">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Edit Banner</h1>
        </div>

        {isLoadingData && <div className="text-center">Loading...</div>}
        {error && (
          <div className="text-center text-red-500 py-8">{error}</div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Image Preview */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Preview</h2>
            <img
              src={
                formData.imageUrl ||
                data?.imageUrl ||
                "https://placehold.co/600x400/png"
              }
              alt={formData.name || data?.name}
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
                <Label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-600 dark:text-gray-300"
                >
                  Name
                </Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Enter banner name"
                  required
                  className="mt-2"
                />
              </div>

              <div>
                <Label
                  htmlFor="picture"
                  className="block text-sm font-medium text-gray-600 dark:text-gray-300"
                >
                  Picture
                </Label>
                <Input
                  id="picture"
                  type="file"
                  onChange={handleFileChange}
                  accept="image/*"
                  className="mt-2"
                />
                {uploadProgress > 0 && uploadProgress < 100 && (
                  <div className="mt-2 h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-blue-400 to-blue-600 transition-all duration-300"
                      style={{ width: `${uploadProgress}%` }}
                    />
                  </div>
                )}
              </div>

              <div className="flex justify-end gap-4">
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

export default EditBanner;