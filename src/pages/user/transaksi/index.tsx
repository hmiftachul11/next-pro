import Layout from "@/components/Layout";
import useGetTransaksi from "@/hooks/transaksi/useGetTransaksi";
import { formatToIDR } from "@/helper/convertIDR";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  Calendar,
  Clock,
  CreditCard,
  Loader2,
  AlertCircle,
  Receipt,
  CheckCircle,
  Edit3Icon,
  Trash2Icon,
} from "lucide-react";
import { FORMAT_DATE } from "@/helper/convertTime";
import Link from "next/link";
import { TableSkeleton } from "@/components/content/Skeleton";

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

const TransaksiPage = () => {
  const { data, isLoading, error } = useGetTransaksi();

  if (isLoading) {
    return (
      <Layout>
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
          <div className="flex items-center space-x-3">
            <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
            <p className="text-lg font-medium text-gray-700">
              Fetching transactions...
            </p>
          </div>
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <div className="flex flex-col items-center justify-center h-screen bg-red-50">
          <AlertCircle className="h-10 w-10 text-red-500 mb-4" />
          <p className="text-lg font-medium text-red-600">{error}</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container min-h-screen mx-auto px-6 py-8 mt-[5rem]">
        {/* Header Section */}
        <div className="bg-gradient-to-br from-[#4392F7] to-purple-600 text-white p-6 rounded-xl shadow-md mb-10">
          <h1 className="text-3xl font-bold">Transaction History</h1>
        </div>

        {/* Summary Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <div className="bg-white shadow rounded-lg p-6 flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Transactions</p>
              <p className="text-3xl font-bold text-gray-800">{data.length}</p>
            </div>
            <div className="bg-indigo-100 p-3 rounded-full">
              <Receipt className="h-8 w-8 text-[#4392F7]" />
            </div>
          </div>

          <div className="bg-white shadow rounded-lg p-6 flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Amount</p>
              <p className="text-3xl font-bold text-gray-800">
                {formatToIDR(
                  data.reduce((sum, transaction) => sum + transaction.totalAmount, 0)
                )}
              </p>
            </div>
            <div className="bg-purple-100 p-3 rounded-full">
              <CreditCard className="h-8 w-8 text-[#4392F7]" />
            </div>
          </div>

          <div className="bg-white shadow rounded-lg p-6 flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Completed Transactions</p>
              <p className="text-3xl font-bold text-gray-800">
                {
                  data.filter((transaction) => transaction.status === "success")
                    .length
                }
              </p>
            </div>
            <div className="bg-green-100 p-3 rounded-full">
              <CheckCircle className="h-8 w-8 text-green-500" />
            </div>
          </div>
        </div>

        {/* Table Section */}
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="bg-gray-100 px-6 py-4">
            <h2 className="text-lg font-semibold text-gray-700">
              Transaction Details
            </h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-gray-600">
              <thead className="bg-indigo-50 text-indigo-700">
                <tr>
                  <th className="px-6 py-3">Invoice ID</th>
                  <th className="px-6 py-3">Status</th>
                  <th className="px-6 py-3">Amount</th>
                  <th className="px-6 py-3">Payment Method</th>
                  <th className="px-6 py-3">Order Date</th>
                  <th className="px-6 py-3">Expired Date</th>
                </tr>
              </thead>
              <tbody>
                {data.map((transaction, index) => (
                  <tr
                    key={transaction.id}
                    className={`hover:bg-gray-50 ${
                      index % 2 === 0 ? "bg-white" : "bg-gray-50"
                    }`}
                  >
                    <td className="px-6 py-3">
                      <Link
                        href={`/transaksi/${transaction.id}`}
                        className="text-indigo-600 hover:underline font-medium"
                      >
                        {transaction.invoiceId}
                      </Link>
                    </td>
                    <td className="px-6 py-3">
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-sm ${
                          transaction.status === "success"
                            ? "bg-green-100 text-green-700"
                            : transaction.status === "pending"
                            ? "bg-yellow-100 text-yellow-700"
                            : transaction.status === "cancelled"
                            ? "bg-red-100 text-red-700"
                            : "bg-gray-100 text-gray-700"
                        }`}
                      >
                        {transaction.status}
                      </span>
                    </td>
                    <td className="px-6 py-3 font-medium">
                      {formatToIDR(transaction.totalAmount)}
                    </td>
                    <td className="px-6 py-3">{transaction.payment_method.name}</td>
                    <td className="px-6 py-3">{FORMAT_DATE(transaction.orderDate)}</td>
                    <td className="px-6 py-3">{FORMAT_DATE(transaction.expiredDate)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default TransaksiPage;


