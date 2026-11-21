# Backup setup OMP: SaKuRa-u

Snapshot konfigurasi dan sumber **OMP default-profile** di Windows, diperbarui **21 November 2026**. Snapshot ini memuat routing Sol/Luna/Astra, definisi Astra, konfigurasi subagen global, serta skill dan pin runtime terbaru yang dipilih. Ini backup teks selektif, bukan installer atau image sistem.

## Isi dan sumber kebenaran

- `home/.omp/agent/AGENTS.md`: aturan global pengguna.
- `home/.omp/agent/config.yml`, `models.yml`, `mcp.json`: konfigurasi OMP, custom model/provider yang sudah ada, dan empat MCP: Publish or Perish, Context7, REA, Semgrep. `models.yml` memuat konfigurasi aicenter serta perintah pengambilan credential melalui bridge DPAPI, bukan nilai credential; menyalinnya tidak menyiapkan credential atau membuktikan endpoint dapat diakses.
- `home/.omp/agent/agents/astra-analyst.md`: subagen Astra khusus analisis read-only.
- `home/.omp/agent/skills/`, `home/.agents/skills/`: skills OMP-only dan shared beserta file pendukung teks.
- `home/.omp/agent/extensions/`: sumber ekstensi lokal, termasuk RTK dan integrasi Orca.
- `home/.omp/plugins/`, `home/.omp/marketplaces.json`: registrasi dan sumber plugin Ponytail.
- `home/.omp/agent/ecosystem/runtime/`: launcher, bridge credential, source MCP/tool lokal, manifests dan lockfiles. Kode pengelola credential bukan credential-nya; executable, virtualenv dan dependency terpasang tidak disalin.
- `home/.omp/agent/ecosystem/sources/` dan `capabilities/`: sumber terpin, skill dengan layout relatif penting, notices/lisensi upstream. Snapshot teks ini tidak menyalin distribusi upstream secara lengkap.
- `home/.omp/agent/ecosystem/measurements/`, `ledger.json`, panduan ekosistem: provenance, pin dan bukti bertanggal. Ringkasan, manifest instalasi dan acceptance yang dipilih dipertahankan; raw transcript/inference/session tidak disertakan.
- `home/AppData/Roaming/rtk/config.toml`: konfigurasi RTK, bukan executable atau database-nya.
- `snapshot-manifest.json`: inventaris payload `home/`, ukuran byte, SHA-256 backup dan sumber, pengecualian, redaksi, serta versi yang dicatat. Jumlah berkas aktual mengikuti manifest dan hasil verifier, bukan angka tetap di README.
- `scripts/verify-snapshot.mjs`: pemeriksaan integritas luring yang hanya membaca snapshot; bukan installer, pemindai secret, atau skrip restore.

Waktu pembaruan UTC ada pada `updatedAt` di manifest. Catatan measurements bertanggal lama tetap historis: menyalinnya tidak berarti mengulang pengujian atau membuktikan integrasi bekerja pada mesin baru.

## Mulai sesi baru di Orca

Buka terminal Orca dan mulai **sesi OMP baru** tanpa selector model/effort tambahan. Sesi biasa langsung memakai **GPT-6.2 Sol `medium`**; tidak perlu `/vibe`. OMP yang memilih model untuk role dan subagen saat dipanggil. Orca menyediakan terminal/worktree, bukan router model. Sesi yang di-resume atau konfigurasi proyek dapat memakai pilihan berbeda. Selector Sol dipin: versi Sol berikutnya tidak menggantinya otomatis.

| Jalur | Model dan effort |
|---|---|
| Sesi biasa, `@default`, worker `task`, `reviewer`, Vibe `good` | GPT-6.2 Sol `medium` |
| `@smol`, `scout`, `sonic`, Vibe `fast` | GPT-6 Luna `low` |
| `@slow`, `@plan`, `security-reviewer`, `astra-analyst` | GPT-6.2 Astra `high` |
| `vision`, `commit` | `@default` |
| `judge` | GPT-6 Luna via Codex, tanpa fallback chain `judge` |

`astra-analyst` hanya mendapat `read`, `grep`, `glob`; induk tetap menangani keputusan, edit, dan verifikasi. Routing model worker otomatis **setelah dispatch**, tetapi delegasi bukan wajib untuk setiap prompt. `/vibe` mengubah alur kerja ke Vibe; Plan dapat beralih ke Astra dan kembali ke Sol saat dipause. Effort `high` atau `auto` pada sesi induk adalah pilihan sesi, bukan perubahan global atau pengganti effort worker yang dipin. Pertahankan `medium` sebagai baseline; `high` dapat menambah waktu atau pemakaian.

