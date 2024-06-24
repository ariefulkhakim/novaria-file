import { Facebook, Instagram, Linkedin } from "lucide-react";
import React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Textarea } from "@/components/ui/textarea";

const formSchema = z.object({
  name: z.string().min(2, { message: "name required" }).max(50),
  email: z.string().email({ message: "email required" }),
  message: z.string().optional(),
});

const ContactUsScreen = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <div id="contact" className="my-40">
      <div className="container">
        <div className="flex flex-col w-full justify-center items-center text-center gap-3">
          <h2 className="text-[32px] font-semibold">Contact Us</h2>
          <p>
            If you have any questions or need assistance, do not hesitate to
            reach out to us. Our support team is ready to help you.
          </p>
          <div className="flex gap-4 mt-3">
            <Instagram className="cursor-pointer w-6 h-6" />
            <Facebook className="cursor-pointer w-6 h-6" />
            <Linkedin className="cursor-pointer w-6 h-6" />
          </div>
        </div>
        <div className="flex justify-center w-full mt-10">
          <Form {...form}>
            <Card className="w-full max-w-lg">
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
              >
                <CardContent className="grid gap-4 mt-8">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input
                            type="text"
                            placeholder="Enter your name...."
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            placeholder="Enter your Email...."
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Message</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Write your message...."
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
                <CardFooter>
                  <Button type="submit" className="w-full">
                    Send
                  </Button>
                </CardFooter>
              </form>
            </Card>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default ContactUsScreen;
