# Backup setup OMP: SaKuRa-u

Snapshot konfigurasi dan sumber **OMP default-profile** di Windows, diperbarui **8 November 2026**. Bukti optimasi, adopsi dan routing bertanggal **7 November 2026** memiliki cakupan masing-masing. Ini bukan image sistem, installer, runtime siap pakai, atau restore otomatis. Snapshot tidak membuktikan seluruh environment terbaru, aman, atau berhasil dipulihkan pada mesin bersih.

## Isi dan sumber kebenaran

- `home/.omp/agent/AGENTS.md`: aturan global pengguna.
- `home/.omp/agent/config.yml`, `models.yml`, `mcp.json`: konfigurasi OMP, custom model/provider yang sudah ada, dan empat MCP: Publish or Perish, Context7, REA, Semgrep. `models.yml` memuat konfigurasi aicenter serta perintah pengambilan credential melalui bridge DPAPI, bukan nilai credential; menyalinnya tidak menyiapkan credential atau membuktikan endpoint dapat diakses.
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

## Versi dan riwayat baseline

Baseline 21 Oktober 2026 memakai OMP `18.12.5`, Node `24.19.0` dan Bun `1.4.2`. Pembaruan 22 Oktober menambahkan subset Agency Agents; wave routing 24 Oktober mencatat 90 skill. Pembaruan 31 Oktober mencatat OMP `18.14.1` dan 96 skill global (93 metadata terlihat, tiga eksplisit). Angka dan hasil smoke Oktober tetap **historis**, bukan keadaan terkini.

CLI yang diamati **8 November 2026**: OMP `18.18.1`, Node `v24.19.0`, Bun `1.4.2`. Pekerjaan snapshot ini tidak meng-upgrade OMP. Audit/routing **7 November berjalan pada OMP `18.18.0`**, bukan pengujian ulang pada `18.18.1`. Default tercatat `openai-codex/gpt-6.1-sol:medium`, role smol `openai-codex/gpt-6-luna:low`. Context7 diperbarui dan diuji terbatas ke `4.5.1`; REA `6.5.0`, RTK `1.0.1` dan Ponytail `5.3.2` dipertahankan. Upgrade Semgrep `1.184.0` gagal acceptance karena timeout; rute aktif dikembalikan ke `1.181.0`. Warning MCP Python `1.29.0` dan kegagalan startup Semgrep pada sebagian smoke tetap tercatat.

Pemeriksaan snapshot 8 November pada OMP `18.18.1` mengonfirmasi katalog native tetap 151 skill/10 tersembunyi tanpa warning dan konfigurasi efektif model/memory/approval tetap sama. Observasi ini dicatat pada [host-observation.json](home/.omp/agent/ecosystem/measurements/repository-snapshot-20261108/host-observation.json); bukan pengujian ulang inference, LSP/DAP, browser atau koneksi MCP.

Ledger atau laporan lama dapat menyebut pin/hasil sebelumnya. Cocokkan konfigurasi aktif dan acceptance per komponen; keberadaan source kandidat upgrade tidak berarti versi itu aktif. Tidak ada klaim seluruh skill cocok byte dengan upstream terbaru atau semua integrasi diuji ulang pada tanggal snapshot.

## Skill dan routing saat ini

RPC baru pada root netral dan management-hub menemukan **151 skill global, 141 metadata model-visible, 10 entry eksplisit/tersembunyi**. Body panduan tetap dibaca saat relevan; 141 bukan jumlah body yang selalu dimuat. Baseline 96 dipertahankan dan 55 tambahan berasal dari penilaian 21 kandidat. Setelah perubahan routing, 48 dari 55 tambahan tersedia untuk pemilihan otomatis; 32 di antaranya sebelumnya manual.

Sepuluh entry yang tetap memerlukan pemanggilan eksplisit:

- Tujuh tambahan dengan flag vendor asli: `setup-matt-pocock-skills`, `i-have-adhd`, `to-spec`, `to-tickets`, `handoff`, `teach`, `wait-what`.
- Tiga incumbent: `grill-me`, `review-animations`, `to-questionnaire`.