`task.maxConcurrency: 4` membatasi worker native `task`, bukan seluruh sesi Orca atau Orca Orchestration. `composer.predictions: false` mematikan prediksi ketikan, bukan kemampuan Sol menjawab. Badge menunjukkan model worker yang dipilih; `tier.subagent: none` tidak meminta tier premium untuk worker. `models.noJudge: true` menonaktifkan jalur native Decisions; role `judge` berbasis prompt tetap dikonfigurasi ke Luna. Ini bukan jaminan fitur Find tersedia atau semua panggilan latar memakai Luna.

[Ringkasan pilot dan cara memeriksa routing](home/.omp/agent/ecosystem/measurements/model-routing-20261121/PUBLIC-RESULTS.md) · [Prompt riset](home/.omp/agent/ecosystem/measurements/model-routing-20261121/PROMPT.md) · [Peta dokumentasi OMP](home/.omp/agent/ecosystem/measurements/model-routing-20261121/OMP-DOCS-MAP.md).

## Versi dan riwayat baseline

Baseline 21 Oktober 2026 memakai OMP `18.12.5`, Node `24.19.0` dan Bun `1.4.2`. Pembaruan 22 Oktober menambahkan subset Agency Agents; wave routing 24 Oktober mencatat 90 skill. Pembaruan 31 Oktober mencatat OMP `18.14.1` dan 96 skill global (93 metadata terlihat, tiga eksplisit). Angka dan hasil smoke Oktober tetap **historis**, bukan keadaan terkini.

Host asal: OMP `19.0.1`, Orca `1.4.266`, Node `24.22.3`, Bun `1.4.4` dan Python `3.14.10`. Pin aktif mencakup Ponytail `5.3.3`, RTK `1.2.0`, Context7 MCP `4.7.3`, Semgrep `1.185.0`, REA `6.9.0` (skill 62), Supermemory SDK `5.1.2`, ARS `3.24.3`, dan Modern Web Guidance `1.0.1`. [Catatan cutover runtime](home/.omp/agent/ecosystem/measurements/environment-apply-20261117/USAGE.md) membedakan versi, bukti, dan prasyarat. Snapshot ini tidak meng-upgrade runtime.

[Katalog discovery 21 November](home/.omp/agent/ecosystem/measurements/model-routing-20261121/SKILL-KATALOG.md) mencatat **199 command skill global** dan **215 pada Onboarding** dengan ekstensi dimatikan untuk probe. Jumlah tersebut bukan jumlah workflow yang diuji, bukan klaim discovery restore, dan tidak mencakup command tambahan dari plugin/ekstensi. Catatan 13 November (191 global) tetap historis.

Ledger atau laporan lama dapat menyebut pin/hasil sebelumnya. Cocokkan konfigurasi aktif dan acceptance per komponen; keberadaan source kandidat upgrade tidak berarti versi itu aktif. Tidak ada klaim seluruh skill cocok byte dengan upstream terbaru atau semua integrasi diuji ulang pada tanggal snapshot.

## Skill dan routing saat ini

Indeks penggunaan: [katalog skill](home/.omp/agent/ecosystem/measurements/model-routing-20261121/SKILL-KATALOG.md) dan [aturan pemilihan](home/.omp/agent/ecosystem/SKILL-ROUTING.md). Prompt natural memilih lead sesuai tugas; metadata tidak membuktikan workflow atau memberi izin eksekusi. Skill OMP lokal, shared, source terpin, dan plugin discovery tidak selalu menghasilkan nama yang sama di setiap workspace.

Delapan skill marketing baru: `social`, `content-strategy`, `copywriting`, `product-marketing`, `copy-editing`, `revops`, `emails`, `marketing-loops` (Marketing Skills `2.14.25`, MIT). Bedakan penulisan baru dari penyuntingan copy; scope CRM, email, dan loop adalah panduan/rancangan, bukan izin mengirim, menjadwalkan, atau mengaktifkan otomasi. Tambahan dan pembaruan lain mencakup SEO schema/hreflang, REA, Orca, Impeccable `4.9.1`, Humanizer ID `2.4.5`, humanizer `4.0.0`, Stack Diagram `0.6.0`, dan kontrak E2E `e2e@0.23.1` + `@e2e-dev/web@0.16.0` untuk setup proyek baru yang diotorisasi. [FigCraft `0.18.1`](home/.omp/agent/ecosystem/measurements/figcraft-install-20261117/USAGE.md) terdokumentasi sebagai CLI resmi portable; binary tidak disalin dan tidak ada skill komunitas FigCraft yang diaktifkan.

