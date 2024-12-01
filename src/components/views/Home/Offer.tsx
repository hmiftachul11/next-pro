import React from 'react';
import Link from 'next/link';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from "@/components/ui/carousel";
import {
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/cardCustom";
import { Card } from "@/components/ui/card";
import { LightningBoltIcon } from "@radix-ui/react-icons";
import { Gift, Ticket } from "lucide-react";
import usePromo from "./hooks/useOffer";
import { getImageUrl } from "@/helper/defaultImg";
import { CardSkeleton } from "@/components/content/Skeleton";

const Offer = () => {
  const { data, isLoading, error } = usePromo();

  return (
    <div className="pt-20 mx-auto container px-4 sm:px-6 lg:px-8">
      {/* Vibrant Title Section */}
      <div className="flex items-center justify-center gap-4 mb-8">
        <div className="text-center">
          <div className="text-4xl sm:text-5xl md:text-6xl flex items-center justify-center font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#4393F5] to-pink-600">

            <span>Spectacular Promos</span>
          </div>
          <p className="text-slate-600 text-base sm:text-lg md:text-xl">
            Discover amazing deals that make your trip even more exciting!
          </p>
        </div>
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 md:grid-cols-1 gap-6 p-4 sm:p-6">
        {/* Carousel Section */}
        <div className="md:col-span-3">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-4">
              {isLoading && <CardSkeleton />}
              {error && <div>{error}</div>}
              {data.map((promo) => (
                <CarouselItem
                  key={promo.id}
                  className="pl-4 mb-4 basis-full sm:basis-1/2 lg:basis-1/3"
                >
                  <Link href={`promo/${promo.id}`}>
                    <div className="p-1">
                      <Card className="overflow-hidden group transition-all duration-300 hover:shadow-xl hover:scale-105">
                        <div className="relative">
                          <img
                            src={getImageUrl(promo.imageUrl)}
                            alt={promo.title}
                            className="w-full h-40 sm:h-48 md:h-56 object-cover transform group-hover:scale-110 transition-transform duration-300"
                          />
                          <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </div>
                        <CardHeader className="bg-white px-4 h-28 sm:h-32">
                          <CardTitle className="text-lg sm:text-xl font-bold text-slate-800 group-hover:text-[#4393F5] transition-colors">
                            {promo.title}
                          </CardTitle>
                          <CardDescription className="line-clamp-2 text-slate-600">
                            {promo.description}
                          </CardDescription>
                        </CardHeader>
                      </Card>
                    </div>
                  </Link>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="flex justify-center mt-8 space-x-4">
              <CarouselPrevious className="static" />
              <CarouselNext className="static" />
            </div>
          </Carousel>
        </div>
      </div>
    </div>

  );
};

export default Offer;