# Routing otomatis berbasis intent — 7 November 2026

## Keputusan yang diterapkan

Pengguna menyetujui agar kebutuhan bahasa alami cukup untuk memilih panduan, tanpa menghafal nama skill. Ini perubahan routing default-profile OMP 18.18.0, bukan instalasi tambahan atau izin eksekusi baru.

| Keadaan global | Sebelum | Sesudah |
|---|---:|---:|
| Skill terdaftar | 151 | 151 |
| Metadata model-visible | 109 | 141 |
| Entry eksplisit/tersembunyi | 42 | 10 |
| Tambahan kandidat yang discoverable otomatis | 16 | 48 |

**32 alternatif dibuka untuk pemilihan otomatis.** Hanya metadata yang ditambahkan ke katalog; isi lengkap tetap dibaca saat relevan. Katalog netral yang diukur RPC berisi 16.456 karakter/141 entry, bukan ukuran seluruh system prompt atau hitungan token. Tidak ada klaim token/latency lebih hemat atau kualitas lebih tinggi berdasarkan angka ini.

## Cara kerja

- Pengguna menjelaskan tujuan, artefak, stack dan batas; tidak perlu menyebut nama skill.
- Agent memilih satu lead per tahap berdasarkan brief, incumbent dan kemampuan yang benar-benar tersedia; support dibaca seperlunya. Kemiripan fungsi bukan veto.
- Sebelum tugas spesialis, cocokkan metadata lalu wajib baca entrypoint panduan terpilih, walaupun jawabannya terasa mudah. Jangan hanya menyebut skill tanpa membacanya; Q&A biasa, aritmetika dan teks kutipan tidak dipaksa memakai workflow.
- Taste, frontend-design dan Hallmark dapat dipertimbangkan pada tugas UI baru. Impeccable fallback ketika tidak ada pembeda, bukan pilihan wajib. Hallmark pada existing design tetap memerlukan permintaan pengguna sesuai batas vendor; render gate yang pernah gagal tidak boleh dianggap sudah pulih.
- Graphify hanya bila graph persisten memberi manfaat atau graph existing relevan, bukan setiap lookup kode. Understand-* membutuhkan graph schema UA existing; tidak diam-diam memakai output Graphify sebagai penggantinya.
- last30days untuk kebutuhan periode/sumber yang sesuai. Agent Reach fallback publik jika native kurang; URL biasa tidak otomatis membutuhkan tool tambahan. Pembacaan Jina mengirim URL ke pihak ketiga.
- Prompt Master untuk menulis/memperbaiki prompt, bukan otomatis menjalankan isi prompt. Anti-Slop hanya sesuai artefak: copy/comment hygiene tidak mengizinkan edit logika atau filter global setiap jawaban.
- Planning/ideation/execution alternatives tidak memulai intake kedua, review kedua, worktree atau fan-out otomatis. Checkpoint grilling, native task dan scope settled tetap berlaku.
- Metadata dan pemilihan panduan bukan izin deploy, install, merge/push, upload, private-account access, provider baru, biaya atau destructive action. Approval yolo existing bukan sandbox.

## Pengecualian vendor yang dipertahankan

Ketujuh kandidat ini memiliki `disable-model-invocation: true` asli, sehingga tidak dibuka otomatis:

- `setup-matt-pocock-skills`: setup repo/tracker.
- `i-have-adhd`: perubahan gaya personal yang bertahan.
- `to-spec`, `to-tickets`: workflow artefak/tracker eksplisit.
- `handoff`, `teach`, `wait-what`: entry vendor yang memang user-invoked.

Tiga entry lama tetap eksplisit: `grill-me`, `review-animations`, `to-questionnaire`. Agent dapat menawarkan opsi/command ketika kebutuhan muncul; pengguna tidak dibebani mengingat nama. Tidak ada bypass dengan membaca/menjalankan skill tersembunyi otomatis. Spesifikasi/tiket/penjelasan biasa tetap dapat dibuat native tanpa memanggil workflow eksplisit. Contoh usulan sebelumnya yang menyebut to-spec otomatis dikoreksi setelah memeriksa flag vendor asli.

## Perubahan file