Kelompok entry yang tetap memerlukan permintaan eksplisit:

- Tujuh tambahan dengan flag vendor asli: `setup-matt-pocock-skills`, `i-have-adhd`, `to-spec`, `to-tickets`, `handoff`, `teach`, `wait-what`.
- Tiga incumbent: `grill-me`, `review-animations`, `to-questionnaire`.
- Lima tambahan asli Jakub: `break`, `explain-interface`, `interface-review`, `state-machine`, `variant`. `state-machine` adalah workbench state UI existing, bukan implementasi XState atau diagram state.
- Tambahan diagram: `drawio-skill` mempertahankan flag asli `disable-model-invocation: true`. Permintaan nyata file `.drawio`/diagrams.net atau diagram editable cukup; penyebutan dalam kutipan/log bukan pemanggilan.

Jelaskan tujuan, artefak, stack dan batas dengan bahasa alami; tidak perlu menghafal nama skill. Agent memilih satu lead per tahap dan membaca panduan pendukung seperlunya. Entry eksplisit dapat ditawarkan ketika membantu, tetapi tidak dibypass otomatis. Q&A biasa, aritmetika dan nama skill dalam kutipan tidak perlu memicu workflow. Pemilihan panduan tidak memberi izin instalasi, akses akun privat, upload, biaya, deploy, merge/push, atau tindakan destruktif.

Routing **probabilistik**, bukan router executable atau jaminan klasifikasi. Bukti 7 November: default **6/6**, smol **4/6** fixture; ini historis. Ekspansi 10 November: **8/8** kasus routing sintetis pada model existing. Humanizer ID: **3/3** routing dan **4/4** uji preservasi dengan batas editorial. Pengujian terbatas ini bukan benchmark buta, validasi seluruh kombinasi skill, sertifikasi kebahasaan, atau bukti penghematan token/latency.

Wave diagram 11 November memeriksa native discovery, hide flag dan hash upstream. Prioritas routing ditinjau dari source dan aturan pengguna; **klasifikasi model serta rendering belum diuji**. Tidak ada klaim “semua routing aman” atau sertifikasi seluruh helper.

Default-profile berlaku lintas proyek pada akun OMP ini, bukan semua host atau named profile. Repository dapat override atau menambah alias; jangan mematikan provider repository untuk menyamakan discovery global. Mulai sesi baru; hot reload sesi lama tidak dijamin.

### Riwayat 13 November: skill pelengkap dan CLI-first

| Sumber | Skill tambahan |
|---|---|
| Anthropic | playground, build-mcp-server, build-mcp-app, build-mcpb |
| Google Chrome | modern-web-guidance, chrome-extensions |
| OpenAI Codex Security | check-skills; tidak memasang scanner/Cloud/SDK |
| HKUDS CLI-Anything | cli-anything generator lengkap dan cli-hub-meta-skill |
| Addy Osmani | api-and-interface-design, performance-optimization, context-engineering, ci-cd-and-automation |

**CLI-first hybrid:** agen dapat menemukan dan memakai flag/subcommand di luar schema MCP dalam scope tugas, tanpa whitelist command baru. PoP memprioritaskan CLI vendor; Scopus/Context7 tetap memakai bridge MCP, REA/Semgrep memilih transport sesuai kemampuan dan state. Konektor working tidak dicabut. Izin secrets, biaya, destructive data, produksi dan publikasi tetap berlaku.

Pada host asal, **18/18 smoke routing** dan **8/8 smoke runtime** lulus; PoP Crossref/JSON serta ekspor BibTeX/RIS/JSONL diuji. Ini bukan benchmark superioritas CLI, validasi semua near-miss, atau bukti semua aplikasi komunitas siap. Skill tersedia tidak berarti Blender/GIMP/backend lain ikut terpasang.

Chrome CLI original `1.0.0` dan CLI-Hub `0.4.1` dipin dengan telemetry opt-out pada launcher. **Snapshot tidak menyertakan enam berkas indeks pencarian biner/terkompresi Chrome, venv/wheelhouse Hub, state, atau arsip sumber.** Sebelum memakai launcher pada mesin tujuan, pulihkan distribusi npm/wheel resmi sesuai integrity dan lock pada runtime terpilih, lengkap dengan indeksnya; buat state terisolasi dan sesuaikan path. Jangan menjalankan installer massal atau `npx @latest`. Hash snapshot lulus bukan berarti CLI langsung bisa berjalan.

