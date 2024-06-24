import Image from "next/image";
import React from "react";
import ImgHero from "@/assets/svg/hero.svg";
import { Button } from "@/components/ui/button";

const HeroBanner = () => {
  return (
    <div className="flex w-full justify-center my-5">
      <div className="flex flex-col justify-center items-center py-20 text-center">
        <Image src={ImgHero} alt="Hero_Banner_Image" width={400} height={400} />
        <h1 className="text-[45px] font-semibold my-5">
          Manage Your Files Easily and Securely
        </h1>
        <p className=" text-gray-600 font-light leading-7 w-2/3">
          Store, manage, and access your files anytime, anywhere. An intuitive
          and secure file management solution for your personal and business
          needs.
        </p>
        <Button className="mt-10" size={"lg"}>
          Get Started
        </Button>
      </div>
    </div>
  );
};

export default HeroBanner;
