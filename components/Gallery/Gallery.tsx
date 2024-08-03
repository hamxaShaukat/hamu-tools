'use client';
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import GalleryItem from "./GalleryItems";
import Image from "next/image";
import { RootState } from "@/lib/Store/store";
import { useSelector } from "react-redux";

const items = [
  {
    id: 1,
    title: "Tech",
    description: "Description for AI Tool 1 bhi na thi to saho ya kuch bhi",
    image: "/images/camera.png",
    category: "AI",
    comments: [
      "My first comment and it is a best ever site that i cant explain such a beautiful and and beautiful image with a beautiful and beautiful image with a beautiful and beautiful image with a beautiful and beautiful image with",
      "Another comment on the same item.",
      "And another one, this is a bit longer to test the scrolling functionality in the comments section.",
    ],
  },
  {
    id: 2,
    title: "Productivity Tool 1",
    description: "Description for Productivity Tool 1",
    image: "/images/productivity.png",
    category: "Productivity",
    comments: [
      "First comment on Productivity Tool 1.",
      "Second comment with some more details.",
      "Third comment with even more details to test scrolling.",
    ],
  },
  {
    id: 3,
    title: "Marketing Tool 1",
    description: "Description for Marketing Tool 1",
    image: "/images/speaker.png",
    category: "Marketing",
    comments: [
      "Comment 1 on Marketing Tool 1.",
      "Comment 2 on Marketing Tool 1.",
      "Comment 3 on Marketing Tool 1.",
    ],
  },
  {
    id: 4,
    title: "Developer Tool 1",
    description: "Description for Developer Tool 1",
    image: "/images/laptop.png",
    category: "Tech",
    comments: [
      "Comment 1 on Developer Tool 1.",
      "Comment 2 on Developer Tool 1.",
      "Comment 3 on Developer Tool 1.",
    ],
  },
  {
    id: 5,
    title: "Design Tool 1",
    description: "Description for Design Tool 1",
    image: "/images/design.png",
    category: "Tech",
    comments: [
      "Comment 1 on Design Tool 1.",
      "Comment 2 on Design Tool 1.",
      "Comment 3 on Design Tool 1.",
    ],
  },
  {
    id: 6,
    title: "Design Tool 1",
    description: "Description for Design Tool 1",
    image: "/images/design.png",
    category: "Tech",
    comments: [
      "Comment 1 on Design Tool 1.",
      "Comment 2 on Design Tool 1.",
      "Comment 3 on Design Tool 1.",
    ],
  },
  {
    id: 7,
    title: "Design Tool 1",
    description: "Description for Design Tool 1",
    image: "/images/design.png",
    category: "Tech",
    comments: [
      "Comment 1 on Design Tool 1.",
      "Comment 2 on Design Tool 1.",
      "Comment 3 on Design Tool 1.",
    ],
  },
  {
    id: 8,
    title: "Design Tool 1",
    description: "Description for Design Tool 1",
    image: "/images/design.png",
    category: "Tech",
    comments: [
      "Comment 1 on Design Tool 1.",
      "Comment 2 on Design Tool 1.",
      "Comment 3 on Design Tool 1.",
    ],
  },
];

const Gallery: React.FC = () => {
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const searchTerm = useSelector((state: RootState) => state.name.value);
  const selectedCategory = useSelector((state: RootState) => state.category.value);
  const filteredItems = items.filter(
    (item) =>
      (item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.category.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (selectedCategory === "All" || item.category === selectedCategory)
  );

  const selectedItem = filteredItems.find((item) => item.id === selectedId);

  useEffect(() => {
    if (selectedId !== null) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [selectedId]);

  return (
    <div className="mt-8 px-4 w-full">
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0, scale: 0.8 },
          visible: {
            opacity: 1,
            scale: 1,
            transition: {
              delayChildren: 0.3,
              staggerChildren: 0.2,
            },
          },
        }}
      >
        {filteredItems.map((item) => (
          <motion.div
            key={item.id}
            variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
          >
            <GalleryItem
              id={item.id}
              title={item.title}
              description={item.description}
              image={item.image}
              category={item.category}
              onClick={() => setSelectedId(item.id)}
            />
          </motion.div>
        ))}
      </motion.div>

      <AnimatePresence>
        {selectedId && selectedItem && (
          <motion.div
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
            layoutId={selectedId.toString()}
            onClick={() => setSelectedId(null)}
          >
            <motion.div
              className="bg-black p-8 rounded-xl shadow-2xl border border-white w-3/4 max-w-screen-md"
              onClick={(e) => e.stopPropagation()} // Prevents closing the modal when clicking inside
            >
              <motion.p className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-teal-600">
                {selectedItem.title}
              </motion.p>
              <motion.p className="text-sm text-gray-400 mt-4">
                {/* detailed description goes here */}
                detailed description goes here
              </motion.p>
              <motion.div className="flex items-center justify-center">
                <motion.div>
                  <Image
                    src="/images/person.png"
                    alt="nothing"
                    width={50}
                    height={60}
                  />
                </motion.div>
                <motion.p className="text-sm font-semibold text-gray-200">
                  user&apos;s name
                </motion.p>
              </motion.div>
              <motion.div className="mt-4 max-h-48 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-700">
                {selectedItem.comments.map((comment, index) => (
                  <div key={index} className="flex items-center gap-x-4 mb-4">
                    <Image
                      src="/images/person.png" // Replace with actual user image
                      alt="User"
                      height={50}
                      width={50}
                      className="rounded-full object-cover"
                    />
                    <div className="text-gray-400 text-xs">{comment}</div>
                  </div>
                ))}
              </motion.div>
              <motion.div className="flex items-center justify-center gap-x-7">
                <motion.button
                  className="mt-6 px-4 py-2 bg-gradient-to-r from-green-500 to-teal-500 text-white rounded-full shadow-lg hover:bg-gradient-to-r hover:from-teal-500 hover:to-green-500 transition-colors duration-300 ease-in-out"
                  onClick={() => setSelectedId(null)}
                >
                  More about {selectedItem.title}
                </motion.button>
                <motion.button
                  className="mt-6 px-4 py-2 bg-gradient-to-r from-red-600 via-orange-600 to-red-700 text-white rounded-full shadow-lg hover:bg-gradient-to-r hover:from-red-700 hover:to-red-600 transition-colors duration-300 ease-in-out"
                  onClick={() => setSelectedId(null)}
                >
                  Close
                </motion.button>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Gallery;
