"use client";
import HeaderComponentFiles from "@/components/page/dashboard/files/HeaderComponent";
import CardComponent from "@/components/reusable/CardContent";
import NotFound from "@/components/reusable/NotFound";
import { api } from "@/convex/_generated/api";
import { useOrganization, useUser } from "@clerk/nextjs";
import { useQuery } from "convex/react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React, { useState } from "react";
import { DataTable } from "@/components/reusable/table/data-table";
import { columns } from "@/components/reusable/table/colums";
import { GridIcon, Loader2, RowsIcon } from "lucide-react";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Doc } from "@/convex/_generated/dataModel";

interface FileScreenProps {
  title: string;
  isFavorite?: boolean;
  isDelete?: boolean;
  notFoundDesc: string;
}

const FilesScreenComponent = ({
  isFavorite,
  isDelete,
  notFoundDesc,
  title,
}: FileScreenProps) => {
  const organization = useOrganization();
  const user = useUser();
  const [search, setSearch] = useState("");
  const [type, setType] = useState<Doc<"files">["type"] | "all">("all");

  let orgId: string = "";

  if (organization.isLoaded && user.isLoaded) {
    orgId = organization.organization?.id! ?? user.user?.id!;
  }
  const files = useQuery(
    api.files.getFiles,
    orgId
      ? {
          favorites: isFavorite,
          deletedOnly: isDelete,
          query: search,
          orgId,
          type: type === "all" ? undefined : type,
        }
      : "skip"
  );

  const favorites = useQuery(
    api.files.getAllFavorites,
    orgId ? { orgId } : "skip"
  );

  const modifiedFiles =
    files?.map((file) => ({
      ...file,
      isFavorited: (favorites ?? []).some(
        (favorite) => favorite.fileId === file._id
      ),
    })) ?? [];
  return (
    <>
      {files?.length === 0 ? (
        <NotFound desc={notFoundDesc} isFavorited={isFavorite || isDelete} />
      ) : (
        <>
          <HeaderComponentFiles
            title={title}
            search={search}
            setSearch={setSearch}
          />
          <Tabs defaultValue="grid">
            <div className="flex flex-wrap w-full justify-between items-center mb-5 gap-2">
              <TabsList>
                <TabsTrigger value="grid" className="flex gap-2">
                  <GridIcon /> Grid
                </TabsTrigger>
                <TabsTrigger value="table" className="flex gap-2">
                  <RowsIcon />
                  Table
                </TabsTrigger>
              </TabsList>
              <div className="flex flex-wrap gap-2 items-center">
                <Label htmlFor="type-select">Filter Type</Label>
                <Select
                  value={type}
                  onValueChange={(res) => {
                    setType(res as any);
                  }}
                >
                  <SelectTrigger id="type-select" className="w-[100px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All</SelectItem>
                    <SelectItem value="image">Image</SelectItem>
                    <SelectItem value="document">Document</SelectItem>
                    <SelectItem value="text">Text</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            {files === undefined && (
              <>
                <div className="flex justify-center flex-col items-center gap-4 text-center w-full mt-20">
                  <Loader2 className="w-24 h-24 animate-spin text-zinc-500" />
                  <p className="text-[20px] font-normal text-zinc-900">
                    Loading Data, Please Waiting........
                  </p>
                </div>
              </>
            )}
            <TabsContent value="grid">
              <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-4">
                {modifiedFiles?.map((res) => (
                  <div key={res._id}>
                    <CardComponent file={res} />
                  </div>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="table">
              <DataTable columns={columns} data={modifiedFiles} />
            </TabsContent>
          </Tabs>
        </>
      )}
    </>
  );
};

export default FilesScreenComponent;
