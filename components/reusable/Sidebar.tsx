"use client";
import Link from "next/link";
import { FileBox, LogOut, Settings } from "lucide-react";

import { DataNavDashboard } from "@/utils/dataNavDashboard";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { OrganizationSwitcher, useAuth, useUser } from "@clerk/nextjs";
import Image from "next/image";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Skeleton } from "@/components/ui/skeleton";

export function Sidebar() {
  const pathname = usePathname();
  const { user } = useUser();

  const { signOut } = useAuth();
  const router = useRouter();

  const handleSignOut = async () => {
    router.push("/");
    await signOut();
  };

  return (
    <div className="hidden border-r bg-primary md:block pt-2 shadow-lg shadow-blue-500/50 fixed h-screen inset-y-0 left-0 z-10 w-56">
      <div className="flex h-full max-h-screen flex-col gap-3">
        <div className="flex h-14 items-center px-4 lg:h-[60px] lg:px-6">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <FileBox className="h-6 w-6 text-white" />
            <span className="text-white text-[20px]">NovariaFile</span>
          </Link>
        </div>
        <div className="flex-1">
          <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
            {DataNavDashboard.map((item) => (
              <Link
                key={item.key}
                href={item.link}
                className={`flex items-center gap-3 rounded-lg px-3 py-3 transition-all hover:text-primary, ${cn(pathname === item.link ? "bg-white text-zinc-900" : "bg-transparent text-white")}`}
              >
                {item.icon}
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
        <div className="mt-auto rounded-lg bg-white m-4 p-2 pb-4 flex flex-col gap-3">
          <h3 className="mb-4 pl-2 pt-2 text-[14px] font-semibold">
            Setting Organization & Account
          </h3>
          <div className="flex items-center">
            <OrganizationSwitcher
              appearance={{
                elements: {
                  organizationSwitcherTrigger: {
                    // width: "180px",
                    // backgroundColor: "#000",
                    color: "#333",
                    paddingTop: "4px",
                    paddingBottom: "4px",
                    // padding: "10px",
                    fontSize: "14px",
                    // "&:hover": {
                    //   backgroundColor: "#fff",
                    // },
                  },
                },
              }}
            />
          </div>
          {user ? (
            <Popover>
              <PopoverTrigger asChild>
                <div className="flex w-full items-center space-x-3 cursor-pointer pl-1 py-1 rounded-lg">
                  <div>
                    <Image
                      src={user?.imageUrl!}
                      alt="img-avatar"
                      className="rounded-full"
                      width={25}
                      height={25}
                    />
                  </div>
                  <div className="text-zinc-900">
                    <p className="text-[12px] font-medium">{user?.fullName}</p>
                  </div>
                </div>
              </PopoverTrigger>
              <PopoverContent className="ml-4 mb-2">
                <div className="flex flex-col gap-5">
                  <div className="flex w-full items-center space-x-2">
                    <div>
                      <Image
                        src={user?.imageUrl!}
                        alt="img-avatar"
                        className="rounded-full"
                        width={20}
                        height={20}
                      />
                    </div>
                    <div className="text-zinc-900">
                      <p className="text-[14px] font-medium">
                        {user?.fullName}
                      </p>
                      <p className="text-[14px] font-medium">
                        {user?.emailAddresses[0].emailAddress}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 cursor-pointer">
                    <Settings size={18} />
                    <p className="text-[14px] font-medium">Manage Accounts</p>
                  </div>
                  <div
                    onClick={() => handleSignOut()}
                    className="flex items-center space-x-2 cursor-pointer"
                  >
                    <LogOut size={18} />
                    <p className="text-[14px] font-medium">Log Out</p>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          ) : (
            <div className="flex items-center space-x-2">
              <Skeleton className="h-8 w-8 rounded-full" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-[150px]" />
              </div>
            </div>
          )}
          <div
            onClick={() => handleSignOut()}
            className="flex items-center space-x-[14px] cursor-pointer pl-2 py-1"
          >
            <LogOut size={18} />
            <p className="text-[12px] font-medium">Log Out</p>
          </div>
        </div>
      </div>
    </div>
  );
}
