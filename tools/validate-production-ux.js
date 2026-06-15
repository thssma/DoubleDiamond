const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const checks = [
  {
    file: "README.md",
    forbidden: [
      "## Demo Access",
      "owner123",
      "field123",
      "These PINs are demo-only"
    ]
  },
  {
    file: "script.js",
    forbidden: [
      "Pilot access. Secure Supabase Auth can be connected in the next phase.",
      "V1 commercial demo. Supabase Auth can replace local session in the next backend sprint.",
      "Demo staff PINs are configured in DDConfig."
    ]
  }
];

const violations = [];

for(const check of checks){
  const content = fs.readFileSync(path.join(root, check.file), "utf8");
  for(const text of check.forbidden){
    if(content.includes(text)) violations.push(`${check.file}: forbidden production UX text: ${text}`);
  }
}

if(violations.length){
  console.error("Production UX validation failed:");
  violations.forEach((violation) => console.error(`- ${violation}`));
  process.exit(1);
}

console.log("Production UX validation passed.");
