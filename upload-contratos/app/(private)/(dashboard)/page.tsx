import { Suspense } from "react";
import HomeClient from "../../../components/contratos/home-client";

export default function Page() {
  return (
    <Suspense fallback={<div>Carregando contratos...</div>}>
      <HomeClient />
    </Suspense>
  );
}
