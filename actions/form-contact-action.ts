"use server";

import {
  HUBSPOT_API_BASE_URL,
  TOS_AND_PRIVACY_AGREEMENT_FIELD_NAME,
} from "@/constants/global";
import { env } from "@/env";

interface HubspotBaseSubmitParams {
  formData: FormData;
  portalId: string;
  formId: string;
  additionalFields?: { name: string; value: string }[];
}

async function submitToHubspot({
  formData,
  portalId,
  formId,
  additionalFields = [],
}: HubspotBaseSubmitParams) {
  // Filter out Next.js action-specific fields (starting with $)
  const _fields = Array.from(formData.entries())
    .filter(([name]) => !name.startsWith("$"))
    .map(([name, value]) => ({
      name,
      value,
    }));

  const data = {
    fields: [..._fields, ...additionalFields],
  };

  const response = await fetch(
    `${HUBSPOT_API_BASE_URL}/${portalId}/${formId}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    },
  );

  if (!response.ok) {
    throw new Error("Failed to submit form");
  }

  return response;
}

export async function formContactAction(prevState: any, formData: FormData) {
  try {
    await submitToHubspot({
      formData,
      portalId: env.HUBSPOT_PORTAL_ID as string,
      formId: env.HUBSPOT_CONTACT_FORM_ID as string,
      additionalFields: [
        {
          name: TOS_AND_PRIVACY_AGREEMENT_FIELD_NAME,
          value: "true",
        },
      ],
    });

    return {
      ...prevState,
      success: true,
      error: null,
    };
  } catch (error) {
    return {
      ...prevState,
      success: false,
      error: error || "An error occurred",
    };
  }
}

export async function formPlateformeAction(prevState: any, formData: FormData) {
  try {
    await submitToHubspot({
      formData,
      portalId: env.HUBSPOT_PORTAL_ID as string,
      formId: env.HUBSPOT_PLATEFORME_FORM_ID as string,
      additionalFields: [
        {
          name: TOS_AND_PRIVACY_AGREEMENT_FIELD_NAME,
          value: "true",
        },
      ],
    });

    return {
      ...prevState,
      success: true,
      error: null,
    };
  } catch (error) {
    return {
      ...prevState,
      success: false,
      error: error || "An error occurred",
    };
  }
}

export async function formBlogContactAction(
  prevState: any,
  formData: FormData,
) {
  try {
    await submitToHubspot({
      formData,
      portalId: env.HUBSPOT_PORTAL_ID as string,
      formId: env.HUBSPOT_BLOG_CONTACT_FORM_ID as string,
      additionalFields: [
        {
          name: TOS_AND_PRIVACY_AGREEMENT_FIELD_NAME,
          value: "true",
        },
      ],
    });

    return {
      ...prevState,
      success: true,
      error: null,
    };
  } catch (error) {
    return {
      ...prevState,
      success: false,
      error: error || "An error occurred",
    };
  }
}
