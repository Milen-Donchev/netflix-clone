import type { ProfileColor } from "@prisma/client";

import { cn } from "@/lib/utils";

import Avatar from "@/components/profile/avatar";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Palette } from "lucide-react";

interface ColorSelectProps {
  selectedColor: ProfileColor;
  onColorSelect: (color: ProfileColor) => void;
  adult: boolean;
}

const COLORS = [
  { id: 1, title: "BLUE", color: "bg-gradient-to-b from-sky-600 to-sky-300" },
  { id: 2, title: "RED", color: "bg-gradient-to-b from-red-600 to-red-300" },
  {
    id: 3,
    title: "YELLOW",
    color: "bg-gradient-to-b from-yellow-600 to-yellow-300",
  },
  {
    id: 4,
    title: "GREEN",
    color: "bg-gradient-to-b from-green-600 to-green-300",
  },
] as const;

const ColorSelect = ({
  selectedColor,
  onColorSelect,
  adult,
}: ColorSelectProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="outline-none">
        <div className="relative group transition">
          <Avatar color={selectedColor} adult={adult} />
          <div className="hidden absolute transition inset-0 w-full h-full bg-black/70 rounded-md group-hover:flex items-center justify-center">
            <Palette className="w-8 h-8 shrink-0 text-neutral-200" />
          </div>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {COLORS.map(({ id, title, color }) => (
          <DropdownMenuItem
            key={id}
            className="cursor-pointer"
            onClick={() => onColorSelect(title)}
          >
            <div className="flex items-center gap-x-2">
              <div className={cn("w-8 h-8 rounded-full", color)} />
              <h3 className="text-lg lowercase">{title}</h3>
            </div>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ColorSelect;
