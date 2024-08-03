"use client";
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
import { categories } from "@/constant/categories";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { format } from "date-fns";
import { Eraser, Pencil, PlusCircle } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { ThreeCircles, ThreeDots } from "react-loader-spinner";
import Swal from "sweetalert2";

const fetchAllTools = async () => {
  const response = await axios.get("/api/get-all-tools");
  console.log("Fetched Tools data:", response.data);
  return response.data;
};

interface ToolsForAdmin {
  id: string;
  logo: string;
  title: string;
  bio: string;
  url: string;
  description: string;
  category: string;
  approved: string;
  price: string;
  createdAt: string;
}

const ToolsListAdmin = () => {
  // State variables for form inputs
  const queryClient = useQueryClient();
  const [myLoad, setMyLoad] = useState(false);
  const [title, setTitle] = useState("");
  const [bio, setBio] = useState("");
  const [description, setDesc] = useState("");
  const [url, setUrl] = useState("");
  const [price, setPrice] = useState("");
  const [logo, setLogo] = useState("");
  const [category, setCategory] = useState("");
  const [approved, setApproved] = useState("");
  const [ismyLoading, setIsmyLoading] = useState(false);
  const [mybtnLoading, setMybtnLoading] = useState(false);
  const {
    data: tools_pending,
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

  console.log(tools_pending);

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
        queryClient.invalidateQueries({ queryKey: ["alltools"] });
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

  const handleUpdate = async (id: string) => {
    setMybtnLoading(true);

    console.log("first");
    try {
      const response = await axios.patch("/api/update-tool", {
        id,
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
          title: "Tool updated successfully",
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
        queryClient.invalidateQueries({ queryKey: ["alltools"] });
      }
    } catch (error) {
      console.log(error);
    }
    setMybtnLoading(false);
  };

  const handleDelete = async (id: string) => {
    setMyLoad(true);
    setApproved("rejected");

    try {
      const response = await axios.delete("/api/remove-tool", {
        data: { id },
      });
      if (response.status === 200) {
        Swal.fire({
          title: "Tool deleted successfully",
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
        queryClient.invalidateQueries({ queryKey: ["alltools"] });
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
              <DialogContent className="sm:max-w-[50%] max-h-full overflow-auto">
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
                          <span className="mx-3">Processing</span>
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
                    {tools_pending.map((tool: ToolsForAdmin) => (
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
                          <Badge
                            variant={
                              tool.approved === "approved"
                                ? "approved"
                                : tool.approved === "pending"
                                ? "pending"
                                : "rejected"
                            }
                          >
                            {tool.approved}
                          </Badge>
                        </TableCell>
                        <TableCell>${tool.price}</TableCell>
                        <TableCell className="hidden md:table-cell">
                          {format(new Date(tool.createdAt), "dd-MM-yyyy")}
                        </TableCell>
                        <TableCell>
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button
                                variant="grass"
                                className="items-center gap-x-1 m-2"
                              >
                                <Pencil className="w-4 h-4" />
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[50%] max-h-full overflow-auto">
                              <DialogHeader>
                                <DialogTitle>Update a tool</DialogTitle>
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
                                    defaultValue={tool.title}
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
                                    defaultValue={tool.bio}
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
                                    defaultValue={tool.description}
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
                                    defaultValue={tool.url}
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
                                    defaultValue={tool.price}
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
                                  <Label
                                    htmlFor="category"
                                    className="text-right"
                                  >
                                    Select Category
                                  </Label>
                                  <Select
                                    defaultValue={tool.category}
                                    onValueChange={setCategory}
                                  >
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
                                <Button disabled={mybtnLoading} onClick={() => handleUpdate(tool.id)}>
                                {mybtnLoading ? (
                                    <>
                                      <span className="mx-3">
                                        Saving changes
                                      </span>
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
                            </DialogContent>
                          </Dialog>
                          <Button
                            variant="bloody"
                            className="items-center gap-x-1 m-2"
                            onClick={() => handleDelete(tool.id)}
                          >
                            <Eraser className="w-4 h-4" />
                          </Button>
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

export default ToolsListAdmin;