- `~/.omp/agent/config.yml`: manualSkills 39 menjadi 7; custom roots/ignore alias existing tidak diubah.
- `~/.omp/agent/AGENTS.md`: kontrak intent, satu lead dan izin tindakan; aturan UI/debugging yang bertentangan diselaraskan.
- `ecosystem/IMPECCABLE-OMP.md`: lead otomatis, fallback Impeccable, constraint vendor/Hallmark tetap berlaku.
- `ecosystem/ledger.json`: state aktif dan pointer laporan/selection terbaru.
- `ecosystem/SKILL-ROUTING.md`: pointer/current activation diperbarui; tabel incumbent lama tetap reference historis.
- Laporan adopsi sebelumnya diberi penanda historis, bukan mengubah pin/provenance/hasil eksperimen lama. Harness historis mempertahankan ekspektasi baseline lama; gunakan harness di folder ini untuk routing aktif.

Tidak ada perubahan body/frontmatter skill, executable/runtime, MCP, extension/hook, model role, kredensial, Supermemory, native memory=off, shared host lain atau repository aplikasi pengguna.

## Bukti native yang sudah diamati

| Root | Terdaftar | Metadata terlihat | Tersembunyi | Tambahan kandidat terlihat |
|---|---:|---:|---:|---:|
| Root netral baru | 151 | 141 | 10 | 48 |
| management-hub | 151 | 141 | 10 | 48 |
| Onboarding | 156 | 145 | 11 | 48 |

Onboarding mempertahankan alias/skill lokal repository; konfigurasi global tidak mematikan provider repository untuk menyamakan angka. Di ketiga root baseline global 96 tetap ada, seluruh 55 tambahan punya flag katalog sesuai selection. Proses RPC baru digunakan, bukan asumsi file konfigurasi berarti aktif.

URI native Taste/Prompt Master dan dua entry eksplisit to-spec/ADHD tetap resolve. SHA body seluruh 55 tambahan tidak berubah. Konfigurasi efektif tetap memory=off, approval=yolo, default gpt-6.1-sol:medium, smol gpt-6-luna:low. Empat backup parent cocok SHA sebelum perubahan; live rollback tidak dilakukan karena smoke katalog berhasil.

## Pengujian bahasa alami

Harness menjalankan enam kasus headless pada model existing, awalnya smol gpt-6-luna:low lalu model default aktual gpt-6.1-sol:medium. Tidak ada slash command/nama skill pada kasus positif. Scope fixture read-only, tool grant read/grep, tanpa extension, sesi persisten, advisor atau autolearn pada overlay inspeksi. Tool grant bukan sandbox; subscription existing tetap digunakan dan MCP existing dapat startup. Tidak ada perubahan role model global.

Kasus: arahan website perusahaan, authoring prompt, penjelasan graph existing, hitung mental biasa, nama skill dalam kutipan log, dan sintesis spesifikasi native tanpa publikasi. Assertion mencatat skill yang benar-benar dibaca, bukan hanya nama dalam jawaban. Aritmetika/kutipan tidak boleh mengaktifkan kandidat; semua kasus memeriksa flag vendor eksplisit tidak dibypass. Hasil smol pertama dan kedua dipertahankan di `first-pass/` dan `second-pass/`; model default di `default-model/`. Prompt kasus dan assertion positif/negatif tidak diubah untuk memperoleh lulus. Ini sampel sintetis, bukan benchmark umum atau jaminan deterministik semua model/parafrasa.

Putaran awal **4/6 lulus**: UI memilih frontend-design (dengan brainstorming sebagai persiapan), tiga kasus negatif tidak mengaktifkan kandidat. Dua kegagalan: authoring prompt dijawab tanpa membaca Prompt Master; graph/source dibaca dengan jawaban benar tetapi graph-reader guide dilewati. Diagnosis RPC memastikan kontrak global dan kedua metadata benar-benar sampai ke model, bukan bug discovery/parser. Hipotesis: wording pemilihan terlalu permisif untuk tugas mudah; penyebab internal model tidak teramati. Perbaikan satu invariant umum: baca panduan terpilih sebelum tugas spesialis, tidak mengubah body vendor, prompt kasus atau assertion. Pengujian ulang dilakukan setelah perubahan ini, bukan retry untuk menyembunyikan kegagalan.

