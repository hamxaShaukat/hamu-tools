"use client";
import { IoIosMail, IoMdAdd } from "react-icons/io";
import TypewriterComponent from "typewriter-effect";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const Heading = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleToolSubmit = () => {
    if (session?.user.role === true) {
      router.push("/admin/tools");
    } else {
      router.push("/user/tools");
    }
  };

  const handleSubmit = async (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post('/api/add-email-to-newsletter', { email });

      if (response.status === 200) {
        Swal.fire({
          title: 'Success',
          text: 'You have successfully subscribed to our newsletter!',
          icon: 'success',
          confirmButtonText: 'Cool'
        });
      } else {
        Swal.fire({
          title: 'Error',
          text: 'Failed to subscribe to our newsletter!',
          icon: 'error',
          confirmButtonText: 'Try again'
        });
      }
    } catch (error) {
      Swal.fire({
        title: 'Error',
        text: 'An error occurred while subscribing to the newsletter!',
        icon: 'error',
        confirmButtonText: 'Try again'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      className="w-full mt-3 text-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <div className="text-3xl font-bold text-gray-900">
        Welcome to Hamu toolkit. Here you will find
      </div>
      <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-gray-500 to-gray-800 my-4">
        <TypewriterComponent
          options={{
            strings: [
              "Chatbots.",
              "Photo editing tools.",
              "Video Editing tools.",
              "Voice recognition tools.",
              "Business tools.",
              "And Much more.",
            ],
            autoStart: true,
            loop: true,
          }}
        />
      </div>
      <div className="text-gray-400 text-sm mt-6">
        Hamu tools offers a comprehensive set of tools to assist in your daily
        life. We have more than 1000 tools at affordable prices compared to the
        market.
      </div>
      <div className="mt-6 flex justify-center gap-4">
        <motion.button
          onClick={handleToolSubmit}
          className="flex items-center px-6 py-3 bg-gradient-to-r from-slate-500 to-slate-800 text-white rounded-full shadow-lg hover:bg-gradient-to-r hover:from-slate-800 hover:to-slate-500 transition-colors duration-300 ease-in-out"
        >
          <IoMdAdd className="text-xl font-semibold mr-3" />
          Submit
        </motion.button>
        <Dialog>
          <DialogTrigger asChild>
            <motion.button className="flex items-center px-6 py-3 bg-gradient-to-r from-slate-900 to-slate-700 text-white rounded-full shadow-lg hover:bg-gradient-to-r hover:from-slate-700 hover:to-slate-900 transition-colors duration-300 ease-in-out">
              <IoIosMail className="text-xl font-semibold mr-3" />
              Subscribe
            </motion.button>
          </DialogTrigger>
          <DialogContent className="max-w-[50%]">
            <Card>
              <CardHeader>
                <CardTitle>Subscribe to our newsletter</CardTitle>
                <CardDescription>
                  Stay up to date with the latest news, updates, and exclusive
                  offers.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form className="space-y-4" onSubmit={handleSubmit}>
                  <div>
                    <Label htmlFor="email" className="sr-only">
                      Email
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      className="w-full"
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? 'Subscribing...' : 'Subscribe'}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </DialogContent>
        </Dialog>
      </div>
    </motion.div>
  );
};

export default Heading;
