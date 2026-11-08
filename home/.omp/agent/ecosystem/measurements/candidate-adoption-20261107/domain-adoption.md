# Domain adoption: selected original vendor guidance

Status: **17 selected additions copied (15 native, 2 curated SEO); parent policy/discovery merge and smoke pending. No runtime pass claimed.** Existing Emil9, GSAP3, Impeccable4.8 and mcp-builder were not rewritten. No package dependencies, hooks, MCP, engine, browser, model, cloud service, upload or credentials were used.

## Parent integration

Merge, do not replace, the arrays in `domain-adoption.json` → `parent_config_merge`:

- `skills.customDirectories` add `C:/Users/Indrimeilla-PC/.omp/agent/ecosystem/capabilities/claude-seo-6be93f45064ffbadced572b5d5c95f55fd263af0/skills`.
- `skills.manualSkills` add `frontend-design`, `canvas-design`, `theme-factory`, `seo-schema`, `seo-hreflang`.
- Automatic metadata (12): `choreograph`, `remove-animations`, `gsap-scrolltrigger`, `gsap-plugins`, `gsap-performance`, `gsap-frameworks`, `gsap-utils`, `trl-training`, `train-sentence-transformers`, `huggingface-community-evals`, `huggingface-local-models`, `huggingface-datasets`.

The SEO parent contains only two selected SKILL entrypoints; sibling `seo/references` is support without SKILL.md. Do not register either full source suite or each SKILL folder itself: OMP18.18 scans `*/SKILL.md`, not a root SKILL.md. No vendor frontmatter was changed. No native same-name directory was present before these additions; parent must still check provider alias/discovery behavior in a fresh OMP session.

Focused guides are adaptively selectable, not blanket-hidden. The three creative guides are alternative/artifact workflows, and SEO remains explicitly selected manual guidance rather than a functional Claude Code plugin. Impeccable stays the UI owner unless the user selects an alternative. Academic ARS/research ownership is untouched.

## Provenance and copy boundaries

