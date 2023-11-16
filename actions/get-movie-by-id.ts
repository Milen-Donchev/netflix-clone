import prisma from "@/lib/prismadb";
import { getCurrentUser } from "./get-current-user";

export const getMovieById = async (movieId: string) => {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) return { movie: null, error: "Unauthenticated" };

    const movie = await prisma.movie.findUnique({
      where: {
        id: movieId,
      },
    });

    if (!movie) {
      return {
        movie: null,
        error: "No movie found",
      };
    }

    return { movie, error: null };
  } catch (error: any) {
    console.log("[GET MOVIE]: ", error);
    return { movie: null, error: error as string };
  }
};
