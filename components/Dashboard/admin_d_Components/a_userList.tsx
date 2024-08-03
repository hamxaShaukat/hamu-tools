"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { format } from "date-fns";
import { Ellipsis, MoveUp, Trash2 } from "lucide-react";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { ThreeCircles, ThreeDots } from "react-loader-spinner";
import Swal from "sweetalert2";

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

const fetchNonAdmins = async () => {
  const response = await axios.get("/api/get-non-admins");
  console.log("Fetched Tools data:", response.data);
  return response.data;
};

const NonAdminListComponent = () => {
  const { data: session, update } = useSession();
  const [myLoad, setMyLoad] = useState(false);
  const queryClient = useQueryClient();

  const {
    data: non_admins,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["nonAdmins"],
    queryFn: fetchNonAdmins,
    staleTime: 900000,
    gcTime: 86400000,
    retry: false,
    refetchOnWindowFocus: false,
  });

  const handlePromote = async (id: string) => {
    const role = true;
    setMyLoad(true);

    try {
      const response = await axios.patch("/api/change-status", {
        id,
        role,
      });
      if (response.status === 200) {
        Swal.fire({
          title: "User promoted successfully",
          text: "User successfully promoted to admin",
          icon: "success",
          showConfirmButton: false,
          timer: 4000,
          timerProgressBar: true,
          showClass: {
            popup: "animate__animated animate__fadeInUp animate__faster",
          },
          hideClass: {
            popup: "animate__animated animate__fadeOutDown animate__faster",
          },
        });
        queryClient.invalidateQueries({ queryKey: ["nonAdmins"] });
        const updatedUser = response.data.updatedUser;
        if (updatedUser && session) {
          await update({
            ...session,
            user: {
              ...session.user,
              role: updatedUser.role,
            },
          });
        }
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
          timer: 4000,
          timerProgressBar: true,
          showClass: {
            popup: "animate__animated animate__fadeInUp animate__faster",
          },
          hideClass: {
            popup: "animate__animated animate__fadeOutDown animate__faster",
          },
        });
        queryClient.invalidateQueries({ queryKey: ["nonAdmins"] });
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

  return (
    <div className="m-8">
      <Card x-chunk="dashboard-05-chunk-3">
        <CardHeader className="px-7">
          <CardTitle>Users</CardTitle>
          <CardDescription>All users for your control</CardDescription>
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
              {non_admins?.map((user: User, index: number) => (
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
                          onClick={() => handlePromote(user.id)}
                          className="flex items-center space-x-2"
                        >
                          <MoveUp className="w-4 h-4 text-green-700" />
                          <span>Promote</span>
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

export default NonAdminListComponent;
