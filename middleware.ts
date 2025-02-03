import { NextRequest } from "next/server";

import { intelRouting } from "./middleware/intel-routing";

export async function middleware(request: NextRequest) {
  return intelRouting(request);
}

export const config = {
  matcher: ["/((?!_next).*)"],
};
