import { Suspense } from "react";
import { Main } from "../../components/AppComponents";
export default async function Home() {

  return (
    <Suspense fallback={<Main/>}>
      <Main />
    </Suspense>
  );
}
