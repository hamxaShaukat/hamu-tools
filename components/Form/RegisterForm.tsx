"use client";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { SocialLogin } from "./SocialLogin";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import { useSession } from "next-auth/react";

const allowedEmailDomains = [
  "gmail.com",
  "yahoo.com",
  "outlook.com",
  "hotmail.com",
];

const formSchema = z.object({
  email: z
    .string()
    .email({ message: "Invalid email format. Please enter a valid email address." })
    .refine(
      (value) => {
        const domain = value.split("@")[1];
        return allowedEmailDomains.includes(domain);
      },
      { message: "Email domain must be one of the following: gmail.com, yahoo.com, outlook.com, hotmail.com." }
    ),
  name: z.string().min(4, { message: "Name must be at least 4 characters long." }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long." })
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/, {
      message: "Password must contain an uppercase letter, a lowercase letter, a number, and a special character.",
    }),
});

export function RegisterForm() {
  const { data: session, status } = useSession();

  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      name: "",
      password: "",
    },
  });
  useEffect(() => {
    if(session){
      router.push("/");
    }
  }, [router,session])
  


  const onSubmit = useCallback(async () => {
    try {
      const { email, name, password } = form.getValues();
      await axios.post("/api/register", {
        email,
        name,
        password,
      });

      Swal.fire({
        title: "Registration Successful",
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

      setTimeout(() => {
        router.push("/login");
      }, 3000);
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        if (error.response.data.message === "Email already exists") {
          Swal.fire({
            title: "Email already exists",
            text: "Please use a different email address.",
            icon: "error",
            showConfirmButton: true,
            showClass: {
              popup: "animate__animated animate__fadeInUp animate__faster",
            },
            hideClass: {
              popup: "animate__animated animate__fadeOutDown animate__faster",
            },
          });
        } else {
          console.error("Unexpected registration error:", error);
        }
      }
    }
  }, [form, router]);

  return (
    <div className="min-h-screen bg-black py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-teal-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative px-4 py-10 bg-black shadow-lg sm:rounded-3xl sm:p-20 ">
          <div className="max-w-md mx-auto">
            <div>
              <h2 className="text-2xl font-semibold text-center mb-6 text-white">
                Register Your Account for
              </h2>
              <div className="text-center font-black text-3xl text-transparent bg-clip-text bg-gradient-to-r from-green-500 via-green-300 to-teal-400 cursor-pointer hover:bg-gradient-to-r hover:from-teal-400 hover:via-green-300 hover:to-green-500 transition-colors duration-300">
                Hamu Ai Tools
              </div>
            </div>
            <div className="divide-y divide-gray-200">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-6">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="you@example.com"
                            {...field}
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 text-black focus:border-blue-500 transition"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="John Smith"
                            {...field}
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 text-black focus:border-blue-500 transition"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <Input
                            type="password"
                            placeholder="********"
                            {...field}
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 text-black focus:border-blue-500 transition"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button
                    type="submit"
                    className="w-full py-3 mt-4 bg-gradient-to-r from-green-500 to-teal-500 text-white text-lg rounded-md hover:bg-gradient-to-r hover:from-teal-500 hover:to-green-500 transition-colors duration-300 ease-in-out focus:ring-4 focus:ring-blue-300 focus:outline-none"
                  >
                    Submit
                  </Button>
                </form>
              </Form>
              <div className="mt-8">
                <SocialLogin />
              </div>
            </div>
            <p className="text-white mt-4">
              Already have an account?{" "}
              <Link
                href="/login"
                className="text-lg font-semibold text-transparent bg-clip-text bg-gradient-to-r from-green-500 via-green-300 to-teal-400 cursor-pointer hover:bg-gradient-to-r hover:from-teal-400 hover:via-green-300 hover:to-green-500 transition-colors duration-300"
              >
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
