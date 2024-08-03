"use client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { Separator } from "../ui/separator";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { RootState } from "@/lib/Store/store";
import { setTitle } from "@/lib/feature/Title/TitleSlice"; 
import { categories } from "@/constant/categories";

const fetchAllTools = async () => {
  const response = await axios.get("/api/get-all-tools-aprroved");
  console.log("Fetched Tools data:", response.data);
  return response.data;
};

interface ToolsForShowcase {
  id: string;
  logo: string;
  title: string;
  bio: string;
  description: string;
  category: string;
  approved: string;
  price: string;
  createdAt: string;
}

export default function Showcase() {
  const dispatch = useDispatch();
  const router = useRouter();

  const {
    data: tools_show,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["alltools"],
    queryFn: fetchAllTools,
    staleTime: 900000,
    gcTime: 86400000,
    retry: false,
    refetchOnWindowFocus: false,
  });
  
  console.log(tools_show);

  const searchTerm = useSelector((state: RootState) => state.name.value);
  const selectedCategory = useSelector((state: RootState) => state.category.value);
  console.log(selectedCategory);
  const filteredItems = tools_show?.filter(
    (item:ToolsForShowcase) =>
      (item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.category.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (selectedCategory === "All" || item.category.toLowerCase() === selectedCategory.toLowerCase())
  );

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error.message}</div>;

  const handleItemClick = (title: string) => {
    dispatch(setTitle(title));
    router.push(`/${title}`);
  };

  return (
    <section className="w-full my-12 py-12 bg-gray-100">
      <div className="text-center text-3xl font-black capitalize mb-16">
        All Tools below
      </div>
      <Separator className="my-4" />
      <div className="container grid gap-8 px-4 md:grid-cols-2 lg:grid-cols-4 md:px-6">
        {filteredItems.map((tool: ToolsForShowcase) => (
          <div
            key={tool.id}
            className="group bg-white relative overflow-hidden rounded-lg shadow-sm transition-all hover:scale-[1.02] hover:shadow-md"
            onClick={() => handleItemClick(tool.title)}
          >
            <Link href="#" className="absolute inset-0 z-10" prefetch={false}>
              <span className="sr-only">View</span>
            </Link>
            <div className="relative w-full h-48"> {/* Set height for uniform size */}
              <Image
                src={tool.logo}
                alt={tool.title}
                layout="fill" // Fill the container
                objectFit="cover" // Ensure the image covers the container
                className="transition-opacity group-hover:opacity-80"
              />
            </div>
            <div className="p-4">
              <h3 className="text-lg font-semibold tracking-tight">
                {tool.title}
              </h3>
              <p className="text-muted-foreground">{tool.bio}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
