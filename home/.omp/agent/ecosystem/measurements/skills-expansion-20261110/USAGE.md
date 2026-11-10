# Penggunaan tambahan OMP — 10 November 2026

Seleksi aktual: [selection.json](selection.json). Source vendor asli tidak diedit. Metadata otomatis berlaku pada sesi baru; bukan jaminan klasifikasi deterministik atau hot reload. Root OMP default-profile pengguna ini saja, bukan Claude Code/Codex/host lain. Pemilihan skill tidak memberi izin operasi di luar tugas.

## Motion website atau video

- Hover/focus/drawer/scroll interaktif: reuse CSS/native, Emil, GSAP atau Motion existing sesuai stack, brief dan reduced-motion. Jangan memilih Hyperframes hanya karena kata motion.
- Video/motion graphics/aset video untuk website: baca `hyperframes` dahulu, `hyperframes-cli` untuk operasi dan `hyperframes-registry` untuk komponen. Satu pemilik motion/visual per tahap; reuse token brand yang sudah disetujui.
- CLI resmi tersedia melalui `C:/Users/Indrimeilla-PC/.omp/agent/ecosystem/runtime/hyperframes/0.9.28/hyperframes.cmd`. Launcher hanya menetapkan environment anak lalu menjalankan package upstream asli; bukan adapter engine. Tidak ditambahkan ke PATH global. Jalankan dari direktori project video yang dipilih.

```powershell
& 'C:/Users/Indrimeilla-PC/.omp/agent/ecosystem/runtime/hyperframes/0.9.28/hyperframes.cmd' --version
& 'C:/Users/Indrimeilla-PC/.omp/agent/ecosystem/runtime/hyperframes/0.9.28/hyperframes.cmd' check --json
& 'C:/Users/Indrimeilla-PC/.omp/agent/ecosystem/runtime/hyperframes/0.9.28/hyperframes.cmd' render --quality draft --workers 1 -o ./renders/output.mp4
```

Periksa `--help` versi terkunci untuk operasi lain. Scaffold project hanya dalam scope yang diminta; gunakan `init <dir> --skip-skills`, jangan installer `skills update` yang menulis integrasi host lain. CLI 0.9.28 dipasangkan dengan source tag v0.9.28 / 58686a74c6a82c13cec05c67a76cc7555cea509b. npm lifecycle scripts dilewati; dependency tepat dan SRI ada di package-lock.json. Update pin bukan side effect pemakaian.

Launcher menetapkan HYPERFRAMES_NO_TELEMETRY=1, DO_NOT_TRACK=1, HYPERFRAMES_NO_UPDATE_CHECK=1, HYPERFRAMES_NO_AUTO_INSTALL=1, CI=1 dan config/cache lokal. CI menonaktifkan warm-check worker persisten. Browser existing yang dipilih: Chromium Playwright chromium-1243, bukan profil pengguna; FFmpeg/ffprobe existing dipakai. Jika browser tersebut dipindahkan/hilang, laporkan prasyarat; jangan mengambil profil login atau mengunduh pengganti diam-diam. `--workers 1` mengurangi konsumsi memori pada host ini, bukan benchmark kualitas/performa.

**Lokal tidak berarti offline.** Render smoke mengambil font Inter publik dari Google Fonts walau HTML fixture tidak memuat URL eksternal. Compiler dapat mengambil font; registry add mengambil source/aset dari jaringan. Tidak ada sandbox/no-egress OS yang dibuktikan. Gunakan aset/font lokal yang berlisensi dan periksa request/source bila konten rahasia. Telemetry status terbukti disabled; tidak ada klaim pemantauan seluruh trafik.

Instruksi vendor untuk `events`, `feedback`, `usage`, auth/cloud/publish, capture URL, desktop-app promotion, atau media provider bukan izin menjalankannya. Jangan kirim feedback/bug report/publish otomatis. Tidak ada akun/HeyGen/voice/music/image generation/model/download/provider/credits dalam pemasangan ini. `media-use`, `reverse-any-video`, `style-sampling`, `figma`, `slideshow`, `remotion-to-hyperframes` tetap source-only, bukan kapabilitas aktif; lihat source tree terpin bila hanya perlu membaca referensi. Jalur relatif yang menunjuk sibling tidak aktif harus di-resolve pada full source tree `ecosystem/sources/skills-expansion-20261110/heygen-com-hyperframes-58686a74c6a82c13cec05c67a76cc7555cea509b/skills/`, bukan dianggap tool terpasang.

## Desain dan diagram

