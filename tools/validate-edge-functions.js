const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const functionsDir = path.join(root, "supabase", "functions");
const requiredFunctions = [
  "doublediamond-dispatch",
  "send-whatsapp",
  "send-gmail",
  "send-push",
  "run-automation",
  "run-ai-command"
];
const requiredShared = [
  "_shared/cors.ts",
  "_shared/env.ts",
  "_shared/auth.ts",
  "_shared/dispatch.ts"
];
const requiredSecrets = [
  "META_WHATSAPP_TOKEN",
  "META_WHATSAPP_PHONE_NUMBER_ID",
  "GOOGLE_CLIENT_ID",
  "GOOGLE_CLIENT_SECRET",
  "GOOGLE_REFRESH_TOKEN",
  "PUSH_PROVIDER_SECRET",
  "OPENAI_API_KEY"
];
const violations = [];

for(const file of requiredShared){
  const fullPath = path.join(functionsDir, file);
  if(!fs.existsSync(fullPath)) violations.push(`Missing shared function file: ${file}`);
}

for(const fn of requiredFunctions){
  const fullPath = path.join(functionsDir, fn, "index.ts");
  if(!fs.existsSync(fullPath)){
    violations.push(`Missing Edge Function: ${fn}`);
    continue;
  }
  const source = fs.readFileSync(fullPath, "utf8");
  if(!source.includes("getAuthContext")) violations.push(`${fn} does not check auth context.`);
  if(!source.includes("handleOptions")) violations.push(`${fn} does not handle CORS OPTIONS.`);
  if(!source.includes("dispatchBackendOperation")) violations.push(`${fn} does not use backend dispatcher.`);
}

const dispatch = fs.readFileSync(path.join(functionsDir, "_shared", "dispatch.ts"), "utf8");
for(const secret of requiredSecrets){
  if(!dispatch.includes(secret)) violations.push(`Missing required secret reference: ${secret}`);
}

if(/Deno\.env\.get\([^)]+\)\s*\|\|\s*["'][^"']+["']/.test(dispatch)){
  violations.push("Dispatch should not provide fallback values for provider secrets.");
}

if(violations.length){
  console.error("Edge Function validation failed:");
  violations.forEach((violation) => console.error(`- ${violation}`));
  process.exit(1);
}

console.log("Edge Function validation passed.");
