# Backup setup OMP — SaKuRa-u

Snapshot konfigurasi Windows baseline 21 Oktober 2026, dengan pembaruan scoped hingga **31 Oktober 2026**. Ini backup konfigurasi dan sumber untuk **OMP default-profile**, bukan image sistem, installer, atau restore otomatis. Profil pengguna dan konfigurasi host lain tidak dimigrasikan otomatis.

## Isi dan sumber kebenaran

- `home/.omp/agent/AGENTS.md`: aturan global pengguna.
- `home/.omp/agent/config.yml`, `models.yml`, `mcp.json`: konfigurasi OMP, custom model/provider yang sudah ada, dan empat MCP: Publish or Perish, Context7, REA, Semgrep. `models.yml` memuat konfigurasi aicenter serta perintah pengambilan credential melalui bridge DPAPI, bukan nilai credential; menyalinnya tidak menyiapkan credential atau membuktikan endpoint dapat diakses.
- `home/.omp/agent/skills/`, `home/.agents/skills/`: skills OMP-only dan shared beserta file pendukung teks.
- `home/.omp/agent/extensions/`: sumber ekstensi lokal, termasuk RTK dan integrasi Orca.
- `home/.omp/plugins/`, `home/.omp/marketplaces.json`: registrasi dan sumber plugin Ponytail.
- `home/.omp/agent/ecosystem/runtime/`: launcher, bridge credential, source MCP lokal, manifests/lockfiles, serta pemeriksaan yang sudah ada. Kode pengelola credential bukan credential-nya.
- `home/.omp/agent/ecosystem/sources/`: sumber terpin dan notices/lisensi upstream. Tidak semua distribusi upstream disalin penuh.
- `home/.omp/agent/ecosystem/measurements/`, `ledger.json`, panduan ekosistem: provenance, pin versi, dan bukti dengan tanggal/cakupannya sendiri.
- `home/AppData/Roaming/rtk/config.toml`: konfigurasi RTK, bukan executable atau database-nya.
- `snapshot-manifest.json`: inventaris payload `home/`, ukuran byte, SHA-256 backup dan sumber, pengecualian, redaksi, serta versi yang dicatat. Jumlah berkas aktual mengikuti manifest dan hasil verifier, bukan angka tetap di README.
- `scripts/verify-snapshot.mjs`: pemeriksaan integritas luring yang hanya membaca snapshot; bukan installer, pemindai secret, atau skrip restore.

Waktu pembaruan UTC ada pada `updatedAt` di manifest. Catatan measurements bertanggal lama tetap historis: menyalinnya tidak berarti mengulang pengujian atau membuktikan integrasi bekerja pada mesin baru.

## Versi: baseline dan observasi terbaru

| Komponen | Baseline 21 Oktober 2026 | Diamati pada host 31 Oktober 2026 |
|---|---|---|
| OMP | `18.12.5` | `18.14.1` |
| Node | `24.19.0` | `24.19.0` |
| Bun | `1.4.2` | `1.4.2` |

Versi tiga CLI terbaru berasal dari pemeriksaan `node --version`, `bun --version`, dan `omp --version`; pembaruan snapshot ini tidak melakukan upgrade. Pin integrasi yang dipertahankan: REA `6.5.0`, Context7 `4.4.4`, Semgrep `1.181.0`, RTK `1.0.1`, Ponytail `5.3.2`. Pin tersebut bukan klaim pengujian ulang integrasi pada 31 Oktober. Ledger dan measurements dapat menyebut OMP versi lama; jangan menganggap hasil historis itu sebagai hasil OMP `18.14.1`.

## Pembaruan scoped dan routing

