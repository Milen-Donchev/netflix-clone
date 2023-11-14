import { Genre, Movie } from "@prisma/client";
import MovieCard from "./movie-card";

interface MovieListProps {
  movies: ({ genre: Genre } & Movie)[];
  title: string;
}

const MovieList = ({ movies, title }: MovieListProps) => {
  return (
    <div className="px-4 md:px-12 mt-4 space-y-8">
      <div>
        <p className="text-white text-md md:text-xl lg:text-2xl font-semibold mb-4">
          {title}
        </p>
        <div className="grid grid-cols-4 gap-2">
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MovieList;
