"use client";

import React from "react";
import { useRouter } from "next/navigation";
import SButton from "@/design-components/SButton/SButton";

function WelcomeComponent() {
  const router = useRouter();

  return (
    <div className="bg-white rounded-[8px] shadow-md p-[16px] text-center">
      {/* Title */}
      <h1 className="text-xl font-bold text-brand-700 mb-[8px]">
        Kutaisi Welcomes You!
      </h1>

      {/* Subtitle */}
      <p className="text-sm text-gray-700 mb-[16px]">
        გსურთ მგზავრობის დაჯავშნა?
        <br />
        მაშინ გაიმარტივეთ AIRTick
      </p>

      {/* Buttons */}
      <div className="flex justify-center gap-[12px]">
        {/* First Button */}
        <SButton
          type="primary"
          size="md"
          onClick={() => router.push("/tickets")}
        >
          ბილეთის შეძენა
        </SButton>

        {/* Second Button */}
        <SButton
          type="secondaryColor"
          size="md"
          onClick={() => router.push("/us")}
        >
          ჩვენს შესახებ
        </SButton>
      </div>
    </div>
  );
}

export default WelcomeComponent;
