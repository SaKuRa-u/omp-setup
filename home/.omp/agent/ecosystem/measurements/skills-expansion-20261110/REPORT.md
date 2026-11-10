# Evaluasi dan adopsi skills OMP — 10 November 2026

## Hasil

**23 skill original tambahan terpasang pada root native OMP, Hyperframes CLI resmi 0.9.28 terpasang terisolasi, routing diperbarui.** Default-profile global kini menemukan **174 skill: 159 metadata otomatis, 15 explicit-only**. Baseline 151 entrypoint incumbent dipertahankan byte-identical. Pada Onboarding ditemukan 179 skill karena lima alias repository existing; 163 metadata otomatis dan 16 explicit-only, termasuk alias github/review-animations yang memang sudah ada. Tidak ada repo aplikasi atau host agent lain diubah.

Permintaan pengguna adalah membuat prompt melalui Prompt Master lalu menjalankannya dalam sesi ini. Prompt OMP siap salin telah diberikan di chat; pengguna menyetujui evaluasi/pemasangan selektif, CLI Hyperframes, routing dan verifikasi, dengan batas no-capture/no-services/no-cloud/no-paid-provider. Tidak dilakukan bulk latest atau bootstrap seluruh suite.

## Keputusan seluruh 13 kandidat

| Kandidat sumber asli | Pin yang diperiksa | Keputusan aktual dan alasan |
|---|---|---|
| [affaan-m/ECC](https://github.com/affaan-m/ECC) | `d2ef2680594f9a17526a6e1a2e18b3d242c5d17b`, MIT | **1 skill: search-first.** Preflight ketersediaan kanal dan keputusan reuse/adopt/extend/build bernilai sebagai panduan terfokus, bukan planner/fan-out semua fitur. Motion foundations/patterns/advanced tidak diaktifkan: klaim SSR terlalu mutlak, contoh modal tanpa focus/Escape/scroll lock, accordion scaleY dan long-press tanpa cleanup memadai. Bukan menolak hanya karena overlap. Remotion tidak dipasang sebagai framework alternatif di luar pilihan Hyperframes. |
| [thedotmack/claude-mem](https://github.com/thedotmack/claude-mem) | `ea45a393700c2738656b478c0d47da5439712344`, Apache-2.0 core | **Tunda, tidak dipasang.** Sistem worker/hooks/observer memory dan capture sesi, bukan panduan skill mandiri. Pilihan akun/provider/trial/cloud serta telemetry perlu keputusan tersendiri. Supermemory existing dan native memory off tetap utuh. Ini keputusan scope/kompatibilitas, bukan vonis produk buruk. |
| [K-Dense-AI/scientific-agent-skills](https://github.com/K-Dense-AI/scientific-agent-skills) | `2d2065fb4520fa3f3f2bcf61cff26ec8b7eba4b5` | **2 skill MIT: scientific-critical-thinking, research-grants.** Claim/bias/causality appraisal dan requirements/NOFO/budget critique, melengkapi ARS tanpa mengambil alih penulisan/review manuskrip. Suite 177 skill memiliki lisensi/dependensi beragam; tidak dipasang seluruhnya. Scientific-schematics/OpenRouter, komputasi klinis, submission dan provider tidak diaktifkan. |
| [garrytan/gstack](https://github.com/garrytan/gstack) | `ee3bae40284a90c281ddf5b45f67e23a452c15a7`, MIT | **Tunda, tidak dipasang.** Review/write-skill memiliki nilai metode, tetapi terikat shared preamble, gstack-skill-start/bill/end, helper/hook/telemetry dan host paths. Tidak ditransplantasi dengan adapter tiruan atau diklaim standalone OMP-ready. |
| [cathrynlavery/diagram-design](https://github.com/cathrynlavery/diagram-design) | `f2496acbde9f45ccb55c24d4f75210c8a1355df8`, MIT | **1 skill: diagram-design**, supporting assets/references asli. Diagram editorial HTML/SVG, geometri konektor, semantic layout dan fidelity ledger. Bukan pengganti Mermaid untuk flow/sequence sederhana dalam chat. Onboarding yang mengubah vendor pin tidak dijalankan. |
| [addyosmani/agent-skills](https://github.com/addyosmani/agent-skills) | HEAD `301b02b12bff98e4688e6984af6556802322bbde`, installed `8bfcc1f9916f2eea55494d8c1fa7f4bde867dd9e`, MIT | **Pertahankan tujuh existing, tidak duplikasi.** Ketujuh SKILL.md terpasang cocok Git blob HEAD. Delta HEAD ada pada code-review-and-quality dan fixtures yang tidak dipasang; bukan alasan mengganti Ponytail reviewer. |
| [zhaoxuya520/reverse-skill](https://github.com/zhaoxuya520/reverse-skill) | `cab634bd855fc287f6e420c1f36fd1a6b9245960`, MIT | **Tunda, tidak dipasang.** MASTER-ROUTING bergantung case-init, timeline/evidence/ops helpers dan external reverse toolchain; bukan router umum OMP. REA original existing dipertahankan. Dukungan PowerShell tidak membuktikan integrasi OMP. |
| [wheresryan22/anatomy](https://github.com/wheresryan22/anatomy) | `1482e8469b0a9e0d8cc18ea2740a01423d29ae80`, MIT | **1 skill: anatomy + kit original.** Ilustrasi fisik isometrik interaktif dengan readout/model bersama. Bukan flowchart biasa. publish/session dapat membaca log Claude dan menerbitkan prompt/metadata; tetap inert. Helper browser/audit belum diverifikasi di Windows/OMP. |
| [elayadesign/ai-design-skills](https://github.com/elayadesign/ai-design-skills) | `456d9e0d3e2d84c748bb143c6ca3d90c45e16213`, MIT | **Source/staging saja, tidak aktif.** figma-designer memerlukan figma-use/generate-* dan Figma MCP yang tidak tersedia. Landing-page-design memaksakan template/struktur/motion terlalu luas untuk brief umum; disimpan original, bukan default designer. |
| [heydamir/unslop](https://github.com/heydamir/unslop) | `97daa3eb365670ea3f87ed85356cbfcee18105a5`, CC BY 4.0 | **1 skill: unslop.** Alternatif retrofit visual AI-looking, bukan filter selalu-loaded atau pipeline kedua. Kredit Damir Sokolovsky (@heydamir), https://heydamir.design/unslop dan lisensi dipertahankan. Helper snapshot/story tidak dijalankan. |
| [jakubkrehel/skills](https://github.com/jakubkrehel/skills) | `72bdd6121cd595f47fd21c9f23e374028c9cbacd`, MIT | **13 skill.** Review interface enam domain, rincian warna/layout/typography/copy/polish, ilustrasi teknis serta workbench terfokus. build-design tidak aktif karena meminta fidelity mengalahkan contrast/focus; afk tidak aktif karena memperluas scope unattended dan connected services. |
| [miqdadbadjuber/anti-slop](https://github.com/miqdadbadjuber/anti-slop) | `3b75daa1fb6bb4c2b8a3807f82eed50914dee6b2`, 3.2.27, MIT | **1 tambahan: antislop-layoutmobile.** Core/code/copywriting incumbent byte-identical; tidak ditimpa. Delta release pada validasi hex contrast MCP tidak relevan pada komponen installed. antislop-human tidak diaktifkan: threshold large-text 18px keliru; tidak memasang servernya. |
| [heygen-com/hyperframes](https://github.com/heygen-com/hyperframes) | CLI 0.9.28, tag v0.9.28 / `58686a74c6a82c13cec05c67a76cc7555cea509b`, Apache-2.0 | **CLI + 3 skill: hyperframes, hyperframes-cli, hyperframes-registry.** Render lokal nyata berhasil. media-use/Pro/reverse/style/Figma/slideshow/migration tambahan tetap source-only; tidak ada akun/cloud/generation/provider. Motion UI website tetap CSS/native/Emil/GSAP/Motion existing. |

Semua pin sumber terpilih dan supporting file dipertahankan. Tidak mengklaim seluruh ribuan file setiap suite diaudit keamanan atau seluruh workflow/kapabilitas produknya diuji. Keputusan reject/defer berdasarkan komponen yang dibaca dan kontrak operasional, bukan angka bintang atau kesimpulan kualitas seluruh produk.

## Skill terpasang dan aktivasi

Daftar otoritatif nama/path/provenance/positif/near-miss: [selection.json](selection.json). Root install semua tambahan: `C:/Users/Indrimeilla-PC/.omp/agent/skills/<nama>/`.

- Motion/video: hyperframes, hyperframes-cli, hyperframes-registry.
- Diagram/ilustrasi: diagram-design, anatomy, teardown.
- Interface: better-interface, better-accessibility, better-colors, better-layout, better-typography, better-ui, better-writing, unslop, antislop-layoutmobile.
- Enrichment/riset: search-first, scientific-critical-thinking, research-grants.
- Explicit-only vendor: break, explain-interface, interface-review, state-machine, variant.

**18 tambahan otomatis discoverable; 5 vendor-explicit.** Metadata discoverable bukan selalu-loaded body dan bukan izin eksekusi. Alternatif unslop/better-ui dapat dipilih dari brief tanpa meminta pengguna menghafal nama, tetap satu owner per tahap; rekomendasi manual tambahan pada laporan staging desain dikalahkan seleksi final parent sesuai kebijakan efektif 7 November. Flag explicit-only asli tidak dipatch.

Global AGENTS.md memuat rute/batas terfokus; SKILL-ROUTING.md memuat 23 pasangan positif/near-miss. Pilihan designer incumbent dan dukungan versi/framework tetap berlaku. State-machine Jakub adalah galeri state UI existing, bukan XState/state diagram. Tidak menambahkan alias/slash wrapper host lain atau router executable.

## Hyperframes CLI: bukti nyata

Launcher: `C:/Users/Indrimeilla-PC/.omp/agent/ecosystem/runtime/hyperframes/0.9.28/hyperframes.cmd`. Tidak ditambahkan ke PATH global. Launcher meneruskan argumen ke CLI upstream asli dengan env anak terisolasi, bukan adapter pengganti. Dependency runtime: 74 package terpasang; 126 package entries terkunci termasuk optional platform entries, dengan versions/SRI di package-lock.json. `--ignore-scripts` digunakan; tidak menjalankan lifecycle scripts.

- `--version`: 0.9.28, exit 0.
- `telemetry status --json`: enabled false, source HYPERFRAMES_NO_TELEMETRY; launcher nyata juga diperiksa.
- Fixture HTML/GSAP lokal dan dummy data, tanpa akun/secret/remote media supplied.
- `check --json`: exit 0, ok true; runtime/layout/contrast dijalankan. 1 warning lint nested_structure_needs_subcomposition; 1 warning layout rotation_pivot_drift saat objek memang ditranslasi sambil diputar. Motion sidecar check disabled/0 samples, tidak diklaim pass audit motion terpisah. Audio-none adalah info karena fixture sengaja tanpa suara.
- `render --quality draft --workers 1 --strict`: exit 0, 48/48 frame, 13 detik menurut output CLI. Ini satu smoke, bukan benchmark performa.
- ffprobe: H.264, 640×360, 24/1 fps, 48 frame terdekode, durasi 2.000000 detik, 28.772 byte.
- ffmpeg decode PNG contact sheet: exit 0; tiga frame dibuka dan diperiksa, objek terlihat berpindah dari kiri melalui tengah ke kanan. Tidak ada klaim full video production quality atau coverage semua efek.

Artefak: [MP4](hyperframes-smoke/local-motion.mp4), [contact sheet](hyperframes-smoke/contact-sheet.png), [check](hyperframes-check.json), [render](hyperframes-render.json), [media acceptance](hyperframes-media-acceptance.json).

**Batas penting:** compiler mengambil Inter dari Google Fonts publik. First render menggunakan cache default ~/.cache/hyperframes/fonts/inter; launcher final selanjutnya mengarahkan cache ke runtime/cache. Cache existing tidak dihapus. Telemetry off bukan no-egress proof. Ada resource 404 non-blocking di log; tidak menutupi warning atau menyatakan strict-all lulus. Tidak ada capture sesi pengguna, feedback/events, provider/model, cloud render/publish, service persisten atau akun baru. Chrome sementara milik proses render dan file server internal bukan layanan persisten. [USAGE.md](USAGE.md) menjelaskan perintah dan batas yang harus dibaca sebelum menggunakan runtime/helpers.

## Discovery, integritas dan routing yang diuji

| Pemeriksaan aktual | Hasil |
|---|---|
| Native inventory + RPC catalog root netral | 174 terdaftar, 159 terlihat, 15 hidden; 23 tambahan dengan mode tepat, tanpa warning. |
| Native inventory + RPC catalog Onboarding | 179 terdaftar, 163 terlihat, 16 hidden; lima alias repo existing dipertahankan. |
| Native skill URI | 23/23 resolved di kedua root: 46 resolusi dengan path source tepat. |
| Integritas incumbent | 151 SKILL.md cocok baseline SHA-256. |
| Integritas installed tambahan | 717 file installed, termasuk license copies, cocok byte/hash source staged asli. Staged desain 580 file dan science selected 26 file juga diverifikasi terhadap sumber. |
| Addy incumbent vs HEAD | 7/7 entrypoint cocok Git blob upstream. Tidak ada upgrade/duplikasi yang diperlukan. |
| Backup terarah | 4 backup cocok SHA-256 manifest; restore global nyata tidak dijalankan. |
| Synthetic native-agent routing | 8/8 first-pass cases lulus pada model existing openai-codex/gpt-6.1-sol; read-only grant, tanpa warning. |

Routing smoke mengamati **read skill nyata**, bukan hanya klasifikasi label: video → hyperframes + hyperframes-cli; ilustrasi fisik → anatomy; appraisal kausal → scientific-critical-thinking; grant requirements → research-grants; invocation explicit gallery → state-machine. Hover CSS bukan video, konsep XState bukan gallery, dan terjemahan nama dalam kutipan tidak mengaktifkan tambahan. Pada kasus hover/XState/quote tidak ada tambahan yang dibaca; ini bukan klaim tidak ada panduan incumbent yang digunakan. Output/reads/rubric disimpan pada intent-*.json dan [intent-acceptance.json](intent-acceptance.json).

Delapan kasus sintetis terhingga bukan benchmark buta, bukti peningkatan kualitas populasi, penghematan token/biaya, sandbox OS, maupun jaminan routing lintas model/paraphrase. Tidak seluruh 23 skill menjalankan workflow real-world. Helper Figma/Anatomy/Jakub/Unslop belum runtime-tested; capability mereka adalah guidance/source tersedia, bukan jaminan toolchain siap.

### Kegagalan awal dan koreksi

1. Discovery awal gagal `Missing diagram-design`: customDirectories direct-SKILL roots tidak dienumerasi; hanya grouped ECC/Hyperframes yang muncul. Diperbaiki pada akar layout install: seluruh 23 skill memakai native user skill directory existing. Tidak ada customDirectories tambahan tersisa, atau shim/payload yang diedit. [Diagnosis](first-pass-discovery-diagnosis.json).
2. Setelah seluruh 46 URI dan kedua RPC/catalog berhasil, assertion ringkasan harness mengasumsikan jumlah hidden sama di kedua root (15). Onboarding seharusnya 16 karena github/review-animations existing. Baseline root-spesifik 7 November membuktikan alias itu; assertion harness diperbaiki, hasil sukses yang sudah tersimpan digunakan untuk pemeriksaan ringkasan terkoreksi, tanpa mengulang skenario sukses. Bukan perubahan konfigurasi untuk menyembunyikan alias atau pelonggaran flag kandidat. [Native acceptance](native-acceptance.json).
3. Pengunduhan source Hyperframes mendapat HTTP 501 pada .gitkeep kosong. Hanya file kosong itu direkonstruksi sesuai size=0 dan Git blob SHA terverifikasi; 316 source files kemudian lengkap. Tidak ada fallback skill palsu.
4. Native find timeout pada dist besar; dilanjutkan literal grep. Kendala tool dilaporkan lewat report_issue. Sumber NIH policy live HTTP 403 dicatat worker; tidak ada klaim kebijakan live terverifikasi, gunakan sumber instansi terkini pada pekerjaan hibah nyata.

## Perubahan dan perlindungan existing

- 23 direktori skill baru, supporting payload original dan UPSTREAM-LICENSE; tidak menimpa nama incumbent.
- config.yml: hanya menambah lima manualSkills vendor; customDirectories akhirnya identik baseline, model/approval/memory tidak diubah.
- AGENTS.md: seksi ekspansi terfokus; SKILL-ROUTING.md: seleksi terbaru + tabel rute; ledger.json: record bertanggal dengan pointer bukti.
- Isolated Hyperframes runtime/package-lock/cache/config/launcher dan source/capability staging/measurement bertanggal.
- Tidak ada perubahan MCP, hooks, default provider/model, DPAPI secrets, native memory off, Supermemory, REA, integrasi browser existing, Impeccable atau host lain. Tidak ada deploy, push, upload, login, pembelian, trial billing, capture memori atau benchmark/load-test.

Original distributions dipertahankan; atribusi/lisensi dataset/runtime pihak ketiga tetap terpisah. Unsigned commit bukan otomatis berbahaya dan signature verified bukan sertifikasi aman. Checksums membuktikan identitas byte, bukan keamanan semantik.

## Menggunakan dan rollback

Mulai **sesi OMP baru** di proyek yang dipilih. Cukup jelaskan hasil: motion UI interaktif, MP4 lokal, diagram editorial, isometrik fisik, review interface atau appraisal riset. Tidak perlu menghafal semua nama. Untuk lima skill vendor explicit-only, agent dapat menawarkan command/opsi, tetapi tidak memuat otomatis untuk memintas flag.

Rollback selektif tanpa penghapusan data:

1. Tutup sesi OMP yang terkait; jangan menjalankan rollback bersamaan dengan pekerjaan pengguna.
2. Karantina hanya 23 direktori native baru yang tercantum selection.json di luar skill discovery; jangan hapus root skills atau direktori incumbent.
3. Hapus hanya lima entri manualSkills baru. Hapus seksi ekspansi 10 November dari AGENTS.md/SKILL-ROUTING.md dan property skillsExpansion20261110 pada ledger dengan merge terarah. Snapshot backup dapat dipulihkan utuh hanya jika belum ada edit pengguna setelah snapshot.
4. Simpan source/runtime/locks/artefak untuk provenance atau rollback maju; tidak ada layanan/PATH/hook untuk dicopot. Cache font shared tidak dihapus karena kepemilikan sebelum smoke tidak diasumsikan.
5. Jalankan native inventory/URI proses baru untuk membuktikan baseline; tidak perlu cloud/provider. Restore nyata belum dijalankan pada sesi ini.

Backup: `ecosystem/backups/skills-expansion-20261110/`; [manifest](backup-manifest.json), [backup acceptance](backup-acceptance.json), [rollback plan](rollback-plan.json). Detail final: [final-acceptance.json](final-acceptance.json).

## Indeks bukti

- selection.json, installed-files.json: nama, path native/staged, mode, source dan 717 hash.
- design-candidates.json/.md: 5 repo desain, 20 komponen dan risiko script; rekomendasi direct roots/manual tambahan staging dikalahkan selection final.
- science-antislop.json/.md: 183 keputusan katalog, lisensi, selected trees dan batas riset/hibah.
- ecc-manifest.json, engineering-research.json: alasan komponen ECC, pin service/framework, serta delta Addy.
- hyperframes-source-manifest.json, hyperframes-runtime-manifest.json: source Git blob, package SRI, locked dependencies, script/env/cache limits.
- verify-native.mjs dan verify-intent.mjs: harness native yang tersimpan. Tidak menggunakan vendor skill-creator runners atau viewer HTML.
- native-acceptance.json, intent-acceptance.json, final-acceptance.json: hasil aktual dan batasnya.
