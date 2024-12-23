"use client";

import React, { useEffect, useState } from "react";
import { Input } from "../ui/input";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useToast } from "../ui/use-toast";
import { Button } from "../ui/button";
import { HiEye, HiEyeSlash } from "react-icons/hi2";
import Image from "next/image";
import Link from "next/link";
import { BASE_API_URL } from "../..";

function RegisterForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const router = useRouter();
  const { toast } = useToast();
  const session = useSession();

  useEffect(() => {
    if (session.status === "authenticated") {
      router.push("/dashboard");
      router.refresh();
    }
  }, [session, router]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      setSubmitting(true);
      const res = await fetch(`${BASE_API_URL}/api/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email.toLowerCase(),
          password: formData.password,
        }),
      });

      const msg = await res.json();
      const message = msg.message || 'Something went wrong, please try again.'; // Fallback message if not available

      if (!res.ok) {
        setSubmitting(false);
        toast({
          description: message,
          variant: "destructive",
        });
      } else {
        setSubmitting(false);
        toast({
          description: message,
          variant: "success",
        });
        router.push("/"); // Redirect to login or home after successful registration
      }
    } catch (error: any) {
      setSubmitting(false);
      toast({
        description: 'An error occurred during registration. Please try again.',
        variant: "destructive",
      });
      console.error('Registration Error:', error);
    }
  };

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div className="flex min-h-[700px] items-center justify-center p-4 text-black">
      <div className="flex max-w-7xl rounded-xl bg-white">
        {/* FinTrackerer Illustration */}
        <div className="hidden max-w-96 flex-col justify-center gap-8 p-8 shadow-[5px_0px_10px_1px_#edf2f7] md:flex">
          <h2 className="text-center text-4xl font-bold italic text-main-cyan">
            FinTracker
          </h2>
          <div>
          <Image
              src={"/assets/logo.jpeg"}
              alt="illustrator"
              width={350}
              height={400}
            />
          </div>
        </div>
        {/* Register Form */}
        <div className="px-12 py-8">
          <h2 className="mb-4 text-center text-4xl font-bold italic text-main-cyan md:hidden">
            FinTracker
          </h2>
          <h3 className="text-xl font-bold md:text-2xl">Register an Account</h3>
          <p className="mb-6 text-xs md:text-base">
            Register an account to start using FinTrackerer
          </p>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-4">
              <div className="space-y-2">
                <label
                  htmlFor="name"
                  className="font-semibold after:ml-0.5 after:text-red-500 after:content-['*']"
                >
                  Name
                </label>
                <Input
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Enter your name"
                  autoComplete="off"
                  required
                  className="w-full rounded-md bg-[#f2f2f2] py-6 text-base"
                  onChange={handleChange}
                  value={formData.name}
                />
              </div>
              <div className="space-y-2">
                <label
                  htmlFor="email"
                  className="font-semibold after:ml-0.5 after:text-red-500 after:content-['*']"
                >
                  Email
                </label>
                <Input
                  type="text"
                  name="email"
                  id="email"
                  placeholder="Enter your email"
                  autoComplete="off"
                  required
                  className="w-full rounded-md bg-[#f2f2f2] py-6 text-base"
                  onChange={handleChange}
                  value={formData.email}
                />
              </div>
              <div className="relative flex items-center">
                <div className="relative w-full space-y-2">
                  <label
                    htmlFor="password"
                    className="font-semibold after:ml-0.5 after:text-red-500 after:content-['*']"
                  >
                    Password
                  </label>
                  <Input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    id="password"
                    placeholder="Password"
                    autoComplete="off"
                    required
                    className="w-full rounded-md bg-[#f2f2f2] py-6 text-base"
                    onChange={handleChange}
                    value={formData.password}
                  />
                </div>
                <div
                  className="absolute bottom-3 right-4 cursor-pointer text-[#999999]"
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  {!showPassword ? (
                    <HiEye size={25} />
                  ) : (
                    <HiEyeSlash size={25} />
                  )}
                </div>
              </div>
            </div>
            <Button
              type="submit"
              disabled={submitting}
              className="mt-6 w-full bg-main-cyan text-lg font-bold hover:bg-main-cyan/80"
            >
              {submitting ? "Registering..." : "Register"}
            </Button>
          </form>
          <div className="mt-4 text-center">
            <Link
              href={"/"}
              className="font-semibold duration-200 hover:text-gray-400"
            >
              Already have an account? <span className="underline">Login</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegisterForm;
