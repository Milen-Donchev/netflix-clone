"use client";
import { ChevronDown } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const genres = [
  { id: 1, label: "Comedy", key: "comedy" },
  { id: 2, label: "Horror", key: "horror" },
  { id: 3, label: "Documentary", key: "documentary" },
];

const GenreDropdown = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const genre = searchParams.get("genre");

  const currentGenre = genres.find((g) => g.key === genre);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="outline-none bg-neutral-950">
        <div className="px-4 py-1 border-2 flex items-center rounded-md gap-x-3 shadow-sm text-neutral-200">
          {currentGenre ? currentGenre.label : "Genres"}
          <ChevronDown className="w-4 h-4 shrink-0" />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-neutral-900">
        <DropdownMenuItem
          onClick={() => router.push(pathname)}
          className="text-sm font-light text-neutral-300 hover:text-neutral-400 cursor-pointer transition-colors"
        >
          All
        </DropdownMenuItem>
        {genres.map(({ id, label, key }) => (
          <DropdownMenuItem
            key={String(id)}
            onClick={() => router.push(pathname + `?genre=${key}`)}
            className="text-sm font-light text-neutral-300 hover:text-neutral-400 cursor-pointer transition-colors"
          >
            {label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default GenreDropdown;
