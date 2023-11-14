import Link from "next/link";
import { getCurrentUser } from "@/actions/get-current-user";

import ProfileButton from "@/components/profile/profile-button";
import AddProfileButton from "@/components/profile/add-profile-button";

import { Button } from "@/components/ui/button";

const ProfileSelectPage = async () => {
  const currentUser = await getCurrentUser();
  const profiles = currentUser?.profiles;

  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-5/6 flex flex-col items-center gap-y-4">
        <h1 className="md:text-5xl lg:text-7xl text-2xl text-white mb-8">
          Who's watching?
        </h1>
        <div className="flex flex-wrap gap-x-4 md:gap-x-8">
          {profiles?.map((profile) => (
            <ProfileButton key={profile.id} {...profile} />
          ))}
          {!profiles || (profiles?.length < 5 && <AddProfileButton />)}
        </div>
        <Link href="/profile-select/manage">
          <Button
            size="lg"
            variant="outline"
            className="bg-transparent mt-12 text-neutral-200 md:text-xl md:p-8"
          >
            Manage profiles
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default ProfileSelectPage;
