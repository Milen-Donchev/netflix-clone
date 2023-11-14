import { NextResponse } from "next/server";

import prisma from "@/lib/prismadb";

import { getCurrentUser } from "@/actions/get-current-user";

export const GET = async (
  req: Request,
  { params }: { params: { id: string } }
) => {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser || !currentUser.profiles) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }

    const profile = currentUser.profiles.find(
      (profile) => profile.id === params.id
    );

    if (!profile) {
      return new NextResponse("Profile not found", { status: 404 });
    }

    return NextResponse.json(profile);
  } catch (error) {
    console.log("[PROFILE GET]: ", error);
    return new NextResponse("Unexpected error", { status: 500 });
  }
};

export const PUT = async (
  req: Request,
  { params }: { params: { id: string } }
) => {
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

    const newProfile = await prisma.profile.update({
      where: {
        id: params.id,
        userId: currentUser.id,
      },
      data: {
        name,
        color,
        adult,
      },
    });

    return NextResponse.json(newProfile);
  } catch (error) {
    console.log("[UPDATE PROFILE]: ", error);
    return new NextResponse("Unexpected error", { status: 500 });
  }
};

export const DELETE = async (
  req: Request,
  { params }: { params: { id: string } }
) => {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser || !currentUser.profiles) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }

    const profile = await prisma.profile.delete({
      where: {
        id: params.id,
        userId: currentUser.id,
      },
    });

    return NextResponse.json(profile);
  } catch (error) {
    console.log("[DELETE PROFILE]: ", error);
    return new NextResponse("Unexpected error", { status: 500 });
  }
};
