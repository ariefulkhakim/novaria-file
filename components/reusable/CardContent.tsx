import React, { ReactNode } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import SettingCard from "./SettingCard";
import { Doc } from "@/convex/_generated/dataModel";
import { FileTextIcon, GanttChartIcon, ImageIcon } from "lucide-react";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { formatRelative } from "date-fns";

const CardComponent = ({
  file,
}: {
  file: Doc<"files"> & { isFavorited: boolean; url: string | null };
}) => {
  const userProfile = useQuery(api.users.getUserProfile, {
    userId: file.userId,
  });
  const typeIcons = {
    image: <ImageIcon />,
    document: <FileTextIcon />,
    text: <GanttChartIcon />,
  } as Record<Doc<"files">["type"], ReactNode>;

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center relative">
          <CardTitle className="flex gap-2 text-base font-normal">
            <div className="flex justify-center">{typeIcons[file.type]}</div>{" "}
            {file.name}
          </CardTitle>
          <SettingCard file={file} isFavorited={file.isFavorited} />
        </div>
      </CardHeader>
      <CardContent className="h-[200px] flex justify-center items-center">
        {file.type === "image" && file.url && (
          <Image alt={file.name} width="200" height="100" src={file.url} />
        )}

        {file.type === "text" && <GanttChartIcon className="w-20 h-20" />}
        {file.type === "document" && <FileTextIcon className="w-20 h-20" />}
      </CardContent>
      <CardFooter>
        <div className="flex justify-between items-center w-full mt-3">
          <div className="flex gap-1 text-xs text-gray-700 items-center">
            <Avatar className="w-6 h-6">
              <AvatarImage src={userProfile?.image} />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            {userProfile?.name}
          </div>
          <div className="text-xs text-gray-700 font-semibold">
            Uploaded on{" "}
            {formatRelative(new Date(file._creationTime), new Date())}
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};

export default CardComponent;
