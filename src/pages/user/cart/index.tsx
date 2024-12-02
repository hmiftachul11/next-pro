import Layout from "@/components/Layout";
import useGetCart from "@/hooks/cart/useGetCart";
import React, { useState } from "react";
import { ShoppingBag, Loader2, AlertCircle, Trash2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Separator } from "@/components/ui/separator";
import { FORMAT_DATE } from "@/helper/convertTime";
import { formatToIDR } from "@/helper/convertIDR";
import Link from "next/link";
import DeleteCartButton from "@/components/views/Cart/DeleteCartButton";
import QuantityControl from "@/components/views/Cart/QuantityControl";
import { Checkbox } from "@/components/ui/checkbox";
import PaymentMethod from "@/hooks/cart/usePayment";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import CreateTransaksi from "@/components/views/Cart/CreateTransaksi";
import { DashboardSkeleton } from "@/components/content/Skeleton";
import { useBreadcrumb } from "@/hooks/useBreadcrumb";
import { CustomBreadcrumb } from "@/components/ui/custom-breadcrumb";

const Cart = () => {
  const breadcrumbItems = useBreadcrumb();
  const { data, isLoadingCart, errorCart } = useGetCart();
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const { ListPayment } = PaymentMethod();
  const [selectedPayment, setSelectedPayment] = useState<string>(""); // State untuk menyimpan ID payment yang dipilih

  if (isLoadingCart) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin" />
          <DashboardSkeleton />
        </div>
      </Layout>
    );
  }

  if (errorCart) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center text-red-500">
            <AlertCircle className="h-8 w-8 mx-auto mb-2" />
            <p>{errorCart}</p>
          </div>
        </div>
      </Layout>
    );
  }

  // Handle checkbox individu
  const handleItemSelect = (itemId: string) => {
    setSelectedItems((prev) => {
      if (prev.includes(itemId)) {
        return prev.filter((id) => id !== itemId);
      } else {
        return [...prev, itemId];
      }
    });
  };

  // Handle select all checkbox
  const handleSelectAll = () => {
    if (selectedItems.length === data.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(data.map((item) => item.id));
    }
  };

  //   const calculateSubtotal = () => {
  //     return data.reduce((total, item) => {
  //
  //   };

  const calculateSubtotal = () => {
    return data
      .filter((item) => selectedItems.includes(item.id))
      .reduce((total, item) => {
        const itemPrice = item.activity.price;
        return total + itemPrice * item.quantity;
      }, 0);
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50 pt-20">
        <div className="container mx-auto px-4 py-8">
          {/* Header Section */}
          <div className="max-w-7xl mx-auto mb-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Shopping Cart</h1>
                <p className="mt-1 text-gray-500">
                  {data.length} {data.length === 1 ? "item" : "items"} in your cart
                </p>
              </div>
              <Link href="/activity">
                <Button variant="outline" className="mt-4 md:mt-0">
                  Continue Shopping
                </Button>
              </Link>
            </div>
          </div>

          {data.length === 0 ? (
            <Card className="max-w-2xl mx-auto">
              <CardContent className="flex flex-col items-center py-16">
                <ShoppingBag className="h-16 w-16 text-gray-400 mb-6" />
                <h2 className="text-2xl font-semibold mb-3">Your cart is empty</h2>
                <p className="text-gray-500 mb-8 text-center">
                  Looks like you haven&apos;t added any activities to your cart yet
                </p>
                <Link href="/activity">
                  <Button size="lg">Discover Activities</Button>
                </Link>
              </CardContent>
            </Card>
          ) : (
            <div className="max-w-7xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Cart Items */}
                <div className="lg:col-span-2">
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-6 pb-4 border-b">
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            checked={selectedItems.length === data.length && data.length > 0}
                            onCheckedChange={handleSelectAll}
                          />
                          <span className="font-medium">Select All</span>
                        </div>
                        <span className="text-sm text-gray-500">
                          {selectedItems.length} selected
                        </span>
                      </div>

                      <div className="space-y-6">
                        {data.map((cart) => (
                          <div key={cart.id}
                            className="flex gap-4 p-4 rounded-lg hover:bg-gray-50 transition-colors">
                            <Checkbox
                              checked={selectedItems.includes(cart.id)}
                              onCheckedChange={() => handleItemSelect(cart.id)}
                              className="mt-2"
                            />

                            <div className="w-28 h-28 rounded-lg overflow-hidden flex-shrink-0">
                              <img
                                src={cart.activity.imageUrls[0] || "/api/placeholder/200/200"}
                                alt={cart.activity.title}
                                className="w-full h-full object-cover"
                              />
                            </div>

                            <div className="flex-1">
                              <div className="flex justify-between">
                                <div>
                                  <h3 className="font-semibold text-lg mb-1">{cart.activity.title}</h3>
                                  <p className="text-gray-600 text-sm mb-2">{cart.activity.city}</p>
                                  <p className="text-xs text-gray-400">
                                    Added on {FORMAT_DATE(cart.createdAt)}
                                  </p>
                                </div>
                                <div className="text-right">
                                  <div className="text-lg font-semibold">
                                    {formatToIDR((cart.activity.price_discount || cart.activity.price) * cart.quantity)}
                                  </div>
                                  <QuantityControl
                                    cartId={cart.id}
                                    initialQuantity={cart.quantity}
                                    activityName={cart.activity.title}
                                  />
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    className="mt-2 text-red-500 hover:text-red-600"
                                  >
                                    <Trash2 className="h-4 w-4 mr-1" />
                                    Remove
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Order Summary */}
                <div className="lg:col-span-1">
                  <Card className="sticky top-4">
                    <CardContent className="p-6">
                      <h2 className="text-xl font-semibold mb-6">Order Summary</h2>

                      <div className="space-y-4 mb-6">
                        <div className="flex justify-between">
                          <span>Subtotal</span>
                          <span className="font-medium">{formatToIDR(calculateSubtotal())}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Service Fee</span>
                          <span className="text-green-600">Free</span>
                        </div>
                        <Separator />
                        <div className="flex justify-between text-lg font-semibold">
                          <span>Total</span>
                          <span>{formatToIDR(calculateSubtotal())}</span>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <h3 className="font-medium">Payment Method</h3>
                        <RadioGroup
                          value={selectedPayment}
                          onValueChange={setSelectedPayment}
                          className="space-y-3"
                        >
                          {ListPayment.map((payment) => (
                            <div
                              key={payment.id}
                              className={`flex items-center justify-between p-4 rounded-lg border transition-all ${selectedPayment === payment.id
                                  ? "border-blue-500 bg-blue-50"
                                  : "border-gray-200 hover:border-gray-300"
                                }`}
                            >
                              <RadioGroupItem value={payment.id} id={payment.id} />
                              <img
                                src={payment.imageUrl}
                                alt={payment.name}
                                className="h-8 object-contain"
                              />
                            </div>
                          ))}
                        </RadioGroup>

                        {selectedItems.length > 0 && selectedPayment ? (
                          <CreateTransaksi
                            cartIds={selectedItems}
                            paymentMethodId={selectedPayment}
                          />
                        ) : (
                          <Button
                            className="w-full"
                            disabled
                          >
                            Select items and payment method
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Cart;
