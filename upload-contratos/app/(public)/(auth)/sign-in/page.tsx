import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { LoginForm } from "@/components/forms/login-form";

export default function SignInPage() {
  return (
    <Card className="w-[95%] border-0 bg-white/80 shadow-2xl backdrop-blur-sm transition-all duration-300 hover:shadow-3xl sm:w-[85%] md:w-[75%] lg:w-[60%]">
      <CardHeader className="space-y-2 px-6 pb-6 pt-8 sm:px-8 md:px-10 md:pb-8 md:pt-10">
        <CardTitle className="bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-3xl font-bold text-transparent sm:text-4xl">
          Bem-vindo
        </CardTitle>
        <CardDescription className="text-base sm:text-lg">
          Faça login para acessar o sistema de contratos
        </CardDescription>
      </CardHeader>
      <CardContent className="px-6 pb-8 sm:px-8 md:px-10 md:pb-10">
        <LoginForm />
      </CardContent>
    </Card>
  );
}
