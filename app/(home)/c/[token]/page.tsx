import React from "react";
import { Suspense } from "react";
import { Main } from "@/components/AppComponents";

export default function ChatPage() {
  return (
    <>
      <Suspense fallback={<Main />}>
        <Main />
      </Suspense>
    </>
  );
}

