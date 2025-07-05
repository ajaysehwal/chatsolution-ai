"use client";
import { Suspense } from "react";
import { Main } from "../../components/AppComponents";
export default function Home() {
  return (
    <Suspense fallback={<Main />}>
      <Main />
    </Suspense>
  );
}
