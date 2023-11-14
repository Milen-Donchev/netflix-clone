"use client";
import { ChevronDown } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

import { cn } from "@/lib/utils";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface MobileNavbarDropdownProps {
  routes: {
    id: number;
    title: string;
    href: string;
    disabled: boolean;
  }[];
}

const MobileNavbarDropdown = ({ routes }: MobileNavbarDropdownProps) => {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <div className="block lg:hidden">
      <DropdownMenu>
        <DropdownMenuTrigger className="outline-none">
          <div className="flex items-center gap-x-2">
            <h2 className="text-sm font-light text-neutral-300 hover:text-neutral-400 cursor-pointer transition-colors">
              Browse
            </h2>
            <ChevronDown className="w-3 h-3 shrink-0 text-neutral-200" />
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="bg-neutral-900">
          {routes.map(({ id, title, href, disabled }) => (
            <DropdownMenuItem
              key={String(id)}
              onClick={() => (disabled ? null : router.push(href))}
              className={cn(
                "text-sm font-light text-neutral-300 hover:text-neutral-400 cursor-pointer transition-colors",
                href === pathname &&
                  "text-white font-medium hover:text-white cursor-default",
                disabled &&
                  "text-neutral-600 hover:text-neutral-600 cursor-not-allowed"
              )}
            >
              {title}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default MobileNavbarDropdown;
