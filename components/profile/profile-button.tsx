"use client";
import axios from "axios";
import toast from "react-hot-toast";
import { Pencil } from "lucide-react";
import { useRouter } from "next/navigation";
import { ProfileColor } from "@prisma/client";

import Avatar from "@/components/profile/avatar";

interface ProfileButtonProps {
  id: string;
  name: string;
  color: ProfileColor;
  adult?: boolean;
  editMode?: boolean;
}

const ProfileButton = ({
  id,
  name,
  color,
  adult = true,
  editMode = false,
}: ProfileButtonProps) => {
  const router = useRouter();

  const handleClick = async () => {
    try {
      await axios.put("/api/user/profile", { profileId: id });
      router.push("/browse");
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const handleEdit = () => router.push(`/profile-select/edit?id=${id}`);

  return (
    <div
      onClick={editMode ? handleEdit : handleClick}
      className="group relative flex flex-col items-center gap-y-4 cursor-pointer"
    >
      <Avatar color={color} adult={adult} />
      <h2 className="text-md max-w-[6rem] md:max-w-[10rem] truncate text-center md:text-2xl text-neutral-400 group-hover:text-neutral-200 transition-colors">
        {name}
      </h2>
      {editMode && (
        <div className="absolute w-full h-[calc(100%-2.5rem)] rounded-md md:h-[calc(100%-3rem)] flex justify-center cursor-pointer items-center bg-black/70">
          <Pencil className="w-8 h-8 md:w-16 md:h-16 text-neutral-400 group-hover:text-neutral-200" />
        </div>
      )}
    </div>
  );
};

export default ProfileButton;
