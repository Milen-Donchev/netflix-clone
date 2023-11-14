import { hash } from "bcrypt";
import { NextResponse } from "next/server";

import prisma from "@/lib/prismadb";

export const POST = async (req: Request) => {
  try {
    const body = await req.json();
    const { username, email, password } = body;

    if (!username || !email || !password) {
      return new NextResponse("Invalid request", { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (user) {
      return new NextResponse("Email already exists", { status: 400 });
    }

    const hashedPassword = await hash(password, 12);

    const newUser = await prisma.user.create({
      data: {
        name: username,
        email,
        hashedPassword,
      },
    });

    return NextResponse.json(newUser);
  } catch (error) {
    console.log("[REGISTER]: ", error);
    return new NextResponse("Unexpected error", { status: 500 });
  }
};
