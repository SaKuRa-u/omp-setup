# Panduan OMP: proyek baru dan repository existing

Audit fondasi: 15 Oktober 2026; perluasan domain/REA: 18 Oktober; review/keamanan: 19 Oktober. Penerapan proposal skill/MCP: 20 Oktober; snapshot historis ada di `measurements/upgrade-20261020-acceptance.json`. Routing ide/workflow diperbarui 21 Oktober melalui instruksi lokal OMP, tanpa upgrade host, skill vendor, atau MCP; bukti awal di `measurements/workflow-routing-20261021.json`, hasil acceptance lanjutan di `measurements/workflow-routing-20261021-resume.json`.

### Status global setelah penerapan proposal 20 Oktober (snapshot historis)

- **Scope:** pengguna OMP default-profile, lintas repository dan sesi baru. Tidak mengubah konfigurasi host lain, akun OS lain, named profiles, atau project override.
- **Impeccable:** distribusi OMP asli 4.6.0 terpin di `~/.omp/agent/skills/impeccable`, 57 file vendor ditambah lisensi. Salinan bersama 4.5.2 tetap ada untuk host lain; alias `agents/impeccable` dikecualikan di OMP. Baca `IMPECCABLE-OMP.md`: manual-context/gate existing tetap berlaku; engine, detector, hooks, pin/unpin dan live tidak diaktifkan.
- **Context7:** MCP resmi 4.4.4 memakai runtime/lock terisolasi `runtime/context7/4.4.4/`, tetap melalui launcher DPAPI existing dan hanya satu route aktif. Runtime 4.4.1 disimpan sebagai rollback, bukan server kedua.
- **Dipertahankan:** 44 skill keluarga stabil tidak mempunyai perubahan artefak terpilih yang memberi manfaat upgrade; empat host/discovery skill ditelusuri ke source atau manifest distribusi aktual. REA 6.5.0/skill 42 tetap karena 6.7.0 memerlukan migrasi kontrak Evidence/caller, bukan penggantian otomatis.
- **Semgrep:** tetap 1.181.0 dengan tiga tool lokal. AST kini sudah dieksersis; rule sintetis menandai hanya `unsafe.py` baris 2, tidak `safe.py`. Warning dependency tetap ditampilkan; jangan override pin `mcp==1.29.0` atau mengaktifkan HTTP untuk menghilangkannya. Advisory stateful-HTTP MCP yang ditinjau secara eksplisit tidak mencakup stdio.
- **Bukti:** dua cwd masing-masing menemukan 52 skill dan tiga MCP; delapan sesi model sintetis sebelum STOP lulus owner/negative/collision yang diuji, termasuk satu core Ponytail dan alias RPC/headless. Tidak diulang setelah lanjut. Tambahan tanpa inferensi: 18 tes adapter Ponytail, 36 safeguard offline melalui Bun, Context7 public resolve/query/missing/invalid/timeout, serta REA open/inventory/close pada ZIP inert.
- **Batas:** belum ada aplikasi terpilih untuk acceptance UI/a11y nyata. Figma/Storybook/shadcn/axe tetap kondisional per aplikasi. Full Cloudflare audit tetap terblokir oleh target/scope/budget serta kontrak sandbox/validator/promotion; tidak diganti review parsial. Source acquisition awal find-skills/webapp-testing dan lisensi skill Orca standalone tidak ditebak.

**Rollback terpilih:** backup di `backups/upgrade-20261019/`. Untuk Context7, pulihkan `mcp/context7.ts` dan `mcp/context7-docs-SKILL.md` ke lokasi asalnya; registrasi dan DPAPI tidak berubah, handshake runtime 4.4.1 telah diuji. Untuk Impeccable, pulihkan routing/config terpilih dan pindahkan hanya direktori kandidat OMP keluar root discovery. Pergantian discovery 4.6.0 → shared 4.5.2 → 4.6.0 telah diuji dan kandidat dipulihkan. Jangan menjalankan cleanup global vendor atau menghapus credentials/data. Mulai sesi baru setelah cutover/rollback; salinan server yang sudah berjalan tidak dijanjikan hot-reload.

## 1. Yang otomatis dan yang perlu diminta

Anda cukup membuka OMP pada root proyek dan memberi tugas. Skills global tidak perlu dipasang ulang per repository. Namun, seluruh pipeline bukan proses background yang otomatis berjalan saat folder dibuka.

| Bagian | Perilaku |
|---|---|
| Konfigurasi dan metadata skills | Dimuat saat startup. Isi skill dibaca ketika relevan. |
| Pemilihan skill | Agen memilih skill yang relevan tanpa menunggu slash command; bukan semua pipeline dijalankan untuk setiap tugas. |
| Ide/proposal baru | Otomatis membaca `grilling`, tanpa slash command; kedalaman mengikuti risiko, fakta diperiksa sebelum pertanyaan keputusan. |
| Ponytail | Ekstensi resmi OMP menginjeksi aturan setiap turn, default `full`; review/audit kualitas dipilih sesuai tugas. |
| Keamanan | Skill Cloudflare asli otomatis dibaca sebagai guidance saat relevan; audit penuh tetap memerlukan scope, budget, dan lingkungan yang memenuhi kontrak upstream. |
| Semgrep MCP | Tiga tool lokal tersedia ketika pemeriksaan statis terfokus menambah bukti; tidak ada scan otomatis pada setiap edit. |
| Context7 MCP | Tersedia melalui konfigurasi startup. Dokumentasi dicari ketika diperlukan, bukan pada setiap prompt. |
| Gate Impeccable | Wajib diperiksa oleh agen pada awal pekerjaan UI di proyek terpilih. Ini workflow, bukan hook pembukaan folder. |
| Tests, build, browser, review | Dijalankan sesuai tugas dan izin, bukan sekadar karena repo dibuka. |
| Memory cloud | Capture/recall melalui wrapper dan allowlist proyek. Tidak menyimpan seluruh percakapan otomatis. |

**Bedakan tempat mengetik:**
- Blok `powershell`: jalankan pada terminal PowerShell.
- Blok `text`: kirim sebagai pesan di dalam OMP.
- `/skill:nama instruksi` adalah perintah di OMP, bukan PowerShell. Contoh per tahap di bawah bersifat opsional, bukan urutan pemanggilan wajib.

### 1.0 Panduan domain Agency Agents

17 panduan OMP-only menggunakan distribusi asli MIT `msitarzewski/agency-agents`, commit `4e3ac3ca6604c75113f52c695dbddcc7af928b46`, melalui konverter resmi tanpa patch. Hanya allowlist proposal diregistrasikan; sumber lengkap `sources/agency-agents-4e3ac3ca/` bukan seluruhnya skill aktif. Mulai sesi baru untuk discovery; bukti dan batas acceptance ada di `measurements/agency-agents-20261021.json`.

