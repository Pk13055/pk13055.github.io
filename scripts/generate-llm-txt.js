import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const {
  profile,
  highlights,
  experiences,
  projects,
  skillGroups,
  education,
  researchExperiences,
  otherExperiences,
  communityInvolvement,
} = await import("../src/data/resume.js");

function render() {
  const lines = [];

  const h1 = (t) => lines.push(`# ${t}`, "");
  const h2 = (t) => lines.push(`## ${t}`, "");
  const h3 = (t) => lines.push(`### ${t}`, "");
  const p = (t) => lines.push(t, "");
  const li = (t) => lines.push(`- ${t}`);
  const hr = () => lines.push("---", "");

  // ---------- Header ----------
  h1(profile.name);
  p(`**${profile.title}**`);
  p(
    [
      `Email: ${profile.email}`,
      `Website: ${profile.website}`,
      `GitHub: ${profile.github}`,
      `LinkedIn: ${profile.linkedin}`,
    ].join("  \n")
  );
  hr();

  // ---------- Summary ----------
  h2("Executive Summary");
  p(profile.summary);
  hr();

  // ---------- Key Highlights ----------
  h2("Key Highlights");
  for (const h of highlights) {
    h3(h.title);
    p(h.content);
  }
  hr();

  // ---------- Skills ----------
  h2("Technical Skills");
  for (const group of skillGroups) {
    lines.push(`**${group.category}:** ${group.skills.join(", ")}`, "");
  }
  hr();

  // ---------- Professional Experience ----------
  h2("Professional Experience");
  for (const job of experiences) {
    const company = job.companyUrl
      ? `[${job.company}](${job.companyUrl})`
      : job.company;
    const location = job.location ? ` — ${job.location}` : "";
    h3(`${job.title} @ ${job.company}${location}`);
    lines.push(`*${job.period}*`, "");
    for (const a of job.achievements) li(a);
    lines.push("");
  }
  hr();

  // ---------- Projects ----------
  h2("Innovation & Key Projects");
  for (const proj of projects) {
    h3(`${proj.title} — ${proj.client} (${proj.period})`);
    p(`**Problem:** ${proj.problem}`);
    p(`**Solution:** ${proj.solution}`);
    p(`**Results:** ${proj.results}`);
    p(`**Tech:** ${proj.tech.join(", ")}`);
  }
  hr();

  // ---------- Research & Internships ----------
  h2("Internships & Research");
  for (const r of researchExperiences) {
    const loc = r.location ? ` — ${r.location}` : "";
    h3(`${r.title} @ ${r.organization}${loc}`);
    lines.push(`*${r.period}*`, "");
    p(r.description);
  }
  hr();

  // ---------- Education ----------
  h2("Education");
  h3(`${education.degree} in ${education.field}`);
  lines.push(
    `${education.institution}, ${education.location}  `,
    `*${education.period}*`,
    ""
  );
  p(`**Selected Coursework:** ${education.courses.join(", ")}`);
  p(`_${education.note}_`);
  hr();

  // ---------- Other Experience ----------
  h2("Other Experience & Leadership");
  for (const exp of otherExperiences) {
    h3(`${exp.title} @ ${exp.organization}`);
    lines.push(`*${exp.period}*`, "");
    p(exp.description);
  }

  h3("Community Involvement");
  for (const item of communityInvolvement) li(item);
  lines.push("");
  hr();

  // ---------- Availability ----------
  h2("Availability & Contact");
  p(profile.availability);
  p(
    `Reach out at [${profile.email}](mailto:${profile.email}) or connect via [LinkedIn](${profile.linkedin}).`
  );

  return lines.join("\n");
}

const outPath = path.resolve(__dirname, "../public/llm.txt");
const content = render();
await fs.writeFile(outPath, content, "utf-8");
console.log(`Generated llm.txt (${content.length} chars) → ${outPath}`);
