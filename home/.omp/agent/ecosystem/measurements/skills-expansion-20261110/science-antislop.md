# Evaluasi K-Dense Scientific Agent Skills dan Anti Slop

Tanggal evaluasi: 2026-11-10. **Status: tiga skill original sudah di-stage; aktivasi dan verifikasi integrasi milik parent.** Tidak ada edit config, routing, ledger, atau skill incumbent.

## Ringkasan keputusan

| Repo | Pin penuh | Keputusan |
|---|---|---|
| [K-Dense-AI/scientific-agent-skills](https://github.com/K-Dense-AI/scientific-agent-skills) | `2d2065fb4520fa3f3f2bcf61cff26ec8b7eba4b5` | Ambil dua komponen documentation-only MIT; bukan memasang 177 skill. |
| [miqdadbadjuber/anti-slop](https://github.com/miqdadbadjuber/anti-slop) | `3b75daa1fb6bb4c2b8a3807f82eed50914dee6b2` | Tambah satu filter responsive; pertahankan core/code/copywriting incumbent. |

JSON pasangan `science-antislop.json` berisi seluruh 177 + 6 keputusan per skill, deklarasi lisensi/kompatibilitas, pin, SHA256 setiap file terpilih, inventory code yang tidak diaktifkan, dan route positif/near-miss. Inventory non-terpilih bukan klaim full code audit.

## Komponen terpilih dan nilai tambah

### `scientific-critical-thinking`

Menambah targeted claim/evidence appraisal dengan GRADE/RoB version map, causal/confounding detail, bias taxonomy dan statistical pitfalls. Agency synthesist mencakup search/source weighting; ARS mencakup panel manuscript. Bukan mengganti salah satunya.

- Sumber original: [scientific-critical-thinking](https://github.com/K-Dense-AI/scientific-agent-skills/tree/2d2065fb4520fa3f3f2bcf61cff26ec8b7eba4b5/skills/scientific-critical-thinking/SKILL.md).
- SHA256 `SKILL.md`: `563af70571b7dcd6a96bf2e303bedfdcba623b4e9f082d58f04aacbc961fdae4`.
- Pohon pendukung utuh: 9 file, 133,159 byte; tidak menghapus/mengubah instruksi vendor.
- Root tepat untuk registrasi: `C:/Users/Indrimeilla-PC/.omp/agent/ecosystem/capabilities/k-dense-scientific-agent-skills-2d2065fb4520fa3f3f2bcf61cff26ec8b7eba4b5/skills/scientific-critical-thinking`.
- Lisensi: MIT. Tidak ada `disable-model-invocation`/explicit-only flag vendor pada tiga pilihan ini; tidak ada flag yang dihapus.
- Owner tunggal stage: `targeted-scientific-evidence-appraisal`.

**Route positif:**
- Nilai apakah klaim kausal studi observasional ini didukung; identifikasi confounder dan unit analisis.
- Terapkan appraisal RoB 2/GRADE per outcome dengan alasan dan batas evidensi, bukan skor kualitas total.

**Near-miss, jangan mengambil alih:**
- Review seluruh manuskrip dan buat referee report atau keputusan editorial simulasi. → `academic-paper-reviewer`.
- Cari artikel dan ubah DOI menjadi BibTeX. → `citation-management`.
- Tentukan terapi atau dosis pasien berdasarkan studi ini. → `qualified-clinician; not an agent skill`.

**Batas aktivasi:**
- Appraisal dokumen/evidensi, bukan review panel penuh, pencarian literatur umum, komputasi statistik, atau keputusan klinis.
- Acuan GRADE/RoB bersifat bertanggal; gunakan tool resmi terbaru dan penilai manusia untuk assessment formal.
- Bagian scientific-schematics/OpenRouter tidak dipasang dan tidak diaktifkan; diagram bukan prasyarat appraisal.
- Konten manuskrip rahasia yang masuk hosted assistant tetap pemrosesan eksternal; ikuti izin pemilik/venue.

### `research-grants`

Stage research-funding requirements/NOFO matrix, NSF/NIH/DOE/DARPA/NSTC budgets, forms, aims dan compliance critique tidak disediakan citation-management; ARS grant-panel response tetap stage lain.

- Sumber original: [research-grants](https://github.com/K-Dense-AI/scientific-agent-skills/tree/2d2065fb4520fa3f3f2bcf61cff26ec8b7eba4b5/skills/research-grants/SKILL.md).
- SHA256 `SKILL.md`: `3ca7ea8075bbe8008389660cc4a5769d66ac9ec638f3f61a955a5d7b20aeba85`.
- Pohon pendukung utuh: 16 file, 148,658 byte; tidak menghapus/mengubah instruksi vendor.
- Root tepat untuk registrasi: `C:/Users/Indrimeilla-PC/.omp/agent/ecosystem/capabilities/k-dense-scientific-agent-skills-2d2065fb4520fa3f3f2bcf61cff26ec8b7eba4b5/skills/research-grants`.
- Lisensi: MIT. Tidak ada `disable-model-invocation`/explicit-only flag vendor pada tiga pilihan ini; tidak ada flag yang dihapus.
- Owner tunggal stage: `research-grant-requirements-and-proposal-critique`.

**Route positif:**
- Petakan persyaratan NOFO NSF ini ke draft proposal saya dan tandai gap dengan sumber.
- Kritik aims R01 yang saya tulis dan rekonsiliasi effort, direct costs, F&A, serta batas pengembangan AI NIH.

**Near-miss, jangan mengambil alih:**
- Audit jawaban saya terhadap komentar panel grant; komentar dan draft response sudah ada. → `academic-paper rebuttal-audit/revision-coach`.
- Tulis paper IMRaD lengkap atau cari semua literatur topik ini. → `academic-paper or deep-research`.
- Submit proposal, login portal, atau buat komitmen anggaran atas nama institusi. → `authorized-human; no submission integration`.

**Batas aktivasi:**
- Hanya requirements matrix, critique, arithmetic/consistency review, dan limited investigator-authored edits.
- Sumber bertanggal/salinan resmi yang disediakan dapat dipakai untuk review terbatas; jangan mengklaim call masih aktif tanpa verifikasi.
- NIH substantive science/writing tetap milik applicant; disclosure saja bukan izin substantial AI authorship.
- Tidak ada login/submission/provider/API baru atau auto-invoke scientific-schematics/OpenRouter.
- Jangan jadikan placeholder/template contoh sebagai data nyata, hasil, partner commitment, form resmi, atau bukti kepatuhan PDF.

### `antislop-layoutmobile`

Menambah diagnostic responsive anti-patterns yang terikat core rule (tablet middle band, hidden overflow, fixed nav safe-area, device-list breakpoint). mobile-native tetap behavior/touch/PWA/viewport owner; bukan broad design kedua.

- Sumber original: [antislop-layoutmobile](https://github.com/miqdadbadjuber/anti-slop/tree/3b75daa1fb6bb4c2b8a3807f82eed50914dee6b2/skills/antislop-layoutmobile/SKILL.md).
- SHA256 `SKILL.md`: `8613395a5109f637837f5c24f0ce5e58a96df1c2567a9f7666fcaecc47ff39cd`.
- Pohon pendukung utuh: 1 file, 16,378 byte; tidak menghapus/mengubah instruksi vendor.
- Root tepat untuk registrasi: `C:/Users/Indrimeilla-PC/.omp/agent/ecosystem/capabilities/miqdadbadjuber-anti-slop-3b75daa1fb6bb4c2b8a3807f82eed50914dee6b2/skills/antislop-layoutmobile`.
- Lisensi: MIT. Tidak ada `disable-model-invocation`/explicit-only flag vendor pada tiga pilihan ini; tidak ada flag yang dihapus.
- Owner tunggal stage: `responsive-layout-antislop-filter`.

**Route positif:**
- Layout tablet jadi desktop sempit; audit reflow, grid, breakpoint berbasis konten, dan urutan navigasi.
- Hilangkan clipping dan horizontal overflow di phone, cek safe-area bottom nav serta tap targets.

**Near-miss, jangan mengambil alih:**
- Keyboard virtual menutupi input PWA; perbaiki viewport/touch/native behavior. → `mobile-native`.
- Audit WCAG lengkap, screen reader, semantic controls, dan fokus modal. → `agency-accessibility-auditor or fixing-accessibility`.
- Perbaiki GSAP ScrollTrigger yang patah atau animasi jank. → `gsap-scrolltrigger or animation-performance`.

**Batas aktivasi:**
- Gunakan core antislop incumbent; jangan memanggil installer/update/plugin.
- Owner tahap ini filter pola responsive layout; touch/PWA/viewport behavior tetap mobile-native, bukan dua owner untuk pekerjaan sama.
- 44x44 adalah target ergonomi skill, bukan klaim minimum universal WCAG AA.
- Verifikasi UI nyata sesuai pekerjaan nanti; checklist teks bukan bukti browser test atau conformance.

## Lisensi dan provenance

- K-Dense root [LICENSE.md](https://github.com/K-Dense-AI/scientific-agent-skills/blob/2d2065fb4520fa3f3f2bcf61cff26ec8b7eba4b5/LICENSE.md) benar-benar MIT, copyright 2025 K-Dense Inc.; README menampilkan 2026, tetapi notice yang disalin adalah file lisensi asli. Kedua komponen terpilih sendiri menyatakan MIT. Root capability menyimpan `LICENSE.md` dan `CITATION.cff` original.
- Jangan menganggap seluruh suite MIT. [README individual licenses](https://github.com/K-Dense-AI/scientific-agent-skills/blob/2d2065fb4520fa3f3f2bcf61cff26ec8b7eba4b5/README.md#individual-skill-licenses) menegaskan lisensi tiap komponen dapat berbeda. Inventory menemukan MIT, BSD, Apache, GPL, CC-BY, Biopython, PolyForm Noncommercial, CC BY-NC-SA, proprietary, Unknown dan undeclared. Deklarasi mentah per skill disimpan di JSON; bukan legal clearance dependency/dataset.
- `markdown-mermaid-writing` berharga untuk syntax Mermaid/renderer-aware docs, tetapi mendeklarasikan Apache-2.0 dan asal SuperiorByteWorks berbeda dari root MIT. Teks/notice lisensi komponen belum diselesaikan, sehingga tidak di-stage. Bukan menolaknya karena overlap.
- Anti Slop root [LICENSE](https://github.com/miqdadbadjuber/anti-slop/blob/3b75daa1fb6bb4c2b8a3807f82eed50914dee6b2/LICENSE) MIT copyright 2026 Miqdad Badjuber. File original ini disertakan di root capability. `antislop-layoutmobile` tidak membawa bahan pihak ketiga. `antislop-ui` dan `antislop-human` mempunyai notice MIT Addy Osmani tambahan; keduanya tidak diaktifkan.
- Semua sumber upstream utuh tersimpan di `ecosystem/sources/skills-expansion-20261110/`: K-Dense 2.780 file dan Anti Slop 65 file. SHA256 ZIP payload yang diunduh tercatat di JSON. Arsip tidak dijalankan dan bukan registrasi skill.
- Source README/plugin menyatakan portability Agent Skills; ini bukan bukti API/native OMP. Anti Slop memang menyebut pintu plugin Oh My Pi, tetapi plugin/installer tidak dipakai. Tidak dibuat adapter atau klaim kompatibilitas palsu.

## Anti Slop: perubahan nyata dari 20261107

Baseline tersimpan: `9504989f162a92b1996853eccbb3d8a86e73df68`, release 3.2.26. Pin baru 3.2.27 di atas. Perbandingan byte menunjukkan **keenam `SKILL.md` sama**, termasuk core/code/copywriting incumbent. Hash incumbent sesuai upstream baru:

| Incumbent | SHA256 |
|---|---|
| `antislop` | `30bc532fb59d4c77a301dfdd5ab9f495f098f1085f31e09b3064078ba39a7b01` |
| `antislop-code` | `004933009d352710dcbea7817101d5c188474a442e3ece26a6e0c18d3223898f` |
| `antislop-copywriting` | `d708fc33608b4f1d41cc7bef8b5fb2aca3dc3fbc5ec1ee174b45cac23bb767cd` |

Delta fungsional adalah [contrast-mcp.py](https://github.com/miqdadbadjuber/anti-slop/blob/3b75daa1fb6bb4c2b8a3807f82eed50914dee6b2/skills/antislop-human/contrast-mcp.py): import `re`, lalu wajib enam digit hex setelah ekspansi shorthand tiga digit. Slicing lama menerima `#00000080` sebagai opaque black. Ada guard konsistensi di `scripts/check-repo.mjs`, server/release version, docs dan metadata plugin/banner. Ini fix validasi input yang masuk akal dari pembacaan kode, **bukan hasil tes yang dijalankan di sini**.

Core/code/copywriting yang terpasang tidak memakai MCP tersebut, sehingga update tidak menambah rule. Temporal-runway clichés, theatrical takeaways dan title-case list sudah termasuk 3.2.26; jangan mengiklankannya sebagai penambahan baru. `antislop-layoutmobile` baru bagi registrasi lokal ini, bukan skill baru upstream release 3.2.27.

Komponen lainnya:
- `antislop-ui`: ada nilai app/dashboard-specific diagnostics, tetapi tambahan broad UI/performance owner kurang tepat untuk batch ini karena core/design dan referensi Addy sudah aktif. Ditunda, tidak ditolak kualitasnya.
- `antislop-human`: tidak diadopsi. Checker/MCP bukan kebutuhan batch; MCP dilarang. Ditemukan masalah substantif: skill menulis large text 18px+ untuk threshold 3:1. [W3C SC 1.4.3](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html) menyebut 18pt (sekitar 24px) atau 14pt bold (sekitar 18,5px), bukan 18px regular. Pertahankan rujukan WCAG primer/Addy yang benar, jangan mengklaim konformansi dari checker.

## Science: apa yang tidak diaktifkan dan alasannya

- **Tidak semua science ditolak karena overlap.** Dua stage baru diterima: focused evidence appraisal dan funding-proposal requirements. `experimental-design` memberi blocking/pseudoreplication/CCD operating-range detail; `hypothesis-generation` memberi rivals/estimands/preregistration; `scientific-brainstorming` memberi provenance, independent human ideation dan dissent. Ini kandidat berguna, tetapi pohon originalnya mencakup CLI/runtime dan tidak cocok dengan subset documentation-only yang diminta. Scripts tidak dipangkas untuk berpura-pura prose-only.
- `uncertainty-and-units` bernilai untuk GUM, pint/uncertainties dan covariance, namun komputasi/dependensi/Windows target perlu review terpisah. Bukan alasan memasang package sekarang.
- `peer-review` memiliki authorization/confidentiality gates yang baik; `scientific-writing` memiliki manifests/validators. Keduanya workflow berbasis CLI, dan ARS tetap owner whole-manuscript review/writing. Komponen baru tidak mengambil alih pipeline.
- `citation-management` tetap pin `593377bb048752abb0152deab9fbb1083a6087df`; tidak ada overwrite atau duplikasi nama. Bibliografi/DOI/BibTeX tetap owner incumbent.
- Clinical skills saat ini **sudah** memiliki safeguards: `clinical-decision-support` aggregate/synthetic research only, `clinical-reports` verified synthetic/de-identified/aggregate facts, `treatment-plans` hanya memformat keputusan clinician yang sudah dibuat. Tidak menyebutnya malware atau autonomous care; tetap tidak diaktifkan karena regulated data/qualified oversight/validator workflow di luar scope.
- `autoskill` memakai Screenpipe captured history dan model backend; capture/services dilarang. `research-lookup`, schematic/image generation, Parallel/BGPT integrations, cloud lab/compute, providers dan agent-platform extensions tidak diaktifkan. No paid calls, telemetry, capture, service, hook, MCP atau credential changes.

## Kualitas dan risiko terbatas

- Appraisal memiliki [dated primary-guidance map](https://github.com/K-Dense-AI/scientific-agent-skills/blob/2d2065fb4520fa3f3f2bcf61cff26ec8b7eba4b5/skills/scientific-critical-thinking/references/review_sources.md): membedakan result-specific RoB, reporting completeness, body-of-evidence certainty, serta recommendation strength; tidak mengubah checklist menjadi numerical quality score. Delapan file references disimpan utuh.
- Grant skill [mewajibkan governing opportunity terlebih dahulu](https://github.com/K-Dense-AI/scientific-agent-skills/blob/2d2065fb4520fa3f3f2bcf61cff26ec8b7eba4b5/skills/research-grants/SKILL.md), disertai agency-specific refs dan tiga template ilustratif. NOFO/amendment/time zone, F&A basis, effort, cost-share denominator dan applicant authorship harus terdokumentasi. Sumber bertanggal 2026-10-01, bukan database peluang live.
- Link policy NIH `grants.nih.gov` dan `www.grants.nih.gov` dicoba, keduanya HTTP 403. **Policy live tidak berhasil diverifikasi di sini.** Aturan conservative investigator-authored tetap cocok; saat penggunaan nyata wajib cocokkan official package/current policy. Jangan menjanjikan eligibility atau pendanaan.
- Kedua skill science menyebut scientific-schematics/OpenRouter secara optional. Skill tersebut **tidak** disalin, dan transmisi diagram/paid generation dilarang dalam adoption ini. Parent perlu menuliskan batas route ini; jangan auto-install dependency yang hilang.
- Tidak ada kode vendor dalam tiga skill terpilih: hanya Markdown/reference/asset templates. Python >=3.13, scanner, pytest dan dotenv di root scientific `pyproject.toml` adalah tooling repo, bukan requirement skill terpilih. Suite lainnya memiliki dependency dan OS berbeda; tidak ada klaim semua 177 bekerja di Windows. `experimental-design` membedakan POSIX `.venv/bin` dari Windows `Scripts/python.exe`; `cellxgene-census` mensyaratkan Linux/macOS.
- Instruksi citation K-Dense meminta paper library dikutip bila berkontribusi material; disimpan tanpa perubahan. Untuk manuskrip ilmiah, verifikasi author/year/version/DOI sebelum digunakan, jangan membuat citation fiktif.
- Skills source-only masih mengandung kode/installer yang belum diaudit menyeluruh. [K-Dense SECURITY.md](https://github.com/K-Dense-AI/scientific-agent-skills/blob/2d2065fb4520fa3f3f2bcf61cff26ec8b7eba4b5/SECURITY.md) sendiri menyatakan scanner report bukan audit/sertifikasi. Tidak ada endorsement keamanan universal.

## Handoff integrasi

Root capability non-skill hanya menyimpan lisensi/provenance; parent mendaftarkan tepat tiga root skill di atas, bukan seluruh downloaded suite. Tidak ditemukan konflik tiga nama terpilih dalam `config.yml` dan selection 20261107. Nama incumbent yang sengaja **tidak** dipasang ulang: `antislop`, `antislop-code`, `antislop-copywriting`, `citation-management`.

Parent sebaiknya melakukan satu verifikasi terintegrasi: bandingkan hashes source/staged dengan JSON, cek tiga nama/frontmatter/flag, lisensi dan seluruh relative reference tree; pastikan code-free serta tidak ada plugin/MCP/hooks yang dimuat; uji positive dan near-miss routing dengan batas no-paid/no-auto-service. Test/build/lint/formatter, vendor script, browser capture, provider dan runtime scientific tidak dijalankan oleh worker.
