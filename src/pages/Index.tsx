import React from "react";
import { LoginForm } from "@/components/auth/LoginForm";

const Index: React.FC = () => {
  return (
    <div className="min-h-screen w-full bg-[#D5D5D5]">
      <main className="flex items-center justify-center min-h-screen w-full p-4">
        <section className="bg-white w-[300px] p-8 rounded-sm">
          <div className="flex flex-col gap-6 w-full">
            <div className="flex flex-col items-center text-[#24292E] text-center">
              <h1 className="text-lg font-bold tracking-[0.04px] leading-[22px]">
                Sign in
              </h1>
            </div>
            <LoginForm />
          </div>
        </section>
      </main>
    </div>
  );
};

export default Index;
