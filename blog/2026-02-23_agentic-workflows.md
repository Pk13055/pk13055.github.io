# Orchestrating the Agentic Loop with `skills` &amp; "`superpowers`"

The novelty of “chatting with code” has worn off. For senior engineers, the value of an LLM isn’t spitting out a single component but in **architecture-aware execution** and strict state management. We’ve moved past treating AI like a junior pair-programmer. We are entering an era of **Agentic Orchestration**, where the IDE becomes a command center dispatching autonomous units of work. By combining Cursor’s **Superpowers** plugin (obra/superpowers) with custom **Skills** definitions, I’ve fundamentally changed how I manage features. I’m not just typing prompts anymore — I’m managing a virtual team that lives in my repo[\[1\]](https://cursor.com/blog/marketplace#:~:text=Plugins%20allow%20Cursor%20to%20more,same%20place%20you%20generate%20code)[\[2\]](http://agentskills.io/home#:~:text=Agents%20are%20increasingly%20capable%2C%20but,controlled%20packages).

## The Superpowers State Machine: Workflow as Code

Standard LLM chat suffers from context drift. You ask for a complex refactor, and after a few turns the model forgets constraints or hallucinates file paths. The `obra/superpowers` plugin fixes this by enforcing a rigorous, finite state machine:

> **Divergence (Brainstorm) → Convergence (Plan) → Execution (Loop)**.

In practice, this means every task flows through a structured cycle instead of ad-hoc chat.

### 1\. Divergence: The `/brainstorm` Phase

I never start coding immediately. I treat the agent as a solution architect. For example, if I pick up a ticket *“Migrate UserAuth from callback hell to async/await,”* I fire:

**Cmd:** `/brainstorm`

**Mechanics:** Superpowers uses Cursor’s tooling (like a filesystem MCP server) to **scan the codebase**[\[3\]](https://cursor.com/blog/marketplace#:~:text=%2A%20Skills%20%3A%20domain,uphold%20coding%20standards%20and%20preferences). It might parse the AST of the auth module and read package.json to see which libraries or patterns are available. The agent doesn’t guess — it performs reconnaissance. It then returns multiple distinct architectural approaches (e.g. “recursive refactor” vs. “shim layer approach”), each with a risk analysis. This divergence phase ensures we explore options thoroughly before committing to a path.

### 2\. The Contract: The `/write-plan` Phase

Once we pick an approach, I don’t just say “do it.” I force the agent to **sign a contract**. The `/write-plan` command transforms our strategy into a living plan document.

**The Artifact:** The agent outputs a structured markdown checklist. In Superpowers terms, this isn’t just text — it’s the *Instruction Set Architecture (ISA)* for the execution agent. For example:

```markdown
# Plan: Auth Refactor
- [ ] **Step 1:** Create a generic wrapper utility for legacy callbacks.
- [ ] **Step 2:** Refactor `loginController.ts` to use the new wrapper.
- [ ] **Step 3:** Update `auth.test.ts` to mock promises instead of callbacks.
```

Each unchecked box is an atomic task. This plan is stored in a scratchpad so both I and the agent have a precise contract: *no task can start until that box is checked*. By turning the design into a checklist, we converge on a clear roadmap.

### 3\. The Autonomous Loop: `/execute-plan`

This is where the magic happens. Instead of hand-holding the agent through every file change, I issue:

**Cmd:** `/execute-plan`

Superpowers then enters an autonomous loop over the plan items. Concretely, for each remaining step it will:

```markdown
- **Read State:** Find the next unchecked box in the plan.
- **Context Injection:** Load only the relevant file context for that step (e.g. open loginController.ts).
- **Tool Call:** Use editing tools (an MCP server like a filesystem or code-diff tool) to apply the change.
- **Verification:** Run a shell command (compile, lint, test) to check the result.
- **Commit:** Mark the checklist box as complete [x] in the plan.
```

This loop means I supervise the *process* while the agent handles the *implementation*. I see each change happen and its effects, but I don’t manually type them. It dramatically reduces the cognitive load of endless “tab+enter” completions. Essentially, the agent is writing and running code against the repo instead of spitting raw text. It’s executing our plan step-by-step, enforcing all the usual practices (builds must pass, tests must update, etc.) before moving on.

---

## The Virtual Team: Defining “Skills” as Agents

The /execute-plan command is powerful, but a generic LLM is a jack-of-all-trades, master of none. To fully trust the execution loop, we need to narrow its expertise. This is where **Skills** come in.

Cursor supports a project-local skills/ directory (as per the Agent Skills spec[\[2\]](http://agentskills.io/home#:~:text=Agents%20are%20increasingly%20capable%2C%20but,controlled%20packages)). Instead of generic prompt rules, I use .cursor/skills/ to **instantiate specialized sub-agents** that Superpowers can dispatch. Think of skills/\*.md not as docs, but as *system prompts for specialists*.

When a plan step requires database work, Superpowers will context-switch the LLM into our “DBA Skill”. When it’s UI work, it’ll use the “Frontend Skill”. This means the same request yields different behaviors based on skill.

### Example: Defining the Virtual Team

> **File:** `.cursor/skills/database-engineer.md`

```markdown
## Skill: Database Engineer
**Triggers:** Migration files, SQL queries, schema definitions.
**Tools:** `postgres` (MCP), `filesystem`

**Directives:**
1. **Validate First:** ALWAYS run `postgres.query("SELECT...")` on `information_schema` to see existing constraints before writing a migration.
2. **Idempotency:** Wrap any schema changes in `IF NOT EXISTS` or equivalent logic.
3. **Safety:** If a DROP or destructive operation is needed, STOP and request explicit human approval.
```

> **File:** `.cursor/skills/frontend-specialist.md`

```markdown
## Skill: Frontend Specialist
**Triggers:** `*.tsx`, `tailwind.config.js` files.
**Tools:** `browser` (AgentSkills MCP), `filesystem`

**Directives:**
1. **Consistency:** Check `src/theme/tokens.ts` for colors before using any hard-coded values.
2. **Accessibility:** Enforce `aria-label` on all interactive components.
```

**The Resulting Workflow:** When `/execute-plan` hits a step like “Update User Schema,” the agent doesn’t guess how to touch the DB. It *loads* database-engineer.md first, so it instantly follows DBA best practices (e.g. checking current schema via postgres.query) before writing any code. Suddenly, the agent behaves like a seasoned specialist – precisely because we defined that role in our skills. We are no longer just prompting a chatbot; we are architecting a whole team of specialist agents to execute our plan[\[2\]](http://agentskills.io/home#:~:text=Agents%20are%20increasingly%20capable%2C%20but,controlled%20packages)[\[4\]](https://github.com/anthropics/skills#:~:text=This%20repository%20contains%20skills%20that,communications%2C%20branding%2C%20etc).

---

## The Future: Programmatic Tool Calling and Agentic REPLs

Cursor’s Superpowers \+ Skills workflow already creates a robust agent pipeline via chat. But the next architectural leap is to **remove even the chat layer for loops**. We’re transitioning from orchestrated prompts to true *programmatic tool calls*.

Current practice: To “find unused exports,” we might loop through files with separate chat turns. Soon, the agent will **generate code itself** – a script that runs directly in a sandbox. As Anthropic’s docs describe, the agent will *write executable code to call tools*, not just output JSON for the IDE to parse[\[5\]](https://platform.claude.com/docs/en/agents-and-tools/tool-use/programmatic-tool-calling#:~:text=Copy%20page)[\[6\]](https://www.anthropic.com/engineering/advanced-tool-use#:~:text=Programmatic%20Tool%20Calling%20enables%20Claude,actually%20enters%20its%20context%20window).

![programmatic-tool-caling-flow](/public/blog/media/advance-tool-call.png)

*Figure: Programmatic Tool Calling Flow.* In this model, the IDE becomes an **Agentic REPL**. For example, instead of a chat loop, the agent might produce a TypeScript script like:

```typescript
import { FileSystem, ASTParser } from '@mcp/sdk';

async function audit() {
  const files = await FileSystem.glob('src/**/*.ts');
  const unused = files.filter(f => ASTParser.findUnusedExports(f));
  return unused; // structured result immediately
}
```

This code runs immediately in the tools sandbox. The agent only reads the final result back, and doesn’t waste tokens on intermediate loop iterations. As Anthropic notes, programmatic calling “reduces latency for multi-tool workflows and decreases token consumption”[\[5\]](https://platform.claude.com/docs/en/agents-and-tools/tool-use/programmatic-tool-calling#:~:text=Copy%20page). In practice, teams have used this to have Claude process large data (even a 200KB spreadsheet) in one shot without overloading the model[\[7\]](https://www.anthropic.com/engineering/advanced-tool-use#:~:text=In%20internal%20testing%2C%20we%E2%80%99ve%20found,overloading%20the%20model%E2%80%99s%20context%20window).

**From “Chain of Thought” to “Code as Thought”:** The IDE will no longer be just a chat window next to a text editor. It will be a runtime where **Intent → Plan → Code** all happen fluidly. We’ll define /brainstorm for intent, /write-plan for the contract, and our specialized skills/ for constraints. Then we’ll let the agent *write and run* the glue code itself.

Senior engineers: stop treating the AI like autocomplete. Define your Skills, write your Plans, and let the machine do the work. The age of agentic orchestration is here.

**Sources:**

- Cursor plugin docs[\[1\]](https://cursor.com/blog/marketplace#:~:text=Plugins%20allow%20Cursor%20to%20more,same%20place%20you%20generate%20code)[\[3\]](https://cursor.com/blog/marketplace#:~:text=%2A%20Skills%20%3A%20domain,uphold%20coding%20standards%20and%20preferences);
- obra/superpowers README[\[8\]](https://github.com/obra/superpowers#:~:text=Superpowers)[\[9\]](https://github.com/obra/superpowers#:~:text=1.%20brainstorming%20,Saves%20design%20document);
- Anthropics’ Skills repo and agent skills spec[\[2\]](http://agentskills.io/home#:~:text=Agents%20are%20increasingly%20capable%2C%20but,controlled%20packages)[\[4\]](https://github.com/anthropics/skills#:~:text=This%20repository%20contains%20skills%20that,communications%2C%20branding%2C%20etc);
- Claude Developer docs on programmatic tool calling[\[5\]](https://platform.claude.com/docs/en/agents-and-tools/tool-use/programmatic-tool-calling#:~:text=Copy%20page)[\[6\]](https://www.anthropic.com/engineering/advanced-tool-use#:~:text=Programmatic%20Tool%20Calling%20enables%20Claude,actually%20enters%20its%20context%20window).
- [\[1\]](https://cursor.com/blog/marketplace#:~:text=Plugins%20allow%20Cursor%20to%20more,same%20place%20you%20generate%20code) [\[3\]](https://cursor.com/blog/marketplace#:~:text=%2A%20Skills%20%3A%20domain,uphold%20coding%20standards%20and%20preferences) Extend Cursor with plugins · Cursor
- [https://cursor.com/blog/marketplace](https://cursor.com/blog/marketplace)
- [\[2\]](http://agentskills.io/home#:~:text=Agents%20are%20increasingly%20capable%2C%20but,controlled%20packages) Overview \- Agent Skills
- [http://agentskills.io/home](http://agentskills.io/home)
- [\[4\]](https://github.com/anthropics/skills#:~:text=This%20repository%20contains%20skills%20that,communications%2C%20branding%2C%20etc) GitHub \- anthropics/skills: Public repository for Agent Skills
- [https://github.com/anthropics/skills](https://github.com/anthropics/skills)
- [\[5\]](https://platform.claude.com/docs/en/agents-and-tools/tool-use/programmatic-tool-calling#:~:text=Copy%20page) Programmatic tool calling \- Claude API Docs
- [https://platform.claude.com/docs/en/agents-and-tools/tool-use/programmatic-tool-calling](https://platform.claude.com/docs/en/agents-and-tools/tool-use/programmatic-tool-calling)
- [\[6\]](https://www.anthropic.com/engineering/advanced-tool-use#:~:text=Programmatic%20Tool%20Calling%20enables%20Claude,actually%20enters%20its%20context%20window) [\[7\]](https://www.anthropic.com/engineering/advanced-tool-use#:~:text=In%20internal%20testing%2C%20we%E2%80%99ve%20found,overloading%20the%20model%E2%80%99s%20context%20window) Introducing advanced tool use on the Claude Developer Platform \\ Anthropic
- [https://www.anthropic.com/engineering/advanced-tool-use](https://www.anthropic.com/engineering/advanced-tool-use)
- [\[8\]](https://github.com/obra/superpowers#:~:text=Superpowers) [\[9\]](https://github.com/obra/superpowers#:~:text=1.%20brainstorming%20,Saves%20design%20document) GitHub \- obra/superpowers: An agentic skills framework & software development methodology that works.
- [https://github.com/obra/superpowers](https://github.com/obra/superpowers)
