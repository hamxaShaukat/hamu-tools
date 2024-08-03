'use client';
import { FaGithub } from "react-icons/fa";
import { Button } from "../ui/button";
import { FcGoogle } from "react-icons/fc";
import { useState } from "react";
import { doLogin } from "@/lib/actions";

export function SocialLogin() {
  const [provider, setProvider] = useState('');

  return (
    <form action={doLogin} method="post">
      <input type="hidden" name="action" value={provider} />
      <div className="flex items-center justify-center gap-4">
        <Button
          className="bg-white text-black border border-white py-3 px-14 rounded-lg m-1 text-lg flex items-center justify-center gap-2 hover:bg-black hover:text-white transition"
          type="submit"
          onClick={() => setProvider('google')}
        >
          <FcGoogle className="text-2xl" />
          Google
        </Button>
        <Button
          className="bg-black text-white py-3 px-14 border border-white rounded-lg m-1 text-lg flex items-center justify-center gap-2 hover:bg-white hover:text-black transition"
          type="submit"
          onClick={() => setProvider('github')}
        >
          <FaGithub className="text-2xl" />
          GitHub
        </Button>
      </div>
    </form>
  );
}