- `diagram-design`: diagram editorial HTML/SVG, konektor/geometri/fidelity ledger. Chat flow/sequence sederhana tetap Mermaid. Onboarding/profile vendor dapat mengubah installed style guide; pin harus immutable, perubahan style masuk proyek/profile yang disetujui, bukan vendor tree. System-font mode tersedia untuk kebutuhan offline.
- `anatomy`: mekanisme fisik isometrik interaktif dan readout dari satu model. Bukan pemilik flowchart/API. Kit original tersedia sebagai source; audit/render helper belum diuji di OMP. Jangan membaca sesi melalui session.mjs atau menjalankan publish.mjs/submit; ini dapat membaca ~/.claude/projects dan menerbitkan prompt/metadata ke GitHub. Capture/drive memakai flag browser yang melonggarkan keamanan: tidak diaktifkan oleh registrasi. Gunakan verifikasi browser native yang berizin untuk implementasi nanti; jangan klaim audit vendor lulus bila tidak dijalankan.
- `teardown`: ilustrasi technical linework assembled/exploded, bukan manufacturing CAD/toleransi atau audit source. Helper discovery browser mengasumsikan which/macOS/Linux; belum terbukti native Windows. Tidak dibuat shim agar tampak kompatibel.
- `better-interface`: alternatif review enam domain. `better-accessibility`, `better-colors`, `better-layout`, `better-typography`, `better-ui`, `better-writing` dipilih untuk kriteria/domain spesifik. Jangan menumpuk beberapa owner review atau memaksakan token/easing/angka opini vendor di atas konvensi proyek dan aksesibilitas. Table coverage membedakan source-assessed dari rendered verified.
- `unslop`: alternatif retrofit visual AI-looking, bukan pipeline tambahan setelah semua desain. Pertahankan fitur/konten existing dan fakta; jangan fabrikasi statistik/mock copy sebagai data nyata atau mengirim hasil dengan slot aset kosong. Atribusi sumber Damir Sokolovsky (@heydamir), https://heydamir.design/unslop, CC BY 4.0, dipertahankan dalam distribusi asli. Snapshot/story helper belum diuji dan tidak berjalan otomatis: bisa mengeksekusi halaman, mengambil aset, menyalakan server, menimpa output dan membersihkan frame.
- `antislop-layoutmobile`: filter reflow tablet/phone, overflow, content breakpoints/safe area. Keyboard virtual/PWA/touch behavior tetap mobile-native. 44px adalah sasaran ergonomi, bukan universal WCAG AA; jangan menyembunyikan overflow untuk menutupi kerusakan.

Kelima skill Jakub `break`, `explain-interface`, `interface-review`, `state-machine`, `variant` mempertahankan flag explicit-only upstream. Pengguna boleh meminta hasil sesuai domain atau memilih command skill; tawarkan bila cocok, jangan membacanya otomatis untuk melewati flag. `state-machine` adalah galeri state UI existing, bukan XState atau state diagram. Fixture/picker harus memakai data dummy tanpa state sensitif di URL; scope read-only tetap tidak membuat harness.

Elaya Figma memerlukan Figma MCP/figma-use/generate-* yang tidak tersedia. Landing page Elaya memaksakan struktur/animasi luas; hanya diarsipkan, bukan designer default. Jakub build-design meminta fidelity mengalahkan contrast/focus dan afk memperluas operasi unattended; keduanya tidak didaftarkan.

## Memperkaya agent dan riset

`search-first`: preflight kanal serta keputusan reuse/adopt/extend/build saat memilih solusi/dependency. Native read/find/grep/Context7 dan dispatch tetap pemilik tool. Jangan menyalin gh auth/ls/rg/config-inspection vendor atau memasang MCP tanpa izin; jangan fan-out setiap fitur. Perbaikan typo bukan trigger.

`scientific-critical-thinking`: appraisal klaim/kausalitas/bias, bukan review panel manuskrip, BibTeX, penelitian baru atau keputusan pasien. GRADE/RoB formal butuh pedoman resmi terkini dan penilai manusia; gunakan alasan per outcome, bukan skor total rekaan.

`research-grants`: requirements matrix NOFO, critique draft investigator, budget/effort consistency. Kebijakan instansi/NOFO/amendment resmi terkini menang atas salinan panduan. NIH substantial authorship milik applicant; disclosure tidak melegalkan substantial AI generation. Policy live NIH terhalang HTTP 403 pada evaluasi ini: tidak diklaim verified. Tidak ada submission, login, komitmen institusi atau klaim anggaran/data/partner rekaan. Respons komentar panel grant tetap academic-paper sesuai tahap.

Kedua skill K-Dense terpilih MIT dan hanya dokumen, bukan seluruh suite 177 skill dengan lisensi/dependency beragam. Scientific-schematics/OpenRouter optional tidak tersedia dan tidak otomatis dipanggil. Pertahankan LICENSE.md/CITATION.cff; verifikasi atribusi/citation upstream sebelum pemakaian akademik material. ARS tetap original dengan checkpoint dan batas lisensinya.

Claude-Mem tidak dipasang: worker/hooks/capture/provider/account bukan skill mandiri dan di luar persetujuan no-capture/no-services. gstack dan reverse-skill tidak dipasang: toolkit/preamble/helper host belum cocok sebagai panduan OMP mandiri tanpa mengubah distribusi. Tujuh skill Addy existing byte-identical terhadap HEAD yang diperiksa; tidak diduplikasi. ECC Motion suite tidak dipilih karena contoh focus/keyboard/cleanup serta klaim SSR/library mandates tidak layak dipromosikan sebagai copy-paste production-ready. REA, Supermemory, native memory off dan owner desain existing dipertahankan.
