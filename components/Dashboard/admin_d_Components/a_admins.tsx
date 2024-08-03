"use client";
import React, { useState } from "react";
import { ThreeCircles, ThreeDots } from "react-loader-spinner";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Trash2, ArrowDown, Ellipsis } from "lucide-react";
import axios from "axios";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { format } from "date-fns";
import Swal from "sweetalert2";
import { useSession } from "next-auth/react";

type Tool = {
  id: string;
  title: string;
  // other fields...
};

type User = {
  id: string;
  name: string;
  email: string;
  type: string;
  createdAt: string;
  subscribed: boolean;
  tools: Tool[];
};

const fetchAdmins = async () => {
  const response = await axios.get("/api/get-admins");
  console.log("Fetched Tools data:", response.data);
  return response.data;
};

const AdminListComponent = () => {
  const { data: session, update } = useSession();
  const [myLoad, setMyLoad] = useState(false);

  const queryClient = useQueryClient();

  const {
    data: all_admins,
    isLoading,
    isError,
    error,
  } = useQuery<User[]>({
    queryKey: ["admins"],
    queryFn: fetchAdmins,
    staleTime: 900000,
    gcTime: 86400000,
    retry: false,
    refetchOnWindowFocus: false,
  });

  const handleDemote = async (id: string) => {
    setMyLoad(true);
    const role = false;
    try {
      const response = await axios.patch("/api/change-status", {
        id,
        role,
      });
      if (response.status === 200) {
        Swal.fire({
          title: "User demoted successfully",
          text: "Admin successfully demoted to user",
          icon: "success",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          showClass: {
            popup: "animate__animated animate__fadeInUp animate__faster",
          },
          hideClass: {
            popup: "animate__animated animate__fadeOutDown animate__faster",
          },
        });
        queryClient.invalidateQueries({ queryKey: ["admins"] });
        await update({
          ...session,
          user: {
            ...session?.user,
            role: false,
          },
        });
      }
    } catch (error) {
      console.log(error);
    }
    setMyLoad(false);
  };
  const handleDelete = async (id: string) => {
    setMyLoad(true);
    try {
      const response = await axios.delete("/api/remove-user", {
        data: { id },
      });
      if (response.status === 200) {
        Swal.fire({
          title: "User deleted successfully",
          text: "User successfully deleted",
          icon: "success",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          showClass: {
            popup: "animate__animated animate__fadeInUp animate__faster",
          },
          hideClass: {
            popup: "animate__animated animate__fadeOutDown animate__faster",
          },
        });
        queryClient.invalidateQueries({ queryKey: ["admins"] });
      }
    } catch (error) {
      console.log(error);
    }
    setMyLoad(false);
  };

  if (isLoading || myLoad)
    return (
      <div className="h-screen flex items-center justify-center gap-x-4">
        <div>Kindly wait while we complete processing</div>
        <ThreeDots
          visible={true}
          height="40"
          width="40"
          color="#000000"
          radius="9"
          ariaLabel="three-dots-loading"
          wrapperStyle={{}}
          wrapperClass=""
        />
      </div>
    );
  if (isError) return <div>Error: {error.message}</div>;

  return (
    <div className="m-8">
      <Card x-chunk="dashboard-05-chunk-3">
        <CardHeader className="px-7">
          <CardTitle>Admins</CardTitle>
          <CardDescription>All admins for your control</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Users</TableHead>
                <TableHead className="hidden sm:table-cell">Type</TableHead>
                <TableHead className="hidden md:table-cell">
                  First Signin
                </TableHead>
                <TableHead className="text-center">Number of Tools</TableHead>
                <TableHead className="text-center">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {all_admins?.map((user: User, index: number) => (
                <TableRow key={index} className="bg-accent">
                  <TableCell>
                    <div className="font-medium">{user.name}</div>
                    <div className="hidden text-sm text-muted-foreground md:inline">
                      {user.email}
                    </div>
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">
                    {user.subscribed ? "Subscribed" : "Not Subscribed"}
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    {format(new Date(user.createdAt), "dd-MM-yyyy")}
                  </TableCell>
                  <TableCell className="text-center">
                    {user.tools.length}
                  </TableCell>
                  <TableCell className="text-center">
                    <DropdownMenu>
                      <DropdownMenuTrigger className="cursor-pointer">
                        <Ellipsis className="w-4 h-4 text-zinc-700" />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent
                        align="end"
                        className="bg-white shadow-lg rounded-lg"
                      >
                        <DropdownMenuItem
                          onClick={() => handleDemote(user.id)}
                          className="flex items-center space-x-2"
                        >
                          <ArrowDown className="w-4 h-4 text-gray-700" />
                          <span>Demote</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleDelete(user.id)}
                          className="flex items-center space-x-2"
                        >
                          <Trash2 className="w-4 h-4 text-red-500" />
                          <span>Delete</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminListComponent;
