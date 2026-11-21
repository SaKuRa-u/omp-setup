# Peta dokumentasi native OMP 19.0.1

Cakupan: 135 dokumen dari `omp://`; 17 dibaca pada bagian yang relevan dan 118 dari pembuka. Bukan review baris demi baris atau uji runtime. Subjek ringkas berasal dari pembuka asli, bukan jaminan fitur tersedia untuk semua mode/OS. Lihat [hasil pilot dan batas penerapan](PUBLIC-RESULTS.md).

## Operasi sesi dan interaksi

| Dokumen | Kedalaman | Pokok pembuka / scope |
|---|---|---|
| [approval-mode.md](omp://approval-mode.md) | terfokus | Dibaca terfokus pada kontrak/pasal yang dirujuk di proposal atau peta pengembangan. |
| [collab.md](omp://collab.md) | pembuka | &#96;/collab&#96; shares your running session with other omp instances in real time. Guests render the **same session natively in their own TUI** — streaming assistant text, tool-call cards, footer state (cwd, model, context … |
| [compaction.md](omp://compaction.md) | terfokus | Dibaca terfokus pada kontrak/pasal yang dirujuk di proposal atau peta pengembangan. |
| [context-files.md](omp://context-files.md) | pembuka | Context files are Markdown instruction files that &#96;omp&#96; discovers automatically before a session starts and injects into the agent's project context. Use them for repository conventions, architecture notes, test and r… |
| [handoff-generation-pipeline.md](omp://handoff-generation-pipeline.md) | terfokus | Dibaca terfokus pada kontrak/pasal yang dirujuk di proposal atau peta pengembangan. |
| [keybindings.md](omp://keybindings.md) | pembuka | Run &#96;/hotkeys&#96; inside an &#96;omp&#96; session for the built-in shortcut reference. Application-action rows reflect remaps loaded from disk; navigation/editing examples use fixed chords. This is not an inventory of extension-… |
| [magic-keywords.md](omp://magic-keywords.md) | pembuka | Magic keywords are standalone prose words in a user prompt that can add hidden, user-attributed instructions for that turn. Notice injection is enabled by default. The TUI animates recognized words while the editor is… |
| [prewalk.md](omp://prewalk.md) | pembuka | Prewalk is a one-shot handoff from the active model to a faster or cheaper model after planning reaches implementation. It lets the starting model inspect the repository, create a todo list, and begin the change befor… |
| [session-operations-export-share-fork-resume.md](omp://session-operations-export-share-fork-resume.md) | terfokus | Dibaca terfokus pada kontrak/pasal yang dirujuk di proposal atau peta pengembangan. |
| [session-switching-and-recent-listing.md](omp://session-switching-and-recent-listing.md) | pembuka | This document describes how coding-agent discovers recent sessions, resolves &#96;--resume&#96; targets, presents session pickers, and switches the active runtime session. |
| [session-tree-plan.md](omp://session-tree-plan.md) | terfokus | Dibaca terfokus pada kontrak/pasal yang dirujuk di proposal atau peta pengembangan. |
| [session.md](omp://session.md) | pembuka | This document is the source of truth for how coding-agent sessions are represented, persisted, migrated, and reconstructed at runtime. |
| [skills.md](omp://skills.md) | pembuka | Skills are file-backed capability packs discovered at startup and exposed to the model as: |
| [stream.md](omp://stream.md) | pembuka | &#96;omp stream&#96; broadcasts your omp sessions to &#96;live.omp.sh/<username>&#96; — a Twitch-style page with the live terminal and a chat column. Viewers see exactly what your terminal shows (minus secrets); they cannot type into… |
| [theme.md](omp://theme.md) | pembuka | This document describes how theming works in the coding-agent today: schema, loading, runtime behavior, and failure modes. |
| [tree.md](omp://tree.md) | pembuka | &#96;/tree&#96; opens the interactive **Session Tree** navigator. It lets you jump to any entry in the current session file and continue from that point. |
| [tui-core-renderer.md](omp://tui-core-renderer.md) | pembuka | This document describes the core renderer contract. The relevant implementation |
| [tui-runtime-internals.md](omp://tui-runtime-internals.md) | pembuka | This document maps terminal input and rendering ownership in interactive mode. See [&#96;tui-core-renderer.md&#96;](./tui-core-renderer.md) for terminal-write invariants. |
| [tui.md](omp://tui.md) | pembuka | This document covers the **current** TUI contract used by &#96;packages/coding-agent&#96; and &#96;packages/tui&#96; for extension UI, custom tool UI, and custom renderers. |
| [vibe-mode.md](omp://vibe-mode.md) | terfokus | Dibaca terfokus pada kontrak/pasal yang dirujuk di proposal atau peta pengembangan. |

## Model, transport dan data

| Dokumen | Kedalaman | Pokok pembuka / scope |
|---|---|---|
| [ERRATA-GPT5-HARMONY.md](omp://ERRATA-GPT5-HARMONY.md) | pembuka | Historical research note, not a current runtime contract. The statistics below |
| [adding-a-provider.md](omp://adding-a-provider.md) | pembuka | A built-in provider is described in two halves: |
| [ai-schema-normalize.md](omp://ai-schema-normalize.md) | pembuka | &#96;@oh-my-pi/pi-ai&#96; exposes shared schema normalization helpers that providers |
| [auth-broker-gateway.md](omp://auth-broker-gateway.md) | pembuka | The auth broker centralizes credential storage and OAuth refreshes. The auth gateway lets clients make provider requests without receiving provider credentials. Direct broker clients are trusted: snapshots expose OAut… |
| [local-models.md](omp://local-models.md) | pembuka | This document covers the on-device models in the &#96;local&#96; catalog and records the tiny-model experiments behind the shipped title and memory recommendations. Model selection is role-based: use &#96;modelRoles.<role>&#96; for t… |
| [memory.md](omp://memory.md) | pembuka | omp supports five memory modes. Memory is disabled by default; select one backend via &#96;/settings&#96; or &#96;config.yml&#96;: |
| [mnemosyne-memory-backend.md](omp://mnemosyne-memory-backend.md) | pembuka | omp can use &#96;@oh-my-pi/pi-mnemopi&#96; as a local long-term memory backend. |
| [models.md](omp://models.md) | terfokus | Dibaca terfokus pada kontrak/pasal yang dirujuk di proposal atau peta pengembangan. |
| [non-compaction-retry-policy.md](omp://non-compaction-retry-policy.md) | pembuka | This document describes the standard API-error retry path coordinated by &#96;AgentSession&#96; and implemented by &#96;TurnRecovery&#96;. |
| [provider-compat-reference.md](omp://provider-compat-reference.md) | pembuka | Reference for four subsystems of &#96;packages/ai&#96; (with type definitions in &#96;packages/catalog&#96;): |
| [provider-endpoint-constraints.md](omp://provider-endpoint-constraints.md) | pembuka | Provider integrations are not interchangeable just because they speak an |
| [provider-quirks.md](omp://provider-quirks.md) | pembuka | Per-provider deep dive for &#96;packages/ai&#96; transports: what each provider special-cases beyond |
| [provider-streaming-internals.md](omp://provider-streaming-internals.md) | pembuka | This document explains how token/tool streaming is normalized in &#96;@oh-my-pi/pi-ai&#96;, then propagated through &#96;@oh-my-pi/pi-agent-core&#96; and &#96;coding-agent&#96; session events. |
| [providers.md](omp://providers.md) | pembuka | Providers are the model backends &#96;omp&#96; can route requests to: Anthropic, OpenAI, Google Gemini, Groq, OpenRouter, Mistral, xAI, local engines like Ollama, hosted gateways, custom &#96;models.yml&#96; providers, and providers … |
| [secrets.md](omp://secrets.md) | pembuka | Redacts sensitive values (API keys, tokens, passwords) in conversation messages sent to LLM providers. When enabled, configured secrets and built-in credential-shaped token patterns are replaced in supported message a… |
| [toolconv/anthropic.md](omp://toolconv/anthropic.md) | pembuka | Anthropic's Claude is a hosted model family, not a local model with a &#96;--tool-call-parser&#96; flag. The canonical tool-calling convention is the **Messages API** (&#96;POST /v1/messages&#96;, header &#96;anthropic-version: 2023-06-0… |
| [toolconv/deepseek.md](omp://toolconv/deepseek.md) | pembuka | DeepSeek-V3, V3-0324, R1, R1-0528, and V3.1 use a distinctive chat envelope built from |
| [toolconv/gemini.md](omp://toolconv/gemini.md) | pembuka | Pythonic text convention handled by OMP's **&#96;gemini&#96; owned dialect**, used for prompt-driven **Gemma 3** tool calling and seen in malformed hosted **Gemini** output. Calls are Python-like expressions such as &#96;default_… |
| [toolconv/gemma.md](omp://toolconv/gemma.md) | pembuka | Tool-calling convention of Google's **Gemma 4** open-weights family (&#96;google/gemma-4-*-it&#96;). It differs from the prompt-driven Pythonic &#96;tool_code&#96; convention for Gemma 3 and malformed hosted Gemini output (see [gemin… |
| [toolconv/glm-4.5.md](omp://toolconv/glm-4.5.md) | pembuka | Native tool-calling convention of Zhipu AI / Z.ai's **GLM-4.5** family (&#96;zai-org/GLM-4.5&#96; 355B-A32B and &#96;zai-org/GLM-4.5-Air&#96; 106B-A12B, &#96;model_type: "glm4_moe"&#96;), shared byte-for-byte by **GLM-4.6**. Unlike the JSON-… |
| [toolconv/harmony.md](omp://toolconv/harmony.md) | pembuka | Harmony is the response format OpenAI trained its open-weight &#96;gpt-oss&#96; models on (&#96;gpt-oss-20b&#96;, &#96;gpt-oss-120b&#96;, released August 2025). It defines the conversation envelope, the multi-channel reasoning/answer separat… |
| [toolconv/hermes.md](omp://toolconv/hermes.md) | pembuka | Tool-calling convention originated by NousResearch's **Hermes 2 Pro** (Llama-3-based open models) and carried on by the **Hermes 3** line, plus a long tail of community fine-tunes. The envelope is **ChatML**: every tu… |
| [toolconv/kimi-k2.md](omp://toolconv/kimi-k2.md) | pembuka | Native tool-calling convention of Moonshot AI's **Kimi K2** family (&#96;moonshotai/Kimi-K2-Instruct&#96; and &#96;-Base&#96;, &#96;model_type: "kimi_k2"&#96;, 1T-param MoE). It is a ChatML-like envelope built on a TikToken tokenizer (160K v… |
| [toolconv/minimax.md](omp://toolconv/minimax.md) | pembuka | OMP's &#96;minimax&#96; dialect is the prompt-driven, in-band tool protocol for MiniMax-family models. Calls are ordinary assistant text: one &#96;<minimax:tool_call>&#96; envelope contains one or more &#96;<invoke>&#96; elements. OMP execut… |
| [toolconv/pi-native.md](omp://toolconv/pi-native.md) | pembuka | &#96;pi-native&#96; is the lossless transport between a pi-ai client and an |
| [toolconv/qwen3.md](omp://toolconv/qwen3.md) | pembuka | Tool-calling convention of Alibaba's **Qwen3** family (&#96;Qwen/Qwen3-*&#96;: dense &#96;0.6B–32B&#96; and MoE &#96;30B-A3B&#96;/&#96;235B-A22B&#96;; same template line as &#96;Qwen2.5-*&#96; and &#96;QwQ-32B&#96;). It is the **Hermes** convention — the XML+JSON f… |
| [toolconv/xml.md](omp://toolconv/xml.md) | pembuka | OMP's &#96;xml&#96; dialect is a generic, prompt-driven in-band protocol. The model writes one &#96;<invoke>&#96; element per tool call directly in assistant text; OMP parses those calls and returns one ordered &#96;<tool_response>&#96; bloc… |

## Agen, otomasi, dan integrasi

| Dokumen | Kedalaman | Pokok pembuka / scope |
|---|---|---|
| [advisor-watchdog.md](omp://advisor-watchdog.md) | terfokus | Dibaca terfokus pada kontrak/pasal yang dirujuk di proposal atau peta pengembangan. |
| [agent-hub.md](omp://agent-hub.md) | terfokus | Dibaca terfokus pada kontrak/pasal yang dirujuk di proposal atau peta pengembangan. |
| [autoresearch.md](omp://autoresearch.md) | terfokus | Dibaca terfokus pada kontrak/pasal yang dirujuk di proposal atau peta pengembangan. |
| [extension-loading.md](omp://extension-loading.md) | pembuka | This document covers how the coding agent discovers and loads extension modules at startup. Scanned native/configured directories auto-discover &#96;.ts&#96; and &#96;.js&#96;; explicitly named files and installed-plugin manifest ent… |
| [extensions.md](omp://extensions.md) | terfokus | Dibaca terfokus pada kontrak/pasal yang dirujuk di proposal atau peta pengembangan. |
| [hooks.md](omp://hooks.md) | pembuka | This document describes the **current hook subsystem code** in &#96;packages/coding-agent/src/extensibility/hooks/*&#96;. |
| [kiro.md](omp://kiro.md) | pembuka | Kiro is a native provider backed by the Kiro API (&#96;kiro-api&#96;). For general credential precedence and provider configuration, see [Providers](./providers.md); for transport details, see [Provider quirks](./provider-qui… |
| [marketplace.md](omp://marketplace.md) | pembuka | The marketplace system lets you discover, install, and manage plugins from Git, local, or direct-catalog sources. It is compatible with the Claude Code plugin registry format. |
| [mcp-config.md](omp://mcp-config.md) | pembuka | This guide explains how to add, edit, and validate MCP servers for the OMP coding agent. |
| [mcp-protocol-transports.md](omp://mcp-protocol-transports.md) | pembuka | This document describes how coding-agent implements MCP JSON-RPC messaging and how protocol concerns are split from transport concerns. |
| [mcp-runtime-lifecycle.md](omp://mcp-runtime-lifecycle.md) | pembuka | This document describes how MCP servers are discovered, connected, exposed as tools, refreshed, and torn down in the coding-agent runtime. |
| [mcp-server-tool-authoring.md](omp://mcp-server-tool-authoring.md) | pembuka | This document explains how MCP server definitions become callable &#96;mcp__*&#96; tools in coding-agent, and what operators should expect when configs are invalid, duplicated, disabled, or auth-gated. |
| [rpc.md](omp://rpc.md) | terfokus | Dibaca terfokus pada kontrak/pasal yang dirujuk di proposal atau peta pengembangan. |
| [sdk.md](omp://sdk.md) | pembuka | The SDK is the in-process integration surface for &#96;@oh-my-pi/pi-coding-agent&#96;. |
| [skills/authoring-extensions.md](omp://skills/authoring-extensions.md) | pembuka | description: Use when creating a new omp extension. Covers ExtensionAPI, factory signature, tool/command/event registration, and local-dev testing. |
| [skills/authoring-hooks.md](omp://skills/authoring-hooks.md) | pembuka | description: Use when creating a new omp hook. Covers HookAPI, event catalog, blocking/overriding tool calls, and context modification. |
| [skills/authoring-marketplaces.md](omp://skills/authoring-marketplaces.md) | pembuka | description: Use when creating a new omp marketplace. Covers marketplace.json schema, source types, install commands, and publishing. |
| [skills/examples/hello-extension/README.md](omp://skills/examples/hello-extension/README.md) | pembuka | A minimal &#96;omp&#96; extension that demonstrates the two most common authoring patterns: subscribing to &#96;session_start&#96; to notify on load, and registering a &#96;/hello&#96; slash command that sends a greeting into the conversatio… |
| [skills/examples/mini-marketplace/README.md](omp://skills/examples/mini-marketplace/README.md) | pembuka | A minimal &#96;omp&#96; marketplace catalog that demonstrates the &#96;marketplace.json&#96; format. It lists one plugin (&#96;my-plugin&#96;) using a relative path source. |
| [skills/examples/safety-hook/README.md](omp://skills/examples/safety-hook/README.md) | pembuka | An &#96;omp&#96; extension that demonstrates &#96;tool_call&#96; blocking. It intercepts &#96;bash&#96; tool calls and returns &#96;{ block: true, reason: "..." }&#96; when the command matches &#96;rm -rf&#96; followed by an absolute path, preventing the to… |
| [slash-command-internals.md](omp://slash-command-internals.md) | pembuka | This document describes how slash commands are discovered, deduplicated, surfaced in interactive mode, and expanded at prompt time in &#96;coding-agent&#96;. |
| [task-agent-discovery.md](omp://task-agent-discovery.md) | terfokus | Dibaca terfokus pada kontrak/pasal yang dirujuk di proposal atau peta pengembangan. |
| [user-facing-packages.md](omp://user-facing-packages.md) | pembuka | This page indexes README-only user-facing package CLIs and features that need root docs coverage beyond package-local READMEs/manifests. |

## Alat, sandboxing terbatas dan implementasi

| Dokumen | Kedalaman | Pokok pembuka / scope |
|---|---|---|
| [bash-tool-runtime.md](omp://bash-tool-runtime.md) | pembuka | This document describes the **&#96;bash&#96; tool** runtime path used by agent tool calls, from command normalization to execution, truncation/artifacts, and rendering. |
| [blob-artifact-architecture.md](omp://blob-artifact-architecture.md) | pembuka | This document describes how coding-agent stores large/binary payloads outside session JSONL, how truncated tool output is persisted, and how internal URLs (&#96;local://N.log&#96; spills, &#96;agent://&#96;) resolve back to stored data. |
| [computer-use.md](omp://computer-use.md) | pembuka | Eval's &#96;computer&#96; prelude controls the host desktop. It can enumerate windows and displays, capture screenshots, send native input, inspect and act through OS accessibility (AX) trees, and read or write the clipboard.… |
| [custom-tools.md](omp://custom-tools.md) | pembuka | Custom tools are model-callable functions that plug into the same tool execution pipeline as built-in tools. |
| [fs-scan-cache-architecture.md](omp://fs-scan-cache-architecture.md) | pembuka | This document defines the shared directory-listing cache implemented by &#96;crates/xfs&#96; and consumed by native discovery APIs exposed to &#96;packages/coding-agent&#96;. |
| [lsp-config.md](omp://lsp-config.md) | pembuka | This guide explains how to configure language servers for the OMP coding agent. |
| [native-crates.md](omp://native-crates.md) | pembuka | Contributor map for Rust workspace members under &#96;crates/&#96;. They are implementation details behind &#96;@oh-my-pi/pi-natives&#96; and its embedded shell; package consumers use JavaScript entrypoints, not these crate APIs. |
| [natives-addon-loader-runtime.md](omp://natives-addon-loader-runtime.md) | pembuka | This page documents &#96;packages/natives/native/loader-state.js&#96;, the runtime between an ESM entrypoint and a validated &#96;pi_natives.*.node&#96; addon. |
| [natives-architecture.md](omp://natives-architecture.md) | pembuka | &#96;@oh-my-pi/pi-natives&#96; combines a JavaScript ESM loader with a Rust Node-API addon: |
| [natives-binding-contract.md](omp://natives-binding-contract.md) | pembuka | This page defines the public JS/TS boundary between &#96;@oh-my-pi/pi-natives&#96; callers and its N-API addon. The authoritative public root surface is &#96;packages/natives/native/index.d.ts&#96; plus the explicit ESM exports in &#96;n… |
| [natives-build-release-debugging.md](omp://natives-build-release-debugging.md) | pembuka | This runbook describes how &#96;@oh-my-pi/pi-natives&#96; produces &#96;.node&#96; addons, generated declarations, and compiled-binary embedded payloads, and how to debug loader/build failures. |
| [natives-media-system-utils.md](omp://natives-media-system-utils.md) | pembuka | This document covers the media/system/conversion exports in &#96;@oh-my-pi/pi-natives&#96;: audio capture/playback and live WebRTC media, terminal SIXEL conversion, SVG rasterization, snapcompact PNG rendering, HTML/PDF conve… |
| [natives-rust-task-cancellation.md](omp://natives-rust-task-cancellation.md) | pembuka | This document describes how &#96;crates/natives&#96; schedules native work and how cancellation flows from JS options (&#96;timeoutMs&#96;, &#96;AbortSignal&#96;) into Rust execution. |
| [natives-shell-pty-process.md](omp://natives-shell-pty-process.md) | pembuka | This document covers execution/process/terminal primitives in &#96;@oh-my-pi/pi-natives&#96;: &#96;shell&#96;, &#96;pty&#96;, &#96;ps&#96;, and &#96;keys&#96;, using the architecture terms from &#96;docs/natives-architecture.md&#96;. |
| [natives-text-search-pipeline.md](omp://natives-text-search-pipeline.md) | pembuka | This document maps the &#96;@oh-my-pi/pi-natives&#96; text/search/code surface from generated JS/TS exports to Rust N-API modules and back to JS result objects. |
| [notebook-tool-runtime.md](omp://notebook-tool-runtime.md) | pembuka | This document describes current &#96;.ipynb&#96; handling in &#96;coding-agent&#96; and its relationship to the kernel-backed Python runtime. |
| [omptype-guide.md](omp://omptype-guide.md) | pembuka | Internal schemas use **&#96;@oh-my-pi/omptype&#96;** — an ArkType-compatible validator |
| [python-repl.md](omp://python-repl.md) | pembuka | This document describes the Python execution stack in &#96;packages/coding-agent&#96;. |
| [resolve-tool-runtime.md](omp://resolve-tool-runtime.md) | pembuka | Pending previews and plan approval do not use a &#96;resolve&#96; tool. They finalize through plain-text &#96;write&#96; calls to virtual &#96;xd://&#96; devices implemented in &#96;packages/coding-agent/src/tools/resolve.ts&#96;: |
| [rulebook-matching-pipeline.md](omp://rulebook-matching-pipeline.md) | pembuka | This document describes how coding-agent discovers rules from supported config formats, normalizes them into a single &#96;Rule&#96; shape, resolves precedence conflicts, and splits the result into: |
| [tools/ask.md](omp://tools/ask.md) | pembuka | Asks the interactive user to fill in one HTML form and returns the submitted form data. |
| [tools/ast-edit.md](omp://tools/ast-edit.md) | pembuka | Preview and apply structural rewrites over source files via native ast-grep. |
| [tools/ast-grep.md](omp://tools/ast-grep.md) | pembuka | Structural code search over supported source files via native ast-grep. |
| [tools/bash.md](omp://tools/bash.md) | pembuka | Execute a shell command in the session workspace, with optional PTY, background-job handling, or supervised service mode. |
| [tools/browser.md](omp://tools/browser.md) | pembuka | The Eval &#96;browser&#96; facade opens, reuses, scripts, and closes named Chromium, Electron, CDP, relay, Tern, or cmux tabs. Use [&#96;read&#96;](./read.md) for static URLs; use &#96;browser&#96; for authenticated state, JavaScript executi… |
| [tools/checkpoint.md](omp://tools/checkpoint.md) | pembuka | Mark the current top-level conversation state so later &#96;rewind&#96; can collapse exploratory context into a report. |
| [tools/computer.md](omp://tools/computer.md) | pembuka | Drive the real host desktop from Eval through direct &#96;computer&#96; helpers and window/element handles, or persistent JavaScript via &#96;computer.run&#96;: enumerate windows and displays, capture screenshots, send native input, … |
| [tools/context-notes.md](omp://tools/context-notes.md) | pembuka | Read or replace the current branch's persistent experimental context notebook. |
| [tools/debug.md](omp://tools/debug.md) | pembuka | Drive one DAP debug session; adjacent debug UI code reuses the same subsystem for logs, raw SSE capture, reports, profiling, and system diagnostics. |
| [tools/dsm.md](omp://tools/dsm.md) | pembuka | Open, inspect, edit, and script binary analysis databases (IDA Pro via idalib, or Ghidra via PyGhidra) from eval. Databases are hosted by the omp daemon and shared by every omp process. |
| [tools/edit.md](omp://tools/edit.md) | pembuka | Applies source edits. The default &#96;hashline&#96; mode consumes one line-anchored patch string and edits existing files directly. |
| [tools/eval.md](omp://tools/eval.md) | pembuka | Execute one Python or JavaScript cell in a persistent language runtime. One tool call is one cell; state survives later calls. |
| [tools/find.md](omp://tools/find.md) | terfokus | Dibaca terfokus pada kontrak/pasal yang dirujuk di proposal atau peta pengembangan. |
| [tools/generate_image.md](omp://tools/generate_image.md) | pembuka | Generate or edit images and write generated image files to temporary paths. |
| [tools/github.md](omp://tools/github.md) | pembuka | Dispatch GitHub CLI operations for repositories, repository files, pull requests, search, and Actions run watching. |
| [tools/glob.md](omp://tools/glob.md) | pembuka | Find filesystem paths by glob; use &#96;grep&#96; when you need content matches instead of path matches. |
| [tools/grep.md](omp://tools/grep.md) | pembuka | Grep file contents with a regex across files, directories, globs, and internal URLs. |
| [tools/learn.md](omp://tools/learn.md) | pembuka | Capture a reusable lesson into long-term memory and optionally create or update a managed skill. |
| [tools/lsp.md](omp://tools/lsp.md) | pembuka | Query language servers for diagnostics, navigation, symbols, renames, code actions, capabilities, and raw requests. |
| [tools/manage_skill.md](omp://tools/manage_skill.md) | pembuka | Create, update, or delete an isolated managed skill. |
| [tools/memory_edit.md](omp://tools/memory_edit.md) | pembuka | Update, forget, or invalidate Mnemopi long-term memories by id. |
| [tools/new-context.md](omp://tools/new-context.md) | pembuka | Request a fresh experimental context window while preserving the current notebook and recoverable branch history. |
| [tools/read.md](omp://tools/read.md) | pembuka | Read files, directories, archives, SQLite databases, internal resources, images, documents, and URLs through one &#96;path&#96; string. |
| [tools/recall.md](omp://tools/recall.md) | pembuka | Search the active long-term memory backend and return matching memories. |
| [tools/reflect.md](omp://tools/reflect.md) | pembuka | Synthesize an answer over the active long-term memory backend. |
| [tools/retain.md](omp://tools/retain.md) | pembuka | Store durable facts through the active long-term memory backend. |
| [tools/rewind.md](omp://tools/rewind.md) | pembuka | End an active checkpoint by pruning exploratory context and retaining a concise report. |
| [tools/security_scan.md](omp://tools/security_scan.md) | pembuka | Plan and run OMP-native security reviews, validate stored findings, and explicitly interact with Codex Security cloud scans. |
| [tools/task.md](omp://tools/task.md) | terfokus | Dibaca terfokus pada kontrak/pasal yang dirujuk di proposal atau peta pengembangan. |
| [tools/todo.md](omp://tools/todo.md) | pembuka | Applies one mutation to the session todo list and returns a text summary plus the full phase/task state. |
| [tools/tts.md](omp://tools/tts.md) | pembuka | Generate a speech audio file from text using the speech model role and write it to &#96;output_path&#96;. |
| [tools/wait.md](omp://tools/wait.md) | pembuka | Block until the next background result, peer message, or steering interrupt when there is no other work to do. |
| [tools/web_search.md](omp://tools/web_search.md) | pembuka | Run one web query through the configured search chain and return the first usable answer/sources, with optional citations. |
| [tools/write.md](omp://tools/write.md) | pembuka | Create or overwrite a file, writable internal resource, archive entry, SQLite row, or merge-conflict resolution. |
| [ttsr-injection-lifecycle.md](omp://ttsr-injection-lifecycle.md) | pembuka | This document covers the current Time Traveling Stream Rules (TTSR) runtime path from rule discovery to stream interruption, retry injection, extension notifications, and session-state handling. |

## Konfigurasi dan referensi CLI

| Dokumen | Kedalaman | Pokok pembuka / scope |
|---|---|---|
| [cli-reference.md](omp://cli-reference.md) | pembuka | When the first positional argument is **not** a registered subcommand, &#96;omp&#96; |
| [config-usage.md](omp://config-usage.md) | terfokus | Dibaca terfokus pada kontrak/pasal yang dirujuk di proposal atau peta pengembangan. |
| [environment-variables.md](omp://environment-variables.md) | pembuka | This reference is derived from current code paths in: |
| [gemini-manifest-extensions.md](omp://gemini-manifest-extensions.md) | pembuka | This document covers how the coding-agent discovers and parses Gemini-style manifest extensions (&#96;gemini-extension.json&#96;) into the &#96;extensions&#96; capability. |
| [install-id.md](omp://install-id.md) | pembuka | A persistent per-install UUID shared across sessions and profiles. It supplies a stable installation identity where provider compatibility protocols, account-scoped device metadata, auth-broker usage reporting, or ded… |
| [macos-signing-notarization.md](omp://macos-signing-notarization.md) | pembuka | The compiled macOS &#96;omp&#96; binaries (served by build.stencil.so and attached to |
| [plugin-manager-installer-plumbing.md](omp://plugin-manager-installer-plumbing.md) | pembuka | This document describes how &#96;omp plugin&#96; npm/git/link and marketplace operations mutate plugin state on disk and become runtime capabilities. Marketplace installs keep their own registries and cache, then register the… |
| [porting-to-natives.md](omp://porting-to-natives.md) | pembuka | This is the contributor path for moving a measured JS/TS hot path into &#96;crates/natives&#96; and exposing it through &#96;@oh-my-pi/pi-natives&#96;. |
| [settings.md](omp://settings.md) | terfokus | Dibaca terfokus pada kontrak/pasal yang dirujuk di proposal atau peta pengembangan. |
| [system-prompt-customization.md](omp://system-prompt-customization.md) | pembuka | How the coding agent assembles its system prompt and what users can control with &#96;SYSTEM_TEMPLATE.md&#96;, &#96;SYSTEM.md&#96;, &#96;APPEND_SYSTEM.md&#96;, &#96;TITLE_SYSTEM.md&#96;, and CLI flags. Programmatic API options are called out where t… |
