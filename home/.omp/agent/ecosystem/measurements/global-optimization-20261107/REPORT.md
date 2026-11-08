# Optimasi global OMP — 7 November 2026

Status ini membedakan **Verified** (observasi nyata), **Implemented but not benchmarked**, **Not tested**, **Blocked**, dan **Failed**. Tidak ada klaim percepatan atau kualitas yang diukur melalui benchmark representatif. Hasil pekerjaan upgrade tambahan tercatat per komponen di direktori laporan ini; laporan tidak dimuat ke context global.

## 1. Baseline dan masalah

Verified: standalone `C:/Users/Indrimeilla-PC/.bun/bin/omp.exe`, versi18.18.0, stable terbaru yang diperiksa. Sumber tag `b5a6b2f7e5b6606b6562e678ead83f21738f34a0`. Native config di `~/.omp/agent/config.yml`; root named profiles tidak ditemukan. `omp plugin list --json` menemukan Ponytail5.3.2; doctor melaporkan tiga pemeriksaan struktur OK, bukan acceptance seluruh plugin. Source inventory97 entrypoint/96 nama unik; fresh RPC menemukan96 skill di Onboarding dan management-hub.

Masalah nyata: native `find` gagal karena judge OpenRouter402 insufficient credits. Tidak membeli kredit atau mengganti provider. LSP tidak tersedia pada sesi Onboarding, bahkan lookup file TS management-hub melalui sesi itu mengembalikan `No language server found for this action`. Ini bukan bukti LSP tidak bisa berfungsi bila diluncurkan dari root proyek yang cocok. Config role hanya default; schema editor MCP tertinggal18.11.0. Provenance stub Orca telah drift dari ledger lama. AGENTS global56.631 byte/11.957 token o200k_base; ukuran ini bukan bukti penurunan akurasi.

## 2. Evaluasi seluruh21 kandidat

Matriks lengkap, SHA, lisensi, dependency, executable surface dan subskills: [CandidateDesign.md](CandidateDesign.md), [CandidateAccessML.md](CandidateAccessML.md). Semua penilaian kandidat **source-assessed**, bukan uji output UI/ML.

|Repository|Keputusan|
|---|---|
|Leonxlnx/taste-skill|Alternatif marketing opt-in; bukan lead UI kedua otomatis; scaffold/hook belum diuji OMP|
|Panniantong/agent-reach|Pelengkap kanal khusus; login/cookie/transkripsi bukan aktivasi otomatis|
|obra/superpowers|Reuse guidance incumbent; jangan bootstrap planner/reviewer kedua|
|mattpocock/skills|Pertahankan subset; nested layout dan fresh-context requirement perlu mapping, bukan wholesale install|
|multica-ai/andrej-karpathy-skills|Tidak ditambah: manfaat sudah tercakup; standalone license file belum established|
|Egonex-AI/Understand-Anything|Alternatif onboarding graph visual; runtime/index belum diuji|
|addyosmani/agent-skills|Pelengkap selective source/constraint/migration; repo-level references wajib dijaga|
|Graphify-Labs/graphify|Kandidat graph struktural lokal; tanpa strict guard/cloud/watch; belum dipasang|
|nextlevelbuilder/ui-ux-pro-max-skill|Pelengkap lookup token/style, bukan bukti user research atau owner UI baru|
|anthropics/skills|Subset sesuai tugas; mcp-builder diperiksa untuk pembaruan; tidak install19 skill otomatis|
|mvanhorn/last30days-skill|Pelengkap recency; paid fallback/cookie/reranking memerlukan izin terpisah|
|ayghri/i-have-adhd|Alternatif style manual; bukan default dan bukan intervensi klinis|
|emilkowalski/skills|Lima guidance Motion diperbarui; empat assigned unchanged|
|Nutlope/hallmark|Alternatif marketing bertema; bukan companion aktif Taste/Impeccable pada target sama|
|AgriciDaniel/claude-seo|Pelengkap SEO terpisah; crawling/API/CLI belum diaktifkan|
|greensock/gsap-skills|Tiga installed guidance masih cocok pin terbaru; runtime GSAP mempunyai lisensi terpisah|
|nidhinjs/prompt-master|Alternatif penulisan prompt explicit-only; tidak ditambah always-on|
|huggingface/skills|Pelengkap ML per tugas; jobs/Spaces/uploads/private/token tetap gated|
|github/spec-kit|Workflow proyek opt-in, bukan aturan semua tugas; tidak memasang commands ke repo|
|miqdadbadjuber/anti-slop|Filter khusus opsional; plugin membawa MCP, bukan sekadar Markdown|
|miqdadbadjuber/style-ui|Bookmark katalog, bukan skill executable|

