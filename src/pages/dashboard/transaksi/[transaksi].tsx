import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import useTransaksiId from "@/hooks/transaksi/useGetTransaksi_id";
import { formatToIDR } from "@/helper/convertIDR";
import {
  Receipt,
  Clock,
  Calendar,
  AlertCircle,
  User,
  FileText,
  History,
} from "lucide-react";
import { FORMAT_DATE } from "@/helper/convertTime";
import CancelTransaksiButton from "@/components/views/Transaksi/CancelTransaksiButton";
import { DashboardSkeleton } from "@/components/content/Skeleton";
import DashboardLayout from "@/components/dashboard/components/DashboardLayout";
import UpdateStatusButton from "@/hooks/dashboard/transaksi/updateStatusTransaksi";

const StatusBadge = ({ status }: { status: string }) => {
  let badgeStyle = "";

  switch (status.toLowerCase()) {
    case "pending":
      badgeStyle = "bg-yellow-100 text-yellow-800 hover:bg-yellow-100";
      break;
    case "success":
      badgeStyle = "bg-green-100 text-green-800 hover:bg-green-100";
      break;
    case "cancelled":
      badgeStyle = "bg-gray-100 text-gray-800 hover:bg-gray-100";
      break;
    case "failed":
      badgeStyle = "bg-red-100 text-red-800 hover:bg-red-100";
      break;
    default:
      badgeStyle = "bg-gray-100 text-gray-800";
  }

  return <Badge className={badgeStyle}>{status.toUpperCase()}</Badge>;
};

const TransaksiDetail = () => {
  const { data, isLoading, error } = useTransaksiId();

  if (isLoading) return <DashboardSkeleton />;
  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center text-red-500">
          <AlertCircle className="h-10 w-10 mx-auto mb-2" />
          <p className="text-lg">{error}</p>
        </div>
      </div>
    );
  }
  if (!data) return null;

  return (
    <DashboardLayout>
      <div className="container mx-auto px-6 py-10">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-lg p-6 mb-8 shadow-md">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold">Transaction Details</h1>
              <p className="mt-2 text-sm text-gray-200">
                Invoice: <span className="font-medium">{data.invoiceId}</span>
              </p>
              <p className="mt-1 text-sm text-gray-200">
                User ID: <span className="font-medium">{data.userId}</span>
              </p>
            </div>
            <StatusBadge status={data.status} />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Section */}
          <div className="lg:col-span-2 space-y-8">
            {/* Order Details */}
            <Card className="bg-white shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg font-semibold">
                  Order Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {data.transaction_items.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center space-x-4 border-b pb-4 last:border-b-0"
                  >
                    <img
                      src={item.imageUrls[0]}
                      alt={item.title}
                      className="w-16 h-16 rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold">{item.title}</h3>
                      <p className="text-gray-600 text-sm">{item.description}</p>
                      <div className="mt-2 flex justify-between items-center">
                        <span className="text-sm text-gray-500">
                          Quantity: <span className="font-medium">{item.quantity}</span>
                        </span>
                        <span className="text-green-600 font-bold">
                          {formatToIDR(item.price)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Payment Method */}
            <Card className="bg-white shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg font-semibold">
                  Payment Method
                </CardTitle>
              </CardHeader>
              <CardContent className="flex items-center space-x-4">
                <img
                  src={data.payment_method.imageUrl}
                  alt={data.payment_method.name}
                  className="w-12 h-12 object-contain"
                />
                <div>
                  <p className="font-medium">{data.payment_method.name}</p>
                  <p className="text-sm text-gray-600">
                    Account Name: {data.payment_method.virtual_account_name}
                  </p>
                  <p className="text-sm text-gray-600">
                    VA Number: {data.payment_method.virtual_account_number}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Summary */}
            <Card className="bg-gray-100 shadow-md">
              <CardHeader>
                <CardTitle className="text-lg font-semibold">
                  Payment Summary
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Total Amount</span>
                  <span className="text-lg font-semibold text-blue-600">
                    {formatToIDR(data.totalAmount)}
                  </span>
                </div>
                {data.status === "pending" && (
                  <div className="mt-4 space-y-3">
                    <UpdateStatusButton
                      transaksiId={data.id}
                      currentStatus={data.status}
                    />
                    <CancelTransaksiButton
                      transaksiId={data.id}
                      invoiceId={data.invoiceId}
                    />
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Proof of Payment */}
            {data.proofPaymentUrl && (
              <Card className="bg-gray-100 shadow-md">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold">
                    Proof of Payment
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Dialog>
                    <DialogTrigger asChild>
                      <img
                        src={data.proofPaymentUrl}
                        alt="Proof of Payment"
                        className="w-full rounded-lg cursor-pointer hover:opacity-80"
                      />
                    </DialogTrigger>
                    <DialogContent className="max-w-3xl">
                      <img
                        src={data.proofPaymentUrl}
                        alt="Proof of Payment"
                        className="w-full h-auto rounded-lg"
                      />
                    </DialogContent>
                  </Dialog>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default TransaksiDetail;

