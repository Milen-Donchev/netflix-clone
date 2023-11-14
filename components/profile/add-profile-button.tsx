import { PlusCircle } from "lucide-react";
import Link from "next/link";

const AddProfileButton = () => {
  return (
    <Link href="/profile-select/new">
      <div className="group flex flex-col items-center gap-y-4 cursor-pointer">
        <div className="p-4 group-hover:bg-neutral-200 transition-colors rounded-md">
          <PlusCircle
            className="
            w-16
            h-16
            md:w-32
            md:h-32
            fill-neutral-400
            stroke-neutral-900
            group-hover:stroke-neutral-200
            group-hover:fill-neutral-500
            transition-colors
          "
          />
        </div>
        <h2 className="text-md md:text-2xl text-neutral-400 group-hover:text-neutral-200 transition-colors">
          Add Profile
        </h2>
      </div>
    </Link>
  );
};

export default AddProfileButton;
