import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

const readVariable = (
  key: string,
  defaultValue: string | number | boolean | undefined = undefined,
) => {
  if (typeof window === "undefined" || window.__ENV == null)
    return defaultValue;
  else return window.__ENV[key] || defaultValue;
};

export const env = createEnv({
  server: {
    DIRECTUS_LIVE_PREVIEW_TOKEN: z.string().optional(),
    HUBSPOT_PORTAL_ID: z.string().optional(),
    HUBSPOT_CONTACT_FORM_ID: z.string().optional(),
    HUBSPOT_PLATEFORME_FORM_ID: z.string().optional(),
    HUBSPOT_BLOG_CONTACT_FORM_ID: z.string().optional(),
  },
  client: {
    NEXT_PUBLIC_ENVIRONMENT: z.enum(["production", "development"]),
    NEXT_PUBLIC_SENTRY_DSN: z.string().optional(),
    NEXT_PUBLIC_DIRECTUS_URL: z
      .string()
      .optional()
      .default("https://back-marin.fasfox.net"),
  },
  /**
   * You can't destruct `process.env` as a regular object in the Next.js edge runtimes (e.g.
   * middlewares) or client-side so we need to destruct manually.
   */
  runtimeEnv: {
    DIRECTUS_LIVE_PREVIEW_TOKEN:
      process.env.DIRECTUS_LIVE_PREVIEW_TOKEN ||
      readVariable("DIRECTUS_LIVE_PREVIEW_TOKEN"),
    NEXT_PUBLIC_ENVIRONMENT:
      process.env.NEXT_PUBLIC_ENVIRONMENT ||
      readVariable("NEXT_PUBLIC_ENVIRONMENT", "production"),
    NEXT_PUBLIC_DIRECTUS_URL:
      process.env.NEXT_PUBLIC_DIRECTUS_URL ||
      readVariable("NEXT_PUBLIC_DIRECTUS_URL", "https://back-marin.fasfox.net"),
    NEXT_PUBLIC_SENTRY_DSN:
      process.env.NEXT_PUBLIC_SENTRY_DSN ||
      readVariable("NEXT_PUBLIC_SENTRY_DSN"),
    HUBSPOT_PORTAL_ID:
      process.env.HUBSPOT_PORTAL_ID || readVariable("HUBSPOT_PORTAL_ID"),
    HUBSPOT_CONTACT_FORM_ID:
      process.env.HUBSPOT_CONTACT_FORM_ID ||
      readVariable("HUBSPOT_CONTACT_FORM_ID"),
    HUBSPOT_PLATEFORME_FORM_ID:
      process.env.HUBSPOT_PLATEFORME_FORM_ID ||
      readVariable("HUBSPOT_PLATEFORME_FORM_ID"),
    HUBSPOT_BLOG_CONTACT_FORM_ID:
      process.env.HUBSPOT_BLOG_CONTACT_FORM_ID ||
      readVariable("HUBSPOT_BLOG_CONTACT_FORM_ID"),
  },
  /**
   * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially
   * useful for Docker builds.
   */
  skipValidation: !!process.env.SKIP_ENV_VALIDATION,
  /**
   * Makes it so that empty strings are treated as undefined. `SOME_VAR: z.string()` and
   * `SOME_VAR=''` will throw an error.
   */
  emptyStringAsUndefined: true,
});
