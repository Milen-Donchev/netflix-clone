import prisma from "@/lib/prismadb";
import { getCurrentUser } from "./get-current-user";

export const getMovies = async (genreKey?: string) => {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) return { movies: null, error: "Unauthenticated" };

    const movies = await prisma.movie.findMany({
      where: {
        ...(genreKey && { genreKey }),
      },
      include: {
        genre: true,
      },
    });

    return { movies, error: null };
  } catch (error: any) {
    console.log("[GET MOVIES]: ", error);
    return { movies: null, error: error.messasge };
  }
};
