import { getAuthContext } from "../_shared/auth.ts";
import { handleOptions, jsonResponse } from "../_shared/cors.ts";
import { dispatchBackendOperation, readPayload } from "../_shared/dispatch.ts";

Deno.serve(async (request: Request) => {
  const options = handleOptions(request);
  if (options) return options;
  if (request.method !== "POST") return jsonResponse({ error: "Method not allowed" }, 405);

  const context = getAuthContext(request);
  if (context instanceof Response) return context;

  const body = await readPayload(request);
  if (body instanceof Response) return body;

  try {
    return await dispatchBackendOperation(context, body);
  } catch (error) {
    return jsonResponse({ error: error instanceof Error ? error.message : "Backend dispatch failed" }, 500);
  }
});
