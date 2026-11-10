# Humanizer ID untuk OMP — 10 November 2026

## Keputusan dan scope

Panduan original [apissaj/humanizer-id](https://github.com/apissaj/humanizer-id) versi SKILL 1.5.1 dipilih sebagai **pendukung penyuntingan/proofreading prosa Indonesia yang diminta**. Bukan default gaya jawaban, pengganti author akademik, classifier authorship, atau alat menjamin lolos detektor AI. Pengguna menyetujui review lengkap, uji preservasi, pemasangan global OMP bila lolos, tanpa Python CLI.

Pin: [`1ec77b92f022adb12a43d975da97f8dda27e754b`](https://github.com/apissaj/humanizer-id/tree/1ec77b92f022adb12a43d975da97f8dda27e754b). [MIT LICENSE](https://github.com/apissaj/humanizer-id/blob/1ec77b92f022adb12a43d975da97f8dda27e754b/LICENSE) mempertahankan copyright Hafizh Muzani 2026 dan Siqi Chen 2025. Arsip ZIP SHA-256 `81d763cbf4d333e47fc2587bbbb92767ffe13498e5934fa7dcefb932c5b0ecbb`; 162 file source cocok Git blob upstream. Identitas byte bukan sertifikasi keamanan/kebenaran bahasa. Lisensi root tidak membuktikan hak setiap kutipan buku pihak ketiga.

Original entrypoint dan 106 file dokumentasi/data pendukung dipasang tanpa modifikasi pada `C:/Users/Indrimeilla-PC/.omp/agent/skills/humanizer-id/`: SKILL.md, LICENSE, README.md, references/, data/, examples/. Tidak ada executable atau subskill jurnal dalam install. Source lengkap disimpan di `ecosystem/sources/humanizer-id-<pin>` untuk provenance, bukan runtime terdaftar.

**Tidak dipasang/dijalankan:** paket/CLI Python (pyproject versi 1.0.0 berbeda dari SKILL 1.5.1), audit.py, humanizer_id engine, jurnal subskill, global PROMPT.md, installer, hook, MCP, provider, telemetry atau layanan. Tidak mengubah konfigurasi host lain atau repository aplikasi. config.yml tidak diubah; native skill root existing sudah cukup.

## Hasil penilaian sumber

Seluruh 907 baris SKILL terpin dibaca, ditambah lisensi, contoh abstrak, rujukan kebahasaan, preset kampus, manifest paket, inventaris dan perbandingan Humanizer existing. Detail: [source-review.json](source-review.json).

Kelebihan: kaidah preservasi angka/sitasi/modalitas, pemisahan bahasa dari konfirmasi substansi, proteksi kutipan/instrumen, mode minimal/akademik/esai/bisnis, serta cakupan kalke/verba ringan/koherensi bahasa Indonesia.

Temuan yang membatasi penerapan:

| Lokasi sumber | Masalah nyata | Batas penerapan |
|---|---|---|
| SKILL.md:95,866 | Batas memori diganti kapasitas/rentang kapasitas. | Konsep batas alamat/izin akses tidak identik kapasitas RAM. |
| SKILL.md:104,867 | Contoh menambah konsumsi memori puncak atau kondisi beban penuh yang tidak ada. | Jangan menambah fakta/kondisi demi membuat kalimat lebih konkret. |
| README contoh; examples/abstrak-skripsi-informatika.md:9,24 | Sebesar 35% menjadi hingga 35%; contoh abstrak menambah dataset Indonesia/variasi informal/ruang laten optimal. | Pembatas kuantitas dan setiap proposisi sumber harus dipertahankan. |
| SKILL.md:114 | Maksimal satu konjungsi awal paragraf per halaman. | Heuristik gaya, bukan kuota universal kebahasaan. |
| SKILL.md:61,317,743 | Larangan persona pertama bertentangan dengan bagian lain yang memperbolehkan saya/penulis. | Pedoman venue/pengguna aktual menang. |
| references/panduan-preset-kampus.md:38-48 | Sitasi pengarang-tahun diberi label IEEE-style. | Sitasi numerik existing tidak dikonversi berdasarkan preset kampus. |
| SKILL.md:293-295,781 | Larangan koma sebelum sehingga bertentangan dengan anjuran contoh berikutnya. | Struktur klausa dan EYD primer menang; bukan search/replace mekanis. |
| references/pedoman-kebahasaan-resmi.md:67-70 | Klaim semua sitasi modern wajib parenthetical; contoh YOLOv8 melebar menjadi semua arsitektur satu tahap. | Atribusi dan cakupan klaim tidak boleh melebar ketika merajut sitasi. |
| SKILL.md:615-618,627,636 | Mapping kurikulum, interpretasi eufemisme dan anonimisasi dapat mengubah substansi/domain/privacy. | Tidak menjadi perubahan diam-diam dalam pass bahasa; catat terpisah bila relevan. |
| SKILL.md:159,898; README | ISBN berbeda untuk buku yang dideskripsikan sama; preset fakultas/tahun tidak dibuktikan. | Ringkasan vendor bukan verifikasi bibliografis atau kepatuhan kampus. |

Sumber primer yang benar-benar dibuka: [EYD V, Tanda Koma](https://ejaan.kemendikdasmen.go.id/eyd/penggunaan-tanda-baca/tanda-koma/), khusus aturan 2–5 (pertentangan, anak kalimat sebelum/sesudah induk, penghubung antarkalimat). Ini pemeriksaan punctuation terbatas, bukan validasi seluruh lexicon/tata bahasa. Pengambilan PDF IEEE resmi hanya mengembalikan metadata Google Docs; tidak diklaim full PDF review.

Original tidak dipatch. [EDITORIAL-BOUNDARIES.md](EDITORIAL-BOUNDARIES.md) menjadi batas proyek yang wajib dibaca sebelum menerapkan skill: preservasi makna/angka/pembatas/negasi/modalitas/atribusi/istilah/kode/kutipan/instrumen, pedagogi/venue terkini diutamakan, tidak ada kuota transisi atau penggantian kamus massal. Menandai ambiguitas bukan mengarang perbaikan substansi.

## Uji preservasi

Empat skenario sintetis native OMP dengan model existing `openai-codex/gpt-6.1-sol`, tool read-only, dokumen batas + panduan asli, tanpa kode vendor/CLI/naskah pengguna. Parent membaca setiap hasil revisi dan catatan terhadap input. Pemeriksaan token deterministik melengkapi penilaian semantik, bukan menggantikannya.

| Kasus | Hasil isi yang diperiksa |
|---|---|
| numbers-and-attribution | Sebesar 35%, 120 transaksi, p = 0,047, SD 1,25 ms, Tabel 4.2, Persamaan (3.1), y = 2x + 1, Wijaya (2022) dan negasi sebab-akibat tetap. Tidak menambah beban penuh. |
| technical-boundaries-and-hedging | Alamat 0x1000–0x1FFF berbeda dari RAM 8 GB; diharapkan dapat dan belum diuji tetap. |
| minimal-and-protected | Hanya analisa→analisis dan resiko→risiko di luar kutipan; kutipan, butir tervalidasi, inline code dan struktur identik. |
| venue-over-campus-preset | Persona Kami, sitasi numerik [7]/[8], sebesar 4,2%, desain observasional, negasi kausal dan nama institusi tetap; preset kampus tidak mengambil alih. |

**4/4 lulus preservasi pada setup dengan batas yang disetujui.** [editorial-acceptance.json](editorial-acceptance.json), case-*.json dan [cases.json](cases.json) menyimpan input/output/rubric.

Contoh hasil nyata:

> Dalam penelitian ini, indeks B-Tree diuji. Menurut Wijaya (2022), latensi menurun sebesar 35% pada 120 transaksi; p = 0,047; simpangan baku 1,25 ms. Hasil tercantum pada Tabel 4.2 dan Persamaan (3.1): y = 2x + 1. Temuan ini belum membuktikan hubungan sebab-akibat.

Angka/nama sitasi dalam fixture adalah dummy, bukan publikasi atau hasil penelitian yang diverifikasi.

### Kegagalan harness yang tidak disembunyikan

Keempat proses model pertama exit 0 dan hasil isinya memenuhi preservasi, tetapi assertion pembacaan dokumen batas gagal karena path dari fileURLToPath memakai backslash Windows dan path read memakai slash. Rekaman reads membuktikan dokumen batas dibaca. Harness diperbaiki dengan normalisasi separator; hasil first-pass tersimpan diperiksa ulang tanpa menjalankan inference lagi. Berkas case-*.json dan editorial-results.json tetap mencatat failure mekanis awal; editorial-acceptance.json menjelaskan koreksi dan hasil parent. Tidak ada kegagalan editorial ditutupi dengan retry atau klaim benchmark.

Uji ini tidak membuktikan skill mentah tanpa batas selalu menjaga makna, tidak membandingkan kualitas secara buta terhadap humanizer existing, tidak memvalidasi seluruh 907 baris aturan, dan tidak mengukur detector evasion atau penghematan biaya/token.

## Routing dan penggunaan

Global AGENTS.md dan SKILL-ROUTING.md mendapatkan seksi Humanizer ID terfokus; ledger mendapat record humanizerId20261110. Metadata original otomatis discoverable tanpa perubahan description/flag upstream. Konfigurasi manual/custom root existing tetap identik.

- Permintaan menyunting/proofread prosa Indonesia supplied → humanizer-id dengan batas proyek.
- Authoring/revisi manuskrip → academic-paper tetap owner, humanizer-id hanya support bahasa bila memang dibutuhkan/diminta.
- Humanizer existing tetap untuk bahasa lain atau pola lintas bahasa; jangan dua humanizer wajib satu pass.
- Metadata DOI/BibTeX → citation-management; appraisal klaim/bias → scientific-critical-thinking; microcopy UI → better-writing sesuai tahap.
- Terjemahan kutipan, Q&A biasa atau sekadar nama skill dalam log bukan trigger penyuntingan.
- Tidak ada klaim authorship/detektor atau preset kampus otomatis sebagai otoritas format. Pedoman aktual dari institusi/venue mengalahkan preset.

Gunakan sesi OMP baru. Contoh: **“Sunting paragraf Indonesia berikut agar lebih alami. Pertahankan makna, angka, sitasi, istilah teknis dan tingkat kepastian; tampilkan revisi serta catatan perubahan.”** Tidak perlu menghafal nama skill. Bukan perubahan gaya percakapan default.

## Bukti integrasi dan rollback

Hasil aktual discovery/URI/routing: [verification.json](verification.json); katalog RPC tanpa inference: [catalog-acceptance.json](catalog-acceptance.json); ringkasan akhir: [final-acceptance.json](final-acceptance.json). Keberadaan metadata bukan jaminan routing semantik deterministik atau kualitas semua naskah.

Backup terarah sebelum edit: `ecosystem/backups/humanizer-id-20261110/`, empat file config/AGENTS/SKILL-ROUTING/ledger dengan SHA-256 di [backup-manifest.json](backup-manifest.json). Rollback belum dijalankan. [rollback-plan.json](rollback-plan.json): tutup sesi terkait; karantina hanya direktori native baru humanizer-id di luar discovery; merge-remove tiga seksi bertanggal/property ledger, jangan menimpa perubahan pengguna sesudah snapshot. config.yml tidak perlu direstore karena tidak berubah. Source/measurement dapat dipertahankan untuk provenance. Verifikasi ulang baseline 174 skill root netral dan URI incumbent pada proses baru.

Batas akhir: bukan sertifikasi EYD/kampus, bukan pemeriksaan legal lisensi seluruh kutipan, bukan audit kode suite, bukan uji Python, bukan penilaian naskah pengguna. Penulis tetap memeriksa perubahan sebelum dipakai.
