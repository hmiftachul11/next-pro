import useCategory from "./hooks/useCategory";
import Link from "next/link";
import { CardSkeleton } from "@/components/content/Skeleton";

const CategoryContent = () => {
    const { data, isLoading, error } = useCategory();

    return (
        <div
            className="relative px-6 py-16 md:px-12 lg:px-20 xl:px-32 mx-auto"
            style={{
                backgroundImage:
                    "url(https://images.unsplash.com/photo-1716389091984-4500122e5c45?q=80&w=3348&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)",
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
            }}
        >
            {isLoading && <CardSkeleton />}
            {error && <div>{error}</div>}
            {data.length > 0 ? (
                <div className="flex flex-wrap bg-white bg-opacity-70 shadow-lg rounded-xl overflow-hidden">
                    {/* Left Section */}
                    <div className="w-full md:w-1/2 p-6 md:p-8 lg:py-12 lg:px-10 rounded-l-xl bg-[#4392F6] bg-opacity-80">
                        <div className="flex flex-col justify-center h-full text-center md:text-left">
                            <h1 className="text-3xl md:text-4xl font-extrabold mb-4 text-white">
                                Explore Our Destinations
                            </h1>
                            <p className="text-base md:text-lg mb-6 text-white leading-relaxed">
                                Discover destinations tailored to your interests. Your adventure
                                awaits!
                            </p>
                            <Link href="/activity">
                                <button className="bg-white text-[#4392F6] rounded-full font-bold shadow-md hover:shadow-lg hover:bg-blue-50 transition-all w-full sm:w-56 h-12">
                                    Explore Destinations
                                </button>
                            </Link>
                        </div>
                    </div>

                    {/* Right Section */}
                    <div className="w-full md:w-1/2 p-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {/* Small Images */}
                            {data.slice(0, 2).map((category) => (
                                <div
                                    key={category.id}
                                    className="relative rounded-lg overflow-hidden group"
                                >
                                    <Link href={`promo/${category.id}`}>
                                        <img
                                            src={category.imageUrl}
                                            alt={category.name}
                                            className="w-full h-32 sm:h-44 object-cover transition-transform duration-300 group-hover:scale-105"
                                        />
                                        <div className="absolute inset-0 bg-black bg-opacity-30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                            <p className="text-white font-semibold">{category.name}</p>
                                        </div>
                                    </Link>
                                </div>
                            ))}

                            {/* Large Image */}
                            {data.length > 2 && (
                                <div className="col-span-1 sm:col-span-2 relative rounded-lg overflow-hidden group">
                                    <Link href={`promo/${data[2].id}`}>
                                        <img
                                            src={data[2].imageUrl}
                                            alt={data[2].name}
                                            className="w-full h-48 sm:h-64 object-cover transition-transform duration-300 group-hover:scale-105"
                                        />
                                        <div className="absolute bottom-0 left-0 bg-gradient-to-t from-black to-transparent p-4">
                                            <p className="text-white font-bold text-lg">{data[2].name}</p>
                                        </div>
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            ) : (
                <p className="text-center text-white">Loading categories...</p>
            )}
        </div>

    );
};

export default CategoryContent;
