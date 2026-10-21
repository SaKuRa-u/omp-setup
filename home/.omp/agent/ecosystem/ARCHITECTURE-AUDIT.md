# Audit dan finalisasi arsitektur OMP

Tanggal audit fondasi: 2026-10-15. Bagian fondasi di bawah adalah snapshot historis, bukan inventaris terbaru. Pembaruan 2026-10-19 dicatat terlebih dahulu dan dibuktikan di measurements/review-security-20261019.json. Checklist selesai bukan bukti eksekusi; inspeksi source tidak sama dengan eksploitasi teruji.

## Pembaruan global 2026-10-19

OMP aktual 18.12.2; host tidak di-upgrade oleh pekerjaan ini. Plugin Ponytail 5.3.2 dipasang pada scope pengguna dari katalog upstream asli pada source commit 09c434ab73ca43761c5d8b0c5d341926c2fba710; marketplace auto-update dimatikan. Enam skill dan ekstensi Pi/OMP tidak diubah. Seluruh skill Cloudflare pada c1c8a8c1471069fb0e188eeaff69b8e8db6564a8 beserta lisensi MIT dipasang OMP-only: 21 berkas, 315748 byte, cocok dengan source.

CLI Semgrep 1.181.0 resmi dipasang pada venv OMP dengan 67 distribusi binary-only, exact URL dan hash lock. MCP stdio mengekspos tepat tiga tool: bahasa, AST dan custom-rule scan. Tracing/metrics/version check/token/elicitation dinonaktifkan, state terisolasi; default/cloud/remote/supply-chain/schema tools dimatikan. Metadata OAuth publik tetap diambil saat startup. Tidak membuat server/skill/launcher pengganti, tidak login/upload source ke layanan cloud, dan tidak mengubah integrasi Context7/REA/DPAPI/memory-off.

Verifikasi aktual: 52 skill ditemukan, seluruh target health-check dapat di-resolve; Context7/REA/Semgrep dimount; 18 tes ekstensi upstream lulus; command mode RPC lulus; satu core ruleset full teramati pada turn nyata. Review umum otomatis membaca ponytail-review, pertanyaan authorization membaca security-audit, dan Q&A biasa tidak membaca skill review/audit atau memanggil scanner. MCP Semgrep menemukan fixture positif pada baris yang benar dan tidak menandai kontrol negatif, tanpa menjalankan kode target.

Batas yang tetap: full Cloudflare audit belum dijalankan; flag OS validator absen pada Node Windows dan sandbox/promosi artefak aman belum tersedia. Alias Ponytail berfungsi pada RPC, tetapi headless print alias dapat berhenti tanpa pekerjaan; /skill:ponytail-review diuji sebagai jalur resmi headless. Warning dependency Pydantic lifespan tetap terlihat; tidak disembunyikan. Band/board OMP, pewarisan persona subagent, AST result, isolasi adversarial dan zero-egress belum dibuktikan. Startup RPC dengan barrier MCP penuh teramati 22,494 detik pada satu run, bukan benchmark overhead kausal.

Routing global memilih owner sesuai tugas, bukan menjalankan semua reviewer. Pedoman upstream tetap asli; skill relevan otomatis dimuat, sedangkan audit penuh, cloud auth, paid jobs dan operasi berisiko tetap melalui permission gates. Backup terpilih: backups/review-security-20261019/. Rollback awal adalah disable komponen OMP yang ditambah dan mulai sesi baru; jangan jalankan cleanup vendor lintas host.

## Snapshot audit fondasi 2026-10-15


## Keputusan kesiapan

**Siap untuk pekerjaan coding berbantuan skill, dokumentasi Context7 MCP, alur desain Impeccable yang dibatasi, dan memory cloud manual pada proyek yang diizinkan. Belum dapat disebut sandbox aman untuk kode tak dipercaya atau workstation infrastruktur lengkap.**

Tidak ada apply, destroy, cluster/firewall workstation, Packer build, audit Cloudflare penuh, pembelian paket, instant dreaming, penghapusan memory, atau instalasi tool infrastruktur pada finalisasi ini. Preferensi `yolo` pengguna dipertahankan; ini bukan isolasi OS.

