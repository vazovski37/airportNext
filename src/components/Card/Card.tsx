import React from "react";
import Image from "next/image";

interface CardProps {
  image: string;
  title: string;
  description: string;
}

const Card: React.FC<CardProps> = ({ image, title, description }) => {
  return (
    <div className="relative w-full h-[250px] rounded-md overflow-hidden shadow-lg">
      {/* Background Image */}
      <Image
        src={image}
        alt={title}
        layout="fill" // Makes the image fill the container
        objectFit="cover" // Ensures proper scaling
        priority // Optional: Preloads the image for performance
      />

      {/* Text Content */}
      <div className="absolute inset-0 bg-black/30 flex flex-col justify-end p-4">
        <h3 className="text-lg font-bold text-white">{title}</h3>
        <p className="text-sm text-white">{description}</p>
      </div>
    </div>
  );
};

export default Card;
