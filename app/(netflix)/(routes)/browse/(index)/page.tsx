import { getMovies } from "@/actions/get-movies";

import Billboard from "@/components/browse/billboard";
import MovieList from "@/components/browse/movie-list";

const randomNumberInRange = (from: number, to: number) =>
  Math.floor(Math.random() * (to - from)) + from;

const BrowsePage = async () => {
  const { movies } = await getMovies();

  const randomMovie = movies && movies[randomNumberInRange(0, movies.length)];

  return (
    <div className="w-full h-full">
      {!movies && (
        <p className="mt-20 text-white text-center text-xl">
          There are no movies
        </p>
      )}
      {randomMovie && <Billboard {...randomMovie} />}
      {movies && (
        <div className="pb-40">
          <MovieList movies={movies} title="Trending Now" />
        </div>
      )}
    </div>
  );
};

export default BrowsePage;