## Keadaan aktual dan bukti

| Area | Hasil aktual | Bukti dan batas |
|---|---|---|
| OMP | 18.11.0; sesuai rilis resmi terbaru yang dibaca saat audit | RPC startup nyata; bukan klaim semua fitur OMP diuji |
| Skills | 38 ditemukan; 34 skill target diaudit dapat di-resolve melalui OMP read | measurements/discovery-audit.json; 32 upstream/domain + 4 bawaan sebelumnya + 2 integrasi lokal |
| HashiCorp | Semua 20 paket terpasang global, provenance dan 98 file diinventaris | measurements/hashicorp-audit.json dan hashicorp-smoke.json; 20 tree pin cocok, 98 snapshot SHA-256 konsisten; bukan cloud runtime certification |
| Impeccable | Global, versi skill 4.5.2; owner desain tunggal dalam OMP | measurements/impeccable-audit.json; launcher engine dan vendor hook tidak dijalankan |
| Gate desain | Helper read-only, dipanggil oleh workflow di awal proyek UI terpilih | Enam skenario lulus: empty, existing, partial, ready, source drift, dokumen tanpa approval; bukan visual pass |
| Context7 | MCP aktif melalui konfigurasi user OMP dan launcher DPAPI terpin 4.4.1 | Fresh OMP process melakukan resolve lalu query; hasil API dan source Node.js nyata; measurements/context7-omp-smoke.json |
| Supermemory | Cloud v5, dokumen serta dynamic dreaming done; koreksi green direcall tanpa stale blue | measurements/memory-audit.json; recall dari proses berbeda; berhenti pada forget-preview |
| Native memory | memory.backend tetap off | Mnemopi lokal hanya artefak comparator, bukan staging atau fallback produksi |
| Secret | DPAPI CurrentUser; launcher membaca key tanpa ekspor environment global | Jalur API nyata digunakan; nilai key tidak dicetak. Kuota/saldo akun tidak diperiksa |
| Runtime checks | 36 pemeriksaan offline lulus, TypeScript 5.9.3 noEmit lulus | Filter secret, scope, approval negatif, kegagalan loopback, redaksi dan regresi input; bukan simulasi outage vendor terautentikasi |
| Dependency advisories | npm audit --omit=dev: 0 advisori dilaporkan | measurements/dependency-audit.json; bukan jaminan tidak ada kerentanan |

## Arsitektur operasional

- OMP memuat metadata skills saat startup, lalu isi skill melalui `skill://` ketika relevan. Skill bukan proses background atau permission baru.
- `~/.omp/agent/AGENTS.md` menentukan satu owner per tugas; rules ini kebijakan agen, bukan mekanisme enforcement OS.
- Impeccable membaca konteks proyek dan playbook melalui tool OMP. `runtime/design-gate.mjs` tidak mengimpor kode proyek, membuat subprocess, mengunduh engine, memasang hook, atau menulis proyek.
- Context7: `~/.omp/agent/mcp.json` → Node lokal → `runtime/context7-mcp.ts` → paket stdio terpin. Hanya dua tool publik, request bounded, `instructions:false`, key dari DPAPI. CLI disimpan untuk diagnosis/rollback, bukan jalur aktif kedua.
- Memory: `supermemory-v5` → wrapper `runtime/memory.ts` → DPAPI → SDK 5.0.2 → namespace cloud. Tidak melalui database lokal. Hanya root Onboarding dipetakan ke `omp_onboarding`; recall proyek mengakses proyek dan `omp_global` terpisah. Mutasi global tetap ditutup dan proyek lain ditolak sampai dipetakan.
- Pembelajaran lintas sesi berarti fakta/keputusan direcall sebagai konteks, **bukan perubahan bobot model**. Tidak ada auto-retain seluruh percakapan atau hook akhir sesi yang dijamin.

## Perbaikan yang diterapkan

