import { ReactNode } from "react";
import logo from "@/public/logo.png";
import Image from "next/image";

function layout({ children }: { children: ReactNode }) {
  return (
    <div className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-gradient-to-br from-blue-50 via-white to-purple-50 p-4">
      <div className="absolute -left-4 top-20 h-72 w-72 animate-pulse rounded-full bg-purple-300 opacity-20 blur-3xl" />
      <div className="absolute -right-4 bottom-20 h-72 w-72 animate-pulse rounded-full bg-blue-300 opacity-20 blur-3xl animation-delay-2000" />

      <div className="relative z-10 flex w-full max-w-screen-2xl flex-col items-center justify-center gap-6">
        <div className="animate-fade-in-down">
          <div className="group relative">
            <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 opacity-75 blur transition duration-1000 group-hover:opacity-100 group-hover:duration-200" />
            <div className="relative rounded-full bg-white p-4 ring-1 ring-gray-900/5">
              <Image
                src={logo}
                alt="Logo"
                width={80}
                height={80}
                className="transition-transform duration-300 group-hover:scale-110"
              />
            </div>
          </div>
        </div>

        {/* Card de login - centralizado */}
        <div className="flex w-full animate-fade-in-up animation-delay-150 justify-center">
          {children}
        </div>
      </div>
    </div>
  );
}

export default layout;