- [anthropics/skills](https://github.com/anthropics/skills/tree/2c5958ecac7cee2b583967a2c4981d0f4a75c579), `2c5958ecac7cee2b583967a2c4981d0f4a75c579`, archive SHA256 `e5b0c67dbfae471c013d0e03abe66db20ca70cc0c79ab6154a386c8b026e5195`. Full original source: `C:\Users\Indrimeilla-PC\.omp\agent\ecosystem\sources\candidate-adoption-20261107\anthropics-skills-2c5958ecac7cee2b583967a2c4981d0f4a75c579`.
- [emilkowalski/skills](https://github.com/emilkowalski/skills/tree/c8a79627b59d72d764d6ab6f2c87c09a48169833), `c8a79627b59d72d764d6ab6f2c87c09a48169833`, archive SHA256 `b83f4862ace9b2580cd3ce59c0cd9ae170a362bcf73563335d300ac6b4b5fd64`. Full original source: `C:\Users\Indrimeilla-PC\.omp\agent\ecosystem\sources\candidate-adoption-20261107\emilkowalski-skills-c8a79627b59d72d764d6ab6f2c87c09a48169833`.
- [greensock/gsap-skills](https://github.com/greensock/gsap-skills/tree/aed9cfd3277740755f6bfc1155c7aa645403b760), `aed9cfd3277740755f6bfc1155c7aa645403b760`, archive SHA256 `87a6a1c7f9bd6342af8713709c96e5c8057aef57590f1ba808b18fc8742c34cc`. Full original source: `C:\Users\Indrimeilla-PC\.omp\agent\ecosystem\sources\candidate-adoption-20261107\greensock-gsap-skills-aed9cfd3277740755f6bfc1155c7aa645403b760`.
- [AgriciDaniel/claude-seo](https://github.com/AgriciDaniel/claude-seo/tree/6be93f45064ffbadced572b5d5c95f55fd263af0), `6be93f45064ffbadced572b5d5c95f55fd263af0`, archive SHA256 `9ba0b1b319ed432458d02f292ed7f8246226342ed33543f7b9227664c4fa8834`. Full original source: `C:\Users\Indrimeilla-PC\.omp\agent\ecosystem\sources\candidate-adoption-20261107\claude-seo-6be93f45064ffbadced572b5d5c95f55fd263af0`.
- [huggingface/skills](https://github.com/huggingface/skills/tree/25910b3d0ba31a2ba102f901cdc9e008c278a69c), `25910b3d0ba31a2ba102f901cdc9e008c278a69c`, archive SHA256 `9654e440515cd36d90793f619988008e5be977207993ff8b6e5d4c4d82168654`. Full original source: `C:\Users\Indrimeilla-PC\.omp\agent\ecosystem\sources\candidate-adoption-20261107\huggingface-skills-25910b3d0ba31a2ba102f901cdc9e008c278a69c`.

Revisions were evaluated earlier the same day, so no stale pin justified another upgrade. Public codeload byte identity is recorded, not signature authentication. Full original repositories preserve scripts, assets, references, per-skill fonts/notices and licenses. Native selected skill text is original; repository LICENSE was included where absent. `gsap-frameworks/examples/{vue,nuxt}` contains the original repository example assets, not rewritten adapters. Original SEO support references and schema templates are copied into the curated layout; full scripts remain in the full pinned source. Claude env/launcher examples remain unsupported: only the original manual page-source guidance path is usable now.

Every copied expected file hash and its original source authority is in JSON `copy_manifest` (200 rows). Copy operations succeeded; byte equality and OMP discovery are deliberately left to parent smoke. Fifteen new native directories are under `~/.omp/agent/skills`; the two SEO guides are under the curated parent above. No existing files/configuration were changed, so no prior skill backup was needed.

## Source/runtime caveats requiring parent policy

- **Hugging Face**: guidance installed, not torch/TRL/PEFT/vLLM/inspect/lighteval/llama.cpp runtime. Python3.14/Windows does not prove binary/GPU support. No automatic dependencies, weights download, remote code trust, login/token reads, provider fallback, Jobs, upload or Trackio remote syncing. A local script may still call remote inference; `inspect_eval_uv.py` uses `hf-inference-providers`. Sentence-transformer defaults include public push, and even `SMOKE_TEST=1` downloads model/data and uses BF16. Do not execute originals as an offline fixture.
- **Dataset guide**: useful read-only Dataset Viewer metadata/rows route, but its final section instructs uploading agent traces. Parent policy must forbid session/trace/provenance/memory harvesting and upload absent precise separate consent; dataset task activation is not memory activation.
- **GSAP**: no runtime installed. Known original examples are **not runnable-certified**: scrolltrigger line235 has undefined `Max.max` and pixel delta used as `xPercent`; verify refreshPriority semantics against actual API. Nuxt composable duplicates `Plugins` type and page cleanup uses `onMounted` rather than `onUnmounted`; Vue source filename/import casing differs. Nuxt has `postinstall: nuxt prepare`. Do not blindly copy/run these snippets, install frameworks solely to smoke them, or equate skill MIT with the runtime license.
- **SEO**: manual schema/hreflang reasoning works on supplied snippets. Runtime `setup` creates/replaces venv, installs a broad non-exact dependency set, downloads Chromium and writes state. Bash launcher/`${CLAUDE_PLUGIN_ROOT}` and slash commands are not OMP portability evidence. No crawler/API/Google verification executed. Scores, translation length ratios/cultural profiles and word-count thresholds are vendor heuristics, not ranking facts; current primary Google/locale documentation wins.
- **Anthropic**: selected three creative guides carry original Apache2 licenses; canvas fonts/notices retained. `doc-coauthoring` was not copied: this snapshot has no per-skill/root LICENSE, and README's “many skills” wording does not resolve its exact grant. No imitation skill/license was invented.
- **Impeccable**: current4.8.0 owner retained, including original executable/manual fallback policy. Launcher/engine/detector/hooks/live/generate/pin/probe are not enabled; manual critique is not a full vendor detector critique. No approvals or facts rewritten.

Static inspection covered selected guide contracts, all17 selected HF Python script AST/import/effect surfaces, relevant SEO shell/runtime/parser paths, and the preserved GSAP framework examples. It is not an exhaustive audit of all unselected executable suites. No vendor script was imported/executed.

## Parent offline smoke (not run here)

```powershell
node "C:\Users\Indrimeilla-PC\.omp\agent\ecosystem\measurements\candidate-adoption-20261107\domain-adoption-smoke.mjs"
python "C:\Users\Indrimeilla-PC\.omp\agent\skills\huggingface-community-evals\scripts\inspect_vllm_uv.py" --help
python "C:\Users\Indrimeilla-PC\.omp\agent\skills\huggingface-community-evals\scripts\lighteval_vllm_uv.py" --help
python "C:\Users\Indrimeilla-PC\.omp\agent\skills\huggingface-community-evals\scripts\inspect_eval_uv.py" --help
```

Use **plain Python --help**, not `uv run` (which installs inline dependencies). The Node smoke is standard-library, read-only: SHA equality of installed/source copies, exact names, reference files, two-only SEO entrypoints, and a synthetic JSON fixture. It does not prove model evaluation, training, rich-result eligibility, browser/UI behavior, animation frame rate or OMP discovery. Parent should run its fresh OMP RPC `get_available_commands` inventory with inference disabled and assert all17 names, selected manual state and no accidental SEO suite entrypoints. No paid model call is necessary for this inventory.

For semantic guidance smoke, parent can use native read/reasoning on synthetic data: two local en/fr page-head strings with a missing reciprocal alternate (`seo-hreflang`), fictional Organization JSON-LD with malformed JSON (`seo-schema`), a 20-item frequent menu stagger (`remove-animations`/`choreograph`), and offline retrieval dataset shapes (`train-sentence-transformers`/`trl-training`). This is guide exercise only, not an uninstalled runtime pass.

## Per-subskill decisions (95 entries)

### anthropics-skills (19)

| Original name | Decision | Reason |
|---|---|---|
| `academy-guide` | source-only | Product-specific course recommendation requires web lookup and is not general OMP operation guidance. |
| `algorithmic-art` | source-only | Useful seeded p5 art, but mandatory Anthropic-branded viewer/CDN workflow is an explicit project alternative; canvas-design selected first for original static creative work. |
| `brand-guidelines` | source-only | Applies Anthropic corporate branding, which must not silently replace the user brand; retain vendor reference for explicit Anthropic-branded tasks. |
| `canvas-design` | install-manual | Adds static poster/art composition and licensed bundled fonts; distinct from app-UI design, drawing/rendering runtime not installed. |
| `claude-api` | source-only | Broad provider and model/pricing triggers exceed requested domain guidance; API work needs exact SDK/provider selection, not automatic Claude preference. |
| `discernment-nudge` | source-only | Injects closing advice on broad replies; global output-format/completion policy should not be changed by a content skill. |
| `doc-coauthoring` | source-only-license-prerequisite | Valuable reader-testing workflow, but this snapshot has only SKILL.md with no per-skill license and no root LICENSE. README says many skills Apache-2.0 without explicitly granting this folder. Do not invent a license; preserve source until upstream clarifies. |
| `docx` | source-only | Real OOXML editing/tooling, not rejected for overlap; operational adoption requires separately selected Office renderer/validation dependencies and executable review for Windows. |
| `frontend-design` | install-manual | Lightweight subject-grounded art direction is a useful explicit alternative to Impeccable ownership, not a second default lead. |
| `internal-comms` | source-only | Templates assume company-specific communication formats; no company format or communications workflow selected. |
| `mcp-builder` | retain-current | Already upgraded by owner at this pin; no duplicate install or existing-file edit. |
| `pdf` | source-only | Useful extraction/OCR/forms stack requires picking pypdf/reportlab/pdfplumber/qpdf/OCR capabilities per actual document task; native reader covers immediate read-only PDFs, not equivalent editing. |
| `pptx` | source-only | Native slide XML helpers and renderer integration merit task-specific dependency selection; no PowerPoint/LibreOffice runtime readiness claim. |
| `skill-creator` | retain-incumbent | Existing skill-creator route owns skill development. New vendor benchmark/model/hosting workflow is not required for domain guidance adoption. |
| `slack-gif-creator` | source-only | Concrete GIF generator can be adopted for an actual Slack asset request; Pillow/imageio encoding stack not necessary to install for static guidance. |
| `theme-factory` | install-manual | Adds ten original visual palette/type themes plus the vendor PDF showcase for explicit document/artifact styling. |
| `web-artifacts-builder` | source-only | Targets claude.ai artifact bundling and scaffold/install scripts, not a generic OMP app runtime; no host-specific tool imitation. |
| `webapp-testing` | retain-incumbent | Current native/browser testing route remains; this source adds a standalone Playwright/server orchestration alternative requiring its own chosen browser runtime, not automatic replacement. |
| `xlsx` | source-only | Real workbook formula/recalculation tooling; renderer/library configuration needed per task, not generic text capability installation. |

### emilkowalski-skills (17)

| Original name | Decision | Reason |
|---|---|---|
| `animate` | retain-current | One of the nine current incumbent skills; upgraded source already at this pin, no rewrite. |
| `animate-expo` | source-only | Reanimated/Gesture Handler/Expo-specific native stack is a valid distinct specialization; no Expo project or device-runtime slice selected, so no generic mobile-web substitution. |
| `animation-performance` | retain-current | One of the nine current incumbent skills; upgraded source already at this pin, no rewrite. |
| `animation-vocabulary` | retain-current | One of the nine current incumbent skills; upgraded source already at this pin, no rewrite. |
| `apple-design` | source-only | Apple-style materials/motion are an explicit aesthetic specialization, not a universal global visual direction. |
| `ask-sonner` | source-only | Focused React toast-library guidance requires Sonner to be chosen/present; no dependency installation should be triggered by generic notifications. |
| `break-ui` | retain-current | One of the nine current incumbent skills; upgraded source already at this pin, no rewrite. |
| `choreograph` | install-auto | Adds timing relationships, interruption, stillness and multi-element orchestration rather than another single-tween recipe. |
| `emil-design-eng` | retain-current | One of the nine current incumbent skills; upgraded source already at this pin, no rewrite. |
| `find-animation-opportunities` | retain-current | One of the nine current incumbent skills; upgraded source already at this pin, no rewrite. |
| `improve-animations` | retain-current | One of the nine current incumbent skills; upgraded source already at this pin, no rewrite. |
| `mobile-native` | retain-current | One of the nine current incumbent skills; upgraded source already at this pin, no rewrite. |
| `pick-ui-library` | source-only | Opinionated broad library-selection catalog is explicit-only upstream and would introduce package choices outside a demonstrated project need. |
| `prototype` | source-only | Alternative multi-variant visual-picker workflow writes substantial temporary UI; keep for explicit project prototyping rather than default editing. |
| `remove-animations` | install-auto | Adds a subtraction-only workflow including hidden start-state, unmount, focus and callback hazards; useful for excessive motion without redesign. |
| `review-animations` | retain-current | One of the nine current incumbent skills; upgraded source already at this pin, no rewrite. |
| `write-swift` | source-only | Modern Swift6 guidance is useful on an actual Swift target; native Apple compilation/device validation unavailable on this Windows scope. |

### greensock-gsap-skills (8)

| Original name | Decision | Reason |
|---|---|---|
| `gsap-core` | retain-current | Current incumbent skill, no replacement or upgrade repeated. |
| `gsap-frameworks` | install-auto | Adds Vue/Svelte/Nuxt lifecycle scoping and teardown absent from React-only incumbent; original examples preserved but known Nuxt errors documented. |
| `gsap-performance` | install-auto | Adds GSAP quickTo, read/write batching, inactive cleanup and trigger workload advice; FPS/promoted-layer claims are heuristics, not measured guarantees. |
| `gsap-plugins` | install-auto | Adds plugin registration/selection for Flip, SVG, text, drag, scroll and easing; no runtime/plugin/API enabled. |
| `gsap-react` | retain-current | Current incumbent skill, no replacement or upgrade repeated. |
| `gsap-scrolltrigger` | install-auto | Adds scroll-linked scrub/pin/proxy/batch/refresh and cleanup guidance; known erroneous horizontal-scroll snippet flagged, must use real API docs rather than copy blindly. |
| `gsap-timeline` | retain-current | Current incumbent skill, no replacement or upgrade repeated. |
| `gsap-utils` | install-auto | Small exact utility API reference useful when existing GSAP code needs clamp/mapRange/wrap/snap, without inventing helpers. |

### claude-seo (26)

| Original name | Decision | Reason |
|---|---|---|
| `seo` | source-only | Broad dispatcher assumes Claude slash commands, host variables, plugins and coordinated agents; not registered as a global runtime. |
| `seo-agentic` | source-only | Requires browser/WAF/agent-readiness probes and may change site access policies; not an SEO ranking requirement or implicit consent to those writes. |
| `seo-audit` | source-only | Full crawl + scored report + parallel agents is a separate runtime workflow, not portable merely because Markdown is discoverable. |
| `seo-backlinks` | source-only | CommonCrawl/API/live link verification requires bounded authorized target and may inform destructive disavow actions; no APIs or cleanup enabled. |
| `seo-cluster` | source-only | SERP-overlap acquisition and optional blog execution need explicit data source and publishing scope. |
| `seo-competitor-pages` | source-only | Useful comparison-page content planning, but claims and competitor data require verified factual brief; not selected as default content generator. |
| `seo-content` | source-only | Content review valuable, but included Unicode/humanization scripts can affect meaningful locale characters; do not auto-clean user content or treat heuristic lengths as ranking rules. |
| `seo-content-brief` | source-only | Competitive research and word-count scoring are heuristics requiring target/query inputs; no blanket word-count targets or remote SERP work enabled. |
| `seo-dataforseo` | source-only | Credentialed paid MCP/data API extension; authorization and account absent by contract. |
| `seo-drift` | source-only | SQLite baseline and repeated URL capture are a monitoring service/workflow, not requested global passive guidance. |
| `seo-ecommerce` | source-only | Requires real catalog facts and optional Merchant/DataForSEO/UCP network probes; no store or API scope selected. |
| `seo-flow` | source-only | Alternative complete evidence-led workflow with CC BY4 prompt library; retain original attribution source but do not activate broad workflow alongside selected narrow guides. |
| `seo-geo` | source-only | GEO/citability advice must be grounded in Google primary guidance; does not justify AI-file/markup ranking requirements or extra crawler access changes. |
| `seo-google` | source-only | OAuth/Google APIs, field data, reports and indexing writes require real property ownership and task authorization. |
| `seo-hreflang` | install-manual | Selected narrow locale/canonical/return-link guidance supports static local snippets; cultural parity scores and translation length ratios remain heuristics. |
| `seo-image-gen` | source-only | Requires Gemini/nanobanana MCP and remote generation, no paid service or image upload authorized. |
| `seo-images` | source-only | Live image auditing/conversion/metadata writes need specific local fixtures/assets; no default EXIF/IPTC mutation or remote API calls. |
| `seo-local` | source-only | GBP/NAP/review/location research requires supplied local-business facts and target access; not a generic app-UI route. |
| `seo-maps` | source-only | Maps/DataForSEO/Google APIs require credentials, costs and selected business target. |
| `seo-page` | source-only | Single-page whole-report workflow still assumes fetch/performance/browser tooling; use static narrow schema/hreflang guides first. |
| `seo-plan` | source-only | Alternative industry planning workflow creates strategy documents and competitive research, requiring explicit selection. |
| `seo-programmatic` | source-only | Large-scale page-generation strategy needs real structured data and anti-thin-content checks; no generation/production changes enabled. |
| `seo-schema` | install-manual | Selected narrow JSON-LD detection/generation guide has an explicit original page-source fallback; support schema reference/templates retained. |
| `seo-sitemap` | source-only | Useful XML rules but workflow fetches robots/sitemaps and generates structure documents with industry assets; retain source for explicit later sitemap target. |
| `seo-sxo` | source-only | SERP intent/persona scoring needs actual query/competitor evidence; no fabricated rankings or UX scores. |
| `seo-technical` | source-only | Full crawl/indexability/CWV/rendering/IndexNow surface needs authorized target and chosen browser/runtime; no submission API enabled. |

### huggingface-skills (25)

| Original name | Decision | Reason |
|---|---|---|
| `hf-cli` | source-only | Broad Hub/Jobs/upload/auth router; vendor curl-pipe installer and token-printing commands are not the selected passive capability or permission to access credentials. |
| `hf-cloud-aws-context-discovery` | source-only | Reads local AWS context and calls identity APIs; credential/account discovery is prohibited in this assignment. |
| `hf-cloud-python-env-setup` | source-only | AWS deployment dependency/bootstrap workflow not needed for local ML guidance; no global Python change. |
| `hf-cloud-sagemaker-deployment-planner` | source-only | Cloud endpoints incur cost and send artifacts; no AWS target or credentialed operation authorized. |
| `hf-cloud-sagemaker-iam-preflight` | source-only | Inspects/creates IAM execution roles; no cloud permission or account reads authorized. |
| `hf-cloud-sagemaker-production-defaults` | source-only | Creates endpoints/autoscaling/alarms and invokes/upload resources; production/cloud changes out of scope. |
| `hf-cloud-serving-image-selection` | source-only | Cloud ECR/container image selection and mirroring require account/network/serving choice; no container pull or cloud SDK installed. |
| `hf-mem` | source-only | HTTP Range memory estimator useful for a concrete Hub model, but no model selected and no CLI/runtime needed for guidance installation. |
| `huggingface-best` | source-only | Leaderboard/model discovery useful for explicit benchmark selection; example directly reads HF token from cache and must not become automatic credential access. |
| `huggingface-community-evals` | install-auto | Selected local-eval/backend design capability with all three scripts retained. Provider-backed script is remote paid inference, not local GPU fallback permission; no evaluation engine installed. |
| `huggingface-datasets` | install-auto | Selected Dataset Viewer discovery/pagination guidance. Upload and Agent Traces sections are explicitly NOT authorization to read/upload transcripts or user data. |
| `huggingface-gradio` | source-only | Useful actual Python UI/demo specialization; no Gradio app or dependency/version selected in this domain-guidance slice. |
| `huggingface-llm-trainer` | source-only | Distinct HF Jobs/cloud training workflow; local API-focused trl-training selected instead to avoid remote default/cost/upload assumptions. |
| `huggingface-local-models` | install-auto | Selected GGUF/llama.cpp selection, quantization and local-serving reference including Windows install example; no model download, server, CLI or conversion runtime installed. |
| `huggingface-lora-space-builder` | source-only | Publishes user LoRA demo/Space and may use remote GPU; no publishing/upload or Spaces hardware scope selected. |
| `huggingface-paper-publisher` | source-only | Academic owner retains paper/research pipeline; publishing/claiming authorship/Hub writes require explicit owner selection. |
| `huggingface-papers` | source-only | Academic owner retains literature/citation workflow; a specialized read-only HF paper-page route remains available as source rather than parallel default. |
| `huggingface-spaces` | source-only | Build/deploy/maintain remote Spaces, tokens and hardware; no deployment selected or account access authorized. |
| `huggingface-tool-builder` | source-only | Broad API automation creates new scripts for tasks; no recurring Hub API tool requested, native tools suffice for source guidance. |
| `huggingface-trackio` | source-only | Local tracking can be useful but vendor examples sync to public Spaces/webhooks; choose project-local offline tracker only on actual experiment scope. |
| `huggingface-vision-trainer` | source-only | Defaults HF Jobs GPU and automatic Hub persistence; no managed training or GPU stack installed. |
| `huggingface-zerogpu` | source-only | Remote Spaces GPU process/quotas specialism; no Spaces app selected and no cloud operation authorized. |
| `train-sentence-transformers` | install-auto | Selected substantive retrieval/reranker/sparse/multivector training, evaluators, distillation and LoRA/PEFT references. Preserve all scripts; block public push and Trackio remote defaults absent explicit authorization. |
| `transformers-js` | source-only | Useful browser/JS inference stack with WASM/WebGPU; no inference feature/model/runtime target selected, no model weight downloads. |
| `trl-training` | install-auto | Selected compact local TRL API/CLI guide for SFT/DPO/GRPO/KTO/reward/distillation + LoRA config. Runtime version/hardware compatibility must be selected per project; no torch/TRL/CUDA installation. |

## Impeccable incumbent (sixth target)

Current `4.8.0`, pin `414603bf14c7a344edb466bb1f85690c77ce8b7d`, Apache2. Local `ecosystem/IMPECCABLE-OMP.md` and current vendor SKILL.md were read. No upgrade repeated. Its24 command/playbook decisions are listed in JSON `impeccable.subcommands`: all guidance retained under the existing manual/native fallback contract; `craft` remains an unactivated deprecated vendor alias, while executable `live` and `generate` remain blocked. Extra hook/doctor/pin/context actions remain restricted as documented. This distinguishes retained design capability from unverified engine capability.

## Routing positive versus near miss

- **choreograph**: Panel and content resize/fade should run together; hero title/support require overlapping timing and interruption handling. Near miss: Single hover easing fix uses animate; deciding whether any motion belongs uses remove-animations/find-animation-opportunities.
- **remove-animations**: A dashboard feels over-animated: remove repeated scroll reveals and callback delays without leaving opacity:0 or broken focus. Near miss: Do not redesign layout or retune a retained spring; use motion implementation/review skill.
- **gsap-scrolltrigger**: Existing GSAP scene needs scrub, pin spacing, dynamic layout refresh, component teardown. Near miss: Ordinary sticky positioning or native scrolling is not an automatic reason to install GSAP.
- **gsap-performance**: Existing GSAP mouse follower allocates overlapping tweens every pointer event; examine quickTo and lifecycle cleanup. Near miss: No frame-rate guarantee from source inspection; profile actual devices, and use general animation-performance for non-GSAP.
- **gsap-plugins**: Project already uses GSAP; implement Flip state animation or register SplitText/MorphSVG plugin correctly. Near miss: No private registry, token creation, or paid Club membership needed merely because old examples mention it; runtime license remains separate.
- **gsap-frameworks**: Vue/Svelte/Nuxt GSAP component needs selector scoping and teardown. Near miss: React uses current gsap-react; do not install Vue/Nuxt or run bundled examples for guidance verification.
- **gsap-utils**: Existing GSAP animation needs mapRange, wrap, snap or clamp reference. Near miss: Do not add GSAP to implement one numeric clamp in an unrelated backend.
- **trl-training**: Author local TRL SFT/DPO/GRPO/KTO/reward/distillation code with correct dataset shape and optional LoRA config. Near miss: No HF Jobs, model download, GPU allocation, model soup/arbitrary checkpoint merge, or paid inference implied.
- **train-sentence-transformers**: Select a retrieval evaluator/loss, compare pre-training held-out baseline, and plan LoRA fine-tuning or reranker distillation. Near miss: Public push/Trackio sync remain forbidden absent separate permission; generic LLM training routes to trl-training, not retrieval defaults.
- **huggingface-community-evals**: Choose local inspect-ai/lighteval backend and small held-out evaluation plan. Near miss: No provider-backed script fallback, Jobs, benchmark execution with code tasks or trust_remote_code without explicit authorization.
- **huggingface-local-models**: Plan a Windows local GGUF quant/serving command using exact public model filename. Near miss: Planning does not permit downloading weights, installing llama.cpp, or starting a server.
- **huggingface-datasets**: Resolve public Dataset Viewer split and bounded rows with pagination. Near miss: Never activate for provenance/memory or read/upload sessions/traces; data upload needs specific separate consent.
- **frontend-design**: Explicitly select a lightweight alternative art-direction exercise for a supplied fictional cafe brief. Near miss: Do not compete with Impeccable as two simultaneous default design leads or replace an existing identity unasked.
- **canvas-design**: Explicit request for an original static poster/art composition with bundled licensed typefaces. Near miss: Not a full Office document editor or proof of a ready PDF renderer.
- **theme-factory**: User explicitly wants to choose a palette/type theme for a deck or static artifact. Near miss: Do not replace pinned brand tokens or restyle app UI automatically.
- **seo-schema**: Explicitly review a supplied synthetic JSON-LD block from local HTML for syntax/type/truthful required properties. Near miss: No crawl, rich-result guarantee, API submission, invented review or live Google validation claim.
- **seo-hreflang**: Explicitly compare local en/fr page-head snippets for self/canonical and reciprocal alternates. Near miss: Do not infer live URL reachability, ranking factors, cultural scores or translation quality from tags alone.

## Rollback / cleanup

No existing path was overwritten. Parent can move only `rollback.native_directories_to_move` and the curated SEO root to `ecosystem/backups/candidate-adoption-20261107/domain-adoption`, remove only this slice's customDirectories/manualSkills additions, and start a fresh OMP session. Do not delete or roll back siblings' work; keep original source snapshots outside discovery for provenance. No transient service, dependency runtime or custom replacement skill was created.

Not checked here: post-copy byte equality/discovery, vendor execution, rendered UI/browser behavior, ML GPU/runtime compatibility or output quality. Parent smoke remains required; installation is original guidance only, not permission to execute vendor defaults.
