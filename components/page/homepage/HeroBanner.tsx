import Image from "next/image";
import React from "react";
import ImgHero from "@/assets/svg/hero.svg";
import { Button } from "@/components/ui/button";

const HeroBanner = () => {
  return (
    <div className="flex w-full justify-center">
      <div className="flex flex-col justify-center items-center py-20 text-center w-1/2">
        <Image src={ImgHero} alt="Hero_Banner_Image" width={500} height={500} />
        <h1 className="text-[45px] font-semibold my-5">
          Welcome To NovariaFile
        </h1>
        <p className=" text-gray-600 font-light leading-7">
          Lorem Ipsum has been the industrys standard dummy text ever since the
          1500s, when an unknown printer took a galley of type and scrambled it
          to make a type specimen book.
        </p>
        <Button className="mt-10" size={"lg"}>
          More Info
        </Button>
      </div>
    </div>
  );
};

export default HeroBanner;
