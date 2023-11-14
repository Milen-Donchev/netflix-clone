"use client";
import { useState } from "react";
import { Info, Play, Volume2, VolumeX } from "lucide-react";

import type { Genre } from "@prisma/client";

interface BillboardProps {
  title: string;
  description: string;
  videoUrl: string;
  thumbnailUrl: string;
  duration: string;
  genre: Genre;
}

const Billboard = ({
  title,
  description,
  videoUrl,
  thumbnailUrl,
  duration,
  genre,
}: BillboardProps) => {
  const [muted, setMuted] = useState(true);

  return (
    <div className="relative h-[56.25vw]">
      <video
        className="w-full h-[56.25vw] object-cover brightness-[60%]"
        autoPlay
        muted={muted}
        loop
        onContextMenu={(e) => e.preventDefault()}
        src={videoUrl}
        poster={thumbnailUrl}
      ></video>
      <div className="absolute top-[30%] md:top-[40%] pl-4 lg:pl-16 w-full">
        <p className="text-white text-xl md:text-5xl lg:text-6xl font-bold drop-shadow-xl h-full w-1/2">
          {title}
        </p>
        <p className="text-white text-sm md:text-lg mt-3 md:mt-8 w-[90%] md:w-[80%] lg:w-[50%] drop-shadow-xl">
          {description}
        </p>
        <div className="flex items-center gap-x-2 mt-3 md:mt-4">
          <div className="flex items-center">
            <button className="flex text-neutral-900 items-center gap-x-2 bg-white hover:bg-white/80 rounded-md py-1 md:py-2 px-2 md:px-4 w-auto text-xs lg:text-lg font-semibold">
              <Play className="w-5 h-5 shrink-0 fill-neutral-900" />
              Play
            </button>
          </div>
          <div className="flex items-center">
            <button className="bg-white/30 text-white rounded-md py-1 md:py-2 px-2 md:px-4 w-auto text-xs lg:text-lg font-semibold flex items-center hover:bg-white/20 transition">
              <Info className="w-5 h-5 shrink-0 mr-2" />
              More Info
            </button>
          </div>

          <div className="ml-auto flex items-center gap-x-2">
            <div
              onClick={() => setMuted((m) => !m)}
              className="cursor-pointer border-2 border-neutral-200 bg-transparent p-2 lg:p-4 rounded-full hover:bg-neutral-200/20 transition"
            >
              {!muted ? (
                <Volume2 className="w-3 h-3 lg:w-5 lg:h-5 shrink-0 text-neutral-200" />
              ) : (
                <VolumeX className="w-3 h-3 lg:w-5 lg:h-5 shrink-0 text-neutral-200" />
              )}
            </div>
            <div className="border-l-4 border-neutral-200 p-2 lg:p-4 bg-white/20 text-neutral-200 font-semibold text-xs lg:text-lg">
              {genre.label}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Billboard;