Jelaskan tujuan, artefak, stack dan batas dengan bahasa alami; tidak perlu menghafal nama skill. Agent memilih satu lead per tahap dan membaca panduan pendukung seperlunya. Entry eksplisit dapat ditawarkan ketika membantu, tetapi tidak dibypass otomatis. Q&A biasa, aritmetika dan nama skill dalam kutipan tidak perlu memicu workflow. Pemilihan panduan tidak memberi izin instalasi, akses akun privat, upload, biaya, deploy, merge/push, atau tindakan destruktif.

Routing **probabilistik**. Model default lulus **6/6** fixture intent sintetis (tiga positif, tiga negatif); smol tetap **4/6**, melewati dua panduan spesialis dan menunjukkan over-selection proses. Ini bukan benchmark umum, sertifikasi 48 kandidat, atau jaminan model/subagent lain mengikuti hasil default. Tidak ada klaim perbaikan kualitas, token atau latency.

Default-profile berlaku lintas proyek, tetapi konfigurasi/skill repository dapat override atau menambah alias. Onboarding teramati 156 entry, 145 metadata terlihat dan 11 tersembunyi karena sumber lokal repository; jangan menonaktifkan provider repository untuk menyamakan angka global. Named profile baru tidak diasumsikan mewarisi konfigurasi. Mulai sesi OMP baru; hot reload sesi lama tidak dijamin.

### Adopsi kandidat dan bukti yang dipertahankan

Penilaian 21 kandidat mencakup alternatif UI, workflow engineering, graph, akses sumber publik dan ML. Tidak semuanya dipasang atau diaktifkan: source Karpathy dan doc-coauthoring tertahan oleh provenance/grant lisensi exact; Style UI tetap katalog referensi, bukan skill executable. Impeccable tetap fallback UI, bukan satu-satunya pilihan. Taste/frontend-design/Hallmark dipilih sesuai brief, bukan diaktifkan bersama secara otomatis.

Runtime terisolasi asal mencakup Graphify `0.9.103`, Agent Reach `1.6.1`, last30days `3.31.0`, Spec Kit `1.3.2` dan dependency Hallmark. Snapshot menyimpan source/manifests/locks terkait, **bukan binary, virtualenv atau dependency terpasang**. Graphify punya smoke AST/query lokal; Reach hanya pembacaan publik terbatas melalui Jina; last30days hanya smoke HN-only; Spec Kit hanya init sintetis integrasi OMP. Hallmark render gagal saat browser-profile launch; dua lookup kategori UI UX Pro Max meleset. Full workflow UI/UA/ML, seluruh kanal, training/GPU dan pipeline model tidak terbukti siap.

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

Target runtime yang dicatat adalah Node `24.19.0`; kompatibilitas Node lama dan restore lintas OS belum dinyatakan terverifikasi. Skrip memakai path portable, tetapi payload menyertakan launcher PowerShell/Windows, ketergantungan DPAPI, dan path absolut Windows. Dukungan long paths Git/Windows tetap diperlukan; jangan ubah line ending payload karena hash dihitung per byte. `.gitattributes` mempertahankan byte `home/**`. Jalankan verifier pada checkout lokal yang tidak sedang dimutasi, bukan sebagai sandbox untuk tree yang disunting penyerang secara bersamaan.

## Tidak disertakan

Credential/API key/PAT/OAuth, blob DPAPI, database OMP, sesi/riwayat percakapan, raw transcript/inference/events, log, cookies/profil browser, source/data proyek rahasia, cache/state runtime dan backup lama tidak disertakan. Binary/executable vendor, font, gambar, PDF, arsip, `node_modules`, virtualenv dan file nonteks juga dikecualikan. Sumber distribusi plugin dalam path cache dapat dipertahankan sebagai source, bukan state sesi/runtime.

