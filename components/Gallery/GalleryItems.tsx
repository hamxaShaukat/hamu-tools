"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

interface GalleryItemProps {
  id: number;
  title: string;
  description: string;
  image: string;
  category: string;
  onClick: () => void;
}

const GalleryItem: React.FC<GalleryItemProps> = ({
  id,
  title,
  description,
  image,
  category,
  onClick,
}) => {
  return (
    <motion.div
      className="w-full p-4 bg-black rounded-xl hover:shadow-2xl transition-shadow duration-300 cursor-pointer border-2 border-green-600 shadow-[0_0_10px_5px_rgba(72,187,120,0.7)] "
      layoutId={id.toString()}
      onClick={onClick}
    >
      <div className="flex flex-col items-center gap-y-4">
        <div className="w-16 h-16 overflow-hidden border border-gray-500 rounded-xl">
          <Image
            className="object-cover"
            src={image}
            alt={title}
            width={64}
            height={64}
          />
        </div>
        <div className="text-center">
          <p className="text-lg font-black text-gray-300">{title}</p>
          <p className="text-base text-gray-400">{description}</p>
        </div>
        <div className="flex justify-center gap-x-2">
          <p className="bg-gradient-to-r from-green-500 to-teal-600 text-sm p-2 rounded-lg text-center">
            {category}
          </p>
          <p className="bg-gradient-to-r from-green-500 to-teal-600 text-sm p-2 rounded-lg text-center">
            One time payment
          </p>
        </div>
        <p className="text-sm font-semibold text-transparent bg-clip-text bg-gradient-to-r from-green-500 via-green-300 to-teal-400 cursor-pointer hover:bg-gradient-to-r hover:from-teal-400 hover:via-green-300 hover:to-green-500 transition-colors duration-300">
          Visit Website
        </p>
      </div>
    </motion.div>
  );
};

export default GalleryItem;
