"use client";
import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { SocialLogin } from "./SocialLogin";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

const LoginForm = () => {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const { data: session, status } = useSession();
  


  useEffect(() => {
    if(session){
      router.push("/");
    }
  }, [router,session])
  

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const target = event.target as typeof event.target & {
      email: { value: string };
      password: { value: string };
    };
    const email = target.email.value;
    const password = target.password.value;

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        console.log(result.error);
        setError(result.error);
      } else {
        Swal.fire({
          title: "Login Successful",
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
          router.push("/");
        }, 3000);
      }
    } catch (error) {
      console.error("Sign-in error:", error);
      setError("An error occurred. Please try again later.");
    }
  }

  return (
    <div className="min-h-screen bg-black py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-teal-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative px-4 py-10 bg-black shadow-2xl  sm:rounded-3xl sm:p-20">
          <div className="max-w-md mx-auto">
            <div>
              <h1 className="text-2xl font-semibold text-center mb-6 text-white">
                Sign in to
              </h1>
              <div className="text-center font-black text-3xl text-transparent bg-clip-text bg-gradient-to-r from-green-500 via-green-300 to-teal-400 cursor-pointer hover:bg-gradient-to-r hover:from-teal-400 hover:via-green-300 hover:to-green-500 transition-colors duration-300">
                Hamu Ai Tools
              </div>
            </div>
            <div className="divide-y divide-gray-200">
              {error && (
                <div className="bg-red-100 text-red-700 border border-red-400 p-3 rounded mb-4">
                  {error}
                </div>
              )}
              <div className="py-8 text-base leading-6 space-y-4 text-gray-400 sm:text-lg sm:leading-7">
                <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium "
                    >
                      Email:
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 transition"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium "
                    >
                      Password:
                    </label>
                    <input
                      type="password"
                      id="password"
                      name="password"
                      required
                      className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 transition"
                    />
                  </div>
                  <Button className="w-full py-3 mt-4 bg-gradient-to-r from-green-500 to-teal-500 text-white text-lg rounded-md hover:bg-gradient-to-r hover:from-teal-500 hover:to-green-500 transition-colors duration-300 ease-in-out focus:ring-4 focus:ring-blue-300 focus:outline-none">
                    Sign in
                  </Button>
                </form>
                <div className="mt-8">
                  <SocialLogin />
                </div>
              </div>
            </div>
            <p className="text-white mt-4">
              Don&apos;t have an account?{" "}
              <Link
                href="/register"
                className="text-lg font-semibold text-transparent bg-clip-text bg-gradient-to-r from-green-500 via-green-300 to-teal-400 cursor-pointer hover:bg-gradient-to-r hover:from-teal-400 hover:via-green-300 hover:to-green-500 transition-colors duration-300"
              >
                Register
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