| Kebutuhan nyata | Skill pendukung |
|---|---|
| Kontrak API publik/partner | `agency-api-platform-engineer` |
| RPO/RTO, recovery dan lock budget migrasi | `agency-database-reliability-engineer` |
| CLI, pipe, stdout/stderr dan exit code | `agency-developer-tooling-engineer` |
| ICU/CLDR, Unicode, RTL dan fallback | `agency-internationalization-engineer` |
| OAuth/OIDC, session dan lifecycle akses | `agency-identity-access-engineer` |
| Idempotency uang, webhook dan reconciliation | `agency-payments-billing-engineer` |
| Peta data pribadi, consent, retention/deletion | `agency-privacy-engineer` |
| Dokumentasi developer, tutorial/reference | `agency-technical-writer` |
| Rencana riset pengguna dan data yang sah | `agency-ux-researcher` |
| Konsistensi voice/tone dan brand incumbent | `agency-brand-guardian` |
| WCAG, keyboard dan assistive technology | `agency-accessibility-auditor` |
| Kontrak endpoint, negative cases/side effects | `agency-api-tester` |
| Baseline/workload dan eksperimen performa | `agency-performance-benchmarker` |
| Threat model dan trust boundary | `agency-security-architect` |
| Owner, TTL/revocation dan rencana rotasi | `agency-secrets-credential-hygiene-engineer` |
| Sintesis sumber teknis/circular citations | `agency-research-synthesist` |
| File PDF, PPTX, DOCX atau XLSX yang diminta | `agency-document-generator` |

Contoh biasa: “Tinjau kontrak API ini dan dampak breaking change-nya; gunakan panduan domain relevan, jangan mengubah kode.” Tidak harus slash command. Pilihan eksplisit tetap `/skill:agency-api-platform-engineer ...`.

Ponytail, Impeccable, TDD/debugging, reviewer keamanan, runner proyek/e2e/webapp-testing serta tahap ARS tetap owner existing. Tidak ada rantai semua persona/reviewer otomatis. SLO dan arsitektur mengikuti requirement proyek, bukan template; pengalaman, angka contoh dan klaim memory bukan hasil aktual. Riset pengguna memerlukan data/consent nyata; simulasi bukan wawancara.

Document Generator tidak memasang library/font/Office/viewer/validator. Saat format aktual diminta, pilih runtime proyek, hasilkan file dan script sesuai kebutuhan, buka/render serta periksa data/layout, lalu laporkan batasnya. Ekspor bukan sertifikasi PDF/A/PDF/UA/WCAG. Tidak menjalankan macro/formula tak tepercaya, upload rahasia, instalasi global atau fallback file palsu.

72 persona lain hanya referensi source; 10 tidak diregistrasikan. SEO Specialist tidak dipasang: gunakan Google Search Central terkini, tanpa disavow atau janji ranking otomatis. NEXUS/hook/scanner/provider/memory baru tidak diaktifkan; gerbang izin live/paid/destruktif tetap berlaku.

Rollback: pulihkan hanya AGENTS/panduan/ledger dari `backups/agency-agents-20261021/`, pindahkan 17 direktori instalasi ini keluar discovery ke backup, lalu mulai sesi baru. Jangan menghapus skill/data existing atau rewrite Git history.


### 1.1 Cara utama: satu instruksi end-to-end

Setelah membuka proyek, cukup sampaikan ide atau tugas dalam bahasa biasa. Setiap ide/proposal baru pengguna otomatis masuk `grilling`; tugas yang sudah disepakati diteruskan ke tahap relevan tanpa memanggil ulang setiap skill.

**Batas grilling:** agen menguji asumsi dan memperjelas keputusan, lalu meminta konfirmasi kesepahaman. Itu berbeda dari izin implementasi; satu jawaban eksplisit boleh mencakup keduanya. “Setuju desainnya” saja bukan izin implementasi. Jika Anda sudah mengatakan “setuju dengan rencana ini, implementasikan”, agen melanjutkan dalam scope tanpa meminta persetujuan identik lagi.

```text
Bantu saya mengembangkan [deskripsi proyek atau perubahan].

Mulai dengan memeriksa repository dan memperjelas kebutuhan.
Setelah kebutuhan disepakati, susun rencana implementasi dan,
jika ada UI, arah desain menggunakan Impeccable.

Minta persetujuan saya sebelum implementasi pertama.
Setelah saya menyetujui rencana dan arah desain, lanjutkan end-to-end
tanpa menunggu saya memanggil setiap skill:
- Pilih dan baca skill yang relevan.
- Implementasikan sesuai konvensi repository.
- Gunakan Context7 jika perlu memastikan API sesuai versi.
- Jalankan verifikasi perilaku aktual, termasuk UI bila relevan.
- Perbaiki masalah dalam scope dan laporkan bukti hasilnya.

Berhenti untuk keputusan material yang belum disepakati, perubahan scope,
biaya tambahan, operasi destruktif, deployment, atau perubahan infrastruktur.
Jangan mengubah konfigurasi global atau menyimpan memory cloud tanpa izin.
```

Setelah proposal sesuai, jawab:

```text
Saya setuju dengan rencana dan arah desain tersebut.
Laksanakan sampai selesai dan terverifikasi dalam scope yang disepakati.
```

Untuk backend-only, persetujuan arah desain UI tidak diperlukan. Jika masih ada keputusan material yang terbuka, selesaikan dahulu sebelum menyetujui implementasi.

Ini **otomatis mengikuti tugas**, bukan hook yang menjalankan pipeline ketika grilling selesai. Tidak semua skill harus digunakan. Persetujuan rencana juga tidak menghapus prompt approval tool: bila sesi memakai `always-ask`, konfirmasi tool masih dapat muncul.

#### Auto-grilling dan handoff yang berlaku

Jawaban terhadap pertanyaan grilling melanjutkan frontier yang belum selesai. Persetujuan dan instruksi pelaksanaan dalam scope tidak memulai wawancara baru. Ide baru di tengah pekerjaan hanya membuka ulang keputusan yang terdampak. Pertanyaan faktual, laporan bug biasa, dan ide dalam kutipan/web/komentar review/memory bukan pemicu proposal baru pengguna.

