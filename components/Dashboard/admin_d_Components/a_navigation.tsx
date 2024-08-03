"use client";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { RootState } from "@/lib/Store/store";
import { setSidebarItem } from "@/lib/feature/Dashboard/sideBarSlice";
import {
  Bell,
  Hammer,
  Home,
  Package2,
  PanelLeft,
  Search,
  Settings,
  ShieldCheck,
  Users,
} from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const NavBarAdmin = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const pathname = usePathname();
  const activeItem = useSelector((state: RootState) => state.dashboard.value);
  const { data: session, status } = useSession();

  useEffect(() => {
    const path = pathname.split("/").pop();
    if (path) {
      dispatch(setSidebarItem(path.charAt(0).toUpperCase() + path.slice(1)));
    }
  }, [pathname, dispatch]);

  const handleLogout = async () => {
    await signOut();
    router.push("/");
  };
  const handleBilling =()=>{
    router.push("/billing");
  }

  const breadcrumbItems = pathname
    .split("/")
    .filter((crumb) => crumb)
    .map((crumb, index, arr) => (
      <React.Fragment key={crumb}>
        <BreadcrumbItem>
          {index === arr.length - 1 ? (
            <BreadcrumbPage className="text-black">{crumb}</BreadcrumbPage>
          ) : (
            <BreadcrumbLink
              asChild
              className="text-gray-500 pointer-events-none"
            >
              <Link href={`/${arr.slice(0, index + 1).join("/")}`}>
                {crumb}
              </Link>
            </BreadcrumbLink>
          )}
        </BreadcrumbItem>
        {index < arr.length - 1 && <BreadcrumbSeparator />}
      </React.Fragment>
    ));

  return (
    <>
      <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
        <nav className="flex flex-col items-center gap-4 px-2 sm:py-4">
          <Link
            href="/"
            className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
          >
            <Package2 className="h-4 w-4 transition-all group-hover:scale-110" />
            <span className="sr-only">Hamu Ai Tools</span>
          </Link>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href="/admin/dashboard"
                onClick={() => dispatch(setSidebarItem("Dashboard"))}
                className={`flex h-9 w-9 items-center justify-center rounded-lg transition-colors ${
                  activeItem === "Dashboard"
                    ? "bg-accent text-accent-foreground"
                    : "text-muted-foreground hover:text-foreground"
                } md:h-8 md:w-8`}
              >
                <Home className="h-5 w-5" />
                <span className="sr-only">Dashboard</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">Dashboard</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href="/admin/tools"
                onClick={() => dispatch(setSidebarItem("Tools"))}
                className={`flex h-9 w-9 items-center justify-center rounded-lg transition-colors ${
                  activeItem === "Tools"
                    ? "bg-accent text-accent-foreground"
                    : "text-muted-foreground hover:text-foreground"
                } md:h-8 md:w-8`}
              >
                <Hammer className="h-5 w-5" />
                <span className="sr-only">Tools</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">Tools</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href="/admin/users"
                onClick={() => dispatch(setSidebarItem("Users"))}
                className={`flex h-9 w-9 items-center justify-center rounded-lg transition-colors ${
                  activeItem === "Users"
                    ? "bg-accent text-accent-foreground"
                    : "text-muted-foreground hover:text-foreground"
                } md:h-8 md:w-8`}
              >
                <Users className="h-5 w-5" />
                <span className="sr-only">Users</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">Users</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href="/admin/admins"
                onClick={() => dispatch(setSidebarItem("Admins"))}
                className={`flex h-9 w-9 items-center justify-center rounded-lg transition-colors ${
                  activeItem === "Admins"
                    ? "bg-accent text-accent-foreground"
                    : "text-muted-foreground hover:text-foreground"
                } md:h-8 md:w-8`}
              >
                <ShieldCheck className="h-5 w-5" />
                <span className="sr-only">Admins</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">Admins</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href="/admin/waiting-area"
                onClick={() => dispatch(setSidebarItem("Waiting Area"))}
                className={`flex h-9 w-9 items-center justify-center rounded-lg transition-colors ${
                  activeItem === "Waiting Area"
                    ? "bg-accent text-accent-foreground"
                    : "text-muted-foreground hover:text-foreground"
                } md:h-8 md:w-8`}
              >
                <Bell className="h-5 w-5" />
                <span className="sr-only">Waiting Area</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">Waiting Area</TooltipContent>
          </Tooltip>
        </nav>
        <nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-4">
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href="/admin/settings"
                onClick={() => dispatch(setSidebarItem("Settings"))}
                className={`flex h-9 w-9 items-center justify-center rounded-lg transition-colors ${
                  activeItem === "Settings"
                    ? "bg-accent text-accent-foreground"
                    : "text-muted-foreground hover:text-foreground"
                } md:h-8 md:w-8`}
              >
                <Settings className="h-5 w-5" />
                <span className="sr-only">Settings</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">Settings</TooltipContent>
          </Tooltip>
        </nav>
      </aside>
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
          <Sheet>
            <SheetTrigger asChild>
              <Button size="icon" variant="outline" className="sm:hidden">
                <PanelLeft className="h-5 w-5" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="sm:max-w-xs">
              <nav className="grid gap-6 text-lg font-medium">
                <Link
                  href="/"
                  onClick={() => dispatch(setSidebarItem("Hamu Ai Tools"))}
                  className="group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base"
                >
                  <Package2 className="h-5 w-5 transition-all group-hover:scale-110" />
                  <span className="sr-only">Hamu Ai Tools</span>
                </Link>
                <Link
                  href="/admin/dashboard"
                  onClick={() => dispatch(setSidebarItem("Dashboard"))}
                  className={`flex items-center gap-4 px-4 py-2 transition-colors hover:bg-accent hover:text-accent-foreground ${
                    activeItem === "Dashboard"
                      ? "bg-accent text-accent-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <Home className="h-5 w-5" />
                  Dashboard
                </Link>
                <Link
                  href="/admin/tools"
                  onClick={() => dispatch(setSidebarItem("Tools"))}
                  className={`flex items-center gap-4 px-4 py-2 transition-colors hover:bg-accent hover:text-accent-foreground ${
                    activeItem === "Tools"
                      ? "bg-accent text-accent-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <Hammer className="h-5 w-5" />
                  Tools
                </Link>
                <Link
                  href="/admin/users"
                  onClick={() => dispatch(setSidebarItem("Users"))}
                  className={`flex items-center gap-4 px-4 py-2 transition-colors hover:bg-accent hover:text-accent-foreground ${
                    activeItem === "Users"
                      ? "bg-accent text-accent-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <Users className="h-5 w-5" />
                  Users
                </Link>
                <Link
                  href="/admin/admins"
                  onClick={() => dispatch(setSidebarItem("Admins"))}
                  className={`flex items-center gap-4 px-4 py-2 transition-colors hover:bg-accent hover:text-accent-foreground ${
                    activeItem === "Admins"
                      ? "bg-accent text-accent-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <ShieldCheck className="h-5 w-5" />
                  Admins
                </Link>

                <Link
                  href="/admin/waiting-area"
                  onClick={() => dispatch(setSidebarItem("Waiting Area"))}
                  className={`flex items-center gap-4 px-4 py-2 transition-colors hover:bg-accent hover:text-accent-foreground ${
                    activeItem === "Waiting Area"
                      ? "bg-accent text-accent-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <Bell className="h-5 w-5" />
                  Waiting Area
                </Link>

                <Link
                  href="/admin/settings"
                  onClick={() => dispatch(setSidebarItem("Settings"))}
                  className={`flex items-center gap-4 px-4 py-2 transition-colors hover:bg-accent hover:text-accent-foreground ${
                    activeItem === "Settings"
                      ? "bg-accent text-accent-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <Settings className="h-5 w-5" />
                  Settings
                </Link>
              </nav>
            </SheetContent>
          </Sheet>

          <nav className="flex w-full justify-end items-center gap-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon">
                  <Image
                    src={session?.user.image ?? "/user.png"}
                    alt="User Avatar"
                    width={32}
                    height={32}
                    className="w-8 h-8 rounded-full"
                  />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => router.push("/billing")}>
                  Billing
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => router.push("/admin/settings")}>
                  Settings
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </nav>
        </header>
        <div className="flex justify-start ml-3 items-center gap-2">
          <Breadcrumb>
            <BreadcrumbList>{breadcrumbItems}</BreadcrumbList>
          </Breadcrumb>
        </div>
      </div>
    </>
  );
};

export default NavBarAdmin;
