# Evaluasi kandidat desain: sumber original dan staging

Tanggal: 2026-11-10. Status: staging selesai; registrasi/routing serta verifikasi akhir milik parent.

## Ringkasan

- Lima repo dievaluasi dari SHA penuh upstream, bukan popularitas. Total 20 skill: 16 direkomendasikan registrasi, tiga hanya staged, satu source-only.
- 580 file capability dipertahankan sebagai salinan original: references, assets, kit, scripts, contoh dan LICENSE sesuai kebutuhan tiap skill. Tidak ada skill vendor ditulis ulang, nama diganti, shim atau adapter OMP dibuat.
- Tidak mengubah config.yml, AGENTS.md, SKILL-ROUTING.md, ledger.json, skill existing atau host lain. Tidak menjalankan kode/installer vendor, tests/build/lint, capture, publish, service atau hook.

## Pin, lisensi dan verdict repo

### cathrynlavery/diagram-design
- Sumber: [https://github.com/cathrynlavery/diagram-design](https://github.com/cathrynlavery/diagram-design); commit [`f2496acbde9f45ccb55c24d4f75210c8a1355df8`](https://github.com/cathrynlavery/diagram-design/commit/f2496acbde9f45ccb55c24d4f75210c8a1355df8).
- Lisensi: [MIT](https://github.com/cathrynlavery/diagram-design/blob/f2496acbde9f45ccb55c24d4f75210c8a1355df8/LICENSE); SHA-256 LICENSE `bb7e12e91fecef43024111123ff784cec6c485585561d8b552557c0173b3ed29`.
- Verdict: Adopsi skill original lengkap beserta references/assets/scripts; jangan pasang command/plugin host.
- Atribusi: Pertahankan LICENSE dan copyright pemilik.
- Original: `C:/Users/Indrimeilla-PC/.omp/agent/ecosystem/sources/skills-expansion-20261110/cathrynlavery-diagram-design-f2496acbde9f45ccb55c24d4f75210c8a1355df8`.
- Capability: `C:/Users/Indrimeilla-PC/.omp/agent/ecosystem/capabilities/cathrynlavery-diagram-design-f2496acbde9f45ccb55c24d4f75210c8a1355df8` (299 file).
- Tree expected-copy SHA-256: `c9cef0b37d27c531a8b45f781320e66d7b54c9ebe415010a9570f6e2e7bd6355`.

### wheresryan22/anatomy
- Sumber: [https://github.com/wheresryan22/anatomy](https://github.com/wheresryan22/anatomy); commit [`1482e8469b0a9e0d8cc18ea2740a01423d29ae80`](https://github.com/wheresryan22/anatomy/commit/1482e8469b0a9e0d8cc18ea2740a01423d29ae80).
- Lisensi: [MIT](https://github.com/wheresryan22/anatomy/blob/1482e8469b0a9e0d8cc18ea2740a01423d29ae80/LICENSE); SHA-256 LICENSE `87c078ab9d90a3044f359e6b563d4e6afea7aa060897cf4f21618687b3856796`.
- Verdict: Adopsi skill + kit/runtime original lengkap sebagai sumber; tidak ada runtime/hook/service dijalankan.
- Atribusi: Pertahankan LICENSE dan copyright pemilik.
- Original: `C:/Users/Indrimeilla-PC/.omp/agent/ecosystem/sources/skills-expansion-20261110/wheresryan22-anatomy-1482e8469b0a9e0d8cc18ea2740a01423d29ae80`.
- Capability: `C:/Users/Indrimeilla-PC/.omp/agent/ecosystem/capabilities/wheresryan22-anatomy-1482e8469b0a9e0d8cc18ea2740a01423d29ae80` (161 file).
- Tree expected-copy SHA-256: `49bfe7995f7d31f8a0afdc09bd7bf739738d767e75eded0483913fb164ab367b`.

### elayadesign/ai-design-skills
- Sumber: [https://github.com/elayadesign/ai-design-skills](https://github.com/elayadesign/ai-design-skills); commit [`456d9e0d3e2d84c748bb143c6ca3d90c45e16213`](https://github.com/elayadesign/ai-design-skills/commit/456d9e0d3e2d84c748bb143c6ca3d90c45e16213).
- Lisensi: [MIT](https://github.com/elayadesign/ai-design-skills/blob/456d9e0d3e2d84c748bb143c6ca3d90c45e16213/LICENSE); SHA-256 LICENSE `5f9af6ce7083838497676a8dfa651ad8e2559fdabd4586afc73587beec476b0e`.
- Verdict: Stage dua skill original sebagai panduan pendukung, tidak didaftarkan.
- Atribusi: Pertahankan LICENSE dan copyright pemilik.
- Original: `C:/Users/Indrimeilla-PC/.omp/agent/ecosystem/sources/skills-expansion-20261110/elayadesign-ai-design-skills-456d9e0d3e2d84c748bb143c6ca3d90c45e16213`.
- Capability: `C:/Users/Indrimeilla-PC/.omp/agent/ecosystem/capabilities/elayadesign-ai-design-skills-456d9e0d3e2d84c748bb143c6ca3d90c45e16213` (4 file).
- Tree expected-copy SHA-256: `8203c01abc2d941d125b8f663fd757c9603b9a7c673bfb7a033047f66fb95052`.

### jakubkrehel/skills
- Sumber: [https://github.com/jakubkrehel/skills](https://github.com/jakubkrehel/skills); commit [`72bdd6121cd595f47fd21c9f23e374028c9cbacd`](https://github.com/jakubkrehel/skills/commit/72bdd6121cd595f47fd21c9f23e374028c9cbacd).
- Lisensi: [MIT](https://github.com/jakubkrehel/skills/blob/72bdd6121cd595f47fd21c9f23e374028c9cbacd/LICENSE); SHA-256 LICENSE `ed1dfe988fc40511b4845ccd9050a143a2002fee3bedc8064c47fa342b5d8d4f`.
- Verdict: Adopsi 13 skill; build-design hanya staged karena konflik aksesibilitas, afk hanya original source.
- Atribusi: Pertahankan LICENSE dan copyright pemilik.
- Original: `C:/Users/Indrimeilla-PC/.omp/agent/ecosystem/sources/skills-expansion-20261110/jakubkrehel-skills-72bdd6121cd595f47fd21c9f23e374028c9cbacd`.
- Capability: `C:/Users/Indrimeilla-PC/.omp/agent/ecosystem/capabilities/jakubkrehel-skills-72bdd6121cd595f47fd21c9f23e374028c9cbacd` (96 file).
- Tree expected-copy SHA-256: `d90d707505d8a65ef0b18e008d1ab49043b3b4cf60f5c4ece8307e6a8c94b671`.

### heydamir/unslop
- Sumber: [https://github.com/heydamir/unslop](https://github.com/heydamir/unslop); commit [`97daa3eb365670ea3f87ed85356cbfcee18105a5`](https://github.com/heydamir/unslop/commit/97daa3eb365670ea3f87ed85356cbfcee18105a5).
- Lisensi: [CC-BY-4.0](https://github.com/heydamir/unslop/blob/97daa3eb365670ea3f87ed85356cbfcee18105a5/LICENSE); SHA-256 LICENSE `9ba9550ad48438d0836ddab3da480b3b69ffa0aac7b7878b5a0039e7ab429411`.
- Verdict: Adopsi alternatif retrofit eksplisit lengkap; atribusi Damir/CC BY dipertahankan.
- Atribusi: Damir Sokolovsky (@heydamir), https://heydamir.design/unslop, CC BY 4.0; pertahankan kredit sumber, tautan lisensi dan tandai perubahan bila adaptasi; video upstream menyertakan unslop by @heydamir.
- Original: `C:/Users/Indrimeilla-PC/.omp/agent/ecosystem/sources/skills-expansion-20261110/heydamir-unslop-97daa3eb365670ea3f87ed85356cbfcee18105a5`.
- Capability: `C:/Users/Indrimeilla-PC/.omp/agent/ecosystem/capabilities/heydamir-unslop-97daa3eb365670ea3f87ed85356cbfcee18105a5` (20 file).
- Tree expected-copy SHA-256: `b5708eb5c797813cbeeba50dab2b6561e26fe16100b219c298f0f27ee8bc50da`.

## Keputusan per skill dan nilai tambahan

Overlap tidak dipakai sebagai alasan tunggal penolakan. Suite Jakub dipertahankan sebagai alternatif review teknik terukur, bukan pengganti wajib seluruh desain Impeccable. `better-interface` memerlukan keenam domain `better-*`; mendaftarkan orkestrator saja akan mengurangi coverage.

### `diagram-design`: adopt
Diagram editorial HTML/SVG dengan 45 tata letak, sembilan pola semantik, digest impor dan fidelity ledger; menambah disiplin geometri konektor yang tidak dimiliki alur umum Impeccable/canvas-design.
- Pemilik tahap: Pemilik tahap render diagram relasional; bukan pemilik arsitektur sistem atau semua desain UI.
- Positif: Buat diagram arsitektur HTML/SVG berlabel trust boundary; redraw Mermaid dengan ledger perubahan.
- Near miss: Jelaskan arsitektur kode tanpa membuat diagram, atau buat bagan teks ASCII.
- [Bukti SKILL original](https://github.com/cathrynlavery/diagram-design/blob/f2496acbde9f45ccb55c24d4f75210c8a1355df8/skills/diagram-design/SKILL.md); SHA-256 `673aa27d72e3c135afead0372faba21f15392bf057316eb37214f87825d7580d`.

### `anatomy`: adopt
Skill original nyata dengan kit isometrik dan model fisik tersinkron ke readout; bukan runtime-only. Nilai baru dibanding Motion/GSAP: solid geometry, depth ordering, lathe/tube, shader ruang-dunia dan contoh mekanis.
- Pemilik tahap: Pemilik ilustrasi mekanisme fisik isometrik; jangan aktif untuk setiap kata diagram.
- Positif: Buat ilustrasi SVG isometrik interaktif berupa alat fisik untuk menjelaskan cache.
- Near miss: Buat flowchart layanan/API dengan kotak dan panah; gunakan diagram-design.
- [Bukti SKILL original](https://github.com/wheresryan22/anatomy/blob/1482e8469b0a9e0d8cc18ea2740a01423d29ae80/SKILL.md); SHA-256 `3423ada45a05033bb6e320dfc3b3ac832569969a5afb059bbfc9096c5cf0c71b`.

### `figma-designer`: staged-only
Nilai khusus: variabel dua lapis, alias Light/Dark dan Foundations frame yang terikat token. Membutuhkan figma-use, figma-generate-design/library dan Figma MCP/use_figma yang tidak disediakan repo atau lingkungan ini.
- Pemilik tahap: Guidance Figma original dipertahankan, tanpa pemasangan MCP dan tanpa registrasi runnable.
- Positif: Pengguna meminta review pedoman token/Figma Elaya sebagai referensi.
- Near miss: Tautan Figma bukan bukti tool use_figma tersedia; jangan klaim dapat mendesain di Figma.
- [Bukti SKILL original](https://github.com/elayadesign/ai-design-skills/blob/456d9e0d3e2d84c748bb143c6ca3d90c45e16213/skills/figma-designer/SKILL.md); SHA-256 `8dceb81be0d747d9f6aab4ca0e590f6c07a41665d3b60cb16689eda2ee56e312`.

### `landing-page-design`: staged-only
Intake offer/audience/CTA dan kontrak token berguna sebagai referensi original, tetapi instruksi global semua UI, tiga langkah wajib, FAQ 6–12 dan tagline reveal wajib berlawanan dengan composition berbasis konten antislop/Impeccable. Bukan default.
- Pemilik tahap: Guidance arsip capability, tidak didaftarkan; keselamatan/kebenaran klaim tetap aturan induk.
- Positif: Pengguna secara eksplisit meminta sistem visual Elaya untuk landing page.
- Near miss: Permintaan landing page umum atau dashboard tidak boleh memilih template ini otomatis.
- [Bukti SKILL original](https://github.com/elayadesign/ai-design-skills/blob/456d9e0d3e2d84c748bb143c6ca3d90c45e16213/skills/landing-page-design/SKILL.md); SHA-256 `0c0ad9323121c0cc4f52b637f64a3a446016f065ae9ebf012dab210559f03d5f`.

### `afk`: source-only; eksplisit-only
Original memberi otonomi berjam-jam, ide fitur baru wajib, pembacaan connected services/sibling projects dan commit lokal; di luar seleksi kapabilitas terfokus dan batas tanpa telemetry/service. Explicit-only flag dicatat, tetapi tidak didaftarkan.
- Pemilik tahap: Source-only, tidak disalin ke capability dan tidak diaktifkan.
- Positif: Hanya review teks prosedur afk bila diminta khusus.
- Near miss: Permintaan UI polish/review biasa tidak mengizinkan unattended feature exploration.
- [Bukti SKILL original](https://github.com/jakubkrehel/skills/blob/72bdd6121cd595f47fd21c9f23e374028c9cbacd/skills/afk/SKILL.md); SHA-256 `ab5366d54bf4ea990295ce6609b2cd01e739c9234b1a8ed2a6625be49c42dd1e`.

### `better-accessibility`: adopt
Alternatif audit kode berorientasi kriteria WCAG 2.2: membedakan AA 24px dari heuristic 44px/AAA, fokus, announcement dan drag alternative. Melengkapi fixing-accessibility/auditor dengan pelaporan lintas domain konsisten.
- Pemilik tahap: Pemilik kriteria a11y di suite Jakub; jangan jalankan beberapa auditor sebagai pemilik bersamaan.
- Positif: Gunakan better-accessibility untuk menilai keyboard, focus dan aria-live menurut WCAG 2.2.
- Near miss: Polish shadow atau memilih font tanpa isu aksesibilitas bukan tahap audit ini.
- [Bukti SKILL original](https://github.com/jakubkrehel/skills/blob/72bdd6121cd595f47fd21c9f23e374028c9cbacd/skills/better-accessibility/SKILL.md); SHA-256 `f3f9dc26c947dbdfc64be80d3c0d278d5d8bb070c7826b2dae6bf8c380e81586`.

### `better-colors`: adopt
Panduan terfokus ramp OKLCH, gamut fallback, semantic token seams, brand color pinned vs snapped dan rendered-pair measurement; Impeccable colorize memberi arah warna lebih umum.
- Pemilik tahap: Pemilik perhitungan warna di suite Jakub; better-accessibility menentukan ambang yang berlaku.
- Positif: Bangun ramp semantik dari brand hex sambil mempertahankan warna kontraktual dan mengukur kontras.
- Near miss: Membuat logo atau memilih mood palette tanpa pekerjaan token/ramp tetap alur desain umum.
- [Bukti SKILL original](https://github.com/jakubkrehel/skills/blob/72bdd6121cd595f47fd21c9f23e374028c9cbacd/skills/better-colors/SKILL.md); SHA-256 `2fc5964fe9adae02e8ba4d80d40ad85d23da227f3eab3b55e06c7df0ac7e7652`.

### `better-interface`: adopt
Alternatif review lintas enam disiplin dengan tabel coverage, root-cause consolidation, escalation dan verdict terbatas bukti. Berbeda dari critique Impeccable yang lebih luas pada arah/UX.
- Pemilik tahap: Pemilik orkestrasi hanya bila paket review Jakub dipilih; domain di bawah tidak menjadi orkestrator kedua.
- Positif: Review interface secara terstruktur dengan coverage enam domain dan temuan before/after.
- Near miss: Review perubahan branch/PR harus interface-review eksplisit; desain ulang umum tetap Impeccable.
- [Bukti SKILL original](https://github.com/jakubkrehel/skills/blob/72bdd6121cd595f47fd21c9f23e374028c9cbacd/skills/better-interface/SKILL.md); SHA-256 `915ed5dc1442d9b78782900ff8b62160133362a2fe23998917814bfb6422869e`.

### `better-layout`: adopt
Resep konten adaptif, DOM/visual order, logical properties, RTL safe area dan container-query shrink-to-fit; memakai token proyek, bukan mengganti arah visual Impeccable.
- Pemilik tahap: Pemilik struktur/layout pada suite Jakub; i18n message/ICU tetap skill internasionalisasi.
- Positif: Layout komponen pecah pada teks panjang, RTL dan container sempit; pakai better-layout.
- Near miss: Mendesain brand atau animasi hero bukan layout resilience.
- [Bukti SKILL original](https://github.com/jakubkrehel/skills/blob/72bdd6121cd595f47fd21c9f23e374028c9cbacd/skills/better-layout/SKILL.md); SHA-256 `4e7fd6880f41a87a21bb3be8e0b2bd7e7b8c561af5fb706ec0bb3e58877d60ec`.

### `better-typography`: adopt
Menambah rincian CSS deterministik di atas Impeccable typeset: font-synthesis longhands, OpenType vs font-variant, custom axes, text-box trim dan fallback-safe properties.
- Pemilik tahap: Pemilik rendering teks di suite Jakub; aturan tanda baca antislop yang berlaku tetap mengikat.
- Positif: Perbaiki font synthesis, OpenType/tabular numbers dan wrapping tanpa mengganti typeface.
- Near miss: Pilih identitas tipografi baru/brand direction tetap Impeccable.
- [Bukti SKILL original](https://github.com/jakubkrehel/skills/blob/72bdd6121cd595f47fd21c9f23e374028c9cbacd/skills/better-typography/SKILL.md); SHA-256 `8f00a576f6c8d2f8d72dfbffe765ce569982509d01533ea5881de6e1918d3a68`.

### `better-ui`: adopt; eksplisit-only
Alternatif resep polish bernilai presisi: radius + border, forced-colors fallback, hover-capability gates, retargeting dan icon swap versi Tailwind. Wajib terpilih sengaja karena easing/scale exact berbeda Emil/Motion/GSAP.
- Pemilik tahap: Pemilik polish hanya dalam suite/alternatif Jakub; tidak mengalahkan token/convention proyek.
- Positif: Gunakan resep better-ui untuk nested radius dan state icon CSS pada proyek yang memilih bahasa polish ini.
- Near miss: Animasi GSAP, koreografi atau jank umum tetap pemilik Motion/GSAP/Emil; jangan campur angka exact.
- [Bukti SKILL original](https://github.com/jakubkrehel/skills/blob/72bdd6121cd595f47fd21c9f23e374028c9cbacd/skills/better-ui/SKILL.md); SHA-256 `2d5f9fa4f3bbf045da914349b6e5fde559c947e5323968350b65bb2cdc6b3e4f`.

### `better-writing`: adopt
Inventaris istilah dan string locale, message utuh/plural, consequence-based confirmation dan error recovery; fokus copy produk operasional, bukan copywriting marketing atau filter antislop-copywriting.
- Pemilik tahap: Pemilik kata interface di suite Jakub; tidak mengubah font/markup sendiri.
- Positif: Audit label, error, empty state dan konfirmasi hapus agar konsisten dengan istilah produk.
- Near miss: Tulis headline iklan atau humanize esai bukan review microcopy ini.
- [Bukti SKILL original](https://github.com/jakubkrehel/skills/blob/72bdd6121cd595f47fd21c9f23e374028c9cbacd/skills/better-writing/SKILL.md); SHA-256 `109e4337da3621410c225b137d4683d8c246ca06071990a22882376ad60ec6e3`.

### `break`: adopt; eksplisit-only
Harness satu komponen, satu kolom hostile scenarios yang benar-benar dapat mencapai komponen; hanya melaporkan pecah teramati. Alternatif konkret dari break-ui berbasis checklist.
- Pemilik tahap: Eksplisit upstream; tidak sama nama dengan break-ui, pertahankan komponen produksi dan cleanup atas permintaan.
- Positif: /break input komponen ini dengan konten ekstrem dan buat harness visual.
- Near miss: Uji keamanan API, stress load backend atau sekadar critique tata letak bukan skill ini.
- [Bukti SKILL original](https://github.com/jakubkrehel/skills/blob/72bdd6121cd595f47fd21c9f23e374028c9cbacd/skills/break/SKILL.md); SHA-256 `4e3b9788966cd1ee91fc5bb6488ffb11a3de54d56a09191a3b59e399240d8390`.

### `build-design`: staged-only
Mapping Figma/image ke token dan daftar rounded/deviation berguna, tetapi SKILL.md meminta build as designed lalu restore perubahan contrast/focus yang tidak ada desain (baris 12,79–81). Konflik safety/a11y, jangan daftarkan tanpa keputusan induk.
- Pemilik tahap: Original tetap staged untuk bukti; tidak diperbaiki/diadapter dan tidak runnable Figma tanpa MCP.
- Positif: Baca metode pemetaan token/rounded values sebagai panduan handoff desain.
- Near miss: Jangan memuatnya sebagai pemilik implementasi UI produksi yang wajib menjaga aksesibilitas.
- [Bukti SKILL original](https://github.com/jakubkrehel/skills/blob/72bdd6121cd595f47fd21c9f23e374028c9cbacd/skills/build-design/SKILL.md); SHA-256 `d51cb44f594de7248340e9369c767f70a955483ba77f9976697cdbaf2f073a68`.

### `explain-interface`: adopt; eksplisit-only
Penjelasan teknik interface dengan tier measured/derived/inferred, paint-order layers dan perlindungan prompt injection. Lebih terfokus pada mekanisme visual dibanding REA shipped-artifact reconstruction.
- Pemilik tahap: Eksplisit upstream; tidak menambah chrome-devtools MCP yang disebut sebagai opsi.
- Positif: /explain-interface bagaimana efek gradient pada URL ini dibuat; jelaskan lapisan dan buktinya.
- Near miss: Bongkar executable/ASAR atau minta clone implementasi bukan explanation ini.
- [Bukti SKILL original](https://github.com/jakubkrehel/skills/blob/72bdd6121cd595f47fd21c9f23e374028c9cbacd/skills/explain-interface/SKILL.md); SHA-256 `6795aff9a133b94c6398a95b5c8958a2eaccade5db18f58e752bc02460a356e0`.

### `interface-review`: adopt; eksplisit-only
Review khusus perubahan: resolusi scope, baca removed side, consumer blast radius dua hop, status Introduced/Regression/Pre-existing; berbeda review UI keseluruhan dan general code-review.
- Pemilik tahap: Eksplisit upstream; depends better-interface + enam better-*.
- Positif: /interface-review pr 482, fokus regresi interface tanpa checkout branch pengguna.
- Near miss: Audit seluruh UI tanpa diff bukan review perubahan; gunakan better-interface.
- [Bukti SKILL original](https://github.com/jakubkrehel/skills/blob/72bdd6121cd595f47fd21c9f23e374028c9cbacd/skills/interface-review/SKILL.md); SHA-256 `976098555c7fe5dc0d082d70fd37b579f7513eb84a653d1abec8e347c80e32c1`.

### `state-machine`: adopt; eksplisit-only
Workbench states yang sudah ada di kode, fixture di data seam, URL __state dan switcher; berbeda diagram state machine atau mesin state runtime.
- Pemilik tahap: Eksplisit upstream; ini galeri state, tidak menambahkan branch produksi yang belum ada.
- Positif: /state-machine render loading, empty dan error komponen billing pada scratch route.
- Near miss: Implementasikan state machine XState atau gambar transisi state; jangan salah rute.
- [Bukti SKILL original](https://github.com/jakubkrehel/skills/blob/72bdd6121cd595f47fd21c9f23e374028c9cbacd/skills/state-machine/SKILL.md); SHA-256 `a94d55cf0a6b71bb8e374e66da9fd66fc8095141e7ff9859ab7c23e6f704f5cf`.

### `teardown`: adopt
Ilustrasi teknis berbasis satu model dengan hidden-line removal, assembled/exploded viewer dan ekspor terpilih; berbeda Anatomy yang menuntut mekanisme fisik padat/animasi, dan diagram-design yang topologi.
- Pemilik tahap: Pemilik technical linework object; helper discovery which/macOS/Linux tidak mendukung Windows native secara langsung.
- Positif: Buat ilustrasi exploded teknis perangkat dari foto/CAD dan beri viewer SVG/PNG/PDF.
- Near miss: Gambar manufacturing toleranced/CAD fabrication atau flowchart layanan bukan ilustrasi ini.
- [Bukti SKILL original](https://github.com/jakubkrehel/skills/blob/72bdd6121cd595f47fd21c9f23e374028c9cbacd/skills/teardown/SKILL.md); SHA-256 `9cf92fbee3ffbf28da72ef02ff2ba74bb6333f406cebf379a5c54a3554a72298`.

### `variant`: adopt; eksplisit-only
Eksplorasi satu axis di halaman nyata dengan picker URL __variant, floor aksesibilitas tetap dan promosi/hapus harness; alternatif terfokus untuk Impeccable generate.
- Pemilik tahap: Eksplisit upstream; bukan pemilik kritik atau ranking favorit.
- Positif: /variant buat tiga kepadatan tabel yang sama dan biarkan saya memilih.
- Near miss: Buat tiga situs penuh atau evaluasi A/B statistik bukan harness satu komponen.
- [Bukti SKILL original](https://github.com/jakubkrehel/skills/blob/72bdd6121cd595f47fd21c9f23e374028c9cbacd/skills/variant/SKILL.md); SHA-256 `6dbe09453c4521c13bf3788d64f2fcc8bcd8b5f7eeebbce95024ec5799defc11`.

### `unslop`: adopt; eksplisit-only
Alternatif terfokus untuk redline retrofit: sembilan pass berurutan, mode light/heavy/no slop dan lima baris arah produk. Antislop adalah filter; Impeccable tetap pemilik desain umum.
- Pemilik tahap: Alternatif pilihan eksplisit untuk retrofit; jangan bertumpuk sebagai pemilik tahap yang sama dengan Impeccable.
- Positif: Gunakan unslop Damir untuk merapikan dashboard AI-looking tanpa mengganti fitur atau urutan seksi.
- Near miss: Bangun halaman baru dengan identitas bebas, atau audit WCAG saja.
- [Bukti SKILL original](https://github.com/heydamir/unslop/blob/97daa3eb365670ea3f87ed85356cbfcee18105a5/skills/unslop/SKILL.md); SHA-256 `19afd7f1841316ddff3f854ea8ead675c738e08b30c41e51a8f1822fa0111947`.

## Exact roots untuk parent

Daftarkan individual roots berikut, **bukan root repo rekursif**. Nama original tidak bentrok pada frontmatter inventory `.omp/agent/skills` dan `.omp/plugins/cache` yang diperiksa. `break` berbeda dari incumbent `break-ui`.

| Nama | Exact path | Mode |
|---|---|---|
| `diagram-design` | `C:/Users/Indrimeilla-PC/.omp/agent/ecosystem/capabilities/cathrynlavery-diagram-design-f2496acbde9f45ccb55c24d4f75210c8a1355df8/skills/diagram-design` | rute sempit berdasarkan tugas |
| `anatomy` | `C:/Users/Indrimeilla-PC/.omp/agent/ecosystem/capabilities/wheresryan22-anatomy-1482e8469b0a9e0d8cc18ea2740a01423d29ae80` | rute sempit berdasarkan tugas |
| `better-accessibility` | `C:/Users/Indrimeilla-PC/.omp/agent/ecosystem/capabilities/jakubkrehel-skills-72bdd6121cd595f47fd21c9f23e374028c9cbacd/skills/better-accessibility` | rute sempit berdasarkan tugas |
| `better-colors` | `C:/Users/Indrimeilla-PC/.omp/agent/ecosystem/capabilities/jakubkrehel-skills-72bdd6121cd595f47fd21c9f23e374028c9cbacd/skills/better-colors` | rute sempit berdasarkan tugas |
| `better-interface` | `C:/Users/Indrimeilla-PC/.omp/agent/ecosystem/capabilities/jakubkrehel-skills-72bdd6121cd595f47fd21c9f23e374028c9cbacd/skills/better-interface` | rute sempit berdasarkan tugas |
| `better-layout` | `C:/Users/Indrimeilla-PC/.omp/agent/ecosystem/capabilities/jakubkrehel-skills-72bdd6121cd595f47fd21c9f23e374028c9cbacd/skills/better-layout` | rute sempit berdasarkan tugas |
| `better-typography` | `C:/Users/Indrimeilla-PC/.omp/agent/ecosystem/capabilities/jakubkrehel-skills-72bdd6121cd595f47fd21c9f23e374028c9cbacd/skills/better-typography` | rute sempit berdasarkan tugas |
| `better-ui` | `C:/Users/Indrimeilla-PC/.omp/agent/ecosystem/capabilities/jakubkrehel-skills-72bdd6121cd595f47fd21c9f23e374028c9cbacd/skills/better-ui` | eksplisit pilihan alternatif |
| `better-writing` | `C:/Users/Indrimeilla-PC/.omp/agent/ecosystem/capabilities/jakubkrehel-skills-72bdd6121cd595f47fd21c9f23e374028c9cbacd/skills/better-writing` | rute sempit berdasarkan tugas |
| `break` | `C:/Users/Indrimeilla-PC/.omp/agent/ecosystem/capabilities/jakubkrehel-skills-72bdd6121cd595f47fd21c9f23e374028c9cbacd/skills/break` | eksplisit upstream |
| `explain-interface` | `C:/Users/Indrimeilla-PC/.omp/agent/ecosystem/capabilities/jakubkrehel-skills-72bdd6121cd595f47fd21c9f23e374028c9cbacd/skills/explain-interface` | eksplisit upstream |
| `interface-review` | `C:/Users/Indrimeilla-PC/.omp/agent/ecosystem/capabilities/jakubkrehel-skills-72bdd6121cd595f47fd21c9f23e374028c9cbacd/skills/interface-review` | eksplisit upstream |
| `state-machine` | `C:/Users/Indrimeilla-PC/.omp/agent/ecosystem/capabilities/jakubkrehel-skills-72bdd6121cd595f47fd21c9f23e374028c9cbacd/skills/state-machine` | eksplisit upstream |
| `teardown` | `C:/Users/Indrimeilla-PC/.omp/agent/ecosystem/capabilities/jakubkrehel-skills-72bdd6121cd595f47fd21c9f23e374028c9cbacd/skills/teardown` | rute sempit berdasarkan tugas |
| `variant` | `C:/Users/Indrimeilla-PC/.omp/agent/ecosystem/capabilities/jakubkrehel-skills-72bdd6121cd595f47fd21c9f23e374028c9cbacd/skills/variant` | eksplisit upstream |
| `unslop` | `C:/Users/Indrimeilla-PC/.omp/agent/ecosystem/capabilities/heydamir-unslop-97daa3eb365670ea3f87ed85356cbfcee18105a5/skills/unslop` | eksplisit pilihan alternatif |

**Jangan daftarkan:** `landing-page-design`, `figma-designer`, `build-design`, `afk`. Tiga pertama tetap ada di capability untuk guidance original; `afk` hanya dalam original source. Seluruh `disable-model-invocation: true` upstream tetap utuh. Kebijakan eksplisit tambahan untuk `unslop` dan `better-ui` ditentukan oleh pilihan ini, bukan diklaim flag upstream.

## Batas host, script dan risiko

- Anatomy publish.mjs/session.mjs dapat membaca log ~/.claude/projects dan menyalin prompt/time/tokens; submit menggunakan gh/git. Tetap inert: tidak jalankan publishing, session capture, screenshots atau telemetry.
- Anatomy capture/drive memulai Chrome dengan file-access, unsafe SwiftShader; linux no-sandbox. Gunakan hanya trusted local pages pada pekerjaan terotorisasi berikutnya. Tier waktu dan jumlah part upstream adalah opini, bukan janji latency OMP.
- Diagram onboarding/profile dapat menulis installed style-guide.md atau ~/.diagram-design/profiles. Pin harus tetap immutable: jangan jalankan onboarding/edit vendor; salin pedoman ke proyek/approved local profile bila kelak diminta. Font Google adalah request eksternal; pilih documented system-font mode untuk offline.
- Unslop snapshot mengeksekusi halaman dan mengambil CSS/images/fonts; story memulai loopback server, membutuhkan Playwright+ffmpeg, menimpa output serta membersihkan folder frame. Tidak dijalankan; fitur video/snapshot bukan otomatis diizinkan oleh registrasi skill.
- Unslop estetika ketat (larangan gradients, Lucide default, copy mock realistis dan slot kosong tanpa image tool) dapat konflik antislop. Pilihan user/aturan honesty/a11y induk tetap prioritas; jangan fabrikasi data atau ship slot kosong sebagai selesai.
- Jakub better-ui exact easing/scale, typography punctuation dan helper harness kontras harus tunduk aturan induk dan convention proyek. Satu pemilik tahap; jangan tumpuk Impeccable/Emil/GSAP dan suite ini sebagai mandatory sekaligus.
- Jakub teardown scripts/commands.cjs memakai which dan path macOS/Linux, tidak mencari chrome.exe. Script model/proof mengeksekusi JS lokal. Tidak ada adapter Windows/OMP dibuat; browser checks belum terbukti.
- Elaya Figma memerlukan skill/API eksternal yang tidak tersedia; desain screenshot tidak membuktikan akses MCP. Landing-page skill terlalu luas dan template wajib tidak cocok default.
- build-design original menyuruh memulihkan pelanggaran contrast/focus demi fidelity; hanya staged, tidak didaftarkan. afk mengizinkan perluasan scope/akses services; hanya source.

### Anatomy bukan runtime-only

Repo menyediakan `SKILL.md` original MIT dengan compatibility Claude Code dan beberapa host lain, plus kit dan CLI lokal. Tidak ada klaim upstream OMP yang dibuat. Model/kit dapat menjadi sumber implementasi nanti; itu bukan izin menjalankan browser, membaca sesi Claude atau publikasi. `SECURITY.md:5` mengonfirmasi file-access Chrome dan arbitrary expression pada drive. `scripts/publish.mjs:209–225,273–310` menunjukkan pembacaan sesi dan alur GitHub; `session.mjs:34–50,64–100` menunjukkan sumber JSONL dan perhitungan tokens. Semua tetap inert.

### Konflik kualitas yang disengaja tidak diaktifkan

- Elaya landing-page memaksa struktur tiga langkah, proof, FAQ dan tagline animation, serta deskripsi yang mencakup semua UI. Sumber utuh disimpan untuk referensi, bukan pemilik default. Kredit MIT Leonxlnx yang tertanam di akhir SKILL dipertahankan.
- Elaya Figma bergantung official skills/API eksternal yang tidak disediakan repo; Foundations/token binding bernilai sebagai guidance, bukan kapabilitas teruji.
- `build-design/SKILL.md:12,79–81` mengutamakan desain sekalipun contrast/focus dilanggar; tidak diaktifkan.
- `afk/SKILL.md:13–21,63–95` meminta eksplorasi lama dan semua connected sources, di luar tugas terfokus ini. Tidak disalin ke capability.

## Checksums dan bukti yang diserahkan

- `design-candidates.json` berisi setiap SHA pin, URL commit/SKILL/LICENSE, SHA-256 SKILL dan LICENSE, checksum 580 supporting files, tree hash, register roots, risiko dan positive/near-miss routing per skill.
- `staged_files[].sha256` dihitung dari byte original ketika staging sebagai expected-copy inventory. Ini **bukan** klaim parent telah memverifikasi byte tujuan. Tree hash adalah SHA-256 dari daftar terurut path: `<sha256>  <relative-path>\n`.
- ZIP diunduh dari codeload menggunakan SHA, kemudian diekstrak sebagai sumber; archive SHA dicatat dari byte unduhan, ZIP tidak dipersist. Tidak ada script unduhan dijalankan.
- Penelusuran `find` incumbent gagal karena backend judge ditolak; dipulihkan dengan grep langsung. Perbandingan Impeccable berdasarkan `reference/typeset.md`, temuan `colorize.md` dan inventory/pin baseline, bukan mengasumsikan semua fitur incumbent tidak ada.

## Handoff integrasi dan fallback tool

Parent memilih `unslop` dan `better-ui` otomatis dengan guard domain sempit dan satu lead. Label eksplisit tambahan di atas hanya rekomendasi worker, bukan flag vendor; pilihan parent mengatasinya tanpa mengubah original. Lima flag upstream eksplisit pada registered roots tetap wajib: `interface-review`, `explain-interface`, `break`, `state-machine`, `variant`.

**Exact support Anatomy terkait publikasi/sesi**, relatif terhadap capability root: `references/publish.md`, `scripts/publish.mjs`, `scripts/session.mjs`, `scripts/fingerprint.mjs`, `scripts/publish.test.mjs`, `scripts/session.test.mjs`. `publish.mjs` mengimpor session/fingerprint, menjalankan build pilihan, opsional `scripts/capture.mjs`, menulis prompt/metadata ke `figure.json`; `--submit` dapat commit/push/PR melalui gh/git. Tests publish/session juga mengimpor modul terkait dan bukan cek provenance aman untuk dijalankan. Kit/render biasa tidak membutuhkan alur publikasi atau log sesi. Semua tetap inert; opsi upstream `--no-session` bukan izin menjalankan publikasi.

Fallback yang jujur:

- **Browser tidak tersedia:** Anatomy/diagram-design/teardown hanya menyerahkan panduan atau source yang dapat diedit, tanpa klaim render/interaksi/PNG/PDF terverifikasi. Anatomy helpers memerlukan Chrome, diagram `export_png.py` memerlukan Playwright, dan discovery teardown berbasis `which` tidak menemukan Chrome Windows native.
- **Penjelasan interface tanpa browser:** `explain-interface/no-browser.md` menyediakan jalur fetched HTML/CSS; authored CSS bukan computed style. Canvas/WebGL, runtime motion dan paint order yang tidak terlihat tetap tidak terbukti. Screenshot hanya rekonstruksi berlabel inference.
- **Harness tanpa browser:** `break`, `state-machine`, `variant` menyerahkan URL/source dan daftar scenario/state/variant, tanpa findings teramati palsu atau klaim console/interaksi bersih.
- **Unslop tanpa browser/Playwright/image tool:** audit source terbatas, bukan snapshot/story teruji. Prompt gambar dapat diserahkan terpisah; jangan membuat paid call, memasang MCP atau mengklaim slot kosong sebagai deliverable lengkap.
- **Figma tool/companion skill hilang:** `figma-designer` tetap guidance staged-only. Export/screenshot hanya menjadi jalur gambar bila diotorisasi, dengan ukuran estimasi; jangan mengaku mengedit Figma atau membaca exact token. `build-design` tetap tidak diaktifkan karena konflik a11y.

`customDirectories` dengan exact skill paths belum diverifikasi native OMP oleh worker. Parent memegang verifikasi integrasi itu; manifest tidak membuktikan dukungan host.

## Verifikasi yang harus dijalankan parent

- Bandingkan setiap staged file terhadap staged_files expected SHA-256 dan sumber pin; cek semua relative references tetap ada.
- Integrasikan register_roots satu per skill, bukan capability repo root rekursif; do_not_register tetap tidak aktif. Pertahankan explicit-only flags upstream dan policy alternatif.
- Gunakan positive_route_id/near_miss_id untuk cek routing tanpa menjalankan vendor code; bedakan state-machine gallery dari diagram state, teardown dari audit/code reverse-engineering, break dari break-ui.
- Jangan jalankan build/test/vendor installer, screenshots, publish/session atau menambah MCP saat verifikasi provenance. Tidak ada klaim kualitas render atau dukungan native OMP yang sudah diuji.

Tidak diuji: rendering, runtime browser, helper CLI, Figma MCP, performa maupun dukungan native OMP. Risiko utama: helper capture/publish memiliki akses proses/file/network dan tetap dilarang berjalan hanya karena skill diregistrasi.
