import Image from "next/image";
import React from "react";
import AboutUsImage from "@/assets/svg/about-us.svg";

const AboutUsScreen = () => {
  return (
    <div id="about-us" className="my-40 mt-20">
      <div className="container grid grid-cols-1 md:grid-cols-6 gap-10 place-items-center">
        <div className="col-span-2 place-self-end">
          <Image
            src={AboutUsImage}
            alt="img-aboutus"
            width={300}
            height={300}
          />
        </div>
        <div className="col-span-3">
          <div className="flex flex-col gap-2">
            <h2 className="text-[32px] font-semibold">About Us</h2>
            <p className="leading-7 text-[16px] font-light">
              We are a file management service provider focused on ease of use
              and data security. Using the latest technology, we help you manage
              your files efficiently and effectively. Our services are designed
              to provide the best experience in managing your digital files.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUsScreen;
