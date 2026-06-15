const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const index = fs.readFileSync(path.join(root, "index.html"), "utf8");
const api = fs.readFileSync(path.join(root, "js", "dd-api.js"), "utf8");
const backend = fs.readFileSync(path.join(root, "js", "dd-backend.js"), "utf8");
const config = fs.readFileSync(path.join(root, "js", "dd-config.js"), "utf8");
const violations = [];

function position(script){
  return index.indexOf(`src="${script}"`);
}

[
  "js/dd-config.js",
  "js/dd-storage.js",
  "js/dd-data-contract.js",
  "js/dd-backend.js",
  "js/dd-api.js"
].forEach((script) => {
  if(position(script) === -1) violations.push(`Missing script in index.html: ${script}`);
});

if(position("js/dd-data-contract.js") > position("js/dd-api.js")){
  violations.push("dd-data-contract.js must load before dd-api.js.");
}

if(position("js/dd-backend.js") > position("js/dd-api.js")){
  violations.push("dd-backend.js must load before dd-api.js.");
}

if(!config.includes("BACKEND_ENDPOINTS")){
  violations.push("DDConfig is missing BACKEND_ENDPOINTS runtime config.");
}

if(!backend.includes("requestBackendOperation") || !backend.includes("source: \"doublediamond-frontend\"")){
  violations.push("DDBackend is missing requestBackendOperation payload contract.");
}

if(!api.includes("backendWriteResponse") || !api.includes("window.DDBackend.requestBackendOperation")){
  violations.push("DDApi does not route backend-only writes through DDBackend.");
}

if(violations.length){
  console.error("Backend foundation validation failed:");
  violations.forEach((violation) => console.error(`- ${violation}`));
  process.exit(1);
}

console.log("Backend foundation validation passed.");
