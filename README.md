# Backup setup OMP — SaKuRa-u

Snapshot konfigurasi Windows pada 21 Oktober 2026. Ini backup konfigurasi dan sumber, **bukan image sistem atau installer otomatis**. Tidak mengubah atau meng-upgrade instalasi asli.

## Isi

- `home/.omp/agent/AGENTS.md`: aturan global pengguna.
- `home/.omp/agent/config.yml`, `mcp.json`: konfigurasi OMP dan empat MCP: Publish or Perish, Context7, REA, Semgrep.
- `home/.omp/agent/skills/`, `home/.agents/skills/`: skills OMP-only dan shared beserta file pendukung teks.
- `home/.omp/agent/extensions/`: ekstensi lokal termasuk RTK dan integrasi Orca.
- `home/.omp/plugins/`, `home/.omp/marketplaces.json`: registrasi dan sumber plugin Ponytail.
- `home/.omp/agent/ecosystem/runtime/`: launcher, bridge credential, source MCP lokal, package manifests/lockfiles, dan pemeriksaan yang sudah ada. Menyimpan kode pengelola credential bukan menyimpan credential-nya.
- `home/.omp/agent/ecosystem/sources/`: sumber ARS dan Ponytail yang dirujuk konfigurasi; lisensi/notices dari sumber upstream lain. Tidak semua distribusi upstream disalin penuh.
- `home/.omp/agent/ecosystem/measurements/`, `ledger.json`, panduan ekosistem: provenance, pin versi, dan bukti historis. Catatan historis bukan bukti bahwa integrasi masih bekerja pada mesin baru.
- `snapshot-manifest.json`: daftar seluruh file snapshot, ukuran, SHA-256 hasil backup dan sumber, pengecualian, redaksi, serta versi yang diamati.

## Versi yang diamati

OMP `18.12.5`, Node `24.19.0`, Bun `1.4.2`; REA `6.5.0`; Context7 `4.4.4`; Semgrep `1.181.0`; RTK `1.0.1`; plugin Ponytail `5.3.2`. Ledger lama dapat mencatat versi OMP sebelumnya; manifest snapshot mencatat versi CLI saat backup.

## Tidak disertakan

Credential/API key/PAT/OAuth, blob DPAPI, database OMP, sesi/riwayat percakapan, log, cookies/profil browser, cache/state runtime, backup lama, `node_modules`, virtualenv Python, binary/executable vendor, arsip unduhan dan file nonteks. Dua metadata Semgrep mengandung JWT URL unduhan; nilai tersebut diganti dengan `[REDACTED_SIGNED_DOWNLOAD_TOKEN]` dan hash sumber tetap dicatat untuk provenance, bukan untuk mengunduh ulang.

Konsekuensi: login OMP/GitHub dan credential Context7/Supermemory harus disiapkan ulang; dependency dan executable resmi harus dipasang ulang. Tidak ada credential yang dapat dipulihkan dari repositori ini. Snapshot bukan backup data proyek atau akun cloud.

## Pemulihan manual yang aman

1. Clone repositori ini. Periksa `snapshot-manifest.json` dan file konfigurasi sebelum menjalankan kode apa pun. Simpan backup konfigurasi mesin tujuan terlebih dahulu; jangan menimpa profil OMP atau konfigurasi host lain tanpa persetujuan.
2. Pasang OMP, Node/Bun, Git serta dependency yang benar-benar dibutuhkan dari distribusi resmi dengan versi di atas. Jangan menjalankan semua script atau installer yang ditemukan dalam skills/sumber. Semgrep Windows memerlukan virtualenv/dependency sesuai hash dan catatan di `ecosystem/runtime/semgrep/1.181.0/`; binary tidak ada dalam backup ini.
3. Dengan OMP dihentikan, salin file dari `home/` ke direktori home pengguna tujuan secara selektif. Pertahankan struktur `.omp` dan `.agents`, termasuk sumber ARS, Ponytail, notices dan lisensi. Tidak ada script restore otomatis yang menimpa konfigurasi.
4. Path absolut masih menunjuk `C:/Users/Indrimeilla-PC`. Sesuaikan konfigurasi, registrasi plugin, launcher dan policy yang relevan untuk home/path executable mesin tujuan. `snapshot-manifest.json` serta measurements adalah rekaman historis: jangan menggantinya massal.
5. Periksa `config.yml`: snapshot mempertahankan `tools.approvalMode: yolo` dan `dev.autoqaConsent: granted` dari sumber. Pilih kebijakan persetujuan yang Anda inginkan **sebelum** memulai OMP. Memory tetap `off`; tidak ada izin baru untuk audit berbayar, cloud, deployment, atau capture memory.
6. Pasang dependency hanya pada runtime yang akan digunakan, memakai package manager/lockfile yang bersangkutan dan setelah memeriksa lifecycle scripts. Pulihkan REA melalui distribusi resmi `rea-agents@6.5.0`. Untuk PoP, peroleh CLI vendor 8.19.5300 secara resmi dan cocokkan signature/hash sesuai kode dan measurements sebelum menaruhnya di `runtime/publish-or-perish/1.0.0/vendor/`.
7. Buat ulang folder state/cache/temp yang dirujuk launcher. Semgrep menunjuk `state/settings.yml`, log, cache, dan `state/tmp`; konfigurasi state asli sengaja tidak dibackup. Periksa kembali pengaturan telemetry/metrics sebelum menjalankan tool.
8. Masukkan credential baru melalui alur DPAPI yang disetujui. Jangan menaruh secret pada file tracked, argumen CLI, environment global, atau chat. DPAPI dari mesin lama tidak portable. Token yang pernah terekspos harus dicabut, bukan dipakai ulang.
9. RTK executable tidak termasuk backup; `%APPDATA%/rtk/config.toml` disertakan di `home/AppData/Roaming/rtk/config.toml` dengan telemetry nonaktif. Pasang RTK resmi versi yang dicatat, sesuaikan path database dan periksa PATH. Ekstensi Orca memerlukan aplikasi/integrasi Orca yang sesuai; backup ini tidak menyertakan aplikasi tersebut.
10. Mulai sesi OMP baru, periksa discovery skills/plugin dan empat MCP. Jalankan hanya smoke test yang sudah ditinjau dan relevan; pengujian live/cloud perlu persetujuan target/biaya. Backup ini belum diuji restore pada mesin bersih dan tidak menyatakan MCP live lulus.

## Lisensi dan privasi

Skills/plugin/sumber pihak ketiga tetap di bawah lisensi upstream masing-masing; tidak ada lisensi tunggal yang menggantikannya. ARS berlisensi CC BY-NC 4.0 dan dibatasi untuk penggunaan akademik/personal nonkomersial sesuai aturan pengguna. Pertahankan attribution/notices dan periksa hak distribusi/penggunaan setiap komponen.

Path lokal, aturan pribadi, nama project dalam policy dan metadata provenance memang termasuk konfigurasi yang dibackup. Jangan menambahkan sesi, database, credential, atau hasil MCP ke repositori ini. Penyaringan pola credential mengurangi risiko, bukan jaminan tidak ada data sensitif.
