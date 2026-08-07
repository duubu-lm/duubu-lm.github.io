# n8n Daily Workflow Factory — Design

Status: Draft, pending user review
Date: 2026-08-07
Owner: Lance Montiague

## Goal

A recurring system that, once a day, autonomously designs, builds, and validates one
complex, client-reusable n8n workflow — always in service of either closing deals
faster or eliminating an organization's repetitive manual work (up through monthly
reporting). Each workflow must clear a hard complexity bar (AI Agent node + 30+ nodes
total) before it counts as "done." Nothing goes live without explicit approval; the
system gets smarter about what to build next by learning from what it already built.

## Non-goals

- Not a general-purpose "give it any goal" builder (out of scope — this is scoped to
  the deal-velocity / operational-drag theme only).
- Not modifying the Portfolio site or its project cards — this lives entirely in n8n.
- Not a truly server-independent 24/7 daemon — see Constraints.
- Not live-tested against real client accounts — validation uses pinned/mock data so
  templates stay generic and reusable across clients.

## Architecture

### 1. Idea Catalog (n8n Data Table: `n8n_daily_factory_catalog`)

Persistent record across all runs. Columns:

| Column | Purpose |
|---|---|
| `date` | Day the row was created |
| `title` | Short name of the automation |
| `description` | What it does, for humans |
| `deal_or_ops_lane` | Which of the two theme lanes it serves, + one-line justification |
| `status` | `building` → `draft` → `published` (or `stuck`) |
| `workflow_id` | Main n8n workflow ID |
| `subworkflow_ids` | Any sub-workflows it calls, for combined node counting |
| `total_node_count` | Main + sub-workflow nodes combined |
| `has_agent_node` | Boolean gate check |
| `attempts` | How many build/validate/fix cycles it took |
| `retrospective` | What worked, what was hard, what to top next time |

This table is the system's memory (dedup, complexity audit, learning log) and is
directly browsable in n8n — no separate dashboard needed.

### 2. Telegram Notifier (one-time utility workflow)

A small n8n workflow built once, invoked via `execute_workflow` whenever the daily
task needs to reach you. Uses your existing Telegram credential — no new n8n
credential setup required.

### 3. Daily Scheduled Task (`daily-n8n-workflow-factory`)

Created via the scheduled-tasks system, firing once a day (e.g. ~8:07am local, off
the exact hour to avoid herd effects). Self-contained prompt; each run:

1. **Learn**: read the full catalog + retrospectives. Decide what would most improve
   on the best thing built so far — freely choosing deal-velocity or ops-drag lane,
   whichever is the higher-impact next move (no fixed rotation).
2. **Research**: web search for current n8n node capabilities and relevant automation
   patterns for the chosen idea, so the design isn't working off stale assumptions.
3. **Design first**: sketch the architecture before writing code — trigger → AI Agent
   node → tool/integration nodes → branches → sub-workflow decomposition → reporting
   output. Self-check the sketch against the complexity bar before building.
4. **Build**: via the n8n MCP toolchain — best-practices lookup → node search → type
   definitions → `create_workflow_from_code`.
5. **Validate**: `validate_workflow` + `test_workflow` against pinned/mock data, in a
   fix → re-validate loop until clean. No hard attempt cap — but past ~20 attempts,
   send a Telegram heads-up that it's still working rather than going quiet.
6. **Complexity gate**: confirm ≥1 real AI Agent node and ≥30 total nodes (main +
   sub-workflows combined). Extra nodes beyond 30 are fine and encouraged when they
   add genuine high-impact functionality — this is a floor, not a ceiling. If short,
   the fix is a real added step or sub-workflow decomposition, never padding.
7. **Draft, log, notify**: save as an unpublished draft, write the catalog row
   (including a retrospective), Telegram you a summary — what it does, which lane it
   serves, why it's high-impact, and the draft ID.

### 4. Publish-on-approval

No separate scheduled task. Whenever you reply in any normal chat ("publish
yesterday's one," "ship it") — I look it up in the catalog, call `publish_workflow`,
and mark the row published. Drafts wait patiently; nothing is lost if you're busy.

## Theme & idea-selection criteria

Every idea must justify itself against one of two lanes, recorded in the catalog:

- **Deal-velocity**: shortens/automates appointment-setting → follow-up → close
  (HubSpot for CRM/deals, Cal.com for scheduling, OpenAI-backed agent as the brain).
- **Operational drag**: removes a recurring manual task an org does regularly, up
  through and including monthly reporting.

## Complexity bar (hard gate)

- ≥30 nodes total, main workflow + every sub-workflow it calls via Execute Workflow,
  combined — not counted separately.
- ≥1 real AI Agent node (n8n's Agent node, not just an LLM call).
- Nodes must be functionally real (branching, error handling, enrichment,
  multi-system orchestration) — never padding.
- Floor, not ceiling: more nodes are welcome when they add real, high-impact value.

## Continuous improvement loop

- Every published (or stuck) project gets a retrospective note in the catalog.
- Each day's ideation reads catalog + retrospectives first, explicitly trying to top
  the previous best build, choosing whichever lane is the higher-impact next step.
- Web search grounds each design in current n8n capabilities before building.

## Error handling

- Build/validation failures loop automatically (fix → re-validate) within the run,
  uncapped per your call, with a heads-up ping past ~20 attempts so it doesn't look
  stalled.
- A truly stuck workflow is logged `status: stuck` with notes on what failed,
  Telegram'd to you, left as a draft — next day's run still proposes something new
  rather than blocking on it.

## Validation approach

- `validate_workflow` (structural) + `test_workflow` with pinned/mock sample data
  (no real client credentials required) before a build ever counts as passing.
- Complexity gate (agent node + 30+ nodes) checked alongside correctness — both must
  pass before a workflow becomes a draft.

## Constraints

- Scheduled tasks in this environment fire only while the Claude Code app is open;
  if closed at fire time, the run happens on next launch instead. "24/7" here means
  "the schedule persists and catches up," not an independent server process. Flagged
  explicitly since it affects how reliably "daily" actually lands.
- No new n8n credentials required for phase 1 (Telegram, HubSpot, Cal.com, OpenAI,
  Postgres already connected).

## Rollout plan

1. **Pilot**: build and validate one workflow manually (this same design/build/
   validate/complexity-gate/draft sequence, run once by hand) to prove the concept
   and the complexity bar are both achievable and worth it, before any schedule
   exists.
2. **Review**: you review the pilot draft, we adjust the design/bar/theme as needed.
3. **Automate**: only after the pilot is approved, wire the sequence into the daily
   scheduled task.

## Open assumptions (flag if wrong)

- "AI Agent node" means n8n's actual Agent node type (LangChain-based), not any node
  that merely calls an LLM.
- Retrospectives and lane-choice are fully autonomous (Claude's judgment call each
  day) unless you weigh in via chat, which always takes priority for the next build.
