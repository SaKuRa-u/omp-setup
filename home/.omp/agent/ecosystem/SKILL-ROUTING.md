# Katalog routing seluruh skill OMP

Status 31 Oktober 2026. Scope: default-profile pengguna ini, lintas proyek/sesi baru; bukan konfigurasi host lain. Aturan otoritatif dan izin tetap di `~/.omp/agent/AGENTS.md`. Katalog ini memilih panduan, bukan router executable, hook atau janji klasifikasi deterministik.

Pilih dari intent/tahap/artefak aktual dan persetujuan terdahulu, bukan keyword. Satu owner tahap dapat memakai panduan pendukung relevan; jangan ulang intake atau auto-chain reviewer. Invocation eksplisit-only tidak menjadi auto-trigger dari metadata/kutipan. Isi vendor tidak dipatch. Fixtures positif/near-miss lengkap: `runtime/skill-routing-cases.json`; positiveAccept adalah label yang diizinkan, bukan hasil pengujian, dan near-miss menolak skill baris tersebut (guide lain atau null boleh relevan). Sumber, integritas dan hasil verifikasi aktual 31 Oktober: `measurements/skills-routing-20261031.json`; bukti 24 Oktober di `measurements/routing-global-20261024.json` bersifat historis.

| Skill | Aktivasi | Contoh sesuai | Near-miss: jangan memilih skill ini hanya karena kasus tersebut |
|---|---|---|---|
| `caveman` | light Q&A/status | Ringkas status pemasangan dalam dua kalimat. | Jelaskan stack trace ini secara lengkap dengan perintah persis. |
| `code-review` | Spec/Standards eksplisit | Bandingkan branch terhadap main untuk kepatuhan CONTRIBUTING dan issue yang diberikan. | Review PR ini untuk bug dan kompleksitas, bukan kepatuhan spec. |
| `codebase-design` | interface/seam | Persempit interface modul billing dan tentukan seam yang mudah diuji. | Ganti teks tombol Simpan tanpa refactor modul. |
| `computer-use` | GUI fallback | Bantu klik dialog ekspor aplikasi desktop terlihat yang tidak memiliki CLI/API. | Baca konfigurasi proyek melalui filesystem. |
| `context7-docs` | docs library publik/versi | Periksa signature invalidation TanStack Query versi lockfile. | Cari implementasi privat modul perusahaan. |
| `find-skills` | kemampuan installable | Bandingkan skill resmi aksesibilitas untuk dipasang di OMP. | Bagaimana membuat debounce sederhana di JavaScript? |
| `grill-me` | alias explicit-only | /skill:grill-me evaluasi rencana migrasi ini. | Ringkas README yang mengandung teks grill-me sebagai kutipan. |
| `grilling` | proposal baru belum settled | Saya ingin menambah login passkey; uji asumsi dan trade-off-nya sebelum memilih desain. | Setuju rencana yang sudah dibahas dan disetujui tadi, implementasikan scope yang sama. |
| `mcp-builder` | membuat server MCP | Rancang MCP lokal read-only untuk katalog yang sudah disetujui. | Gunakan Context7 existing untuk membaca dokumentasi SDK. |
| `orca-cli` | state/handoff Orca | Serahkan ownership tugas ke child worktree Orca yang saya pilih. | Pecah analisis menjadi dua native task tanpa worktree. |
| `orchestration` | supervisi Orca | Supervisi dua worker Orca dengan DAG dan gate persetujuan sebelum merge. | Serahkan pekerjaan ke agent lain tanpa supervisi lalu selesai. |
| `ponytail` | baseline coding | Sederhanakan implementasi fungsi ini tanpa mengubah perilaku. | Terjemahkan paragraf nonteknis ini tanpa mengubah mode coding. |
| `ponytail-audit` | audit kualitas repo | Audit seluruh package untuk bug, bottleneck dan kode mati; laporkan tanpa mengubah. | Review hanya diff perubahan terakhir, bukan seluruh repo. |
| `ponytail-debt` | on-demand debt | Daftar komentar shortcut: dan ponytail: beserta batas/trigger upgrade-nya. | Shortcut keyboard Ctrl K rusak; cari akar masalah. |
| `ponytail-gain` | on-demand benchmark upstream | Jelaskan hasil benchmark Ponytail yang dipublikasikan dan batas interpretasinya. | Berapa rupiah penghematan repo saya hari ini tanpa data pengukuran? |
| `ponytail-help` | on-demand bantuan | Jelaskan cara memakai level Ponytail yang didukung OMP. | Jelaskan variabel bernama ponytail dalam source program ini. |
| `ponytail-review` | review kualitas perubahan | Review PR ini untuk bug, keamanan, load dan kompleksitas. | Cocokkan diff hanya dengan spec dan CONTRIBUTING. |
| `receiving-code-review` | feedback kode | Reviewer PR meminta menghapus validasi ini; periksa klaimnya sebelum diterapkan. | Saya menerima komentar reviewer jurnal dan butuh roadmap revisi manuskrip. |
| `reverse-engineer-anything` | shipped artifact/runtime | Bandingkan dua ASAR lokal untuk menjelaskan perubahan perilaku. | Jelaskan arsitektur repository source lengkap yang tersedia. |
| `security-audit` | guidance/full terpisah | Tinjau apakah handler yang diberikan membocorkan data lintas tenant, source-only. | Audit routing skill dan kualitas dokumentasinya, bukan audit keamanan. |
| `skill-creator` | buat/evaluasi skill | Evaluasi false positive dan near-miss description skill yang saya buat. | Gunakan skill existing untuk memperbaiki query SQL ini. |
| `supermemory-v5` | memory eksplisit/allowlist | Ingat keputusan proyek allowlisted ini memakai PostgreSQL untuk sesi mendatang. | Ingat urutan tiga angka ini hanya selama percakapan sekarang. |
| `systematic-debugging` | failure tak terduga | Login gagal untuk akun kedua; selidiki akar penyebab sebelum memperbaiki. | Test baru sengaja gagal dalam RED pada loop TDD yang disepakati. |
| `tdd` | test-first/integration intent | Implementasikan aturan diskon test-first pada seam yang sudah disetujui. | Baca dan jelaskan test existing tanpa membuat atau menjalankan test. |
| `verification-before-completion` | gate klaim | Sebelum menyatakan bug selesai, verifikasi skenario yang memang diotorisasi. | Jelaskan konsep matematika sederhana tanpa klaim perbaikan kode. |
| `aws-ami-builder` | Packer EC2 AMI | Tulis template Packer amazon-ebs untuk Ubuntu AMI EC2, jangan build. | Tambahkan resource EC2 biasa pada main.tf. |
| `azure-image-builder` | Packer Azure image | Tulis template Packer azure-arm untuk Azure Compute Gallery, source-only. | Buat resource Azure VM di Terraform, bukan image Packer. |
| `azure-verified-modules` | target AVM | Review modul storage Azure terhadap persyaratan Azure Verified Modules. | Tulis konfigurasi Azure biasa tanpa kebutuhan AVM. |
| `new-terraform-provider` | provider Go baru | Mulai workspace provider Terraform Plugin Framework untuk API Acme, scope sudah disetujui. | Tambahkan resource baru pada provider existing. |
| `provider-actions` | Terraform Go Action | Implementasikan Action purge-cache pada provider Terraform Go existing. | Perbaiki workflow GitHub Actions untuk npm test. |
| `provider-configuration` | provider Configure/auth code | Review unknown guards dan fallback kredensial di Configure provider Terraform. | Konfigurasikan React Context provider untuk tema UI. |
| `provider-docs` | docs Terraform provider | Perbarui schema description dan docs Terraform Registry untuk resource baru. | Tulis README aplikasi web umum. |
| `provider-ephemeral-resources` | Open/Renew/Close | Rancang ephemeral resource Go provider untuk token TTL pendek tanpa koneksi live. | Tambahkan input token biasa pada form login web. |
| `provider-framework-migration` | SDKv2 ke Framework | Migrasikan resource Plugin SDKv2 ke Framework sambil menjaga kompatibilitas state. | Pecah konfigurasi .tf menjadi modul reusable. |
| `provider-resources` | CRUD/data source Go | Implementasikan resource widget dan ImportState di provider Terraform Go existing. | Tulis blok resource aws_s3_bucket dalam main.tf pengguna. |
| `provider-test-patterns` | author Go TestAcc | Tulis skenario update dan ImportStateVerify untuk Go TestAcc widget. | Tulis assertions .tftest.hcl untuk output modul. |
| `push-to-registry` | metadata HCP Packer | Tambahkan blok hcp_packer_registry pada template image Packer. | Push image container ke Docker registry. |
| `refactor-module` | ekstraksi modul Terraform | Ekstrak VPC dari Terraform monolitik dengan rencana moved blocks. | Refactor modul JavaScript untuk form UI. |
| `run-acceptance-tests` | run/diagnose Go TestAcc | Diagnosis mengapa TestAccWidget skip padahal dilaporkan pass, dari output yang diberikan. | Rapikan format variables.tf tanpa menjalankan provider acceptance. |
| `terraform-policy` | tfpolicy | Konversi Sentinel encryption menjadi .policy.hcl dan .policytest.hcl. | Tulis kebijakan privasi website dalam Bahasa Indonesia. |
| `terraform-search-import` | Search/list/import | Susun .tfquery.hcl dan draft import untuk bucket unmanaged, jangan hubungi cloud. | Cari string bucket di repository lokal. |
| `terraform-stacks` | HashiCorp Stacks | Review wiring .tfcomponent.hcl dan .tfdeploy.hcl tanpa upload. | Jelaskan stack trace aplikasi React ini. |
| `terraform-style-guide` | Terraform .tf | Rapikan variables.tf dan required_providers sesuai konvensi proyek. | Rapikan Dockerfile multi-stage. |
| `terraform-test` | module tests .tftest | Tulis plan-mode .tftest.hcl memakai mock provider untuk output modul. | Tulis Go TestAcc dengan ImportStateVerify. |
| `windows-builder` | guest Windows Packer | Tulis provisioning Packer Windows AMI via WinRM, tanpa menjalankan build. | Perbaiki PowerShell di laptop Windows saya, bukan guest image. |
| `ansible-automation` | Ansible role/playbook | Review idempotensi role Ansible Windows service secara offline. | Buat AMI EC2 melalui template Packer. |
| `docker-container-builds` | Dockerfile/context | Optimalkan Dockerfile multi-stage dan .dockerignore secara offline. | Perbaiki readinessProbe di Kubernetes Deployment YAML. |
| `kubernetes-manifest-operations` | Kubernetes YAML/CRD | Review selector dan readiness probe pada Deployment yang diberikan, tanpa cluster. | Optimalkan layer cache Dockerfile. |
| `supabase-postgres-best-practices` | Postgres | Review supplied EXPLAIN dan indeks query PostgreSQL, tanpa koneksi database. | Perbaiki query MySQL yang diberikan. |
| `academic-paper` | authoring/revisi akademik | Susun roadmap revisi dari komentar reviewer jurnal; naskah dan tujuan sudah diberikan. | Rapikan 15 DOI menjadi BibTeX saja tanpa mengubah manuskrip. |
| `academic-paper-reviewer` | review manuskrip | Review metodologi manuskrip akademik ini secara advisory, jangan ubah naskah. | Gunakan komentar reviewer untuk merevisi manuskrip saya. |
| `academic-pipeline` | alur akademik lengkap eksplisit | Jalankan workflow akademik lengkap dari riset sampai finalisasi dengan integrity dan review, checkpoint tetap dijaga. | Tulis abstrak paper ini saja. |
| `deep-research` | sintesis akademik | Sintesis literatur akademik intervensi X dan pisahkan bukti yang bertentangan. | Cari signature SDK Stripe versi lockfile. |
| `sr-screener` | eligibility/screening protocol | Buat aturan eligibility screening dari proposal supplied ini; records belum tersedia. | Rancang research question dan strategi pencarian PROSPERO. |
| `citation-management` | bibliographic metadata | Verifikasi metadata 15 DOI dan rapikan BibTeX tanpa mengubah isi manuskrip. | Buktikan klaim terapi dari studi primer, bukan sekadar metadata. |
| `humanizer` | edit prosa diminta | Rapikan paragraf ini agar alami tanpa mengubah angka, ketidakpastian atau sitasi. | Tulis README teknis baru; saya tidak meminta prose-humanization pass. |
| `agency-accessibility-auditor` | support audit WCAG | Audit keyboard, focus dan pengumuman error checkout terhadap WCAG 2.2 AA. | Buat dashboard terlihat lebih premium tanpa audit aksesibilitas. |
| `agency-api-platform-engineer` | support kontrak API | Nilai breaking changes antara dua OpenAPI spec supplied. | Perbaiki satu label tombol pada UI. |
| `agency-api-tester` | support API tests | Tambahkan 401, 403 dan validation failure cases pada suite API existing. | Cek warna dan spacing halaman statis. |
| `agency-brand-guardian` | support brand incumbent | Bandingkan warna dan copy onboarding dengan brand guide yang disetujui. | Buat SQL index untuk query lambat. |
| `agency-database-reliability-engineer` | support recovery/migrasi | Review lock budget dan rollback rencana migrasi PostgreSQL yang diberikan. | Optimalkan satu SELECT dengan supplied query plan, tanpa tugas recovery. |
| `agency-developer-tooling-engineer` | support CLI/DX | Perbaiki kontrak --json, stdout dan exit code CLI existing. | Jalankan npm test existing tanpa perubahan CLI. |
| `agency-document-generator` | file Office/PDF generik | Buat XLSX dari data dummy supplied beserta format dan chart yang diminta. | Jelaskan tabel ini dalam chat tanpa membuat file. |
| `agency-identity-access-engineer` | support OAuth/SSO/session | Review callback OIDC untuk state, nonce, PKCE dan replay. | Ubah warna tombol login tanpa perubahan auth. |
| `agency-internationalization-engineer` | support ICU/RTL/locale | Perbaiki plural Arab dan overflow RTL dengan stack i18n existing. | Terjemahkan satu paragraf biasa tanpa perubahan kode i18n. |
| `agency-payments-billing-engineer` | support PSP/webhook | Review deduplikasi dan recovery webhook Stripe dari kode supplied. | Rapikan tampilan kartu harga tanpa operasi pembayaran. |
| `agency-performance-benchmarker` | support measured benchmark | Susun eksperimen before/after untuk bottleneck memakai trace supplied; jangan load-test live. | Perbaiki salah eja dalam README. |
| `agency-privacy-engineer` | support PII/consent | Petakan aliran PII dari schema dan kode supplied serta cek opt-out analytics. | Alamat email muncul pada contoh dokumentasi; jangan audit data pribadi. |
| `agency-research-synthesist` | support sintesis teknis | Sintesis ADR, vendor docs dan incident reports supplied untuk trade-off queue. | Cari satu signature SDK dari dokumentasi resmi. |
| `agency-secrets-credential-hygiene-engineer` | support credential lifecycle | Review desain CI untuk mencegah secret masuk bundle dan susun runbook rotasi tanpa menjalankannya. | Jelaskan placeholder API_KEY pada docs tanpa mengakses secret. |
| `agency-security-architect` | support threat model | Buat threat model upload dokumen dari diagram dan kode supplied. | Rapikan spacing card tanpa perubahan trust boundary. |
| `agency-technical-writer` | support developer docs | Perbarui README agar cocok dengan flags dan error CLI existing. | Susun abstrak paper akademik sesuai venue. |
| `agency-ux-researcher` | support riset pengguna | Sintesis lima transkrip usability berizin menjadi pain points dengan locator kutipan. | Kritik visual hierarchy dashboard dari screenshot tanpa studi pengguna. |
| `impeccable` | owner arah UI | Perbaiki hierarchy dan ritme visual dashboard existing sesuai brief yang telah disetujui. | Optimalkan backend SQL tanpa perubahan UI. |
| `e2e` | app-check/project runner | Cek aplikasi lokal memakai Playwright suite existing dan data dummy; pertahankan runner. | Jelaskan file test existing tanpa menjalankan aplikasi atau meminta QA. |
| `webapp-testing` | rendered verification | Verifikasi hasil klik Simpan pada aplikasi lokal terpilih, desktop, mobile dan keyboard. | Review source CSS saja; jangan jalankan browser. |
| `vercel-react-best-practices` | React/Next performance | Perbaiki rerender mahal dan waterfall fetching pada proyek React/Next terbukti. | Optimalkan halaman Vue tanpa React/Next. |
| `fixing-metadata` | metadata HTML | Perbaiki canonical, robots dan Open Graph halaman shareable existing. | Ubah judul heading h1 yang terlihat tanpa mengubah metadata HTML. |
| `web-design-guidelines` | review checklist teknis UI | Review kode UI terhadap Web Interface Guidelines Vercel; bukan visual redesign. | Buat konsep art direction baru tanpa meminta compliance review. |
| `animate` | support implementasi motion | Implementasikan transisi drawer sesuai motion thesis dan token yang disetujui. | Review kode animasi existing saja, jangan implementasi. |
| `animation-performance` | support diagnosis jank | Diagnosis drawer yang dropped frames saat navigasi; identifikasi mekanismenya. | Tentukan nama efek gambar yang morph ke detail, tanpa masalah performa. |
| `find-animation-opportunities` | read-only peluang motion | Cari bagian dashboard yang benar-benar terbantu motion; laporkan saja. | Audit semua animasi existing untuk roadmap perbaikan, bukan mencari seam baru. |
| `emil-design-eng` | on-demand craft reference | Gunakan referensi emil-design-eng untuk menjelaskan detail feedback dan polish komponen existing. | Tentukan art direction produk baru; jangan jadikan Emil desainer utama. |
| `review-animations` | explicit-only motion review | /skill:review-animations tinjau interruption, origin dan reduced-motion diff ini. | Review PR backend database tanpa kode motion. |
| `improve-animations` | explicit audit/roadmap | Audit motion seluruh app dan susun prioritas perbaikan; jangan implementasi dulu. | Tambahkan satu transisi tombol sesuai spesifikasi yang sudah disetujui. |
| `animation-vocabulary` | lookup istilah | Apa istilah efek ketika thumbnail berpindah dan berubah menjadi gambar detail? | Implementasikan drawer yang spesifikasinya sudah lengkap. |
| `fixing-accessibility` | support targeted a11y fix | Perbaiki accessible name tombol dan restore focus dialog ini tanpa redesign. | Audit konformansi WCAG seluruh proses checkout beserta screen reader, bukan sekadar fix kecil. |
| `break-ui` | explicit data/state stress | Stress-test komponen anggota memakai nama panjang, empty, one, banyak baris dan fixture dev-only dummy. | Review source-only layout tanpa membuat fixture atau harness. |
| `mobile-native` | support mobile web/PWA | Perbaiki sticky hover, safe area dan viewport keyboard pada mobile web/PWA ini. | Implementasikan gesture pada React Native/Expo, bukan mobile web. |
| `vercel-composition-patterns` | support React component API | Refactor boolean mode props dan state ownership pada komponen React sesuai versi existing. | Rapikan warna tombol Vue tanpa mengubah API komponen. |
| `gsap-core` | support GSAP tween/core | Implementasikan tween GSAP pada widget vanilla existing sesuai spesifikasi yang sudah disetujui; jangan ganti library. | Tambahkan hover sederhana dengan CSS existing; tidak memakai GSAP atau library baru. |
| `gsap-timeline` | support sequence GSAP | Perbaiki labels dan position parameters pada sequence gsap.timeline existing sesuai urutan yang telah disetujui. | Susun timeline milestone proyek dalam tabel; tidak ada kode animasi. |
| `gsap-react` | support lifecycle GSAP React | Perbaiki cleanup useGSAP dan callback contextSafe pada komponen React existing; periksa versi dan SSR boundary. | Perbaiki tween GSAP pada komponen Vue; tidak memakai React. |
| `motion` | support Motion/CSS best-practices | Perbaiki exit dan layout animation Motion pada proyek React yang sudah memakai motion/react, tanpa migrasi atau dependency baru. | Nama efek ini disebut motion blur; jelaskan istilahnya saja tanpa implementasi library Motion. |
| `domain-modeling` | support istilah/domain/ADR | Cocokkan istilah Order dan Booking serta batas domain dari kode dan ADR supplied; laporkan tanpa menulis file. | Periksa DNS domain example.test; tidak ada pemodelan konsep bisnis atau istilah aplikasi. |
| `to-questionnaire` | explicit-only artefak kuesioner | Siapkan kuesioner untuk CTO tentang keputusan integrasi yang belum saya ketahui dari proposal supplied; tampilkan di chat, jangan implementasi atau membuat file. | Lanjutkan implementasi scope yang sudah saya setujui; jangan membuat kuesioner atau mengulang pertanyaan intake. |

