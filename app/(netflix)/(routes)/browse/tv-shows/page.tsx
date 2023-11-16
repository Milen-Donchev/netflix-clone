import { getMovies } from "@/actions/get-movies";
import Billboard from "@/components/browse/billboard";
import MovieList from "@/components/browse/movie-list";
import Subnavbar from "@/components/browse/subnavbar";

interface TvShowsPageProps {
  params: {};
  searchParams: {
    genre: string;
  };
}

const randomNumberInRange = (from: number, to: number) =>
  Math.floor(Math.random() * (to - from)) + from;

const TvShowsPage = async ({ params, searchParams }: TvShowsPageProps) => {
  const { movies } = await getMovies(searchParams.genre);

  const randomMovie = movies && movies[randomNumberInRange(0, movies.length)];

  return (
    <div className="pt-20">
      <Subnavbar type="tv-shows" />
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
    </div>
  );
};

export default TvShowsPage;
