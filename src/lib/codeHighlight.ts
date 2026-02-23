import Prism from "prismjs";
import "prismjs/components/prism-markup";
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-markdown";
import "prismjs/components/prism-typescript";
import "prismjs/components/prism-python";
import "prismjs/components/prism-bash";

const ALLOWED_LANGUAGES = ["markdown", "typescript", "python", "shell"] as const;

const ALIAS_TO_CANONICAL: Record<string, (typeof ALLOWED_LANGUAGES)[number]> = {
  md: "markdown",
  ts: "typescript",
  bash: "shell",
  sh: "shell",
};

/**
 * Parse language from className (e.g. "language-typescript") and return
 * canonical language if it's in the allowed set; otherwise null.
 */
export function normalizeLanguage(
  className: string | undefined
): (typeof ALLOWED_LANGUAGES)[number] | null {
  if (!className) return null;
  const match = /language-(\S+)/.exec(className);
  if (!match) return null;
  const raw = match[1].toLowerCase();
  const canonical =
    ALIAS_TO_CANONICAL[raw] ?? (ALLOWED_LANGUAGES.includes(raw as (typeof ALLOWED_LANGUAGES)[number]) ? raw : null);
  if (!canonical || !ALLOWED_LANGUAGES.includes(canonical)) return null;
  return canonical;
}

/**
 * Prism grammar key for our canonical language (shell -> bash in Prism).
 */
function prismLanguageId(lang: (typeof ALLOWED_LANGUAGES)[number]): string {
  return lang === "shell" ? "bash" : lang;
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/**
 * Highlight code string with Prism for a supported language.
 * Returns HTML string with token spans. If grammar missing, returns escaped code.
 */
export function highlight(code: string, language: (typeof ALLOWED_LANGUAGES)[number]): string {
  const prismId = prismLanguageId(language);
  const grammar = (Prism.languages as Record<string, unknown>)[prismId];
  if (!grammar) {
    return escapeHtml(code);
  }
  return Prism.highlight(code, grammar, prismId);
}
