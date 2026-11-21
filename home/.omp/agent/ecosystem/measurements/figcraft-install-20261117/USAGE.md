# FigCraft 0.18.1 — OMP CLI-first

Instalasi portable original Windows x64 dari https://github.com/storytold/figcraft/releases/tag/v0.18.1, commit `4acc293c2ec941ac1400837ee7e3ab51780399f8`. ZIP102176915 bytes, SHA256 `158563f240eea42b939c328569dcf0d1b55545d89cbf035bfd5d354f351b0762` cocok digest release GitHub. MIT OR Apache-2.0, NOTICE dan lisensi font dipertahankan. Digest membuktikan kecocokan artefak, bukan audit keamanan atau verifikasi identitas Authenticode.

## Akses

PowerShell, tanpa PATH global atau wrapper tambahan:

```powershell
$fc = 'C:/Users/Indrimeilla-PC/.omp/agent/ecosystem/runtime/figcraft/0.18.1/figcraft-0.18.1-windows-x64-portable/figcraft-cli.exe'
& $fc --version
& $fc --help
& $fc commands --json --filter node.create
& $fc run --help
```

Desktop executable sibling `figcraft.exe` tersedia, tetapi tidak diluncurkan pada acceptance ini. Portable marker menyimpan state GUI di direktori portable; menurut packaging vendor first start dapat menyalin preferences instalasi existing. Jangan mengasumsikan state GUI bersih. Tidak membuat shortcut, file association, PATH, MCP registration atau service.

## Workflow desain

Reuse skills desain existing sesuai brief: satu lead desain (Impeccable/manual native bila sesuai), support layout/typography/colors/accessibility seperlunya. Tidak ada skill komunitas tambahan dipasang. Repo aplikasi dan repo official `storytold/craft-skills` belum menyediakan SKILL.md pada pin yang diperiksa. Kandidat komunitas tersimpan inert di luar discovery, bukan reviewed/security-approved atau runtime dependency.

1. Pilih direktori desain proyek dan scope input/output; jangan operasi di file yang sedang dibuka GUI tanpa koordinasi.
2. Baca `--help` subcommand dan `commands --json --filter <istilah>` aktual. Jangan mengandalkan jumlah commands atau contoh versi lain.
3. Tulis chunk JSON kecil. Bentuk `[{"command":"node.create","as":"screen","params":{"type":"frame","name":"Home","width":390,"height":844}}]`. Step berikut memakai `{"$ref":"screen"}` untuk ID hasil, bukan menebak ID.
4. Jalankan direct CLI dengan automation roots existing. Contoh di bawah mengganti path ke proyek yang benar-benar diotorisasi:

```powershell
& $fc run 'C:/project/design/chunk.json' --out 'C:/project/design/app.figcraft' --automation-read-root 'C:/project/design' --automation-write-root 'C:/project/design'
& $fc info 'C:/project/design/app.figcraft' --json --automation-read-root 'C:/project/design'
& $fc render 'C:/project/design/app.figcraft' -o 'C:/project/design/app.png' --automation-read-root 'C:/project/design' --automation-write-root 'C:/project/design'
& $fc export 'C:/project/design/app.figcraft' -o 'C:/project/design/app.svg' --automation-read-root 'C:/project/design' --automation-write-root 'C:/project/design'
```

`run` all-or-nothing/one undo step: failed step exits1, prints rolledBack:true, does not save --out. Success0, usage errors2. `--out` dan export dapat menimpa output: gunakan path baru atau backup targeted; jangan overwrite desain pengguna tanpa scope jelas. Roots adalah pembatasan aplikasi, bukan OS sandbox/firewall. Gunakan `--no-system-fonts` untuk font embedded konsisten; acceptance tidak membaca font/library privat.

5. Periksa info/notes/missingFonts dan buka render nyata. Export/code handoff bukan bukti aplikasi berfungsi atau aksesibilitas lolos. GUI/live prototype dan impor .fig/.sketch/Penpot perlu uji terpisah; aplikasi masih alpha dan format tertentu best-effort/experimental.

## Bukti dan batas

`cli-acceptance.json`: CLI version/help, filtered catalog, synthetic frame+text+rectangle -> native save/reopen (no missing fonts), PNG390x240 dan SVG, atomic-failure/no-output, denied write outside root. PNG dibuka dan diperiksa. Semua menggunakan dummy data dan allowlisted child environment dengan HOME/APPDATA dummy. GUI, live control port, plugins, network/collaboration, account/provider, code publication, real/private design tidak dijalankan. Tidak mengklaim zero-egress OS.

Jangan jalankan `mcp`, app `--control`, collab/share/join, plugin publish atau connect publish otomatis. Sharing online default dapat mengirim dokumen ke server publik dan bukan end-to-end encrypted; perlu persetujuan exact-target/data terpisah.

Dokumentasi resmi terpin: `ecosystem/sources/figcraft-4acc293c2ec941ac1400837ee7e3ab51780399f8/docs/{cli,mcp,control-protocol,file-format-parity}.md` relatif root agent. Baca sebagai referensi, bukan izin menjalankan seluruh workflow vendor.

Rollback: instalasi baru side-by-side `ecosystem/runtime/figcraft/0.18.1/`; tidak ada aplikasi existing/config non-OMP ditimpa. Hentikan pemakaian path dan hapus hanya instalasi ini setelah izin deletion targeted, serta lepas pointer routing wave ini. Pertahankan dokumen pengguna yang dibuat kemudian. Artefak unduhan dan source dapat dipertahankan untuk provenance.
