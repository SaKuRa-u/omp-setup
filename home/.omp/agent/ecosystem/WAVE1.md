# Gelombang 1 — fondasi OMP

Laporan historis fondasi awal, bukan status operasional terkini. Status dan koreksi finalisasi ada di `ARCHITECTURE-AUDIT.md`, `ledger.json` dan `measurements/*-audit.json`. Klaim key belum tersedia, 17 skill, serta cloud menunggu konfigurasi di bawah merekam kondisi awal dan tidak boleh dibaca sebagai hasil uji terbaru. Penghapusan cloud tetap memerlukan persetujuan exact-target terpisah.

## Instalasi dan provenance

Sebelas skill upstream dipasang melalui skills CLI 1.7.2, `DISABLE_TELEMETRY=1`, target eksplisit Pi global, mode copy, hanya direktori skill terpilih dari checkout yang sudah diaudit. Tidak ada plugin, hook vendor, remote installer, engine Caveman, atau runner Claude yang diaktifkan.

- Pocock: grill-me, grilling, tdd, codebase-design, code-review; SHA `49dd158d1076134a641b33efb035946536778336`, MIT.
- Superpowers: systematic-debugging, verification-before-completion, receiving-code-review; SHA `bb92a77741419a4ab5f06e711a283343f1ada0c3`, MIT.
- Anthropic: skill-creator, mcp-builder; SHA `dbd4588f9e1033efb41dad4bef2f7947c8993d44`, Apache-2.0 untuk dua target ini, bukan seluruh katalog.
- Caveman: caveman saja; SHA `d262ab3882952a59312ff3537cd86d894523c5ab`, Apache-2.0 dengan historical MIT notices.

Path instalasi upstream: `C:/Users/Indrimeilla-PC/.agents/skills/<nama>`. Checkout berlisensi tetap tersedia di `sources/`; ledger rinci di `ledger.json`. Jangan auto-update checkout atau paket terpin.

Dua skill integrasi primer lokal berada di `~/.omp/agent/skills/`: `supermemory-v5` dan `context7-docs`. Keduanya memandu wrapper yang nyata, bukan klaim koneksi cloud. Keduanya bukan paket custom celah Gelombang 5.

Runtime `runtime/package-lock.json` mengunci dependensi: `skills@1.7.2`, `supermemory@5.0.2`, `ctx7@0.6.1`, `@upstash/context7-mcp@4.4.1`, compiler `typescript@5.9.3`. Instalasi memakai `--ignore-scripts --no-audit --no-fund`; tidak ada lifecycle installer yang dijalankan. SDK Supermemory memiliki npm gitHead `dc1cf8595095b3358867b5feb11971d1b39aca80`. Rilis MCP Context7 menunjuk checkout resmi `3cdd8d4add9747c2f59d03c83ce862cc0825c4bb`. SHA rilis CLI Context7 tidak disimpulkan sama; integrity npm ada di lockfile.

## Routing dan risiko yang ditahan

`~/.omp/agent/AGENTS.md` memuat matriks satu pemilik, alias Skill tool ke `skill://`, pembatasan fan-out, kebijakan Caveman ringan, privasi memory, dan permission gate. File ini sebelumnya tidak ada dan sudah terbukti dimuat OMP pada startup baru.

Dua skill desain lama, `design-taste-frontend` dan `redesign-existing-projects`, dikecualikan lewat `skills.ignoredSkills` OMP. Salinan/symlink untuk alat lain tidak dihapus. Source user OpenCode/Codex tidak diaktifkan wholesale. Model/theme/preferensi pengguna yang berubah selama pengerjaan dipertahankan.

Pembatasan penting hasil audit statis:

- `skill-creator` mempunyai runner khusus Claude, viewer dengan jalur HTML/script injection, CDN eksternal, dan penghentian proses berdasarkan port. Evaluator/optimizer/viewer tersebut bukan workflow OMP default; tidak dijalankan.
- `mcp-builder` membawa runner evaluasi Anthropic berbayar dan eksekusi tool MCP; tidak diaktifkan otomatis.
- `find-polluter.sh` menyembunyikan output/kegagalan test dan memiliki masalah path whitespace. Jangan pakai sebagai bukti passing.
- External tracker/review content membawa risiko prompt injection; diperlakukan sebagai data, tidak memberi otorisasi.
- `caveman-stats` bergantung pada transcript/history/config Claude sehingga tidak dipasang. Review/commit/cavecrew Caveman dan skill Superpowers yang bersaing tidak dipasang.
- Caveman tetap dipertahankan sesuai keputusan pengguna. Belum ada bukti penghematan umum dibanding instruksi singkat biasa.

