"use client";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { ArrowLeftRight, ChevronDown, LogOut, Pencil } from "lucide-react";

import type { Profile } from "@prisma/client";

import Avatar from "@/components/profile/avatar";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface ProfileDropdownProps {
  profile: Profile;
}

const ProfileDropdown = ({ profile }: ProfileDropdownProps) => {
  const router = useRouter();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="outline-none">
        <div className="flex items-center gap-x-2">
          <Avatar size="xs" color={profile.color} className="p-2" />
          <ChevronDown className="w-4 h-4 shrink-0 text-neutral-200" />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-neutral-900">
        <DropdownMenuItem
          onClick={() => router.push("/profile-select")}
          className="group"
        >
          <div className="flex items-center gap-x-2">
            <ArrowLeftRight className="w-4 h-4 shrink-0 text-neutral-200 group-hover:text-neutral-900" />
            <h2 className="text-neutral-200 group-hover:text-neutral-900">
              Switch Profile
            </h2>
          </div>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => router.push("/profile-select/manage")}
          className="group"
        >
          <div className="flex items-center gap-x-2">
            <Pencil className="w-4 h-4 shrink-0 text-neutral-200 group-hover:text-neutral-900" />
            <h2 className="text-neutral-200 group-hover:text-neutral-900">
              Manage Profiles
            </h2>
          </div>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => signOut({ callbackUrl: "/" })}
          className="group"
        >
          <div className="flex items-center gap-x-2">
            <LogOut className="w-4 h-4 shrink-0 text-neutral-200 group-hover:text-neutral-900" />
            <h2 className="text-neutral-200 group-hover:text-neutral-900">
              Exit
            </h2>
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ProfileDropdown;
