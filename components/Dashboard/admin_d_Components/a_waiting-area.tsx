"use client";
import {
  CircleCheckBig,
  CircleX,
  MoreHorizontal,
  PlusCircle,
} from "lucide-react";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import ImageUpload from "@/components/UploadImage";
import axios from "axios";
import Image from "next/image";
import { useState } from "react";
import Swal from "sweetalert2";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { ThreeCircles, ThreeDots } from "react-loader-spinner";
import React from 'react';
import { categories } from "@/constant/categories";

const fetchToolsThatAreNotApproved = async () => {
  const response = await axios.get("/api/get-all-tools-not-aprroved");
  console.log("Fetched Tools data:", response.data);
  return response.data;
};

interface ToolsForApproval {
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

const WaitingArea = () => {
  const queryClient = useQueryClient();

  const [title, setTitle] = useState("");
  const [bio, setBio] = useState("");
  const [description, setDesc] = useState("");
  const [url, setUrl] = useState("");
  const [price, setPrice] = useState("");
  const [logo, setLogo] = useState("");
  const [category, setCategory] = useState("");
  const [myLoading, setMyLoading] = useState(false);
  const [mybtnLoading, setMybtnLoading] = useState(false);

  const {
    data: tools_pending,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["toolsnotapproved"],
    queryFn: fetchToolsThatAreNotApproved,
    staleTime: 900000,
    gcTime: 86400000,
    retry: false,
    refetchOnWindowFocus: false,
  });

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setMybtnLoading(true);
    try {
      const response = await axios.post("/api/add-tool", {
        title,
        bio,
        description,
        url,
        price,
        category,
        logo,
      });

      if (response.status === 200) {
        Swal.fire({
          title: "Tool created Successfully",
          text: "Your tool is submitted. Now wait for the admins to approve.",
          icon: "success",
          showConfirmButton: false,
          timer: 6000,
          timerProgressBar: true,
          customClass: {
            container: "custom-swal",
          },
          showClass: {
            popup: "animate__animated animate__fadeInUp animate__faster",
          },
          hideClass: {
            popup: "animate__animated animate__fadeOutDown animate__faster",
          },
        });
        setTitle("");
        setBio("");
        setDesc("");
        setUrl("");
        setPrice("");
        setLogo("");
        setCategory("");
      }
    } catch (error: unknown) {
      let errorMessage = "Unknown error occurred";

      if (axios.isAxiosError(error) && error.response && error.response.data) {
        errorMessage = error.response.data.error || errorMessage;
      }

      Swal.fire({
        title: "Tool creation failed",
        text: errorMessage,
        icon: "error",
        showConfirmButton: false,
        timer: 6000,
        timerProgressBar: true,
        customClass: {
          container: "z-999",
        },
        showClass: {
          popup: "animate__animated animate__fadeInUp animate__faster",
        },
        hideClass: {
          popup: "animate__animated animate__fadeOutDown animate__faster",
        },
      });
    }
    setMybtnLoading(false);
  };

  const handleApprove = async (id: string) => {
    const approved = "approved";
    setMyLoading(true);
    console.log(myLoading);

    try {
      const response = await axios.patch("/api/update-tool-status", {
        approved,
        id,
      });
      if (response.status === 200) {
        Swal.fire({
          title: "Tool approved successfully",
          icon: "success",
          timer: 3000,
          timerProgressBar: true,
          showClass: {
            popup: "animate__animated animate__fadeInUp animate__faster",
          },
          hideClass: {
            popup: "animate__animated animate__fadeOutDown animate__faster",
          },
        });
        queryClient.invalidateQueries({ queryKey: ["toolsnotapproved"] });
      }
    } catch (error) {
      console.log(error);
    }
    setMyLoading(false);
  };

  const handleRejection = async (id: string) => {
    const approved = "rejected";
    setMyLoading(true);
    try {
      const response = await axios.patch("/api/update-tool-status", {
        approved,
        id,
      });
      if (response.status === 200) {
        Swal.fire({
          title: "Tool rejected successfully",
          icon: "success",
          timer: 3000,
          timerProgressBar: true,
          showClass: {
            popup: "animate__animated animate__fadeInUp animate__faster",
          },
          hideClass: {
            popup: "animate__animated animate__fadeOutDown animate__faster",
          },
        });
        queryClient.invalidateQueries({ queryKey: ["toolsnotapproved"] });
      }
    } catch (error) {
      console.log(error);
    }
    setMyLoading(false);
  };

  if (isLoading || myLoading) {
    console.log("object");
    return (
      <div className="h-screen flex items-center justify-center gap-x-4">
        <div>Processing your request</div>
        <ThreeDots
          visible={true}
          height="40"
          width="40"
          color="#000000"
          ariaLabel="three-circles-loading"
          wrapperStyle={{}}
          wrapperClass=""
        />
      </div>
    );
  }

  return (
    <div>
      <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
        <Tabs defaultValue="all">
          <div className="flex items-center">
            <Dialog>
              <DialogTrigger asChild>
                <div className="ml-auto flex items-center gap-2">
                  <Button size="sm" className="h-7 gap-1">
                    <PlusCircle className="h-3.5 w-3.5" />
                    <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                      Add Product
                    </span>
                  </Button>
                </div>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[50%] h-screen overflow-y-auto">
                <form onSubmit={handleSubmit}>
                  <DialogHeader>
                    <DialogTitle>Add a tool</DialogTitle>
                    <DialogDescription>
                      Enter information about your tool below
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="title" className="text-right">
                        Title
                      </Label>
                      <Input
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="col-span-3 w-full"
                        placeholder="Title...."
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="bio" className="text-right">
                        One liner
                      </Label>
                      <Input
                        id="bio"
                        value={bio}
                        onChange={(e) => setBio(e.target.value)}
                        className="col-span-3"
                        placeholder="One liner....."
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="desc" className="text-right">
                        Description
                      </Label>
                      <Input
                        id="desc"
                        value={description}
                        onChange={(e) => setDesc(e.target.value)}
                        className="col-span-3"
                        placeholder="description....."
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="url" className="text-right">
                        Url to website/tool
                      </Label>
                      <Input
                        id="url"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        className="col-span-3"
                        placeholder="Url"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="price" className="text-right">
                        Price
                      </Label>
                      <Input
                        id="price"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        className="col-span-3"
                        placeholder="Price"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="logo" className="text-right">
                        Input logo
                      </Label>
                      <div className="col-span-3">
                        <ImageUpload
                          value={logo}
                          onChange={(image) => setLogo(image)}
                          label="Upload logo"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="category" className="text-right">
                        Select Category
                      </Label>
                      <Select value={category} onValueChange={setCategory}>
                        <SelectTrigger className="w-full col-span-3">
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Categories</SelectLabel>
                            {categories.map((category, index) => (
                              <SelectItem
                                key={index}
                                value={category.toLowerCase()}
                              >
                                {category}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button disabled={mybtnLoading} type="submit">
                      {mybtnLoading ? (
                        <>
                          <span className="mx-3">Saving changes</span>
                          <ThreeDots
                            visible={true}
                            height="30"
                            width="30"
                            color="#ffffff"
                            ariaLabel="three-circles-loading"
                            wrapperStyle={{}}
                            wrapperClass=""
                          />
                        </>
                      ) : (
                        <>Save changes</>
                      )}
                    </Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </div>
          <TabsContent value="all">
            <Card x-chunk="dashboard-06-chunk-0">
              <CardHeader>
                <CardTitle>Tools</CardTitle>
                <CardDescription>
                  Manage your products and view their sales performance.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="hidden w-[100px] sm:table-cell">
                        <span className="sr-only">Image</span>
                      </TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead className="hidden md:table-cell">
                        Created at
                      </TableHead>
                      <TableHead>
                        <span className="sr-only">Actions</span>
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {tools_pending?.map((tool: ToolsForApproval) => (
                      <TableRow key={tool.id}>
                        <TableCell className="hidden sm:table-cell">
                          <Image
                            alt="Product image"
                            className="aspect-square rounded-md object-cover"
                            height="64"
                            src={tool.logo}
                            width="64"
                          />
                        </TableCell>
                        <TableCell className="font-medium">
                          {tool.title}
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">{tool.approved}</Badge>
                        </TableCell>
                        <TableCell>{tool.price}</TableCell>
                        <TableCell className="hidden md:table-cell">
                          {format(new Date(tool.createdAt), "dd-MM-yyyy")}
                        </TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button
                                aria-haspopup="true"
                                size="icon"
                                variant="ghost"
                              >
                                <MoreHorizontal className="h-4 w-4" />
                                <span className="sr-only">Toggle menu</span>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuItem
                                className="items-center gap-x-1"
                                onClick={() => handleApprove(tool.id)}
                              >
                                <CircleCheckBig className="w-4 h-4 text-green-600" />
                                Approve
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                className="items-center gap-x-1"
                                onClick={() => handleRejection(tool.id)}
                              >
                                <CircleX className="w-4 h-4 text-red-600" />
                                Disapprove
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
              <CardFooter></CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default WaitingArea;
