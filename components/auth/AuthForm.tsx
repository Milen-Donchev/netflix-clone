"use client";
import * as z from "zod";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

import FormFrame from "@/components/auth/FormFrame";
import FormInput from "@/components/auth/FormInput";

import { Button } from "@/components/ui/button";

const formSchema = z.object({
  username: z
    .string()
    .min(3, "Username should be at least 3 characters")
    .max(50, "Username should not be longer than 50 characters")
    .optional(),
  email: z.string().email(),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(50, "Password cannot be longer than 50 characters")
    .regex(
      /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,32}$/,
      "Password must have at least one lowercase character, one uppercase character and a number"
    ),
});

type FormData = z.infer<typeof formSchema>;

const AuthForm = () => {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const [variant, setVariant] = useState<"login" | "register">("login");

  const handleLogin = async (email: string, password: string) =>
    await signIn("credentials", {
      email,
      password,
      callbackUrl: "/",
      redirect: false,
    });

  const onSubmit = async (values: FormData) => {
    setIsLoading(true);

    if (variant === "login") {
      const response = await handleLogin(values.email, values.password);
      if (!response?.ok && response?.error) {
        toast.error(response.error);
        return setIsLoading(false);
      }
      router.replace("/browse");
    } else {
      try {
        const response = await axios.post("/api/auth/register", {
          username: values.username,
          email: values.email,
          password: values.password,
        });
        await handleLogin(response.data.email, values.password);
        router.replace("/browse");
      } catch (error: any) {
        toast.error(error?.response?.data ?? "Unexpected error");
      } finally {
        setIsLoading(false);
      }
    }
  };

  const toggleVariant = () =>
    setVariant((vari) => (vari === "login" ? "register" : "login"));

  return (
    <>
      <h2 className="text-white text-4xl mb-8">
        {variant === "login" ? "Sign in" : "Sign up"}
      </h2>
      <FormFrame
        validationSchema={formSchema}
        defaultValues={{
          email: "",
          password: "",
          ...(variant === "register" && { username: "" }),
        }}
        onSubmit={onSubmit}
        className="flex flex-col gap-y-4"
      >
        {(form) => (
          <>
            {variant === "register" && (
              <FormInput<FormData>
                control={form.control}
                label="Username"
                name="username"
                isInvalid={!!form.formState.errors.username}
              />
            )}
            <FormInput<FormData>
              control={form.control}
              label="Email or phone number"
              name="email"
              isInvalid={!!form.formState.errors.email}
            />
            <FormInput<FormData>
              control={form.control}
              label="Password"
              name="password"
              type="password"
              isInvalid={!!form.formState.errors.password}
            />
            <Button
              className="mt-6 bg-red-700 text-lg font-light hover:bg-red-800 transition-colors h-14"
              size="lg"
              type="submit"
              loading={isLoading}
            >
              {variant === "login" ? "Sign in" : "Sign up"}
            </Button>

            <p className="text-neutral-500 font-light">
              {variant === "login"
                ? "New to Netflix?"
                : "Already have an account?"}
              &nbsp;
              <span
                onClick={() => {
                  toggleVariant();
                  form.reset({ email: "", username: "", password: "" });
                }}
                className="text-neutral-100 font-light cursor-pointer"
              >
                {variant === "login" ? "Sign up now" : "Sign in"}
              </span>
              .
            </p>
          </>
        )}
      </FormFrame>
    </>
  );
};

export default AuthForm;