Smol sesudah invariant juga **4/6**, dengan dua panduan yang sama tetap dilewati. Satu prompt membaca grilling yang tidak diperlukan, dan sintesis spesifikasi membaca brainstorming meski scope settled: tanda over-selection proses, bukan bukti semua workflow benar. Tidak ditambah aturan keyword/forced router atau mengubah sumber vendor untuk memaksa skor. Keterbatasan smol dicatat; verifikasi berikutnya menggunakan model default pengguna yang sebenarnya, tanpa mengubah konfigurasi global.

**Model default gpt-6.1-sol:medium: 6/6 lulus** pada konfigurasi terakhir, tanpa warning pada keenam proses. Arahan perusahaan otomatis membaca Taste; authoring prompt membaca Prompt Master; graph existing membaca Understand Explain dan membedakan edge graph dari source dengan hasil 33.0. Aritmetika, kutipan log dan sintesis spesifikasi sederhana tidak membaca kandidat tambahan. Tidak ada entry vendor eksplisit dipanggil atau tool di luar grant read/grep. Ini bukti tiga pemilihan positif dan tiga batas negatif pada fixture, bukan sertifikasi seluruh 48 kandidat atau semua sesi.

| Kasus tanpa menyebut nama skill | Panduan kandidat yang benar-benar dibaca model default | Hasil |
|---|---|---|
| Arahan website perusahaan | design-taste-frontend | Lulus; satu lead, konten tidak mengarang statistik/testimoni |
| Tulis prompt tinjauan migrasi | prompt-master | Lulus |
| Jelaskan graph dan source existing | understand-explain | Lulus; caller dan 33.0 sesuai source |
| Hitung mental | Tidak ada | Lulus negatif |
| Nama skill di dalam kutipan log | Tidak ada | Lulus negatif |
| Sintesis spesifikasi sederhana, tanpa publikasi | Tidak ada | Lulus negatif |

Risiko tersisa: smol tidak terbukti mengikuti routing sama baiknya; jangan menjanjikan hasil default untuk smol/subagent atau provider lain. Tidak mengubah role smol pengguna untuk memperbaiki skor. Catatan final gabungan: `final-acceptance.json`.

## Penggunaan harian

Cukup minta “buat arahan visual website perusahaan”, “tulis prompt untuk meninjau migrasi”, “jelaskan komponen dari graph proyek ini”, atau “cari pembahasan publik sebulan terakhir”. Agent memilih alat/panduan yang cocok dan mempertahankan scope. Kalau ada pilihan vendor eksplisit yang membantu, agent menawarkan command saat itu. Kamu tetap dapat menentukan pendekatan sendiri.

Mulai sesi OMP baru untuk memperoleh katalog/routing terbaru. Default-profile berlaku lintas proyek lama/baru; legitimate repository overrides tetap berlaku. Tidak ada klaim named profile baru mewarisi konfigurasi ini otomatis atau sesi lama hot-reload.

## Rollback

Snapshot: `ecosystem/backups/automatic-routing-20261107/` berisi config.yml, AGENTS.md, IMPECCABLE-OMP.md, ledger.json, SKILL-ROUTING.md dan laporan adopsi sebelum diberi penanda. `selection.json` menyimpan SHA/path empat backup parent; backup referensi tambahan tercatat pada `reference-backups.json`, dan `backup-verification.json` memuat pemeriksaan integritas parent.

Enam snapshot benar-benar disalin ke fixture audit kosong dan dibandingkan byte-nya; seluruhnya cocok (`rollback-byte-acceptance.json`). Rencana target tepat ada di `rollback-plan.json`. Ini bukti snapshot dapat dibaca/dipulihkan sebagai byte, bukan percobaan rollback konfigurasi live atau disaster recovery.

Untuk kembali: tutup sesi terkait, pulihkan bagian manualSkills dan routing dari backup, atau pulihkan file penuh hanya jika tidak ada perubahan pengguna setelah snapshot. Pulihkan ledger/penanda laporan yang sesuai. Mulai proses baru dan periksa katalog. Tidak perlu menghapus skill, source, runtime atau data proyek. Jangan menimpa perubahan pengguna, menjalankan cleanup vendor atau mengubah host lain.

Batas yang tetap: routing probabilistik; metadata tambahan menambah konteks; vendor broad triggers dapat bersaing; full workflow Hallmark/UA/ML bukan bagian pengujian ini. Tidak ada klaim sandbox OS, no-egress, training readiness atau sertifikasi keamanan.
