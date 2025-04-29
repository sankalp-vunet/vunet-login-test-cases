
import React, { useRef, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { AuthInput } from "./AuthInput";
import { AuthAlert } from "./AuthAlert";
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "@/components/ui/tooltip";

const loginSchema = z.object({
  username: z.string().min(1, "Username/email field is blank."),
  password: z.string().min(1, "Password field is blank"),
});

type LoginFormData = z.infer<typeof loginSchema>;

const VALID_CREDENTIALS = {
  username: "vunet",
  password: "asdfg@123"
};

export const LoginForm: React.FC = () => {
  const [error, setError] = useState<string | null>(null);
  const [showTooltip, setShowTooltip] = useState<"username" | "password" | null>(null);
  const forgotPasswordRef = useRef<HTMLButtonElement>(null);
  const signInButtonRef = useRef<HTMLButtonElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: "onChange"
  });

  const username = watch("username");
  const password = watch("password");
  const isFormFilled = username && password;

  const validateCredentials = (data: LoginFormData) => {
    if (data.username !== VALID_CREDENTIALS.username) {
      setError("Username or email does not exist.");
      return false;
    }
    if (data.password !== VALID_CREDENTIALS.password) {
      setError("Your password does not match your username or email.");
      return false;
    }
    return true;
  };

  const onSubmit = (data: LoginFormData) => {
    setError(null);
    if (validateCredentials(data)) {
      console.log("Login successful!");
      // Handle successful login here
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement | HTMLButtonElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      formRef.current?.requestSubmit();
    }
  };

  return (
    <>
      {error && <AuthAlert message={error} />}
      <form 
        ref={formRef}
        onSubmit={handleSubmit(onSubmit)} 
        className="flex flex-col gap-6 w-full"
        onBlur={(e) => {
          if (!e.currentTarget.contains(e.relatedTarget as Node)) {
            setShowTooltip(null);
          }
        }}
      >
        <div className="flex flex-col gap-2 w-full">
          <TooltipProvider>
            <Tooltip open={showTooltip === "username" && !!errors.username}>
              <TooltipTrigger asChild>
                <div>
                  <AuthInput
                    {...register("username", {
                      onBlur: () => {
                        if (!watch("username")) {
                          setShowTooltip("username");
                        }
                      }
                    })}
                    placeholder="Username or Email"
                    error={errors.username?.message}
                    aria-label="Username or Email"
                    onKeyDown={handleKeyDown}
                  />
                </div>
              </TooltipTrigger>
              <TooltipContent 
                side="bottom" 
                className="bg-[#ea384c] text-white border-none px-3 py-1"
              >
                {errors.username?.message}
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip open={showTooltip === "password" && !!errors.password}>
              <TooltipTrigger asChild>
                <div>
                  <AuthInput
                    {...register("password", {
                      onBlur: () => {
                        if (!watch("password")) {
                          setShowTooltip("password");
                        }
                      }
                    })}
                    type="password"
                    placeholder="Password"
                    error={errors.password?.message}
                    aria-label="Password"
                    onKeyDown={handleKeyDown}
                  />
                </div>
              </TooltipTrigger>
              <TooltipContent 
                side="bottom" 
                className="bg-[#ea384c] text-white border-none px-3 py-1"
              >
                {errors.password?.message}
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>

        <div className="flex items-center justify-between w-full">
          <button
            ref={forgotPasswordRef}
            type="button"
            className="text-xs text-[#1F62E0] tracking-[0.02px] leading-[18px] underline text-left focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 rounded-sm"
            onKeyDown={handleKeyDown}
            tabIndex={3}
          >
            Forgot password?
          </button>
          <button
            ref={signInButtonRef}
            type="submit"
            className={`inline-flex text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 px-[15px] py-px rounded-sm transition-colors ${
              isFormFilled 
                ? "bg-[#3871DC] text-white hover:bg-[#3871DC]/90" 
                : "bg-[rgba(36,41,46,0.04)] text-[#24292e] hover:bg-[rgba(36,41,46,0.08)]"
            }`}
            onKeyDown={handleKeyDown}
            tabIndex={2}
          >
            Sign in
          </button>
        </div>
      </form>
    </>
  );
};
