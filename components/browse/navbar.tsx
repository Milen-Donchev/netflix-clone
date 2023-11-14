"use client";
import Image from "next/image";
import { Bell, Search } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

import type { Profile } from "@prisma/client";

import { cn } from "@/lib/utils";

import ProfileDropdown from "@/components/browse/profile-dropdown";
import MobileNavbarDropdown from "@/components/browse/mobile-navbar-dropdown";

const ROUTES = [
  {
    id: 1,
    title: "Home",
    href: "/browse",
    disabled: false,
  },
  {
    id: 2,
    title: "TV Shows",
    href: "/browse/tv-shows",
    disabled: false,
  },
  {
    id: 3,
    title: "Movies",
    href: "/browse/movies",
    disabled: false,
  },
  {
    id: 4,
    title: "New & Popular",
    href: "/browse/new-and-popular",
    disabled: true,
  },
  {
    id: 5,
    title: "My List",
    href: "/browse/my-list",
    disabled: true,
  },
  {
    id: 6,
    title: "Browse by Languages",
    href: "/browse/by-languages",
    disabled: true,
  },
];

interface NavbarProps {
  profile: Profile;
}

const Navbar = ({ profile }: NavbarProps) => {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <div className="w-full h-20 fixed top-0 left-0 bg-gradient-to-b from-neutral-950 to-neutral-900 px-4 lg:px-16 flex items-center justify-between">
      <div className="flex items-center gap-x-4 lg:gap-x-8">
        <Image
          onClick={() => router.push("/browse")}
          src="/logo.png"
          alt="logo"
          width={100}
          height={40}
          className="cursor-pointer"
        />
        <nav className="hidden lg:flex items-center gap-x-4">
          {ROUTES.map(({ id, title, href, disabled }) => (
            <div
              key={String(id)}
              className={cn(
                "text-sm font-light text-neutral-300 hover:text-neutral-400 cursor-pointer transition-colors",
                href === pathname &&
                  "text-white font-medium hover:text-white cursor-default",
                disabled &&
                  "text-neutral-600 hover:text-neutral-600 cursor-not-allowed"
              )}
              onClick={() => (disabled ? null : router.push(href))}
            >
              {title}
            </div>
          ))}
        </nav>
        <MobileNavbarDropdown routes={ROUTES} />
      </div>

      <div className="flex items-center gap-x-4">
        <Search className="w-5 h-5 shrink-0 text-neutral-200" />
        <div className="text-sm font-light text-neutral-300 hover:text-neutral-400 cursor-pointer transition-colors">
          Kids
        </div>
        <Bell className="w-5 h-5 shrink-0 text-neutral-200" />
        <ProfileDropdown profile={profile} />
      </div>
    </div>
  );
};

export default Navbar;