## Bukti runtime

Data terstruktur: `measurements/wave1.json`.

- OMP 18.11.0 menemukan 17 skill, termasuk alias tersembunyi yang tetap callable. Seluruh 11 URI skill upstream baru berhasil di-resolve melalui OMP `read`; `/review` native ditemukan.
- Listing metadata aktual: 392 token O200k, 0,0784% dari window 500.000; Fase 0 154 token. Estimasi konteks startup final 8.386 token; sebelumnya 6.559. Angka startup adalah estimasi OMP, bukan usage provider.
- Startup final sampai ready: 3,697 detik. Startup pertama setelah instalasi 9,172 detik. Ini observasi tunggal dengan keadaan cache berbeda, bukan median/perbaikan performa kausal.
- Smoke A: fungsi chunk menunjukkan RED nyata lalu GREEN 9 assertion. Smoke B: TTL sebelum perbaikan 3/7 lulus, sesudah 7/7. Smoke C: command `/review` nyata terhadap diff sintetis menemukan P1; eval empat kasus membuktikan dua pemberian akses tidak sah.
- Negative-trigger satu Q&A `2+2`: jawaban `4.`, hanya Caveman dibaca; tidak membaca skill domain/workflow lain.
- A menemukan pembacaan systematic-debugging yang tidak perlu untuk RED yang memang diharapkan. Routing diperjelas; prompt/model/toolset sama diuji lagi. Debugging tidak lagi dibaca, 9/9 tetap lulus. Total token satu pasangan turun 46.160 menjadi 41.259, tetapi tool call naik 5 menjadi 6 karena referensi TDD dibaca. Jangan menggeneralisasi saving dari satu pasangan atau mengabaikan variasi cache/output.
- 35 pemeriksaan offline lulus: filter secret, batas namespace/fakta, default-deny write, manifest tamper/scope/action, penolakan apply tanpa approval dan receipt salah scope, query publik Context7, redaksi key aktual yang tidak merusak contoh auth publik, error bersih, kegagalan koneksi loopback, dan round trip DPAPI dalam RAM.
- Typecheck seluruh file integrasi/smoke lulus dengan TypeScript 5.9.3, tanpa emit.
- Memory, CLI Context7, dan launcher MCP berhenti bersih ketika key belum tersedia. Ini bukan uji autentikasi live.

Smoke kode berlangsung di RAM dan native review memakai supplied diff, bukan perubahan aplikasi/repo nyata. Fase 0 memakai warm audit context, sedangkan smoke Gelombang 1 memakai sesi baru; hasilnya bukan A/B bersih untuk seluruh paket skill.

## Approval efektif

`config.yml` sekarang `tools.approvalMode: write` dan `tools.approval.eval: prompt`. Rule Bash berurutan meminta approval untuk compound/substitution patterns, mengizinkan diagnosis terpilih, dan membiarkan eksekusi lain melewati gate mode native. Nilai efektif sudah dibaca kembali melalui `cfg://`.

Ini BUKAN sandbox filesystem/network. Approval semantik untuk penghapusan, biaya, terraform apply, perubahan cluster/firewall/jaringan dan overwrite non-OMP tetap wajib pada titik risiko. Jangan melintasi gate melalui Eval, subprocess atau konfigurasi sementara.

Behavior smoke di atas dijalankan sebelum gate Eval diperketat. Sesi headless tidak dapat menyetujui `eval: prompt`; untuk benchmark berikutnya perlukan grant benchmark bertarget yang disetujui manusia, bukan memaksa yolo atau override diam-diam. Pemeriksaan startup/resolusi tidak mengirim prompt inferensi dan tidak membutuhkan override tersebut.

## Secret dan Supermemory

`runtime/credentials.ps1` menyimpan sekali dengan DPAPI CurrentUser dan ACL pengguna/SYSTEM. `runtime/lib/secrets.ts` mengambil key ke proses pemanggil; tidak membuat environment global. Crypto round trip telah diuji dengan string sintetis dalam RAM; penyimpanan/dekripsi key nyata belum diuji karena belum ada key.

Intake chat: manusia mengirim baris berlabel `SUPERMEMORY_API_KEY=` atau `CONTEXT7_API_KEY=`. Pemilik sesi menjalankan `runtime/import-chat-key.mjs` terhadap path sesi saat itu. Utility membaca hanya pesan user terbaru dalam sesi OMP yang ditunjuk, menyalurkan key lewat stdin ke DPAPI, tidak memasukkan key ke argv, output, file plaintext baru atau tool call. Tidak overwrite key yang sudah tersimpan. Pesan chat asli tetap bagian dari transcript platform; jangan menggandakannya ke log/tool argument/memory.

