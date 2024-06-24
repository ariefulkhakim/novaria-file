import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Accessibility, Boxes, FileBox, LockKeyhole } from "lucide-react";

const ServiceScreen = () => {
  const ContentService = [
    {
      id: "1",
      title: "Secure Storage",
      desc: "Ensure your files are always safe with end-to-end encryption and automatic backups.",
      icon: <LockKeyhole size={48} color="#fff" />,
    },
    {
      id: "2",
      title: "Easy Access",
      desc: "Access your files anytime and from any device, without hassle.",
      icon: <Accessibility size={48} color="#fff" />,
    },
    {
      id: "3",
      title: "Efficient Collaboration",
      desc: "Share files and collaborate with your team in real-time with our collaboration features.",
      icon: <Boxes size={48} color="#fff" />,
    },
    {
      id: "4",
      title: "Organized File Management",
      desc: "Manage your files effortlessly using our advanced organizing tools.",
      icon: <FileBox size={48} color="#fff" />,
    },
  ];
  return (
    <div id="service" className="my-40">
      <div className="container px-4 md:px-16">
        <h2 className="text-[32px] font-semibold text-center">Our Services</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-10">
          {ContentService.map((item) => (
            <Card key={item.id}>
              <CardHeader className="flex flex-col items-center gap-4">
                <div className="p-4 bg-primary rounded-full drop-shadow-2xl">
                  {item.icon}
                </div>
                <CardTitle className="text-zinc-800 text-center leading-7">
                  {item.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <p className="font-light text-[14px] leading-6 text-zinc-700">
                    {item.desc}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ServiceScreen;
