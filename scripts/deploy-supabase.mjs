import fs from "node:fs";
import path from "node:path";
import process from "node:process";
import { spawnSync } from "node:child_process";

function parseArg(name) {
  const prefixed = `--${name}=`;
  const hit = process.argv.find((arg) => arg.startsWith(prefixed));
  if (hit) return hit.slice(prefixed.length);
  const index = process.argv.indexOf(`--${name}`);
  if (index >= 0) return process.argv[index + 1];
  return undefined;
}

function parseEnvValue(raw) {
  const trimmed = String(raw ?? "").trim();
  if (!trimmed) return "";
  if (
    (trimmed.startsWith('"') && trimmed.endsWith('"')) ||
    (trimmed.startsWith("'") && trimmed.endsWith("'"))
  ) {
    return trimmed.slice(1, -1);
  }
  return trimmed;
}

function loadEnvFile(filePath) {
  if (!fs.existsSync(filePath)) return;
  const lines = fs.readFileSync(filePath, "utf8").split(/\r?\n/);
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const match = trimmed.match(/^([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*)$/);
    if (!match) continue;
    const key = match[1];
    const value = parseEnvValue(match[2]);
    if (!process.env[key]) {
      process.env[key] = value;
    }
  }
}

function loadLocalEnv() {
  const cwd = process.cwd();
  loadEnvFile(path.join(cwd, ".env.publish"));
  loadEnvFile(path.join(cwd, ".env.local"));
  loadEnvFile(path.join(cwd, ".env"));
}

function run(command) {
  console.log(`\n> ${command}`);
  const result = spawnSync(command, {
    shell: true,
    stdio: "inherit",
    cwd: process.cwd(),
    env: process.env,
  });
  if (result.status !== 0) {
    process.exit(result.status ?? 1);
  }
}

loadLocalEnv();

const projectRef = parseArg("project-ref") || process.env.SUPABASE_PROJECT_REF;
const skipFunctions = process.argv.includes("--skip-functions");

run("npx supabase --version");

if (projectRef) {
  run(`npx supabase link --project-ref ${projectRef}`);
} else {
  console.log("\nNo project ref provided. Using currently linked Supabase project.");
  console.log("Tip: set SUPABASE_PROJECT_REF or pass --project-ref <ref>.");
}

run("npx supabase db push");

if (!skipFunctions) {
  const functionsDir = path.join(process.cwd(), "supabase", "functions");
  if (fs.existsSync(functionsDir)) {
    const functions = fs
      .readdirSync(functionsDir, { withFileTypes: true })
      .filter((entry) => entry.isDirectory())
      .map((entry) => entry.name)
      .sort();

    for (const fn of functions) {
      run(`npx supabase functions deploy ${fn}`);
    }
  } else {
    console.log("\nNo supabase/functions directory found. Skipping function deploy.");
  }
} else {
  console.log("\nSkipping function deployment (--skip-functions).");
}

console.log("\nSupabase deployment completed.");
