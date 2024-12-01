import { CardHeader, CardTitle } from "@/components/ui/cardCustom";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import ImageCard from "@/components/ui/imageCard";
import useCategory from "./hooks/useCategory";
import Link from "next/link";
import { CardSkeleton } from "@/components/content/Skeleton";
import { Card, CardDescription } from "@/components/ui/card";
import { getImageUrl } from "@/helper/defaultImg";

const Categories = () => {
  const { data, isLoading, error } = useCategory();
  console.log(`data category`, data);
  

  return (
    <div className="mx-auto container px-4 sm:px-6 lg:px-8 mb-20">
      <div className="flex items-center justify-center gap-4 mb-8">
        <div className="text-center">
          <div className="text-4xl sm:text-5xl md:text-6xl flex items-center justify-center font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#4393F5] to-pink-600">
            <span>Travel Categories</span>
          </div>
          <p className="text-slate-600 text-base sm:text-lg md:text-xl">
            Let&lsquo;s discover the iconic attractions around you! There are plenty
            of discounts waiting for you.
          </p>
        </div>
      </div>


      <div className="px-4 sm:px-6 lg:px-10">
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent>
            {isLoading && <CardSkeleton />}
            {error && <div>{error}</div>}
            {data.map((category) => (
              <CarouselItem
                key={category.id}
                className="pl-4 mb-4 basis-full sm:basis-1/2 lg:basis-1/3"
              >
                <Link href={`category/${category.id}`}>
                  <div className="p-1">
                    <Card className="overflow-hidden group transition-all duration-300 hover:shadow-xl hover:scale-105">
                      <div className="relative">
                        <img
                          src={getImageUrl(category.imageUrl)}
                          alt={category.name}
                          className="w-full h-40 sm:h-48 md:h-56 object-cover transform group-hover:scale-110 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </div>
                      <CardHeader className="bg-white px-4 h-28 sm:h-32">
                        <CardTitle className="text-lg sm:text-xl font-bold text-slate-800 group-hover:text-[#4393F5] transition-colors">
                          {category.name}
                        </CardTitle>
                        {/* <CardDescription className="line-clamp-2 text-slate-600">
                            {category.description}
                          </CardDescription> */}
                      </CardHeader>
                    </Card>
                  </div>
                </Link>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="flex justify-center mt-4 space-x-4">
            <CarouselPrevious className="static" />
            <CarouselNext className="static" />
          </div>
        </Carousel>
      </div>
    </div>

  );
};

export default Categories;
