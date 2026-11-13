# Snapshot kandidat dan CLI-first — 13 November 2026

Tujuan: https://github.com/SaKuRa-u/omp-setup, branch main. Baseline lokal dan remote 269cbf1f81d0997bc7861d9ae8feb50e61c220d8; checkout bersih sebelum penyalinan. User meminta publikasi hasil pemasangan/routing kandidat pada sesi ini.

## Payload

Menambah 13 skill original terpin (Anthropic 4, Chrome 2, OpenAI 1, HKUDS 2, Addy 4), resource relatif, lisensi, launcher Chrome/CLI-Hub, lock dependency Hub dan metadata registry terpin. Manifest/seleksi dan acceptance agregat dipilih; raw intent output, prompt sesi, transcript, database, log, credential, cache, venv, wheelhouse dan arsip unduhan tidak disalin.

Sumber kandidat dan lisensi tidak diedit. Enam file indeks pencarian Chrome nonteks/terkompresi sengaja dihilangkan; daftar tepat ada di snapshot-manifest.json. Pulihkan paket npm modern-web-guidance@1.0.0 lengkap sesuai integrity sebelum memakai search/retrieve pada mesin tujuan. CLI-Hub memerlukan venv/wheel resmi 0.4.1 dan requirements.lock; launcher saja bukan runtime siap. Generator CLI-Anything menyertakan resource original, tetapi aplikasi/backend per-app tidak dipasang oleh snapshot.

Tiga parent file diperbarui secara terarah: config.yml (tiga customDirectories), AGENTS.md (PoP CLI-first dan aturan kandidat), ecosystem/SKILL-ROUTING.md. Semua payload lama dipertahankan. README dan manifest diperbarui. Snapshot tidak menyinkronkan provider/MCP, ledger, model, ekstensi atau plugin lain secara massal. Khusus Ponytail, metadata/plugin baseline 5.3.2 di snapshot tetap dipertahankan; upgrade lokal 5.3.3 di luar wave ini tidak ikut disalin. Block upgrade Ponytail pada AGENTS lokal tidak ditambahkan ke AGENTS snapshot; sourceSha256 tetap mencatat file asal, sedangkan sha256 mencatat salinan scoped yang sebenarnya. Ini perbedaan scope yang disengaja, bukan klaim kedua file identik.

## Bukti host asal, bukan acceptance restore

- 191 skill global: 175 metadata terlihat, 16 hidden, tanpa warning global; 178 incumbent terjaga.
- 13 URI tambahan terverifikasi pada dua root. Lima warning alias GitHub khusus proyek Onboarding tetap dilaporkan.
- 354 file vendor terpasang cocok sumber; subset teks di snapshot tercatat terpisah.
- 18/18 smoke pemilihan intent dan 8/8 smoke CLI lulus. PoP Crossref dan ekspor JSON/BibTeX/RIS/JSONL bekerja pada host asal.
- Empat MCP existing tidak dicabut; Context7/Scopus tetap bridge, CLI dipilih untuk operasi yang tersedia sesuai state/kemampuan.

Tidak mengulang inferensi, aplikasi, browser, cloud atau MCP hanya untuk membuat snapshot. Keberhasilan tes asal tidak membuktikan snapshot dapat langsung dijalankan, restore mesin bersih, seluruh near-miss, semua aplikasi komunitas, atau superioritas performa CLI atas MCP.

## Verifikasi publikasi

Verifier existing scripts/verify-snapshot.mjs dibaca dan tidak dimodifikasi. Self-test dan pemeriksaan seluruh home/ terhadap ukuran/SHA-256 manifest dijalankan pada payload akhir sebelum commit. Scoped credential-pattern screening hanya membaca payload tambahan/berubah serta README; nilai match tidak dicetak. Hasil/receipt commit dan remote disimpan di host asal di luar payload untuk menghindari referensi sirkular.

Ini snapshot teks terarah dan pemeriksaan pola, bukan full security-audit atau sertifikasi bebas secret. Perbandingan awal seluruh source baseline dihentikan timeout; tidak dijadikan bukti kelengkapan sinkronisasi host. Scope akhir memakai allowlist instalasi wave dan tiga parent file, bukan menyalin seluruh home atau source tree kandidat.

## Pemulihan dan rollback

Ikuti README dan candidate-skills-20261113/USAGE.md. Sesuaikan path pengguna hanya pada salinan konfigurasi aktif; jangan mengubah hash/provenance atau vendor source massal. Restore credential melalui DPAPI yang disetujui, bukan dari GitHub. Rollback publikasi memakai revert commit setelah persetujuan; tidak ada force push atau penghapusan history. State runtime aplikasi dan konfigurasi host asal tidak diubah oleh publikasi ini.
