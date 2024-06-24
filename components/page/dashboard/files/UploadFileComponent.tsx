"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { formSchema } from "@/utils/schema/uploadSchema";
import { Doc } from "@/convex/_generated/dataModel";
import { useToast } from "@/components/ui/use-toast";
import { useOrganization, useUser } from "@clerk/nextjs";
import { Loader2 } from "lucide-react";

interface UploadFileComponentProps {
  handleModalDialog: () => void;
}
const UploadFileComponent = ({
  handleModalDialog,
}: UploadFileComponentProps) => {
  const { toast } = useToast();
  const generateUploadUrl = useMutation(api.files.generateUploadUrl);
  const createFile = useMutation(api.files.createFile);

  const organization = useOrganization();
  const user = useUser();

  let orgId: string = "";

  if (organization.isLoaded && user.isLoaded) {
    orgId = organization.organization?.id! ?? user.user?.id!;
  }

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      file: undefined,
    },
  });

  const fileRef = form.register("file");

  async function onSubmit(values: z.infer<typeof formSchema>) {
    // console.log(values);
    if (!orgId) return;

    const postUrl = await generateUploadUrl();
    const fileType: string = values.file.type;

    const result = await fetch(postUrl, {
      method: "POST",
      headers: { "Content-Type": fileType },
      body: values.file,
    });

    const { storageId } = await result.json();

    const typeCustom = fileType.split("/")[0];

    const types = {
      image: "image",
      application: "document",
      text: "text",
    } as Record<string, Doc<"files">["type"]>;

    try {
      await createFile({
        name: values.title,
        fileId: storageId,
        orgId,
        type: types[typeCustom],
      });

      form.reset();

      handleModalDialog();

      toast({
        title: "File Uploaded",
        description: "Now everyone can view your file.",
        variant: "success",
      });
    } catch (error) {
      toast({
        title: "Something went wrong",
        description: "Your file could not be uploaded, try again later.",
        variant: "destructive",
      });
    }
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Write your title ......" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="file"
          render={({ field }) => (
            <FormItem>
              <FormLabel>File</FormLabel>
              <FormControl>
                <Input type="file" {...fileRef} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          disabled={form.formState.isSubmitting}
          className="flex gap-2"
        >
          {form.formState.isSubmitting && (
            <Loader2 className="h-4 w-4 animate-spin" />
          )}
          Upload
        </Button>
      </form>
    </Form>
  );
};

export default UploadFileComponent;
