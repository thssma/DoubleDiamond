const fs = require("fs");
const path = require("path");
const vm = require("vm");

const root = path.resolve(__dirname, "..");
const sqlPath = path.join(root, "supabase", "BLOCK3_RLS_PLAN.sql");
const sql = fs.readFileSync(sqlPath, "utf8");
const normalized = sql.toLowerCase().replace(/\s+/g, " ");
const violations = [];

if(/\bfor\s+(insert|update|delete|all)\s+to\s+anon\b/i.test(sql)){
  violations.push("RLS plan contains anon write/all policy.");
}

const context = {
  window: {},
  document: {
    addEventListener(){},
    querySelectorAll(){ return []; },
    getElementById(){ return null; }
  },
  localStorage: { getItem(){ return null; } },
  setTimeout(){},
  clearTimeout(){}
};
context.window = context;

vm.runInNewContext(
  fs.readFileSync(path.join(root, "js", "dd-data-contract.js"), "utf8"),
  context,
  { filename: "js/dd-data-contract.js" }
);

for(const table of context.DDDataContract.BACKEND_REQUIRED_TABLES){
  const escaped = table.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const browserWritePolicy = new RegExp(`on\\s+${escaped}\\s+for\\s+(insert|update|delete|all)\\s+to\\s+authenticated`, "i");
  if(browserWritePolicy.test(normalized)){
    violations.push(`Backend-only table has authenticated write policy: ${table}`);
  }
  const rlsPattern = new RegExp(`alter\\s+table\\s+${escaped}\\s+enable\\s+row\\s+level\\s+security`, "i");
  if(!rlsPattern.test(normalized)){
    violations.push(`Backend-only table is missing RLS enable statement: ${table}`);
  }
}

if(!/app_private\.jwt_company_id/i.test(sql) || !/app_private\.jwt_role/i.test(sql)){
  violations.push("RLS plan is missing JWT helper functions.");
}

if(violations.length){
  console.error("RLS plan validation failed:");
  violations.forEach((violation) => console.error(`- ${violation}`));
  process.exit(1);
}

console.log("RLS plan validation passed.");
