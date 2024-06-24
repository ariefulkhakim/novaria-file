"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import React, { useState } from "react";
import UploadFileComponent from "./UploadFileComponent";

interface HeaderComponentFilesProps {
  title: string;
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
}

const HeaderComponentFiles = ({
  title,
  search,
  setSearch,
}: HeaderComponentFilesProps) => {
  const [isOpenUploaded, setIsOpenUploaded] = useState(false);

  const handleModalDialog = () => {
    setIsOpenUploaded(false);
  };
  return (
    <div className="flex justify-between items-center flex-wrap gap-3">
      <h2 className="text-[32px] font-semibold">{title}</h2>
      <div className="flex w-full max-w-sm items-center">
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          type="text"
          placeholder="Search your file ......."
        />
        {/* <Button type="submit" size={"icon"}>
          <Search size={18} />
        </Button> */}
      </div>
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
    </div>
  );
};

export default HeaderComponentFiles;
