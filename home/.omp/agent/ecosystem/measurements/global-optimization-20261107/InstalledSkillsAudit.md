## Ringkasan

**Audit source-only; tidak ada upgrade, installer, helper, build, test, atau service yang dijalankan.**

Inventaris filesystem saat audit:

| Lokasi | SKILL.md |
|---|---:|
| `.omp/agent/skills` | 49 |
| `.agents/skills` | 37 |
| Root custom ARS | 5 |
| Ponytail `skills/` | 6 |
| **Total entrypoint** | **97** |
| **Nama unik** | **96** |
| Salinan tambahan Ponytail `.openclaw/skills/` | 6 |

Angka tersebut **inventaris source, bukan hasil discovery runtime terbaru**. Snapshot ledger “96 registered / 93 model-visible” tetap evidence historis.

Temuan utama:

1. **Tidak perlu upgrade massal.** Banyak HEAD repository berubah hanya pada website, manifest, atau skill yang tidak terpasang.
2. **Prioritas pembaruan guidance:** `terraform-policy`, lima skill Emil terkait Motion, `mcp-builder`, dan bundle ARS.
3. **Jangan menimpa adaptasi lokal.** Ada koreksi keamanan/Windows pada HashiCorp, DevOps, React/Postgres, Webapp, serta Impeccable shared.
4. **Provenance Orca sudah drift:** ledger/lock masih mencatat `computer-use`; filesystem sekarang memiliki `orca-computer-use` dan stub Orca yang baru berubah.
5. **Integritas byte terkini belum dibuktikan.** Hash dalam measurements membuktikan keadaan tanggal pengukuran, bukan keadaan sekarang. Tidak ada klaim “semua vendor files unchanged” dalam laporan ini.

## Evidence lokal dan arsitektur

Prefix seluruh path berikut: `C:/Users/Indrimeilla-PC/`.

- `.omp/agent/ecosystem/ledger.json:58-239`: repository, pin, lisensi, dan integrasi lama.
- `.agents/.skill-lock.json`: sumber instalasi shared; hash folder **bukan otomatis commit repository**.
- `.omp/agent/ecosystem/measurements/skills-routing-20261031.json`: provenance tambahan GSAP/Motion/Pocock.
- `…/routing-global-20261024.json`: sembilan skill Emil, accessibility, composition.
- `…/research-e2e-20261021.json`: ARS, citation-management, E2E.
- `…/agency-agents-20261021.json`, field `installation.mapping`: pemetaan lengkap 17 agent ke skill.
- `…/hashicorp-audit.json`, field `local_changes` dan `skills[].integrity`: sembilan skill dengan drift lokal yang tercatat.
- `…/skills-infra-20261018.json` dan `…/skills-fullstack-20261018.json`: adaptasi substantif, bukan vendor copy murni.

**Arsitektur:** dua root global berisi copy/adaptasi skill; ARS mempertahankan struktur repository lengkap agar referensi silang bekerja; Ponytail membawa enam skill melalui plugin dan extension. Ledger utama tidak mempunyai properti literal `customDirectories`; root ARS ditemukan melalui record provenance/discovery yang dirujuk ecosystem. Konfigurasi discovery aktif tidak diperiksa ulang dalam assignment ini.

## Repository → installed pin → upstream sekarang

`HEAD` di bawah berarti commit branch yang diperiksa sekarang, **bukan sertifikasi stable**. `=` berarti HEAD sama dengan pin provenance; tidak membuktikan file lokal masih identik.