Wrapper `runtime/memory.ts` memakai SDK TypeScript 5.0.2 dan API v5 namespace-first. PATCH update mengganti dokumen yang sama; capture tidak diam-diam append fakta ke ID yang sudah ada. Default `memory-policy.json` menutup semua project/global writes. Recall proyek+global dua request, `searchMode: memories`, `threshold: 0.5`, bounded output/timeout/retry. `dynamic` saja; pending tidak dianggap done.

Forget preview menampilkan kandidat terfilter yang terbatas dan menyimpan manifest IDs-only. Apply memakai exact reviewed IDs, bukan seleksi semantik ulang. Approval receipt harus mencocokkan digest, aksi, namespace, IDs, timestamp, approver dan referensi persetujuan manusia. Assistant hanya boleh menulis attestation setelah izin chat bertarget yang nyata. Delete-doc memakai gate terpisah. Receipt adalah attestation lokal, bukan identitas kriptografis.

Runner live resumable:

```text
bun C:/Users/Indrimeilla-PC/.omp/agent/ecosystem/runtime/memory-acceptance.ts --state <new-local-state-file>
```

Jalankan hanya sesudah key dan izin request uji tersedia. Runner menulis fakta sintetis ke `omp_selftest`, menunggu done, memakai subprocess baru untuk recall, mengoreksi, memeriksa isolasi, lalu BERHENTI pada preview forget untuk izin manusia. Tidak ada instant atau cleanup penghapusan otomatis. Placeholder path dalam contoh harus diganti dengan file state baru yang nyata.

`memory.ts usage` memberi sumber billing resmi dan endpoint org-admin, bukan klaim saldo sudah diperiksa. Live write/dreaming/recall/correction/isolation/forget/delete/billing belum teruji.

## Pembanding native

`runtime/native-memory-selftest.yml` adalah overlay process-only: Mnemopi, DB/bank `omp_selftest_native` terpisah, `llmMode:none`, no embeddings, autoRecall/autoRetain off. Startup dan `/memory stats` aktual berhasil tanpa model turn: Working/Episodic/Triples masing-masing nol, stderr kosong. Global `memory.backend` tetap off. Ini readiness saja, BUKAN bukti parity capture/recall/correction dengan cloud. Jangan menjalankan comparator bersamaan dengan request wrapper cloud.

## Context7

Belum ada route Context7 yang diaktifkan di OMP; MCP user config belum dibuat. Wrapper CLI dan MCP stdio sama-sama siap key. Keduanya hanya memakai paket lokal terpin, child-only credential environment, input query generik, timeout dan error bersih. CLI tidak mengizinkan vendor setup/login/install/upgrade; MCP hanya dua tool dokumentasi dan metode protokol yang dibutuhkan. Telemetry CLI/OTEL anak dinonaktifkan.

Sesudah intake key dan izin uji:

```text
node C:/Users/Indrimeilla-PC/.omp/agent/ecosystem/runtime/context7-acceptance.ts --live --route both
```

Runner menguji discovery, resolve/query Node.js (runtime yang nyata tersedia, bukan stack proyek rekaan), dan library tidak ditemukan. `--timeout-ms` membatasi deadline; skenario deadline pendek harus dicatat terpisah dari live server outage. Byte hasil bukan token; hitung dengan tokenizer offline sebelum memilih satu route. Belum ada hasil autentikasi, absent-library, timeout live, atau pemilihan jalur. Jangan aktifkan dua route sekaligus.

## Rollback dan langkah berikutnya

Cadangan sebelum perubahan: `backups/wave1/config.yml` dan `backups/wave1/agents-skill-lock.json`. Rollback aman pertama adalah exclude nama skill di OMP. Gabungkan hanya key milik perubahan ini; jangan menimpa konfigurasi terbaru dengan backup lama secara buta karena preferensi model pengguna dapat berubah. Penghapusan data, key, folder atau resource tetap memerlukan persetujuan.

Berikutnya memerlukan keputusan/key pengguna: intake kedua key, izin request sintetis normal yang mengonsumsi kuota vendor, acceptance cloud, review exact forget/delete candidates, lalu perbandingan memory dan pemilihan satu jalur Context7. Instant, paid compute tambahan, dan perubahan infra tidak termasuk izin itu. Gelombang 2 menunggu Gelombang 1 stabil dan persetujuan tersendiri.
