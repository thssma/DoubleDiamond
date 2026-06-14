const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const allowList = new Set([
  path.join(root, "js", "dd-config.js"),
  path.join(root, "js", "dd-auth.js"),
  path.join(root, "docs", "BLOCK3_SECURITY_DATA.md"),
  path.join(root, "README.md")
]);

const textExtensions = new Set([".js", ".html", ".css", ".md", ".sql", ".txt"]);
const forbiddenPatterns = [
  { name: "service role key", pattern: /service[_-]?role/i },
  { name: "OpenAI secret key", pattern: /sk-[A-Za-z0-9_-]{20,}/ },
  { name: "private key block", pattern: /-----BEGIN (RSA |EC |OPENSSH |)PRIVATE KEY-----/ },
  { name: "generic assigned secret", pattern: /\b(secret|password|token)\s*[:=]\s*["'][^"']{12,}["']/i }
];

function walk(dir){
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const fullPath = path.join(dir, entry.name);
    if(entry.isDirectory()){
      if([".git", "node_modules"].includes(entry.name)) return [];
      return walk(fullPath);
    }
    return [fullPath];
  });
}

const violations = [];

for(const file of walk(root)){
  if(!textExtensions.has(path.extname(file))) continue;
  const content = fs.readFileSync(file, "utf8");
  for(const rule of forbiddenPatterns){
    if(rule.pattern.test(content) && !allowList.has(file)){
      violations.push(`${path.relative(root, file)}: ${rule.name}`);
    }
  }
}

if(violations.length){
  console.error("Security scope validation failed:");
  violations.forEach((violation) => console.error(`- ${violation}`));
  process.exit(1);
}

console.log("Security scope validation passed.");
