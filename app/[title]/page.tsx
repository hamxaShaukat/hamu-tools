"use client";
import DirectoryPage from "@/components/Home/ToolDirectory";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import { useRouter, usePathname } from "next/navigation";

const UUU = () => {
  const router = useRouter();
  const pathname = usePathname();

  // Extract the tool name from the URL
  const toolName = decodeURIComponent(pathname.split("/").pop() || "");

  console.log("Extracted Tool Name:", toolName); // Add this line to debug

  const fetchCurrentTool = async () => {
    console.log('object')
    const response = await axios.post("/api/get-current-tool", {
      selectedTool: toolName,
    });
    console.log("Fetched Tools data:", response.data);
    return response.data;
  };

  const {
    data: curr_tool,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["currenttool", toolName], // Include toolName in queryKey
    queryFn: fetchCurrentTool,
    staleTime: 900000,
    gcTime: 86400000,
    retry: false,
    refetchOnWindowFocus: false,
    enabled: !!toolName, // Ensure the query runs only when toolName is available
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error.message}</div>;

  return (
    <div>
      <DirectoryPage
        title={curr_tool.title}
        description={curr_tool.description}
        bio={curr_tool.bio}
        category={curr_tool.category}
        likes={curr_tool.likes}
        price={89}
        logo={curr_tool.logo}
        url={curr_tool.url}
        key={curr_tool.title}
      />
    </div>
  );
};

export default UUU;
