# Snapshot tambahan diagram OMP — 11 November 2026

## Target dan perubahan

Repository: https://github.com/SaKuRa-u/omp-setup, branch `main`. Baseline lokal dan remote sebelum perubahan: `d77563460d04da103c31d0a6cd26063ede598cdd`; checkout bersih. Pengguna menyetujui tiga skill dan meminta pembaruan repository; tidak mengizinkan aplikasi desktop, renderer baru atau unggah diagram.

Snapshot selektif menambahkan supporting file teks untuk `stack-diagram`, `mermaid-diagrams`, `drawio-skill`, beserta lisensi upstream, pin/hash, panduan pemakaian dan observasi discovery. Aturan global AGENTS.md dan katalog SKILL-ROUTING.md diperbarui untuk prioritas format dan batas eksekusi. README dan manifest snapshot menyesuaikan cakupan. Tidak menyinkronkan ulang config.yml, models.yml, mcp.json, plugin/ekstensi atau komponen lain yang tidak terkait wave ini.

Vendor skill tidak diedit. Snapshot bukan distribusi upstream lengkap: dua font WOFF2 stack-diagram, katalog shape Draw.io `data/shape-index.json.gz`, serta tiga arsip ZIP source lokal dihilangkan sesuai kebijakan teks existing. SVG template/glyph dan lisensi OFL dipertahankan. Semua aset yang hilang harus dipulihkan selektif dari commit resmi dengan hash/lisensi yang sesuai sebelum render atau lookup shape; hash snapshot tidak berarti runtime siap.

## Routing dan global scope

[Observasi native](../diagram-skills-20261111/routing-verification.json): proses OMP baru pada root netral C:/Windows/Temp menemukan 178 entrypoint unik, 162 metadata terlihat, 16 hidden, tanpa warning atau stderr. Ketiga tambahan berasal dari `native:user` di `~/.omp/agent/skills/`; berlaku lintas proyek OMP default-profile pengguna ini, bukan host/akun/named profile lain. Integritas 110 file instalasi terhadap arsip terpin lulus. Flag `disable-model-invocation: true` Draw.io dipertahankan dan hide=true teramati.

Prioritas source-assessed: format editable/Draw.io diminta nyata → Draw.io; logo stack/cloud → stack-diagram; visual editorial → diagram-design; diagram teks → Mermaid. Generic arsitektur bukan izin menjalankan semua skill. Planning tetap mengikuti requirements/NFR, owner native/codebase-design/domain-modeling dan writing-plans setelah desain settled.

Klasifikasi model, slash-command invocation, rendering, edit web, live infra, native export, semua MCP dan clean-machine restore **belum diuji pada wave ini**. Angka smoke lama tetap historis. Tidak ada klaim semua routing aman, tanpa overlap semantik, atau deterministik; overlap metadata dikendalikan kebijakan, bukan sandbox OS.

## Pemakaian dan batas helper

[USAGE.md](../diagram-skills-20261111/USAGE.md) memuat contoh dan batas lengkap. Pengguna akan mengedit `.drawio` melalui https://app.diagrams.net/; aplikasi desktop dan dependency renderer tidak dipasang. Native export membutuhkan desktop. Stack-diagram membutuhkan jaringan untuk ikon, serta Python/Playwright/Chromium untuk PNG; renderer vendor memakai `--no-sandbox`, tidak dijalankan. Tidak mengaktifkan galeri/publish, MCP server, live importer, akun, provider, dependency download, telemetry atau hooks.

OMP CLI 18.18.8, Node v24.19.0 dan Bun CLI 1.4.2 teramati; pekerjaan ini tidak meng-upgrade runtime. Provider/MCP/config tetap snapshot baseline sebelumnya, bukan acceptance ulang versi tersebut.

## Verifikasi sebelum publikasi

Verifier existing dibaca dan tidak diubah. Jalankan `node scripts/verify-snapshot.mjs --self-test` lalu `node scripts/verify-snapshot.mjs` pada payload akhir sebelum commit/push. Pemeriksaan ini offline/read-only dan membuktikan integritas, path dan teks payload sesuai manifest; bukan autentikasi upstream atau scanner secret. Receipt/hasil command dan hash commit publikasi disimpan di host asal di luar payload agar tidak membuat referensi sirkular.

Scope penyalinan memakai allowlist tiga direktori skill dan berkas routing/measurements terkait. Tidak ada pembacaan nilai credential, sesi, log, database, cookies/profil browser atau runtime state. Scoped screening pola credential pada payload tambahan/berubah dan README tidak mencetak nilai; detail hasil ada di manifest. Tidak ada sertifikasi bebas secret atau audit keamanan menyeluruh. Seluruh payload lama dan redaksi historis dipertahankan; tidak menghapus atau menimpa perubahan pengguna yang tidak terkait.
