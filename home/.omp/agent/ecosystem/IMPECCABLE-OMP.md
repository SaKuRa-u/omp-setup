# Impeccable resmi OMP: batas eksekusi global

Instalasi OMP menggunakan subtree `.omp/skills/impeccable` asli versi 4.8.0, commit `414603bf14c7a344edb466bb1f85690c77ce8b7d`, release [skill-v4.8.0](https://github.com/pbakaus/impeccable/releases/tag/skill-v4.8.0), Apache-2.0. Isi vendor tidak dipatch; LICENSE upstream tetap disertakan. Scope pengguna default-profile: `~/.omp/agent/skills/impeccable`. Salinan untuk host lain dipertahankan; alias duplikat `agents/impeccable` dan `claude/impeccable` dikecualikan di OMP, bukan menjadi designer kedua. Panduan Emil, a11y, metadata dan composition mendukung tugas khusus di bawah owner ini; pembagian aktivasi ada di `SKILL-ROUTING.md` dan aturan global OMP.

Routing intent 7 November 2026 memilih satu lead otomatis sesuai brief, stack, incumbent UI dan kemampuan teruji. Impeccable fallback saat tidak ada pembeda, bukan owner eksklusif; Taste, frontend-design, Hallmark dan Anti-Slop dapat dipilih tanpa pengguna menyebut namanya. Gate dokumen ini berlaku ketika Impeccable dipilih, bukan kewajiban menjalankan seluruh workflow Impeccable untuk alternatif. Batas izin, constraint vendor, konteks incumbent dan verifikasi UI tetap berlaku; Hallmark render yang belum berhasil tidak boleh dinyatakan lulus.

## Kontrak yang mengalahkan contoh vendor

- Baca dokumen ini sebelum setup atau referensi executable. Instalasi guidance tidak mengizinkan engine, detector, hooks, pin/unpin, live server, image API, browser injection, paid model runner, atau bootstrap download. Jangan menjalankan launcher POSIX/Windows maupun `npx impeccable`, termasuk `context` dan `engine-probe`. Launcher dapat mengeksekusi override/PATH/cache atau mengunduh engine; manifest checksum upstream maupun stamp `.verified` bukan izin eksekusi.
- Gunakan fallback resmi ketika launcher ditolak: beri tahu bahwa engine context tidak dijalankan, kemudian baca konteks proyek langsung melalui tool native. Ini mode guidance/manual, bukan klaim engine atau seluruh fitur produk telah teruji. Engine 0.1.18, live, dan launcher Windows belum diuji di instalasi ini. CLI npm mensyaratkan Node >=18.19.0; Node 24.19.0 yang diamati parent memenuhi batas versi itu. OMP 18.18.0 bukan versi Node; terpenuhinya batas Node tidak mengizinkan eksekusi CLI.
- Tidak ada native OMP hook yang dibuktikan. Jangan memasang hook milik host lain atau adapter tiruan. Engine/detector membutuhkan keputusan artefak, Windows/runtime, network, writes, biaya, target, dan rollback tersendiri. Live memerlukan app lokal ber-HMR terpilih.
- Jangan mengganti PRODUCT.md/DESIGN.md, hash approval, brief, fakta produk, brand, atau referensi pengguna tanpa persetujuan scope aktual. `doctor`, drift `auto`, redesign, dan init di vendor bukan pengecualian. Tidak ada context inheritance dari ancestor tanpa kontrak monorepo eksplisit.
- Pilih playbook sesuai kebutuhan; baca craft-floor sebelum edit UI. Guidance React/Postgres hanya bila stack terbukti. Tidak otomatis memasang Figma/Storybook/shadcn/axe atau dependency lain.
- Jangan diam-diam menghapus checkpoint yang memerlukan engine: laporkan tidak dijalankan. Web critique tanpa detector bukan full vendor critique; beri label degraded beserta alasannya. Pada native ios/android/adaptive, 4.8.0 secara resmi hanya menjalankan assessment desain karena detector web tidak berlaku. Fan-out tetap tunduk pada kebutuhan tugas dan batas delegasi OMP, bukan semua playbook otomatis.

## Konteks dan root proyek

Pada awal tugas UI di root proyek yang benar-benar dipilih, inspeksi helper lalu jalankan sekali:

```powershell
node "$HOME/.omp/agent/ecosystem/runtime/design-gate.mjs" --project "C:/path/to/selected-project"
```

Helper existing bersifat read-only, tanpa network, subprocess, config loader, hook, atau write mode. Exit 0 = siap memakai konteks yang direview, 1 = missing/partial, 2 = argumen/root tidak aman/tidak terbaca. Ini bukan visual pass atau sandbox filesystem adversarial. `projectKind` new/existing/uncertain adalah heuristik, bukan izin mengganti UI. Missing DESIGN.md tidak berarti greenfield.

Baca PRODUCT.md, DESIGN.md, dan surface brief yang ada dalam root tersebut. Existing UI harus diperiksa dahulu. Refinement sempit boleh memakai bukti incumbent ketika konteks belum lengkap; laporkan gap. New/replacement world memerlukan brief dan arah yang disetujui. Tugas backend-only/Q&A tidak menjalankan gate, init, atau membuat dokumen.

Setelah pengguna menyetujui isi konteks aktual, record opsional `.impeccable/omp-gate.json` mengikuti helper existing: `schemaVersion:1`, `decision:approved-for-design`, `projectKind:new|existing`, `approval:{by:user,statement:<persetujuan aktual>}`, `scope`, `documents` berisi SHA-256 PRODUCT.md/DESIGN.md, `sources:[{path,sha256}]`, `references:[{origin:user|repository,value}]`. Existing memerlukan source yang benar-benar diperiksa; new boleh sumber kosong untuk arah provisional yang disetujui. Jangan merekayasa approval demi status ready. Catatan usang dilaporkan, tidak diperbaiki otomatis. Field/heading helper adalah konvensi integrasi lokal, bukan alasan menimpa dokumen valid.

## Bukti dan rollback

Verifikasi UI aktual pada desktop/mobile, keyboard/focus, empty/error/loading/success yang relevan, dan hasil server/data untuk alur fullstack. Lakukan bounded passes sesuai vendor. Nol temuan scanner bukan sertifikasi WCAG; sebutkan pemeriksaan manual/screen-reader/usability yang belum dilakukan. Gate, source review, screenshot saja, dan build tidak membuktikan alur end-to-end.

Bukti upgrade dan manifest SHA-256: `measurements/global-optimization-20261107/impeccable-upgrade.json`; bukti migrasi sebelumnya: `measurements/upgrade-20261019-impeccable.json`. Backup lengkap 4.6.0 dan dokumen ini sebelum upgrade: `backups/global-optimization-20261107/impeccable/`. Source resmi dipertahankan di `sources/impeccable-414603bf14c7a344edb466bb1f85690c77ce8b7d/`. Rollback tanpa deletion: pindahkan hanya direktori `~/.omp/agent/skills/impeccable` kandidat keluar dari root discovery, lalu salin kembali `skills/impeccable` dan `IMPECCABLE-OMP.md` dari backup tersebut ke lokasi asal. Jangan menjalankan vendor global cleanup atau mengubah host lain. Mulai sesi OMP baru setelah cutover/rollback; temukan skill bernama `impeccable`, baca dokumen ini dan SKILL.md versi 4.8.0 sebelum memakainya dalam mode manual.
