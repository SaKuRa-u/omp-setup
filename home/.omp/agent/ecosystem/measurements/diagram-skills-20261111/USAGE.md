# Diagram OMP — penggunaan dan batas, 11 November 2026

## Cakupan

Tiga skill asli dipasang di `~/.omp/agent/skills/`, global untuk OMP default-profile pengguna ini lintas proyek. Bukan semua host, akun Windows atau named profile. Tidak mengubah skill vendor, konfigurasi provider, plugin, MCP, PATH atau host lain. Pin dan SHA-256 semua file ada di [installation.json](installation.json); arsip upstream lokal bukan payload repository teks. Gunakan sesi baru; hot reload tidak dijamin.

## Memilih satu lead

Format yang benar-benar diminta pengguna menang atas default gaya:

| Hasil yang dibutuhkan | Panduan |
|---|---|
| File `.drawio` untuk diedit di diagrams.net | `drawio-skill`, hanya permintaan eksplisit editable/Draw.io |
| Diagram stack, cloud atau topology berlogo teknologi | `stack-diagram` |
| Mermaid flowchart, sequence, state, ERD, class atau C4 | `mermaid-diagrams`; chat sederhana tetap native |
| Visual editorial HTML/SVG, brand, konektor bergeometri | `diagram-design` existing |
| Mekanisme fisik / exploded illustration | `anatomy` / `teardown` existing sesuai tugas |
| Merencanakan arsitektur dan implementasi | Requirements/NFR dan owner native planning; `codebase-design`, `domain-modeling`, lalu `writing-plans` ketika desain disepakati |

`drawio-skill` mempertahankan frontmatter `disable-model-invocation: true`. Loader native menandainya hidden; jangan membaca atau mengeksekusi workflow hanya karena format itu disebut dalam kutipan, log atau pertanyaan umum. Permintaan nyata membuat file editable atau `.drawio` cukup; pengguna tidak perlu menghafal command. Jangan mengubah flag upstream untuk membuatnya otomatis.

## Contoh permintaan (bukan hasil pengujian model)

- “Buat sequence diagram Mermaid untuk alur checkout dari deskripsi berikut.”
- “Buat diagram C4 Context dan Container, pisahkan hubungan terverifikasi dari asumsi.”
- “Gambar stack aplikasi dengan logo Next.js, API, PostgreSQL dan CI/CD; jangan upload.”
- “Buat file `.drawio` editable agar saya bisa mengubahnya di app.diagrams.net.”
- “Ubah ERD SQL supplied menjadi diagram editable; jangan koneksi database.”
- “Bandingkan rancangan monolith dan services berdasarkan kebutuhan berikut, baru buat diagram setelah keputusan disepakati.”

Arsitektur tidak boleh disimpulkan dari logo atau daftar teknologi saja. Tulis asal hubungan dan asumsi; diagram bukan bukti bahwa jaringan, security boundary, throughput atau deployment nyata sudah benar.

## Mengedit file sendiri lewat web

Minta file `.drawio`, lalu buka https://app.diagrams.net/ dan pilih penyimpanan perangkat/lokal jika tidak ingin memakai integrasi cloud. Buka file dari perangkat, edit bentuk/konektor/label, dan simpan kembali atau ekspor memakai editor. Menu/perilaku web aktual belum diuji pada wave ini. Tidak ada login atau unggah diagram yang dilakukan oleh pemasangan ini. Penggunaan layanan web tetap memerlukan penilaian privasi data; jangan menganggap pilihan penyimpanan lokal sebagai jaminan no-egress browser.

File `.drawio` adalah sumber editable. PNG/SVG biasa bukan otomatis editable di diagrams.net; metadata XML tersemat dapat memuat properties/provenance, jadi periksa konten sebelum membagikan hasil. Impor format di `diagram-design` adalah redraw HTML/SVG, bukan jaminan round-trip ke file editable asli.

## Dependency dan izin eksekusi

- **Mermaid:** authoring berbentuk teks; tidak memasang Mermaid CLI, browser atau Node package. Sintaks C4/layout/theme tergantung renderer dan versi. Dukungan viewer tidak diasumsikan universal; verifikasi target saat membuat diagram nyata. Editor publik bukan tempat otomatis mengirim arsitektur rahasia.
- **Stack-diagram:** Python 3.9+ untuk helper; fetch ikon memakai internet, build meng-inline font dan ikon ke HTML. PNG membutuhkan Playwright/Chromium. Renderer bawaan memakai `--no-sandbox`; belum dijalankan atau diuji pada wave ini. Jangan menjalankan helper tersebut otomatis atau mengklaim aman karena source lokal. Browser native berizin dapat menjadi jalur inspeksi alternatif jika boundary dan asetnya sesuai; itu bukan bukti helper vendor lulus. Font WOFF2 ada pada instalasi lokal, tetapi sengaja tidak disalin ke snapshot teks; ambil kembali dari commit resmi yang dipin dan cocokkan hash sebelum restore render.
- **Draw.io:** core source XML/IR memakai Python; native export membutuhkan aplikasi desktop draw.io yang tidak dipasang. Graphviz opsional; konversi Mermaid native mensyaratkan versi draw.io yang sesuai upstream. Katalog vendor `data/shape-index.json.gz` ada pada instalasi lokal, tetapi dikecualikan dari snapshot teks karena terkompresi; pulihkan dari commit terpin dan cocokkan hash sebelum memakai lookup shape pada mesin restore. Tidak ada desktop, Graphviz, Python package, Chromium atau MCP baru yang dipasang pada wave ini. Tanpa renderer, berikan file sumber dan nyatakan visual/export belum diverifikasi; jangan menyatakan PNG/PDF sudah dihasilkan.
- **Live/cloud:** importer live infra, registrasi MCP, pipeline CI, publikasi PR, galeri stack-diagram, dependency download dan operasi akun bukan efek samping membaca skill. Galeri mempublikasikan gambar/metadata; setiap upload membutuhkan izin spesifik target dan konten. Jangan menjalankan `share.py` otomatis.

## Verifikasi dan pemulihan

[Observasi routing](routing-verification.json) memuat discovery native pada root netral, jumlah entrypoint, hide flag dan integritas tiga distribusi. Itu bukan benchmark klasifikasi atau test rendering; tidak ada sertifikasi seluruh skill aman. Tidak ada model/provider baru untuk mengejar hasil tes. Pemulihan repository tetap manual sesuai README snapshot; source/font/dependency yang dihilangkan harus disiapkan terpisah dari upstream resmi setelah izin.

Rollback terarah: setelah persetujuan penghapusan, hanya hapus tiga direktori skill tambahan dan revert bagian routing tanggal ini; pertahankan skill, provider dan konfigurasi incumbent. Arsip/pin serta laporan historis dapat tetap disimpan sebagai provenance, bukan runtime aktif.