JWT pada metadata URL unduhan Semgrep diganti dengan `[REDACTED_SIGNED_DOWNLOAD_TOKEN]`; hash sumber dipertahankan untuk provenance, bukan untuk mengunduh ulang. Detail redaksi/pengecualian mengikuti manifest. Catatan scan pola credential historis/scoped tidak menjamin ketiadaan secret. `.gitignore` mencegah sebagian penambahan tak sengaja, tetapi tidak menyaring ulang berkas yang sudah tracked.

Login OMP/GitHub dan credential integrasi yang dibutuhkan harus disiapkan ulang melalui alur yang disetujui. Snapshot tidak dimaksudkan untuk memulihkan credential, data proyek, atau akun cloud.

## Pemulihan manual yang aman

1. Clone repositori. Pada Windows, gunakan `git -c core.longpaths=true clone https://github.com/SaKuRa-u/omp-setup.git` untuk path sumber yang panjang. Tinjau README, manifest, dan verifier; jalankan pemeriksaan luring di atas. Backup konfigurasi mesin tujuan terlebih dahulu.
2. Pasang hanya OMP, Node/Bun, Git dan tool yang memang dipilih dari distribusi resmi, sesuai pin/kompatibilitas runtime. Jangan menjalankan seluruh skrip atau installer dalam skill/sumber; tidak ada setup menyeluruh otomatis. Semgrep Windows memerlukan virtualenv/dependency sesuai catatan `ecosystem/runtime/semgrep/1.181.0/`; binary tidak ada dalam backup. Bun `1.4.2` yang teramati berada di bawah minimum source/SDK OMP `1.4.4` pada audit; standalone OMP yang berjalan tidak membuktikan source helper/SDK kompatibel.
3. Hentikan OMP. Pilih dan salin berkas `home/` ke direktori home pengguna tujuan secara manual; jangan mengganti seluruh profil atau menimpa konfigurasi host lain. Pertahankan struktur `.omp`/`.agents`, sumber yang dirujuk, notices dan lisensi. Tidak ada restore otomatis.
4. Path absolut masih menunjuk `C:/Users/Indrimeilla-PC`. Sesuaikan salinan konfigurasi aktif, path discovery skill/shared, registrasi plugin, launcher, policy, serta executable mesin tujuan. Jangan melakukan search/replace massal pada manifest, measurements, hash, atau sumber vendor. Verifier berlaku pada clone asli sebelum migrasi, bukan salinan aktif yang sudah Anda ubah.
5. Tinjau `config.yml`, `models.yml`, `mcp.json`, source provider, ekstensi dan plugin **sebelum memulai OMP**. Pengguna mempertahankan `tools.approvalMode: yolo` dan `dev.autoqaConsent: granted`; pilih ulang kebijakan persetujuan mesin tujuan dengan sadar. Memory tetap `off`. Custom model aicenter memakai bridge `ecosystem/runtime/credentials.ps1` dan credential DPAPI lokal yang harus disiapkan ulang; periksa path PowerShell/bridge tanpa menjalankan perintah credential hanya untuk meninjau snapshot. Ini provider existing, bukan akun atau credential yang dibundel. Nonaktifkan MCP/provider/ekstensi yang belum ditinjau atau belum siap. Startup dapat menjalankan kode dengan hak akun pengguna; konfigurasi bukan izin baru untuk audit berbayar, cloud, deploy atau capture memory.
6. Pulihkan dependency hanya pada runtime yang dipilih, memakai package manager/lockfile terkait setelah memeriksa lifecycle scripts dan kompatibilitas OS/Python/Node. Pulihkan REA dari distribusi resmi `rea-agents@6.5.0`. Untuk PoP, peroleh CLI vendor `8.19.5300` secara resmi lalu cocokkan signature/hash sesuai kode dan measurements sebelum menaruhnya di `runtime/publish-or-perish/1.0.0/vendor/`. Runtime Graphify/Reach/last30days/Spec Kit/Hallmark harus dibangun ulang secara selektif dari manifest/lock terkait; keberadaan launcher atau lock bukan instalasi selesai.
7. Buat ulang state/cache/temp yang benar-benar dirujuk launcher. Semgrep memerlukan konfigurasi `state/settings.yml`, log/cache dan `state/tmp`; state asli sengaja tidak dibackup. Periksa telemetry/metrics sebelum menjalankan tool. Membuat direktori saja tidak menggantikan konfigurasi state yang diperlukan.
8. Buat credential baru melalui alur DPAPI yang disetujui. Jangan menaruh secret pada berkas tracked, argumen CLI, environment global, atau chat. DPAPI dari mesin lama tidak portable. Token yang pernah terekspos harus dicabut, bukan dipakai ulang.
9. Pasang RTK resmi sesuai pin bila diperlukan; executable tidak disertakan. Salin konfigurasi `home/AppData/Roaming/rtk/config.toml` secara selektif ke `%APPDATA%/rtk/config.toml`, sesuaikan path database/PATH, dan periksa telemetry. Ekstensi Orca memerlukan aplikasi/integrasi Orca yang sesuai; aplikasinya tidak disertakan. Pulihkan aset/font/template nonteks yang benar-benar dirujuk hanya dari sumber resmi dan setelah memeriksa hak penggunaannya; omission dapat membuat render atau contoh gagal meski hash snapshot cocok.
10. Mulai sesi OMP baru hanya setelah review komponen aktif, lalu periksa discovery skills/plugin dan operasi konkret yang dibutuhkan. Aktifkan hanya MCP/runtime yang sudah disiapkan; jangan login, mengambil cookie, mengunggah data atau menambahkan provider berbayar sebagai fallback otomatis. Smoke live/cloud memerlukan persetujuan target/biaya. Restore mesin bersih dan end-to-end workflow belum dibuktikan; README ini bukan klaim MCP live semuanya lulus.

