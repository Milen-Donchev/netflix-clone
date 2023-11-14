import { getServerSession } from "next-auth";

import prisma from "@/lib/prismadb";

export const getCurrentUser = async () => {
  try {
    const session = await getServerSession();
    if (!session || !session.user?.email) return null;

    const user = await prisma.user.findUnique({
      where: {
        email: session.user?.email,
      },
      include: {
        profiles: true,
      },
    });
    return user;
  } catch (error) {
    console.log("[GET CURRENT USER]: ", error);
    return null;
  }
};
