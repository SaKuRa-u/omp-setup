# Adopsi kandidat OMP — 7 November 2026

> Pembaruan routing setelah persetujuan pengguna: [automatic-routing-20261107/REPORT.md](../automatic-routing-20261107/REPORT.md) dan selection.json di folder tersebut adalah sumber aktivasi terkini. Angka 39 manual/16 otomatis di laporan ini adalah baseline historis adopsi; sekarang 7 tambahan tetap eksplisit karena flag vendor dan 48 tambahan discoverable otomatis. Sumber, pin, lisensi dan hasil runtime historis di bawah tetap berlaku. Harness lama memeriksa baseline lama, bukan regresi routing aktif.

## Hasil perubahan

Peninjauan ulang ini tidak menolak kandidat hanya karena fungsinya tumpang tindih. **55 skill asli tambahan dipasang global**: 39 alternatif/workflow dipanggil eksplisit, 16 panduan terfokus tersedia dalam metadata otomatis. Baseline global 96 dipertahankan; proses OMP baru di root netral menemukan **151 nama unik**. Ini jumlah skill terdaftar, bukan 151 runtime yang seluruh fiturnya sudah terbukti.

Scope: default-profile OMP 18.18.0 pada akun Windows ini. Tidak ditemukan named profile pada baseline sebelumnya; tidak ada klaim pewarisan otomatis ke named profile baru. Proyek lama dan proyek baru menggunakan global root yang sama, tetapi konfigurasi/skill repository tetap dapat memberi override atau alias. Sesi yang sudah berjalan perlu diganti dengan sesi baru; hot reload tidak diasumsikan.

Tidak ada perubahan model default, approval yolo, kredensial, Supermemory atau native memory=off. Tidak ada MCP, hook, engine desain, advisor, browser-account relay atau layanan berbayar baru diaktifkan. Tidak ada repository aplikasi pengguna yang diubah.

## Keputusan 21 kandidat