1. Mengaktifkan konfigurasi MCP Context7 yang sebelumnya tidak ada, setelah acceptance CLI/MCP aktual. Membetulkan skill agar tidak lagi menyuruh memilih route yang belum aktif. Context7 tidak memerlukan namespace Supermemory.
2. Memperbaiki validator query Context7: whitelist tanda baca menolak pertanyaan API publik dengan titik koma. Diganti pemeriksaan karakter kontrol sambil mempertahankan batas panjang, filter credential dan penolakan konteks privat/path/URL. Query masuk sebagai argumen shell-free, bukan shell source. Bug direproduksi sebelum perbaikan; query publik bertanda baca dan timeout 1 ms diuji sesudahnya.
3. Mengembalikan exclusion dua desain pesaing yang hilang dari konfigurasi OMP. Salinan alat lain tidak dihapus atau diubah.
4. Membatasi Impeccable ke workflow OMP tanpa bootstrap engine. Launcher upstream dapat mengeksekusi kandidat executable, mengunduh binary, dan menulis cache di luar proyek; checksum dari origin sama bukan pembuktian trust independen. Native OMP hook tidak diasumsikan kompatibel.
5. Menambahkan deteksi gate proyek baru/lama. Dokumen present tidak otomatis ready; approval/hash konteks juga tidak otomatis berarti kualitas UI lulus. Dokumen dan referensi pengguna dipertahankan, tidak dikarang untuk menghijaukan gate.
6. Menyelesaikan audit semua 20 HashiCorp skills dan 9 koreksi dalam 8 skills: constructor ephemeral, redaksi error credentials, build Windows, Git module version, path/CRLF helper Bash, installer policy usang, klaim free HCP, dan contoh listener WinRM HTTPS. Dua modifikasi terraform-test yang sudah ada dipertahankan. Rincian perubahan/batas tersedia dalam audit JSON; contoh cloud belum dieksekusi.
7. Memperbarui mapping memory Onboarding yang sebelumnya kosong; menguji fail-closed untuk cwd lain. Capture tetap per fakta terverifikasi, tidak otomatis mentranskrip sesi.
8. Memperbaiki path ledger yang salah eja, memasukkan 20 HashiCorp + Impeccable, memisahkan verification historis dari bukti kini, dan menandai WAVE1.md sebagai laporan historis.
9. Memperluas health-check discovery agar memeriksa Impeccable, dua integrasi lokal, semua 20 HashiCorp dan exclusion desain, bukan hanya 11 skill awal.

## Skills, lisensi dan biaya

HashiCorp source commit: `f706481af9b8fedb66de909f6243ad29601afa0c`; Impeccable: `abf5779cabc20147fd9c013fa4705088c200bf8a`. Pin upstream dibedakan dari hash lokal setelah adaptasi. Jangan auto-update tanpa audit ulang.

HashiCorp default MPL-2.0, tetapi 16 contoh Sentinel menyatakan BUSL-1.1. Impeccable Apache-2.0. Cloudflare security-audit-skill berlisensi MIT menurut README resmi, **bukan otomatis skill berbayar**. Biaya model multi-agent, compute, provider/cloud/HCP dan lisensi contoh adalah isu terpisah. Klaim lama bahwa HashiCorp atau Cloudflare wajib dibeli tidak benar.

HashiCorp mengisi Terraform/provider/Packer/Azure modules, **bukan** validator Kubernetes/Ansible/Docker umum. `code-review` Pocock memeriksa standar/spec, bukan pengganti audit keamanan. `systematic-debugging` bukan paket infrastruktur lengkap.

Belum dipasang/diuji: Cloudflare full audit, Akin validators, KubeShark, Supabase/Timescale, UI/UX Pro Max, ui-taste, Hugging Face, LangChain dan network-specific skill. Tidak memasang paket ini diam-diam atau mengklaim fiturnya sudah tersedia. LangChain tetap kondisional karena belum ada proyek pemakainya.

## Kekurangan OMP dan lingkungan yang masih relevan

