"use client";
import React, { useState } from "react";
import Image from "next/image";
import ImgNotFound from "@/assets/svg/not-found.svg";
import UploadFileComponent from "../page/dashboard/files/UploadFileComponent";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";

interface NotFoundProps {
  desc: string;
  isFavorited?: boolean;
}

const NotFound = ({ isFavorited, desc }: NotFoundProps) => {
  const [isOpenUploaded, setIsOpenUploaded] = useState(false);

  const handleModalDialog = () => {
    setIsOpenUploaded(false);
  };
  return (
    <div className="flex justify-center flex-col items-center gap-4 text-center w-full mt-20">
      <div>
        <Image src={ImgNotFound} alt="img-not-found" width={300} height={300} />
      </div>
      <h2 className="font-semibold text-zinc-800 text-[24px]">{desc}</h2>
      {!isFavorited && (
        <Dialog open={isOpenUploaded} onOpenChange={setIsOpenUploaded}>
          <DialogTrigger asChild>
            <Button>Upload File</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="mb-5">Upload Your File</DialogTitle>
              <UploadFileComponent handleModalDialog={handleModalDialog} />
            </DialogHeader>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default NotFound;
