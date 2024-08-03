"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import Swal from "sweetalert2";
import axios from "axios";
import { signOut, useSession } from "next-auth/react";
import { Badge } from "@/components/ui/badge";
import { TriangleAlert } from "lucide-react";
import { useRouter } from "next/navigation";
// import { signOut } from "@/auth";

const profileFormSchema = z.object({
  username: z
    .string()
    .min(2, {
      message: "Username must be at least 2 characters.",
    })
    .max(30, {
      message: "Username must not be longer than 30 characters.",
    }),
  email: z
    .string({
      required_error: "Please select an email to display.",
    })
    .email(),
  bio: z.string().max(160).min(4),
  role: z
    .array(
      z.object({
        value: z.string().url({ message: "Please enter a valid URL." }),
      })
    )
    .optional(),
  urls: z
    .array(
      z.object({
        value: z.string().url({ message: "Please enter a valid URL." }),
      })
    )
    .optional(),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

// This can come from your database or API.
const defaultValues: Partial<ProfileFormValues> = {
  bio: "I own a computer.",
  urls: [
    { value: "https://shadcn.com" },
    { value: "http://twitter.com/shadcn" },
  ],
};

export default function ProfileFormUser() {
  const { data: session, update } = useSession();
  const router = useRouter();
  console.log(session?.user);

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues,
    mode: "onChange",
  });

  const { fields, append } = useFieldArray({
    name: "urls",
    control: form.control,
  });

  async function onSubmit(data: ProfileFormValues) {
    try {
      const response = await axios.patch("/api/update-user", {
        email: data.email,
        bio: data.bio,
        name: data.username,
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
      }
      await update({
        ...session,
        user: {
          ...session?.user,
          email: data.email,
          bio: data.bio,
          name: data.username,
        },
      });
    } catch (error) {
      console.log(error);
    }
  }

  const handleDelete = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault(); // Prevent default form submission
    try {
      const response = await axios.delete(`/api/delete-me`);

      if (response.status === 200) {
        Swal.fire({
          title: "You have successfully deleted",
          text: "Your account has been deleted. Redirecting back to the homepage.",
          icon: "success",
          showConfirmButton: false,
          timer: 3000,
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

        await signOut();
        router.push("/");
      }
    } catch (error) {
      console.log(error);
    }
  };
  if (!session?.user) {
    router.push("/register");
    return null;
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-16 m-8">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="John Smith" {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name. It can be your real name or a
                pseudonym. You can it whenever you need.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="abc@example.com" {...field} />
              </FormControl>
              <FormDescription>
                This will be your email address by which you can be
                distinguished from other users.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bio</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Tell us a little bit about yourself"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                You can <span>@mention</span> other users and organizations to
                link to them.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="role"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Role</FormLabel>
              <FormDescription className="w-3/5 ">
                You are{" "}
                <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 bg-blue-600 text-white">
                  End user
                </span>{" "}
                here. If you want to become the admin, kindly contact{" "}
                <strong>hamzashaukat714@gmail.com</strong>. He will guide you
                through the process of how you can become the administrator.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex items-center gap-x-12">
          <Button type="submit">Update profile</Button>
          <Button variant="destructive" onClick={handleDelete}>
            <TriangleAlert className="mx-3" /> Delete profile
          </Button>
        </div>
      </form>
    </Form>
  );
}
