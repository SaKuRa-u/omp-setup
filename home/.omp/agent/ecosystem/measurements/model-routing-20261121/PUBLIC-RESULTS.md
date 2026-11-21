# Routing OMP dan Orca — hasil 21 November 2026

Scope: OMP 19.0.1 default-profile, Orca 1.4.266, data sintetis, autentikasi Codex yang sudah ada. Ini ringkasan pengujian host asal, bukan rekaman sesi atau benchmark model. Orca menyediakan terminal; aplikasi Orca dan pengaturan workspace tidak ikut dibackup.

| Pemeriksaan | Hasil teramati |
|---|---|
| Sesi biasa dan cutover global | Lima sesi RPC baru tanpa overlay menyelesaikan resolusi startup/`@task` ke Sol, `@smol` ke Luna, dan `@slow`/`@plan` ke Astra. `astra-analyst` ditemukan. |
| Dispatch native di Orca | `sonic` dan probe `scout` memakai Luna `low`; `task` memakai Sol `medium` dan perbaikannya lulus 2/2 tes; `astra-analyst` memakai Astra `high` dan menemukan akar masalah fixture tanpa edit. |
| Mode opsional | Vibe `fast` memakai Luna, `good` memakai Sol. Plan beralih ke Astra; pause kembali ke Sol. Prompted `judge` memakai Luna via Codex. |
| Batas worker | Satu batch lima item native `task` selesai dengan puncak empat worker aktif. Batas kemudian ditetapkan di konfigurasi global. |
| Composer | Satu A/B TUI per kondisi: kontrol mencatat satu event prediction, overlay `false` nol. Keduanya tetap menghasilkan jawaban. `composer.predictions: false` kemudian diterapkan global. |

## Cek konfigurasi setelah restore

Jalankan dari workspace yang hendak dipakai, setelah meninjau override dan komponen startup:

```text
omp --version
omp config get defaultThinkingLevel
omp config get modelRoles.default
omp config get modelRoles.smol
omp config get modelRoles.slow
omp config get task.maxConcurrency
omp config get composer.predictions
```

Hasil yang diharapkan dari snapshot ini: `medium`, `openai-codex/gpt-6.2-sol`, `openai-codex/gpt-6-luna:low`, `openai-codex/gpt-6.2-astra:high`, `4`, `false`. Buka sesi baru tanpa selector atau flag effort untuk memeriksa default. Gunakan tugas sintetis terbatas jika ingin membuktikan dispatch; periksa badge model worker, bukan teks jawaban worker saja. Jangan memakai `--resume` sebagai bukti default sesi baru.

Sesi biasa tidak memerlukan `/vibe`. Tidak ada Quick Command Orca, router intent tambahan, atau pengujian worker lintas worktree. Beberapa uji memanggil worker secara eksplisit, jadi hasilnya tidak mengukur konsistensi pemilihan persona dari prompt samar, keunggulan Astra terhadap Sol, atau penghematan langganan. Tidak ada clean-machine restore, katalog akun, jurnal, prompt pengguna, atau mentah telemetri dalam snapshot.