## Lisensi dan privasi

Skills/plugin/sumber pihak ketiga tetap mengikuti lisensi upstream masing-masing; tidak ada lisensi tunggal yang menggantikannya. Pertahankan format source vendor, attribution, notices dan lisensi yang tersedia. `greensock/gsap-skills` dan `mattpocock/skills` berlisensi MIT. Pada pin `motiondivision/ai-kit` yang ditinjau, deklarasi vendor menyebut MIT tetapi root `LICENSE` tidak ditemukan; metadata provenance dipertahankan, bukan diganti teks lisensi buatan. Source-only dengan grant belum terselesaikan bukan izin redistribusi atau penggunaan tanpa batas.

Lisensi teks skill tidak otomatis melisensikan runtime GSAP/Motion, aset, font, plugin, atau dependency lain yang kelak dipakai. Periksa ketentuan vendor masing-masing sebelum distribusi/penggunaan. ARS berlisensi CC BY-NC 4.0 dan dibatasi untuk penggunaan akademik/personal nonkomersial sesuai aturan pengguna. Pertahankan attribution/notices.

`yolo`, persona read-only, worktree, runtime/virtualenv terisolasi dan tool grant bukan sandbox OS atau jaminan no-egress. Agent, extension, provider dan MCP dapat berjalan sebagai pengguna Windows yang sama. `secrets.enabled=false` bukan bukti credential bocor, tetapi juga bukan jaminan redaksi outgoing global aktif. Snapshot/verifier tidak mengaudit semua kode vendor, dependency, Cloudflare atau keamanan host.

Native memory tetap nonaktif; wrapper Supermemory existing mempertahankan DPAPI, allowlist proyek paling spesifik dan larangan mutasi global. Tidak ada pengujian live memory privat atau perubahan persetujuan capture/retention. Jina mengirim URL ke pihak ketiga; layanan riset/model/cloud lain juga memerlukan review data, biaya dan kebijakan privasi sebelum dipakai. Jangan menafsirkan routing otomatis sebagai persetujuan pengiriman data.

Skill yang terpasang adalah panduan, bukan bukti kualitas kode, kemampuan model, runtime library yang sudah tersedia, atau hasil pengujian aplikasi. Path lokal, aturan pribadi, nama proyek dalam policy, dan metadata provenance termasuk konfigurasi yang dibackup. Jangan menambahkan sesi, database, credential, atau hasil MCP ke repositori ini. Penyaringan pola mengurangi risiko, bukan jaminan bebas data sensitif.
