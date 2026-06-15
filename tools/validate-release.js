const { spawnSync } = require("child_process");
const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const node = process.execPath;

function listFiles(dir, ext){
  return fs.readdirSync(path.join(root, dir), { withFileTypes: true }).flatMap((entry) => {
    const fullPath = path.join(dir, entry.name);
    if(entry.isDirectory()) return listFiles(fullPath, ext);
    return entry.name.endsWith(ext) ? [fullPath] : [];
  });
}

function run(label, command, args){
  const result = spawnSync(command, args, {
    cwd: root,
    encoding: "utf8",
    shell: false
  });

  if(result.stdout) process.stdout.write(result.stdout);
  if(result.stderr) process.stderr.write(result.stderr);

  if(result.status !== 0){
    console.error(`Release validation failed: ${label}`);
    process.exit(result.status || 1);
  }
}

run("script syntax", node, ["--check", "script.js"]);

for(const file of listFiles("js", ".js")){
  run(`syntax ${file}`, node, ["--check", file]);
}

for(const file of listFiles("tools", ".js")){
  run(`syntax ${file}`, node, ["--check", file]);
}

[
  "tools/validate-mvp-scope.js",
  "tools/validate-security-scope.js",
  "tools/validate-data-contract.js",
  "tools/validate-rls-plan.js",
  "tools/validate-backend-boundary.js",
  "tools/validate-backend-foundation.js",
  "tools/validate-edge-functions.js"
].forEach((file) => run(file, node, [file]));

console.log("Release validation passed.");
