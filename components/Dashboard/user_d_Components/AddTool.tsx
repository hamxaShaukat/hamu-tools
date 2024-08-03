import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import React, { useState } from "react";
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
import { useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import Swal from "sweetalert2";
import ImageUpload from "@/components/UploadImage";

type Props = {};

const AddTool = (props: Props) => {
  const queryClient = useQueryClient();

  const [title, setTitle] = useState("");
  const [bio, setBio] = useState("");
  const [description, setDesc] = useState("");
  const [url, setUrl] = useState("");
  const [price, setPrice] = useState("");
  const [logo, setLogo] = useState("");
  const [category, setCategory] = useState("");

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

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
        queryClient.invalidateQueries({ queryKey: ["alltoolsuser"] });
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
  };

  return (
    <>
      <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6 min-h-screen">
        <div className="flex items-center">
          <h1 className="text-lg font-semibold md:text-2xl">Tools Inventory</h1>
        </div>
        <div
          className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm"
          x-chunk="dashboard-02-chunk-1"
        >
          <div className="flex flex-col items-center gap-1 text-center">
            <h3 className="text-2xl font-bold tracking-tight">
              You have no tools
            </h3>
            <p className="text-sm text-muted-foreground">
              You can start selling as soon as you add a tool and that tool get
              approved.
            </p>
            <Dialog>
              <DialogTrigger asChild>
                <div className="flex items-center justify-center gap-2">
                  <Button className="mt-4 items-center gap-x-3">
                    <PlusCircle className="h-3.5 w-3.5" />
                    Add tool
                  </Button>
                </div>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[50%]">
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
                            <SelectItem value="ai_tool">Ai tool</SelectItem>
                            <SelectItem value="social_media">
                              Social media
                            </SelectItem>
                            <SelectItem value="blueberry">Blueberry</SelectItem>
                            <SelectItem value="grapes">Grapes</SelectItem>
                            <SelectItem value="pineapple">Pineapple</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button type="submit">Save changes</Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </main>
    </>
  );
};

export default AddTool;

{
  /* <Button className="mt-4 items-center gap-x-3">
              <PlusCircle className="h-3.5 w-3.5" />
              Add tool
            </Button> */
}
