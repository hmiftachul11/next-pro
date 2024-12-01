import DashboardLayout from "@/components/dashboard/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useAddCategory from "@/hooks/dashboard/category/useAddCategory";
import { useRouter } from "next/router";
import React from "react";

const AddCategory = () => {
  const router = useRouter();
  const {
    formData,
    isLoading,
    uploadProgress,
    handleInputChange,
    handleFileChange,
    handleSubmit,
  } = useAddCategory();

  const handleCancel = () => {
    router.push("/dashboard/category");
  };

  return (
    <DashboardLayout>
      <div className="p-4">
        <div>
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Add Category</h1>
          </div>

          <div className="max-w-3xl mx-auto">
            {formData.imageUrl ? (
              <div className="rounded-lg overflow-hidden mb-6">
                <img
                  src={formData.imageUrl}
                  alt="Category Preview"
                  className="w-full h-[300px] object-cover"
                />
              </div>
            ) : (
              <div className="rounded-lg overflow-hidden mb-6 bg-gray-100 flex items-center justify-center h-[300px]">
                <p className="text-gray-500">Image Preview</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <div className="col-span-3">
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Enter Category name"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="picture" className="text-right">
                  Picture
                </Label>
                <div className="col-span-3">
                  <Input
                    id="picture"
                    type="file"
                    onChange={handleFileChange}
                    accept="image/*"
                    required
                  />
                  {uploadProgress > 0 && uploadProgress < 100 && (
                    <div className="mt-2 h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-blue-500 transition-all duration-300"
                        style={{ width: `${uploadProgress}%` }}
                      />
                    </div>
                  )}
                  <p className="text-sm text-gray-500 mt-1">Max size: 5MB</p>
                </div>
              </div>

              <div className="flex justify-end gap-4 mt-6">
                <Button
                  type="button"
                  className="text-black"
                  variant="sky"
                  onClick={handleCancel}
                  disabled={isLoading}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? (
                    <div className="flex items-center gap-2">
                      <span className="animate-spin">O</span>
                      Saving...
                    </div>
                  ) : (
                    "Add Category"
                  )}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AddCategory;