| ID | Repository; pin installed menurut provenance | Upstream yang diperiksa; tindakan |
|---|---|---|
| AG | [msitarzewski/agency-agents](https://github.com/msitarzewski/agency-agents); `4e3ac3ca6604c75113f52c695dbddcc7af928b46` | [HEAD b859c515](https://github.com/msitarzewski/agency-agents/commit/b859c515d813efcfc4755d3471dd9e7686c7706d). Feed release kosong. **17 source terpilih tidak berubah dalam diff; pertahankan.** |
| HC | [hashicorp/agent-skills](https://github.com/hashicorp/agent-skills); `f706481af9b8fedb66de909f6243ad29601afa0c` | [HEAD 5e30fa5c](https://github.com/hashicorp/agent-skills/commit/5e30fa5c867ba6777c37e4206babfd08049c396f). Release terakhir terlihat `v1.0.0`, lebih tua daripada pin. Update hanya `terraform-policy` relevan; jangan downgrade ke tag lama. |
| PC | [mattpocock/skills](https://github.com/mattpocock/skills); `49dd158d1076134a641b33efb035946536778336` | [stable v1.3.2, d1478fcb](https://github.com/mattpocock/skills/releases/tag/v1.3.2); [HEAD 4ae2317d](https://github.com/mattpocock/skills/commit/4ae2317ddb22b046e26455e4f9c9b3aaaf62212d). Perubahan relevan: fresh-context subagents pada review/design/grilling. |
| PC2 | Repository PC; `a496f5513d4a4cf889bc48e189e579f4b0bdf6aa` | Domain-modeling dan questionnaire tidak berubah dalam diff gabungan yang diperiksa. Pin ini sesudah release v1.3.2; **jangan downgrade hanya untuk menyamakan tag**. |
| SP | [obra/superpowers](https://github.com/obra/superpowers); `bb92a77741419a4ab5f06e711a283343f1ada0c3` / 7.0.0 | [released-main 7.0.2, 22f0b463](https://github.com/obra/superpowers/commit/22f0b463e7a5e579904dd6211a520321035526f7). Tiga guidance utama tidak berubah; fixture debugging dipindahkan keluar skill. Upgrade bukan prioritas. |
| AN | [anthropics/skills](https://github.com/anthropics/skills); `dbd4588f9e1033efb41dad4bef2f7947c8993d44` | [HEAD 2c5958ec](https://github.com/anthropics/skills/commit/2c5958ecac7cee2b583967a2c4981d0f4a75c579). Feed release kosong. `mcp-builder` berubah; creator/webapp tidak berubah dalam diff. |
| CV | [JuliusBrussee/caveman](https://github.com/JuliusBrussee/caveman); `d262ab3882952a59312ff3537cd86d894523c5ab` | [HEAD c310c9d3](https://github.com/JuliusBrussee/caveman/commit/c310c9d300df13a1dd9f5c086120ffd857a164a1), release companion `bin-v4.1.0`; release core terakhir dalam feed `v4.0.1`. **Versi latest khusus skill belum dipastikan; tahan.** |
| IM | [pbakaus/impeccable](https://github.com/pbakaus/impeccable); OMP `8a0e198da34ebc5b936a9d5975fb7a3b1cf353b7` / 4.6.0 | [skill 4.8.0, 414603bf](https://github.com/pbakaus/impeccable/releases/tag/skill-v4.8.0). Engine 0.1.19 adalah komponen berbeda. Kandidat upgrade guidance; launcher/engine tetap tidak diaktifkan. |
| IM-S | Repository IM; shared `abf5779cabc20147fd9c013fa4705088c200bf8a` / 4.5.2 | Target skill sama 4.8.0, tetapi shared copy punya adaptasi dan digunakan host lain; **jangan ikut ditimpa**. |
| DV | [akin-ozer/cc-devops-skills](https://github.com/akin-ozer/cc-devops-skills); `276af751e659315aaf56d3ad13d7c26f4e72e28a` | [HEAD =](https://github.com/akin-ozer/cc-devops-skills/commit/276af751e659315aaf56d3ad13d7c26f4e72e28a). Release `v1.0.0` lebih tua. Pertahankan tiga adaptasi lokal. |
| VE | [vercel-labs/agent-skills](https://github.com/vercel-labs/agent-skills); `063bee94c3f4df8453406c830b0a7df0f2860278` | [HEAD/release-discovery 1a2c79d4](https://github.com/vercel-labs/agent-skills/commit/1a2c79d4e6c4a2283dc2c614b6538cbe1ed5ca62). Tiga skill terpasang tidak berubah; perubahan pada deploy/view-transitions yang tidak terpasang. |
| PG | [supabase/agent-skills](https://github.com/supabase/agent-skills); `c9be0e931b7930f7d02126d04774d904c381e7d7` | [HEAD =](https://github.com/supabase/agent-skills/commit/c9be0e931b7930f7d02126d04774d904c381e7d7). Release komponen Postgres terlihat `supabase-postgres-best-practices-v1.6.0`; **bukan bukti versi header lokal 1.1.1 adalah instalasi salah**. Pertahankan adaptasi. |
| FS | [vercel-labs/skills](https://github.com/vercel-labs/skills); acquisition unknown; content-match `a80e4c9d12d607631249d4d7d059f835d4b2f13a` | [HEAD d3701c11](https://github.com/vercel-labs/skills/commit/d3701c11b1101251af14c9d148f026e1a47ebe17); [CLI stable 1.7.6](https://github.com/vercel-labs/skills/releases/tag/v1.7.6). **Latest payload `find-skills` belum dipisahkan dari versi CLI; tahan.** |
| OR | [stablyai/orca](https://github.com/stablyai/orca); commit installed sekarang **unknown** | [desktop stable v1.4.253](https://github.com/stablyai/orca/releases/tag/v1.4.253); [HEAD 9b98b385](https://github.com/stablyai/orca/commit/9b98b38506069c1ace94bda8998043b627295b6d). Stub harus mengikuti executable host, bukan copy HEAD sembarang. |
| RE | [morluto/rea](https://github.com/morluto/rea); `3b79af28e80785afce9f5998d8f03289402a1847` / runtime 6.5.0, skill 42 | [stable 6.8.0, 160d821a](https://github.com/morluto/rea/releases/tag/rea-agents-6.8.0). **Hold migration:** breaking Evidence/API dan syarat Node baru. |
| CF | [cloudflare/security-audit-skill](https://github.com/cloudflare/security-audit-skill); `c1c8a8c1471069fb0e188eeaff69b8e8db6564a8` | [HEAD =](https://github.com/cloudflare/security-audit-skill/commit/c1c8a8c1471069fb0e188eeaff69b8e8db6564a8). Feed release kosong. Tidak perlu update source. |
| EM | [emilkowalski/skills](https://github.com/emilkowalski/skills); `2d228630ba1446365f614a108cb8252f1feda202` | [HEAD c8a79627](https://github.com/emilkowalski/skills/commit/c8a79627b59d72d764d6ab6f2c87c09a48169833). Feed release kosong. Update lima skill terkait Motion; empat lainnya unchanged. |
| UI | [ibelick/ui-skills](https://github.com/ibelick/ui-skills); `55363c305097d4c84487bd5f323d29b3f067bf72` | [HEAD 97dea9e7](https://github.com/ibelick/ui-skills/commit/97dea9e747ea94d5671ef1468cbb8f9bd5f32542). CLI release `v0.2.3`; kedua selected skill tidak berubah dalam diff. |
| GS | [greensock/gsap-skills](https://github.com/greensock/gsap-skills); `aed9cfd3277740755f6bfc1155c7aa645403b760` | [HEAD =](https://github.com/greensock/gsap-skills/commit/aed9cfd3277740755f6bfc1155c7aa645403b760). Feed release kosong. Pertahankan. |
| MO | [motiondivision/ai-kit](https://github.com/motiondivision/ai-kit); `1e424943582cbbdb6e3f410687e39f96451447bb` | [HEAD =](https://github.com/motiondivision/ai-kit/commit/1e424943582cbbdb6e3f410687e39f96451447bb). Feed release kosong. Pertahankan; MCP/premium tidak otomatis tersedia. |
| KD | [K-Dense-AI/scientific-agent-skills](https://github.com/K-Dense-AI/scientific-agent-skills); `593377bb048752abb0152deab9fbb1083a6087df` | [HEAD a25cf9ec](https://github.com/K-Dense-AI/scientific-agent-skills/commit/a25cf9ec00e2745d03f8704acf6f6919694ccd9a); stable bundle `v2.72.0`. Diff hanya security-report; citation payload unchanged. |
| HU | [blader/humanizer](https://github.com/blader/humanizer); `8c307f367c91bd974002f10f2be2965d642c13df` / 3.1.0 | [HEAD 0ef9fe5b](https://github.com/blader/humanizer/commit/0ef9fe5bc3572734fd3ae6c448fe00a30cd5dcf0), stable `v3.1.0`. Diff hanya schema plugin; skill unchanged. |
| EE | [tester-army/e2e](https://github.com/tester-army/e2e); `393005aa6952eaef62886cd03c8d8060f8f05a4f` / bundle 0.21.2 | [stable 0.23.0, 5f256928](https://github.com/tester-army/e2e/releases/tag/e2e%400.23.0). Guidance/runtime perlu dipasangkan; breaking locator semantics dan baseUrl. |
| AR | [Imbad0202/academic-research-skills](https://github.com/Imbad0202/academic-research-skills); `4c5449017f46eb64d112a301d4817d22c7c9f3d9` / v3.23.1 | [stable v3.24.2, fd5ff1b8](https://github.com/Imbad0202/academic-research-skills/releases/tag/v3.24.2). Kandidat upgrade bundle utuh; perubahan schema/validator perlu migrasi. |
| PT | [DietrichGebert/ponytail](https://github.com/DietrichGebert/ponytail); `09c434ab73ca43761c5d8b0c5d341926c2fba710` / 5.3.2 | [stable 5.3.3, 7801d061](https://github.com/DietrichGebert/ponytail/releases/tag/v5.3.3). Enam skill dan `pi-extension/` tidak berubah dalam diff; update tidak mendesak untuk OMP. |
| WG | [vercel-labs/web-interface-guidelines](https://github.com/vercel-labs/web-interface-guidelines); `434b7f91364665f2f733b310ec54809bf8f37937` | [HEAD =](https://github.com/vercel-labs/web-interface-guidelines/commit/434b7f91364665f2f733b310ec54809bf8f37937). Source pendukung `web-design-guidelines`, bukan skill tambahan. |
| LC | `context7-docs`, adapter lokal | Tidak ada upstream skill identik. Repository terkait [Context7 HEAD 078c0c73](https://github.com/upstash/context7/commit/078c0c731d19eb88d2391b236ab82a127dbabac3) **tidak menjadi versi adapter**. |
| LM | `supermemory-v5`, authored lokal | Tidak ada upstream skill identik/latest yang dapat dipetakan. SDK 5.0.2 dalam compatibility declaration bukan versi skill. |

### Lisensi dan batas upgrade per sumber

- **MIT tercatat:** AG, PC/PC2, SP, CF, EM, UI, GS, KD, HU, PT, RE. VE mempunyai deklarasi MIT tetapi provenance menyatakan root LICENSE tidak tersedia pada pin; jangan membuat klaim original-license-file yang tidak ada.
- **Apache-2.0:** AN selected skills, DV, IM, EE; CV memakai Apache-2.0 dengan historical notices. Adaptasi harus mempertahankan attribution dan modification notices.
- **HC:** MPL-2.0 default; **16 Sentinel samples BUSL-1.1**, jangan melabeli seluruh bundle sebagai MPL-only.
- **AR:** CC-BY-NC-4.0 masih berlaku pada v3.24.2; penggunaan noncommercial yang tercatat bukan izin komersial.
- **MO:** MIT declaration pada package/docs; standalone root LICENSE tidak terbukti tersedia pada pin.
- **OR:** standalone license skill belum established.
- Pemeriksaan lisensi di sini tidak merupakan legal clearance seluruh helper/dependency terbaru.

## Inventaris lengkap per skill

Path disingkat:

- `O` = `.omp/agent/skills/<nama>/SKILL.md`
- `A` = `.agents/skills/<nama>/SKILL.md`
- `R` = `.omp/agent/ecosystem/sources/academic-research-skills-4c544901/<nama>/SKILL.md`
- `P` = `.omp/plugins/cache/plugins/ponytail___ponytail___5.3.2/skills/<nama>/SKILL.md`

**Pin dan latest setiap baris mengikuti ID source pada tabel di atas.**  
Versi `—` = tidak ditemukan deklarasi versi skill, bukan versi nol.  
Modifikasi: `M` = adaptasi/koreksi terlihat sekarang; `H` = hanya bukti historis; `L` = authored lokal; `?` = belum established. **Untuk semua baris, daftar drift byte lengkap sekarang tetap unknown.**

### Root O — 49 entrypoint

| Skill | Source | Versi skill installed | Modifikasi |
|---|---|---:|---|
| agency-accessibility-auditor | AG | — | H: output converter resmi |
| agency-api-platform-engineer | AG | — | H: output converter resmi |
| agency-api-tester | AG | — | H: output converter resmi |
| agency-brand-guardian | AG | — | H: output converter resmi |
| agency-database-reliability-engineer | AG | — | H: output converter resmi |
| agency-developer-tooling-engineer | AG | — | H: output converter resmi |
| agency-document-generator | AG | — | H: output converter resmi |
| agency-identity-access-engineer | AG | — | H: output converter resmi |
| agency-internationalization-engineer | AG | — | H: output converter resmi |
| agency-payments-billing-engineer | AG | — | H: output converter resmi |
| agency-performance-benchmarker | AG | — | H: output converter resmi |
| agency-privacy-engineer | AG | — | H: output converter resmi |
| agency-research-synthesist | AG | — | H: output converter resmi |
| agency-secrets-credential-hygiene-engineer | AG | — | H: output converter resmi |
| agency-security-architect | AG | — | H: output converter resmi |
| agency-technical-writer | AG | — | H: output converter resmi |
| agency-ux-researcher | AG | — | H: output converter resmi |
| animate | EM | — | H: vendor copy |
| animation-performance | EM | — | H: vendor copy |
| animation-vocabulary | EM | — | H: vendor copy |
| ansible-automation | DV | — | M: OMP/Windows/controller boundaries |
| break-ui | EM | — | H: vendor copy |
| citation-management | KD | 2.3 | H: vendor copy; delapan Python helpers |
| context7-docs | LC | — | L: adapter |
| docker-container-builds | DV | — | M: OMP/build boundaries dan recipe corrections |
| domain-modeling | PC2 | — | H: vendor copy |
| e2e | EE | —; bundle 0.21.2 | H: vendor copy |
| emil-design-eng | EM | — | H: vendor copy |
| find-animation-opportunities | EM | — | H: vendor copy |
| fixing-accessibility | UI | — | H: vendor copy |
| fixing-metadata | UI | 1.0.1 | H: vendor copy |
| gsap-core | GS | — | H: vendor copy |
| gsap-react | GS | — | H: vendor copy |
| gsap-timeline | GS | — | H: vendor copy |
| humanizer | HU | 3.1.0 | H: vendor copy |
| impeccable | IM | 4.6.0 | H: vendor copy; shadow pair |
| improve-animations | EM | — | H: vendor copy |
| kubernetes-manifest-operations | DV | — | M: OMP/cluster boundaries dan corrections |
| mobile-native | EM | — | H: vendor copy |
| motion | MO | — | H: vendor subtree |
| review-animations | EM | — | H: vendor copy; explicit-only |
| security-audit | CF | — | H: vendor copy |
| supabase-postgres-best-practices | PG | 1.1.1 | M: safety plus SQL/reference corrections |
| supermemory-v5 | LM | — | L: authored |
| to-questionnaire | PC2 | — | H: vendor copy; explicit-only |
| vercel-composition-patterns | VE | 1.0.0 | H: vendor copy plus local NOTICE |
| vercel-react-best-practices | VE | 1.0.0 | M: safety plus React/reference corrections |
| web-design-guidelines | VE + WG | 1.0.0 | H: vendor entrypoint, pinned rules, local NOTICE |
| webapp-testing | AN-derived | — | M: native browser adapter; acquisition commit unknown |

### Root A — 37 entrypoint

| Skill | Source | Versi skill installed | Modifikasi |
|---|---|---:|---|
| aws-ami-builder | HC | — | H: normalized-content match |
| azure-image-builder | HC | — | H: normalized-content match |
| azure-verified-modules | HC | — | H: normalized-content match |
| caveman | CV | — | H: selected documentation only |
| code-review | PC | — | H: vendor copy |
| codebase-design | PC | — | H: vendor copy |
| find-skills | FS | — | ?: acquisition revision unknown |
| grill-me | PC | — | H: alias; explicit-only |
| grilling | PC | — | H: vendor copy |
| impeccable | IM-S | 4.5.2 | M: local guard adaptation; shadow pair |
| mcp-builder | AN | — | H: vendor copy |
| new-terraform-provider | HC | 0.0.1 | M: portable `go build ./...` |
| orca-cli | OR | — | ?: current host-generated stub |
| orca-computer-use | OR | — | ?: renamed/new current stub |
| orchestration | OR | — | ?: current host-generated stub |
| provider-actions | HC | 0.0.1 | H: normalized-content match |
| provider-configuration | HC | 0.0.1 | M: redacted malformed-credential error example |
| provider-docs | HC | — | H: normalized-content match |
| provider-ephemeral-resources | HC | 0.0.1 | M: register constructor without invocation |
| provider-framework-migration | HC | 0.0.1 | H: normalized-content match |
| provider-resources | HC | 0.0.1 | H: normalized-content match |
| provider-test-patterns | HC | 0.0.1 | H: normalized-content match |
| push-to-registry | HC | — | M: actual cost/budget gate |
| receiving-code-review | SP | — | H: vendor copy |
| refactor-module | HC | 0.0.1 | M: remove registry-only version from Git module |
| reverse-engineer-anything | RE | 42 | H: runtime-bundled match |
| run-acceptance-tests | HC | 0.0.1 | H: normalized-content match |
| skill-creator | AN | — | H: vendor copy |
| systematic-debugging | SP | — | H: vendor copy |
| tdd | PC | — | H: vendor copy |
| terraform-policy | HC | 0.1.0 | M: obsolete installer references removed |
| terraform-search-import | HC | 0.1.0 | M: resolved Bash invocation; H: LF correction |
| terraform-stacks | HC | 0.0.1 | H: normalized-content match |
| terraform-style-guide | HC | — | H: normalized-content match |
| terraform-test | HC | 0.0.2 | H: preexisting SKILL/CI_CD modifications preserved |
| verification-before-completion | SP | — | H: vendor copy |
| windows-builder | HC | — | M: guest HTTPS listener/certificate correction |

### Root custom R — lima entrypoint

Semua memakai pin AR v3.23.1; target bundle latest AR v3.24.2.

| Skill | Versi skill installed | Modifikasi |
|---|---:|---|
| academic-paper | 3.3.1 | H: original snapshot |
| academic-paper-reviewer | 1.11.1 | H: original snapshot |
| academic-pipeline | 3.23.1 | H: original snapshot |
| deep-research | 2.12.1 | H: original snapshot |
| sr-screener | 1.0.0 | H: original snapshot |

Versi header individual berbeda dari versi bundle; jangan menyamakan keduanya.

### Root plugin P — enam entrypoint

Semua source PT 5.3.2; latest bundle PT 5.3.3. Header individual tidak mendeklarasikan versi.

| Skill | Modifikasi |
|---|---|
| ponytail | H: vendor copy |
| ponytail-audit | H: vendor copy |
| ponytail-debt | H: vendor copy |
| ponytail-gain | H: vendor copy |
| ponytail-help | H: vendor copy |
| ponytail-review | H: vendor copy |

Keenam nama tersebut juga memiliki `SKILL.md` di `.openclaw/skills/<nama>/` dalam plugin cache: **enam salinan packaging tambahan**, bukan enam kemampuan OMP baru.

## Duplicate, shadow, dan drift discovery

| Item | Hasil |
|---|---|
| `impeccable` O 4.6.0 vs A 4.5.2 | Duplicate nama nyata. Historical config mengecualikan `agents/impeccable`; winner aktif sekarang belum runtime-tested. Jangan hapus shared copy karena dipertahankan untuk host lain. |
| Ponytail `skills/` vs `.openclaw/skills/` | Enam duplicate packaging. Historical discovery mendaftarkan enam canonical skills saja; jangan menambahkan root cache secara rekursif tanpa filter. |
| ARS top-level vs `skills/<nama>` | Lima entrypoint nyata di top-level; listing `skills/` berisi link/stub, bukan lima file SKILL tambahan yang ditemukan glob. |
| A `computer-use` | Listing menunjukkan entry 0-byte, bukan direktori skill; lock masih mencatatnya. Skill nyata sekarang `orca-computer-use`. |
| A `web-design-guidelines`, `redesign-existing-projects`, `design-taste-frontend` | Entry 0-byte; tidak dihitung sebagai installed SKILL.md. Tipe link/dangling-target belum dibuktikan. |
| `grill-me`, `review-animations`, `to-questionnaire` | Frontmatter explicit-only terlihat. Jumlah model-visible sekarang tetap memerlukan discovery parent. |

## Rencana upgrade yang didukung evidence

### 1. Pembaruan guidance bernilai nyata

**HashiCorp — `terraform-policy` saja.**  
[Diff lengkap pin→HEAD](https://github.com/hashicorp/agent-skills/compare/f706481af9b8fedb66de909f6243ad29601afa0c...5e30fa5c867ba6777c37e4206babfd08049c396f):

- Guidance lama berfokus 0.2/0.3; upstream menambah 0.4/0.5.
- Default operations dapat mencakup unchanged resources; mandatory policy bisa mulai memblokir existing state.
- Metadata nullable dan batas `prior_attrs` berubah.
- Migrasikan SKILL beserta **tiga reference yang berubah**, pertahankan koreksi lokal obsolete installer. Tidak perlu menimpa 19 skill HC lainnya.

**Emil — lima skill, bukan seluruh katalog.**  
[Diff pin→HEAD](https://github.com/emilkowalski/skills/compare/2d228630ba1446365f614a108cb8252f1feda202...c8a79627b59d72d764d6ab6f2c87c09a48169833):

- `animate`
- `animation-performance`
- `emil-design-eng`
- `improve-animations` beserta `AUDIT.md`
- `review-animations` beserta `STANDARDS.md`

Koreksi utama membatasi klaim “Motion shorthand tidak accelerated” pada versi sebelum Motion 14.2. Ini memperbaiki guidance; **bukan izin meng-upgrade dependency aplikasi**. `animation-vocabulary`, `break-ui`, `mobile-native`, `find-animation-opportunities` tidak berubah. Skill baru choreograph/remove-animations di luar scope instalasi.

**Anthropic — `mcp-builder`.**  
[Diff pin→HEAD](https://github.com/anthropics/skills/compare/dbd4588f9e1033efb41dad4bef2f7947c8993d44...2c5958ecac7cee2b583967a2c4981d0f4a75c579):

Upstream menambah panduan TypeScript SDK v2 dan pemilihan v1/v2. Copy guidance dan reference baru sebagai satu unit; jangan menjalankan codemod `@latest` atau runner evaluasi. `skill-creator` dan adapter `webapp-testing` tidak memerlukan refresh berdasarkan diff ini.

**Pocock — prioritas rendah.**  
Update `code-review`, `grilling`, dan `codebase-design/DESIGN-IT-TWICE.md` untuk fresh-context subagents. MIT dan perubahan text-only; pertahankan pembatasan fanout lokal. Domain-modeling/questionnaire/TDD/grill-me tidak perlu diganti hanya untuk mengganti pin.

### 2. Upgrade bundle dengan migration gate

**ARS v3.23.1 → v3.24.2:** layak sebagai kandidat, **bukan drop-in dinyatakan aman**.

- Pembaruan cited-version integrity checks dan pemeriksaan reviewer.
- `repro_lock: null` sekarang dapat diterima dengan alasan; rilis lama menolaknya.
- Validator sekarang menolak beberapa passport yang dahulu lolos.
- `sr-screener` memperbaiki pernyataan metode: read-only tools tidak membatasi Read/Grep ke satu file.
- Pertahankan struktur bundle lengkap dan CC-BY-NC attribution; jangan hanya mengganti lima SKILL.md, mengaktifkan hooks, atau mengubah passport existing diam-diam.

**Impeccable 4.6 → 4.8:** ada manfaat Windows/WCAG/download-integrity, tetapi scope guidance harus terpisah dari engine/installer. Release notes saja belum mengaudit seluruh launcher terbaru. Hold aktivasi engine; shared 4.5.2 tetap dipisahkan.

**REA 6.5 → 6.8:** hold sampai parent memigrasikan caller/Evidence. Release menyatakan breaking defaults `analyze_function`, JSONL, accessibility values, storage comparison, serta Node `^22.23.4 || ^24.22.1 || >=26.12.1`. Jangan upgrade skill sendirian mendahului runtime.

**E2E 0.21.2 → 0.23:** hold sampai proyek memilih runtime matching. `inputValue`/`isChecked` kini dapat throw dan `baseUrl` berubah; guidance saja bukan bukti kompatibilitas proyek.

### 3. Pertahankan; tidak ada manfaat payload terpasang yang terbukti

AG seluruh 17; DV seluruh tiga; VE seluruh tiga; PG; CF; GS seluruh tiga; MO; UI kedua skill; KD; HU; SP guidance utama; PT enam skills.

Khusus Ponytail, [diff 5.3.2→5.3.3](https://github.com/DietrichGebert/ponytail/compare/v5.3.2...v5.3.3) tidak mengubah `skills/`, `pi-extension/`, atau LICENSE. Perubahan band/transcript discovery bukan alasan mengaktifkan fitur itu pada OMP.

### 4. Blocker provenance yang eksplisit

- **Orca:** mapping commit/revision stub installed sekarang belum established; ledger lama tidak cocok nama/filesystem. Ikuti guide dari executable host yang sama, jangan restore stub Oktober.
- **find-skills:** acquisition commit unknown; latest CLI tidak otomatis latest skill.
- **Caveman:** latest khusus payload skill belum dibandingkan; jangan mengaktifkan proxy/cloud/setup untuk mendapatkan refresh prose.
- **Context7/Supermemory:** adapter lokal tidak mempunyai upstream release identik. Upgrade SDK/server adalah audit terpisah, bukan otomatis upgrade skill.
- **Semua source:** hash/drift seluruh file installed saat ini belum dibandingkan fresh terhadap pinned source. Parent perlu preflight tiga arah **baseline upstream → current local → candidate upstream**, mempertahankan koreksi lokal dan mencatat unknown tanpa menyebutnya clean.

**Tidak diperiksa:** runtime discovery terbaru, eksekusi helper, integritas byte menyeluruh, serta kompatibilitas workload nyata.  
**Risiko utama:** upgrade massal dapat menghapus koreksi lokal, mengaktifkan helper/engine yang tidak diizinkan, atau mengubah schema dan kontrak runtime.