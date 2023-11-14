import { getCurrentUser } from "@/actions/get-current-user";

import prisma from "@/lib/prismadb";

export const getCurrentProfile = async () => {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser || !currentUser.currentProfileId) return null;

    const profile = await prisma.profile.findUnique({
      where: {
        id: currentUser.currentProfileId,
      },
    });

    return profile;
  } catch (error) {
    return null;
  }
};
