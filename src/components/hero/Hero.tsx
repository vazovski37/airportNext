import React from "react";
import Image from "next/image";
import WelcomeComponent from "../Welcome/WelcomeComponent";
import SearchForTicket from "../SearchForTicket/SearchForTicket";
import heroImage from "../../assets/SHUTTLE-BUS.jpg.webp";

function HeroSection() {
  return (
    <div className="relative w-full h-screen md:h-[600px]">
      <Image
        src={heroImage}
        alt="Hero Background"
        layout="fill"
        objectFit="cover"
        quality={100} 
        priority
        className="z-0"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent"></div>

      <div className="relative z-10 flex flex-col items-center justify-center mt-[20px] h-full gap-[44px] px-[16px]">
          <WelcomeComponent />
          <SearchForTicket />
      </div>
    </div>
  );
}

export default HeroSection;
