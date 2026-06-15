const fs = require("fs");
const path = require("path");
const vm = require("vm");

const root = path.resolve(__dirname, "..");
const apiSource = fs.readFileSync(path.join(root, "js", "dd-api.js"), "utf8");
const contractSource = fs.readFileSync(path.join(root, "js", "dd-data-contract.js"), "utf8");
const violations = [];

if(!apiSource.includes("isBackendRequiredTable(tableName)")) {
  violations.push("DDApi write methods do not guard backend-only tables.");
}

if(!apiSource.includes("backendPlaceholderResponse")) {
  violations.push("DDApi is missing explicit backend placeholder response.");
}

const context = { window: {} };
context.window = context;
vm.runInNewContext(contractSource, context, { filename: "js/dd-data-contract.js" });

const backendTables = context.DDDataContract.BACKEND_REQUIRED_TABLES;
for(const table of backendTables){
  if(!apiSource.includes("BACKEND_REQUIRED_TABLES") && !apiSource.includes("DDDataContract")){
    violations.push(`DDApi is not connected to DDDataContract for ${table}.`);
  }
}

if(violations.length){
  console.error("Backend boundary validation failed:");
  violations.forEach((violation) => console.error(`- ${violation}`));
  process.exit(1);
}

console.log("Backend boundary validation passed.");
