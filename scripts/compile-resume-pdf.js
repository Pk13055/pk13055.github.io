/**
 * Step 2 of the resume PDF pipeline.
 *
 * Compiles public/resume.tex (produced by scripts/generate-resume-tex.js)
 * into public/resume.pdf so it ships with the static build and is served
 * at https://pk13055.com/resume.pdf (wget/curl friendly).
 *
 * Compiler resolution order:
 *   1. $RESUME_TEX_COMPILER (explicit override, e.g. "tectonic")
 *   2. tectonic            (self-contained engine; installed in CI)
 *   3. latexmk -pdf        (full TeX distribution)
 *   4. pdflatex            (run twice for cross-references)
 *   5. docker (dxjoke/tectonic-docker) as a local fallback
 */
import { execFileSync, spawnSync } from "child_process";
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const publicDir = path.join(__dirname, "..", "public");
const texFile = path.join(publicDir, "resume.tex");
const pdfFile = path.join(publicDir, "resume.pdf");

try {
  await fs.access(texFile);
} catch {
  console.error(
    "✗ public/resume.tex not found - run `npm run resume:tex` first"
  );
  process.exit(1);
}

function has(cmd) {
  return spawnSync("which", [cmd], { stdio: "ignore" }).status === 0;
}

function run(cmd, args, opts = {}) {
  console.log(`  $ ${cmd} ${args.join(" ")}`);
  execFileSync(cmd, args, { stdio: "inherit", cwd: publicDir, ...opts });
}

function compileWithTectonic(bin = "tectonic") {
  run(bin, ["--keep-logs", "--outdir", publicDir, texFile]);
}

function compileWithLatexmk() {
  run("latexmk", ["-pdf", "-interaction=nonstopmode", `-outdir=${publicDir}`, texFile]);
}

function compileWithPdflatex() {
  const args = [
    "-interaction=nonstopmode",
    "-halt-on-error",
    `-output-directory=${publicDir}`,
    texFile,
  ];
  run("pdflatex", args);
  run("pdflatex", args); // second pass for refs/layout
}

function compileWithDocker() {
  const image = "dxjoke/tectonic-docker";
  run("docker", [
    "run",
    "--rm",
    // image only publishes amd64; emulated on Apple Silicon via Rosetta
    "--platform",
    "linux/amd64",
    "-v",
    `${publicDir}:/work`,
    "-w",
    "/work",
    image,
    "tectonic",
    "resume.tex",
  ]);
}

const override = process.env.RESUME_TEX_COMPILER;
let compiled = false;
const strategies = [];

if (override) {
  strategies.push([override, () => compileWithTectonic(override)]);
} else {
  if (has("tectonic")) strategies.push(["tectonic", compileWithTectonic]);
  if (has("latexmk")) strategies.push(["latexmk", compileWithLatexmk]);
  if (has("pdflatex")) strategies.push(["pdflatex", compileWithPdflatex]);
  if (has("docker")) strategies.push(["docker (tectonic)", compileWithDocker]);
}

if (strategies.length === 0) {
  console.error(
    "✗ No LaTeX toolchain found. Install tectonic (`brew install tectonic`) or ensure docker is running."
  );
  process.exit(1);
}

for (const [name, fn] of strategies) {
  console.log(`Compiling resume.tex with ${name}...`);
  try {
    fn();
    compiled = true;
    break;
  } catch (err) {
    console.warn(`  ${name} failed (${err.message}), trying next option...`);
  }
}

if (!compiled) {
  console.error("✗ All LaTeX compilation strategies failed");
  process.exit(1);
}

// Clean up intermediate build artifacts, keep only .tex + .pdf
const junk = [".aux", ".log", ".out", ".fls", ".fdb_latexmk", ".synctex.gz"];
for (const ext of junk) {
  await fs.rm(path.join(publicDir, `resume${ext}`), { force: true });
}

const { size } = await fs.stat(pdfFile);
console.log(
  `✓ Compiled ${path.relative(process.cwd(), pdfFile)} (${(size / 1024).toFixed(1)} KB)`
);