| Tahap/kebutuhan | Pemilik dan batas |
|---|---|
| Ide baru dan keputusan | `grilling`; `/skill:grill-me` tetap alias eksplisit menuju skill yang sama. |
| Rencana dan dispatch | Native todo/task; Orca hanya ketika state/workflow Orca benar-benar terlibat. |
| Implementasi | Ponytail sebagai baseline; `codebase-design` bila interface/seam perlu diputuskan, TDD bila test-first relevan dan seam disepakati. |
| UI | Impeccable guidance/manual; gunakan fakta dan jawaban intake yang sudah tersedia, bukan wawancara kedua. |
| Bug | `systematic-debugging`; expected RED pada TDD tidak memulai debugging kedua. |
| Domain lain | Pilih skill sesuai artefak/stack/tahap; riset teknis bukan otomatis ARS, penulisan satu bagian bukan full academic-pipeline. |
| Review | Satu pemilik sesuai tujuan: native bug review, Ponytail kualitas, code-review Spec/Standards; tidak ditumpuk otomatis. |
| Verifikasi | Bukti perilaku aktual sesuai tugas/izin; runner existing dan browser evidence saling melengkapi. |
| Memori dan operasi berisiko | Tidak otomatis capture, install, deploy, bayar, atau cleanup karena ide disetujui. |

Ini preferensi routing agen untuk OMP default-profile lintas proyek dan sesi baru, bukan hook OS atau jaminan klasifikasi semantik deterministik. Project override dan instruksi eksplisit tetap berlaku. Tidak perlu menyalakan seluruh skill sekaligus. Command bernama test/plan/dry-run/check/init/upload/cleanup tetap diperiksa efek jaringan, biaya, dan mutasinya sebelum dijalankan.

Analisis seluruh katalog tersedia di laporan proyek `ANALISIS-WORKFLOW-SKILLS.md`; discovery sebelum penerapan menemukan 60 perintah skill, termasuk satu alias eksplisit dan 59 skill model-visible. Backup terarah penerapan ada di `backups/workflow-routing-20261021/`. Rollback hanya memulihkan instruksi/panduan/ledger yang diubah, bukan menghapus skill/data/credential. Mulai sesi OMP baru setelah perubahan; hot reload sesi lama tidak dijanjikan.

**Bukti penerapan dan acceptance 21 Oktober:** sesi baru memuat aturan; katalog tetap 60 perintah/59 model-visible. Gabungan run awal dan lanjutan menyelesaikan 12 kelompok skenario/16 turn sesuai ekspektasi routing, termasuk continuation/approval/delta, expected RED, kutipan, existing runner, review saja, serta respons gerbang operasi/memory. Tiga kegagalan kuota awal tetap dicatat sebagai histori, bukan dihapus atau dianggap lulus. Integritas 60 SKILL.md vendor serta config/MCP/memory policy tidak berubah. Hasil terkini ada di `measurements/workflow-routing-20261021-resume.json`; ini pengujian routing sintetis dengan tool read-only, bukan sertifikasi keamanan atau jaminan semua sesi mendatang.


Gunakan bagian 2 atau 3 untuk membuka proyek. Sesudahnya, pilih instruksi end-to-end di atas **atau** contoh per tahap jika ingin mengendalikan tahap tertentu; tidak perlu mengirim keduanya.

### 1.2 Penambahan skills dan REA

Enam skill tambahan dipasang khusus OMP di `~/.omp/agent/skills`, bukan ke konfigurasi OpenCode atau root global bersama. Metadata ditemukan pada startup; mulai sesi OMP baru agar daftar skill dan MCP terbaru dimuat. Pemilihan skill bukan hook otomatis atau izin menjalankan contoh.

REA sudah memiliki skill `reverse-engineer-anything` versi 42 dan CLI/server 6.5.0. Registrasi baru hanya di `~/.omp/agent/mcp.json`; backup `mcp.json.rea.backup`, entri Context7 dipertahankan, server instructions tidak dimasukkan. Smoke MCP nyata memuat 207 tool dan menganalisis satu file JavaScript sintetis tanpa menjalankan kode target. Hopper/Ghidra/IDA/JADX belum tersedia; kemampuan dekompilasi native/Android tidak ikut diklaim.

```text
/skill:reverse-engineer-anything Periksa artefak [path target milik saya]
untuk menjawab [pertanyaan spesifik]. Mulai statis; jangan jalankan target
atau memasang analysis engine tanpa izin terpisah.
```

OMP dapat mengembalikan startup RPC setelah jendela discovery MCP awal 250 ms sementara server lain masih terhubung. Health check lokal menunggu percobaan koneksi awal selesai dengan override proses sementara, bukan mengubah timeout global. Skill/registrasi selaras tidak membuktikan tool sudah dimount dalam sesi lama.

### 1.3 Ponytail dan keamanan upstream resmi

Pembaruan 19 Oktober memasang plugin Ponytail lengkap sesuai adapter OMP, seluruh skill Cloudflare beserta companion files/lisensi, dan MCP dari CLI Semgrep resmi 1.181.0. Tidak membuat skill/MCP pengganti atau mengubah konfigurasi Claude/Cursor/Codex. Startup baru menemukan 52 skill; Context7, REA, DPAPI dan memory-off dipertahankan. Mulai sesi baru untuk memuat ekstensi serta katalog terbaru; sesi yang sudah berjalan tidak dijanjikan memperoleh semuanya secara hot-reload.

Ponytail aktif tanpa perintah tambahan. `/ponytail status` memeriksa mode; `/ponytail lite`, `/ponytail full`, `/ponytail ultra`, dan `/ponytail off` mengubah mode sesi. Jangan menjalankan `default` untuk menimpa konfigurasi Ponytail bersama tanpa izin. Band/board, telemetry biaya/reuse, dan impor sesi Claude bukan fitur adapter OMP. `/ponytail-gain` adalah data benchmark upstream, bukan penghematan proyek ini.

Alias `/ponytail-review` bekerja dalam smoke RPC OMP. Pada `omp -p`, alias ekstensi dapat berhenti tanpa menjalankan model; gunakan perintah skill resmi `/skill:ponytail-review ...` untuk headless/otomasi. Ini batas host/upstream yang teramati, bukan alasan memodifikasi plugin atau memasang wrapper sendiri.

Semgrep dipasang pada venv khusus OMP menggunakan 67 distribusi binary-only yang dikunci hash. Tool aktif hanya bahasa, AST, dan scan dengan rule eksplisit; tracing, metrics, version check, token aplikasi, findings elicitation, auto/remote scan, cloud findings, supply-chain, serta tool schema registry dimatikan. Gunakan rule upstream yang diperiksa dan sampel source dalam scope tugas. Startup tetap mengambil metadata OAuth publik dari semgrep.dev; ini bukan mode offline. Jangan auto-invoke setup/login/Pro/Guardian atau resource registry. Warning dependency tentang `lifespan` belum diperbaiki upstream; handshake dan smoke scan positif/negatif berhasil tanpa menyembunyikan warning.

