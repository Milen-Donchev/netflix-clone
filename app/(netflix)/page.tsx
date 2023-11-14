import Image from "next/image";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";

import { getCurrentProfile } from "@/actions/get-current-profile";

import AuthForm from "@/components/auth/AuthForm";

export default async function AuthPage() {
  const session = await getServerSession();
  const profile = await getCurrentProfile();

  if (!profile && session) {
    return redirect("/profile-select");
  }

  if (profile && session) {
    return redirect("/browse");
  }

  return (
    <div className='w-full h-full relative bg-[url("/auth-bg.jpg")] bg-no-repeat bg-fixed bg-cover'>
      <div className="bg-black absolute lg:bg-opacity-50 w-full h-full">
        <nav className="py-5 px-12 flex items-center">
          <Image priority src="/logo.png" alt="Logo" width={170} height={100} />
        </nav>

        <div className="flex justify-center">
          <div className="bg-black/70 p-16 self-center mt-2 lg:w-2/5 lg:max-w-md rounded-md w-full">
            <AuthForm />
          </div>
        </div>
      </div>
    </div>
  );
}
