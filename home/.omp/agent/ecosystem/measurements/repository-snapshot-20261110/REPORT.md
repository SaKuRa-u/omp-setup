# Snapshot environment OMP — 10 November 2026

## Cakupan pembaruan

Tujuan publikasi: https://github.com/SaKuRa-u/omp-setup, branch `main`, baseline `104d4ee932aeec2079db80940d13d80b7ed61bd4` (8 November). Checkout tujuan bersih dan sama dengan remote sebelum perubahan. Pembaruan ini menyalin environment yang sudah dipilih; tidak memasang atau meng-upgrade komponen pada host.

- 23 tambahan motion/desain/riset/enrichment dan Humanizer ID original 1.5.1. Supporting file teks, lisensi dan attribution dipertahankan tanpa patch vendor. Manifest instalasi menyebut aset biner yang ada pada host asal; itu bukan daftar seluruh payload yang disalin.
- Empat berkas existing berubah terhadap sumber snapshot sebelumnya: AGENTS.md, config.yml, ecosystem/SKILL-ROUTING.md dan ledger.json. Seluruh 6.509 source path snapshot sebelumnya masih tersedia; tidak ada penghapusan payload lama. models.yml, mcp.json, ekstensi dan plugin existing tidak berubah pada perbandingan inventaris.
- Hyperframes CLI 0.9.28: `hyperframes.cmd`, package.json dan package-lock.json. Source referensi terpin yang memuat sibling tidak aktif dipertahankan sebagai teks di `ecosystem/sources/skills-expansion-20261110/heygen-com-hyperframes-58686a74c6a82c13cec05c67a76cc7555cea509b/`. Keberadaan SKILL.md pada source-only ini bukan registrasi native tambahan atau izin memakai provider/helper.
- Ringkasan evaluasi, seleksi, manifest hash, batas penggunaan dan acceptance agregat terpilih. Raw output inference/routing/editorial, rekaman tool, session traces, script evaluasi yang memanggil model, backup lama dan fixture render tidak dipublikasikan. Beberapa tautan laporan historis karenanya sengaja tidak memiliki payload pada snapshot.

## Observasi dan bukti

[host-observation.json](host-observation.json): OMP CLI 18.18.6, Node 24.19.0, Bun CLI 1.4.2; proses `omp skill list --json` baru pada root netral menemukan 175 entrypoint unik, 160 terlihat dan 15 hidden, warnings kosong. Sumber setiap entrypoint dicatat. Runtime Bun embedded/Eval terpisah dari versi Bun CLI; snapshot tidak menyamakan keduanya.

Pekerjaan snapshot memeriksa discovery dan integritas berkas, bukan mengulang smoke inference/MCP/render. Bukti adopsi terdahulu tetap bertanggal: ekspansi 8/8 routing sintetis; Hyperframes satu video 2 detik 640×360 24fps/48 frame; Humanizer ID 3/3 routing dan 4/4 preservasi dengan batas editorial. Tidak ada klaim seluruh kombinasi skill bebas konflik, semua toolchain siap, atau restore mesin bersih lulus.

Verifier repository existing tidak diubah. Jalankan dari root clone:

```powershell
node scripts/verify-snapshot.mjs --self-test
node scripts/verify-snapshot.mjs
```

Verifier hanya memeriksa integritas/path/teks payload sesuai manifest; bukan scanner secret, autentikasi upstream atau pengujian restore. Pemeriksaan pola credential sebelum publikasi tidak mencetak nilainya dan bukan jaminan ketiadaan data sensitif. Manifest akhir merekam aturan, hasil screening dan pengecualian; receipt publikasi berada pada measurements host asal di luar payload agar tidak mereferensikan hash commit dirinya sendiri.

## Batas teks dan lisensi

Tidak disalin: credential/DPAPI/OAuth, database/sesi/log/history, browser profile, runtime state/cache, node_modules, dependency terpasang, binary, arsip, font, gambar, PDF, audio dan video. Aset contoh Anatomy/Unslop serta font dan SFX Hyperframes yang dirujuk source sengaja tidak tersedia pada clone. Detail path baru yang dihilangkan ada pada `snapshotPolicy.artifactsOmitted` di manifest. Ini bukan distribusi upstream lengkap; ambil aset yang dibutuhkan dari sumber resmi terpin dengan lisensi yang sesuai sebelum menjalankan contoh.

Lisensi original per skill tetap berlaku, termasuk CC BY 4.0/atribusi Damir Sokolovsky untuk Unslop dan Apache-2.0 Hyperframes; lisensi aset/dependency terpisah. Humanizer ID disimpan sebagai panduan/dokumen/data: Python package, engine, audit.py dan subskill jurnal tidak dipasang atau disalin sebagai runtime aktif. Preset kampus dan contoh bahasa tidak menjadi otoritas di atas makna sumber/pedoman venue; baca EDITORIAL-BOUNDARIES.md sebelum penerapan.

## Pemulihan Hyperframes secara selektif

Bagian ini panduan manual, bukan perintah yang dijalankan saat snapshot atau izin instalasi otomatis di mesin tujuan.

1. Tinjau lockfile, source, lisensi dan launcher. Pilih Node yang kompatibel dan direktori runtime `ecosystem/runtime/hyperframes/0.9.28/` pada home tujuan. Launcher masih mengandung path Node dan Chromium host asal: sesuaikan hanya salinan aktifnya, bukan payload clone yang akan diverifikasi hash.
2. Setelah izin instalasi pada mesin tujuan, pulihkan dependency tepat dari lockfile menggunakan `npm ci --ignore-scripts --no-audit --no-fund` pada direktori runtime. Perintah mengakses registry; tidak dijalankan pada pekerjaan ini. Jangan memakai unpinned npx, vendor installer skills atau mengubah host agent lain.
3. Siapkan Chromium yang kompatibel tanpa profil login pengguna, serta FFmpeg/ffprobe dari sumber resmi yang dipilih. Browser/executable tidak dibundel. Path Chromium Playwright chromium-1243 pada launcher asal tidak menjamin browser tersedia pada mesin tujuan. Tidak ada download browser otomatis dari snapshot.
4. Buat state/config/cache lokal yang dipilih dan pertahankan env anak launcher: HYPERFRAMES_NO_TELEMETRY, DO_NOT_TRACK, HYPERFRAMES_NO_UPDATE_CHECK, HYPERFRAMES_NO_AUTO_INSTALL dan CI. State asli tidak dipulihkan. Jangan menyalin credential, cookies, atau profil browser ke sini; config bukan bukti no-egress.
5. Setelah review/izin target, uji `--version`, telemetry status, lalu satu project dummy melalui check/render dengan satu worker. Jangan mengaktifkan events/feedback/cloud/publish/media-provider/capture URL sebagai fallback. Compiler dapat mengambil Google Fonts walau input lokal; periksa request dan hak aset sebelum memakai konten rahasia.

Skills native terpasang global OMP default-profile pada host asal; clone ini tetap perlu pemulihan manual, penyesuaian path, dependency terpilih dan sesi OMP baru. Tidak ada restore otomatis atau jaminan hot reload.
