/**
 * Step 1 of the resume PDF pipeline.
 *
 * Parses the canonical resume data (src/data/resume.js) and coalesces it
 * into a formal, professional LaTeX document at public/resume.tex.
 * Step 2 (scripts/compile-resume-pdf.js) compiles it into public/resume.pdf
 * so the site serves both /resume.tex and /resume.pdf as static assets.
 */
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const {
  profile,
  experiences,
  projects,
  skillGroups,
  education,
  researchExperiences,
  otherExperiences,
  communityInvolvement,
} = await import("../src/data/resume.js");

// Escape user content for safe use in LaTeX text mode.
// Order matters: backslashes first, then the other specials.
function tex(value) {
  return String(value)
    .replace(/\\/g, "\\textbackslash{}")
    .replace(/([&%$#_{}])/g, "\\$1")
    .replace(/~/g, "\\textasciitilde{}")
    .replace(/\^/g, "\\textasciicircum{}")
    .replace(/</g, "\\textless{}")
    .replace(/>/g, "\\textgreater{}");
}

// Compact period strings ("Jan 2026 - Feb 2026" -> "Jan '26 - Feb '26")
function period(value) {
  return tex(String(value).replace(/\b(19|20)(\d{2})\b/g, "'$2"));
}

function href(url, label) {
  return `\\href{${url}}{${label}}`;
}

const PREAMBLE = String.raw`\documentclass[10pt]{article}
\usepackage{fullpage}
\usepackage{amsmath}
\usepackage{amssymb}
\usepackage{url}
\usepackage{multicol}
\usepackage[usenames]{color}
\usepackage{enumitem}
\usepackage{nopageno}
\usepackage{tcolorbox}
\usepackage{tabularx}
\usepackage{array}
\usepackage{hyperref}
\usepackage{xcolor}
\hypersetup{
    colorlinks,
    linkcolor={red!50!black},
    citecolor={blue!50!black},
    urlcolor={blue!80!black}
}

\newcolumntype{M}[1]{>{\centering\arraybackslash}m{#1}}
\renewcommand{\arraystretch}{1.5}
\setlist{nolistsep}
\leftmargin=0.25in
\oddsidemargin=0.25in
\textwidth=6.0in
\topmargin=-0.75in
\textheight=10.50in
\newcommand{\headerwidth}{7.45in}

\raggedright
\pagestyle{empty}

\def\bull{\vrule height 0.8ex width .7ex depth -.1ex }
\definecolor{mycolor}{rgb}{0.422, 0.435, 0.498}

\newenvironment{changemargin}[2]{%
  \begin{list}{}{%
    \setlength{\topsep}{0pt}%
    \setlength{\leftmargin}{#1}%
    \setlength{\rightmargin}{#2}%
    \setlength{\listparindent}{\parindent}%
    \setlength{\itemindent}{\parindent}%
    \setlength{\parsep}{\parskip}%
  }%
  \item[]}{\end{list}
}

\newcommand{\header}[1]{
	\begin{changemargin}{-0.75in}{-0.75in}
    \begin{tcolorbox}[colframe=mycolor,boxrule=0.0pt,arc=0pt,
      left=6pt,right=6pt,top=6pt,bottom=6pt,boxsep=0pt,width=\headerwidth]
		\scshape{\textbf{#1}}
\end{tcolorbox}
	\end{changemargin}
}

\newcommand{\name}[1]{
			{\LARGE \scshape {\textbf{#1}}}
}

\newenvironment{body} {
	\vspace*{-16pt}
	\begin{changemargin}{-0.6in}{-0.65in}
  }
	{\end{changemargin}
}
`;

function renderHeader() {
  const contactParts = [
    href(`mailto:${profile.email}`, tex(profile.email)),
    href(profile.website, tex(profile.website.replace(/^https?:\/\//, ""))),
    href(profile.github, tex(profile.github.replace(/^https?:\/\//, ""))),
    href(profile.linkedin, tex(profile.linkedin.replace(/^https?:\/\//, ""))),
  ];
  return `
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
% Name + contact
\\vspace{0.4em}
\\hspace*{-5.5em}
\\name{${href(profile.website, `\\textbf{${tex(profile.name)}}`)}} \\\\
\\vspace{0.2em}\\hspace*{-5.5em}
{\\small ${tex(profile.title)}} \\\\
\\vspace{0.2em}\\hspace*{-5.5em}
{\\small ${contactParts.join(" \\textbar{} ")}} \\\\
`;
}

function renderEducation() {
  return `
\\header{Education}
\\begin{body}
    \\vspace{10pt}
	\\textbf{${tex(education.degree)}}, ${tex(education.field)} \\hfill \\emph{${period(education.period)}}\\\\
    ${tex(education.institution)}, ${tex(education.location)} \\hfill \\\\
\\end{body}
`;
}

function renderItemized(items) {
  const lines = items.map((item) => `        \\item ${tex(item)}`).join("\n");
  return `    \\begin{itemize}\n${lines}\n    \\end{itemize}`;
}

function renderExperience() {
  const blocks = experiences.map((job) => {
    const company = job.companyUrl
      ? href(job.companyUrl, `\\emph{${tex(job.company)}}`)
      : `\\emph{${tex(job.company)}}`;
    const location = job.location ? ` \\emph{(${tex(job.location)})}` : "";
    return `    \\textbf{${tex(job.title)}} ${company}${location} \\hfill \\emph{${period(job.period)}}
${renderItemized(job.achievements)}
    \\smallskip{}`;
  });
  return `
\\smallskip
\\header{Experience}
\\begin{body}
	\\vspace{10pt}
${blocks.join("\n\n")}
\\end{body}
`;
}

function renderResearch() {
  const blocks = researchExperiences.map((role) => {
    const location = role.location ? ` \\emph{(${tex(role.location)})}` : "";
    return `    \\textbf{${tex(role.title)}} \\emph{${tex(role.organization)}}${location} \\hfill \\emph{${period(role.period)}}\\\\
    ${tex(role.description)}\\\\
    \\smallskip{}`;
  });
  return `
\\smallskip
\\header{Research Experience}
\\begin{body}
	\\vspace{10pt}
${blocks.join("\n")}
\\end{body}
`;
}

function renderProjects() {
  const blocks = projects.map((project) => {
    const bullets = [project.solution, project.results].filter(Boolean);
    return `	\\textbf{${tex(project.title)}} \\emph{${tex(project.client)}} \\hfill \\emph{${period(project.period)}}
${renderItemized(bullets)}`;
  });
  return `
\\smallskip
\\header{Projects}
\\begin{body}
	\\vspace{14pt}
${blocks.join("\n")}
\\end{body}
`;
}

function renderSkills() {
  const rows = skillGroups
    .map(
      (group) =>
        `	\\emph{\\textbf{${tex(group.category)} :}}{} ${group.skills.map(tex).join(", ")} \\\\`
    )
    .join("\n");
  return `
\\smallskip
\\header{Skills}
\\begin{body}
	\\vspace{14pt}
${rows}
\\end{body}
`;
}

function renderCoursework() {
  const rows = education.courses.map((c) => `	${tex(c)}\\\\`).join("\n");
  return `
\\smallskip
\\header{Selected Coursework}
\\begin{body}
	\\vspace{4pt}
	\\begin{multicols}{3}
${rows}
 	\\end{multicols}
${education.note ? `    {\\footnotesize ${tex(education.note)}}\n` : ""}\\end{body}
`;
}

function renderOtherExperience() {
  const blocks = otherExperiences.map(
    (role) => `	\\textbf{${tex(role.title)}} \\emph{${tex(role.organization)}} \\hfill \\emph{${period(role.period)}}\\\\
    ${tex(role.description)}\\\\
    \\smallskip{}`
  );
  return `
\\smallskip
\\header{Other Experience}
\\begin{body}
	\\vspace{10pt}
${blocks.join("\n")}
\\end{body}
`;
}

function renderCommunity() {
  return `
\\smallskip
\\header{Miscellaneous}
\\begin{body}
    \\vspace{10pt}
${renderItemized(communityInvolvement)}
\\end{body}
`;
}

function renderDocument() {
  return [
    PREAMBLE,
    "\n% ---- Generated by scripts/generate-resume-tex.js ----",
    `% ---- Source of truth: src/data/resume.js ----`,
    `% ---- Generated: ${new Date().toISOString()} ----\n`,
    "\\begin{document}",
    renderHeader(),
    renderEducation(),
    renderExperience(),
    renderResearch(),
    renderProjects(),
    renderSkills(),
    renderCoursework(),
    renderOtherExperience(),
    renderCommunity(),
    "\\end{document}",
    "",
  ].join("\n");
}

const outPath = path.join(__dirname, "..", "public", "resume.tex");
await fs.writeFile(outPath, renderDocument(), "utf8");
console.log(`✓ Generated ${path.relative(process.cwd(), outPath)}`);
