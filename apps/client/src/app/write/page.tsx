import { Suspense } from "react";

import WriteView from "@/views/write/ui";

export default function WritePage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <WriteView />
    </Suspense>
  );
}
