"use client";
import React from "react";
import { FileBox, SquareMenu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DataNav } from "@/utils/dataNav";
import { useWindowSize } from "@uidotdev/usehooks";

import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useAuth } from "@clerk/nextjs";

const HeaderMobile = dynamic(() => import("./HeaderMobile"), { ssr: false });

const HomePageHeader = () => {
  const { width } = useWindowSize();
  const { push } = useRouter();
  const { isSignedIn } = useAuth();
  return (
    <>
      {width !== null && width > 768 ? (
        <div className="container hidden md:flex justify-between items-center py-6">
          <div className="flex space-x-1 items-center">
            <FileBox size={20} className="text-primary" />
            <h2 className="font-semibold text-[20px] text-primary">
              NovariaFile
            </h2>
          </div>
          <div>
            <ul className="flex space-x-10">
              {DataNav.map((item) => (
                <li key={item.key}>
                  <a className="cursor-pointer font-medium text-zinc-950">
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex space-x-3">
            {isSignedIn ? (
              <>
                <Button onClick={() => push("/dashboard/files")}>
                  Go To Dashboard
                </Button>
              </>
            ) : (
              <>
                <Button variant={"outline"} onClick={() => push("/sign-in")}>
                  Sign In
                </Button>
                <Button onClick={() => push("/sign-up")}>Sign Up</Button>
              </>
            )}
          </div>
        </div>
      ) : (
        <HeaderMobile />
      )}
    </>
  );
};

export default HomePageHeader;