- [Keputusan lima kandidat dan batas](home/.omp/agent/ecosystem/measurements/candidate-skills-20261113/REPORT.md), [routing dan penggunaan CLI](home/.omp/agent/ecosystem/measurements/candidate-skills-20261113/USAGE.md), [pin/seleksi](home/.omp/agent/ecosystem/measurements/candidate-skills-20261113/selection.json).
- [Cakupan publikasi snapshot](home/.omp/agent/ecosystem/measurements/repository-snapshot-20261113/REPORT.md). Raw output model, sessions, cache, credential dan binary tidak dipublikasikan; konfigurasi/plugin di luar wave ini tidak disinkronkan ulang.


### Tambahan 11 November: diagram dan planning arsitektur

| Kebutuhan | Lead / kemampuan | Contoh permintaan |
|---|---|---|
| Stack/cloud dengan logo teknologi | `stack-diagram`, sumber HTML mandiri; panduan PNG/TSX | “Buat diagram stack aplikasi dari daftar berikut, tandai asumsi, jangan upload.” |
| Diagram berbasis teks yang bisa version control | `mermaid-diagrams`: flow, sequence, state, ERD, class dan C4 | “Buat C4 Context dan Container dalam Mermaid dari deskripsi sistem ini.” |
| File yang bisa saya ubah sendiri | `drawio-skill`, file `.drawio` editable; explicit-only | “Buat `.drawio` editable agar saya bisa mengeditnya di app.diagrams.net.” |
| Planning, bukan sekadar gambar | Requirements/NFR, owner native planning, `codebase-design`, `domain-modeling`, lalu `writing-plans` existing | “Bandingkan alternatif berdasarkan constraint, tulis keputusan dan asumsi sebelum diagram.” |

Format eksplisit menang; setelah itu pilih logo stack, visual editorial (`diagram-design` existing), atau teks Mermaid sesuai tujuan. Satu lead per tahap, bukan semua designer dijalankan. Generic “arsitektur” bukan izin menebak topology atau mengakses infra live. Diagram membedakan fakta source dan asumsi, bukan pembuktian sistem berjalan.

**Tidak memasang aplikasi draw.io desktop.** Buka file `.drawio` di https://app.diagrams.net/, pilih penyimpanan perangkat bila sesuai kebutuhan privasi, edit dan simpan kembali. Penggunaan web aktual belum diuji; tidak ada login/unggah file oleh pemasangan ini. Native export helper membutuhkan aplikasi desktop; dependency itu tidak tersedia hanya karena skill dipasang.

Skill vendor asli dipin dan lisensi dipertahankan; `stack-diagram` v0.4.0, Mermaid pada commit `3027f20f`, Draw.io pada `65504951`. Snapshot berisi file teks termasuk SVG dan lisensi font, **bukan dua font WOFF2, katalog Draw.io `data/shape-index.json.gz`, atau arsip distribusi**. Pulihkan aset terpilih dari commit terpin dan cocokkan hash sebelum render/lookup shape pada mesin tujuan. Rendering stack-diagram membutuhkan Python/Playwright/Chromium terpisah; helper PNG bawaannya memakai `--no-sandbox` dan belum dijalankan. Galeri/publish, live importer, registrasi MCP dan dependency install tetap membutuhkan scope/izin tersendiri. Panduan C4 tidak menjamin semua viewer mendukung sintaksnya.

- [Pin dan hash instalasi](home/.omp/agent/ecosystem/measurements/diagram-skills-20261111/installation.json), [penggunaan dan batas](home/.omp/agent/ecosystem/measurements/diagram-skills-20261111/USAGE.md), [bukti discovery](home/.omp/agent/ecosystem/measurements/diagram-skills-20261111/routing-verification.json).
- [Cakupan snapshot 11 November](home/.omp/agent/ecosystem/measurements/repository-snapshot-20261111/REPORT.md). Konfigurasi provider/MCP/ekstensi di luar wave ini tidak disinkronkan ulang.

### Tambahan 10 November: penggunaan dan batas

| Kebutuhan | Skill terpilih |
|---|---|
| Video/motion graphics HTML ke MP4, termasuk aset video website | `hyperframes`, `hyperframes-cli`, `hyperframes-registry`; CLI resmi `0.9.28` |
| Diagram editorial, ilustrasi fisik isometrik, technical exploded view | `diagram-design`, `anatomy`, `teardown` |
| Review interface dan disiplin terfokus | `better-interface`, `better-accessibility`, `better-colors`, `better-layout`, `better-typography`, `better-ui`, `better-writing` |
| Retrofit tampilan AI-looking dan reflow mobile | `unslop`, `antislop-layoutmobile` |
| Reuse/adopt/extend/build, appraisal kausal/bias, persyaratan hibah | `search-first`, `scientific-critical-thinking`, `research-grants` |
| Workbench/review eksplisit | Lima tambahan Jakub pada daftar di atas |
| Penyuntingan prosa Indonesia | `humanizer-id` original `1.5.1`, dengan batas preservasi makna |

