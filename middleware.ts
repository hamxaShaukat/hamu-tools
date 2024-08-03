import { auth } from "@/auth";

export default auth((req) => {
  const { nextUrl } = req;
  console.log("Request URL:", nextUrl.pathname);
  console.log("Auth object:", req.auth?.user.role);
  console.log("Auth object:", req.auth?.user.email);

  if(nextUrl.pathname.startsWith("/user")){

    if(!req.auth?.user){
      console.log("Redirecting to login: user not authenticated");
      return Response.redirect(new URL("/login", nextUrl));
    }
  }
  if (nextUrl.pathname.startsWith("/admin")) {
    if (!req.auth) {
      console.log("Redirecting to login: user not authenticated");
      return Response.redirect(new URL("/login", nextUrl));
    }
    if (!req.auth.user.role) {
      console.log("Redirecting to unauthorized: user role is not admin");
      return Response.redirect(new URL("/unauthorized", nextUrl));
    }
  }
});

export const config = {
  matcher: ["/admin/:path*"],
};