| Kandidat resmi | Keputusan yang dilaksanakan | Manfaat dan batas utama |
|---|---|---|
| [Taste](https://github.com/Leonxlnx/taste-skill) | `design-taste-frontend` 2.5.1, alternatif eksplisit | Art direction, aset dan quality gate berbeda dari Impeccable. Folder shared host lain tetap utuh; hanya alias OMP lama tepatnya disembunyikan. Full gate/keunggulan visual belum diuji. |
| [Agent Reach](https://github.com/Panniantong/agent-reach) | Guidance + CLI resmi 1.6.1 terisolasi | Public-channel fallback; pembacaan example.com melalui Jina berhasil. Bukan bukti semua kanal, caption YouTube, login atau browser berfungsi. |
| [Superpowers](https://github.com/obra/superpowers) | 9 workflow tambahan eksplisit | Brainstorming, plans, execution, parallel dispatch, review request, worktrees, branch finish, subagent development, TDD alternatif. Skill incumbent dengan nama sama tidak ditimpa; tidak ada bootstrap/hooks. |
| [Matt Pocock](https://github.com/mattpocock/skills) | 7 tambahan eksplisit | Teach, handoff, wait-what, writing-for-agents, to-spec, to-tickets, setup guidance. Bukan izin menerbitkan issue atau memasang suite. |
| [Karpathy](https://github.com/multica-ai/andrej-karpathy-skills) | Source disimpan, belum diregistrasi | README/frontmatter menyebut MIT, tetapi archive pin tidak menyediakan LICENSE/copyright grant; URL lama juga berbeda. Hambatan provenance, bukan overlap. |
| [Understand Anything](https://github.com/Egonex-AI/Understand-Anything) | 4 graph-reader eksplisit | Chat, diff, explain, onboarding dari graph UA existing. Lima subskill lain dicatat individual; pipeline/dashboard mengasumsikan host/build lain, Figma memerlukan akun. Graph UA bukan graph mentah Graphify. |
| [Addy Osmani](https://github.com/addyosmani/agent-skills) | 7 tambahan | Source/constraint/doubt-driven dan shipping eksplisit; migration, observability, documentation/ADR otomatis sesuai tugas. Tidak mengganti planner seluruh tugas. |
| [Graphify](https://github.com/Graphify-Labs/graphify) | Guidance Windows + `graphifyy` 0.9.103 terisolasi | Ekstraksi AST lokal dan query relasi nyata, tanpa backend model pada smoke. Tidak menyalakan watch, guard, hooks, MCP atau semantic-cloud. |
| [UI UX Pro Max](https://github.com/nextlevelbuilder/ui-ux-pro-max-skill) | Core lookup stable v2.15.0 | Pencarian lokal UX/style/type/palette. UX error summary relevan; dua kategori desain meleset. Enam subskill provider/path-dependent tidak dipasang; hasil lookup harus divalidasi terhadap brief. |
| [Anthropic Skills](https://github.com/anthropics/skills) | frontend-design, canvas-design, theme-factory eksplisit | Alternatif UI/artifact dan theme, bukan pemaksaan satu designer. doc-coauthoring source-only karena grant lisensi exact belum terselesaikan; suite proprietary dokumen tidak dipasang otomatis. |
| [last30days](https://github.com/mvanhorn/last30days-skill) | Guidance + runtime stdlib 3.31.0 | Recency research publik terbatas; HN-only/local reasoning berhasil. Tidak menyalakan provider berbayar, cookie extraction, publishing, cron atau semua platform. |
| [I Have ADHD](https://github.com/ayghri/i-have-adhd) | Guidance eksplisit | Alternatif penyampaian/task framing atas permintaan, bukan diagnosis, mode global atau extension otomatis. |
| [Emil](https://github.com/emilkowalski/skills) | choreograph, remove-animations tambahan | Melengkapi panduan craft/motion incumbent; tidak menambah motion atau dependensi ke setiap proyek. |
| [Hallmark](https://github.com/Nutlope/hallmark) | Guidance 2.0.0 + puppeteer-core terisolasi | Tema/scaffold dan lint original dapat dijalankan. Static negative check berhasil; render gagal pada browser-profile launch. Tidak diklaim full Hallmark/visual pass. |
| [Claude SEO](https://github.com/AgriciDaniel/claude-seo) | seo-schema, seo-hreflang eksplisit | Dua spesialis dengan references/templates asli, bukan seluruh suite/crawler/SEO authority; eligibility Google dan implementasi tetap harus diperiksa dari sumber resmi. |
| [GSAP](https://github.com/greensock/gsap-skills) | 5 tambahan: scrolltrigger, plugins, performance, frameworks, utils | Memperluas 3 panduan lama. Contoh upstream mengandung bug konkret (`Max.max`, unit xPercent, cleanup Nuxt); asli dipertahankan, tidak dicertifikasi runnable. Tidak memasang GSAP/framework. |
| [Prompt Master](https://github.com/nidhinjs/prompt-master) | Guidance eksplisit | Authoring prompt terstruktur sesuai target; model-template vendor bukan sumber resmi spesifikasi provider. Tidak menjalankan tugas yang ditulis dalam prompt. |
| [Hugging Face](https://github.com/huggingface/skills) | 5 guidance: TRL, sentence-transformers, community evals, local models, datasets | Menambah panduan ML yang sebelumnya belum tersedia. Tidak memasang PyTorch/CUDA, mengunduh bobot, menjalankan training/jobs, Hub push, Trackio atau unggah agent traces. |
| [Spec Kit](https://github.com/github/spec-kit) | CLI resmi specify-cli 1.3.2 + 43 dependency hash-locked | `init --integration omp` berhasil pada folder sintetis dan menghasilkan command/template OMP. Tidak scaffolding repo pengguna atau menjalankan model pipeline. |
| [Anti-Slop](https://github.com/miqdadbadjuber/anti-slop) | Core, copywriting, code eksplisit | Alternatif filter/critique. UI/responsiveness/contrast tidak diregistrasi: heuristik terlalu umum dan threshold large-text vendor perlu koreksi; MCP/plugin tidak diaktifkan. |
| [Style UI](https://github.com/miqdadbadjuber/style-ui) | Source/bookmark, bukan skill terpasang | Katalog referensi visual tanpa SKILL.md; aset/CDN dan lisensi produk tertaut terpisah. Tidak membuat skill/adapter tiruan. |

**Impeccable ditinjau ulang:** versi 4.8.0 incumbent dipertahankan, 24 command diperiksa dalam manifest domain. Sekarang default, bukan owner eksklusif; alternatif eksplisit di atas sah. Fallback manual tetap berlaku, engine/hooks/live tidak diaktifkan. Sebanyak 81 keputusan subskill engineering dan 95 keputusan domain + 24 command Impeccable tersedia di manifest; keputusan tidak dibatasi satu label per repository.

## Arsitektur global dan aktivasi

- Native root `~/.omp/agent/skills/` untuk skill mandiri, curated `ecosystem/capabilities/<vendor-pin>/...` untuk layout relatif penting. Hanya tujuh parent satu-level ditambahkan ke `skills.customDirectories`; bukan seluruh source suite.
- `skills.manualSkills` berisi 39 alternatif. Native `skill://nama` tetap dapat dibaca dan `/skill:nama` tetap dipanggil, sementara metadata tidak dimuat otomatis. 16 spesialis tambahan tetap model-visible sesuai tugas. Ini progressive disclosure, bukan menonaktifkan kemampuan.
- Bare ignore Taste dihapus; hanya `agents/design-taste-frontend` dan `claude/design-taste-frontend` lama yang dikecualikan. Tidak menonaktifkan seluruh provider `github/*` atau mengubah shared host lain.
- Global AGENTS.md dan IMPECCABLE-OMP.md direkonsiliasi: overlap bukan veto; satu lead sesuai tugas; izin executable/data tetap terpisah. Laporan ini bukan always-loaded context.
- Full vendor trees, license/notices dan SHA tersimpan; tidak dipatch agar pura-pura kompatibel. Source provenance/hash bukan signature attestation atau sandbox OS.

## Bukti fungsional

| Uji | Hasil yang benar-benar diamati |
|---|---|
| File integrity | 2.229 file design/engineering/knowledge dan 200 file domain cocok SHA manifest. |
| Native discovery tiga root | Root netral dan management-hub: 151 nama unik; Onboarding: 156 termasuk alias skill repository. Seluruh 55 tambahan URI-resolved dan baseline 96 dipertahankan di ketiganya; tidak ada edit repo. |
| Model-visible catalog | RPC baru root netral dan Onboarding membuktikan seluruh 39 manual tersembunyi dan 16 spesialis terlihat; tidak ada inference pada pemeriksaan katalog. |
| Graphify | Fixture 3 file: 5 node, 7 edge; `orders.order_amount` memanggil `pricing.invoice_total` terverifikasi, query mengembalikan relasi. |
| Agent Reach | CLI resmi menghasilkan `ok:true`, backend Jina, title Example Domain. Percobaan awal `python -m agent_reach` gagal karena paket tak punya __main__; error disimpan, bukan disembunyikan. |
| last30days | Exit 0, hanya HN; 1 story dalam rentang 30 hari, runtime deterministic/local/local-score. Vendor score “3/4 core sources” tidak diadopsi karena tidak sesuai scope HN-only. |
| UI UX Pro Max | Lookup error summary mengembalikan focus/link field/inline errors; clinic dipetakan ke veterinary dan architecture ke photography, dua mismatch dicatat. Bukan benchmark kemenangan desain. |
| Hallmark | List/scaffold exit 0; fixture negatif mendeteksi transition:all. Lint exit 1 dengan 5 FAIL, 1 REFLEX, 2 WARN; render tidak berjalan karena browser-profile launch error. |
| Spec Kit | Help dan init sintetis OMP exit 0; 9 command OMP dan 6 script PowerShell tersedia, command plan menunjuk setup-plan.ps1 yang nyata. Pipeline/model/hook tidak dijalankan. |
| Taste | Utility pemilih background asli dengan seed tetap menghasilkan stage/mist, memenuhi cap dua ground dan page flat. Bukan full gate/visual benchmark. |
| Prompt Master, inference | Model existing gpt-6-luna menghasilkan prompt migrasi SQLite: backup, restore, rollback, verifikasi jumlah/nilai, tanpa menjalankan migrasi atau upload. Satu fixture, bukan benchmark umum. |
| Understand Explain, inference | Saat source lokal tidak tersedia model menolak mengarang hasil; setelah path source fixture eksplisit diberikan, caller order_amount dan hasil 33.0 dijelaskan sesuai source/graph. Graph generation/dashboard tetap belum diuji. |

Manifest acceptance per kasus, output pertama gagal dan harness tersedia di folder ini. Tidak ada benchmark kontrol/buta yang membuktikan peningkatan token, latency atau kualitas populasi. Training ML, full UA generation, seluruh channel eksternal dan full visual workflow belum diuji.

Dua proses inference awal menampilkan warning existing Semgrep “not ready after 30000ms”; tool tidak tersedia pada run tersebut. Ini kegagalan startup sementara yang terlihat, bukan alasan menyatakan MCP sehat atau mengubah rute incumbent. Run ketiga tidak menampilkan warning tersebut. Tidak dilakukan rerun hanya untuk menutupi warning. Batas read-only tool grant bukan sandbox filesystem/network.

## Runtime dan penggunaan harian

Mulai sesi OMP baru di proyek yang dipilih. Contoh:

- `/skill:design-taste-frontend` atau `/skill:frontend-design` untuk memilih alternatif lead UI; jangan aktifkan semua designer sekaligus.
- `/skill:hallmark` untuk workflow tema/halaman dengan gate asli, dengan batas render yang tercatat.
- `/skill:ui-ux-pro-max` untuk lookup UX/type/palette; cek kategori terhadap brief, jangan mengarang constraint produk.
- `/skill:deprecation-and-migration` untuk rencana cutover/rollback; `/skill:prompt-master` untuk menulis prompt, bukan menjalankannya.
- `/skill:graphify` untuk ekstraksi struktural lokal terpilih. Runtime resmi: `ecosystem/runtime/graphify/0.9.103/venv/Scripts/python.exe`; gunakan `-m graphify` dengan lingkungan/backend dan target yang dibatasi pada manifest.
- `/skill:understand-explain` untuk graph `.ua/knowledge-graph.json` yang memang schema UA; tidak otomatis membuat graph.
- `/skill:last30days` dan `/skill:agent-reach` untuk public-source scope eksplisit, tanpa mengambil cookie/private session.
- HF specialists memberi panduan, bukan GPU atau training service siap jalan. Tanyakan kebutuhan stack/data/resource nyata sebelum eksekusi.
- Spec Kit dapat dipanggil absolut dari proyek mana pun: `ecosystem/runtime/spec-kit/1.3.2/venv/Scripts/specify.exe`. Scaffolding sebuah repo adalah tindakan terpisah; jangan overwrite konfigurasi incumbent.

Runtime Reach: `ecosystem/runtime/agent-reach/1.6.1/venv/Scripts/agent-reach.exe`; last30days: `ecosystem/runtime/last30days/3.31.0/venv/Scripts/python.exe`. Hallmark memakai dependency root pada `AdoptDesignAlternatives.json`, env HALLMARK_PUPPETEER dan CHROME_PATH; tidak ada perubahan PATH global atau download browser.

## Backup dan rollback

Backup parent: `ecosystem/backups/candidate-adoption-20261107/parent/` berisi config.yml, AGENTS.md, ledger.json dan IMPECCABLE-OMP.md sebelum perubahan. Masing-masing manifest slice merinci path yang dibuat; tidak ada incumbent skill yang ditimpa pada tahap adopsi ini.

Rollback selektif tanpa menghapus data: tutup sesi OMP terkait, pindahkan **hanya** 28 folder native baru yang tercantum pada selection.json ke folder karantina di luar root discovery; keluarkan tujuh curated roots baru dari customDirectories (atau pulihkan config backup bila belum ada edit pengguna setelah backup), pulihkan AGENTS.md dan IMPECCABLE-OMP.md yang relevan. Curated sources/runtime/locks dapat disimpan untuk rollback maju; jangan jalankan cleanup vendor/global atau menghapus shared host lain. Verifikasi `omp skill list --json` dan URI incumbent dalam proses baru. Jika ada perubahan pengguna sesudah snapshot, merge bagian tepatnya, jangan overwrite seluruh file.

Rollback byte viability dan detail hasil proyek/inference dicatat dalam `final-acceptance.json` setelah pemeriksaan akhir. Mekanisme ini reversible lokal, bukan bukti disaster recovery atau rollback semua proyek masa depan.

## Berkas sumber bukti

- `selection.json`: 55 nama, path, mode dan curated roots.
- `AdoptDesignAlternatives.json`: provenance/release/license/keputusan 5 kandidat UI beserta semua dependensi Hallmark.
- `engineering-guidance.json`, `engineering-guidance-files.json`: 7 kandidat engineering, 81 keputusan, Spec Kit dan hashes.
- `domain-adoption.json`, `domain-adoption.md`: 5 kandidat domain, Impeccable, 200 hash, caveat vendor.
- `knowledge-access.json`: 4 kandidat, wheel/dependency locks, platform/data boundaries.
- `*-acceptance.json`, `discovery-*.json`, `catalog-*.json`: hasil real CLI/RPC, bukan hanya keberadaan config.
