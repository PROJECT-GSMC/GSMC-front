import WriteView from "@/views/write/ui";
import { Suspense } from "react";

export default function WritePage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <WriteView />
    </Suspense>
  );
}
