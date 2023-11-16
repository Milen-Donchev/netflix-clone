"use client";
import { cn } from "@/lib/utils";
import { useScrollPosition } from "@/hooks/use-scroll-position";

import GenreDropdown from "@/components/browse/genre-dropdown";

interface SubnavbarProps {
  type: "movies" | "tv-shows";
}

const Subnavbar = ({ type }: SubnavbarProps) => {
  const { isAboveThreshold } = useScrollPosition();

  return (
    <div
      className={cn(
        "fixed top-20 left-0 w-full h-24 z-40 flex items-center bg-transparent transition-colors px-4 lg:px-16",
        isAboveThreshold && "bg-neutral-900"
      )}
    >
      <h2 className="text-neutral-200 text-2xl  lg:text-4xl mr-8 font-medium">
        {type === "movies" ? "Movies" : "TV Shows"}
      </h2>
      <GenreDropdown />
    </div>
  );
};

export default Subnavbar;
