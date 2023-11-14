import { NextResponse } from "next/server";

import { getCurrentUser } from "@/actions/get-current-user";

import prisma from "@/lib/prismadb";

export const PUT = async (req: Request) => {
  try {
    const body = await req.json();
    const { profileId } = body;

    if (!profileId) {
      return new NextResponse("Invalid request", { status: 400 });
    }

    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }

    const user = await prisma.user.update({
      where: {
        id: currentUser.id,
      },
      data: {
        currentProfileId: profileId,
      },
    });

    return NextResponse.json(user);
  } catch (error) {
    console.log("[UPDATE CURRENT PROFILE]: ", error);
    return new NextResponse("Unexpected error", { status: 500 });
  }
};
