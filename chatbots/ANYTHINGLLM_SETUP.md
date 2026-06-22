# AnythingLLM Setup — RetailFlow Virtual Staff

How to turn the text personas in this folder into embedded chatbots for the **AI in Delivery** course. Do this once per persona. Budget ~10–15 min per bot the first time.

## What you need per bot

Each bot = one AnythingLLM **workspace** with three knowledge documents + a system prompt + an embed.

**Documents to upload to the workspace** (`_backstories/`):
1. `retailflow_company_overview.md` — shared company facts (every bot)
2. `delivery_scenario_context.md` — shared delivery framing (every bot, for this course)
3. The persona's own backstory, e.g. `priya_sharma_data_analytics.md`

**System prompt:** paste the contents of that bot's `bots/<name>/prompt.txt`, then append the line below so the bot is in delivery mode:

> DELIVERY MODE: The board has already funded the AI initiatives. The learner is a delivery lead figuring out how to ship one of them. Answer their scoping, data, stakeholder, human-in-the-loop, roadmap and risk questions from your role. Disagree with other executives where your priorities differ. If you don't know a precise figure or policy, say so — never invent one.

## Steps (per bot)

1. **Create workspace** named after the person (e.g. "Priya Sharma — Data").
2. **Upload** the three documents above; embed/save so they're in the workspace's vector store.
3. **Paste the system prompt** (prompt.txt contents + the DELIVERY MODE line) into the workspace's chat/system prompt setting.
4. **Set chat mode** to "query"/"chat" as preferred; keep temperature moderate so it stays in character.
5. **Create an embed** (Embeddable Chat Widgets → New embed → select this workspace). Copy the `<script>` snippet AnythingLLM generates.
6. **Paste the snippet** into `bots/<name>/index.qmd`, replacing this placeholder block:
   ```{=html}
   <div id="chat-container">
     <p><em>Chatbot loading...</em></p>
     <!-- AnythingLLM embed will go here -->
   </div>
   ```
7. **Re-render** the Quarto site and check the bot page loads the widget.

## Priority order for Friday

Stand these up first (the core afternoon stakeholders): **Priya, Marcus, Emma, Tom Walsh, David.** Sarah and Lisa are optional/nice-to-have.

If you only have time for the morning demo, **one bot is enough** — Tom Walsh or Priya — to do the "watch it confidently hallucinate a policy" moment. The afternoon can fall back to the text personas as printed briefing cards (see the course's facilitator quick reference).

## Guardrail reminder

The `delivery_scenario_context.md` already tells every bot to stay in character, admit when it doesn't know, and avoid inventing precise figures or quoting model versions/stats. If a bot drifts, tighten the system prompt rather than the documents.
