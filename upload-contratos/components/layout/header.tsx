"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { LogOut, User, Upload } from "lucide-react";
import { useCurrentUser } from "@/hooks/use-current-user";
import { useAuth } from "@/hooks/use-auth";
import { LogoComponent } from "./logo";

export function Header() {
  const router = useRouter();
  const { data: user, isLoading } = useCurrentUser();
  const { logout } = useAuth();

  function getInitials(nome: string) {
    return nome
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  }

  async function handleLogout() {
    await logout();
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white">
      <div className="flex h-14 sm:h-16 items-center px-4 sm:px-6 md:px-8 max-w-7xl mx-auto">
        {/* Logo */}
        <div
          className="flex items-center gap-2 mr-4 sm:mr-6 cursor-pointer"
          onClick={() => router.push("/")}
        >
          <LogoComponent />
          <span className="font-semibold text-base sm:text-lg hidden sm:inline">
            Cadê Consig
          </span>
        </div>

        {/* Navigation */}
        <nav className="flex items-center gap-2 sm:gap-4 flex-1">
          <Button
            variant="ghost"
            onClick={() => router.push("/")}
            className="text-xs sm:text-sm h-8 sm:h-9 px-2 sm:px-4"
          >
            Contratos
          </Button>
          <Button
            variant="ghost"
            onClick={() => router.push("/upload")}
            className="text-xs sm:text-sm h-8 sm:h-9 px-2 sm:px-4"
          >
            <Upload className="w-3 h-3 sm:w-4 sm:h-4 sm:mr-2" />
            <span className="hidden sm:inline">Upload</span>
          </Button>
        </nav>

        {/* User Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="relative h-8 w-8 sm:h-10 sm:w-10 rounded-full"
              disabled={isLoading}
            >
              <Avatar className="h-8 w-8 sm:h-10 sm:w-10">
                <AvatarFallback className="bg-primary text-white text-xs sm:text-sm">
                  {user ? getInitials(user.usuario) : "?"}
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end" forceMount>
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">
                  {user?.usuario || "Carregando..."}
                </p>
                <p className="text-xs leading-none text-muted-foreground">
                  Sistema de Contratos
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />

            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={handleLogout}
              className="text-destructive"
            >
              <LogOut className="mr-2 h-4 w-4" />
              <span>Sair</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
