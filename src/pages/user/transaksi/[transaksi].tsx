import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import useTransaksiId from "@/hooks/transaksi/useGetTransaksi_id";
import { formatToIDR } from "@/helper/convertIDR";
import {
  Receipt,
  Clock,
  Upload,
  Loader2,
  Calendar,
  AlertCircle,
} from "lucide-react";
import { FORMAT_DATE } from "@/helper/convertTime";
import CancelTransaksiButton from "@/components/views/Transaksi/CancelTransaksiButton";
import { useState } from "react";
import UploadProofPaymentDialog from "@/components/views/Transaksi/UploadProofPaymentDialog";
import { DashboardSkeleton } from "@/components/content/Skeleton";
import { CustomBreadcrumb } from "@/components/ui/custom-breadcrumb";
import { useBreadcrumb } from "@/hooks/useBreadcrumb";

const getStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case "success":
      return "bg-green-500/10 text-green-500 hover:bg-green-500/20";
    case "pending":
      return "bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20";
    case "cancelled":
      return "bg-red-500/10 text-red-500 hover:bg-red-500/20";
    default:
      return "bg-gray-500/10 text-gray-500 hover:bg-gray-500/20";
  }
};

const TransaksiDetail = () => {
  const { data, isLoading, error } = useTransaksiId();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedTransaksiId, setSelectedTransaksiId] = useState<string>("");
  const breadcrumbItems = useBreadcrumb();

  const handleUploadClick = (transaksiId: string) => {
    setSelectedTransaksiId(transaksiId);
    setIsDialogOpen(true);
  };
  if (isLoading) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="flex items-center gap-2">
            <Loader2 className="h-6 w-6 animate-spin" />
            <DashboardSkeleton />
          </div>
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center text-red-500">
            <AlertCircle className="h-8 w-8 mx-auto mb-2" />
            <p>{error}</p>
          </div>
        </div>
      </Layout>
    );
  }

  if (!data) return null;

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50 pt-20">
        <div className="container mx-auto px-4 py-8">
          {/* Top Status Bar */}
          <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-50 rounded-full">
                  <Receipt className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Invoice ID</p>
                  <p className="font-medium">{data.invoiceId}</p>
                </div>
              </div>
              <Badge className={`${getStatusColor(data.status)} text-sm px-4 py-1`}>
                {data.status.toUpperCase()}
              </Badge>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Main Content */}
            <div className="lg:col-span-8 space-y-6">
              {/* Order Items */}
              <Card>
                <CardHeader className="border-b">
                  <CardTitle>Order Items</CardTitle>
                </CardHeader>
                <CardContent className="divide-y">
                  {data.transaction_items.map((item) => (
                    <div key={item.id} className="py-4 first:pt-0 last:pb-0">
                      <div className="flex gap-4">
                        <div className="w-32 h-24 rounded-lg overflow-hidden flex-shrink-0">
                          <img
                            src={item.imageUrls[0]}
                            alt={item.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between">
                            <div>
                              <h3 className="font-semibold text-lg">{item.title}</h3>
                              <p className="text-sm text-gray-600 mt-1">{item.description}</p>
                            </div>
                            <div className="text-right">
                              {item.price_discount > 0 ? (
                                <div>
                                  <p className="text-green-600 font-semibold">{formatToIDR(item.price)}</p>
                                  <p className="text-sm text-gray-400 line-through">{formatToIDR(item.price_discount)}</p>
                                </div>
                              ) : (
                                <p className="font-semibold">{formatToIDR(item.price)}</p>
                              )}
                            </div>
                          </div>
                          <div className="mt-2 text-sm text-gray-600">
                            Quantity: <span className="font-medium">{item.quantity}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Payment Method */}
              <Card>
                <CardHeader className="border-b">
                  <CardTitle>Payment Details</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="flex items-center gap-6 p-4 bg-gray-50 rounded-lg">
                    <img
                      src={data.payment_method.imageUrl}
                      alt={data.payment_method.name}
                      className="h-12 object-contain"
                    />
                    <div className="flex-1">
                      <p className="font-semibold text-lg">{data.payment_method.name}</p>
                      <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-2">
                        <div>
                          <p className="text-sm text-gray-500">VA Number</p>
                          <p className="font-medium">{data.payment_method.virtual_account_number}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Account Name</p>
                          <p className="font-medium">{data.payment_method.virtual_account_name}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-4 space-y-6">
              {/* Order Summary */}
              <Card>
                <CardHeader className="border-b">
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="flex justify-between text-lg">
                      <span>Total Amount</span>
                      <span className="font-bold">{formatToIDR(data.totalAmount)}</span>
                    </div>

                    <Separator />

                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-gray-600">
                        <Calendar className="h-4 w-4" />
                        <div>
                          <p className="text-sm">Order Date</p>
                          <p className="font-medium">{FORMAT_DATE(data.orderDate)}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        <Clock className="h-4 w-4" />
                        <div>
                          <p className="text-sm">Payment Due</p>
                          <p className="font-medium">{FORMAT_DATE(data.expiredDate)}</p>
                        </div>
                      </div>
                    </div>

                    {data.status !== "cancelled" && data.status !== "success" && (
                      <>
                        <Separator />
                        <div className="space-y-3 pt-2">
                          <Button
                            className="w-full bg-blue-600 hover:bg-blue-700"
                            onClick={() => handleUploadClick(data.id)}
                          >
                            <Upload className="h-4 w-4 mr-2" />
                            Upload Payment Proof
                          </Button>
                          <CancelTransaksiButton
                            transaksiId={data.id}
                            invoiceId={data.invoiceId}
                          />
                        </div>
                      </>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Payment Proof */}
              {data.proofPaymentUrl && (
                <Card>
                  <CardHeader className="border-b">
                    <CardTitle>Payment Proof</CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="rounded-lg overflow-hidden">
                      <img
                        src={data.proofPaymentUrl}
                        alt="Payment Proof"
                        className="w-full h-auto"
                      />
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>

          <UploadProofPaymentDialog
            isOpen={isDialogOpen}
            onOpenChange={setIsDialogOpen}
            transaksiId={selectedTransaksiId}
          />
        </div>
      </div>
    </Layout>
  );
};

export default TransaksiDetail;