Rollback non-destruktif: `omp plugin disable --scope user ponytail@ponytail`, nonaktifkan hanya entri `semgrep` jika diperlukan, lalu mulai sesi baru. Skill Cloudflare dapat dikecualikan melalui `skills.ignoredSkills`. Backup terpilih tersedia di `backups/review-security-20261019/`; jangan menjalankan cleanup global vendor atau menghapus credential/data.




### 1.4 E2E aplikasi dan riset/penulisan akademik

Penambahan 21 Oktober: tujuh skill original global khusus OMP, tanpa mengaktifkan plugin/hook vendor. Dua startup nyata—dari proyek Onboarding dan cwd pengguna—menemukan **59 skill**, termasuk tujuh tambahan; tiga MCP existing tetap tersedia. OMP yang teramati saat verifikasi adalah **18.12.3**; tugas ini tidak menjalankan upgrade host.

| Kebutuhan | Skill yang dipilih otomatis sesuai tugas |
|---|---|
| “Cek aplikasi”, QA, E2E web/mobile | `e2e`; `webapp-testing` untuk pemeriksaan surface browser |
| Merumuskan pertanyaan dan menyintesis literatur akademik | `deep-research` |
| Merencanakan, menulis, menyunting dan merevisi paper | `academic-paper` |
| Review manuskrip advisory | `academic-paper-reviewer` |
| Alur riset sampai finalisasi yang memang diminta | `academic-pipeline` |
| Screening rekaman/protokol yang diminta eksplisit | `sr-screener` |
| Metadata referensi, DOI, deduplikasi dan BibTeX | `citation-management` |

**Sesuai pilihan pengguna: skill global, runner per proyek.** “Cek aplikasi” menjadi izin rutin untuk memeriksa proyek, memuat skill, memasang dependency/runner lokal jika dibutuhkan, dan menjalankan flow nyata. Reuse suite Playwright/Cypress/e2e yang sudah sesuai; jangan migrasi diam-diam. Tanpa runner yang sesuai, baseline yang ditinjau adalah `e2e@0.21.2` + `@e2e-dev/web@0.15.2`, dev dependencies dan lockfile proyek, Node `^22.22.3 || >=24.8.0`, model-free, cache off, serta `E2E_TELEMETRY_DISABLED=1` pada proses anak. Gunakan executable lokal yang terpin; jangan `init --yes`, unpinned npx, atau mendaftarkan MCP ke host lain.

Tidak ada runner/browser aplikasi dipasang dalam tugas ini karena belum ada aplikasi terpilih. Folder dokumen bukan target untuk scaffold aplikasi. Produksi, operasi destruktif, data pelanggan, pembayaran, layanan/model/cloud berbayar, upload dan konflik overwrite tetap membutuhkan izin khusus. Framework tidak dijalankan saat membuka folder; otomatis berarti routing agen ketika tugas diminta, bukan daemon atau hook OS.

ARS **v3.23.1 / `4c5449017f46eb64d112a301d4817d22c7c9f3d9`** dibatasi ke **akademik/personal nonkomersial**, sesuai jawaban pengguna dan lisensi CC BY-NC 4.0. Snapshot utuh berada di `ecosystem/sources/academic-research-skills-4c544901/`; `skills.customDirectories` menunjuk root ini, bukan masing-masing folder anak, karena scanner native membaca `*/SKILL.md`. Lima entry point memakai body/reference original dan native OMP read/task/ask/web. Pi wrapper, Claude hooks, `/ars-*`, update checker, cross-model dan provider tambahan tidak diaktifkan; guard Claude tidak menjadi enforcement OMP. Screening dual-blind skala besar belum divalidasi.

`e2e` memakai skill original dari commit rilis **`393005aa6952eaef62886cd03c8d8060f8f05a4f`**, Apache-2.0 dengan NOTICE. `citation-management` dari K-Dense **`593377bb048752abb0152deab9fbb1083a6087df`**, MIT dengan lisensi dan metadata sitasi original. Helper Python terpasang sebagai source, bukan otomatis dijalankan. Tidak ada Pandoc/tectonic, scholarly, API key atau installer tambahan.

**Bukti perilaku:** smoke OMP membaca `e2e` dan `webapp-testing` pada “cek aplikasi”, lalu melaporkan tidak adanya aplikasi tanpa mengarang hasil E2E. Smoke perencanaan paper membaca `academic-paper` dan protokol `plan`, lalu memberi tiga pertanyaan intake tanpa full pipeline, web, penulisan file atau fan-out. Ini membuktikan dua kasus routing, bukan keandalan universal atau kelulusan aplikasi/manuskrip nyata. Integritas: 35 file distribusi E2E/sitasi identik dengan sumber; 2.845 blob ARS cocok dengan commit original.

Turnitout tidak dipasang: bukan skill, engine tidak tersedia pada source publik, lisensi proprietary, dan klaim bypass/privasi tidak terverifikasi. Penulisan mengutamakan sumber, makna, sitasi, keterbacaan dan disclosure, bukan pengelabuan detektor.

Laporan riset: `Onboarding/RISET-SKILLS-E2E-AKADEMIK.md`. Bukti: `ecosystem/measurements/research-e2e-20261021.json`. Mulai sesi OMP baru untuk discovery terbaru; hot-reload sesi lama tidak dijanjikan. Rollback: pulihkan routing dari `backups/research-e2e-20261021/AGENTS.md`, kembalikan `skills.customDirectories` ke nilai sebelumnya (`[]` pada pemasangan ini), dan pindahkan hanya folder `skills/e2e` serta `skills/citation-management` keluar discovery; simpan snapshot original untuk referensi. Jangan hapus data proyek atau konfigurasi host lain.

### 1.5 Efisiensi token: RTK dan Headroom

**RTK OSS 1.0.1 diaktifkan untuk OMP**, memakai ekstensi upstream original `~/.omp/agent/extensions/rtk.ts`. Ini runtime/hook, bukan tambahan `SKILL.md`: jumlah skill tidak bertambah. Command Bash yang didukung dibungkus otomatis pada sesi baru. Native `read/find/grep/glob/LSP` tetap digunakan; jangan memindahkan pekerjaan ke shell hanya untuk menghasilkan persentase penghematan lebih besar.

Pengguna menyetujui upgrade biner PATH bersama dari 0.47.0 ke edisi **Apache-2.0-only**, berikut statistik command lokal dan cache pemulihan. ZIP Windows resmi diverifikasi SHA-256 `0e53e2eca471e15fbd3636e64e6bc0b182cbc278ed0339c80450a2dd03f4cd6b`; ekstensi hasil initializer identik dengan `hooks/pi/rtk.ts` pada commit `4ef8730cf3a0dea11c8d64a9b90bc0616fe52100`. Tidak memasang RTK proxy/engine atau hook Claude/Pi/host lain.

