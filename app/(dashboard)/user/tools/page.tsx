"use client";
import AddTool from "@/components/Dashboard/user_d_Components/AddTool";
import ToolList from "@/components/Dashboard/user_d_Components/ToolList";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import { ThreeCircles } from "react-loader-spinner";

interface ToolsForUser {
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

const ToolPageUser = () => {
  const queryClient = useQueryClient();

  const fetchCurrentUser = async () => {
    const response = await axios.get("/api/current");
    return response.data;
  };

  const {
    data: currentUser,
    isLoading: isLoadingUser,
    isError: isErrorUser,
    error: errorUser,
  } = useQuery({
    queryKey: ["currentUser"],
    queryFn: fetchCurrentUser,
    staleTime: 900000,
    gcTime: 86400000,
    retry: false,
    refetchOnWindowFocus: false,
  });

  const fetchAllToolsUser = async () => {
    const response = await axios.post("/api/get-user-tools");
    return response.data;
  };

  const {
    data: tools_per_user = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["alltoolsuser", currentUser?.id],
    queryFn: fetchAllToolsUser,
    enabled: !!currentUser, 
    staleTime: 900000,
    gcTime: 86400000,
    retry: false,
    refetchOnWindowFocus: false,
  });
  console.log(tools_per_user)

  if (isLoadingUser || isLoading)
    return (
      <div className="h-screen flex items-center justify-center">
        <ThreeCircles
          visible={true}
          height="100"
          width="100"
          color="#000000"
          ariaLabel="three-circles-loading"
          wrapperStyle={{}}
          wrapperClass=""
        />
      </div>
    );

  return <div>{tools_per_user.length === 0 ? <AddTool /> : <ToolList tools={tools_per_user}  />}</div>;
};

export default ToolPageUser;
