// This file configures the initialization of Sentry on the server.
// The config you add here will be used whenever the server handles a request.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import { env } from "@/env";
import * as Sentry from "@sentry/nextjs";

if (env.NEXT_PUBLIC_SENTRY_DSN) {
  Sentry.init({
    dsn: env.NEXT_PUBLIC_SENTRY_DSN,
    environment: env.NEXT_PUBLIC_ENVIRONMENT,
    tracesSampleRate: 0.1,
    debug: false,
    includeLocalVariables: true,
    integrations: [Sentry.requestDataIntegration()],
  });
}