Telemetri off melalui `%APPDATA%/rtk/config.toml`, dibuktikan status CLI tanpa environment override. Statistik dan recovery berada di `ecosystem/runtime/rtk/1.0.1/state/`. Recovery dikonfigurasi 7 hari, 20 entri, 1 MiB per entri; expiry/eviction lazy, bukan enkripsi atau penghapusan fisik terjadwal. Batas 1 MiB sudah dieksersis dan memberikan peringatan truncation. Source tidak menunjukkan consumer untuk `[tracking] enabled` maupun `history_days`; jangan menjanjikan statistik command otomatis berhenti/terhapus karena field tersebut. Tidak menambah cron/task pembersihan.

**Bukti perilaku nyata:** OMP mengeksekusi `bun test` sebagai `rtk bun test`, menjaga assignment environment dan cwd ber-spasi. Run lulus tetap `80 pass/0 fail`; run gagal tetap `80 pass/1 fail` dengan exit 1. `read` native dan `printf` yang tidak didukung tidak berubah. Startup masih menemukan 59 skill serta Context7/REA/Semgrep existing.

**Batas lossy:** custom `console.error` hilang dari ringkasan Bun, tetapi berhasil dipulihkan lewat `rtk recall <hash>` tanpa rerun. Smoke OMP kedua juga memilih recall, bukan mengulang tes. Recall di atas cap dapat terpotong; jangan menganggapnya selalu full/lossless. Untuk stdout machine-readable gunakan `rtk bypass <executable> <args>`; bypass mempertahankan stdout dan exit 7 pada fixture, tetapi CLI masih bisa menambah peringatan pada stderr. Bila kedua stream harus persis, mulai sesi raw dengan environment proses `RTK_DISABLED=1`.

Warning `No hook installed — run rtk init -g` berasal dari detektor Claude-only upstream. Warning dibiarkan terlihat; smoke membuktikan hook OMP aktif. Jangan menjalankan generic `rtk init -g` atau mengonfigurasi Claude untuk menghilangkannya. Maintenance harus memakai `--agent omp`.

Pengukuran dua fixture Bun sintetis dengan tokenizer offline O200kBase memberikan reduksi output 92,8% pada run lulus dan 80,1% pada run gagal, termasuk warning stderr. Ini dua sampel output dengan invocation terpisah dan timing yang dapat berubah, **bukan penghematan seluruh konteks/tagihan/kuota**, bukan benchmark aplikasi atau jaminan semua filter.

**Headroom tidak diaktifkan.** Instalasi existing 0.37.0 dipertahankan. Wrapper OMP resmi pada stable 0.41.0 hanya mengalihkan provider Anthropic, bukan `openai-codex/gpt-6.1-sol` OAuth aktif. Tidak membuat adapter, membaca token, mengubah provider, menjalankan proxy/MCP/service, mengaktifkan memory/learn, atau mengunduh model untuk memaksakannya cocok. Jangan menganggap label “supports OMP” menjamin provider/model apa pun.

Evaluasi lanjutan 21 Oktober 2026: Headroom 0.41.0 `densify` lulus enam fixture sintetis dalam Docker offline/read-only, tetapi fungsi wrapper resmi yang dijalankan pada registry dummy tetap hanya mengalihkan Anthropic. Hasil ini tidak mengubah keputusan global di atas. Bukti terukur dan batas latensi/fidelity: `ecosystem/measurements/headroom-evaluation-20261021.json` dan bagian 9 laporan Onboarding. Tidak ada proxy/MCP/model baru atau upgrade Headroom host.

Laporan: `Onboarding/RISET-EFISIENSI-TOKEN-RTK-HEADROOM.md`. Bukti: `ecosystem/measurements/token-efficiency-20261021.json`. Backup: `ecosystem/backups/token-efficiency-20261021/`, termasuk biner 0.47.0 dan routing sebelum perubahan. Rollback terarah: uninstall hanya ekstensi OMP official, pulihkan biner lama dan routing; konfigurasi RTK baru boleh dihapus hanya setelah memastikan belum ada edit pengguna. Jangan hapus history/cache atau instalasi Headroom existing sebagai bagian rollback rutin. Mulai sesi OMP baru; sesi lama tidak dijanjikan hot-reload.

### 1.6 Publish or Perish: pencarian dan sitasi gratis

MCP lokal `publish_or_perish` ditambahkan untuk OMP default-profile. Konektor OMP 1.0.0 menggunakan CLI Harzing asli **8.19.5300**, bukan MCP resmi Harzing atau pengganti aplikasi PoP. Signature `pop8query.exe` valid dari Tarma Software Research Ltd dan hash diperiksa saat startup. Instalasi/data GUI existing tidak dipakai sebagai penyimpanan konektor. Runtime/lock: `ecosystem/runtime/publish-or-perish/1.0.0/`; dua tool: `pop_search` dan `pop_export`.

**Gratis:** Crossref, PubMed dan Google Scholar tanpa API key; tidak ada sumber berlangganan, paid fallback, pembelian kredit, kartu pembayaran atau provider model baru yang diaktifkan. PoP tetap untuk personal non-profit; ARS untuk akademik/personal nonkomersial. Jika kelak perlu key akun gratis, agen harus menjelaskan layanan/kuota/batasnya dan memakai intake DPAPI tanpa echo; tidak meminta key di argumen atau menyimpannya pada config global. Google Scholar tidak mempunyai key resmi untuk menghilangkan CAPTCHA.

**Alur bersama skills:** `deep-research` untuk strategi/sintesis → PoP untuk kandidat → `citation-management` untuk identitas, metadata, DOI, deduplikasi dan gaya referensi → `academic-paper` untuk menulis/revisi berbasis sumber asli. Review/pipeline hanya ketika diminta. Body skill vendor tetap asli; tidak ada helper Python, akun cloud, pipeline multiagen atau model berbayar tambahan yang otomatis dijalankan.

`pop_search` menerima source, keywords/title/author/journal, rentang tahun, target max_results 1–50 dan urutan. Hasil membawa records, query, waktu pengambilan dan search_id; vendor dapat membulatkan batch, sehingga returned dilaporkan apa adanya. `pop_export` memakai search_id pada sesi yang sama dan mengembalikan **teks JSON, BibTeX, RIS atau CSV**, bukan menulis/menimpa path. Ekspor selain JSON menggunakan cache offline dan ditolak jika snapshot cache berubah. Citation keys BibTeX bersifat lokal per ekspor; lakukan rekonsiliasi saat menggabungkan file. APA/Vancouver/gaya jurnal menjadi tugas skills sitasi/penulisan; keluaran APA bawaan PoP adalah RTF, bukan teks biasa.