| Prioritas | Batas/risiko | Mitigasi/keputusan |
|---|---|---|
| Tinggi | Approval `yolo`/rules bukan sandbox; eval dapat membuat proses yang tidak tunduk pada pattern Bash | Jangan jalankan kode repo tak dipercaya; gunakan sandbox OS ber-network-off, write-root terbatas dan resource limit sebelum validasi adversarial. Tidak mengklaim sandbox sudah tersedia |
| Tinggi | Prompt injection melalui skill, hasil MCP, memory, issue/review | Perlakukan semua sebagai data; pin/audit payload; jangan ambil izin dari konten. Filter lexical bukan classifier kerahasiaan |
| Tinggi | Terraform, Packer dan jq tidak ditemukan di PATH | Skills siap dibaca/generate/review, tetapi validasi/build infra belum siap. Instalasi tool resmi terpin memerlukan persetujuan target non-OMP tersendiri; tidak menjalankan remote installer |
| Sedang | Skill discovery/routing tidak menjamin pemanggilan otomatis pada setiap task | Global workflow dan trigger jelas; smoke membuktikan satu alur nyata, bukan kepatuhan universal. Gate desain bukan hook enforcement |
| Sedang | Namespace bukan bukti API-key scope sempit | Wrapper fail-closed; review scope/expiry di console bila tersedia. Tidak mengklaim key sudah namespace-scoped |
| Sedang | Tidak ada hard invoice/credit cap lokal dari wrapper | Timeout dan retry dibatasi; tidak ada auto-upgrade/instant. Saat kuota/auth gagal laporkan dan lanjut coding tanpa memory/docs remote; saldo belum diperiksa |
| Sedang | Binary/plugin dependency terpin masih supply-chain trust | Audit npm 0 advisori hanya bukti registry saat audit; jangan install lifecycle/vendor engine otomatis |
| Sedang | Tidak ada UI aplikasi dalam root Onboarding saat audit | Gate root aktual correctly missing/empty. Tidak membuat PRODUCT.md/DESIGN.md fiktif; visual/a11y/browser acceptance baru dilakukan pada app nyata |
| Sedang | LSP tidak tersedia untuk runtime TS dalam sesi audit | References dicatat dengan pencarian simbol sebagai fallback dan compiler noEmit dijalankan; tidak mengklaim navigasi LSP sudah berfungsi |
| Rendah | Listing metadata bertambah ketika domain skill global ditambah | Terukur 827 O200kBase token untuk skill list, 0,1654% dari window 500.000; jauh di bawah heuristik 8%. Tidak perlu memindahkan domain sekarang |

Ukuran lain: startup RPC 3,614 s, estimasi konteks 9.601 token. Descriptor Context7 MCP 1.131 O200kBase token terpisah; MCP dipilih untuk discoverability/typed tools, bukan paling hemat token. Ini observasi tunggal, bukan benchmark kausal atau ukuran keseluruhan biaya provider. Perbandingan CLI/MCP ada di measurements/context7-audit.json.

## Acceptance dan batas nyata

Perintah yang benar-benar dijalankan:

- `node runtime/measure-foundation.mjs`: 38 ditemukan, seluruh 34 target di-resolve, routing global termuat, exclusion pesaing lolos.
- `node runtime/context7-acceptance.ts --live --route both`: dua route lulus resolve/query/missing-library dan stdio MCP.
- Sesi OMP baru: read skill → resolve Node.js → query via mounted MCP; jawaban bersumber dari https://nodejs.org/docs/latest-v24.x/api/fs.json. Tidak mengklaim API Node.js runtime diuji oleh lookup ini.
- Query regresi publik bertanda baca lulus; timeout 1 ms menghasilkan `timeout-or-output-limit` bersih.
- `bun runtime/offline-smoke.ts`: 36 checks. TypeScript noEmit untuk seluruh sepuluh file runtime TS: exit 0.
- `npm audit --omit=dev --json`: exit 0, total advisori 0.
- 20 HashiCorp/98 file snapshot cocok; Git Bash native `-n` helper LF-only: exit 0. Bare `bash` dari PATH tidak dapat memakai path Windows; pemeriksaan sukses memakai `C:/Program Files/Git/bin/bash.exe` eksplisit.
- Gate desain: enam fixture disposable; dokumen/source tidak berubah saat detection. Fixture dibersihkan. Root Onboarding aktual: exit 1, empty/missing, sesuai kenyataan, bukan kegagalan installer.
- Supermemory: corrected fresh-process recall, done/dreaming done, global isolation, preview exact IDs. Satu percobaan preview sempat gagal dengan error bersih; preview berikutnya berhasil, penyebab kegagalan pertama tidak ditetapkan. Tidak disembunyikan sebagai passing pertama.

