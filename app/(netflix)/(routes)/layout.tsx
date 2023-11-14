import { redirect } from "next/navigation";

import { getCurrentProfile } from "@/actions/get-current-profile";

import Navbar from "@/components/browse/navbar";

const BrowseLayout = async ({ children }: { children: React.ReactNode }) => {
  const profile = await getCurrentProfile();

  if (!profile) {
    return redirect("/profile-select");
  }

  return (
    <div>
      <Navbar profile={profile} />
      <main>{children}</main>
    </div>
  );
};

export default BrowseLayout;
