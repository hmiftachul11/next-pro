import React from "react";
import DashboardLayout from "@/components/dashboard/components/DashboardLayout";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader2, Pencil } from "lucide-react";
import { TableSkeleton } from "@/components/content/Skeleton";
import UseGetAllTransaksi from "@/hooks/dashboard/transaksi/useGetAllTransaksi";
import { DataTable } from "@/components/ui/data-table";
import { FORMAT_DATE } from "@/helper/convertTime";
import { Badge } from "@/components/ui/badge";
import { formatToIDR } from "@/helper/convertIDR";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";

interface Transaksi {
  id: string;
  invoiceId: string;
  payment_method: {
    name: string;
  };
  status: string;
  totalAmount: number;
  orderDate: string;
}

const baseColumns: ColumnDef<Transaksi>[] = [
  {
    accessorKey: "invoiceId",
    header: "Invoice ID",
  },
  {
    accessorKey: "payment_method.name",
    header: "Payment Method",
  },
  {
    accessorKey: "totalAmount",
    header: "Total Amount",
    cell: ({ row }) => formatToIDR(row.getValue("totalAmount")),
  },

  {
    accessorKey: "orderDate",
    header: "Order Date",
    cell: ({ row }) => FORMAT_DATE(row.getValue("orderDate")),
  },
  {
    id: "actions",
    header: () => <div className="text-right">Actions</div>,
    cell: ({ row }) => {
      const transaksi = row.original;
      return (
        <div className="flex justify-end gap-2">
          <Link href={`/dashboard/transaksi/${transaksi.id}`}>
            <Button variant="sky" className="text-black" size="icon">
              <Pencil className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      );
    },
  },
];

const StatusBadge = ({ status }: { status: string }) => {
  let badgeStyle = "";

  if (status.toLowerCase() === "pending") {
    badgeStyle = "bg-yellow-100 text-yellow-800 hover:bg-yellow-100";
  } else if (status.toLowerCase() === "success") {
    badgeStyle = "bg-green-100 text-green-800 hover:bg-green-100";
  } else if (status.toLowerCase() === "cancelled") {
    badgeStyle = "bg-gray-100 text-gray-800 hover:bg-gray-100";
  } else if (status.toLowerCase() === "failed") {
    badgeStyle = "bg-red-100 text-red-800 hover:bg-red-100";
  } else {
    badgeStyle = "bg-gray-100 text-gray-800"; // default style
  }

  return (
    <Badge className={badgeStyle}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </Badge>
  );
};

const TransactionTable = ({ 
  data, 
  status, 
  isLoading 
}: { 
  data: Transaksi[];
  status: string;
  isLoading: boolean;
}) => {
  const filteredData = data.filter(
    (transaction) => transaction.status.toLowerCase() === status.toLowerCase()
  );

  

  const columns: ColumnDef<Transaksi>[] = [
    ...baseColumns,
    {
      accessorKey: "status",
      header: ({ column }) => (
        <div className="text-sm font-semibold text-gray-700">Status</div>
      ),
      cell: ({ row }) => <StatusBadge status={row.getValue("status")} />,
    },
  ];

  if (isLoading) {
    return (
      <Card className="w-full">
        <CardContent className="p-8">
          <div className="flex items-center justify-center space-x-4">
            <Loader2 className="h-6 w-6 animate-spin text-blue-600" />
            <p className="text-gray-600">Loading transactions...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-800 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-white">
              {status.charAt(0).toUpperCase() + status.slice(1)} Transactions
            </h2>
            <div className="flex items-center mt-2 space-x-2">
              <Badge variant="secondary" className="bg-white/20 text-white border-0">
                {filteredData.length} transaction{filteredData.length !== 1 ? 's' : ''}
              </Badge>
              {status === 'pending' && (
                <Badge variant="secondary" className="bg-yellow-400 text-yellow-900 border-0">
                  Requires Action
                </Badge>
              )}
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-0">
        {filteredData.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 px-4">
            <div className="bg-gray-100 rounded-full p-3 mb-4">
              <svg
                className="h-6 w-6 text-gray-400"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-1">No transactions found</h3>
            <p className="text-gray-500 text-center max-w-sm">
              There are currently no {status.toLowerCase()} transactions to display.
            </p>
          </div>
        ) : (
          <div className="border-t border-gray-200">
            <DataTable
              columns={columns}
              data={filteredData}
            />
          </div>
        )}
      </CardContent>
    </Card>
  );
};


const TransaksiDashboard = () => {
  const { data, isLoading, error } = UseGetAllTransaksi();

  if (error) {
    return (
      <DashboardLayout>
        <div className="p-6">
          <Card className="bg-red-50 shadow-lg">
            <CardHeader className="flex items-center gap-2">
              <ExclamationTriangleIcon className="text-red-500 h-6 w-6" />
              <CardTitle className="text-red-800">Error</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-red-600">{error}</p>
            </CardContent>
          </Card>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="p-6 bg-gray-50 min-h-screen">
        {/* Dashboard Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">
            Data Transaction
          </h1>
          <p className="text-sm text-gray-500 mt-2">
            Monitor and manage all your transactions efficiently by status.
          </p>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-lg">
          <div className="border-b p-4 flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-800">Transactions</h2>
          </div>
          <Tabs defaultValue="pending" className="space-y-6 p-6">
            {/* Tab Navigation */}
            <TabsList className="flex space-x-4">
              {[
                { label: "Pending", value: "pending" },
                { label: "Success", value: "success" },
                { label: "Cancelled", value: "cancelled" },
                { label: "Failed", value: "failed" },
              ].map((tab) => (
                <TabsTrigger
                  key={tab.value}
                  value={tab.value}
                  className="py-2 px-4 rounded-full border text-sm font-medium transition hover:bg-gray-100 hover:text-gray-900"
                >
                  {tab.label}
                  {data && (
                    <Badge
                      variant="secondary"
                      className="ml-2 bg-gray-200 text-gray-700"
                    >
                      {
                        data.filter(
                          (t) => t.status.toLowerCase() === tab.value.toLowerCase()
                        ).length
                      }
                    </Badge>
                  )}
                </TabsTrigger>
              ))}
            </TabsList>

            {/* Tab Content */}
            {["pending", "success", "cancelled", "failed"].map((status) => (
              <TabsContent key={status} value={status}>
                <TransactionTable
                  data={data || []}
                  status={status}
                  isLoading={isLoading}
                />
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default TransaksiDashboard;