Tidak diuji: apply/build cloud, provider acceptance, penghapusan cloud, seluruh command engine Impeccable, real visual/a11y pass, full security audit, isolasi OS. Tidak membuat klaim aman absolut atau seluruh domain lengkap.

## Gate penghapusan memory yang masih menunggu manusia

Uji berhenti tanpa penghapusan. Manifest lokal: `measurements/audit-forget-1792063760310.json`.

- Action: forget; namespace: `omp_selftest`.
- Exact ID: `gb6pz5tqKCjwXsVhyHGHDs`.
- Arti kandidat: label green untuk satu sampel sintetis acceptance, bukan preferensi/proyek pengguna.
- Digest: `551ce4f23d46fd68bb148a97021ff50db3c0d64dc4b76d2f47a2f6b58eebca8b`.

Tidak ada approval receipt yang dikarang. Manifest/receipt berlaku 24 jam. Permanent source delete memerlukan preview dan persetujuan terpisah. Sisa data uji ini bukan blocker untuk coding dan tidak boleh dihapus hanya demi klaim selesai.

## Penggunaan dan rollback

Buka sesi OMP baru, atau `/mcp reload` pada sesi interaktif lama agar konfigurasi baru dimuat. Gunakan `/skill:impeccable` untuk desain dan `/skill:terraform-style-guide` untuk Terraform; atau minta tugas dalam bahasa biasa agar agen memilih skill relevan. Skill bukan `--tools` CLI. `--instruction` bukan flag OMP yang valid.

Helper gate: `node C:/Users/Indrimeilla-PC/.omp/agent/ecosystem/runtime/design-gate.mjs --project <root-proyek-yang-dipilih>`.

Memory: gunakan workflow `supermemory-v5`; proyek di luar mapping jangan dipaksa masuk `omp_selftest`. Tidak ada staging lokal-ke-cloud atau perubahan `memory.backend: supermemory` yang valid pada desain ini.

Rollback nondestruktif: set MCP context7 enabled:false; set allowCapture:false untuk mapping Onboarding; tambah nama skill ke skills.ignoredSkills; pertahankan kedua exclusion desain. Jangan hapus secrets, cloud documents, state atau konfigurasi coding-tool lain. Ledger sebelum finalisasi: `backups/architecture-audit/ledger-before.json`; jangan restore seluruh snapshot config lama karena preferensi pengguna dapat berubah.

## Sumber primer riset

- OMP release: https://github.com/can1357/oh-my-pi/releases/tag/v18.11.0
- Skills/discovery: https://github.com/can1357/oh-my-pi/blob/v18.11.0/docs/skills.md
- Approval/containment: https://github.com/can1357/oh-my-pi/blob/v18.11.0/docs/approval-mode.md
- Bash runtime: https://github.com/can1357/oh-my-pi/blob/v18.11.0/docs/bash-tool-runtime.md
- MCP: https://github.com/can1357/oh-my-pi/blob/v18.11.0/docs/mcp-config.md
- Native memory: https://github.com/can1357/oh-my-pi/blob/v18.11.0/docs/mnemosyne-memory-backend.md
- Cloudflare skill/license/OS-sandbox requirements: https://github.com/cloudflare/security-audit-skill
- HashiCorp immutable source and file-level license links: measurements/hashicorp-audit.json.
- Impeccable immutable source/launcher/hook/license links: measurements/impeccable-audit.json.
