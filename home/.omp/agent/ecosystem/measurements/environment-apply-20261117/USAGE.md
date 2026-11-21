# Environment OMP — cutover 17 November 2026

Scope: OMP default-profile dan shared tools yang disetujui pengguna; bukan pembaruan OS lengkap atau dependency seluruh proyek. Bukti per komponen: `host/result.json`, `python/result.json`, `research/result.json`, `js/result.json`, `skills/result.json`. Status agregat final dicatat di `summary.json`; jangan menganggap target lulus hanya karena direktori kandidat ada.

Path relatif terhadap `C:/Users/Indrimeilla-PC/.omp/agent/`, kecuali dinyatakan absolut. Pin lama di laporan historis adalah provenance/rollback, bukan route aktif. Gunakan sesi baru setelah cutover; sesi berjalan dapat menyimpan executable, daftar tools dan skill metadata lama.

## Host dan Python

Node24.22.3, Python3.14.10, Bun1.4.4, Git2.56.1.windows.1, gh2.104.0 dan RTK1.2.0 dipasang pada path existing. npm11.19.1 dibawa installer Node. Opsi serta system config Git dipertahankan. Python menyelesaikan installer yang sama setelah parent wait300s habis; log akhir0x0/no-restart, bukan instalasi ulang. Enam interpreter host/venv diuji stdlib SSL/SQLite/zlib/hashlib setelah patch.

- Semgrep: `ecosystem/runtime/semgrep/1.185.0/venv/Scripts/semgrep.exe`; route stdio di `mcp.json` membawa seluruh env isolasi/privacy existing. Untuk CLI, bawa env yang sama dari entry tersebut; jangan menjalankan binary dengan default cloud/telemetry. MCP hanya languages, AST dan custom-rule scan. Warning dependency MCP1.29 tetap terlihat; stdio tidak membuktikan transport lain aman. Initial acceptance harness yang salah meneruskan env dicatat; corrected fresh client membuktikan tepat tiga tools dan synthetic positive/negative scan.
- Graphify: `ecosystem/runtime/graphify/0.9.112/venv/Scripts/python.exe -m graphify`; `GRAPHIFY_NO_AUTO_REFRESH=1`, `GRAPHIFY_BACKEND=none`, home bersih untuk kerja sintetis. Native guidance original beserta delapan referensi agent terpasang. Tidak mengaktifkan hooks/watch/cloud atau helper vendor otomatis. Code-only extraction diuji; traffic tidak diinstrumentasi, bukan bukti zero-egress OS.
- Spec Kit: `ecosystem/runtime/spec-kit/1.4.1/venv/Scripts/specify.exe`; help/version terverifikasi, bukan `init`, bootstrap atau regenerasi project agent config.
- RTK1.2.0 memakai adapter OMP original existing yang byte-identical terhadap tag1.2.0. `rewrite` exit3 adalah advisory yang didukung, bukan gagal. OSS binary saja; tidak mengaktifkan proxy, history mining, trust filter proyek atau telemetry. Recall tetap lossy; recovery mengikuti batas existing.

## JavaScript dan MCP

Context7 MCP4.7.3 tetap melalui `ecosystem/runtime/context7-mcp.ts` dan DPAPI existing, tepat dua tools standar resolve/query. Public version-aware documentation saja; jangan mengirim proprietary code/secrets atau mengaktifkan route CLI kedua. Utility ctx7 diperbarui tetapi bukan transport aktif. Supermemory SDK5.1.2 tetap di balik wrapper `ecosystem/runtime/memory.ts`; scope proyek/global, redaction, dreaming, approval delete/forget dan native memory off tidak berubah. Acceptance SDK bersifat offline, bukan bukti operasi cloud.