- Adopsi Agency Agents 22 Oktober tetap dipertahankan: 17 skill pendukung on-demand OMP-only dari commit `4e3ac3ca6604c75113f52c695dbddcc7af928b46`, body vendor tanpa modifikasi, MIT. Sumber lengkap berada di luar discovery; persona referensi dan yang dikecualikan tidak diregistrasi. SEO Specialist dan NEXUS/Agents Orchestrator tetap tidak aktif.
- Wave routing 24 Oktober mencakup katalog 90 skill saat itu, termasuk dua explicit-only. `ecosystem/SKILL-ROUTING.md` dan `ecosystem/runtime/skill-routing-cases.json` menyimpan pemilihan positif/near-miss; `measurements/routing-global-20261024*.json` menyimpan bukti historis dengan batasannya. Angka tersebut bukan jumlah discovery terbaru setelah penambahan berikutnya.
- Pembaruan 31 Oktober menambahkan enam skill selektif di `~/.omp/agent/skills/` dan memperbarui routing seluruh katalog, bukan hanya enam skill baru:

  | Skill | Sumber upstream terpin | Peran |
  |---|---|---|
  | `gsap-core`, `gsap-timeline`, `gsap-react` | [`greensock/gsap-skills`](https://github.com/greensock/gsap-skills/tree/aed9cfd3277740755f6bfc1155c7aa645403b760), commit `aed9cfd3277740755f6bfc1155c7aa645403b760` | Implementasi GSAP sesuai stack/kebutuhan; timeline dan integrasi React hanya bila relevan |
  | `domain-modeling`, `to-questionnaire` | [`mattpocock/skills`](https://github.com/mattpocock/skills/tree/a496f5513d4a4cf889bc48e189e579f4b0bdf6aa), commit `a496f5513d4a4cf889bc48e189e579f4b0bdf6aa` | Bahasa/domain model dan klarifikasi terstruktur sesuai tahap tugas |
  | `motion` | [`motiondivision/ai-kit`](https://github.com/motiondivision/ai-kit/tree/1e424943582cbbdb6e3f410687e39f96451447bb/plugins/motion/skills/motion), commit `1e424943582cbbdb6e3f410687e39f96451447bb`, hanya subtree `plugins/motion/skills/motion` | Panduan Motion ketika library/stack tersebut relevan |

  Body dan berkas pendukung skill dipertahankan asli dari pin upstream. Penambahan ini tidak memasang runtime GSAP/Motion, ScrollTrigger, plugin pack, `teach`, atau `web-perf`.
- Aturan lintas model disampaikan melalui instruksi OMP dan fixture pemilihan, bukan runner vendor/model API baru. Routing membantu memilih panduan sesuai tahap dan stack; bukan jaminan semua model memilih skill identik. Skill selection tidak memberi izin instalasi, eksekusi, cloud, atau akses credential.
- Proposal baru dapat memakai grilling; kelanjutan yang sudah disetujui menjaga keputusan sebelumnya. Gunakan sesi OMP baru untuk memuat konfigurasi terbaru; hot reload tidak dijamin.
- Pemeriksaan native yang tersedia memeriksa discovery, URI/slash command, hidden flags, serta prompt dalam cwd proyek dan netral. Hasil klasifikasi model, bila dicatat, hanya smoke sintetis terhingga; bukan bukti kualitas aplikasi, aksesibilitas, performa, riset, keamanan, atau keberhasilan workflow nyata.

Hasil 31 Oktober: discovery native pada cwd proyek dan netral masing-masing menemukan **96 skill, 93 model-visible, tiga explicit-only**, tanpa warning; seluruh 96 command/URI dan pemuatan policy diperiksa. Model existing `openai-codex/gpt-6.1-sol` lulus **192/192** kasus positif/near-miss sintetis. Evidence lengkap ada di `home/.omp/agent/ecosystem/measurements/skills-routing-20261031{,-discovery,-selection,-integrity}.json`. Model lain, aplikasi nyata dan restore mesin bersih belum diuji; hasil ini bukan jaminan routing deterministik.

Tidak ada MCP, hook, service, provider, atau integrasi host lain baru yang diaktifkan oleh pembaruan ini. Headroom tetap tidak diaktifkan. Menyimpan sumber executable tidak menjalankannya; **memulihkan konfigurasi aktif lalu memulai OMP dapat memuat ekstensi atau memulai MCP yang dikonfigurasi**. Tinjau dan nonaktifkan komponen yang belum siap sebelum startup.

## Verifikasi snapshot sebelum restore

Tinjau skrip terlebih dahulu. Dari root clone, jalankan dengan Node yang sudah terpasang:

```powershell
node scripts/verify-snapshot.mjs --self-test
node scripts/verify-snapshot.mjs
```

Tidak perlu dependency tambahan. Skrip menggunakan stdlib Node, tidak mengakses jaringan, menjalankan subprocess/Git, menulis berkas, memasang komponen, atau mengubah home pengguna. Lokasi repositori ditentukan dari lokasi skrip, bukan dari home pengguna.

Verifier menolak path absolut/traversal, nama tidak portable untuk Windows, duplikat/case collision, metadata byte/hash tidak valid, symlink/junction, tipe nonreguler, dan pola path secret/state/binary yang dilarang. Ia membandingkan ukuran dan SHA-256 dengan manifest untuk **semua berkas di `home/`**, termasuk yang belum tracked atau diabaikan Git: berkas hilang, rusak, atau tidak terdaftar membuat exit code nonzero. Jangan menyimpan berkas lokal tambahan di dalam payload `home/`.

`--self-test` memakai fixture in-memory untuk byte/hash berubah, missing/unlisted, duplikat, traversal, dan batas path terlarang; tidak membuat fixture di disk. Perintah normal hanya memeriksa SHA-256 backup (`sha256`), bukan `sourceSha256` terhadap instalasi asal yang tidak tersedia pada clone. Manifest itu sendiri harus berasal dari sumber tepercaya: hash yang cocok bukan autentikasi penerbit, scan secret, validasi isi semua kode, atau bukti restore berhasil.

Target runtime yang dicatat adalah Node `24.19.0`; kompatibilitas Node lama dan restore lintas OS belum dinyatakan terverifikasi. Skrip memakai path portable, tetapi payload menyertakan launcher PowerShell/Windows, ketergantungan DPAPI, dan path absolut Windows. Dukungan long paths Git/Windows tetap diperlukan; jangan ubah line ending payload karena hash dihitung per byte. `.gitattributes` mempertahankan byte `home/**`. Jalankan verifier pada checkout lokal yang tidak sedang dimutasi, bukan sebagai sandbox untuk tree yang disunting penyerang secara bersamaan.

## Tidak disertakan

Credential/API key/PAT/OAuth, blob DPAPI, database OMP, sesi/riwayat percakapan, log, cookies/profil browser, cache/state runtime, backup lama, `node_modules`, virtualenv Python, binary/executable vendor, arsip unduhan dan file nonteks tidak termasuk kebijakan snapshot. Sumber distribusi plugin dalam path cache dapat dipertahankan sebagai sumber, bukan state sesi/runtime.

Dua metadata Semgrep memiliki JWT URL unduhan yang telah diganti dengan `[REDACTED_SIGNED_DOWNLOAD_TOKEN]`; hash sumber dipertahankan untuk provenance, bukan untuk mengunduh ulang. Catatan scan pola credential historis/scoped tidak menjamin ketiadaan secret. `.gitignore` mencegah sebagian penambahan tak sengaja, tetapi tidak menyaring ulang berkas yang sudah tracked.

Login OMP/GitHub dan credential integrasi yang dibutuhkan harus disiapkan ulang melalui alur yang disetujui. Snapshot tidak dimaksudkan untuk memulihkan credential, data proyek, atau akun cloud.

## Pemulihan manual yang aman

1. Clone repositori. Pada Windows, gunakan `git -c core.longpaths=true clone https://github.com/SaKuRa-u/omp-setup.git` untuk path sumber yang panjang. Tinjau README, manifest, dan verifier; jalankan pemeriksaan luring di atas. Backup konfigurasi mesin tujuan terlebih dahulu.
2. Pasang hanya OMP, Node/Bun, Git dan tool yang diperlukan dari distribusi resmi, dengan mempertimbangkan versi baseline/pin dan observasi terbaru di atas. Jangan menjalankan seluruh skrip atau installer yang ada dalam skill/sumber. Semgrep Windows memerlukan virtualenv/dependency sesuai catatan `ecosystem/runtime/semgrep/1.181.0/`; binary tidak ada dalam backup.
3. Hentikan OMP. Pilih dan salin berkas `home/` ke direktori home pengguna tujuan secara manual; jangan mengganti seluruh profil atau menimpa konfigurasi host lain. Pertahankan struktur `.omp`/`.agents`, sumber yang dirujuk, notices dan lisensi. Tidak ada restore otomatis.
4. Path absolut masih menunjuk `C:/Users/Indrimeilla-PC`. Sesuaikan salinan konfigurasi aktif, path discovery skill/shared, registrasi plugin, launcher, policy, serta executable mesin tujuan. Jangan melakukan search/replace massal pada manifest, measurements, hash, atau sumber vendor. Verifier berlaku pada clone asli sebelum migrasi, bukan salinan aktif yang sudah Anda ubah.
5. Tinjau `config.yml`, `models.yml`, dan `mcp.json` **sebelum memulai OMP**. Snapshot mempertahankan `tools.approvalMode: yolo` dan `dev.autoqaConsent: granted`; pilih ulang kebijakan persetujuan yang Anda inginkan. Memory tetap `off`. Custom model aicenter memakai bridge `ecosystem/runtime/credentials.ps1` dan credential DPAPI lokal yang harus disiapkan ulang; periksa path PowerShell/bridge pada mesin tujuan tanpa menjalankan perintah credential untuk sekadar meninjau snapshot. Ini konfigurasi provider yang sudah ada, bukan provider baru. Tinjau ekstensi/plugin dan nonaktifkan MCP yang dependency/credential-nya belum siap. Salinan konfigurasi bukan izin baru untuk audit berbayar, cloud, deployment, atau capture memory.
6. Pasang dependency hanya pada runtime yang dipilih, memakai package manager/lockfile terkait setelah memeriksa lifecycle scripts. Pulihkan REA dari distribusi resmi `rea-agents@6.5.0`. Untuk PoP, peroleh CLI vendor `8.19.5300` secara resmi lalu cocokkan signature/hash sesuai kode dan measurements sebelum menaruhnya di `runtime/publish-or-perish/1.0.0/vendor/`.
7. Buat ulang state/cache/temp yang benar-benar dirujuk launcher. Semgrep memerlukan konfigurasi `state/settings.yml`, log/cache dan `state/tmp`; state asli sengaja tidak dibackup. Periksa telemetry/metrics sebelum menjalankan tool. Membuat direktori saja tidak menggantikan konfigurasi state yang diperlukan.
8. Buat credential baru melalui alur DPAPI yang disetujui. Jangan menaruh secret pada berkas tracked, argumen CLI, environment global, atau chat. DPAPI dari mesin lama tidak portable. Token yang pernah terekspos harus dicabut, bukan dipakai ulang.
9. Pasang RTK resmi sesuai pin bila diperlukan; executable tidak disertakan. Salin konfigurasi `home/AppData/Roaming/rtk/config.toml` secara selektif ke `%APPDATA%/rtk/config.toml`, sesuaikan path database/PATH, dan pertahankan telemetry nonaktif bila sesuai kebijakan Anda. Ekstensi Orca memerlukan aplikasi/integrasi Orca yang sesuai; aplikasinya tidak disertakan.
10. Mulai sesi OMP baru hanya setelah meninjau komponen aktif, lalu periksa discovery skills/plugin. Aktifkan dan periksa hanya MCP yang sudah disiapkan. Jalankan smoke test yang ditinjau dan relevan; pengujian live/cloud memerlukan persetujuan target/biaya. Restore pada mesin bersih belum dibuktikan, dan README ini tidak menyatakan MCP live lulus.

## Lisensi dan privasi

Skills/plugin/sumber pihak ketiga tetap mengikuti lisensi upstream masing-masing; tidak ada lisensi tunggal yang menggantikannya. Sumber `greensock/gsap-skills` dan `mattpocock/skills` di atas berlisensi MIT. Untuk `motiondivision/ai-kit`, deklarasi vendor menyebut MIT; root `LICENSE` tidak ditemukan pada pin yang ditinjau, sehingga metadata README/package provenance dipertahankan dan tidak diganti dengan teks lisensi buatan.

Lisensi teks skill tidak otomatis melisensikan runtime GSAP/Motion, aset, font, plugin, atau dependency lain yang kelak dipakai. Periksa ketentuan vendor masing-masing sebelum distribusi/penggunaan. ARS berlisensi CC BY-NC 4.0 dan dibatasi untuk penggunaan akademik/personal nonkomersial sesuai aturan pengguna. Pertahankan attribution/notices.

Skill yang terpasang adalah panduan, bukan bukti kualitas kode, kemampuan model, runtime library yang sudah tersedia, atau hasil pengujian aplikasi. Path lokal, aturan pribadi, nama proyek dalam policy, dan metadata provenance termasuk konfigurasi yang dibackup. Jangan menambahkan sesi, database, credential, atau hasil MCP ke repositori ini. Penyaringan pola mengurangi risiko, bukan jaminan bebas data sensitif.