**Bukti:** enam uji batas/regresi lulus. Smoke MCP menemukan artikel Jinek dkk. (2012), DOI `10.1126/science.1225829`, melalui Crossref dan PubMed serta berhasil mengekspor empat format; hasil kosong dan search_id tidak dikenal ditangani. Pencarian Google Scholar terpisah juga menemukan artikel/DOI tersebut tanpa key. Host OMP **18.12.5** memuat skills penulisan dan routing baru; `/mcp reload` pada sesi RPC tanpa inferensi menampilkan rute `xd://mcp__publish_or_perish_pop_search` dan `xd://mcp__publish_or_perish_pop_export`. Versi host hanya diamati, tidak di-upgrade pada tugas ini. Sesi percakapan yang sudah berjalan tetap perlu `/mcp reload` atau sesi baru.

**Batas:** Crossref mencocokkan kata secara OR; judul PubMed dipecah AND dan stop words dapat menghasilkan false empty; gunakan istilah khas plus penulis/tahun dan cek sumber aslinya. Google Scholar bisa membatasi akses/CAPTCHA dan memotong author/abstrak. DOI valid, ranking sitasi dan ekspor bukan bukti mutu, peer review, status retraksi atau dukungan klaim. Jangan mengirim naskah rahasia sebagai query, menjalankan macro TeX/formula CSV atau membuka URL hasil secara otomatis. Konektor membatasi input/proses/lingkungan dan tidak membuka listener publik, tetapi bukan sandbox OS atau sertifikasi keamanan. Cache, cookies publik dan log query di `state/` tidak terenkripsi dan tidak dihapus otomatis.

Contoh permintaan biasa:

```text
Cari literatur tentang [topik] untuk penulisan akademik.
Gunakan sumber gratis melalui Publish or Perish, verifikasi metadata/DOI,
pisahkan preprint dan artikel peer-reviewed, lalu bantu menyusun kajian pustaka
dengan skills penulisan yang sesuai. Jangan gunakan sumber atau API berbayar.
```

Bukti/pin: `measurements/publish-or-perish-20261021.json`. Backup sebelum registrasi: `backups/publish-or-perish-20261021/`. Rollback terarah: lepaskan hanya entry `publish_or_perish` dari `~/.omp/agent/mcp.json` dan bagian routing PoP, kemudian reload MCP; jangan pulihkan backup seluruh file jika ada perubahan pengguna sesudahnya. Jangan menghapus data GUI, cache, atau MCP lain sebagai rollback rutin.

## 2. Proyek baru

### 2.1 Buat folder dan buka OMP

Ganti nama folder sesuai kebutuhan. Jalankan hanya jika folder baru memang ingin dibuat.

```powershell
$Repo = Join-Path $HOME "Projects\aplikasi-baru"
New-Item -ItemType Directory -Path $Repo
omp --cwd "$Repo"
```

Perintah ini belum membuat framework, Git repository, database, atau memasang dependency.

### 2.2 Berikan brief awal

Ganti bagian dalam tanda kurung siku sebelum dikirim.

```text
Ini proyek baru: [nama dan tujuan aplikasi].

Pengguna utama: [siapa penggunanya].
Alur utama: [pekerjaan yang ingin diselesaikan pengguna].
Batasan: [budget, hosting, keamanan, stack wajib atau belum diputuskan].
Referensi desain: [lampirkan gambar/link jika ada].

Mulai dari pemeriksaan folder dan planning. Jangan membuat scaffold,
memasang dependency, atau mengubah file dahulu.
Baca aturan dan skill yang relevan. Tanyakan hanya keputusan penting
yang belum bisa dijawab dari brief atau repository.
```

Jika ide masih kabur atau keputusan perlu diuji:

```text
/skill:grilling Uji kebutuhan dan keputusan proyek ini berdasarkan brief.
Periksa fakta yang tersedia dahulu. Bantu tetapkan scope, non-goals,
alur pengguna, dan acceptance criteria. Belum implementasi.
```

`grilling` bukan kewajiban untuk setiap task kecil. Setelah kebutuhan disepakati, lanjut ke bagian 4.

## 3. Repository yang sudah ada

### 3.1 Buka root repo

Ganti path dengan folder repository sebenarnya.

```powershell
$Repo = "D:\Projects\repo-lama"
omp --cwd "$Repo" --approval-mode always-ask
```

`always-ask` berlaku untuk sesi ini: pembacaan biasa otomatis; perubahan dan eksekusi meminta persetujuan. Konfigurasi global tidak diubah. Hilangkan flag tersebut jika ingin mengikuti konfigurasi global `yolo`.

**Approval bukan sandbox.** Jangan menjalankan kode repo tak dipercaya hanya karena sudah ada prompt persetujuan.

### 3.2 Orientasi sebelum mengubah kode

```text
Ini repository yang sudah ada. Target saya: [perubahan yang diinginkan].

Lakukan orientasi read-only dahulu:
- Petakan arsitektur, entry point, dan alur yang terkait target.
- Periksa manifest, lockfile, dokumentasi, dan konvensi tests.
- Identifikasi perubahan lokal pengguna; jangan menimpa atau membuangnya.
- Periksa instruksi instalasi/start/test sebelum menjalankan script.
- Untuk UI, periksa implementasi incumbent dan gate Impeccable.
- Pertahankan PRODUCT.md, DESIGN.md, identitas visual, dan perilaku
  di luar scope.

Berikan temuan berbukti, risiko, dan rencana perubahan minimal.
Jangan install dependency, menjalankan script proyek, atau mengedit dahulu.
```

Dokumen desain yang tidak ada bukan bukti proyek masih kosong. Jangan langsung meminta init, rewrite, atau redesign menyeluruh.

## 4. Alur bersama: planning sampai selesai

Bagian ini adalah referensi untuk mengendalikan tahap tertentu, bukan daftar perintah yang wajib diketik satu per satu. Jika memakai instruksi end-to-end pada bagian 1.1, agen mengelola perpindahan tahap setelah persetujuan yang diperlukan. Backend-only tidak membutuhkan inisialisasi dokumen desain UI. Perbaikan kecil tidak harus menjalani perencanaan produk dari awal.

### 4.1 Arsitektur dan rencana implementasi

```text
/skill:codebase-design Berdasarkan kebutuhan dan fakta repository,
usulkan arsitektur paling sederhana yang memenuhi scope.

Jelaskan batas modul, kontrak API, data model, alur data,
autentikasi/otorisasi jika diperlukan, serta risiko utama.
Gunakan pola existing jika ada. Hindari abstraksi spekulatif.

Susun urutan implementasi beserta acceptance criteria dan cara
verifikasinya. Belum mengubah kode.
```

