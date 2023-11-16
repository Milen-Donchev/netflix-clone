import { redirect } from "next/navigation";

import { getMovieById } from "@/actions/get-movie-by-id";

import MovieHeader from "@/components/watch/movie-header";

interface WatchMoviePageProps {
  params: {
    movieId: string;
  };
}

const WatchMoviePage = async ({ params }: WatchMoviePageProps) => {
  const { movie, error } = await getMovieById(params.movieId);

  if (error || !movie) {
    return redirect("/browse");
  }

  return (
    <div className="h-screen w-screen bg-black">
      <MovieHeader title={movie.title} />
      <video
        autoPlay
        controls
        className="h-full w-full"
        src={movie.videoUrl}
      ></video>
    </div>
  );
};

export default WatchMoviePage;