Impeccable dievaluasi ulang terpisah: tetap satu owner UI, Emil/GSAP membantu mekanisme, alternatif dipilih per tugas. Tidak ada bukti eksperimen bahwa satu sistem menghasilkan desain terbaik.

## 3. Kandidat tambahan

`yt-dlp` resmi adalah alternatif lebih sempit untuk kebutuhan YouTube daripada Agent Reach penuh. MergeKit resmi relevan sebagai tool ML, bukan alasan memasang GPU stack global. Tidak ada library/server tambahan dipasang hanya agar katalog tampak lengkap. Discovery popularity bukan ukuran mutu.

## 4. Freshness seluruh installed skills dan integrasi

[InstalledSkillsAudit.md](InstalledSkillsAudit.md) memuat setiap entrypoint dan mapping installed pin→upstream, bukan sampling. [IntegrationFreshness.md](IntegrationFreshness.md) memuat versi paket, SHA, Windows/runtime constraints dan mekanisme update. HEAD bukan sertifikasi stable; repo berubah belum tentu payload skill berubah. Integritas byte seluruh97 entrypoint terhadap upstream tidak diklaim.

Verified applied awal: Emil lima skill/enam file ke `c8a79627b59d72d764d6ab6f2c87c09a48169833`;23 hash file installed telah dicocokkan dengan manifest. Tidak ada dependency Motion diubah. Empat skill lain identical. Pembaruan lain mempunyai evidence per-komponen; hanya hasil acceptance akhir boleh disebut aktif terverifikasi.

Retain: OMP18.18.0; REA6.5.0/skill42 (6.8 breaking Evidence dan Node minimal lebih tinggi dari Node24.19.0); RTK1.0.1 (PATH shared lintas host, perubahan filter dan recall); Supermemory5.0.2 (wrapper/security contract, tidak ada kebutuhan fitur baru); E2E global0.21.2 contract (0.23 breaking locator/baseUrl, runner proyek tidak disentuh). Ponytail5.3.3 mengubah metadata/Claude features tanpa delta skill/pi-extension dari installed commit; tidak memaksakan upgrade tanpa manfaat OMP. Provenance Caveman/find-skills/Orca belum cukup untuk blind refresh. Source unchanged retained sebagaimana tabel audit.

## 5. Dipasang, diganti, dinonaktifkan

Tidak memasang seluruh kandidat, custom agent baru, memory backend kedua, hook atau layanan baru. Tidak menimpa konfigurasi host lain. Tidak menghapus data. Exact active skill/paket cutover dicatat pada manifest komponen dan acceptance akhir. Tidak menyamakan snapshot prepared dengan aktif/usable.

## 6. Kemampuan native

[NativeVersionAudit.md](NativeVersionAudit.md) mencakup semua kategori dokumentasi diminta, source matching version dan perbedaan website. Source tag mengalahkan contoh website yang drift. LSP lazy/shared sudah aktif; `task.enableLsp` defaultfalse. Root marker startup cwd-only dan binary project-local diprioritaskan; global install semua server tidak dibenarkan. PATH tidak menemukan TS language-server, pyright, gopls, rust-analyzer, debugpy, dlv, lldb-dap/gdb; module/private executable belum dieksplorasi exhaustively. Debug native enabled, sessions kosong; launch/breakpoint **Not tested**. AST native **Verified synthetic**: proposal cocok satu call, resolve menerapkan satu replacement, hasil file dibaca dan fixture dihapus; kode proyek tidak disentuh.

