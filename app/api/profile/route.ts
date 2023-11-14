import { NextResponse } from "next/server";

import prisma from "@/lib/prismadb";

import { getCurrentUser } from "@/actions/get-current-user";

export const POST = async (req: Request) => {
  try {
    const body = await req.json();
    const { name, color, adult } = body;

    if (!name || !color || adult === undefined) {
      return new NextResponse("Invalid request", { status: 400 });
    }

    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }

    if (currentUser.profiles && currentUser.profiles.length >= 5) {
      return new NextResponse("Maximum number of profiles reached.", {
        status: 400,
      });
    }

    const newProfile = await prisma.profile.create({
      data: {
        name,
        adult,
        color,
        userId: currentUser.id,
      },
    });

    return NextResponse.json(newProfile);
  } catch (error) {
    console.log("[CREATE PROFILE]: ", error);
    return new NextResponse("Unexpected error", { status: 500 });
  }
};
