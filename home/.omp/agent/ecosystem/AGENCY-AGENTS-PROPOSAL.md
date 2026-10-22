# Proposal final adopsi Agency Agents untuk OMP

Tanggal penilaian awal: 21 Oktober 2026. **Scope dan implementasi disetujui pengguna; dilanjutkan 22 Oktober 2026 setelah jeda.** Pemasangan 17 panduan dan discovery native sudah dieksersis; acceptance perilaku dan publikasi dilaporkan terpisah pada measurement, bukan dianggap lulus dari proposal ini. Persetujuan bukan izin baru untuk operasi berbayar, produksi, penghapusan data, atau host lain.

## 1. Keputusan yang direkomendasikan

**Adopsi 17 persona sebagai skill/panduan on-demand OMP-only. Simpan 72 persona sebagai referensi bersyarat tanpa registrasi. Jangan registrasikan 10 persona pada versi yang diperiksa.**

Yang ditambahkan adalah sudut pandang dan checklist domain; bukan 17 worker persisten, runtime, scanner, memory, layanan cloud, atau pipeline baru. Semua keputusan adopsi adalah **[INFERENCE] berdasarkan sumber dan kecocokan workflow**, bukan hasil benchmark reasoning atau efisiensi token.

Sumber: [msitarzewski/agency-agents](https://github.com/msitarzewski/agency-agents/tree/4e3ac3ca6604c75113f52c695dbddcc7af928b46), commit `4e3ac3ca6604c75113f52c695dbddcc7af928b46`, tree `9a8b9c68018b488ce0fea0e745b3fd2f2a211bb0`; lisensi MIT. Pertahankan copyright dan LICENSE asli. Cakupan keputusan: 97 definisi dari Engineering/Design/Testing/Security/Research ditambah SEO Specialist dan Document Generator = **99 persona**, bukan seluruh repo. Research berbeda dari Academic. Baidu SEO dan Legal Document Review berada di luar cakupan ini.

Kelemahan orkestrator bukan alasan menolak semua persona. Sebaliknya, konversi yang berhasil, popularitas, dan format SKILL.md bukan bukti kualitas reasoning. Kontrak CI yang dibaca memeriksa parsing, round-trip, jumlah keluaran, drift, dan perilaku installer; matriks installer yang dibaca adalah Ubuntu/macOS, bukan bukti Windows/OMP lulus.

## 2. Analisis tambahan: SEO Specialist

**Keputusan: jangan registrasikan versi ini. Materi positif boleh dibaca sebagai referensi yang diverifikasi terhadap Google Search Central. Kebutuhan SEO tetap dilayani lewat sumber primer dan tooling native, bukan dihapus dari workflow.**

Sumber persona: `marketing/marketing-seo-specialist.md`, 21.310 byte pada inventaris pinned. Dibaca seluruhnya. Kekuatannya: white-hat, search intent, crawl/indexability, sitemap/canonical/internal links, pemisahan traffic branded/non-branded, field Core Web Vitals memakai INP, dan baseline sebelum klaim hasil. Tidak ada akun Search Console atau crawler yang tercipta dari frontmatter `tools`.

### Temuan yang menentukan keputusan

| Isi sumber vendor | Pemeriksaan sumber primer / keputusan OMP |
|---|---|
| `Toxic link ratio: X% (disavow if >5%)` | Google tidak menetapkan ambang tersebut: kebanyakan situs tidak membutuhkan disavow; perlu kondisi link spam yang signifikan serta manual action/kemungkinannya. Pemakaian keliru dapat merugikan performa. Jangan mengeksekusi disavow dari skor tool. |
| `lang` diposisikan sebagai sinyal independen crawler untuk bahasa Google | Google menyatakan menentukan bahasa dari visible content, bukan code-level `lang` atau URL. Tetap gunakan `lang` untuk semantik/aksesibilitas; jangan menghapusnya atau menjanjikan efek ranking. |
| FAQ schema untuk rich-result eligibility | Halaman FAQ resmi dialihkan ke changelog: pengumuman 8 Mei 2026 menyatakan FAQ rich result tidak tampil mulai **7 Mei 2026**; dokumentasinya dihapus 15 Juni 2026. FAQ sebagai konten dan Schema.org tidak otomatis tidak berguna, tetapi jangan menjanjikan fitur Google yang dihentikan. |
| GSC wajib/no exceptions sebelum perubahan title/H1; bagian lain menyediakan fallback tanpa GSC | Ada ketegangan internal. Akses GSC membantu diagnosis, bukan prasyarat untuk semua perbaikan teknis pada situs baru/lokal. Tanpa data, laporkan batas analisis; jangan mengarang volume, klik atau posisi. |
| Dua halaman memakai primary keyword sama = `guaranteed internal competition` | Ini heuristik persona, bukan aturan Google yang telah dibuktikan. Nilai intent, konten, canonical, performa dan tujuan tiap halaman; jangan otomatis mengurangi konten, merge, redirect atau de-index. |
| Title 50–60 karakter dan target pertumbuhan/ranking generik | Google tidak menetapkan batas panjang title yang kaku; hasil dipotong sesuai kebutuhan/lebar perangkat. Angka vendor adalah heuristik/target, bukan acceptance criteria universal atau hasil terukur. |

Kita tidak akan mempatch persona menjadi fork atau menulis skill SEO pengganti untuk menirunya. Registrasi dapat dinilai ulang jika upstream memperbaiki kontradiksi, atau jika pengguna memilih scope terbatas setelah mengetahui risiko. Tidak ada SEO berbayar, GSC login, crawling situs, outreach, disavow, perubahan canonical/robots/noindex/redirect, publishing, atau klaim ranking yang dijalankan dalam evaluasi ini.

## 3. Analisis tambahan: Document Generator

**Keputusan: adopsi sebagai panduan on-demand, bukan paket software pembuat dokumen siap pakai.**

Sumber: `specialized/specialized-document-generator.md`, 2.437 byte; dibaca penuh. Inventaris tidak menunjukkan script/test/template pendamping bernama Document Generator: yang diberikan adalah persona dengan pilihan library dan aturan output. Ini pemeriksaan artefak terkait nama tersebut, bukan klaim bahwa repo tidak mempunyai script lain.

Persona mencakup PDF (ReportLab/WeasyPrint/fpdf2/Puppeteer/pdf-lib/pdfkit), PPTX (python-pptx/PptxGenJS), XLSX (openpyxl/XlsxWriter/ExcelJS/xlsx), dan DOCX (python-docx/docx). Daftar ini adalah opsi, **bukan rekomendasi dependency terbaru, aman, kompatibel Windows, atau sudah terpasang**. Tidak memasang semuanya; pilih standard/platform/dependency proyek yang tersedia, atau paket exact version yang ditinjau bila memang diperlukan dan diizinkan.

| Persona | Tanggung jawab yang tepat | Bukan pengganti |
|---|---|---|
| Document Generator | Menghasilkan file office/report dari data yang sah, memilih format/library, styles/branding, menyertakan script dan output ketika generation diminta | Runtime terpasang, editor Office, validator PDF/UA atau bukti render |
| Technical Writer | Akurasi isi dokumentasi developer, tutorial, reference, README dan migration guide | Mesin pembuat DOCX/PPTX/XLSX |
| PDF Engine Architect | Arsitektur layanan/editor HTML-to-PDF, lifecycle browser, fonts, layout dan concurrency | Kebutuhan rutin mengekspor satu laporan; tidak dipasang aktif dalam paket awal |
| Universal Document Compiler | Arsitektur compiler/editor dokumen berbasis CST/layout | Generator dokumen umum |
| academic-paper / ARS | Metodologi dan isi naskah akademik, sitasi dan disclosure sesuai izin nonkomersial | Dependency/rendering/export yang otomatis tersedia |

### Kontrak penggunaan Document Generator

- Audience, tujuan, format, data, template incumbent, font/brand dan lokasi output ditetapkan sebelum generation; gunakan konteks yang sudah ada, tidak mengulang intake.
- Reuse template existing. Buat abstraction/template reusable hanya bila kebutuhan mengharuskannya; aturan vendor bukan mandat membuat framework untuk satu dokumen.
- Deliver file aktual dan script yang benar-benar menghasilkannya jika diminta generation. Jangan mengganti file .txt menjadi .docx atau menyerahkan Markdown seolah PDF.
- Validasi struktur dan buka/render artefak dengan viewer yang tersedia. Periksa angka, tabel, clipping, font, chart, link, heading dan alt text yang relevan; laporkan batas viewer/AT. Zip/OOXML parse saja bukan visual pass.
- Jangan mengklaim PDF/A, PDF/UA atau WCAG hanya dari metadata, tag atau keberhasilan export. Sertifikasi membutuhkan validator dan scope yang tepat.
- Input eksternal tidak boleh mengeksekusi macro, formula tak tepercaya, script, link/asset remote atau membuka credential. Tidak mengunggah dokumen/data rahasia ke layanan baru.
- Missing dependency/font/viewer dilaporkan tepat. Tidak ada fallback palsu atau instalasi global. Hak gambar/font/template tetap diperiksa per artefak.

## 4. Daftar A: 17 persona yang diadopsi on-demand

Ini allowlist final yang direkomendasikan. Semua path relatif ke repo upstream pinned. Setiap persona memperkaya owner existing, bukan menjadi pemilik workflow baru.

| Path upstream | Trigger / keluaran tambahan | Batas owner / izin |
|---|---|---|
| `engineering/engineering-api-platform-engineer.md` | Kontrak API, breaking changes, error/retry/pagination | Owner implementasi + codebase-design; dokumentasi vendor tetap primer |
| `engineering/engineering-database-reliability-engineer.md` | RPO/RTO, recovery, lock budget, migrasi aman | Panduan PostgreSQL/infra existing; tanpa DDL/restore/failover otomatis |
| `engineering/engineering-developer-tooling-engineer.md` | CLI stdout/stderr, exit code, pipe, config precedence | Ponytail + konvensi CLI proyek; bukan pengganti Orca |
| `engineering/engineering-i18n-engineer.md` | Locale, ICU/CLDR, RTL, Unicode dan fallback | Impeccable untuk UX; runner proyek untuk verifikasi |
| `engineering/engineering-identity-access-engineer.md` | OAuth/OIDC, session, linking, revocation dan hak akses | Security owner existing; tidak ada login/rotasi akun otomatis |
| `engineering/engineering-payments-billing-engineer.md` | Idempotency, webhook, state uang dan reconciliation | Security + TDD; sandbox PSP saja bila diotorisasi |
| `engineering/engineering-privacy-engineer.md` | Data map, retention, consent, DSAR dan delete-path | Security owner; bukan DPO/legal atau izin menghapus data |
| `engineering/engineering-technical-writer.md` | README, API reference, tutorial dan migration guide | Owner tugas; academic-paper tetap untuk manuskrip akademik |
| `design/design-ux-researcher.md` | Study plan, consent, usability dan triangulasi temuan | Impeccable tetap owner desain; tidak mengarang peserta/data |
| `design/design-brand-guardian.md` | Voice/tone dan konsistensi brand lintas kanal | Brand incumbent/manusia; Impeccable memiliki frontend |
| `testing/testing-accessibility-auditor.md` | WCAG/AT, keyboard, scope dan status NOT TESTED | webapp-testing/browser + AT nyata; bukan sertifikasi otomatis |
| `testing/testing-api-tester.md` | Kontrak endpoint, negative cases, auth dan side effects | Runner proyek + TDD/security existing; SLO mengikuti proyek |
| `testing/testing-performance-benchmarker.md` | Baseline, workload, distribusi latency dan before/after | Eksperimen scoped berizin; bukan load test produksi otomatis |
| `security/security-architect.md` | Threat model, trust boundary, STRIDE dan requirements | Native security-reviewer + security-audit tetap owner |
| `security/security-secrets-credential-engineer.md` | Owner/TTL/revocation dan rencana rotasi tanpa secret values | DPAPI tetap; akses provider/rotasi/history rewrite perlu izin |
| `research/research-synthesist.md` | Sumber primer, circular citations dan confidence bukti | Riset teknis native; ARS/PoP/citation-management sesuai tahap |
| `specialized/specialized-document-generator.md` | Pemilihan format dan pembuatan file PDF/PPTX/DOCX/XLSX | Guidance saja; runtime/dependency dan output diverifikasi per tugas |

## 5. Daftar B: 72 persona referensi bersyarat, tidak diregistrasikan

Tetap tersedia pada snapshot sumber di luar root discovery. Baca hanya ketika proyek/stack/tugas cocok; bukan menyalin semuanya ke skills/agents. Alasan utama: scope khusus, overlap owner existing, atau prasyarat data/runtime yang belum ada. Ini bukan pernyataan bahwa seluruh 72 buruk.

Beberapa yang paling bernilai ketika dibutuhkan: Data Visualization; RAG/Search/Realtime; Rust/WASM/Firmware; Inclusive Visuals; Persona Walkthrough (simulasi, bukan peserta); UI Finish Gate (rubrik Impeccable); Test Results Analyzer (adapter prediksi belum tersedia); AI-Generated Code Auditor (stack spesifik dan aturan silence/severity tidak diadopsi); Compliance Auditor (readiness, bukan sertifikasi); Cloud/Detection/Intelligence/IR/Pentest (engagement dan izin khusus).

### design — 7

- `design/design-image-prompt-engineer.md`
- `design/design-inclusive-visuals-specialist.md`
- `design/design-persona-walkthrough.md`
- `design/design-ui-designer.md`
- `design/design-ui-finish-gate-reviewer.md`
- `design/design-visual-storyteller.md`
- `design/design-whimsy-injector.md`

### engineering — 51

- `engineering/engineering-ai-engineer.md`
- `engineering/engineering-ats-validator-architect.md`
- `engineering/engineering-backend-architect.md`
- `engineering/engineering-china-network-engineer.md`
- `engineering/engineering-cms-developer.md`
- `engineering/engineering-code-reviewer.md`
- `engineering/engineering-codebase-onboarding-engineer.md`
- `engineering/engineering-data-engineer.md`
- `engineering/engineering-data-visualization-engineer.md`
- `engineering/engineering-database-optimizer.md`
- `engineering/engineering-desktop-app-engineer.md`
- `engineering/engineering-devops-automator.md`
- `engineering/engineering-drupal-performance.md`
- `engineering/engineering-drupal-shopping-cart.md`
- `engineering/engineering-email-intelligence-engineer.md`
- `engineering/engineering-embedded-firmware-engineer.md`
- `engineering/engineering-feishu-integration-developer.md`
- `engineering/engineering-filament-optimization-specialist.md`
- `engineering/engineering-finops-engineer.md`
- `engineering/engineering-frontend-developer.md`
- `engineering/engineering-gaussdb-expert.md`
- `engineering/engineering-git-workflow-master.md`
- `engineering/engineering-incident-response-commander.md`
- `engineering/engineering-iot-fleet-engineer.md`
- `engineering/engineering-it-service-manager.md`
- `engineering/engineering-knowledge-graph-engineer.md`
- `engineering/engineering-llm-post-training-engineer.md`
- `engineering/engineering-mobile-app-builder.md`
- `engineering/engineering-mobile-release-engineer.md`
- `engineering/engineering-network-engineer.md`
- `engineering/engineering-orgscript-engineer.md`
- `engineering/engineering-pdf-engine-architect.md`
- `engineering/engineering-platform-engineer.md`
- `engineering/engineering-prompt-engineer.md`
- `engineering/engineering-rag-pipeline-engineer.md`
- `engineering/engineering-realtime-collaboration-engineer.md`
- `engineering/engineering-rust-refactoring-specialist.md`
- `engineering/engineering-search-relevance-engineer.md`
- `engineering/engineering-section-508-specialist.md`
- `engineering/engineering-servicenow-developer-mentor.md`
- `engineering/engineering-software-architect.md`
- `engineering/engineering-solidity-smart-contract-engineer.md`
- `engineering/engineering-sre.md`
- `engineering/engineering-universal-document-compiler.md`
- `engineering/engineering-uswds-developer.md`
- `engineering/engineering-video-streaming-engineer.md`
- `engineering/engineering-voice-ai-integration-engineer.md`
- `engineering/engineering-webassembly-engineer.md`
- `engineering/engineering-wechat-mini-program-developer.md`
- `engineering/engineering-wordpress-performance.md`
- `engineering/engineering-wordpress-shopping-cart.md`

### security — 9

- `security/security-ai-generated-code-auditor.md`
- `security/security-appsec-engineer.md`
- `security/security-blockchain-security-auditor.md`
- `security/security-cloud-security-architect.md`
- `security/security-compliance-auditor.md`
- `security/security-incident-responder.md`
- `security/security-penetration-tester.md`
- `security/security-threat-detection-engineer.md`
- `security/security-threat-intelligence-analyst.md`

### testing — 5

- `testing/testing-evidence-collector.md`
- `testing/testing-test-automation-engineer.md`
- `testing/testing-test-results-analyzer.md`
- `testing/testing-tool-evaluator.md`
- `testing/testing-workflow-optimizer.md`

## 6. Daftar C: 10 persona yang tidak diregistrasikan pada versi ini

Keputusan ini berarti tidak menyalin ke root discovery, bukan menuduh semua persona sebagai malware atau melarang pembacaan kritis sumbernya. `specialized/agents-orchestrator.md` dan seluruh NEXUS juga tidak diaktifkan; keduanya berada di luar 99 persona dan tidak ikut hitungan berikut.

| Path upstream | Alasan |
|---|---|
| `design/design-ux-architect.md` | Mengambil topology/API/koordinasi dan membawa theme requirement yang belum diminta. |
| `engineering/engineering-ai-data-remediation-engineer.md` | Contoh eval atas transformasi AI setelah blacklist bukan batas eksekusi yang memadai. |
| `engineering/engineering-autonomous-optimization-architect.md` | Provider routing/promosi otonom dan live shadowing tidak menjadi izin default. |
| `engineering/engineering-minimal-change-engineer.md` | Duplikasi Ponytail; tekanan diff/symptom tidak boleh menghambat root-cause dan migrasi caller. |
| `engineering/engineering-multi-agent-systems-architect.md` | Tidak menjadi orkestrator OMP kedua; klaim JSON sebagai mitigasi injection tidak cukup. |
| `engineering/engineering-rapid-prototyper.md` | Stack/analytics asumtif dan edge-cases-later tidak menggantikan requirement/correctness. |
| `engineering/engineering-senior-developer.md` | Nama generik tetapi stack Laravel/Livewire/FluxUI dan efek/tema asumtif; bukan baseline umum. |
| `marketing/marketing-seo-specialist.md` | Kontradiksi sumber primer dan aturan berisiko; lihat bagian 2. |
| `security/security-senior-secops.md` | Mengasumsikan standar internal dan pemeriksaan sebelum scope; bukan default OMP. |
| `testing/testing-reality-checker.md` | First-pass otomatis belum lengkap dan bias zero-findings berkonflik dengan evidence netral. |

## 7. Kontrak integrasi OMP

### 7.1 Target, perubahan dan dampak

- Target hanya OMP default-profile pengguna; lintas proyek melalui discovery normal, tetap tunduk project override. Tidak menyentuh Claude/Codex/Gemini/host lain atau named profile.
- Simpan distribusi asli di `~/.omp/agent/ecosystem/sources/agency-agents-4e3ac3ca/`, di luar discovery. Periksa commit/tree, LICENSE, source hash dan source-to-output map.
- Konverter resmi mendukung generic SKILL.md meski tidak mempunyai target OMP. Setelah seluruh script yang akan dijalankan ditinjau, gunakan satu konverter resmi `skill-md` (misalnya osaurus) dengan output scratch baru. Konverter dapat menghasilkan seluruh roster; **hanya 17 hasil allowlist A yang disalin** ke root skill OMP, dengan prefix `agency-` dari konverter. Nama aktual diturunkan dari frontmatter dan hasil konverter, bukan ditebak dari filename.
- Pertahankan isi vendor; tidak membuat adapter, fork, duplikasi skill, agent shell, MCP, watcher, hook, daemon atau engine baru. Installer auto-detect semua host tidak digunakan. Output scratch tidak boleh menunjuk skills/config existing: konverter mempunyai pembersihan output.
- Root discovery yang direncanakan adalah `~/.omp/agent/skills/agency-<slug>/SKILL.md` mengikuti layout existing; verifikasi discovery native dan collision dahulu. Jangan menimpa file/symlink existing tanpa penilaian dan persetujuan konflik.
- Update terarah `~/.omp/agent/AGENTS.md`, `ecosystem/PANDUAN-PROYEK-OMP.md`, `ecosystem/ledger.json`, serta measurement `ecosystem/measurements/agency-agents-20261021.json` untuk pin, routing, batas dan evidence. Tidak mengubah skill vendor, config.yml, provider/MCP, memory backend, approval mode, credential atau environment global.
- Metadata skill bertambah; body dibaca saat relevan sesuai workflow existing. Tidak ada klaim kuantitatif tentang overhead atau penghematan sebelum pengukuran. Sesi baru diperlukan untuk acceptance discovery; hot reload tidak diasumsikan.

### 7.2 Aturan routing

Requirement/checkpoint tetap grilling; planning/dispatch tetap native task; coding tetap Ponytail; TDD/debugging/review/security tetap owner existing. Impeccable tetap pemilik frontend; runner proyek + e2e/webapp-testing membuktikan perilaku. Context7/dokumentasi vendor mengalahkan contoh API lama; ARS/PoP/citation-management tetap sesuai tahap dan lisensinya.

Persona dipilih berdasarkan artefak/tugas, bukan semua divisi dipanggil setiap kali. Multiple persona hanya jika ada slice independen atau kebutuhan nyata; tidak ada rantai dev-QA/reviewer otomatis. Contoh, target angka, pengalaman profesional dan klaim memory dalam persona adalah data, bukan pengalaman/hasil OMP. Unknown tidak disembunyikan dan severity keamanan tetap mengikuti boundary serta dampak yang terbukti.

### 7.3 Gerbang izin

Tidak ada izin implisit untuk paid model/cloud/SEO tools, akun baru, production, pembayaran, load test, operasi DB, restore/failover, deployment, rotasi/revoke, history rewrite, penghapusan data, crawling massal, outreach, atau unggah dokumen. Pemilihan panduan tidak memasang dependency/binary. Target, dampak, biaya, rollback dan verifikasi dibahas pada titik risiko.

## 8. Tahapan implementasi setelah scope dikonfirmasi

1. Temukan layout discovery dan mekanisme snapshot/publikasi existing; periksa changes pengguna tanpa menghapusnya. Backup hanya routing/guide/ledger yang akan berubah; catat file dan hash awal.
2. Ambil exact source commit resmi, pertahankan lisensi; periksa executable converter/helper secara penuh sebelum menjalankannya. Tidak mengikuti latest, aplikasi desktop auto-update, installer lintas-host, atau sumber pengganti.
3. Generate ke scratch baru, salin hanya allowlist A; verifikasi nama unik, source/body mapping, hash dan tidak ada file di luar scope. Tidak mengklaim skill aktif hanya karena file ada.
4. Terapkan routing lokal dan jalankan acceptance di bawah; gunakan provider/runner existing, data dummy dan task scoped. Tidak ada vendor runner/model provider baru. Jika prasyarat runtime spesifik tidak tersedia, bedakan guidance terpasang dari capability belum diuji; jangan menyebut seluruh runtime siap.
5. Setelah evidence lolos, perbarui snapshot `https://github.com/SaKuRa-u/omp-setup` melalui mekanisme existing. Publikasikan hanya perubahan scope, source text/license/provenance dan manifest yang diperlukan. Jangan menyegarkan seluruh backup atau mendorong perubahan pengguna yang tidak terkait. Exclude .git, dependency trees, binary, scratch, secrets, token, session, browser state, hasil dokumen/data privat dan log sensitif. Scan/review redaksi sesuai kontrak snapshot existing, periksa manifest/hash dan remote target; tidak force-push. Verifikasi commit remote memuat perubahan yang dimaksud, lalu laporkan commit URL.

## 9. Acceptance criteria yang harus dipenuhi saat penerapan

**Seluruh kriteria berikut belum dijalankan; ini kontrak acceptance, bukan tabel hasil lulus.**

| Area | Bukti yang diperlukan |
|---|---|
| Provenance | Exact commit/tree, source/output hash map, LICENSE asli, 17 path allowlist unik; tidak ada body vendor diubah diam-diam. |
| Discovery | Sesi OMP baru menemukan tepat 17 skill agency baru; metadata/body yang benar dapat dibaca; B/C/NEXUS tidak diregistrasikan; skill existing tetap tersedia. |
| Positive routing | Tugas API, identity, uang, locale, privacy, recovery, CLI, docs, UX research, brand, a11y, performance, threat model, credentials, source synthesis dan document generation memuat referensi yang tepat tanpa merebut owner existing. |
| Negative/collision | Bug rutin tetap debugging, UI tetap Impeccable, manuskrip tetap ARS, pentest/cloud/live operasi tetap gated; tidak fan-out semua persona, tidak memicu SEO/C atau memory otomatis. |
| Evidence behavior | Scoped walkthrough menggunakan source/artefak dummy nyata; tidak mengarang peserta, angka, volume pencarian, credential, hasil benchmark, sertifikasi, atau pengalaman. Unknown dan tes yang belum dijalankan dinyatakan. |
| Document generation | Loading guidance dibuktikan terpisah dari runtime. Pada tugas format pertama yang disetujui, hasilkan artefak aktual + script sesuai permintaan, buka/render/validasi dan periksa data; dependency/viewer serta limitnya dilaporkan. Tidak mengklaim keempat format siap sebelum masing-masing dieksersis. |
| Izin dan isolasi | Tidak ada perubahan host lain, provider/MCP/memory/credential atau dependency global; tidak ada operasi live/paid/destruktif terselubung. |
| Publikasi | Daftar changed files scoped, manifest/hash konsisten, review credential/redaksi, commit remote teramati; tidak ada data privat/artefak sementara ikut. |

Kriteria routing membuktikan skenario yang diuji, bukan jaminan semua parafrasa selalu benar. Benchmark kualitas yang sebanding diperlukan sebelum klaim kecepatan, biaya, atau reasoning lebih baik. Tidak perlu membuat test suite permanen yang hanya mencocokkan teks skill; gunakan smoke/report scoped sesuai pola existing.

## 10. Rollback

Pulihkan hanya routing/guide/ledger yang diubah dari backup terarah. Pindahkan 17 direktori skill yang dibuat task ini keluar root discovery ke backup; jangan menghapus skill/data pengguna atau snapshot source. Mulai sesi baru dan verifikasi bahwa baseline existing kembali, tanpa hot-reload assumption. Jika perubahan sudah dipublikasikan, buat commit pembalik scoped serta manifest yang konsisten melalui mekanisme snapshot existing; jangan rewrite history atau force-push. Ini rollback instruksi/discovery, bukan rollback otomatis data/provider yang tidak diubah oleh instalasi.

## 11. Evidence, batas dan sumber

**Terverifikasi dalam analisis:** isi SEO Specialist dan Document Generator dibaca sampai akhir; sumber Google terkait dibuka; inventaris complete-tree dan daftar keputusan diperiksa dengan assert. Analisis sebelumnya membagi 97 persona ke lima subanalisis sumber plus Research oleh owner, dengan temuan penting dibaca ulang; daftar cakupannya cocok inventaris. Daftar A/B/C saling terpisah dan tepat menutup 99 persona dalam scope.

**Implementasi 22 Oktober 2026:** converter upstream tanpa modifikasi berhasil untuk allowlist 17 skill; discovery native naik 60 menjadi 77 tanpa warning, termasuk cwd netral. Sembilan skenario native read-only lulus dalam scope sintetis; semua 17 panduan benar-benar dibaca. Evidence dan kegagalan awal dipertahankan pada measurement, bukan disimpulkan dari proposal. **Belum diuji:** proyek nyata, runtime ekspor dokumen, SEO live, benchmark kualitas/biaya dan seluruh runtime extension normal. Publikasi GitHub diverifikasi sebagai langkah terpisah setelah snapshot siap.

Sumber utama:

- [SEO Specialist pinned](https://github.com/msitarzewski/agency-agents/blob/4e3ac3ca6604c75113f52c695dbddcc7af928b46/marketing/marketing-seo-specialist.md)
- [Document Generator pinned](https://github.com/msitarzewski/agency-agents/blob/4e3ac3ca6604c75113f52c695dbddcc7af928b46/specialized/specialized-document-generator.md)
- [Katalog divisi](https://github.com/msitarzewski/agency-agents/blob/4e3ac3ca6604c75113f52c695dbddcc7af928b46/divisions.json), [tree lengkap](https://api.github.com/repos/msitarzewski/agency-agents/git/trees/9a8b9c68018b488ce0fea0e745b3fd2f2a211bb0?recursive=1), [LICENSE](https://github.com/msitarzewski/agency-agents/blob/4e3ac3ca6604c75113f52c695dbddcc7af928b46/LICENSE)
- [Konverter standar](https://github.com/msitarzewski/agency-agents/blob/4e3ac3ca6604c75113f52c695dbddcc7af928b46/scripts/convert.sh#L144-L226), [helper konversi](https://github.com/msitarzewski/agency-agents/blob/4e3ac3ca6604c75113f52c695dbddcc7af928b46/scripts/lib.sh#L20-L58), [kontrak tes keluaran](https://github.com/msitarzewski/agency-agents/blob/4e3ac3ca6604c75113f52c695dbddcc7af928b46/scripts/test-convert-outputs.sh#L1-L45)
- [Google: disavow](https://support.google.com/webmasters/answer/2648487?hl=en)
- [Google: multilingual sites dan penentuan bahasa](https://developers.google.com/search/docs/specialty/international/managing-multi-regional-sites)
- [Google: FAQ deprecation Mei 2026](https://developers.google.com/search/updates#faq-deprecation), [penghapusan dokumen Juni 2026](https://developers.google.com/search/updates#removing-faq-rich-result)
- [Google: title links](https://developers.google.com/search/docs/appearance/title-link), [evaluasi SEO pihak ketiga](https://developers.google.com/search/docs/fundamentals/third-party-seo)
- Kontrak lokal yang sudah dibaca: AGENTS.md global dalam konteks; `ecosystem/IMPECCABLE-OMP.md`; `ecosystem/PANDUAN-PROYEK-OMP.md`; analisis workflow dan ARS pada proyek ini. Kontrak lokal tidak disalin ke skill vendor.

## 12. Keputusan disetujui

Pengguna menyetujui penerapan rekomendasi dan pembaruan `SaKuRa-u/omp-setup`, lalu meminta melanjutkan setelah jeda. Scope: **17 A diadopsi on-demand, 72 B hanya referensi, 10 C tidak diregistrasikan; SEO tetap sumber primer-first tanpa memasang persona ini; Document Generator guidance dengan runtime per tugas; OMP-only dan publikasi scoped sesudah acceptance.**

Dokumen ini mempertahankan analisis dan acceptance criteria awal sebagai spesifikasi; hasil implementasi terbatas dinyatakan pada bagian 11. Status aktual, kegagalan awal dan batas runtime dicatat pada `~/.omp/agent/ecosystem/measurements/agency-agents-20261021.json`; bukti commit remote dilaporkan pada penyelesaian publikasi. Tidak mengulang intake atau meminta izin identik; keputusan/operasi di luar scope tetap memerlukan persetujuan tersendiri.