Planning memakai kemampuan perencanaan native OMP. `codebase-design` membantu struktur dan kontrak kode; bukan pengganti seluruh proses product planning. Setujui rencana atau minta revisi sebelum implementasi.

### 4.2 Konteks produk dan desain UI

**Proyek baru tanpa konteks produk:**

```text
/skill:impeccable init Jalankan gate proyek terlebih dahulu.
Berdasarkan brief yang telah disepakati, susun PRODUCT.md.
Konfirmasi informasi material yang belum diketahui.
Jangan membuat fakta produk atau menimpa dokumen existing.
```

**Merancang fitur atau halaman baru:**

```text
/skill:impeccable shape Rancang UX/UI untuk [fitur atau halaman].
Gunakan brief, referensi saya, dan konteks proyek.
Usulkan alur, hierarki, arah visual, responsive behavior,
serta loading, empty, error, dan success states.
Belum implementasi. Minta persetujuan atas arah desain.
```

**Mendokumentasikan sistem desain repo existing:**

```text
/skill:impeccable document Dokumentasikan sistem desain yang benar-benar
ada berdasarkan kode dan tampilan aktual. Pertahankan identitasnya.
Jika DESIGN.md sudah ada, usulkan pembaruan; jangan menggantinya langsung.
```

Setelah meninjau dokumen dan menyetujui isinya, minta agen mencatat keputusan aktual dan bukti gate sesuai workflow Impeccable. Jangan membuat catatan approval hanya agar status menjadi hijau.

Untuk memeriksa gate sendiri, jalankan di PowerShell setelah `$Repo` menunjuk root yang tepat:

```powershell
node "$HOME/.omp/agent/ecosystem/runtime/design-gate.mjs" --project "$Repo"
```

| Exit | Arti |
|---|---|
| `0` | Konteks `ready` untuk pekerjaan desain; bukan UI sudah lolos kualitas. |
| `1` | Konteks `missing` atau `partial`; bukan otomatis instalasi rusak. |
| `2` | Masalah argumen, root tidak aman, atau tidak dapat dibaca. |

Checker bersifat read-only. Ia tidak memasang hook, menjalankan kode proyek, atau membuat dokumen otomatis. Perubahan source/dokumen yang terkait bukti dapat membuat review menjadi usang. Laporkan dan tinjau ulang; jangan otomatis mengganti hash atau persetujuan lama.

### 4.3 Implementasi per fitur

Untuk implementasi test-first:

```text
/skill:tdd Implementasikan [fitur] sesuai rencana dan desain yang disetujui.
Gunakan konvensi tests repository dan codebase-design sebagai referensi.

Kerjakan satu alur end-to-end, bukan scaffold atau mock yang dianggap selesai.
Gunakan Context7 untuk API library yang perlu dipastikan sesuai versi.
Jangan menambahkan dependency atau layanan berbayar tanpa persetujuan.
```

Implementasi biasa juga boleh diminta tanpa TDD. Untuk mencari dokumentasi secara eksplisit:

```text
/skill:context7-docs Periksa dokumentasi [library dan versi] untuk
[kebutuhan API]. Kirim hanya pertanyaan generik, bukan kode privat atau secret.
```

Jika menghadapi bug yang penyebabnya belum diketahui:

```text
/skill:systematic-debugging Selidiki [gejala dan langkah reproduksi].
Temukan penyebab dengan bukti sebelum mengusulkan perbaikan.
```

### 4.4 Review

Untuk review umum cukup minta “review perubahan ini”; agen memilih `ponytail-review`. Audit kualitas repository memakai `ponytail-audit`, bukan otomatis audit keamanan penuh. Contoh pemanggilan eksplisit opsional:

```text
/skill:ponytail-review Tinjau perubahan ini beserta caller dan alur terkait.
Laporkan regresi, risiko, tes yang benar-benar diperlukan dan kompleksitas
tanpa mengedit kode. Jangan menambah abstraksi untuk kebutuhan spekulatif.
```


Untuk keamanan terfokus, agen otomatis membaca `security-audit` asli dalam guidance mode. `security-reviewer` adalah agent, bukan nama slash command; contoh permintaan:

```text
Gunakan security-reviewer untuk meninjau perubahan ini secara read-only.
Fokus pada kerentanan yang relevan dengan fitur, termasuk authorization,
input tidak dipercaya, dan penanganan secret.
Laporkan lokasi, jalur dampak, dan bukti; bedakan temuan dari hipotesis.
Jangan menjalankan exploit atau scanner jaringan.
```

Untuk review terhadap spesifikasi dan standar repository:

```text
/skill:code-review Tinjau perubahan terhadap [commit/branch/tag pembanding]
dan kebutuhan yang telah disepakati. Laporkan pelanggaran kontrak atau standar
beserta lokasi dan buktinya. Jangan mengubah kode dahulu.
```

Tentukan pembanding yang benar. `code-review` bukan pengganti audit keamanan. Skill Cloudflare lengkap sudah terpasang, tetapi full audit belum dijalankan: Node Windows tidak menyediakan `O_NOFOLLOW`/`O_NONBLOCK` yang diwajibkan validator, dan sandbox OS serta promosi artefak aman belum dibuktikan. Jangan membuang guard; temuan yang terblokir tetap `needs_validation`. Audit penuh menggunakan workflow upstream setelah scope, lingkungan, dan biaya model/compute disetujui.

### 4.5 Verifikasi dan penutupan

```text
/skill:verification-before-completion Verifikasi acceptance criteria
fitur ini dengan menjalankan alur aktual dan checks yang relevan.

Untuk UI, periksa tampilan desktop/mobile, interaksi, keyboard,
serta state loading/error/empty yang berlaku.
Laporkan terverifikasi, gagal, dan belum diuji secara terpisah.
Jangan menyebut selesai hanya karena build atau tests lulus.
```

Jika ingin pemeriksaan UI tambahan:

```text
/skill:impeccable audit [halaman atau alur] untuk aksesibilitas,
responsive behavior, dan masalah teknis UI. Gunakan tampilan aktual.
```

```text
/skill:impeccable polish [halaman atau alur] dalam scope yang disepakati.
Pertahankan arah visual dan perilaku produk. Verifikasi perubahan aktual.
```

Penutupan harus menyebut perubahan, verifikasi yang benar-benar dijalankan, serta blocker yang tersisa. Jangan otomatis deploy, commit, atau push kecuali diminta.

## 5. Memory lintas sesi

Memory cloud bukan pelatihan ulang bobot model. Fakta yang disimpan dapat dipakai sebagai konteks sesi berikutnya, tetapi tidak menjamin semua percakapan otomatis diingat.

