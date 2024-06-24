"use client";
import React, { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import {
  EllipsisVertical,
  File,
  FileDown,
  Folder,
  FolderHeart,
  Trash2,
  Undo2,
} from "lucide-react";
import { Doc } from "@/convex/_generated/dataModel";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useToast } from "../ui/use-toast";
import { Protect } from "@clerk/nextjs";

interface SettingCardProps {
  file: Doc<"files"> & { url: string | null };
  isFavorited: boolean;
}

const SettingCard = ({ file, isFavorited }: SettingCardProps) => {
  const onDeleteFile = useMutation(api.files.deleteFile);
  const onRetoreFile = useMutation(api.files.restoreFile);
  const onFavoriteFile = useMutation(api.files.toggleFavorite);

  const getMe = useQuery(api.users.getMe);

  const { toast } = useToast();
  const [isConfirm, setIsConfirm] = useState(false);

  const handleDeleteFile = async () => {
    try {
      await onDeleteFile({
        fileId: file._id,
      });

      toast({
        variant: "success",
        title: "File success deleted",
        description: "Your file will deleted soon",
      });
    } catch (error) {
      toast({
        title: "Something went wrong",
        description: "Your file could not be deleted, try again later.",
        variant: "destructive",
      });
    }
  };

  const handleFavoriteFile = async () => {
    try {
      await onFavoriteFile({
        fileId: file._id,
      });

      toast({
        variant: "success",
        title: "File success add to favorites",
        description: "Your file will show in favorites page",
      });
    } catch (error) {
      toast({
        title: "Something went wrong",
        description: "Your file could not be favorites, try again later.",
        variant: "destructive",
      });
    }
  };

  const handleRestoreFile = async () => {
    try {
      await onRetoreFile({
        fileId: file._id,
      });

      toast({
        variant: "success",
        title: "File success restored",
        description: "Your file restored",
      });
    } catch (error) {
      toast({
        title: "Something went wrong",
        description: "Your file could not be restored, try again later.",
        variant: "destructive",
      });
    }
  };
  return (
    <>
      <AlertDialog open={isConfirm} onOpenChange={setIsConfirm}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action will mark the file for our deletion process. File are
              deleted periodically
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteFile}>
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <DropdownMenu>
        <DropdownMenuTrigger>
          <EllipsisVertical size={18} />
        </DropdownMenuTrigger>
        <DropdownMenuContent sideOffset={5} side="bottom" align="end">
          <DropdownMenuItem
            onClick={() => {
              if (!file.url) return;
              window.open(file.url, "_blank");
            }}
          >
            <div className="flex items-center space-x-2 cursor-pointer">
              <FileDown size={16} />
              <p>Download</p>
            </div>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleFavoriteFile}>
            {isFavorited ? (
              <div className="flex items-center space-x-2 cursor-pointer">
                <Folder size={16} />
                <p>UnFavorite</p>
              </div>
            ) : (
              <div className="flex items-center space-x-2 cursor-pointer">
                <FolderHeart size={16} />
                <p>Favorite</p>
              </div>
            )}
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <Protect
            condition={(res) => {
              return (
                res({
                  role: "org:admin",
                }) || file.userId === getMe?._id
              );
            }}
          >
            <DropdownMenuItem
              onClick={() => {
                if (file.shouldDelete) {
                  handleRestoreFile();
                } else {
                  setIsConfirm(true);
                }
              }}
            >
              {file.shouldDelete ? (
                <div className="flex items-center space-x-2 cursor-pointer">
                  <Undo2 size={16} />
                  <p>Restore</p>
                </div>
              ) : (
                <div className="flex items-center space-x-2 cursor-pointer">
                  <Trash2 size={16} />
                  <p>Delete</p>
                </div>
              )}
            </DropdownMenuItem>
          </Protect>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default SettingCard;