Verified: direct URL read, public web_search, managed browser title/DOM pada example.com, JS persistent eval, Python3.14.4 eval assert. Browser tab ditutup. Relay/CDP akun pengguna/computer tidak diaktifkan. GitHub CLI terpasang; optional native GitHub tool nonaktif, tidak perlu MCP duplikat; private auth belum diuji. Shell native dipakai untuk CLI nyata. SDK source import lama belum diasumsikan kompatibel dengan standalone; RPC diuji langsung tanpa inferensi.

## 7. Arsitektur global dan profil

Profil default satu-satunya yang ditemukan; tidak menciptakan profil hanya demi pengujian. Skill reusable tetap global dan ditemukan di dua proyek. Tidak ada perubahan repo proyek.

Jika profil baru diperlukan: pertahankan auth/sessions/cache/model preferences sendiri; pakai supported `skills.customDirectories` dengan parent satu-level yang benar dan overlay khusus reusable settings. Arrays replace, bukan append. Jangan symlink seluruh agent dir, auth DB, sessions atau mengganti root privacy. MCP/extension sharing perlu supported package/path declarations per profil, bukan asumsi inheritance default. Jangan opt-in seluruh foreign provider demi satu skill. Verifikasi profile baru ketika benar-benar dimaksudkan pengguna; saat ini **Not applicable**, bukan pass atas profil hipotetis.

## 8. Subagent, advisor, model, modes

Bundled versi ini: scout/reviewer/security-reviewer/seance/task/sonic; designer/librarian tidak dibundel. Native task digunakan untuk independent read-only slices dan disjoint upgrade files. Default shared workspace bukan sandbox; tools dan izin tetap dibatasi kontrak, bukan klaim isolation. Maks concurrency32 tidak berarti32 worker harus dipakai. Tidak mengubah concurrency, nested depth atau agent grants tanpa pengukuran.

Default tetap `openai-codex/gpt-6.1-sol:medium`. Ditambah `smol=openai-codex/gpt-6-luna:low` setelah model tersedia di katalog dan satu prompt nyata mengembalikan persis `OMP_SMOL_OK`;27,78s adalah satu wall observation, bukan benchmark latency/pricing. `omp config get modelRoles` membuktikan role tersimpan. Role resolution consumer smol belum otomatis dibuktikan dari direct-model test. Tidak mempin role lain secara spekulatif atau memasang cross-provider fallback. Advisor tetapoff; WATCHDOG.md/yml tersedia untuk scoped independent review setelah privacy/cost disepakati, bukan always-on.

Normal mode default; plan untuk keputusan belum settled, goal untuk objective/stopping-budget nyata, loop hanya bounded predicates, prewalk off sampai kualitas handoff diuji. Vibe/director tidak menambah value untuk audit ini. `/handoff` compact in place, bukan transfer proses. RPC/SDK/ACP bukan orchestration baru yang perlu dibangun; RPC lifecycle sudah diuji.

## 9. Context engineering dan riset

Global AGENTS memuat routing/policy dan banyak provenance historis. Tidak memangkas safety secara mekanis atau menyalin seluruh report ke context. Katalog skill metadata selalu tersedia, body on-demand; explicit-only hidden bukan hilang. tools.xdev=true/catalog sudah mengurangi schema eager. Native compaction/superseded-read pruning aktif; auto-learningoff. Tidak memasang TTSR baru hanya karena tersedia; builtin rule list berhasil diperiksa, false-positive/retry overhead belum diukur.

