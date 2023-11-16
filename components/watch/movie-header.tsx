"use client";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

interface MovieHeaderProps {
  title: string;
}

const MovieHeader = ({ title }: MovieHeaderProps) => {
  const router = useRouter();

  const goBack = () => router.back();

  return (
    <nav className="fixed w-full p-4 z-10 flex items-center gap-8 bg-black/70">
      <ArrowLeft
        onClick={goBack}
        className="text-white cursor-pointer"
        size={40}
      />
      <p className="text-white text-xl md:text-3xl font-bold">
        <span className="font-light">Watching:</span>
        {title}
      </p>
    </nav>
  );
};

export default MovieHeader;
