# RetailFlow chatbot setup

How the 7 virtual-staff chatbots were built on the AnythingLLM server (`chat.eduserver.au`) and embedded into this site. Keep this so the bots are reproducible — the live config otherwise exists only on the server.

## Prerequisites
- `pip install -U botstash` (≥ 0.3.0 — needed for `.md`/`.html` ingest)
- `ANYTHINGLLM_API_KEY` set in the environment; server URL `https://chat.eduserver.au`
- A `.botstash.env` (in the botstash working dir) with `ANYTHINGLLM_URL` and `ANYTHINGLLM_KEY`

## The three steps per bot
1. **Create workspace + upload docs** (botstash):
   `botstash run <staging-folder> --workspace "retailflow-<name>"`
   — staging-folder holds that bot's docs per the mapping in `../DOC-TO-BOT-MAPPING.md` (relevant docs only; **no red herrings**).
2. **Set the system prompt** (persona + delivery mode + guardrails): `configure_bot.py` in this folder:
   `python3 configure_bot.py retailflow-<name> ../bots/<name>/prompt.txt`
   This is API-only (updates `openAiPrompt`); it never touches documents.
3. **Create the embed + wire it in**: `POST /api/v1/embed/new` with `{workspace_slug, chat_mode:"chat", enabled:true}`, take the returned `uuid`, and paste the widget `<script>` into `../bots/<name>/index.qmd`, then `quarto render`.

## Workspace + embed inventory
| Bot | Workspace slug | Embed uuid (embed id) |
|---|---|---|
| Priya Sharma (Data) | `retailflow-priya-sharma` | `a4167dfd-7dfb-40f1-a914-7e2934f5d89f` (64) |
| Marcus Kim (CIO) | `retailflow-marcus-kim` | `5a5ee255-b5a4-4c99-8045-11452bdd92d1` (65) |
| Emma Rodriguez (CEO) | `retailflow-emma-rodriguez` | `6940470a-505f-4ea8-9ebc-acb1faa8ca6f` (66) |
| David Chen (CFO) | `retailflow-david-chen` | `3182128e-3126-4fdc-8cb2-7ba197842088` (67) |
| Tom Walsh (CS) | `retailflow-tom-walsh` | `5d832926-e7af-48e2-a299-713909538722` (68) |
| Sarah Thompson (COO) | `retailflow-sarah-thompson` | `7ad4df81-e33e-4f5d-bb32-7753f5eaf0a8` (69) |
| Lisa Nguyen (CCO) | `retailflow-lisa-nguyen` | `be8824b4-c592-422d-96bd-8358253a4603` (70) |

## Updating a bot
- **Change the prompt/guardrails:** edit `configure_bot.py` (the `ABSOLUTE` / `GUARDRAILS` / `DELIVERY_MODE` constants are shared by all bots) and re-run step 2 for each slug. Safe to repeat — it only overwrites the system prompt.
- **Change the documents:** ⚠️ `botstash run` is **not idempotent** — it reuses the workspace but **re-uploads and duplicates the documents**. To update docs cleanly, reset first:
  `botstash extract <folder> --output ./staging` then `botstash embed ./staging --workspace retailflow-<name> --reset`
  (`--reset` clears the workspace before uploading; only the `embed` command has it, not `run`).

## Guardrails baked into every bot (via configure_bot.py)
- **Consultant, not the consultant:** bots give input/opinions from their seat but will not do the delivery lead's work or hand over the answer/deliverable — they reflect it back.
- **Natural redirection:** they'll point you to the right person/function like a real colleague (we deliberately did NOT gag this — it's unrealistic and unenforceable).
- **On-task only** (refuse trivia/NSFW), **concise** (busy-exec brevity, voice varies), **don't invent** figures/policies.

## Retrieval settings
`configure_bot.py` also sets each workspace to **`similarityThreshold: 0`** (no restriction) and **`topN: 6`**. AnythingLLM's defaults (threshold 0.25, topN 4) are too strict for these knowledge bases — loosely-worded questions (e.g. "what's the first session?") can retrieve **0 chunks** and make the bot wrongly answer "that's not in my material." The course-assistant bot on the companion site uses the same settings.

## Embed cost/abuse settings (UI only)
The AnythingLLM API on this server **accepts but silently does not persist** embed rate-limit/allowlist updates (tested via `/embed/{uuid}` and `/embed/update/{id}` — both no-ops). So set these in the UI per embed:

**Settings → Embeddable Chat Widgets → (each embed) → Edit:**
- **Restrict requests to domains:** `retailflow.eduserver.au` (for the 7 staff bots) / `michael-borck.github.io` (for the course-assistant bot)
- **Max chats per day:** e.g. `500`  ·  **Max chats per session:** e.g. `50`

8 embeds total (7 RetailFlow staff + the AI-in-Delivery course assistant). The guardrails already make abuse low-value; these just cap token cost.