Bukti bertentangan dipertahankan: [Lulla et al.](https://arxiv.org/abs/2601.20404) melaporkan asosiasi efisiensi pada124PR/10repo; [Gloaguen et al. v3 §4](https://arxiv.org/html/2602.11988v3) tidak menemukan peningkatan sukses signifikan, biaya meningkat; [Khatri §3–6](https://aclanthology.org/2026.realm-1.5.pdf) dua-agent study kecil, mixed evaluation/injection channels, tidak membuktikan kesetaraan universal. [Lost in the Middle](https://aclanthology.org/2024.tacl-1.9/) menunjukkan positional effects pada model/tugas yang diuji, bukan bukti efek sama pada GPT6.1. Kesimpulan: evaluasi relevance/contradictions dan tugas nyata; tidak membuat batas byte universal atau menjanjikan penghematan dari pemendekan.

A/B essential/current/optimized pada task nyata belum dilakukan; tidak ada angka correctness/token improvement. Pemisahan historical reference dari kebijakan global butuh mempertahankan seluruh decision/permission; jangan menghapus berdasarkan studi umum saja.

## 10. Memory dan akses eksternal

Supermemory Cloud wrapper dipertahankan: DPAPI, most-specific project allowlist, global mutationsdisabled, capture default tidak otomatis. Onboarding satu mapping. Source safeguards diperiksa, tetapi tidak membaca/menulis memory privat atau mengeluarkan key. Live recall/latency/retention/cost **Not tested**. Session history, compact, project index/graph, procedural skills dan persistent cloud memory bukan produk sama. Native local/Mnemopi/Hindsight tidak diaktifkan bersamaan. Auto-learning berpotensi noisy dan membutuhkan tambahan model calls; tetapoff.

Context7 resolve, Semgrep languages, REA session dan PoP Crossref+export menjawab nyata. PoP broad-OR menghasilkan satu false-positive kandidat, menunjukkan metadata perlu verifikasi; hasil sumber dibuka untuk klaim yang dipakai. REA backend macOS/Java/Ghidra/Android mempunyai blocker yang dilaporkan, bukan semua tool207 usable.

YouTube: official videos/channel/playlists/comments metadata API berbeda dari transcript. captions.list tidak mengembalikan teks; captions.download memerlukan OAuth dan hak edit video. Agent Reach/yt-dlp bisa mengambil caption publik yang tersedia tetapi platform blocking/terms tetap berlaku; tanpa caption transkripsi membawa dependency/key/cost. Jangan import cookie atau beli proxy sebagai fallback otomatis. Detail quota dan referensi resmi ada pada CandidateAccessML; kuota berubah, verifikasi lagi sebelum integrasi.

## 11. Keamanan dan risiko tersisa

Pengguna eksplisit mempertahankan yolo. Tidak diam-diam mengubah tools.approval, policy shell, secrets, Browser Relay, collab atau credential. Yolo tidak menyediakan sandbox; Markdown, read-only agent persona, worktree dan no-session bukan confinement. Hooks/extensions/MCP adalah trusted-code decisions. `secrets.enabled=false` bukan berarti DPAPI bocor, tetapi jangan mengasumsikan native global outgoing-secret redaction aktif. Session/cache/log local bukan encrypted guarantee. Tidak upload log/session/report atau menjalankan vulnerability probes. Full Cloudflare audit/sandbox certification tidak dilakukan.

Risiko operasional: judge402; approvals permisif; dynamic source drift/Orca-managed extension; dependency updates dan Node compatibility; halaman website dapat berbeda dari installed source. Tidak menyembunyikan warning Semgrep MCP Python1.29.0. Native memory/privacy boundaries preserved.

## 12. Hasil uji fungsional

|Pemeriksaan|Status|Bukti/batas|
|---|---|---|
|Version/config path/plugin doctor|Verified|CLI nyata, doctor3 structural OK|
|Global discovery lintas proyek|Verified|RPC96+96, no inference, stderr0; extension discovery sengajaoff|
|Skill invocation semantics|Not tested|Katalog/URI bukan bukti pemilihan model benar untuk semua intent|
|Freshness seluruh skill|Source-assessed|Matriks setiap entrypoint; drift byte exhaustive belum proved|
|Model ringan direct request|Verified|OMP_SMOL_OK, provider existing|
|Role config|Verified|config get default+smol|
|MCP empat koneksi|Verified baseline|Operasi terbatas; acceptance cutover terpisah|
|Browser/read/web search/eval|Verified terbatas|Public target, no user account|
|LSP|Blocked pada sesi ini|No language server; bukan claim semua proyek gagal|
|DAP launch/breakpoint|Not tested|Tidak menjalankan target/debug adapter|
|AST codemod|Verified synthetic|Proposal→resolve→hasil dibaca, fixture dihapus|
|Memory live|Not tested|Tidak mengakses cloud facts/credentials|
|Semantic find|Failed|402 judge credits; literal search fallback|
|Context A/B performance|Not tested|Tidak ada claimed gains|
|Rollback|Backup tersedia|Manifest SHA; destructive restore tidak dijalankan|

## 13. Rollback

Backup `~/.omp/agent/ecosystem/backups/global-optimization-20261107/manifest.json` memuat SHA baseline config.yml/models.yml/mcp.json/AGENTS.md; credentials/auth DB/sessions/cookies sengaja tidak disalin. Backup komponen berada di subdirektori bernama komponennya; baca manifest sebelum restore.

Tutup sesi yang bisa menyimpan config. Bandingkan perubahan lain pengguna sebelum restore—jangan overwrite file penuh bila ada perubahan setelah audit. Restore hanya key/modelRoles atau target MCP yang berubah; untuk full baseline gunakan file backup hanya setelah review konflik. Skill Emil: pulihkan lima direktori dari `emil/` sesuai manifest; versi lain melalui backup komponen. Jangan hapus runtime lama sampai cutover acceptance. Restart OMP, periksa config get, /extensions, /mcp list dan jalankan ulang smoke relevan. Restore tidak membutuhkan secret re-entry. Rollback terencana, bukan claim fault-injection restore berhasil.

## 14. Panduan harian

- Jalankan dari root proyek yang tepat. `omp --version`, `omp config path`, `/extensions`, `/agents`, `/model`, `/mcp list` membantu membedakan installed/discovered/enabled/loaded/usable.
- Jelaskan outcome dan acceptance; minta skill khusus hanya bila perlu. Satu owner tahap, helper domain selektif.
- Default untuk pekerjaan umum; smol untuk tugas kecil setelah verifikasi. Jangan menilai model dari harga katalog subscription atau satu prompt.
- `/plan` untuk keputusan besar; `/goal` dengan stopping criteria; `/compact`/`/handoff` dengan keputusan, batas, work pending dan verification state.
- Gunakan LSP untuk symbol-aware changes saat server tersedia; jangan menganggap grep pengganti semantic rename. No native find saat402 bukan alasan membeli kredit.
- `yolo` dipertahankan: review target/perintah sensitif, repo baru dan executable packages. Tidak ada izin produksi/paid/private-account baru.
- Setelah upgrade: sesi baru; periksa source aktif dan operasi konkret. Katalog ada bukan functional pass.

### Acceptance akhir dan perubahan setelah baseline

|Komponen|Hasil akhir|
|---|---|
|Context7 MCP|**Verified 4.5.1**, fresh stdio process melaporkan versi4.5.1 dan tepat2tools; resolve TypeScript serta query-docs berhasil, stderr0. Bridge DPAPI dipertahankan; runtime lama tidak dihapus. `context7-acceptance.json`.|
|Semgrep|**Failed and rolled back**: kandidat1.184.0 installed68wheel hash-locked, tetapi acceptance MCP timeout150s. Tahap penyebab tidak terekam; tidak mengklaim scan berhasil. Rute aktif kembali1.181.0, objek konfigurasi identik baseline; mounted languages call berhasil setelah rollback. Warning MCP1.29.0/public discovery tetap. `semgrep-acceptance.json`.|
|Impeccable|**Implemented but not benchmarked**4.8.0; fresh CLI URI memilih native OMP,59file payload hash cocok manifest.103relative links diperiksa worker; engine/hooks/live tidak dijalankan.|
|Emil|**Implemented but not benchmarked**5skill/6file;23hash installed cocok, fresh URI native berhasil untuk sampel.|
|MCP builder|**Implemented but not benchmarked**,11file original upstream, hash cocok; fresh URI memilih native. Shared host copy untouched; old agents/claude aliases excluded.|
|Terraform policy|**Implemented but not benchmarked**,56file termasuk MPLlicense, hash cocok; fresh URI memilih native; adaptasi path bundled-reference dan BUSLnotice dipertahankan. Tidak menjalankan Terraform.|
|ARS|**Blocked compatibility**:3.24.2 exact`fd5ff1b858374219b4d342e38587b66e18f61cbd` staged, bukan aktif. Validasi passport baru memerlukan migration acceptance;3.23.1 tetap aktif.|
|Fresh discovery final|management-hub96; Onboarding101. Semua96global tetap tersedia, nama unik, native MCPbuilder/policy ada dan old agents/claude aliases tidak exposed. Lima tambahan adalah alias snapshot proyek`github/{animate,animation-performance,emil-design-eng,impeccable,review-animations}`.|

**First-pass failure discovery:** assertion jumlah96 gagal pada Onboarding101. Investigasi menemukan `.github/skills/` milik repository menyimpan salinan lama; sebelum upgrade salinan identik collapse, setelah berbeda native loader memberi namespace`github/*`. Assertion incidental jumlah tetap dihapus, bukan diubah menjadi101. Invariant unik/native selection/old alias boundary tetap diuji. Snapshot proyek tidak disentuh atau disembunyikan lewat disable-provider global; ini menjaga repository precedence, bukan mengklaim semua source sama versi. Gunakan nama bare native untuk versi global. Detail `discovery-delta.json`.

**Konteks:** baseline token11.957 sebelum provenance reconciliation. AGENTS ditambah catatan singkat supersession pin agar klaim historis tidak dianggap current; ini bukan context-token reduction. Ledger historical dipertahankan dengan pointer audit current. `REPORT.md` dan research references tidak diimpor ke context. Bun1.4.2 di bawah minimum source/SDK1.4.4; standalone OMP tetap berfungsi, source helpers lama tidak dijadikan acceptance.

**Rollback teruji sebagian:** Semgrep route rollback benar-benar dilakukan dan deep-equal baseline; backup empat file dasar telah hash-verified. Pemulihan seluruh skill/config dari backup tidak dijalankan karena akan membatalkan upgrade yang lolos. Untuk MCPbuilder/policy yang baru dibuat di native OMP: pemulihan cukup hapus hanya native tree yang dibuat audit dan empat exact alias exclusions setelah review, sehingga shared source lama ditemukan kembali; jangan menghapus shared tree. Untuk Context7: restore launcher dari backup komponen; tidak perlu mengubah key atau mengaktifkan legacy CLI route. Ini instruksi operator, bukan tindakan destruktif yang sudah dijalankan.

**Batas keberhasilan:** audit/evaluasi sumber dan safe upgrades telah dilakukan; environment belum memenuhi klaim seluruh-domain runtime readiness. LSP/DAP nyata, memory live, skill selection semantic dan A/B kualitas lintas domain tetap belum diuji/diblokir sesuai tabel. Tidak ada skor performa buatan, instalasi cloud/GPU, full security certification, atau janji update hot-reload pada sesi berjalan. Mulai sesi baru sebelum mengandalkan discovery/MCP terbaru.
