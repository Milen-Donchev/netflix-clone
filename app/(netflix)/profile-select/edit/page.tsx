"use client";
import axios from "axios";
import Link from "next/link";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import type { ProfileColor } from "@prisma/client";

import ColorSelect from "@/components/profile/color-select";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { Checkbox } from "@/components/ui/checkbox";

const ProfileEditPage = () => {
  const router = useRouter();
  const params = useSearchParams();

  const profileId = params.get("id");

  const [isPreparingData, setIsPreparingData] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [color, setColor] = useState<ProfileColor>("BLUE");
  const [username, setUsername] = useState("");
  const [adult, setAdult] = useState(true);

  const prepareData = async () => {
    try {
      if (!profileId) throw new Error("no profile id");
      const response = await axios.get(`/api/profile/${profileId}`);
      setColor(response.data.color);
      setUsername(response.data.name);
      setAdult(response.data.adult);
    } catch (error) {
      router.replace("/profile-select");
      router.refresh();
    } finally {
      setIsPreparingData(false);
    }
  };

  const handleProfileEdit = async () => {
    if (!username) return toast.error("Username is required");
    setIsLoading(true);
    try {
      await axios.put(`/api/profile/${profileId}`, {
        name: username,
        color,
        adult,
      });
      router.replace("/profile-select");
      router.refresh();
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleProfileDelete = async () => {
    setIsLoading(true);
    try {
      await axios.delete(`/api/profile/${profileId}`);
      router.replace("/profile-select");
      router.refresh();
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    prepareData();
  }, []);

  if (isPreparingData) {
    return (
      <div className="flex w-full h-full justify-center items-center">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="flex flex-col w-5/6 lg:w-1/2 gap-y-4">
        <h1 className="md:text-7xl text-3xl text-white">Add Profile</h1>
        <h2 className="text-xl md:text-2xl text-neutral-600">
          Add a profile for another person watching Netflix.
        </h2>
        <div className="w-full h-[1px] md:mb-4 bg-neutral-600" />

        <div className="flex items-center gap-x-4">
          <ColorSelect
            adult={adult}
            selectedColor={color}
            onColorSelect={setColor}
          />
          <div className="w-full">
            <Input
              label="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              checked={!adult}
              onCheckedChange={(checked) => setAdult(!checked)}
              id="terms"
              className="border-neutral-200 w-8 h-8"
            />
            <label
              htmlFor="terms"
              className="text-lg md:text-2xl text-neutral-200 font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Kid?
            </label>
          </div>
        </div>
        <div className="w-full h-[1px] md:mt-4 bg-neutral-600" />
        <div className="flex items-center gap-x-4 mt-8">
          <Button
            loading={isLoading}
            onClick={handleProfileEdit}
            variant="outline"
            className="px-8 text-md md:px-12 md:text-lg hover:bg-red-600 hover:text-white hover:border-red-600"
            size="lg"
          >
            Continue
          </Button>
          <Link href="/profile-select">
            <Button
              variant="outline"
              size="lg"
              className="px-8 text-md md:px-12 md:text-lg bg-transparent border-neutral-400 text-neutral-400"
            >
              Cancel
            </Button>
          </Link>
          <Button
            loading={isLoading}
            onClick={handleProfileDelete}
            size="lg"
            className="ml-auto px-8 text-md md:px-12 md:text-lg bg-red-600 border-red-600 hover:bg-red-700 hover:text-white hover:border-red-700"
          >
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProfileEditPage;
