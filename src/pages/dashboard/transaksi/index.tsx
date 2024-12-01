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
import { Pencil } from "lucide-react";
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
  isLoading,
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
      header: "Status",
      cell: ({ row }) => <StatusBadge status={row.getValue("status")} />,
    },
  ];

  if (isLoading) return <TableSkeleton />;

  return (
    <div className="bg-white border border-gray-200 shadow-lg rounded-lg overflow-hidden">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-blue-500 to-blue-700 text-white px-6 py-4">
        <h2 className="text-2xl font-semibold">
          {status.charAt(0).toUpperCase() + status.slice(1)} Transactions
        </h2>
        <p className="text-sm mt-1">
          Managing {filteredData.length} transaction(s)
        </p>
      </div>

      {/* Table Section */}
      <div className="p-6">
        {filteredData.length === 0 ? (
          <div className="text-center text-gray-500 py-10">
            No transactions found for this status.
          </div>
        ) : (
          <DataTable columns={columns} data={filteredData} />
        )}
      </div>
    </div>
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


