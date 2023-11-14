import prisma from "@/lib/prismadb";
import { getCurrentUser } from "./get-current-user";

export const addMovieToFavorites = async (movieId: string) => {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) return "Unauthenticated";

    const movieExists = await prisma.movie.findUnique({
      where: {
        id: movieId,
      },
    });

    if (!movieExists) return "Movie not found";

    await prisma.user.update({
      where: {
        id: currentUser.id,
      },
      data: {
        favoriteIds: {
          push: movieId,
        },
      },
    });

    return null;
  } catch (error: any) {
    return error.message as string;
  }
};
