const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const runbookPath = path.join(root, "docs", "SUPABASE_GO_LIVE_RUNBOOK.md");
const content = fs.readFileSync(runbookPath, "utf8");

const requiredTerms = [
  "supabase login",
  "supabase link --project-ref PROJECT_REF",
  "META_WHATSAPP_TOKEN",
  "META_WHATSAPP_PHONE_NUMBER_ID",
  "GOOGLE_CLIENT_ID",
  "GOOGLE_CLIENT_SECRET",
  "GOOGLE_REFRESH_TOKEN",
  "PUSH_PROVIDER_SECRET",
  "OPENAI_API_KEY",
  "supabase functions deploy doublediamond-dispatch",
  "supabase functions deploy send-whatsapp",
  "supabase functions deploy send-gmail",
  "supabase functions deploy send-push",
  "supabase functions deploy run-automation",
  "supabase functions deploy run-ai-command",
  "supabase/BLOCK3_RLS_PLAN.sql",
  "SQL_V61_ROLE_EXPERIENCE.sql",
  "company_id",
  "role",
  "DEMO_MODE: false",
  "BACKEND_ENDPOINTS",
  "node tools/validate-release.js",
  "Production Smoke",
  "Final Gate"
];

const violations = requiredTerms.filter((term) => !content.includes(term));

if(violations.length){
  console.error("Supabase runbook validation failed:");
  violations.forEach((term) => console.error(`- Missing: ${term}`));
  process.exit(1);
}

console.log("Supabase runbook validation passed.");