Motion UI interaktif tetap memakai CSS/native/Emil/GSAP/Motion sesuai stack; Hyperframes untuk video, bukan pengganti semua animasi website. Satu lead per tahap, panduan lain mendukung kebutuhan berbeda, bukan semua pipeline dijalankan berurutan. `humanizer` existing membantu bahasa lain/pola lintas bahasa; `humanizer-id` berfokus Indonesia. Jangan memaksakan dua pass humanizer. `academic-paper` tetap memimpin manuskrip; angka, sitasi, istilah, modalitas, kutipan, dan aturan venue tidak dikorbankan demi gaya.

CLI Hyperframes tersedia pada host asal melalui `ecosystem/runtime/hyperframes/0.9.28/hyperframes.cmd`, **tidak pada PATH global**. Snapshot menyimpan launcher, package manifest dan lock, bukan `node_modules`, browser, FFmpeg, config/state atau cache. Satu smoke terdahulu berhasil merender video H.264 2 detik, 640×360, 24 fps/48 frame; bukan uji render ulang saat snapshot. Compiler mengambil Google Fonts publik: telemetry off bukan offline/no-egress. Helper Anatomy/Jakub/Unslop belum terbukti usable di Windows hanya karena panduannya terpasang.

- [Seleksi 13 kandidat, keputusan dan bukti ekspansi](home/.omp/agent/ecosystem/measurements/skills-expansion-20261110/REPORT.md), [manifest](home/.omp/agent/ecosystem/measurements/skills-expansion-20261110/selection.json), [penggunaan/batas runtime](home/.omp/agent/ecosystem/measurements/skills-expansion-20261110/USAGE.md).
- [Humanizer ID: penilaian, uji dan batas](home/.omp/agent/ecosystem/measurements/humanizer-id-20261110/REPORT.md), [batas editorial wajib](home/.omp/agent/ecosystem/measurements/humanizer-id-20261110/EDITORIAL-BOUNDARIES.md), [seleksi](home/.omp/agent/ecosystem/measurements/humanizer-id-20261110/selection.json).
- [Cakupan snapshot baru dan pemulihan Hyperframes](home/.omp/agent/ecosystem/measurements/repository-snapshot-20261110/REPORT.md).

Claude-Mem, gstack, reverse-skill dan Elaya/Figma tidak dipasang; tujuh Addy existing dipertahankan tanpa duplikasi. Tidak diperlukan Figma untuk memakai tambahan non-Figma. Skill eksplisit tetap eksplisit; tidak ada memory capture, MCP/provider, hook atau layanan baru dari wave ini.

### Adopsi kandidat dan bukti yang dipertahankan

Penilaian 21 kandidat mencakup alternatif UI, workflow engineering, graph, akses sumber publik dan ML. Tidak semuanya dipasang atau diaktifkan: source Karpathy dan doc-coauthoring tertahan oleh provenance/grant lisensi exact; Style UI tetap katalog referensi, bukan skill executable. Impeccable tetap fallback UI, bukan satu-satunya pilihan. Taste/frontend-design/Hallmark dipilih sesuai brief, bukan diaktifkan bersama secara otomatis.

Pada wave 7 November, runtime yang diuji meliputi Graphify `0.9.103`, Agent Reach `1.6.1`, last30days `3.31.0`, Spec Kit `1.3.2` dan dependency Hallmark. Hasil ini historis: cutover berikutnya memakai Graphify `0.9.112`, last30days `4.3.2`, dan Spec Kit `1.4.1`. Uji Hallmark saat itu gagal memulai browser profile. Tidak ada klaim workflow penuh, semua kanal, atau pipeline model siap.

Rincian 21 kandidat, keputusan subskill, pin, lisensi, lock dan hasil scoped tidak diduplikasi di sini:

