const fs = require("fs");
const path = require("path");
const vm = require("vm");

const root = path.resolve(__dirname, "..");

function loadBrowserScript(relativePath, context){
  const filePath = path.join(root, relativePath);
  const code = fs.readFileSync(filePath, "utf8");
  vm.runInNewContext(code, context, { filename: relativePath });
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

loadBrowserScript("js/dd-data.js", context);
loadBrowserScript("js/ui/dd-product-ux.js", context);
loadBrowserScript("js/dd-data-contract.js", context);

const allTables = new Set(context.DDData.TABLES.map((entry) => entry[1]));
const mvpRoutes = new Set(Object.values(context.DDProductUX.MVP_ROUTES).flat());
const contractRoutes = new Set(Object.keys(context.DDDataContract.MVP_ROUTE_TABLES));
const validAccess = new Set(Object.values(context.DDDataContract.TABLE_ACCESS));
const violations = [];

for(const route of mvpRoutes){
  if(!contractRoutes.has(route)){
    violations.push(`Missing data contract for MVP route: ${route}`);
  }
}

for(const route of contractRoutes){
  if(!mvpRoutes.has(route)){
    violations.push(`Data contract includes non-MVP route: ${route}`);
  }
  const entries = context.DDDataContract.MVP_ROUTE_TABLES[route];
  if(!Array.isArray(entries) || entries.length === 0){
    violations.push(`Data contract route has no tables: ${route}`);
    continue;
  }
  for(const entry of entries){
    const [table, access] = entry;
    if(!allTables.has(table)){
      violations.push(`Unknown table in data contract: ${route} -> ${table}`);
    }
    if(!validAccess.has(access)){
      violations.push(`Invalid access level in data contract: ${route} -> ${table} (${access})`);
    }
  }
}

for(const table of context.DDDataContract.BACKEND_REQUIRED_TABLES){
  if(!allTables.has(table)){
    violations.push(`Backend-required table is not loaded by DDData: ${table}`);
  }
}

if(violations.length){
  console.error("Data contract validation failed:");
  violations.forEach((violation) => console.error(`- ${violation}`));
  process.exit(1);
}

console.log("Data contract validation passed.");
