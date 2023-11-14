import type { ProfileColor } from "@prisma/client";

import prisma from "@/lib/prismadb";

import { getCurrentUser } from "@/actions/get-current-user";

export const createProfile = async (
  name: string,
  adult: boolean,
  color: ProfileColor
) => {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) return { profile: null, error: "No current user" };

    if (currentUser.profiles && currentUser.profiles.length >= 5)
      return {
        profile: null,
        error: "Maximum number of profiles reached.",
      };

    const profile = await prisma.profile.create({
      data: {
        name,
        adult,
        color,
        userId: currentUser.id,
      },
    });

    return {
      profile,
      error: null,
    };
  } catch (error: any) {
    console.log("[CREATE PROFILE]: ", error);
    return { profile: null, error: error.message };
  }
};