- [Optimasi global: ringkasan dan batas](home/.omp/agent/ecosystem/measurements/global-optimization-20261107/REPORT.md), termasuk [kemampuan native](home/.omp/agent/ecosystem/measurements/global-optimization-20261107/NativeVersionAudit.md) dan [freshness integrasi](home/.omp/agent/ecosystem/measurements/global-optimization-20261107/IntegrationFreshness.md).
- [Adopsi 21 kandidat](home/.omp/agent/ecosystem/measurements/candidate-adoption-20261107/REPORT.md), [manifest pemilihan 55 tambahan](home/.omp/agent/ecosystem/measurements/candidate-adoption-20261107/selection.json), serta manifest instalasi per slice dalam folder itu. Mode manual/otomatis pada laporan adopsi adalah baseline sebelum perubahan berikutnya.
- [Routing aktif dan batas model](home/.omp/agent/ecosystem/measurements/automatic-routing-20261107/REPORT.md), [manifest routing](home/.omp/agent/ecosystem/measurements/automatic-routing-20261107/selection.json) dan [acceptance gabungan](home/.omp/agent/ecosystem/measurements/automatic-routing-20261107/final-acceptance.json).

Sebagian referensi di laporan historis menunjuk fixture, backup atau raw output yang sengaja tidak disalin. Ringkasan/manifest bukan pengganti payload atau bukti yang dikecualikan.

## Terpasang bukan berarti usable

Status ini berasal dari pemeriksaan scoped 7 November, bukan acceptance restore baru:

| Kemampuan | Yang diamati dan batasnya |
|---|---|
| Native LSP | Lazy/shared tersedia; sesi Onboarding melaporkan tidak ada language server. Root proyek dan executable yang sesuai tetap diperlukan; bukan bukti semua proyek gagal. |
| Native DAP/debug | Enabled, tetapi launch target dan breakpoint nyata belum diuji. |
| Native AST | Proposal, resolve dan hasil satu replacement pada fixture sintetis terverifikasi; bukan codemod proyek nyata. |
| Browser/read/search | URL publik, search dan title/DOM example.com diuji terbatas; tidak mengaktifkan Relay/CDP akun pengguna. |
| Eval | JS persisten dan Python `3.14.4` dengan assert diuji pada runtime OMP; bukan klaim semua package Python tersedia. |
| Semantic find | Gagal karena judge `402` insufficient credits; fallback literal, tanpa membeli kredit atau mengganti provider. |
| MCP | Context7 resolve/query, Semgrep languages setelah rollback, REA session dan PoP Crossref/export diuji terbatas; bukan semua tool/backend REA usable. |
| Memory | Native memory tetap `off`; Supermemory privacy/allowlist tidak diubah. Live recall/retention/latency tidak diuji. |

Tidak ada akun, provider, MCP, hook, advisor, layanan berbayar atau instalasi otomatis massal baru yang diaktifkan oleh adopsi/routing tersebut. Snapshot tidak mengaktifkan apa pun dengan sekadar disimpan, tetapi **memulihkan konfigurasi aktif lalu memulai OMP dapat memuat extension/plugin, menjalankan source provider atau memulai MCP**. Tinjau kode dan nonaktifkan komponen yang belum siap sebelum startup.

## Verifikasi snapshot sebelum restore

Tinjau skrip terlebih dahulu. Dari root clone, jalankan dengan Node yang sudah terpasang:

```powershell
node scripts/verify-snapshot.mjs --self-test
node scripts/verify-snapshot.mjs
```

Tidak perlu dependency tambahan. Skrip menggunakan stdlib Node, tidak mengakses jaringan, menjalankan subprocess/Git, menulis berkas, memasang komponen, atau mengubah home pengguna. Lokasi repositori ditentukan dari lokasi skrip, bukan dari home pengguna.

Verifier menolak path absolut/traversal, nama tidak portable untuk Windows, duplikat/case collision, metadata byte/hash sumber atau backup tidak valid, symlink/junction, tipe nonreguler, pola path secret/state/binary, NUL, UTF-8 invalid dan header biner umum. Pengecualian cache hanya untuk direktori source tepat `home/.omp/plugins/cache`, bukan cache lain/turunannya. Ia membandingkan ukuran dan SHA-256 dengan manifest untuk **semua berkas di `home/`**, termasuk yang belum tracked atau diabaikan Git: berkas hilang, rusak, atau tidak terdaftar membuat exit code nonzero. Jangan menyimpan berkas lokal tambahan di dalam payload `home/`.

`--self-test` memakai fixture in-memory untuk byte/hash berubah, missing/unlisted, duplikat, traversal, path terlarang, metadata sumber, UTF-8/NUL dan header biner; tidak membuat fixture di disk. Perintah normal memvalidasi format kedua hash tetapi hanya membandingkan hash backup (`sha256`), bukan `sourceSha256` terhadap instalasi asal yang tidak tersedia pada clone. Hash sumber berbeda sah untuk metadata yang dire­daksi. Manifest harus berasal dari sumber tepercaya: hash yang cocok bukan autentikasi penerbit, scan secret, validasi isi semua kode, atau bukti restore berhasil.

