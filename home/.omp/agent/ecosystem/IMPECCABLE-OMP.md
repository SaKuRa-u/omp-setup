# Impeccable resmi OMP: batas eksekusi global

Instalasi OMP menggunakan subtree `.omp/skills/impeccable` asli versi 4.9.1, commit `acb4cfe14470b1fdf51e855431af618d936b7db8`, release [skill-v4.9.1](https://github.com/pbakaus/impeccable/releases/tag/skill-v4.9.1), Apache-2.0. Ini versi skill OMP, bukan CLI 4.9.2. Isi vendor tidak dipatch; LICENSE upstream tetap disertakan. Scope pengguna default-profile: `~/.omp/agent/skills/impeccable`. Salinan untuk host lain dipertahankan; alias duplikat `agents/impeccable` dan `claude/impeccable` dikecualikan di OMP, bukan menjadi designer kedua. Panduan Emil, a11y, metadata dan composition mendukung tugas khusus di bawah owner ini; pembagian aktivasi ada di `SKILL-ROUTING.md` dan aturan global OMP.

Routing intent 7 November 2026 memilih satu lead otomatis sesuai brief, stack, incumbent UI dan kemampuan teruji. Impeccable fallback saat tidak ada pembeda, bukan owner eksklusif; Taste, frontend-design, Hallmark dan Anti-Slop dapat dipilih tanpa pengguna menyebut namanya. Gate dokumen ini berlaku ketika Impeccable dipilih, bukan kewajiban menjalankan seluruh workflow Impeccable untuk alternatif. Batas izin, constraint vendor, konteks incumbent dan verifikasi UI tetap berlaku; Hallmark render yang belum berhasil tidak boleh dinyatakan lulus.

## Kontrak yang mengalahkan contoh vendor

- Baca dokumen ini sebelum setup atau referensi executable. Instalasi guidance tidak mengizinkan engine, detector, hooks, pin/unpin, live server, image API, browser injection, paid model runner, atau bootstrap download. Jangan menjalankan launcher POSIX/Windows maupun `npx impeccable`, termasuk `context` dan `engine-probe`. Launcher dapat mengeksekusi override/PATH/cache atau mengunduh engine; manifest checksum upstream maupun stamp `.verified` bukan izin eksekusi.
- Gunakan fallback resmi ketika launcher ditolak: beri tahu bahwa engine context tidak dijalankan, kemudian baca konteks proyek langsung melalui tool native. Ini mode guidance/manual, bukan klaim engine atau seluruh fitur produk telah teruji. Engine, live dan launcher Windows tidak dijalankan pada cutover 4.9.1. Node aktif 24.22.3; terpenuhinya prerequisite Node tidak mengizinkan eksekusi CLI.
- Tidak ada native OMP hook yang dibuktikan. Jangan memasang hook milik host lain atau adapter tiruan. Engine/detector membutuhkan keputusan artefak, Windows/runtime, network, writes, biaya, target, dan rollback tersendiri. Live memerlukan app lokal ber-HMR terpilih.
- Jangan mengganti PRODUCT.md/DESIGN.md, hash approval, brief, fakta produk, brand, atau referensi pengguna tanpa persetujuan scope aktual. `doctor`, drift `auto`, redesign, dan init di vendor bukan pengecualian. Tidak ada context inheritance dari ancestor tanpa kontrak monorepo eksplisit.
- Pilih playbook sesuai kebutuhan; baca craft-floor sebelum edit UI. Guidance React/Postgres hanya bila stack terbukti. Tidak otomatis memasang Figma/Storybook/shadcn/axe atau dependency lain.
- Jangan diam-diam menghapus checkpoint yang memerlukan engine: laporkan tidak dijalankan. Web critique tanpa detector bukan full vendor critique; beri label degraded beserta alasannya. Detector web bukan bukti assessment native iOS/Android/adaptive; batasi klaim pada pemeriksaan yang benar-benar dilakukan. Fan-out tetap tunduk pada kebutuhan tugas dan batas delegasi OMP, bukan semua playbook otomatis.

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

Bukti cutover aktif 4.9.1: `measurements/environment-apply-20261117/skills/result.json` dan `installed-manifest.json`; backup 4.8.0 serta dokumen ini: `backups/environment-apply-20261117/skills/` dan `backups/environment-apply-20261117/parent/ecosystem/IMPECCABLE-OMP.md`. Hash/support/flags diperiksa, bukan engine/UI. Gunakan rollback per-target pada result aktif. Bukti migrasi sebelumnya tetap disimpan pada `measurements/global-optimization-20261107/impeccable-upgrade.json` dan `measurements/upgrade-20261019-impeccable.json`. Jangan menjalankan vendor global cleanup atau mengubah host lain. Mulai sesi OMP baru setelah cutover/rollback; baca dokumen ini dan SKILL.md versi yang benar-benar aktif sebelum memakai mode manual.
