"use client";
import React from "react";
import Link from "next/link";
import {
  CircleUser,
  FileBox,
  Home,
  LineChart,
  Menu,
  Package,
  Package2,
  Search,
  ShoppingCart,
  Users,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
import { usePathname } from "next/navigation";
import { DataNavDashboard } from "@/utils/dataNavDashboard";
import { cn } from "@/lib/utils";
import { OrganizationSwitcher, UserButton } from "@clerk/nextjs";

const Header = () => {
  const pathname = usePathname();
  return (
    <header className="sticky top-0 z-30 flex h-14 items-center gap-4 bg-white border-b border-gray-300 px-4 lg:h-[60px] lg:px-6 justify-between">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="shrink-0 md:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="flex flex-col bg-primary">
          <nav className="grid gap-3 text-sm font-medium">
            <Link
              href="#"
              className="flex items-center gap-2 text-lg font-semibold mb-4"
            >
              <FileBox className="h-6 w-6 text-white" />
              <span className="text-white text-[20px]">NovariaFile</span>
            </Link>
            {DataNavDashboard.map((item) => (
              <Link
                key={item.key}
                href={item.link}
                className={`flex items-center gap-3 rounded-lg px-2 py-2 transition-all hover:text-primary, ${cn(pathname === item.link ? "bg-white text-zinc-900" : "bg-transparent text-white")}`}
              >
                {item.icon}
                {item.name}
              </Link>
            ))}
          </nav>
        </SheetContent>
      </Sheet>
      <div className="flex items-center">
        <p className="capitalize text-[18px] font-semibold">
          {pathname.replaceAll("/dashboard/", "")}
        </p>
      </div>
      <div className="flex items-center">{/* <OrganizationSwitcher /> */}</div>
    </header>
  );
};

export default Header;