Host asal memakai Node `24.22.3`; kompatibilitas Node lama dan restore lintas OS belum diverifikasi. Payload menyertakan launcher Windows, ketergantungan DPAPI, dan path absolut Windows. Dukungan long paths tetap diperlukan. `.gitattributes` mempertahankan byte `home/**`. Jalankan verifier pada checkout yang tidak sedang dimutasi; verifier bukan sandbox.

## Tidak disertakan

Credential/API key/PAT/OAuth, blob DPAPI, database OMP, sesi/riwayat percakapan, raw transcript/inference/events, log, cookies/profil browser, source/data proyek rahasia, cache/state runtime dan backup lama tidak disertakan. Binary/executable vendor, font, gambar, PDF, arsip, `node_modules`, virtualenv dan file nonteks juga dikecualikan. Sumber distribusi plugin dalam path cache dapat dipertahankan sebagai source, bukan state sesi/runtime.

JWT pada metadata URL unduhan Semgrep diganti dengan `[REDACTED_SIGNED_DOWNLOAD_TOKEN]`; hash sumber dipertahankan untuk provenance, bukan untuk mengunduh ulang. Detail redaksi/pengecualian mengikuti manifest. Catatan scan pola credential historis/scoped tidak menjamin ketiadaan secret. `.gitignore` mencegah sebagian penambahan tak sengaja, tetapi tidak menyaring ulang berkas yang sudah tracked.

Login OMP/GitHub dan credential integrasi yang dibutuhkan harus disiapkan ulang melalui alur yang disetujui. Snapshot tidak dimaksudkan untuk memulihkan credential, data proyek, atau akun cloud.

## Pemulihan manual yang aman

1. Clone repositori. Pada Windows, gunakan `git -c core.longpaths=true clone https://github.com/SaKuRa-u/omp-setup.git` untuk path sumber yang panjang. Tinjau README, manifest, dan verifier; jalankan pemeriksaan luring di atas. Backup konfigurasi mesin tujuan terlebih dahulu.
2. Pasang hanya OMP, Node/Bun, Git dan tool yang dipilih dari distribusi resmi. Untuk pin dan prasyarat Windows, baca [catatan cutover aktif](home/.omp/agent/ecosystem/measurements/environment-apply-20261117/USAGE.md). Semgrep aktif memakai `ecosystem/runtime/semgrep/1.185.0/`; binary dan venv tidak tersedia di backup. Jangan menjalankan installer massal dari skill atau laporan historis.
3. Hentikan OMP. Pilih dan salin berkas `home/` ke direktori home pengguna tujuan secara manual; jangan mengganti seluruh profil atau menimpa konfigurasi host lain. Pertahankan struktur `.omp`/`.agents`, sumber yang dirujuk, notices dan lisensi. Tidak ada restore otomatis.
4. Path absolut masih menunjuk `C:/Users/Indrimeilla-PC`. Sesuaikan salinan konfigurasi aktif, path discovery skill/shared, registrasi plugin, launcher, policy, serta executable mesin tujuan. Jangan melakukan search/replace massal pada manifest, measurements, hash, atau sumber vendor. Verifier berlaku pada clone asli sebelum migrasi, bukan salinan aktif yang sudah Anda ubah.
5. Tinjau `config.yml`, `models.yml`, `mcp.json`, source provider, ekstensi dan plugin **sebelum memulai OMP**. Pengguna mempertahankan `tools.approvalMode: yolo` dan `dev.autoqaConsent: granted`; pilih ulang kebijakan persetujuan mesin tujuan dengan sadar. Memory tetap `off`. Custom model aicenter memakai bridge `ecosystem/runtime/credentials.ps1` dan credential DPAPI lokal yang harus disiapkan ulang; periksa path PowerShell/bridge tanpa menjalankan perintah credential hanya untuk meninjau snapshot. Ini provider existing, bukan akun atau credential yang dibundel. Nonaktifkan MCP/provider/ekstensi yang belum ditinjau atau belum siap. Startup dapat menjalankan kode dengan hak akun pengguna; konfigurasi bukan izin baru untuk audit berbayar, cloud, deploy atau capture memory.
6. Pulihkan dependency selektif dari rilis dan lockfile terpin setelah meninjau lifecycle scripts. Pakai `rea-agents@6.9.0`; jangan campur schema/bundle Evidence dengan REA 6.5. Peroleh PoP CLI vendor `8.19.5300` lalu cocokkan signature/hash. Pulihkan indeks dan aset runtime Modern Web Guidance `1.0.1`, distribusi lengkap ARS `3.24.3` jika diperlukan, serta dependensi HyperFrames `0.9.61` (browser nonprofil-user dan FFmpeg/ffprobe). Launcher dan lockfile bukan instalasi siap jalan.
7. Buat ulang state/cache/temp yang benar-benar dirujuk launcher. Semgrep memerlukan konfigurasi `state/settings.yml`, log/cache dan `state/tmp`; state asli sengaja tidak dibackup. Periksa telemetry/metrics sebelum menjalankan tool. Membuat direktori saja tidak menggantikan konfigurasi state yang diperlukan.
8. Buat credential baru melalui alur DPAPI yang disetujui. Jangan menaruh secret pada berkas tracked, argumen CLI, environment global, atau chat. DPAPI dari mesin lama tidak portable. Token yang pernah terekspos harus dicabut, bukan dipakai ulang.
9. Pasang RTK resmi sesuai pin bila diperlukan; executable tidak disertakan. Salin konfigurasi `home/AppData/Roaming/rtk/config.toml` secara selektif ke `%APPDATA%/rtk/config.toml`, sesuaikan path database/PATH, dan periksa telemetry. Ekstensi Orca memerlukan aplikasi/integrasi Orca yang sesuai; aplikasinya tidak disertakan. Pulihkan aset/font/template nonteks yang benar-benar dirujuk hanya dari sumber resmi dan setelah memeriksa hak penggunaannya; omission dapat membuat render atau contoh gagal meski hash snapshot cocok.
10. Mulai sesi OMP baru hanya setelah review komponen aktif, lalu periksa discovery skills/plugin dan operasi konkret yang dibutuhkan. Aktifkan hanya MCP/runtime yang sudah disiapkan; jangan login, mengambil cookie, mengunggah data atau menambahkan provider berbayar sebagai fallback otomatis. Smoke live/cloud memerlukan persetujuan target/biaya. Restore mesin bersih dan end-to-end workflow belum dibuktikan; README ini bukan klaim MCP live semuanya lulus.

