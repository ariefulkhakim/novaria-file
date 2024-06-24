import { z } from "zod";

const isBrowser =
  typeof window !== "undefined" && typeof FileList !== "undefined";

export const fileSchema = isBrowser
  ? z
      .instanceof(FileList)
      .refine((files) => {
        if (files.length !== 1) return false;
        const file = files[0];
        // Check file size
        if (file.size > 5 * 1024 * 1024) return false;
        // Check file type
        return (
          file.type.startsWith("image/") ||
          file.type.startsWith("application/") ||
          file.type.startsWith("text/")
        );
      }, "You must upload exactly one file, it must be less than 5MB, and it must be of type image, document, or text.")
      .transform((files) => files[0])
  : z.any();

export const formSchema = z.object({
  title: z
    .string()
    .min(1, {
      message: "title must be at least 2 characters.",
    })
    .max(100, {
      message: "title max 100 characters.",
    }),
  file: fileSchema,
});