## Precedence dan batas tambahan

Review kualitas bahasa alami memakai Ponytail, `/review` eksplisit tetap native, dan code-review hanya Spec/Standards/gate rilis konkret. Metadata/BibTeX saja memakai citation-management; authoring/revisi, evaluasi manuskrip, eligibility screening dan pipeline akademik lengkap tidak saling memicu otomatis. Agency skills adalah support domain, bukan owner kedua; klasifikasi satu guide paling spesifik pada fixture bukan daftar semua support/izin eksekusi.

Untuk motion: Impeccable menentukan arah/thesis/token, Emil/animate membantu keputusan craft, GSAP/Motion membantu mekanisme. CSS/native yang cukup lebih murah; jangan migrasi library/menambah dependency hanya karena membaca skill. `gsap-react` memerlukan React aktual serta pemeriksaan versi/SSR; `contextSafe` merekam objek GSAP, bukan membatalkan async/timer/fetch/listener. Cleanup tiap sumber tetap wajib. Hanya core/timeline/react GSAP dalam tambahan ini: ScrollTrigger/plugin/related skill lain diperiksa lewat docs resmi/Context7 on-demand jika relevan, bukan dianggap terpasang.

Motion memakai best-practices resmi Motion/plain CSS yang self-contained tanpa MCP; fitur search/generation/editor/audit yang perlu server tidak ikut tersedia. Jangan jalankan motion-ai installer, reka tool, akses premium/gated atau audit proaktif. Domain-modeling otomatis untuk tugas istilah/domain/ADR, tetapi read-only tidak menulis; jangan memaksakan GLOSSARY.md/rename/konvensi baru atas incumbent. To-questionnaire tersembunyi dari model sesuai `disable-model-invocation: true`; permintaan nyata menyiapkan kuesioner atau invocation eksplisit saja yang memilihnya, bukan grilling biasa/kutipan. Penerima dan gap informasi mengikuti konteks supplied, bukan intake ulang. Tidak ada body vendor yang diubah.

## Batas pembuktian

Discovery, slash-command registration, URI resolution dan isi prompt dapat diperiksa secara deterministik melalui runtime OMP asli. Penilaian contoh klasifikasi model merupakan smoke sintetis terhingga, bukan pembuktian eksekusi workflow, izin OS, kualitas desain, WCAG, riset ilmiah atau operasi cloud. Tidak ada izin instalasi aplikasi, MCP, hooks, provider, layanan berbayar atau pembacaan secret dari pemilihan skill.