REA6.9.0 memakai global executable/script existing dan native skill original62. Shared skill42 dipertahankan untuk host lain dan alias `agents/reverse-engineer-anything` diabaikan hanya di OMP. Node24.22.3 memenuhi prerequisite baru. Gunakan fresh caller/tool schemas dan Evidence6.9 dari sesi baru: record langsung pada `structuredContent`, field `normalized_result`/`evidence_id`, `binary_session` default summary, dan `compare_bundles` menerima absolute `left_bundle_path`/`right_bundle_path` beserta `record_pairs`. Jangan mencampur record/bundle6.5 atau mengarang migrasi saved analysis. Existing artifacts tidak diubah. Handshake255 tools/no-target/fresh empty bundle export/compare lulus; bukan bukti decompiler/provider/native UI/Android atau executable target telah dijalankan. DLL6.5 pada retired npm directory masih dikunci proses lama; jangan paksa kill atau cleanup, restart/reload MCP untuk memakai schema baru.

Modern Web memakai `ecosystem/runtime/modern-web-guidance/1.0.1/modern-web-guidance.cmd`, paired skills dari `package/skills` pada runtime yang sama. Provenance npm mengarah ke sumber resmi GoogleChrome/modern-web-guidance-src `6971ebbec2b127d57aaa24ba63bab7b9de9e656b`, yang menyatakan dirinya sumber distribusi GoogleChrome/modern-web-guidance; bukan substitusi paket bernama sama. Launcher membawa telemetry/file-logging off; gunakan binary pinned, bukan npx latest atau setup/update vendor. CLI skills1.9.0, ctx7 0.12.2 dan TypeScript dev utility7.0.2 diperbarui sebagai utility lokal environment, bukan izin bulk skill installer, provider baru atau migrasi dependency proyek. Root dependency Context7 MCP4.4.1 retained rollback-only, tidak diregistrasikan; bridge aktif memakai isolasi4.7.3.

## Skills dan kontrak E2E

GeneralSkills memperbarui 42 nama existing; 306 pemeriksaan payload/flags lulus dan 566 relative links terselesaikan. Tambahan ARS, editorial, Graphify dan paired JS dicatat pada result slice masing-masing. Tidak memasang nama skill unselected; source/support asli dan lisensi dipertahankan. Impeccable OMP4.9.1 bukan CLI4.9.2: baca `ecosystem/IMPECCABLE-OMP.md`, gunakan fallback manual/native dan jangan menyalakan engine/launcher/download/hooks/live. Stack Diagram0.6.0 helpers hanya disalin, bukan dirender/diuji.

Untuk setup E2E baru yang memang diotorisasi, pin `e2e@0.23.1` bersama `@e2e-dev/web@0.16.0`; engine web mensyaratkan `e2e>=0.23.1 <1`, Node `^22.22.3 || >=24.8.0`. Ini menggantikan pin setup0.21.2/0.15.2, bukan otomatis memigrasikan proyek pengguna. Inspect config/lockfile/runner/data-reset incumbent dahulu. Shape baru `targets[].engine` dan `targets[].app.url/command`, bukan menyalin `baseUrl` generasi lain; browser-typed fixtures diimpor dari `@e2e-dev/web`. Locator ambiguous gagal saat dipakai; `count()`/`isVisible()` adalah snapshot, gunakan matcher/wait state untuk perubahan. Reuse exact locators/assertions, model-free, cache off/retries eksplisit dan `E2E_TELEMETRY_DISABLED=1` sebelum command; jangan mengikuti contoh `agent.*`, provider gateway/login, npx latest, init defaults, global MCP registration atau feedback publication. Tidak ada aplikasi/runner/browser diinstal pada direktori environment ini.

SEO/Understand memerlukan support di luar subtree skill. Resolve `CLAUDE_PLUGIN_ROOT`, `../seo`, agents/scripts/schema terhadap full pinned source yang ditunjuk `skills/result.json` → `usageBoundaries`, bukan cwd proyek atau parent native skills. Source adalah referensi; bukan izin helper/plugin/hook/graph generation. Teardown retained original historis karena subtree upstream hilang; Orca stubs dan shared host adaptations tidak diganti.

