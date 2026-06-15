const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const index = fs.readFileSync(path.join(root, "index.html"), "utf8");
const auth = fs.readFileSync(path.join(root, "js", "dd-auth.js"), "utf8");
const supabaseAuth = fs.readFileSync(path.join(root, "js", "dd-supabase-auth.js"), "utf8");
const violations = [];

if(!index.includes('src="js/dd-supabase-auth.js"')){
  violations.push("index.html does not load dd-supabase-auth.js.");
}

if(index.indexOf('src="js/dd-supabase-auth.js"') > index.indexOf('src="js/dd-auth.js"')){
  violations.push("dd-supabase-auth.js should load before dd-auth.js.");
}

if(!auth.includes("config.DEMO_MODE === false") || !auth.includes("return false")){
  violations.push("DDAuth does not disable staff PIN validation when DEMO_MODE=false.");
}

["signInWithPassword", "signOut", "userMetadata", "/auth/v1/"].forEach((needle) => {
  if(!supabaseAuth.includes(needle)) violations.push(`DDSupabaseAuth missing ${needle}.`);
});

if(violations.length){
  console.error("Auth foundation validation failed:");
  violations.forEach((violation) => console.error(`- ${violation}`));
  process.exit(1);
}

console.log("Auth foundation validation passed.");
