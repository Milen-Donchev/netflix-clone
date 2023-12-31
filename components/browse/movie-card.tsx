"use client";
import { Play } from "lucide-react";
import { ElementRef, useRef } from "react";
import { useRouter } from "next/navigation";

import type { Genre, Movie } from "@prisma/client";

interface MovieCardProps {
  movie: Movie & { genre: Genre };
}

const MovieCard = ({ movie }: MovieCardProps) => {
  const router = useRouter();

  const videoRef = useRef<ElementRef<"video">>(null);

  const handleThumbnailHover = () => {
    if (videoRef.current) {
      videoRef.current.play();
    }
  };

  const handlePreviewLeave = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  const handlePlay = () => {
    router.push(`/watch/${movie.id}`);
  };

  return (
    <div className="group bg-neutral-900 col-span relative h-[12vw]">
      <img
        src={movie.thumbnailUrl}
        alt="movie-thumbnail"
        onMouseEnter={handleThumbnailHover}
        className="cursor-pointer object-cover transition duration shadow-xl rounded-md group-hover:opacity-90 sm:group-hover:opacity-0 delay-300 w-full h-[12vw]"
      />
      <div
        onMouseLeave={handlePreviewLeave}
        className="opacity-0 absolute top-0 transition duration-200 z-10 invisible sm:visible delay-300 w-full scale-0 group-hover:scale-100 group-hover:-translate-y-[6vw] group-hover:opacity-100"
      >
        <video
          ref={videoRef}
          src={movie.videoUrl}
          autoPlay
          muted
          loop
          className="cursor-pointer object-cover transition duration shadow-xl rounded-t-md w-full h-[12vw]"
        ></video>
        <div className="z-10 bg-neutral-800 p-2 lg:p-4 absolute w-full transition shadow-md rounded-b-md">
          <div className="flex items-center gap-x-3">
            <div
              className="cursor-pointer w-6 h-6 lg:w-10 lg:h-10 bg-white rounded-full flex justify-center items-center transition hover:bg-neutral-300"
              onClick={handlePlay}
            >
              <Play className="w-5 h-5 shrink-0 fill-neutral-900 text-neutral-900" />
            </div>
          </div>

          <p className="text-green-400 font-semibold mt-4">
            New <span className="text-white">2023</span>
          </p>

          <div className="flex mt-4 gap-x-2 items-center">
            <p className="text-white text-[10px] lg:text-sm">
              {movie.duration}
            </p>
          </div>

          <div className="flex mt-4 gap-x-2 items-center">
            <p className="text-white text-[10px] lg:text-sm">
              {movie.genre.label}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
