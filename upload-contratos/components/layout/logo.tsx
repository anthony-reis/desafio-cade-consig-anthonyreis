"use client";

import Image from "next/image";

export function LogoComponent() {
  return (
    <div className="flex items-center">
      <Image
        src="/logo.png"
        alt="Cade Consig Logo"
        width={40}
        height={40}
        unoptimized
        priority
      />
    </div>
  );
}