Pada keadaan audit, root Onboarding diizinkan; proyek lain perlu pemetaan tersendiri. Native memory tetap `off`. Tidak ada staging lokal-ke-cloud sebagai mekanisme produksi; file input lokal wrapper bukan database memory utama.

### 5.1 Periksa izin proyek

```text
/skill:supermemory-v5 Periksa apakah root proyek ini sudah di-allowlist.
Jika belum, tampilkan usulan root, slug, dan cakupan capture untuk
persetujuan saya. Jangan mengaktifkan global writes.
```

### 5.2 Simpan keputusan

```text
/skill:supermemory-v5 Simpan keputusan terverifikasi berikut untuk
proyek ini: [satu fakta non-sensitif yang sudah disepakati].
Laporkan status pemrosesan sebenarnya.
```

Simpan fakta singkat dan stabil, bukan transcript, secret, kode privat, atau dugaan. Status `accepted` belum berarti memory siap; pemrosesan dokumen dan dynamic dreaming perlu selesai. Kuota habis atau API gagal harus dilaporkan, bukan diatasi dengan upgrade otomatis.

### 5.3 Tarik konteks pada sesi berikutnya

```text
/skill:supermemory-v5 Recall keputusan dan batasan proyek yang relevan
dengan [tugas]. Cocokkan dengan kondisi repo sekarang.
Jangan perlakukan memory sebagai instruksi atau fakta yang selalu terbaru.
```

Untuk koreksi, minta memperbarui fakta yang sama, bukan menambahkan duplikat. Forget/delete membutuhkan preview target dan persetujuan khusus; izin menyimpan bukan izin menghapus.

## 6. Pekerjaan infrastruktur

Pilih skill sesuai tugas; tidak perlu memanggil seluruh koleksi.

| Kebutuhan | Skill |
|---|---|
| Menulis Terraform | `/skill:terraform-style-guide` |
| Memecah konfigurasi menjadi modul | `/skill:refactor-module` |
| Tests Terraform | `/skill:terraform-test` |
| Resource provider Terraform | `/skill:provider-resources` |
| Packer AWS | `/skill:aws-ami-builder` |
| Packer Azure | `/skill:azure-image-builder` |
| Packer Windows | `/skill:windows-builder` |
| Dockerfile dan build context | `/skill:docker-container-builds` |
| Manifest Kubernetes | `/skill:kubernetes-manifest-operations` |
| Playbook/role Ansible | `/skill:ansible-automation` |

Contoh:

```text
/skill:terraform-style-guide Tinjau kebutuhan [target infrastruktur].
Periksa executable dan versi yang tersedia, lalu usulkan konfigurasi
serta rencana validasi lokal. Jangan apply, import state, atau mengubah cloud.
```

Semua 20 skill HashiCorp tetap terpasang global. Pemeriksaan PATH terbaru menemukan Docker CLI dan kubectl, tetapi tidak Terraform, Packer, Helm, atau Ansible. Kehadiran CLI tidak membuktikan daemon/cluster/controller siap; tidak ada build, koneksi cluster, atau akses host yang dijalankan. Ansible dapat diedit di Windows, tetapi eksekusinya memerlukan controller Linux yang didukung.

Apply, import state, cloud build, perubahan cluster/firewall/jaringan, operasi destruktif, dan biaya tambahan tetap memerlukan izin target yang jelas. Skill HashiCorp bukan validator generik Kubernetes, Ansible, atau Docker.

### 6.1 Implementasi full-stack dan verifikasi web

| Kebutuhan | Skill dan batas |
|---|---|
| Performa implementasi React/Next.js | `/skill:vercel-react-best-practices`; hanya ketika stack terkonfirmasi, API sesuai versi proyek, Impeccable tetap owner desain |
| PostgreSQL, query, indeks, pooling, RLS | `/skill:supabase-postgres-best-practices`; Postgres biasa juga didukung, tanpa koneksi DB/migrasi otomatis |
| Interaksi dan keadaan UI aktual | `/skill:webapp-testing`; adapter sumber OpenCode memakai browser native OMP, bukan launcher Python |

Smoke browser memakai halaman sintetis, bukan aplikasi proyek: validasi input kosong, koreksi, simpan melalui keyboard, dan viewport 390x844 teramati. Peluncuran Edge otomatis gagal koneksi WebSocket; endpoint CDP dari proses Edge sementara milik smoke berhasil. Baca catatan runtime dalam skill sebelum memakai fallback. Tidak ada klaim aplikasi pengguna atau seluruh browser sudah teruji.

Payload tambahan berupa 122 file dokumentasi/lisensi; tidak ada script validator, installer, hook, SDK, atau toolchain baru. Commit sumber dan checksum byte akhir dicatat dalam laporan pengukuran. React/Postgres dipilih sebagai panduan kondisional, bukan asumsi bahwa semua proyek pengguna memakai stack tersebut. Hugging Face, LangChain dan paket domain spekulatif tidak dipasang.


## 7. Melanjutkan pekerjaan

Untuk melanjutkan sesi sebelumnya pada repo yang sama:

```powershell
omp --cwd "$Repo" --continue
```

Untuk memilih sesi tersimpan:

```powershell
omp --cwd "$Repo" --resume
```

Melanjutkan transcript sesi berbeda dari recall memory cloud. Pada sesi baru, berikan target sekarang dan minta recall jika relevan. Jangan menyalin keputusan lama tanpa memeriksa kondisi repo terkini.

## 8. Batas penting dan rujukan

- Pertahankan perubahan lokal pengguna dan dokumen existing.
- Jangan menganggap `yolo`, skill, atau gate sebagai isolasi OS.
- Tidak perlu memasang ulang skill global untuk tiap repo.
- Jangan menyalin API key ke prompt, source, CLI arguments, atau environment global.
- Tanpa runtime UI atau infrastruktur yang sesuai, hasilnya harus dilabeli belum diuji, bukan dianggap lulus.

Laporan keadaan environment dan bukti audit tersedia pada folder yang sama:
- `ARCHITECTURE-AUDIT.md`
- `ledger.json`
- `measurements/`

Rujukan resmi:
- [Skills dan sintaks /skill OMP](https://github.com/can1357/oh-my-pi/blob/v18.11.0/docs/skills.md)
- [Approval modes dan batas keamanan OMP](https://github.com/can1357/oh-my-pi/blob/v18.11.0/docs/approval-mode.md)
- [Panduan upstream Impeccable](https://impeccable.style/docs/) — distribusi vendor OMP tetap asli; batas eksekusi dan fallback manual dijelaskan di `IMPECCABLE-OMP.md`.