## Lisensi dan privasi

Skills/plugin/sumber pihak ketiga tetap mengikuti lisensi upstream masing-masing; tidak ada lisensi tunggal yang menggantikannya. Pertahankan format source vendor, attribution, notices dan lisensi yang tersedia. `greensock/gsap-skills` dan `mattpocock/skills` berlisensi MIT. Pada pin `motiondivision/ai-kit` yang ditinjau, deklarasi vendor menyebut MIT tetapi root `LICENSE` tidak ditemukan; metadata provenance dipertahankan, bukan diganti teks lisensi buatan. Source-only dengan grant belum terselesaikan bukan izin redistribusi atau penggunaan tanpa batas.

Lisensi teks skill tidak otomatis melisensikan runtime GSAP/Motion, aset, font, plugin, atau dependency lain yang kelak dipakai. Periksa ketentuan vendor masing-masing sebelum distribusi/penggunaan. ARS berlisensi CC BY-NC 4.0 dan dibatasi untuk penggunaan akademik/personal nonkomersial sesuai aturan pengguna. Pertahankan attribution/notices.

`yolo`, persona read-only, worktree, runtime/virtualenv terisolasi dan tool grant bukan sandbox OS atau jaminan no-egress. Agent, extension, provider dan MCP dapat berjalan sebagai pengguna Windows yang sama. `secrets.enabled=false` bukan bukti credential bocor, tetapi juga bukan jaminan redaksi outgoing global aktif. Snapshot/verifier tidak mengaudit semua kode vendor, dependency, Cloudflare atau keamanan host.

Native memory tetap `off`. Supermemory memakai wrapper terpisah, DPAPI, scope proyek, dan kebijakan capture selektif; forget/delete global tetap nonaktif. Snapshot tidak membawa dokumen cloud, hasil recall, cache, atau credential. Jina dan layanan model/riset dapat mengirim data ke pihak ketiga; routing otomatis bukan persetujuan pengiriman data.

Skill yang terpasang adalah panduan, bukan bukti kualitas kode, kemampuan model, runtime library yang sudah tersedia, atau hasil pengujian aplikasi. Path lokal, aturan pribadi, nama proyek dalam policy, dan metadata provenance termasuk konfigurasi yang dibackup. Jangan menambahkan sesi, database, credential, atau hasil MCP ke repositori ini. Penyaringan pola mengurangi risiko, bukan jaminan bebas data sensitif.
