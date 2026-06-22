# Which documents go into which bot

Paint-by-numbers for tomorrow's AnythingLLM build. For each bot: the workspace name, the **system prompt** to paste, and the **knowledge documents** to load. Then create the embed and paste it into the bot's `index.qmd`.

> **Upload method.** AnythingLLM ingests `.md` / `.html` / `.txt` natively, so the **simplest path is to upload these files directly in the AnythingLLM UI** (drag-drop into the workspace, then "Save & Embed"). `botstash` is great for LMS exports but its scanner **skips `.md`/`.html`** (only pdf/docx/pptx/vtt/qti/imscc), so to use botstash you'd first render these to PDF. For Friday, UI upload is the reliable route.
>
> **System prompt** = the contents of that bot's `bots/<name>/prompt.txt` **plus** the DELIVERY MODE line from `ANYTHINGLLM_SETUP.md`. botstash does **not** set this — paste it in the workspace's chat settings.
>
> **Every bot also gets these two shared docs:** `_backstories/retailflow_company_overview.md` and `_backstories/delivery_scenario_context.md`.
>
> **Do NOT upload the red-herring / trap docs to any bot** (the newsletter, the 2024 offsite notes, the 2023 pricing memo, the chatty emails). Those exist for the human document-discernment exercise; giving them to a bot would make it cite stale or irrelevant info. Bots get the *accurate* docs only — they already "know" the underlying facts from their profile docs.

## Priority for Friday
Stand up these five (the afternoon stakeholders): **Priya, Marcus, Emma, Tom, David.** Sarah and Lisa are optional. One bot (Priya or Tom) is enough for the morning demo.

---

## Priya Sharma — Head of Data & Analytics  `bots/priya_sharma/`
The data-readiness oracle every group interviews in Sprint 1, about *their* initiative — so she gets all four data profiles.
- `_backstories/priya_sharma_data_analytics.md`
- `documents/chatbot/cs-data-profile.html`
- `documents/pricing/pricing-data-profile.html`
- `documents/inventory/inventory-data-profile.html`
- `documents/fraud/fraud-data-profile.html`
- `documents/company/it-systems-overview.html`

## Marcus Kim — CIO  `bots/marcus_kim/`
Tech ambition, legacy systems, vendor/build view across initiatives.
- `_backstories/marcus_kim_cio.md`
- `documents/company/it-systems-overview.html`
- `documents/inventory/legacy-systems-note.html`
- All four board memos: `documents/{chatbot,pricing,inventory,fraud}/board-memo-*.html`
- Vendor proposals: `documents/{chatbot,pricing,fraud}/vendor-proposal-*.html`

## Emma Rodriguez — CEO  `bots/emma_rodriguez/`
Board promise, scope, what was committed.
- `_backstories/emma_rodriguez_ceo.md`
- All four board memos: `documents/{chatbot,pricing,inventory,fraud}/board-memo-*.html`
- `documents/company/company-fact-sheet.html`
- `documents/company/ai-principles-draft.html`

## David Chen — CFO  `bots/david_chen/`
Budgets, costs, ROI, go/no-go criteria.
- `_backstories/david_chen_cfo.md`
- All four board memos: `documents/{chatbot,pricing,inventory,fraud}/board-memo-*.html`
- Vendor proposals (for costs): `documents/{chatbot,pricing,fraud}/vendor-proposal-*.html`
- `documents/company/ai-principles-draft.html`

## Tom Walsh — Customer Service Manager  `bots/tom_walsh/`
Frontline reality; chatbot-focused (Sprint 2 inserts land on his team).
- `_backstories/tom_walsh_cs_manager.md`
- `documents/chatbot/board-memo-chatbot.html`
- `documents/chatbot/cs-data-profile.html`
- `documents/chatbot/returns-policy.html`
- `documents/company/org-chart.html`

## Sarah Thompson — COO  `bots/sarah_thompson/`  *(optional)*
Operational reality, especially inventory/store ops.
- `_backstories/sarah_thompson_coo.md`
- `documents/inventory/board-memo-inventory.html`
- `documents/inventory/stock-replenishment-policy.html`
- `documents/company/company-fact-sheet.html`

## Lisa Nguyen — CCO  `bots/lisa_nguyen/`  *(optional)*
Customer experience lens.
- `_backstories/lisa_nguyen_cco.md`
- `documents/chatbot/returns-policy.html`
- `documents/company/company-fact-sheet.html`

---

## After uploading each bot
1. Set the system prompt (prompt.txt + DELIVERY MODE line).
2. In AnythingLLM, enable an **embeddable chat widget** for the workspace and copy the `<script>` snippet.
3. Paste it into `bots/<name>/index.qmd`, replacing the `<!-- AnythingLLM embed will go here -->` placeholder block.
4. `quarto render` (the bot pages are Quarto-rendered) and deploy.

Paths above are relative to the `sites/retailflow/` repo root.