CustomDir Addy yang tinggal lima nama memakai container `ecosystem/capabilities/addyosmani-retained-8bfcc1f9916f2eea55494d8c1fa7f4bde867dd9e/skills`, dengan support original. Initial per-skill customDir menyebabkan lima nama hilang; fixed container byte-identical mengembalikannya. Final discovery global191 tanpa nama baru/hilang; proyek Onboarding207 karena sepuluh alias `github/*` tambahan kini berbeda isi dari global baru, bukan instalasi nama global baru. Snapshot `.github/skills` proyek sengaja tidak ditimpa atau dinonaktifkan global. Native bare names memakai pembaruan; alias proyek retained ditandai sebagai snapshot lain, bukan current global.

## Riset dan editorial

ARS3.24.3 adalah bundle original lengkap `ecosystem/sources/ars-f7da54e81b06da3e659c93f5309a1c0f98bd202a`, dipilih lewat satu item `skills.customDirectories`; lima skill existing, tanpa runtime orchestrator/plugin/hook vendor. Resolve semua rujukan root-relative ke bundle baru. Passport lama dengan metadata/lock yang jujur tetap diterima; null lock baru perlu alasan peneliti yang tidak kosong. Jangan memalsukan ars_version, hashes atau provenance. Synthetic schema/validator acceptance tidak mengesahkan sains, manuskrip, model atau adapter corpus nyata. Lisensi CC-BY-NC4.0, checkpoint manusia dan native dispatch tetap berlaku.

HumanizerID2.4.5 memakai bundle original dan seluruh support; baca juga batas `ecosystem/measurements/humanizer-id-20261110/EDITORIAL-BOUNDARIES.md`. Humanizer4.0.0 original tidak mengizinkan penambahan fakta dalam preservation-only edit meskipun contoh upstream mengizinkannya. Makna, angka beserta pembatas, negasi, atribusi/sitasi, istilah teknis, kutipan dan modalitas tetap utuh. Ekspansi substantif bersumber memerlukan permintaan tersendiri. Preset mengikuti venue/pengguna; tidak ada jaminan detektor atau eksekusi CLI/audit/jurnal/helper/hook otomatis.

last30days4.3.2 hanya dijalankan melalui:

```text
C:/Users/Indrimeilla-PC/.omp/agent/ecosystem/runtime/last30days/4.3.2/venv/Scripts/python.exe -I -B C:/Users/Indrimeilla-PC/.omp/agent/ecosystem/runtime/last30days/4.3.2/launch.py <vendor research args>
```

Baca skill original/referensi yang relevan. Jangan memakai raw engine/setup/watch/login. Launcher memakai home/cwd sementara, allowlist OS env/PATH, tanpa inherited keys/proxy/auth/config/cookies, tanpa keychain/harvest, memaksa research-only/no-browser-cookies dan tidak memasang optional CLIs. Tidak ada fallback berbayar/model/cloud/onboarding. Riset publik keyless hanya ketika diminta; pada wave ini hanya help offline yang diuji. Isolasi proses bukan sandbox OS/firewall. Cache/library temporer dibuang kecuali output path diotorisasi secara eksplisit.

## Rollback dan batas

Backup terarah: `ecosystem/backups/environment-apply-20261117/`, installer host lama dan runtime versi sebelumnya dipertahankan. Rollback hanya target/line yang berubah pada wave ini; jangan overwrite konfigurasi penuh bila pengguna telah mengeditnya. Jangan menghapus backup, data, source atau runtime lama tanpa izin targeted. Path dan langkah per target ada pada result masing-masing.

OMP18.22.0, Ponytail5.3.3, HyperFrames0.9.61, CLI-Hub0.4.1 dan Agent Reach1.6.1 sudah current pada audit. Jangan mengganti Agent Reach dengan paket PyPI bernama sama milik author berbeda. PoP CLI8.19.5300 tetap vendor-current; versi GUI8.20 bukan update CLI. HyperFrames render lokal lulus, tetapi check multi-sampel pernah gagal `net::ERR_ABORTED`; bukan general check pass.

Tidak ada deploy, akun/provider baru, paid computation, credential changes, publikasi/upload, browser-cookie import, hooks/watch/service atau perubahan firewall/network. Pengujian synthetics/help/discovery bukan sertifikasi keamanan, hasil E2E aplikasi pengguna atau bukti semua provider/decompiler/perangkat siap.
