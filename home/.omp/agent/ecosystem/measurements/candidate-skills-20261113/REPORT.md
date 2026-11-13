# Evaluasi dan pemasangan kandidat global OMP — 13 November 2026

## Hasil dan scope

**Terpasang: 13 skill pelengkap original, global OMP default-profile.** User menyetujui CLI-first hybrid melalui checkpoint sesi ini. Tidak mengubah konfigurasi Claude/Codex/host lain, model, approval mode, memory, atau registrasi MCP existing. Tidak ada plugin/hook/vendor orchestration yang diaktifkan.

Global berarti ditemukan lintas proyek oleh OMP, bukan menambahkan executable ke PATH Windows global. Skill baru dapat dipilih dari bahasa alami tanpa menghafal namanya, sesuai intent dan batas pada [USAGE.md](USAGE.md). Mulai sesi baru; tidak mengklaim hot reload sesi berjalan.

| Kandidat resmi | Keputusan | Yang dipasang / nilai pelengkap | Pin |
|---|---|---|---|
| [anthropics/claude-plugins-official](https://github.com/anthropics/claude-plugins-official) | Layak selektif | playground; build-mcp-server, build-mcp-app, build-mcpb. Explorer satu file, action discovery/deployment, widget MCP dan bundling lokal melengkapi desain/MCP builder existing. | f75f5b25ae94f4332be4ff5f18435741d2589bdb |
| [GoogleChrome/modern-web-guidance](https://github.com/GoogleChrome/modern-web-guidance) | Layak | modern-web-guidance dan chrome-extensions. Corpus platform/compatibility dan extension MV3 melengkapi arah desain/React/browser QA existing. | 4dd968349e54ca45a05dd5c818fb035c9054b022; npm 1.0.0 |
| [openai/codex-security](https://github.com/openai/codex-security) | Layak hanya subset portable | check-skills: review keamanan bundle/instruksi pra-install. Bukan pemasangan scanner/Cloud/SDK. | f26b669b56a4423abd773c81f6c6c9c2ebadc42a |
| [HKUDS/CLI-Anything](https://github.com/HKUDS/CLI-Anything) | Layak sebagai generator dan discovery toolkit | cli-anything dan cli-hub-meta-skill; CLI-Hub 0.4.1 terisolasi. Membuat/refine harness dan menemukan CLI, bukan otomatis menguasai semua aplikasi. | 34f519533bc175d2fe287ab8316b0dd99bb9cc43 |
| [addyosmani/agent-skills](https://github.com/addyosmani/agent-skills) | Layak selektif | api-and-interface-design, performance-optimization, context-engineering, ci-cd-and-automation. Kontrak/idempotency, eksperimen performa, kurasi context/handoff dan wiring CI. Tujuh Addy incumbent tidak diganti. | 301b02b12bff98e4688e6984af6556802322bbde |

Empat repository memakai Apache-2.0, Addy MIT. CLI-Hub wheel mendeklarasikan MIT. Lisensi original dipertahankan bersama file yang dipasang; tidak menghapus notices/source identity. Popularitas bukan kriteria penerimaan atau bukti keamanan.

## Bukti instalasi terverifikasi

- Global/neutral root: **191 skill**, naik dari baseline **178**, **0 warning**, **16 hidden** explicit-only.
- Proyek Onboarding: **196 skill**, termasuk lima alias project GitHub yang berbeda dari snapshot global; **5 warning existing-snapshot collisions**, bukan collision kandidat baru. Jangan mematikan sumber GitHub global untuk menyembunyikannya. Root ini memiliki 17 hidden termasuk alias project review-animations.
- **13/13 skill baru** ditemukan dengan provenance yang tepat, URI `skill://` berhasil pada dua root, dan semuanya hadir dalam katalog model pada proses OMP baru.
- **354 file vendor terpasang** cocok SHA-256 dengan sumber salinan; semua backup yang dicatat cocok. Semua nama/path/hidden flag baseline global tetap terjaga. Tidak ada vendor SKILL.md yang dipatch atau flag manual baru yang dipaksakan.
- Konfigurasi `mcp.json` cocok byte/hash baseline; memory tetap off, approval tetap yolo, model roles tidak diganti.
- Chrome npm tarball lolos integrity SHA-512 registry; semua file skill/guides yang sama dengan Git snapshot cocok byte-for-byte. Artifact tarball juga memuat executable dan indeks pencarian lokal yang tidak ada dalam distribusi Markdown Git.
- Runtime CLI-Hub ada dalam venv khusus, bukan Python global. Tujuh wheel dependency dikunci versi dan SHA-256, instalasi offline dari wheelhouse setelah download, tanpa source build/lifecycle scripts.

Evidence: [installation.json](installation.json), [native-acceptance.json](native-acceptance.json), [source-comparison.json](source-comparison.json), [hub-runtime-install.json](hub-runtime-install.json).

## Verifikasi perilaku CLI

| Skenario aktual | Hasil |
|---|---|
| Chrome launcher --help, search "light dismiss dialog", retrieve ID hasil pencarian | PASS |
| Chrome unknown command | Exit 1 dan error teramati sesuai kontrak |
| CLI-Hub launcher --help, --version, search blender | PASS; versi 0.4.1 dan hasil Blender nyata |
| CLI-Hub unknown command | Exit 2 dan usage error teramati |
| PoP vendor CLI Crossref: query Jinek 2012 | PASS; satu record dengan DOI 10.1126/science.1225829 |
| PoP ekspor BibTeX, RIS, JSONL dari query yang sama dengan --offline | PASS; DOI yang sama hadir di ketiga format |
| REA CLI --help | PASS; CLI 6.5.0, command/schema/output discovery tersedia |

Telemetry: launcher Chrome mengatur DISABLE_TELEMETRY=1 dan ENABLE_FILE_LOGGING=false; launcher Hub mengatur CLI_HUB_NO_ANALYTICS=1 serta HOME/USERPROFILE state lokal. Tidak ada packet capture, sehingga tidak mengklaim seluruh proses no-egress. Search/retrieve Chrome dinilai local-corpus dari source; pencarian Hub mengakses katalog publik. Hub tidak membuat analytics ID pada smoke ini; marker first-run lokal masih bisa dibuat walau telemetry off.

Evidence: [runtime-acceptance.json](runtime-acceptance.json), [pop-cli-smoke.json](pop-cli-smoke.json), [pop-help.json](pop-help.json), [rea-help.json](rea-help.json).

### Kegagalan pertama yang tidak disembunyikan

1. Ekstraksi Addy awal berhenti pada symlink `.opencode/skills -> ../skills/`. Ini guard ekstraksi, bukan paket rusak. Empat snapshot lain sudah selesai dan tidak diunduh ulang. Snapshot Addy dipulihkan pada commit yang sama, symlink tidak diekstrak; original archive serta link record dipertahankan. Hanya direktori skill regular yang dipasang.
2. Smoke harness Windows awal memakai path `C:/Windows/System32/cmd.exe`; command processor mengembalikan `The syntax of the command is incorrect`, bahkan untuk echo. Diagnosis memisahkan direct Node (berhasil) dan cmd boundary. Native backslash `C:\Windows\System32\cmd.exe` mengatasi masalah pada harness; launcher/vendor tidak dipatch. Bukti awal dan diagnosis dipertahankan, lalu smoke launcher lulus.
3. Assertion discovery awal mengasumsikan Onboarding identik dengan neutral root dan tanpa warning. Output membuktikan lima alias GitHub proyek yang telah muncul dalam inventory konteks awal. Assertion diperbaiki untuk menjaga alias/provenance project dan menolak warning dari kandidat baru, bukan menyembunyikan collision tersebut. Tidak mengubah file skill project atau ignoredSkills untuk membuat hasil terlihat bersih.

## Routing otomatis

**PASS: 18/18 smoke routing native.** Seluruh 13 prompt positif membaca guide tambahan yang diharapkan; kelima guard lulus. Kutipan/Q&A tidak mengaktifkan kandidat, review kualitas tetap memilih ponytail-review, PoP memilih CLI vendor/JSONL dan Scopus DPAPI, serta MCP yang diperlukan tidak dicabut. Tidak ada pembacaan URL jaringan atau guide explicit-only pada pengujian ini. Hasil aktual: [routing-acceptance.json](routing-acceptance.json); rangkuman akhir: [final-acceptance.json](final-acceptance.json).

Kontrak positif dan near-miss tersedia untuk seluruh 13 tambahan pada [routing-cases.json](routing-cases.json). Smoke memakai model default yang sama dan tools read-only, tanpa provider baru, command aplikasi, file writes, atau vendor evaluator Claude. Dijalankan 13 pembacaan guide otomatis pada prompt positif dan 5 guard untuk kutipan, Q&A, owner review existing, PoP CLI-first, serta preservasi MCP yang diperlukan. Near-miss individual didokumentasikan/source-reviewed; tidak semuanya diuji sebagai inferensi independen. Ini smoke sintetis terhingga, bukan jaminan routing semantik deterministik atau bukti seluruh workflow operasional.

Pemilihan satu owner per tahap dijaga: intake/approval settled tidak diulang; mcp-builder tetap untuk OMP generik; lead desain existing tetap art direction; browser/E2E existing tetap verifikasi rendered; Ponytail tetap review kualitas; security-audit/native security reviewer tetap audit aplikasi; guide tambahan hanya untuk artefak/tahap spesifik. Seluruh explicit-only incumbent dipertahankan.

## Keputusan CLI versus MCP

**Diterapkan: CLI-first hybrid, bukan pembongkaran seluruh MCP.** Ini menjawab kebutuhan agent yang dinamis: help, subcommand, schema, flag dan pipeline tidak dibatasi daftar MCP. Tidak ada whitelist command baru atau persetujuan tiap command biasa. Batas destruktif, secret, biaya, produksi dan publikasi tetap berlaku pada titik risiko.

Alasan bukan migrasi total:

- PoP punya CLI vendor asli yang lebih luas daripada schema wrapper, termasuk --raw, query fields, format dan syntax helpers. Jalur langsung search/export terbukti bekerja; routing PoP diperbarui dari MCP-only menjadi CLI-first. MCP tidak dihapus agar caller lama dan Scopus tetap berfungsi.
- Scopus existing menggunakan API Elsevier resmi lewat DPAPI, bukan PoP CLI. Mematikan server PoP MCP juga akan menghilangkan jalur `scopus_search` yang approved; CLI-Anything tidak menyediakan pengganti ini.
- Context7 memakai bridge DPAPI existing. Tidak ada pengganti CLI resmi dengan kontrak sama yang terverifikasi pada tugas ini.
- REA CLI luas, tetapi alur sesi provider/Frida/GDB/Evidence tidak dinyatakan ekuivalen hanya dari --help. Pilih transport per kebutuhan state/command, bukan memutus konektor.
- Semgrep sudah punya CLI terpin. Pemakaian CLI yang lebih luas tetap membawa isolasi/telemetry dan scope yang disetujui; bukan mengaktifkan cloud/login/auto scan.
- CLI-Anything sendiri mendokumentasikan MCP sebagai backend ketika tidak ada CLI atau MCP lebih fungsional (`cli-anything-plugin/guides/mcp-backend.md:3-9,45-55`). Klaim universal "CLI selalu lebih baik" tidak didukung oleh pemasangan atau satu smoke; tidak ada benchmark setara latency/token/keberhasilan pada seluruh aplikasi.

Instruksi operasional dan contoh PoP array-argv tanpa shell ada di USAGE. Native vendor CLI diprioritaskan sebelum harness community; UI/GUI native tetap fallback bila API/CLI tidak mencakup aksi yang diminta.

## Komponen yang tidak dipasang dan alasannya

### Anthropic marketplace

Snapshot memuat 57 entrypoint SKILL.md (termasuk enam external messaging entries). Ini marketplace plugin lintas host, bukan satu paket skill portable.

- **Skill-creator/frontend-design:** owner existing dipertahankan; skill-creator original already-installed mencakup eval/iteration. Tidak mengimpor runner Claude, viewer HTML, description optimizer, atau membuat alias duplikat. Tidak ada manfaat baru yang terbukti cukup untuk mengganti incumbent pada tugas ini.
- **Receipts/session-report/project-artifact:** transcript paths, telemetry formats dan hosted artifacts mengikat Claude; membaca aktivitas/sesi bukan kebutuhan yang diberikan. Tidak mengimpor transcript mining atau membuat adapter OMP tiruan.
- **Claude setup/md management/plugin-dev/hookify:** menulis konfigurasi/hook/adapter host lain. Tidak dipasang hanya karena marketplace official.
- **Claude-security:** membutuhkan workflow/tool host/service Claude; tidak menggantikan audit existing dengan integrasi yang tidak tersedia.
- **Champion kit/manufacturing/math/CWC makers:** domain-specific workflows tidak dipilih untuk default global ini tanpa target domain/hardware dan dependency yang relevan. Tidak diberi label berbahaya hanya karena khusus domain.
- **Example plugins:** contoh authoring, bukan capability produksi.
- **External messaging/SaaS/database/observability connectors:** tidak dipasang massal; kebutuhan akun, credential, aplikasi dan layanan harus dinilai per target. Tidak ada klaim audit semua plugin eksternal atau keamanan seluruh marketplace.

Skill MCP yang dipilih tetap memuat konteks Claude original. Fetch docs/deploy/tunnel/directory submission bukan efek instalasi; operasi tersebut memerlukan scope dan izin. Dukungan MCP Apps/MCPB pada OMP tidak diasumsikan hanya karena skill tersedia.

### OpenAI Codex Security

Ada **20 skill plugin nyata**; eval fixtures tidak dianggap skill produk. `check-skills` secara eksplisit tidak membutuhkan MCP/saved scan dan dapat menyelesaikan review read-only portable.

- **threat-model/assess-patch-risk:** method bermanfaat, tetapi full workflow mensyaratkan artifact-storage tool/scan contracts atau helper validator plugin. `references/artifact-storage.md:7,13-18,39` melarang fallback authored artifacts yang mengaku canonical bila tool tidak tersedia. Tidak dipasang sebagai workflow semu/parsial; owner existing tetap mampu melakukan threat modeling/review biasa.
- **security-scan/security-diff-scan/deep-security-scan/cloud-findings/publish-findings/track-findings:** membutuhkan scan/orchestration/workbench/cloud tools, auth/entitlement, dan kemungkinan usage/biaya atau publication. Tidak ada izin pemasangan/aktivasi service baru.
- **attack-path-analysis/finding-discovery/validation/fix-finding/verify-fix/triage-finding/vulnerability-writeup/propose-security-hardening/define-security-policy/resolve-dependency-alert/threat-model-visualize:** terikat kontrak scan/artifact/phase/sibling helper, atau workflow tambahan belum memberikan jalur OMP lengkap yang terverifikasi. Bukan ditolak semata overlap; tidak meniru tool/plugin contract yang hilang.

SDK mendukung Windows pada versi Node/Python tertentu, tetapi dukungan OS tidak sama dengan akun, entitlement, plugin tools atau scan runtime siap. Tidak memasang CLI/SDK, autentikasi, scanner atau menjalankan audit Codex.

### CLI-Anything

- Dipasang **generator lengkap** dengan HARNESS/commands/guides/scripts/templates/protocol original sesuai layout installer upstream, bukan SKILL.md tanpa references.
- Dipasang discovery meta-skill dan runtime Hub, bukan semua skill per-app atau matrix.
- Snapshot registry tidak mencantumkan PoP/Context7/REA/Semgrep sebagai pengganti siap pakai. Tidak membangun wrapper PoP baru karena vendor CLI sudah ada.
- CLI-Hub `installer.py:70-84,122-126` dapat menjalankan `install_cmd` registry melalui shell. Registry mutable bukan otoritas izin; review sumber/pin/effects per tool. Telemetry default vendor dinonaktifkan launcher, bukan memodifikasi kode vendor.
- Belum memasang backend Blender/GIMP/etc., belum menghasilkan harness aplikasi baru, belum membuktikan semua GUI action dapat dicapai. Ini batas capability, bukan kegagalan instalasi generator.

### Addy: 25 skill dinilai

- **4 tambahan:** api-and-interface-design, performance-optimization, context-engineering, ci-cd-and-automation.
- **7 incumbent tetap:** constraint-driven-development, deprecation-and-migration, documentation-and-adrs, doubt-driven-development, observability-and-instrumentation, shipping-and-launch, source-driven-development. Tidak bulk-upgrade sumber incumbent di luar scope.
- **14 tidak ditambah:** using-agent-skills (meta-owner tidak diperlukan), test-driven-development (collision dengan owner existing), spec-driven-development/planning-and-task-breakdown/interview-me/idea-refine/incremental-implementation (lifecycle/intake tambahan, risiko mengulang keputusan), debugging-and-error-recovery/code-review-and-quality/code-simplification (tidak ada tambahan yang mengharuskan owner kedua), security-and-hardening/frontend-ui-engineering (broad workflow, bukan tambahan domain terfokus yang hilang), git-workflow-and-versioning (tidak menjadikan git mutations otomatis), browser-testing-with-devtools (mengasumsikan Chrome DevTools MCP yang tidak dipasang).

Pemilik integrasi memilih context-engineering dan ci-cd-and-automation setelah membaca body-nya sendiri: context packing/restart handoff dan authoring wiring CI melengkapi writing-for-agents/shipping, bukan alasan memulai planner atau pipeline baru tiap tugas. Konvensi/versi proyek dan izin mengalahkan contoh vendor.

## File dan rollback

Diubah: `~/.omp/agent/config.yml` (tiga customDirectories tambahan), `~/.omp/agent/AGENTS.md` (PoP CLI-first dan routing wave), `~/.omp/agent/ecosystem/SKILL-ROUTING.md` (pointer/routing). Ditambah: empat native skill roots, capability roots terpilih, dua runtime original terpin beserta launcher, snapshot/evidence/fixtures/verifier pada wave ini.

Backup tersedia di `~/.omp/agent/ecosystem/backups/candidate-skills-20261113/`; integrity pada [backup-manifest.json](backup-manifest.json). `mcp.json` dan ledger tidak diubah. Rollback bukan tindakan otomatis: sesudah approval targeted, revert hanya delta wave dari config/routing, hapus tepat tambahan pada installation manifest dan runtime wave, jangan overwrite edit baru pengguna atau menghapus state aplikasi lain. Source archives dapat tetap disimpan sebagai provenance.

## Batas penilaian

Penilaian source-based, inspeksi body/references terpilih, metadata seluruh kandidat, delegasi read-only tiga slice, dan smoke runtime terarah. Bukan full security-audit, review line-by-line seluruh 4.000+ file snapshot, verifikasi semua external plugin, benchmark CLI versus MCP, semua provider PoP, semua REA command, setiap aplikasi komunitas, rendered playground/MCP widgets/extension, atau deployment/production test. Tidak mengaktifkan hooks, memory capture, paid model/cloud provider, publikasi atau akun baru.
